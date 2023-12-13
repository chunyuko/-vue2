import { TABLIST } from '@/constant'
import { storageSession } from '@/utils/storage'

const getState = () => {
  return {
    tabList: [], // 缓存的多页签
  }
}

export default {
  namespaced: true,
  state: getState(),
  getters: {
    // 缓存的多页签的名称集合
    tabNameList(state) {
      return (
        state.tabList.map((item) => {
          return item.name
        }) ?? []
      )
    },
  },
  mutations: {
    // 获取多页签需要缓存的页面数组
    setKeepAliveTabs(state) {
      state.tabList = storageSession.getItem(TABLIST) ?? []
    },
    // 添加多页签
    addLayoutTab(state, route) {
      const { fullPath, hash, meta, name, params, path, query } = route
      const simpleRoute = { fullPath, hash, meta, name, params, path, query }

      state.tabList.push(simpleRoute)
    },
    // 重置 vuex 数据
    RESET_STATE: (state) => {
      Object.assign(state, getState())
    },
  },
}
