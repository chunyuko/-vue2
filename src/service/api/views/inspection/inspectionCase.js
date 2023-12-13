import { http } from '@/service'

export const getCascaderData = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
export const getTreeDataInstance = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
export const getTableData = (params) => {
  return http.get(`/robot/taskList.php`, params)
}
export const AddTableData = (params) => {
  return http.post(`/robot/taskmanageGrid.php`, params)
}
export const runTableData = (params) => {
  return http.post(`/robot/robotruntask.php`, params)
}
export const DeleteTableData = (params) => {
  return http.post(`/robot/taskList.php`, params)
}
