import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { PersonalIcon } from '@/components/layout/personal-icon'
import { useConnectionSummaryData } from '@/hooks/use-connection-data'
import { useTrafficData } from '@/hooks/use-traffic-data'
import { useVisibility } from '@/hooks/use-visibility'
import parseTraffic from '@/utils/parse-traffic'

import { EnhancedCanvasTrafficGraph } from './enhanced-canvas-traffic-graph'

export const PersonalTrafficMetric = ({
  direction,
}: {
  direction: 'up' | 'down'
}) => {
  const { t } = useTranslation()
  const visible = useVisibility()
  const {
    response: { data: traffic },
  } = useTrafficData({ enabled: visible })
  const [value, unit] = parseTraffic(traffic?.[direction] ?? 0)
  const [total, totalUnit] = parseTraffic(
    traffic?.[direction === 'up' ? 'upTotal' : 'downTotal'] ?? 0,
  )
  return (
    <Box className="personal-metric">
      <div className="personal-metric-label">
        <PersonalIcon name={direction === 'up' ? 'upload' : 'download'} />
        {t(
          direction === 'up'
            ? 'home.components.traffic.metrics.uploadSpeed'
            : 'home.components.traffic.metrics.downloadSpeed',
        )}
      </div>
      <div className="personal-metric-value">
        {value}
        <small>{unit}/s</small>
      </div>
      <Typography sx={{ fontSize: 10, mt: 2, color: 'text.secondary' }}>
        {t(
          direction === 'up'
            ? 'shared.labels.uploaded'
            : 'shared.labels.downloaded',
        )}{' '}
        · {total} {totalUnit}
      </Typography>
    </Box>
  )
}

export const PersonalTrafficChart = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const visible = useVisibility()
  const {
    response: { data },
  } = useConnectionSummaryData({ enabled: visible })
  return (
    <Box className="personal-chart-card">
      <Typography sx={{ fontSize: 13, fontWeight: 600, px: 2.5, pt: 2.5 }}>
        {t('home.page.cards.trafficStats')}
      </Typography>
      <Box sx={{ height: 210, p: 1, minWidth: 0 }}>
        {visible && <EnhancedCanvasTrafficGraph />}
      </Box>
      <div className="personal-chart-footer">
        <span>
          {t('home.components.traffic.metrics.activeConnections')} ·{' '}
          {data?.activeConnectionCount ?? 0}
        </span>
        <button onClick={() => navigate('/connections')}>
          {t('connections.page.title')} <PersonalIcon name="arrow" />
        </button>
      </div>
    </Box>
  )
}
