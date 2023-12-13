import VueRouter from 'vue-router'
import { loginPageRoute } from './modules/base'

export function changeOriginalRouterApi(VueRouter) {
  // 由于 vue-router 现在的版本会输出 Promise，重写 push 和 replace 解决问题
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = rewriteRouterApi(originalPush)
  const originalReplace = VueRouter.prototype.replace
  VueRouter.prototype.replace = rewriteRouterApi(originalReplace)
  function rewriteRouterApi(handleName) {
    return function (location, onResolve, onReject) {
      if (onResolve || onReject) {
        return handleName.call(this, location, onResolve, onReject)
      }
      return handleName.call(this, location).catch((err) => err)
    }
  }
}

const routes = [loginPageRoute]
export default routes

// 新增路由
export function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  })
}
