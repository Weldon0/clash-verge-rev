import { GitHub, HelpOutlineRounded, Telegram } from '@mui/icons-material'
import { Box, Button, ButtonGroup, IconButton } from '@mui/material'
import { useLockFn } from 'ahooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BasePage } from '@/components/base'
import SettingClash from '@/components/setting/setting-clash'
import SettingSystem from '@/components/setting/setting-system'
import SettingVergeAdvanced from '@/components/setting/setting-verge-advanced'
import SettingVergeBasic from '@/components/setting/setting-verge-basic'
import { showNotice } from '@/services/notice-service'
import { openExternalUrl } from '@/utils/open-external-url'

const SettingPage = () => {
  const { t } = useTranslation()
  const [section, setSection] = useState('appearance')
  const sections = [
    {
      id: 'appearance',
      label: t('settings.components.verge.basic.title'),
      Component: SettingVergeBasic,
    },
    {
      id: 'system',
      label: t('settings.sections.system.title'),
      Component: SettingSystem,
    },
    {
      id: 'clash',
      label: t('settings.sections.clash.title'),
      Component: SettingClash,
    },
    {
      id: 'advanced',
      label: t('settings.components.verge.advanced.title'),
      Component: SettingVergeAdvanced,
    },
  ]
  const ActiveSection = sections.find((item) => item.id === section)!.Component

  const onError = (err: any) => {
    showNotice.error(err)
  }

  const toGithubRepo = useLockFn(() =>
    openExternalUrl('https://github.com/clash-verge-rev/clash-verge-rev').catch(
      onError,
    ),
  )

  const toGithubDoc = useLockFn(() =>
    openExternalUrl('https://clash-verge-rev.github.io/index.html').catch(
      onError,
    ),
  )

  const toTelegramChannel = useLockFn(() =>
    openExternalUrl('https://t.me/clash_verge_re').catch(onError),
  )

  return (
    <BasePage
      title={t('settings.page.title')}
      header={
        <ButtonGroup
          variant="contained"
          aria-label={t('settings.page.actionsGroupLabel')}
        >
          <IconButton
            size="medium"
            color="inherit"
            title={t('settings.page.actions.manual')}
            onClick={toGithubDoc}
          >
            <HelpOutlineRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
            title={t('settings.page.actions.telegram')}
            onClick={toTelegramChannel}
          >
            <Telegram fontSize="inherit" />
          </IconButton>

          <IconButton
            size="medium"
            color="inherit"
            title={t('settings.page.actions.github')}
            onClick={toGithubRepo}
          >
            <GitHub fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      }
    >
      <div className="personal-settings">
        <nav aria-label={t('settings.page.title')}>
          {sections.map((item) => (
            <Button
              key={item.id}
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => setSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <Box className="personal-setting-panel">
          <ActiveSection onError={onError} />
        </Box>
      </div>
    </BasePage>
  )
}

export default SettingPage
