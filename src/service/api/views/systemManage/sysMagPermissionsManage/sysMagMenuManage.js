import { http } from '@/service'
//获取角色信息
export const msgMenuApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getIdentityInfo.php`, params)
}
//获取角色下名单
export const getUserByRoleApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getUserinfoJM.php`, params)
}
