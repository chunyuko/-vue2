import { http, fileHttp, exportHttp } from '@/service'
// 装置告警
export const deviceAlarmApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}

//巡视摄像机台账获取/装置id获取台账
export const patroCameraLedger = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/cameraData.php`, params)
}
//机器人台账信息获取
export const carData = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/carData.php`, params)
  //task=getAllCar
}
//导出
export const exportFiles = (params) => {
  return exportHttp.post(`/api162/dalirobotcms/ajax/cameraData.php`, params)
  //task=getAllCamera/task=getCamera&camera_id=1
}
//机器人导出
export const exportCarFiles = (params) => {
  return exportHttp.post(`/api162/dalirobotcms/ajax/carData.php`, params)
  //task=getAllCamera/task=getCamera&camera_id=1
}

//下拉选项
export const pullDownList = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/cameraData.php`, params)
}
//台账新增
export const cameraLedgerAdd = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/cameraData.php`, params)
  //task=AddCamera
}
//台账新增
export const carLedgerDel = (params) => {
  return fileHttp.filePost(`/api162/dalirobotcms/ajax/carData.php`, params)
}
//台账/修改
export const cameraLedgerEdit = (params) => {
  return fileHttp.filePost(`/api162/dalirobotcms/ajax/cameraData.php`, params)
  //task=AddCamera/task=ModifyCamera
}
//机器人台账修改新增
export const caraLedgerEdit = (params) => {
  return fileHttp.filePost(`/api162/dalirobotcms/ajax/carData.php`, params)
  //task=AddCamera/task=ModifyCamera
}
//获取页面的请求URL
export const httpUrl = () => {
  return http.httpInterceptorsRequest()
  //task=AddCamera/task=ModifyCamera
}
