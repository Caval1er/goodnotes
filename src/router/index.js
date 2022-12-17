import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/layouts/default/index.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Home/index.vue'),
        },
      ],
    },
    {
      path: '/table-demo',
      name: 'TableDemo',
      component: Layout,
      redirect: '/table-demo/table',
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import('@/views/Table/index.vue'),
        },
      ],
    },
    {
      path: '/list-demo',
      name: 'ListDemo',
      component: Layout,
      redirect: '/list-demo/list',
      children: [
        {
          path: 'list',
          name: 'List',
          component: () => import('@/views/List/index.vue'),
        },
      ],
    },
    {
      path: '/calendar-demo',
      name: 'CalendarDemo',
      component: Layout,
      redirect: '/calendar-demo/calendar',
      children: [
        {
          path: 'calendar',
          name: 'Calendar',
          component: () => import('@/views/Calendar/index.vue'),
        },
      ],
    },
    {
      path: '/gallery-demo',
      name: 'GalleryDemo',
      component: Layout,
      redirect: '/gallery-demo/gallery',
      children: [
        {
          path: 'gallery',
          name: 'Gallery',
          component: () => import('@/views/Gallery/index.vue'),
        },
      ],
    },
  ],
})

export default router
