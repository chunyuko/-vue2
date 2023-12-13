import { http, fileHttp } from '@/service'

export const GetInspectionAlarmStatisInstance = (params) => {
  return fileHttp.post(`/api42/page/ajax/mainPage.php`, params)
}

export const GetInspectionStatus2Instance = (params) => {
  return fileHttp.post(`/robot/mainPage.php`, params)
}
export const GetTable = (params) => {
  return http.get(`/robot/inspectionMain.php`, params)
}
export const ExportTable = (params) => {
  return fileHttp.post(`/robot/inspectionMain.php`, params)
}
export const GetExport = (params) => {
  return fileHttp.post(`/robot/exportinspectionresult.php`, params)
}
export const StartTask = (params) => {
  return fileHttp.post(`/robot/robotruntask.php`, params)
}
export const EndTask = (params) => {
  return fileHttp.post(`/robot/stoptask.php`, params)
}
export const PauseTask = (params) => {
  return fileHttp.post(`/robot/pausetask.php`, params)
}
export const RestartTask = (params) => {
  return fileHttp.post(`/robot/continuetask.php`, params)
}
