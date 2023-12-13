import { http } from '@/service'

// 获取运维班
export const getAllClassApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获取变电站
export const getStationInfoApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获取巡视任务
export const getMissionTableDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionlog.php`, params)
}
// 获取巡视告警
export const getInsWarnTableDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
// 巡视告警（新）
export const _getInsWarnTableDataApi = (params) => {
  params = {
    ...params,
    task: 'resultAlarmInfo',
  }
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获取装置告警
export const getDevWarnTableDataApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获得装置缺陷
export const getDevDefectTableDataApi = (params) => {
  params = {
    ...params,
    task: 'getCameraDefectInfo',
  }
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获取设备状态
export const getDevStatusApi = (params) => {
  params = {
    ...params,
    task: 'getNums',
  }
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
// 获取实时信息/ 获取机器人实时信息
export const getRealTimeTableDataApi = (params) => {
  params = {
    ...params,
    task: 'getResultByCar',
    // task: 'query',
  }
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
