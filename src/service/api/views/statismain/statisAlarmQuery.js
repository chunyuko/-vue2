import { http, fileHttp } from '@/service'

export const getTreeApi = (params) => {
  return fileHttp.post(`/robot/inspectionMain.php`, params)
}
export const getTableApi = (params) => {
  return fileHttp.post(`/robot/getAlarmInfo.php`, params)
}
