import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import type { ReactNode } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router'

import type { SortableItemRenderProps } from '@/components/base/sortable-item'
import { useVerge } from '@/hooks/use-verge'

interface Props {
  to: string
  children: string
  icon: ReactNode[]
  sortable?: SortableItemRenderProps
}
export const LayoutItem = (props: Props) => {
  const { to, children, icon, sortable } = props
  const { verge } = useVerge()
  const { menu_icon } = verge ?? {}
  const navCollapsed = verge?.collapse_navbar ?? false
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  const navigate = useNavigate()

  const effectiveMenuIcon =
    navCollapsed && menu_icon === 'disable' ? 'monochrome' : menu_icon

  return (
    <ListItem
      ref={sortable?.ref}
      style={sortable?.style}
      sx={{ maxWidth: 250, mx: 'auto', padding: '2px 0' }}
    >
      <ListItemButton
        ref={sortable?.handleRef}
        selected={!!match}
        aria-current={match ? 'page' : undefined}
        sx={[
          {
            borderRadius: '10px',
            minHeight: 44,
            transition: 'background-color 160ms ease, color 160ms ease',
            marginLeft: 2,
            paddingLeft: 1,
            paddingRight: 1,
            marginRight: 2,
            cursor: 'pointer',
            '& .MuiListItemText-primary': {
              color: match ? 'text.primary' : 'text.secondary',
              fontWeight: 500,
              fontSize: 13,
            },
          },
          ({ palette }) => ({
            '&.Mui-selected, &.Mui-selected:hover': {
              bgcolor: palette.mode === 'light' ? '#ffffff' : '#282d36',
              boxShadow: '0 2px 5px #20293808',
            },
            '&.Mui-selected .MuiListItemIcon-root': { color: 'primary.main' },
            '&.Mui-selected::after': {
              content: '""',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: palette.primary.main,
              marginLeft: 'auto',
              flexShrink: 0,
            },
          }),
        ]}
        title={navCollapsed ? children : undefined}
        aria-label={navCollapsed ? children : undefined}
        onClick={() => navigate(to)}
      >
        {(effectiveMenuIcon === 'monochrome' || !effectiveMenuIcon) && (
          <ListItemIcon
            sx={{
              color: match ? 'primary.main' : 'text.secondary',
              minWidth: 34,
              marginLeft: '6px',
              '& svg': { width: 18, height: 18 },
              cursor: 'inherit',
            }}
          >
            {icon[0]}
          </ListItemIcon>
        )}
        {effectiveMenuIcon === 'colorful' && (
          <ListItemIcon sx={{ cursor: 'inherit', minWidth: 40 }}>
            {icon[1]}
          </ListItemIcon>
        )}
        <ListItemText
          sx={{
            textAlign: 'left',
            marginLeft: effectiveMenuIcon === 'disable' ? 1 : 0,
          }}
          primary={children}
        />
      </ListItemButton>
    </ListItem>
  )
}
