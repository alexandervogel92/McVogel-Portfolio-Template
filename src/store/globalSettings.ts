import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useTheme } from 'vuetify';

interface ThemeSettings {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  info: string;
  success: string;
  warning: string;
  headingColor: string;
  bodyColor: string;
  backgroundColor: string;
  containerColor: string;
  buttonColor: string;
  buttonTextColor: string;
  navBackgroundColor: string;
  navTextColor: string;
  fontFamily: string;
  [key: string]: string;
}

export const availableFonts = [
  { title: 'Roboto (Standard)', value: 'Roboto, sans-serif' },
  { title: 'Open Sans', value: '"Open Sans", sans-serif' },
  { title: 'Lato', value: 'Lato, sans-serif' },
  { title: 'Montserrat', value: 'Montserrat, sans-serif' },
  { title: 'Source Code Pro', value: '"Source Code Pro", monospace' },
];

const defaultThemeSettings: ThemeSettings = {
  primary: '#2196F3',
  secondary: '#607D8B',
  accent: '#FFC107',
  error: '#F44336',
  info: '#03A9F4',
  success: '#4CAF50',
  warning: '#FF9800',
  headingColor: '#E0E0E0',
  bodyColor: '#B0BEC5',
  backgroundColor: '#121212',
  containerColor: '#1E1E1E',
  buttonColor: '#2196F3',
  buttonTextColor: '#FFFFFF',
  navBackgroundColor: '#1E1E1E',
  navTextColor: '#B0BEC5',
  fontFamily: availableFonts[0].value,
};

const defaultLightThemeSettings: ThemeSettings = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  headingColor: '#333333',
  bodyColor: '#333333',
  backgroundColor: '#FFFFFF',
  containerColor: '#FFFFFF',
  buttonColor: '#1976D2',
  buttonTextColor: '#FFFFFF',
  navBackgroundColor: '#FFFFFF',
  navTextColor: '#424242',
  fontFamily: availableFonts[0].value,
};

const defaultDarkThemeSettings: ThemeSettings = {
  primary: '#2196F3',
  secondary: '#607D8B',
  accent: '#FFC107',
  error: '#F44336',
  info: '#03A9F4',
  success: '#4CAF50',
  warning: '#FF9800',
  headingColor: '#E0E0E0',
  bodyColor: '#B0BEC5',
  backgroundColor: '#121212',
  containerColor: '#1E1E1E',
  buttonColor: '#2196F3',
  buttonTextColor: '#FFFFFF',
  navBackgroundColor: '#1E1E1E',
  navTextColor: '#B0BEC5',
  fontFamily: availableFonts[0].value,
};

function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        const parsed = JSON.parse(storedValue) as T;
        if (key === 'portfolioLanguage' && parsed !== 'DE' && parsed !== 'EN') {
          throw new Error('Ungültiger Sprachwert');
        }
        return parsed;
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        localStorage.removeItem(key);
      }
    }
  }
  return defaultValue;
}


