// src/store/globalSettings.ts
import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useTheme } from 'vuetify';

// Definiere die Struktur für die Theme-Einstellungen
interface ThemeSettings {
  // Kernfarben (werden direkt an Vuetify übergeben)
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  info: string;
  success: string;
  warning: string;
  // Zusätzliche Farben & Schriftart (werden über CSS Variablen gesteuert)
  headingColor: string;
  bodyColor: string;
  backgroundColor: string;
  containerColor: string;
  buttonColor: string; // Neu: Button Hintergrundfarbe
  buttonTextColor: string; // Neu: Button Textfarbe
  navBackgroundColor: string; // Neu: Navigationshintergrund
  navTextColor: string; // Neu: Navigationstextfarbe
  fontFamily: string;
  [key: string]: string; // Index-Signatur für dynamischen Zugriff
}

// Liste vordefinierter Schriftarten (Beispiele)
export const availableFonts = [
  { title: 'Roboto (Standard)', value: 'Roboto, sans-serif' },
  { title: 'Open Sans', value: '"Open Sans", sans-serif' },
  { title: 'Lato', value: 'Lato, sans-serif' },
  { title: 'Montserrat', value: 'Montserrat, sans-serif' },
  { title: 'Source Code Pro', value: '"Source Code Pro", monospace' },
];

// Standardwerte für das Theme
const defaultThemeSettings: ThemeSettings = {
  primary: '#2196F3', // Helleres Blau als Beispiel
  secondary: '#607D8B', // Blau-Grau
  accent: '#FFC107', // Amber Akzent
  error: '#F44336', // Rot
  info: '#03A9F4', // Hellblau
  success: '#4CAF50', // Grün
  warning: '#FF9800', // Orange
  headingColor: '#E0E0E0', // Helleres Grau für Überschriften im Dark Mode
  bodyColor: '#B0BEC5', // Blau-Grau für Text
  backgroundColor: '#121212', // Dunkler Hintergrund
  containerColor: '#1E1E1E', // Etwas hellerer Container/Karten Hintergrund
  buttonColor: '#2196F3', // Button nutzt Primärfarbe standardmäßig
  buttonTextColor: '#FFFFFF', // Weißer Text auf Buttons
  navBackgroundColor: '#1E1E1E', // Navigationshintergrund wie Container
  navTextColor: '#B0BEC5', // Navigationstext wie Body
  fontFamily: availableFonts[0].value, // Standard: Roboto
};

const defaultLightThemeSettings: ThemeSettings = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
  headingColor: '#333333',   // Beispielwerte für Light Mode
  bodyColor: '#333333',
  backgroundColor: '#FFFFFF', // Heller Hintergrund
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
  backgroundColor: '#121212', // Dunkler Hintergrund
  containerColor: '#1E1E1E',
  buttonColor: '#2196F3',
  buttonTextColor: '#FFFFFF',
  navBackgroundColor: '#1E1E1E',
  navTextColor: '#B0BEC5',
  fontFamily: availableFonts[0].value,
};

// Helper Funktion zum Laden aus LocalStorage
function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        const parsed = JSON.parse(storedValue) as T;
        // Beispielhafte Validierung für die Sprache:
        if (key === 'portfolioLanguage' && parsed !== 'DE' && parsed !== 'EN') {
          throw new Error('Ungültiger Sprachwert');
        }
        return parsed;
      } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        localStorage.removeItem(key); // Entferne den ungültigen Wert
      }
    }
  }
  return defaultValue;
}


// Helper Funktion zum Speichern in LocalStorage
function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const useGlobalSettingsStore = defineStore('globalSettings', () => {
  const theme = useTheme();

  // --- Reactive State ---
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

  // --- Computed ---
  // Berechne, ob die aktuelle Schriftart die Standard-Schriftart ist
  const isDefaultFont = computed(() => themeSettings.value.fontFamily === defaultThemeSettings.fontFamily);

  // --- Actions ---
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

  // ============================================================
  // HILFSFUNKTIONEN FÜR STYLES (VOR WATCHERS DEFINIEREN)
  // ============================================================

  // Set zum Speichern bereits geladener Fonts
  const loadedFonts = new Set<string>();

  // Funktion zum dynamischen Laden von Google Fonts
  function loadGoogleFont(fontFamily: string) {
    // Sicherstellen, dass wir im Browser-Kontext sind
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Nicht laden, wenn es die Standard-Schriftart ist oder bereits geladen wurde
    if (isDefaultFont.value || loadedFonts.has(fontFamily)) return;

    // Extrahiere Font-Namen (vereinfachte Annahme: erster Teil vor Komma)
    const fontName = fontFamily.split(',')[0].replace(/['"]/g, '').trim();

    // Nicht für generische Fallbacks wie 'sans-serif' laden
    if (!fontName || fontName.toLowerCase() === 'sans-serif' || fontName.toLowerCase() === 'monospace') return;

    // Erstelle Link-Element für Google Fonts
    const link = document.createElement('link');
    // Beispiel: Lade regular (400) & bold (700) Schriftschnitte
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';

    // Füge Link zum <head> hinzu und markiere Font als geladen
    // Stelle sicher, dass document.head existiert
    if (document.head) {
      document.head.appendChild(link);
      loadedFonts.add(fontFamily); // Markiere als geladen
      console.log(`Font '${fontName}' loaded.`);
    } else {
      console.error("Could not find document.head to append font link.");
    }
  }

  // Funktion zum Anwenden der benutzerdefinierten Farben und Stile
  function applyCustomStyles(settings: ThemeSettings) {
    // Wende Kernfarben auf das *beide* Vuetify Themes an (Light & Dark)
    ['light', 'dark'].forEach(mode => {
      // Sicherstellen, dass das Theme existiert
      if (theme.themes.value[mode]) {
        const currentTheme = theme.themes.value[mode];
        currentTheme.colors = {
          ...currentTheme.colors, // Behalte andere Standardfarben bei
          primary: settings.primary,
          secondary: settings.secondary,
          accent: settings.accent,
          error: settings.error,
          info: settings.info,
          success: settings.success,
          warning: settings.warning,
          background: settings.backgroundColor, // Hintergrund auch direkt setzen
          surface: settings.containerColor, // Surface (für Karten etc.) auch setzen
        };
      } else {
        console.warn(`Vuetify theme '${mode}' not found.`);
      }
    });

    // Wende andere Stile über CSS Variablen an (nur im Browser)
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

      // Setze globale Schriftart auf body (wichtiger als v-app für Vererbung)
      // Stelle sicher, dass document.body existiert
      if (document.body) {
        document.body.style.fontFamily = settings.fontFamily;
      }

      // Lade Google Font dynamisch, falls nötig
      loadGoogleFont(settings.fontFamily);
    }
  }

  // ============================================================
  // WATCHERS (NACH DEFINITION DER HILFSFUNKTIONEN)
  // ============================================================

  // Speichern im LocalStorage bei Änderungen
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


  // ============================================================
  // RETURN STATEMENT
  // ============================================================
  return {
    currentLanguage,
    themeMode,
    themeSettings,
    isDefaultFont, // Exportiere computed property
    toggleLanguage,
    setLanguage,
    toggleTheme,
    setThemeMode,
    resetThemeSettings,
    updateThemeSetting, // Exportiere die Update-Funktion
    // applyCustomStyles und loadGoogleFont müssen nicht exportiert werden,
    // da sie nur intern durch die Watcher verwendet werden.
  };
});
