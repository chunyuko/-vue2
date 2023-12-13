import { http } from '@/service'
// 获得日志管理表格数据
export const showLogTableApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryrobotlog.php`, params)
}
//查询日志容量
export const getPropertyApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getPropertyInfo.php`, params)
}
//设置日志容量
export const updatesysApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatesysparam.php`, params)
}
