import {
  alpha,
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
            minHeight: 42,
            transition: 'background-color 160ms ease, color 160ms ease',
            marginLeft: 1.25,
            paddingLeft: 1,
            paddingRight: 1,
            marginRight: 1.25,
            cursor: 'pointer',
            '& .MuiListItemText-primary': {
              color: 'text.primary',
              fontWeight: match ? 600 : 500,
              fontSize: 13,
            },
          },
          ({ palette: { mode, primary } }) => {
            const bgcolor =
              mode === 'light'
                ? alpha(primary.main, 0.1)
                : alpha(primary.main, 0.16)
            const color = mode === 'light' ? primary.main : primary.light
            return {
              '&.Mui-selected': { bgcolor },
              '&.Mui-selected:hover': { bgcolor },
              '&.Mui-selected .MuiListItemText-primary': { color },
              '&.Mui-selected .MuiListItemIcon-root': { color },
            }
          },
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
              '& svg': { fontSize: 21 },
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
