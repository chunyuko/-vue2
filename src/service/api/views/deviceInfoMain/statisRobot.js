import { http } from '@/service'

// 获取运维班
export const getstationData1 = (params) => {
  return http.get(`/robot/getRobotStatus.php`, params)
}
export const getstationData3 = (params) => {
  return http.get(`/robot/getRobotStatus.php`, params)
}
