import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/HomeView.vue'),
      meta: { transition: 'slide-right' },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/Gallery/GalleryView.vue'),
      meta: { transition: 'slide-left' },
    },
  ],
})

export default router
