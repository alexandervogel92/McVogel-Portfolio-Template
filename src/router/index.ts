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
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      showInTabs: true,
      icon: 'mdi-email-outline',
    }
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('@/pages/Resume.vue'),
    meta: {
      showInTabs: true,
      icon: 'mdi-file-account-outline',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      showInTabs: false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

export default router
