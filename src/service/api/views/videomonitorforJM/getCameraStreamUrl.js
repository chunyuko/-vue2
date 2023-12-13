import { http, fileHttp, exportHttp } from '@/service'

export const getCameraStreamUrl = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getCameraStreamUrl.php`, params)
}
export const gatCarIDByCameraIDInstance = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getCameraInfo.php`, params)
}
export const StopVideoChrome = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getCameraStreamUrl.php`, params)
}
// export const getCameraStreamUrl = (params) => {
//   return http.post(`/api162/dalirobotcms/ajax/getCameraStreamUrl.php`, params)
// }
