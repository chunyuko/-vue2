import Vue from 'vue'
import VueRouter from 'vue-router'
import routerGuards from './routerGuards'
import { changeOriginalRouterApi, createRouter } from './originalRouteApi'

Vue.use(VueRouter)

// 重写 router api
changeOriginalRouterApi(VueRouter)

const router = createRouter()
// 导航守卫
routerGuards(router)

export default router
