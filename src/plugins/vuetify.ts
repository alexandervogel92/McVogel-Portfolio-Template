
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { lightThemeColors, darkThemeColors } from '@/styles/themeColors'

const defaultLightColors = {
  primary: lightThemeColors.primary,
  secondary: lightThemeColors.secondary,
  accent: lightThemeColors.accent,
  error: lightThemeColors.error,
  info: lightThemeColors.info,
  success: lightThemeColors.success,
  warning: lightThemeColors.warning,
  background: lightThemeColors.backgroundColor,
  surface: lightThemeColors.containerColor,
}

const defaultDarkColors = {
  primary: darkThemeColors.primary,
  secondary: darkThemeColors.secondary,
  accent: darkThemeColors.accent,
  error: darkThemeColors.error,
  info: darkThemeColors.info,
  success: darkThemeColors.success,
  warning: darkThemeColors.warning,
  background: darkThemeColors.backgroundColor,
  surface: darkThemeColors.containerColor,
}

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: defaultLightColors,
};

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: defaultDarkColors,
};


export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})
