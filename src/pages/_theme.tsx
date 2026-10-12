import getSystem from '@/utils/get-system'
const OS = getSystem()

// default theme setting
export const defaultTheme = {
  primary_color: '#087F73',
  secondary_color: '#D69B61',
  primary_text: '#20332F',
  secondary_text: '#687A74',
  info_color: '#087F73',
  error_color: '#FF3B30',
  warning_color: '#FF9500',
  success_color: '#06943D',
  background_color: '#F3F5F1',
  surface_color: '#FFFFFF',
  font_family: `"Avenir Next", "PingFang SC", -apple-system, BlinkMacSystemFont,"Microsoft YaHei UI", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji"${
    OS === 'windows' ? ', twemoji mozilla' : ''
  }`,
}

// dark mode
export const defaultDarkTheme = {
  ...defaultTheme,
  primary_color: '#5BC6B0',
  secondary_color: '#FF9F0A',
  primary_text: '#E6EEE9',
  background_color: '#171F1D',
  surface_color: '#202B27',
  secondary_text: '#A0B1AA',
  info_color: '#5BC6B0',
  error_color: '#FF453A',
  warning_color: '#FF9F0A',
  success_color: '#30D158',
}
