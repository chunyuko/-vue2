import { http } from '@/service'
// 获取设备点位树
export const getPointTreeApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
// 获取巡视装置树
export const getDeviceTreeApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}

// 获取所有变电站信息
export const getAllStationApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatestationinfo.php`, params)
}

// 呼叫点位
export const callPointApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/manualDevicePreset.php`, params)
}
// 抓图/录像
export const captureAndRecordApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/captureAndRecord.php`, params)
}
