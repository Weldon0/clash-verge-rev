import {
  HelpOutlineRounded,
  HistoryEduOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material'
import { useLockFn } from 'ahooks'
import { Suspense, lazy, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BasePage } from '@/components/base'
import { ClashModeCard } from '@/components/home/clash-mode-card'
import { CurrentProxyCard } from '@/components/home/current-proxy-card'
import { HomeProfileCard } from '@/components/home/home-profile-card'
import {
  PersonalTrafficMetric,
  PersonalTrafficChart,
} from '@/components/home/personal-traffic'
import ProxyControlSwitches from '@/components/shared/proxy-control-switches'
import { useProfiles } from '@/hooks/use-profiles'
import { useVerge } from '@/hooks/use-verge'
import { entry_lightweight_mode } from '@/services/cmds'
import { mutate } from '@/services/mutate'
import { showNotice } from '@/services/notice-service'
import { openExternalUrl } from '@/utils/open-external-url'

const preloadTestCard = () =>
  import('@/components/home/test-card').then((module) => ({
    default: module.TestCard,
  }))
const preloadIpInfoCard = () =>
  import('@/components/home/ip-info-card').then((module) => ({
    default: module.IpInfoCard,
  }))
const preloadClashInfoCard = () =>
  import('@/components/home/clash-info-card').then((module) => ({
    default: module.ClashInfoCard,
  }))
const preloadSystemInfoCard = () =>
  import('@/components/home/system-info-card').then((module) => ({
    default: module.SystemInfoCard,
  }))

const LazyTestCard = lazy(preloadTestCard)
const LazyIpInfoCard = lazy(preloadIpInfoCard)
const LazyClashInfoCard = lazy(preloadClashInfoCard)
const LazySystemInfoCard = lazy(preloadSystemInfoCard)

// Used by bootstrap to initiate optional card imports without blocking render.
// eslint-disable-next-line react-refresh/only-export-components
export const preloadHomePageCards = () =>
  Promise.all([
    preloadTestCard().catch(() => {}),
    preloadIpInfoCard().catch(() => {}),
    preloadClashInfoCard().catch(() => {}),
    preloadSystemInfoCard().catch(() => {}),
  ])

// 定义首页卡片设置接口
interface HomeCardsSettings {
  profile: boolean
  proxy: boolean
  network: boolean
  mode: boolean
  traffic: boolean
  info: boolean
  clashinfo: boolean
  systeminfo: boolean
  test: boolean
  ip: boolean
  [key: string]: boolean
}

const DEFAULT_HOME_CARDS: HomeCardsSettings = {
  info: false,
  profile: true,
  proxy: true,
  network: true,
  mode: true,
  traffic: true,
  clashinfo: false,
  systeminfo: false,
  test: false,
  ip: true,
}

const serializeCardFlags = (cards: HomeCardsSettings) =>
  Object.keys(cards)
    .sort()
    .map((key) => `${key}:${cards[key] ? 1 : 0}`)
    .join('|')

// 首页设置对话框组件接口
interface HomeSettingsDialogProps {
  onClose: () => void
  homeCards: HomeCardsSettings
}

// 首页设置对话框组件
const HomeSettingsDialog = ({
  onClose,
  homeCards,
}: HomeSettingsDialogProps) => {
  const { t } = useTranslation()
  const [cards, setCards] = useState<HomeCardsSettings>(homeCards)
  const { patchVerge } = useVerge()

  const handleToggle = (key: string) => {
    setCards((prev: HomeCardsSettings) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    await patchVerge({ home_cards: cards })
    onClose()
  }

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('home.page.settings.title')}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.profile || false}
                onChange={() => handleToggle('profile')}
              />
            }
            label={t('home.page.settings.cards.profile')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.proxy || false}
                onChange={() => handleToggle('proxy')}
              />
            }
            label={t('home.page.settings.cards.currentProxy')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.network || false}
                onChange={() => handleToggle('network')}
              />
            }
            label={t('home.page.settings.cards.network')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.mode || false}
                onChange={() => handleToggle('mode')}
              />
            }
            label={t('home.page.settings.cards.proxyMode')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.traffic || false}
                onChange={() => handleToggle('traffic')}
              />
            }
            label={t('home.page.settings.cards.traffic')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.test || false}
                onChange={() => handleToggle('test')}
              />
            }
            label={t('home.page.settings.cards.tests')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.ip || false}
                onChange={() => handleToggle('ip')}
              />
            }
            label={t('home.page.settings.cards.ip')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.clashinfo || false}
                onChange={() => handleToggle('clashinfo')}
              />
            }
            label={t('home.page.settings.cards.clashInfo')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cards.systeminfo || false}
                onChange={() => handleToggle('systeminfo')}
              />
            }
            label={t('home.page.settings.cards.systemInfo')}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('shared.actions.cancel')}</Button>
        <Button onClick={handleSave} color="primary">
          {t('shared.actions.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const HomePage = () => {
  const { t } = useTranslation()
  const { verge } = useVerge()
  const { current, mutateProfiles } = useProfiles()

  // 设置弹窗的状态
  const [settingsOpen, setSettingsOpen] = useState(false)

  // 卡片显示状态
  const homeCards =
    (verge?.home_cards as HomeCardsSettings | undefined) ?? DEFAULT_HOME_CARDS

  // 文档链接函数
  const toGithubDoc = useLockFn(() =>
    openExternalUrl('https://clash-verge-rev.github.io/index.html').catch(
      showNotice.error,
    ),
  )

  // 新增：打开设置弹窗
  const openSettings = useCallback(() => {
    setSettingsOpen(true)
  }, [])

  return (
    <BasePage
      title={t('home.page.title')}
      contentStyle={{ padding: 2 }}
      header={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('home.page.tooltips.lightweightMode')} arrow>
            <IconButton
              onClick={async () =>
                await mutate(() => entry_lightweight_mode(), {
                  id: 'entry-lightweight-mode',
                  errorNotice: false,
                })
              }
              size="small"
              color="inherit"
            >
              <HistoryEduOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('home.page.tooltips.manual')} arrow>
            <IconButton onClick={toGithubDoc} size="small" color="inherit">
              <HelpOutlineRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('home.page.tooltips.settings')} arrow>
            <IconButton onClick={openSettings} size="small" color="inherit">
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      }
    >
      <div className="personal-overview">
        <div className="personal-overview-top">
          {homeCards.proxy && <CurrentProxyCard compact />}
          {homeCards.traffic && (
            <>
              <PersonalTrafficMetric direction="down" />
              <PersonalTrafficMetric direction="up" />
            </>
          )}
        </div>
        <div className="personal-overview-middle">
          {homeCards.traffic && <PersonalTrafficChart />}
          {(homeCards.network || homeCards.mode) && (
            <Box className="personal-quick-card">
              <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 2 }}>
                {t('home.page.cards.networkSettings')}
              </Typography>
              {homeCards.network && (
                <>
                  <ProxyControlSwitches
                    compact
                    noRightPadding
                    label={t('settings.sections.system.toggles.systemProxy')}
                    onError={showNotice.error}
                  />
                  <ProxyControlSwitches
                    compact
                    noRightPadding
                    label={t('settings.sections.system.toggles.tunMode')}
                    onError={showNotice.error}
                  />
                </>
              )}
              {homeCards.mode && (
                <>
                  <Typography sx={{ fontSize: 12, mt: 2, mb: 1.5 }}>
                    {t('home.page.cards.proxyMode')}
                  </Typography>
                  <ClashModeCard compact />
                </>
              )}
            </Box>
          )}
        </div>
        <div className="personal-overview-bottom">
          {homeCards.profile && (
            <HomeProfileCard
              current={current}
              onProfileUpdated={mutateProfiles}
            />
          )}
          {homeCards.ip && (
            <Suspense
              fallback={<Skeleton variant="rectangular" height={160} />}
            >
              <LazyIpInfoCard />
            </Suspense>
          )}
        </div>
        <div className="personal-overview-extras">
          {homeCards.test && (
            <Suspense
              fallback={<Skeleton variant="rectangular" height={200} />}
            >
              <LazyTestCard />
            </Suspense>
          )}
          {homeCards.clashinfo && (
            <Suspense
              fallback={<Skeleton variant="rectangular" height={200} />}
            >
              <LazyClashInfoCard />
            </Suspense>
          )}
          {homeCards.systeminfo && (
            <Suspense
              fallback={<Skeleton variant="rectangular" height={200} />}
            >
              <LazySystemInfoCard />
            </Suspense>
          )}
        </div>
      </div>

      {/* 首页设置弹窗 */}
      {settingsOpen && (
        <HomeSettingsDialog
          key={serializeCardFlags(homeCards)}
          onClose={() => setSettingsOpen(false)}
          homeCards={homeCards}
        />
      )}
    </BasePage>
  )
}

export default HomePage
