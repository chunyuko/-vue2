import { LAYOUT } from '@/constant/router'

// 登录
export const loginPageRoute = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/login.vue'),
  meta: {
    title: '登录',
    authority: false,
  },
}

// 404
export const errorPageRoute = {
  name: 'error',
  path: '/:path(.*)*',
  component: LAYOUT,
  meta: {
    title: '404',
    isLayout: true,
    isHide: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
        authority: true,
        keepAlive: false,
        isHide: true,
      },
    },
  ],
}
