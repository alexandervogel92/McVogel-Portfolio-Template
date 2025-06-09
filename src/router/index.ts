// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      showInTabs: true,
      icon: 'mdi-home',
    }
  },
  // --- NEUE ROUTE FÜR KONTAKT ---
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      showInTabs: true,
      icon: 'mdi-email-outline', // Passendes Icon
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/pages/Resume.vue'), // Verweist auf die neue Seite
    meta: {
      showInTabs: true, // In Navigation anzeigen?
      icon: 'mdi-file-account-outline', // Passendes Icon
    }
  },
  // --- Beispiel für weitere Routen ---
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   component: () => import('@/pages/Projects.vue'), // Beispiel-Komponente
  //   meta: {
  //     showInTabs: true,
  //     icon: 'mdi-folder-outline',
  //   }
  // },
  { // Catch-all Route für 404
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'), // Erstelle eine NotFound.vue Seite
    meta: {
      showInTabs: false, // Nicht in Tabs anzeigen
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll-Verhalten: Gehe nach oben, wenn Route wechselt
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

export default router
