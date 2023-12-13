import Vue from 'vue'
import Vuex from 'vuex'

import { handleModulesFile } from '@/utils/global'

Vue.use(Vuex)

// require.context
// 第一个参数: 要查找的文件路径
// 第二个: 是否查找子目录
// 第三个: 要匹配文件的正则
const modulesFiles = require.context('./modules', true, /\.js$/)
// 处理并获取 modules
const modules = handleModulesFile(modulesFiles)

const getState = () => {
  return {
    // 云台转动速度值
    sliderVal: 1,
    // 变电站 ID
    stationID: '',
    //机器人运动速度
    robotSpeed: 1,
  }
}

const store = new Vuex.Store({
  state: getState(),
  getters: {},
  mutations: {
    // 重置 vuex 数据
    RESET_STATE: (state) => {
      Object.assign(state, getState())
      store.commit('layoutTabsSetting/RESET_STATE')
      store.commit('routerSetting/RESET_STATE')
    },
  },
  actions: {},
  modules,
})
export default store
