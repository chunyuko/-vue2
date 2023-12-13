import { http, exportHttp } from '@/service'
// 获得下拉框选项，到变电站
export const getOptionsToStationApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/taskList.php`, params)
}
// 按变电站获得下设备名称拉框选项
export const getOptionsDeviceApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatefirstdev.php`, params)
}
// 按设备类型和设备名称获得下点位名称拉框选项
export const getOptionsPointApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getdeivcedata.php`, params)
}
//结果ID获取详细的巡检结果
export const detailInsResApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
//异常确认提交
export const submitConfirmApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
//获取图片内容
export const getImgApi = (params) => {
  return exportHttp.post(`/api162/dalirobotcms/ajax/getimgdata.php`, params)
}
//获取变电站下区域
export const getAllAreaApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatearea.php`, params)
}
//获取区域下的间隔
export const getAllSpaceApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatespace.php`, params)
}
//获取间隔下一次设备
export const getFirstDevApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/updatefirstdev.php`, params)
}
//点位确认
export const readByResultIDApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
