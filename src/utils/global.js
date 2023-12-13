import Vue from 'vue'
import router from '@/router'
import { storageSession, storageLocal } from './storage'
import cookieProxy from './cookie'
import { createRouter } from '@/router/originalRouteApi'
import echarts from './echarts'
import './customDirectives'

Vue.prototype.$sessionStorage = storageSession
Vue.prototype.$localStorage = storageLocal
Vue.prototype.$cookie = cookieProxy
Vue.prototype.$echarts = echarts

// 处理 modules 内的文件
export function handleModulesFile(modulesFiles) {
  //modulesFiles.keys()返回包含文件名的数组
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1') //去掉文件名的./和.js
    const value = modulesFiles(modulePath)
    if (value.default) {
      modules[moduleName] = value.default //value.default包含文件内的内容
    }
    return modules
  }, {})
  return modules
}

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 是否开启 Mock
if (process.env.VUE_APP_MOCK_OPEN === 'true') {
  // Mock.bootstrap() //启用mock
  require('@/mock')
}
