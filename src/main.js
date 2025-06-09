// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
// Vuetify direkt hier konfigurieren
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
// import { createVuetify, ThemeDefinition } from 'vuetify';
import vuetify from './plugins/vuetify';
// const defaultLightColors = {
//   primary: '#1976D2',
//   secondary: '#424242',
//   accent: '#82B1FF',
//   error: '#FF5252',
//   info: '#2196F3',
//   success: '#4CAF50',
//   warning: '#FB8C00',
//   background: '#FFFFFF',
//   surface: '#FFFFFF',
// };
//
// const defaultDarkColors = {
//   primary: '#1976D2',
//   secondary: '#424242',
//   accent: '#82B1FF',
//   error: '#FF5252',
//   info: '#2196F3',
//   success: '#4CAF50',
//   warning: '#FB8C00',
//   background: '#121212',
//   surface: '#1E1E1E',
// };
//
// const lightTheme: ThemeDefinition = {
//   dark: false,
//   colors: defaultLightColors,
// };
//
// const darkTheme: ThemeDefinition = {
//   dark: true,
//   colors: defaultDarkColors,
// };
// const vuetify = createVuetify({
//   theme: {
//     defaultTheme: 'dark',
//     themes: {
//       light: lightTheme,
//       dark: darkTheme,
//     },
//   },
// });
// App erstellen und mounten
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount('#app');
