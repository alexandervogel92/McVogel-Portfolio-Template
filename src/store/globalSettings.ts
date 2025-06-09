import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useTheme } from 'vuetify'
import { lightThemeColors, darkThemeColors } from '@/styles/themeColors'

export const availableFonts = [
  { title: 'Roboto (Standard)', value: 'Roboto, sans-serif' },
  { title: 'Open Sans', value: '"Open Sans", sans-serif' },
  { title: 'Lato', value: 'Lato, sans-serif' },
  { title: 'Montserrat', value: 'Montserrat, sans-serif' },
  { title: 'Source Code Pro', value: '"Source Code Pro", monospace' },
]

function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key)
    if (storedValue) {
      try {
        const parsed = JSON.parse(storedValue) as T
        if (key === 'portfolioLanguage' && parsed !== 'DE' && parsed !== 'EN') {
          throw new Error('Invalid language value')
        }
        return parsed
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e)
        localStorage.removeItem(key)
      }
    }
  }
  return defaultValue
}

function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const useGlobalSettingsStore = defineStore('globalSettings', () => {
  const theme = useTheme()

  const currentLanguage = ref<'DE' | 'EN'>(
    loadFromLocalStorage<'DE' | 'EN'>('portfolioLanguage', 'DE')
  )
  const themeMode = ref<'light' | 'dark'>(
    loadFromLocalStorage<'light' | 'dark'>('portfolioThemeMode', 'dark')
  )
  const fontFamily = ref<string>(
    loadFromLocalStorage<string>('portfolioFontFamily', availableFonts[0].value)
  )

  const isDefaultFont = computed(
    () => fontFamily.value === availableFonts[0].value
  )

  const loadedFonts = new Set<string>()

  function loadGoogleFont(font: string) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (isDefaultFont.value || loadedFonts.has(font)) return
    const fontName = font.split(',')[0].replace(/['"]/g, '').trim()
    if (!fontName || fontName.toLowerCase() === 'sans-serif' || fontName.toLowerCase() === 'monospace') return
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}&display=swap`
    link.rel = 'stylesheet'
    if (document.head) {
      document.head.appendChild(link)
      loadedFonts.add(font)
    }
  }

  function applyTheme() {
    const colors = themeMode.value === 'light' ? lightThemeColors : darkThemeColors

    if (theme.global && theme.global.current) {
      theme.global.current.value = themeMode.value
    }

    ;['light', 'dark'].forEach(mode => {
      if (theme.themes.value[mode]) {
        const c = mode === 'light' ? lightThemeColors : darkThemeColors
        const currentTheme = theme.themes.value[mode]
        currentTheme.colors = {
          ...currentTheme.colors,
          primary: c.primary,
          secondary: c.secondary,
          accent: c.accent,
          error: c.error,
          info: c.info,
          success: c.success,
          warning: c.warning,
          background: c.backgroundColor,
          surface: c.containerColor,
        }
      }
    })

    if (typeof document !== 'undefined' && document.documentElement) {
      const root = document.documentElement.style
      root.setProperty('--heading-color', colors.headingColor)
      root.setProperty('--body-color', colors.bodyColor)
      root.setProperty('--background-color', colors.backgroundColor)
      root.setProperty('--container-color', colors.containerColor)
      root.setProperty('--button-color', colors.buttonColor)
      root.setProperty('--button-text-color', colors.buttonTextColor)
      root.setProperty('--nav-background-color', colors.navBackgroundColor)
      root.setProperty('--nav-text-color', colors.navTextColor)
      root.setProperty('--font-family', fontFamily.value)

      if (document.body) {
        document.body.style.fontFamily = fontFamily.value
      }
    }

    loadGoogleFont(fontFamily.value)
  }

  watch(currentLanguage, newLang =>
    saveToLocalStorage('portfolioLanguage', newLang)
  )

  watch(
    themeMode,
    mode => {
      saveToLocalStorage('portfolioThemeMode', mode)
      applyTheme()
    },
    { immediate: true }
  )

  watch(
    fontFamily,
    font => {
      saveToLocalStorage('portfolioFontFamily', font)
      applyTheme()
    },
    { immediate: true }
  )

  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'DE' ? 'EN' : 'DE'
  }

  function setLanguage(lang: 'DE' | 'EN') {
    currentLanguage.value = lang
  }

  function toggleTheme() {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
  }

  function setThemeMode(mode: 'light' | 'dark') {
    themeMode.value = mode
  }

  function setFontFamily(font: string) {
    fontFamily.value = font
  }

  return {
    currentLanguage,
    themeMode,
    fontFamily,
    isDefaultFont,
    toggleLanguage,
    setLanguage,
    toggleTheme,
    setThemeMode,
    setFontFamily,
  }
})
