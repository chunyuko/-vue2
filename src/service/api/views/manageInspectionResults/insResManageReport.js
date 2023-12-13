import { http } from '@/service'
//导出
export const exportDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/exportinspectionresult.php`, params)
}
//预览
export const getPreviewDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionlog.php`, params)
}
