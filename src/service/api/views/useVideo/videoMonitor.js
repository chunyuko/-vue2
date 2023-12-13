import { http } from '@/service'

// 可见光焦距控制
export const getTreeApi = (params) => {
  return http.get(`/robot/VideoPlayBack.php`, params)
}
export const getPointTreeApi = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
