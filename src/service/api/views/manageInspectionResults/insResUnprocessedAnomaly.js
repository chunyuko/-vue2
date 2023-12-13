import { http } from '@/service'
// 获得巡检异常表格数据
export const unprocessedTableApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
// 导出
export const exportXLSApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
// 导出图片
export const exportPictureApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/exportinspectionresultPicforJM.php`, params)
}
