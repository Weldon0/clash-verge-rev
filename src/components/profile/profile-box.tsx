import { alpha, Box, styled } from '@mui/material'

export const ProfileBox = styled(Box)(
  ({ theme, 'aria-selected': selected }) => ({
    position: 'relative',
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '14px 18px',
    boxSizing: 'border-box',
    backgroundColor: selected
      ? alpha(theme.palette.primary.main, 0.06)
      : theme.palette.background.paper,
    border: '1px solid',
    borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
    borderRadius: '14px',
    color: theme.palette.text.secondary,
    transition: 'border-color 160ms ease, background-color 160ms ease',
    '&:hover': { borderColor: alpha(theme.palette.primary.main, 0.5) },
    '& h2': {
      color: selected ? theme.palette.primary.main : theme.palette.text.primary,
    },
  }),
)
