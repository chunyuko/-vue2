import { http } from '@/service'

// 一键返航
// export const goBackApi = (params) => {
//   return http.post(`/api162/dalirobotcms/ajax/onekeyback.php`, params)
// }
//机器人其他控制
export const goGridApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/gridControl.php`, params)
}
// 获取变电站下的机器人
export const getStationRobotListApi = (params) => {
  params = {
    ...params,
    task: 'getCarInfo',
  }
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
// 通过机器人 id 获取任务信息
export const getMissionInfoByCarIDApi = (params) => {
  params = {
    ...params,
    task: 'getCarInfoByID',
  }
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}

// 通过机器人 id 获取电量
export const getRobotInfo1Api = (params) => {
  params = {
    ...params,
    task: 'getCarStatus',
  }
  return http.post(`/api162/dalirobotcms/ajax/carOperateData.php`, params)
}
