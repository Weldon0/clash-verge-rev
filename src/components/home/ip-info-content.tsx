import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import type { getIpInfo } from '@/services/api'
import getSystem from '@/utils/get-system'

interface Props {
  ipInfo?: Awaited<ReturnType<typeof getIpInfo>>
  showIp: boolean
  onToggleIp: () => void
  refreshStatus: string
}

const countryFlag = (code?: string) =>
  /^[a-z]{2}$/i.test(code ?? '')
    ? String.fromCodePoint(
        ...code!
          .toUpperCase()
          .split('')
          .map((char) => 127397 + char.charCodeAt(0)),
      )
    : ''

export const IpInfoContent = ({
  ipInfo,
  showIp,
  onToggleIp,
  refreshStatus,
}: Props) => {
  const { t } = useTranslation()
  const details = [
    ['isp', ipInfo?.organization],
    ['org', ipInfo?.asn_organization],
    ['location', [ipInfo?.city, ipInfo?.region].filter(Boolean).join(', ')],
    ['timezone', ipInfo?.timezone],
  ] as const

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.75,
        minWidth: 0,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            fontSize: 21,
            lineHeight: 1,
            flexShrink: 0,
            fontFamily:
              getSystem() === 'windows'
                ? '"twemoji mozilla", sans-serif'
                : 'sans-serif',
          }}
        >
          {countryFlag(ipInfo?.country_code)}
        </Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            flex: 1,
            minWidth: 0,
            overflowWrap: 'anywhere',
          }}
        >
          {ipInfo?.country || t('home.components.ipInfo.labels.unknown')}
        </Typography>
        <Typography
          component="span"
          title={t('home.components.ipInfo.labels.asn')}
          sx={{
            fontSize: 10,
            color: 'text.secondary',
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            px: 0.75,
            py: 0.4,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {ipInfo?.asn ? `AS${ipInfo.asn}` : 'N/A'}
        </Typography>
      </Box>
      <Box
        sx={{ bgcolor: 'background.default', borderRadius: 2, px: 1.5, py: 1 }}
      >
        <Typography sx={{ fontSize: 10, color: 'text.secondary', mb: 0.25 }}>
          {t('home.components.ipInfo.labels.ip')}
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}
        >
          <Typography
            component="span"
            data-ip-address
            sx={{
              fontFamily: '"SFMono-Regular", Consolas, monospace',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.8,
              whiteSpace: 'nowrap',
              overflowX: 'auto',
              minWidth: 0,
              flex: 1,
              userSelect: 'text',
              scrollbarWidth: 'thin',
            }}
          >
            {showIp ? ipInfo?.ip || '—' : '••••••••••'}
          </Typography>
          <IconButton
            size="small"
            onClick={onToggleIp}
            aria-label={t(
              showIp
                ? 'shared.actions.hideDetails'
                : 'shared.actions.showDetails',
            )}
            aria-pressed={showIp}
            sx={{
              flexShrink: 0,
              width: 28,
              height: 28,
              color: 'text.secondary',
            }}
          >
            {showIp ? (
              <VisibilityOffOutlined sx={{ fontSize: 17 }} />
            ) : (
              <VisibilityOutlined sx={{ fontSize: 17 }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box
        component="dl"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content minmax(0, 1fr)',
          columnGap: 1.5,
          rowGap: 1,
          m: 0,
          alignItems: 'baseline',
        }}
      >
        {details.map(([key, value]) => (
          <Box key={key} sx={{ display: 'contents' }}>
            <Typography
              component="dt"
              sx={{ fontSize: 11, color: 'text.secondary', lineHeight: 1.6 }}
            >
              {t(`home.components.ipInfo.labels.${key}`)}
            </Typography>
            <Typography
              component="dd"
              sx={{
                m: 0,
                minWidth: 0,
                fontSize: 12,
                lineHeight: 1.6,
                overflowWrap: 'anywhere',
                wordBreak: 'normal',
                userSelect: 'text',
              }}
            >
              {value || t('home.components.ipInfo.labels.unknown')}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: 'auto',
          pt: 1.25,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: 1.5,
          rowGap: 0.5,
          color: 'text.secondary',
        }}
      >
        <Typography sx={{ fontSize: 9, whiteSpace: 'nowrap' }}>
          {t('home.components.ipInfo.labels.autoRefresh')}: {refreshStatus}
        </Typography>
        <Typography
          sx={{
            fontSize: 9,
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
          }}
        >{`${ipInfo?.country_code ?? 'N/A'} · ${ipInfo?.longitude?.toFixed(2) ?? 'N/A'}, ${ipInfo?.latitude?.toFixed(2) ?? 'N/A'}`}</Typography>
      </Box>
    </Box>
  )
}
