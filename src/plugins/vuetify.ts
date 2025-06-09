
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { useGlobalSettingsStore } from '@/store/globalSettings';

const defaultLightColors = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  background: '#FFFFFF',
  surface: '#FFFFFF',
};

const defaultDarkColors = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  background: '#121212',
  surface: '#1E1E1E',
};

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
