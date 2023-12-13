import { HomeOutline } from '@v2icons/ionicons5'

const routes = [
  {
    path: '/',
    redirect: '/deviceInfoMain/deviceInfoMain',
    component: null,
    meta: {
      id: 247,
      title: '运维管理',
      isLayout: true,
      sort: 5,
      //菜单图标
      icon: HomeOutline,
    },
    children: [
      {
        name: 'deviceInfoMain',
        path: '/deviceInfoMain/deviceInfoMain',
        alias: 'isOut=1&jumpToURL=deviceinfo',
        component: null,
        meta: {
          id: 248,
          // 菜单名称
          title: '设备台账查询',
          keepAlive: true,
          authority: true,
          sort: 1,
          roles: [1],
          isHide: false,
        },
      },
      {
        name: 'statisRobot',
        path: '/deviceInfoMain/statisRobot',
        alias: 'isOut=1&jumpToURL=statisRobot',
        component: null,
        meta: {
          id: 249,
          //菜单名称
          title: '机器人应用统计',
          //是否需要缓存
          keepAlive: true,
          //是否需要登录
          authority: true,
          //排序
          sort: 2,
          //权限
          roles: [1],
          //是否隐藏
          isHide: false,
        },
      },
      {
        name: 'statisDevice',
        path: '/deviceInfoMain/statisDevice',
        alias: 'isOut=1&jumpToURL=statisDevice',
        component: null,
        meta: {
          id: 250,
          //菜单名称
          title: '视频设备应用统计',
          //是否需要缓存
          keepAlive: true,
          //是否需要登录
          authority: true,
          //排序
          sort: 2,
          //权限
          roles: [1],
          //是否隐藏
          isHide: false,
        },
      },
      // {
      //   name: 'infoMain',
      //   path: '/deviceInfoMain/infoMain',
      //   component: null,
      //   meta: {
      //     id: 251,
      //     //菜单名称
      //     title: '统计信息总览',
      //     //是否需要缓存
      //     keepAlive: true,
      //     //是否需要登录
      //     authority: true,
      //     //排序
      //     sort: 2,
      //     //权限
      //     roles: [1],
      //     //是否隐藏
      //     isHide: false,
      //   },
      // },
    ],
  },
]
export default routes
