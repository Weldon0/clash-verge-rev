import getSystem from '@/utils/get-system'
const OS = getSystem()

// default theme setting
export const defaultTheme = {
  primary_color: '#D76B46',
  secondary_color: '#404C62',
  primary_text: '#25292F',
  secondary_text: '#767E8A',
  info_color: '#D76B46',
  error_color: '#FF3B30',
  warning_color: '#FF9500',
  success_color: '#32896D',
  background_color: '#F6F7F9',
  surface_color: '#FFFFFF',
  font_family: `"Avenir Next", "PingFang SC", -apple-system, BlinkMacSystemFont,"Microsoft YaHei UI", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji"${
    OS === 'windows' ? ', twemoji mozilla' : ''
  }`,
}

// dark mode
export const defaultDarkTheme = {
  ...defaultTheme,
  primary_color: '#E48A67',
  secondary_color: '#FF9F0A',
  primary_text: '#E5E8EF',
  background_color: '#1C1F25',
  surface_color: '#23272F',
  secondary_text: '#858D9B',
  info_color: '#E48A67',
  error_color: '#FF453A',
  warning_color: '#FF9F0A',
  success_color: '#78B79C',
}
