import { type ComponentType, type ReactNode } from 'react'

import { PersonalIcon } from '@/components/layout/personal-icon'

import { navigationItems } from './_navigation-meta'
import ConnectionsPage from './connections'
import HomePage from './home'
import LogsPage from './logs'
import ProfilePage from './profiles'
import ProxyPage from './proxies'
import RulesPage from './rules'
import SettingPage from './settings'
import UnlockPage from './unlock'

type NavigationItem = {
  label: (typeof navigationItems)[keyof typeof navigationItems]['label']
  path: string
  icon: ReactNode[]
  Component: ComponentType
}

export const navItems: NavigationItem[] = [
  {
    ...navigationItems.home,
    icon: [
      <PersonalIcon key="line" name="overview" />,
      <PersonalIcon key="line-alt" name="overview" />,
    ],
    Component: HomePage,
  },
  {
    ...navigationItems.proxies,
    icon: [
      <PersonalIcon key="line" name="nodes" />,
      <PersonalIcon key="line-alt" name="nodes" />,
    ],
    Component: ProxyPage,
  },
  {
    ...navigationItems.profiles,
    icon: [
      <PersonalIcon key="line" name="profiles" />,
      <PersonalIcon key="line-alt" name="profiles" />,
    ],
    Component: ProfilePage,
  },
  {
    ...navigationItems.connections,
    icon: [
      <PersonalIcon key="line" name="connections" />,
      <PersonalIcon key="line-alt" name="connections" />,
    ],
    Component: ConnectionsPage,
  },
  {
    ...navigationItems.rules,
    icon: [
      <PersonalIcon key="line" name="rules" />,
      <PersonalIcon key="line-alt" name="rules" />,
    ],
    Component: RulesPage,
  },
  {
    ...navigationItems.logs,
    icon: [
      <PersonalIcon key="line" name="logs" />,
      <PersonalIcon key="line-alt" name="logs" />,
    ],
    Component: LogsPage,
  },
  {
    ...navigationItems.unlock,
    icon: [
      <PersonalIcon key="line" name="unlock" />,
      <PersonalIcon key="line-alt" name="unlock" />,
    ],
    Component: UnlockPage,
  },
  {
    ...navigationItems.settings,
    icon: [
      <PersonalIcon key="line" name="settings" />,
      <PersonalIcon key="line-alt" name="settings" />,
    ],
    Component: SettingPage,
  },
]
