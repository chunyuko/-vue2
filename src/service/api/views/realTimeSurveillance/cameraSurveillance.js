import { http } from '@/service'

// 可见光焦距控制
export const ipcFocusControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/ipcfocuscontrol.php`, params)
}
// 红外焦距控制
export const ifrFocusControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/operateifrfocus.php`, params)
}
// 可见光变倍控制
export const ipcMultiControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/operateipc.php`, params)
}
// 可见光光圈控制
export const ipcApertureControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/operateipciris.php`, params)
}
// 雨刷控制
export const ipcWiperControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/openclosebrush.php`, params)
}
// 灯光控制
export const ipcLampControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/opencloselight.php`, params)
}

// 云台控制
export const directionalControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/operateptz.php`, params)
}
// 机器人运动控制
export const robotControlApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/operaterobot.php`, params)
}
