import { http, fileHttp } from '@/service'

// 获取运维班
export const getstationDataApi = (params) => {
  return fileHttp.get(`/robot/mainPage.php`, params)
}
export const getDeviceStatusStatis = (params) => {
  return fileHttp.get(`/robot/getDeviceStatus.php`, params)
}
export const getDeviceStatus = (params) => {
  return fileHttp.get(`/robot/getDeviceStatus.php`, params)
}
export const getTable = (params) => {
  return fileHttp.post(`/robot/getAllDeviceInfo.php`, params)
}