function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const useGlobalSettingsStore = defineStore('globalSettings', () => {
  const theme = useTheme();

  const currentLanguage = ref<'DE' | 'EN'>(loadFromLocalStorage<'DE' | 'EN'>('portfolioLanguage', 'DE'));
  const themeMode = ref<'light' | 'dark'>(loadFromLocalStorage<'light' | 'dark'>('portfolioThemeMode', 'dark'));
  const lightThemeSettings = ref<ThemeSettings>(
    loadFromLocalStorage<ThemeSettings>('portfolioLightThemeSettings', { ...defaultLightThemeSettings })
  );
  const darkThemeSettings = ref<ThemeSettings>(
    loadFromLocalStorage<ThemeSettings>('portfolioDarkThemeSettings', { ...defaultDarkThemeSettings })
  );

  const themeSettings = computed(() =>
    themeMode.value === 'light' ? lightThemeSettings.value : darkThemeSettings.value
  );

  const isDefaultFont = computed(() => themeSettings.value.fontFamily === defaultThemeSettings.fontFamily);

  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'DE' ? 'EN' : 'DE';
  }

  function setLanguage(lang: 'DE' | 'EN') {
    currentLanguage.value = lang;
  }

  function toggleTheme() {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light';
  }

  function setThemeMode(mode: 'light' | 'dark') {
    themeMode.value = mode;
  }


  function resetThemeSettings() {
    lightThemeSettings.value = { ...defaultLightThemeSettings };
    darkThemeSettings.value = { ...defaultDarkThemeSettings };
  }

  function updateThemeSetting(key: keyof ThemeSettings, value: string) {
    if (themeMode.value === 'light') {
      lightThemeSettings.value[key] = value;
    } else {
      darkThemeSettings.value[key] = value;
    }
  }


  const loadedFonts = new Set<string>();

  function loadGoogleFont(fontFamily: string) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (isDefaultFont.value || loadedFonts.has(fontFamily)) return;

    const fontName = fontFamily.split(',')[0].replace(/['"]/g, '').trim();

    if (!fontName || fontName.toLowerCase() === 'sans-serif' || fontName.toLowerCase() === 'monospace') return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}&display=swap`;
    link.rel = 'stylesheet';

    if (document.head) {
      document.head.appendChild(link);
      loadedFonts.add(fontFamily);
    } else {
      console.error("Could not find document.head to append font link.");
    }
  }

  function applyCustomStyles(settings: ThemeSettings) {
    ['light', 'dark'].forEach(mode => {
      if (theme.themes.value[mode]) {
        const currentTheme = theme.themes.value[mode];
        currentTheme.colors = {
          ...currentTheme.colors,
          primary: settings.primary,
          secondary: settings.secondary,
          accent: settings.accent,
          error: settings.error,
          info: settings.info,
          success: settings.success,
          warning: settings.warning,
          background: settings.backgroundColor,
          surface: settings.containerColor,
        };
      } else {
        console.warn(`Vuetify theme '${mode}' not found.`);
      }
    });

    if (typeof document !== 'undefined' && document.documentElement) {
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--heading-color', settings.headingColor);
      rootStyle.setProperty('--body-color', settings.bodyColor);
      rootStyle.setProperty('--background-color', settings.backgroundColor);
      rootStyle.setProperty('--container-color', settings.containerColor);
      rootStyle.setProperty('--button-color', settings.buttonColor);
      rootStyle.setProperty('--button-text-color', settings.buttonTextColor);
      rootStyle.setProperty('--nav-background-color', settings.navBackgroundColor);
      rootStyle.setProperty('--nav-text-color', settings.navTextColor);
      rootStyle.setProperty('--font-family', settings.fontFamily);

      if (document.body) {
        document.body.style.fontFamily = settings.fontFamily;
      }

      loadGoogleFont(settings.fontFamily);
    }
  }


  watch(currentLanguage, (newLang) => saveToLocalStorage('portfolioLanguage', newLang));

  watch(themeMode, (newMode) => {
    saveToLocalStorage('portfolioThemeMode', newMode);
    if (theme.global && theme.global.current) {
      theme.global.current.value = newMode;
    } else {
      console.error('Vuetify theme global object not available.');
    }
    const settings = newMode === 'light' ? lightThemeSettings.value : darkThemeSettings.value;
    applyCustomStyles(settings);
  }, { immediate: true });

  watch(lightThemeSettings, (newSettings) => {
    saveToLocalStorage('portfolioLightThemeSettings', newSettings);
    if (themeMode.value === 'light') applyCustomStyles(newSettings);
  }, { deep: true, immediate: true });

  watch(darkThemeSettings, (newSettings) => {
    saveToLocalStorage('portfolioDarkThemeSettings', newSettings);
    if (themeMode.value === 'dark') applyCustomStyles(newSettings);
  }, { deep: true, immediate: true });


  return {
    currentLanguage,
    themeMode,
    themeSettings,
    isDefaultFont,
    toggleLanguage,
    setLanguage,
    toggleTheme,
    setThemeMode,
    resetThemeSettings,
    updateThemeSetting,
  };
});
