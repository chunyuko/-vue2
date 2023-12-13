import { http } from '@/service'
// 获得获取运维班、电压等级、变电站关系
export const getOptionsToStationApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/taskList.php`, params)
}
//获取变电站设备在线情况
export const getDeviceStatusApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/SysStatistics.php`, params)
}
