import { http } from '@/service'

// 异常推送设置

// 获取变电站 updatestationinfo.php task=GetStation
export const getStationApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/updatestationinfo.php`, params)
}

// 获取变电站信息 deviceData.php task=getStationInfo
export const getStationInfosApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 获取告警列表 task=alarminfo
export const getAlarmInfoApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
