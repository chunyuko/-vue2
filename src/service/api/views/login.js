import { http } from '@/service'

export const testApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getmaindata.php`, params)
}
export const loginApi = (params) => {
  return http.get(`/api42/dalirobotcms/loginForJM.php`, params)
}
export const loginUrl = (params) => {
  return http.get(`/robot/loginAuto.php`, params)
}
