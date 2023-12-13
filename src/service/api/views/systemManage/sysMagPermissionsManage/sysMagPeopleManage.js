import { http } from '@/service'
//获取getUserinfoJM.php有关接口
export const msgPeopleApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getUserinfoJM.php`, params)
}
//生成运维班树
export const getOptionsToStationApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/taskList.php`, params)
}
//获取角色信息
export const getRoleInfoApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/getIdentityInfo.php`, params)
}
