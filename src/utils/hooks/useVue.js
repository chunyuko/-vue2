/**
 * composition api 写法，调用 router 和 vuex
 */
import Vue from 'vue'
import router from '@/router'
import store from '@/store'

// 路由
export function useRouter() {
  return router
}
export function useRoute() {
  return router.currentRoute
}
export function useRoute1() {
  return Vue.prototype.$route
}

// vuex
export function useStore() {
  return store
}

// eventBus
export function useEventBus() {
  return Vue.prototype.$bus
}

// 右键菜单
export function useContextMenu() {
  return Vue.prototype.$contextmenu
}

// element-ui
export function useMessage() {
  return Vue.prototype.$message
}
