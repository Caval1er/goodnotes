import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/index.vue'),
    },
    {
      path: '/table',
      name: 'Table',
      component: () => import('@/views/Table/index.vue'),
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/views/List/index.vue'),
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('@/views/Calendar/index.vue'),
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: () => import('@/views/Gallery/index.vue'),
    },
  ],
})

export default router
