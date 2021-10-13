import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SignInPage.vue'),
      },
    ],
  },

  {
    path: '/projector',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      {
        name: 'projector',
        path: '',
        component: () => import('pages/ProjectorPage.vue'),
      },
      {
        name: 'splash',
        path: 'splash',
        component: () => import('pages/SplashPage.vue'),
      },
    ],
  },

  {
    path: '/podium',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'podium',
        path: '',
        component: () => import('pages/PodiumPage.vue'),
      },
    ],
  },

  // Keep this as the last entry.
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
