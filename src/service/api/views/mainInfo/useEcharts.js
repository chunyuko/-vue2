import { http, fileHttp } from '@/service'

export const GetInspectionAlarmStatisInstance = (params) => {
  return http.post(`/api42/page/ajax/mainPage.php`, params)
}

export const GetInspectionStatus2Instance = (params) => {
  return fileHttp.post(`/robot/mainPage.php`, params)
}
export const GetSysInfoInstance = (params) => {
  return fileHttp.post(`/robot/mainPage.php`, params)
}
export const GetTaskStatisInstance = (params) => {
  return fileHttp.post(`/robot/mainPage.php`, params)
}
export const GetRunTimeInstance = (params) => {
  return fileHttp.post(`/robot/getuserlogindata.php`, params)
}
export const GetVideoDeviceStatisInstance = (params) => {
  return fileHttp.post(`/robot/mainPage.php`, params)
}
