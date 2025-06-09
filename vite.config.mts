import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import ViteFonts from 'unplugin-fonts/vite';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),


    Vuetify({
      autoImport: true,
      styles: 'sass',
    }),

    ViteFonts({
      google: {
        families: [
          {
            name: 'Courier New',
            styles: 'wght@400;700',
          },
        ],
      },
    }),
  ],

  define: { 'process.env': {} },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },

  server: {
    port: 5173, // Optional: Setze einen festen Port
  },

});
