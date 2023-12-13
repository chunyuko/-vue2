import { http, fileHttp } from '@/service'

export const GetBasicInfo = (params) => {
  return http.get(`/robot/inspectionTask.php`, params)
}
export const SetBtnEvent = (params) => {
  return fileHttp.post(`/robot/exportinspectionresult.php`, params)
}
export const GetFirstDevTableData = (params) => {
  return http.get(`/robot/inspectionTask.php`, params)
}
export const ConTaskDevData = (params) => {
  return fileHttp.post(`/robot/inspectionTask.php`, params)
}
