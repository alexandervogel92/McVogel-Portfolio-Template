// Plugins

import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite'; // Beachte: Schriftarten werden auch dynamisch im Store geladen

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls }, // Wichtig für Vuetify Asset-Pfade
    }),

    // Vuetify Plugin
    Vuetify({
      autoImport: true, // Vuetify-Komponenten automatisch importieren

      // --- STYLES KONFIGURATION ---
      // Wähle EINE der folgenden Optionen aus:

      // Option 1 (Empfohlen, wenn du KEINE eigene 'settings.scss' verwendest oder nur SASS-Unterstützung brauchst):
      styles: 'sass',

      // Option 2 (Nur verwenden, wenn du eine 'src/styles/settings.scss' hast und dort Vuetify SASS Variablen überschreibst):
      // styles: {
      //   configFile: 'src/styles/settings.scss', // Stelle sicher, dass der Pfad korrekt ist!
      // },
    }),

    // Automatische Komponenten-Registrierung (für deine eigenen Komponenten)
    // Components({
    //   dirs: ['src/components', 'src/pages'], // Passe die Ordner bei Bedarf an
    //   extensions: ['vue'],
    //   deep: true,
    // }),

    // Google Fonts (wird für 'Courier New' verwendet, andere über Store)
    ViteFonts({
      google: {
        families: [
          {
            name: 'Courier New', // Wird statisch geladen
            styles: 'wght@400;700', // Lade nur benötigte Gewichte
          },
          // Füge hier andere *immer* benötigte Fonts hinzu, die nicht im User-Setting sind
        ],
      },
    }),
  ],

  define: { 'process.env': {} }, // Standard Vite Einstellung

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Korrekter Alias für ESM
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'], // Standard Erweiterungen
  },

  server: {
    port: 5173, // Optional: Setze einen festen Port
    // Proxy Konfiguration (unverändert)
  },

  // === CSS Preprocessor Options ENTFERNT ===
  // Das war wahrscheinlich die Ursache für die MIME-Type Fehler bei den .sass Dateien
  // css: {
  //   preprocessorOptions: {
  //     sass: {
  //       api: 'modern-compiler', // Entfernt!
  //     },
  //   },
  // },
});
