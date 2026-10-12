import { LocationOnOutlined, RefreshOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Skeleton, Typography } from '@mui/material'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useEffect } from 'foxact/use-abortable-effect'
import { useIntersection } from 'foxact/use-intersection'
import type { XOR } from 'foxts/ts-xor'
import {
  forwardRef,
  useCallback,
  useEffectEvent,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { getIpInfo } from '@/services/api'
import { useQuery } from '@/services/query-client'

import { EnhancedCard } from './enhanced-card'
import { IpInfoContent } from './ip-info-content'

const IP_REFRESH_SECONDS = 300
const COUNTDOWN_TICK_INTERVAL = 5_000
const IP_INFO_CACHE_KEY = 'cv_ip_info_cache'

type CountDownState = XOR<
  {
    type: 'countdown'
    remainingSeconds: number
  },
  {
    type: 'revalidating'
  }
>

const IPInfoCardContainer = forwardRef<HTMLElement, React.PropsWithChildren>(
  ({ children }, ref) => {
    const { t } = useTranslation()
    const { refetch: mutate } = useIPInfo()

    return (
      <EnhancedCard
        title={t('home.components.ipInfo.title')}
        icon={<LocationOnOutlined />}
        iconColor="info"
        ref={ref}
        action={
          <IconButton
            size="small"
            onClick={() => mutate()}
            aria-label={t('home.components.ipInfo.labels.autoRefresh')}
          >
            <RefreshOutlined />
          </IconButton>
        }
      >
        {children}
      </EnhancedCard>
    )
  },
)

export const IpInfoCard = () => {
  const { t } = useTranslation()
  const [showIp, setShowIp] = useState(false)
  const appWindow = useMemo(() => getCurrentWebviewWindow(), [])

  // Once intersected, refreshes stay enabled until unmount.
  const [containerRef, hasIntersected, _resetIntersected] = useIntersection({
    rootMargin: '0px',
  })

  const [countdown, setCountdown] = useState<CountDownState>({
    type: 'countdown',
    remainingSeconds: IP_REFRESH_SECONDS,
  })

  const { data: ipInfo, error, isLoading, refetch: mutate } = useIPInfo()

  const onCountdownTick = useEffectEvent(async () => {
    const now = Date.now()
    const ts = ipInfo?.lastFetchTs
    if (!ts) {
      return
    }

    const elapsed = Math.floor((now - ts) / 1000)
    const remaining = IP_REFRESH_SECONDS - elapsed

    if (remaining <= 0) {
      if (
        hasIntersected &&
        navigator.onLine &&
        countdown.type !== 'revalidating' &&
        (await appWindow.isVisible())
      ) {
        setCountdown({ type: 'revalidating' })
        try {
          await mutate()
        } finally {
          setCountdown({
            type: 'countdown',
            remainingSeconds: IP_REFRESH_SECONDS,
          })
        }
      } else {
        // Keep the expired state so the next eligible tick refreshes immediately.
      }
    } else {
      setCountdown({
        type: 'countdown',
        remainingSeconds: remaining,
      })
    }
  })

  useEffect(() => {
    let timer: number | null = null

    // Prefer DOM intersection state; Tauri visibility is unreliable on some platforms.
    if (hasIntersected) {
      console.debug(
        'IP info card has entered the viewport, starting the countdown interval.',
      )
      timer = window.setInterval(onCountdownTick, COUNTDOWN_TICK_INTERVAL)
    } else {
      console.debug(
        'IP info card has not yet entered the viewport, no counting down.',
      )
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    // Best-effort power saving; see https://github.com/tauri-apps/tauri/issues/10592.
    function onVisibilityChange() {
      if (document.hidden) {
        console.debug('Document hidden, pause the interval')
        if (timer != null) {
          clearInterval(timer)
          timer = null
        }
      } else if (hasIntersected) {
        console.debug('Document visible, resume the interval')
        if (timer == null) {
          timer = window.setInterval(onCountdownTick, COUNTDOWN_TICK_INTERVAL)
        }
      } else {
        console.debug(
          'Document visible, but IP info card has never entered the viewport, not even once, not starting the interval.',
        )
      }
    }

    return () => {
      if (timer != null) clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [hasIntersected])

  const toggleShowIp = useCallback(() => {
    setShowIp((prev) => !prev)
  }, [])

  let mainElement: React.ReactElement

  switch (true) {
    case isLoading:
      mainElement = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width="60%" height={30} />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="50%" height={24} />
        </Box>
      )
      break
    case !!error:
      mainElement = (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'error.main',
          }}
        >
          <Typography variant="body1" color="error">
            {error instanceof Error
              ? error.message
              : t('home.components.ipInfo.errors.load')}
          </Typography>
          <Button onClick={() => mutate()} sx={{ mt: 2 }}>
            {t('shared.actions.retry')}
          </Button>
        </Box>
      )
      break
    default:
      mainElement = (
        <IpInfoContent
          ipInfo={ipInfo}
          showIp={showIp}
          onToggleIp={toggleShowIp}
          refreshStatus={
            countdown.type === 'countdown'
              ? `${countdown.remainingSeconds}s`
              : '…'
          }
        />
      )
  }

  return (
    <IPInfoCardContainer ref={containerRef}>{mainElement}</IPInfoCardContainer>
  )
}

function useIPInfo() {
  return useQuery({
    queryKey: [IP_INFO_CACHE_KEY],
    queryFn: getIpInfo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 30_000,
  })
}
