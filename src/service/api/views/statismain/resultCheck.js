import { http, fileHttp } from '@/service'
export const GetCascder = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
export const GetTree = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
export const GetDataTable = (params) => {
  return fileHttp.post(`/robot/getInspectionResult.php`, params)
}
export const GetResult = (params) => {
  return http.get(`/robot/getInspectionResult.php`, params)
}
