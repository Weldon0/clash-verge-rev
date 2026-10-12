import type { CSSProperties, ReactNode } from 'react'

const paths: Record<string, ReactNode> = {
  overview: (
    <>
      {' '}
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.5" />{' '}
    </>
  ),
  nodes: (
    <>
      {' '}
      <path d="M4 9a12 12 0 0 1 16 0M7 12.5a7.5 7.5 0 0 1 10 0M10 16a3 3 0 0 1 4 0" />
      <circle cx="12" cy="19.5" r=".7" fill="currentColor" stroke="none" />{' '}
    </>
  ),
  profiles: (
    <>
      {' '}
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="14" width="16" height="6" rx="2" />
      <path d="M7.5 7h.01M7.5 17h.01M15 7h2M15 17h2" />{' '}
    </>
  ),
  connections: (
    <>
      {' '}
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H15a3 3 0 0 1 3 3v6.5M6 8.5V15a3 3 0 0 0 3 3h6.5" />{' '}
    </>
  ),
  rules: (
    <>
      {' '}
      <path d="M7 4v10a4 4 0 0 0 4 4h7M14 14l4 4-4 4M7 10h10M14 6l4 4-4 4" />{' '}
    </>
  ),
  logs: (
    <>
      {' '}
      <path d="M5 5h14M5 10h14M5 15h9M5 20h6" />{' '}
    </>
  ),
  unlock: (
    <>
      {' '}
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 7.5-2M12 14v3" />{' '}
    </>
  ),
  settings: (
    <>
      {' '}
      <path d="m9 4 .6-2h4.8l.6 2 2 .9 1.9-.5 2.4 4.2-1.4 1.5v2.3l1.4 1.5-2.4 4.2-1.9-.5-2 .9-.6 2H9.6l-.6-2-2-.9-1.9.5-2.4-4.2 1.4-1.5v-2.3L2.7 8.6l2.4-4.2 1.9.5L9 4Z" />
      <circle cx="12" cy="11.3" r="3" />{' '}
    </>
  ),
  moon: (
    <>
      {' '}
      <path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" />{' '}
    </>
  ),
  sun: (
    <>
      {' '}
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />{' '}
    </>
  ),
  keyboard: (
    <>
      {' '}
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M9 14h6M18 14h.01" />{' '}
    </>
  ),
  chevron: (
    <>
      {' '}
      <path d="m9 5 7 7-7 7" />{' '}
    </>
  ),
  arrow: (
    <>
      {' '}
      <path d="M5 12h14M14 7l5 5-5 5" />{' '}
    </>
  ),
  download: (
    <>
      {' '}
      <path d="M12 3v13M7 11l5 5 5-5M5 20h14" />{' '}
    </>
  ),
  upload: (
    <>
      {' '}
      <path d="M12 17V4M7 9l5-5 5 5M5 20h14" />{' '}
    </>
  ),
  check: (
    <>
      {' '}
      <path d="m5 12 4 4L19 6" />{' '}
    </>
  ),
  signal: (
    <>
      {' '}
      <path d="M5 18v-3M10 18v-6M15 18V9M20 18V5" />{' '}
    </>
  ),
  globe: (
    <>
      {' '}
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />{' '}
    </>
  ),
  refresh: (
    <>
      {' '}
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M6.3 6a8 8 0 0 1 13 3M4.7 15a8 8 0 0 0 13 3" />{' '}
    </>
  ),
  plus: (
    <>
      {' '}
      <path d="M12 5v14M5 12h14" />{' '}
    </>
  ),
  search: (
    <>
      {' '}
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />{' '}
    </>
  ),
  close: (
    <>
      {' '}
      <path d="m6 6 12 12M18 6 6 18" />{' '}
    </>
  ),
  clock: (
    <>
      {' '}
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />{' '}
    </>
  ),
  shield: (
    <>
      {' '}
      <path d="m12 3 8 3v5c0 5-8 10-8 10S4 16 4 11V6l8-3Z" />
      <path d="m8.5 11 2.5 2.5 4.5-5" />{' '}
    </>
  ),
  sort: (
    <>
      {' '}
      <path d="M4 6h16M4 12h11M4 18h6" />{' '}
    </>
  ),
  external: (
    <>
      {' '}
      <path d="M14 4h6v6M20 4l-9 9M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />{' '}
    </>
  ),
  stop: (
    <>
      {' '}
      <rect x="5" y="5" width="14" height="14" rx="2" />{' '}
    </>
  ),
}

export const PersonalIcon = ({
  name,
  style,
}: {
  name: string
  style?: CSSProperties
}) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.65"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={style}
  >
    {paths[name] ?? paths.overview}
  </svg>
)
