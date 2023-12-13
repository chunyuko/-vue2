/**
 * 处理路由
 */
import { LAYOUT, LAYOUTCONTENT } from '@/constant/router'
import { handleModulesFile } from '@/utils/global'

// 读取 modules 下的文件
const modulesFiles = require.context('./modules', true, /\.js$/)
// 处理并获取路由数据
const modules = handleModulesFile(modulesFiles)
const routeModuleList = []
for (const key in modules) {
  const value = modules[key]
  routeModuleList.push(...value)
}
// 排序
routeModuleList.sort((a, b) => {
  return (a.meta.sort || 0) - (b.meta.sort || 0)
})
// 对路由进行动态赋值
const routerAddComponentFilter = (items) => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      routerAddComponentFilter(item.children)
    }
    if (!item.meta || item.meta.isLayout) {
      item.component = LAYOUT
    } else if (item.children && item.children.length > 0) {
      item.component = LAYOUTCONTENT
    } else {
      item.component = () => import(`@/views${item.path}.vue`)
    }
  })
}
routerAddComponentFilter(routeModuleList)
console.log(routeModuleList)

export { routeModuleList }
