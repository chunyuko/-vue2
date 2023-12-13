import { http } from '@/service'
// 获得巡检结果全览表格数据（巡检报告导出也用这个）
export const showResultsTableApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionlog.php`, params)
}
//按点位获取点位树数据
export const getPointsTreeApi = async (UUID) => {
  const params = {
    task: 'getDevTreeByUUID',
    UUID: UUID,
  }
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
//导出
export const exportDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionlog.php`, params)
}
//保存浏览开始时间和浏览时间
export const saveCheckTimeApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
//UUID以及点位信息获取获取巡检结果
export const getResultValueApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
