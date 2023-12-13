import { http } from '@/service'
// 获得巡检异常表格数据
export const anomalyTableApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
//导出功能
export const exportDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}

//测试用
export const insResTestApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatefirstdev.php`, params)
}
