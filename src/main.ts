import { createApp } from 'vue';
import App from './App.vue';
import { VueReCaptcha } from 'vue-recaptcha-v3'

import { createPinia } from 'pinia';
import router from './router';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import vuetify from './plugins/vuetify'



const app = createApp(App);

app.use(createPinia());
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  loaderOptions: { autoHideBadge: true },
})
app.use(router);
app.use(vuetify);

app.mount('#app');
