import { http, exportHttp } from '@/service'

// 检修区域设置

// 获取变电站树 taskList.php task=getStationTree
export const getStationTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/taskList.php`, params)
}
//获取点位树
export const getPointTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/realTimeData.php`, params)
}
// 获取检修列表 getType=getList page=1 everyPageNum=20
export const getAreaHintApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
}

// 新增检修区域 设备模式
// AreaHintName=区域名字
// AreaHintStart=开始时间
// AreaHintEnd=结束时间
// AreaHintFlag=是否启用
// ???DeviceLevel=设备等级 树的层级???
// ???DeviceLevel=点位列表字符串
// getType=Add
export const addAreaHintByDeviceModeMApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
}

// 获取地图信息
export const getMapApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getfirstdevmap.php`, params)
}

// ??? 获取地图模式框选检修区域点位列表
// 获取检修列表 地图模式 coordinate_pixel
export const getAreaHintByMapModeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
}

// 新增检修区域 地图模式 coordinate_pixel
export const addAreaHintByMapModeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
}

// // 检修区域下发 操作 task=Issued AreaHintCode=aaa
// export const codeStartApi = (params) => {
//   return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
// }

// // 检修区域停止 操作 task=Stop AreaHintCode=aaa
// export const codeStopApi = (params) => {
//   return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
// }

// 弹窗
// 获取设备信息 添加一个区域条件 SearchDeviceType=GetDevByArea Area_Id=
export const getDeviceTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getdeivceinfo.php`, params)
}

// 获取所有区域
export const getAreaApi = () => {
  // 这里写的一个临时地址
  return http.get(`/api42/dalirobotcms/ajax/getAllAreaByJM.php`)
}
//检修区域下发、停用、删除、新增
export const queryAreaHintApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryAreaHint.php`, params)
}
//获取地图信息
export const getMapInfoApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getfirstdevmap.php`, params)
}
// 获取图片内容
export const getImgApi = (params) => {
  return exportHttp.post(`/api42/dalirobotcms/ajax/getimgdata.php`, params)
}
