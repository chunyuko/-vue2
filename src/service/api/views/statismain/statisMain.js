import { http, fileHttp } from '@/service'

export const GetCharts = (params) => {
  return fileHttp.post(`/robot/getStationInfo.php`, params)
}
