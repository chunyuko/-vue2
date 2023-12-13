import { http, fileHttp } from '@/service'

export const GetTable = (params) => {
  return http.get(`/inspect/inspectionPos.php`, params)
}
export const GetSearch = (params) => {
  return http.get(`/inspect/inspectionPos.php`, params)
}
export const getTreeApi = (params) => {
  return http.get(`/robot/inspectionMain.php`, params)
}
