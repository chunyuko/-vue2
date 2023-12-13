import { http } from '@/service'
//SysStatistics.php系统监控相关接口
export const msgSystemApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/SysStatistics.php`, params)
}
