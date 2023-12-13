import { http } from '@/service'

// 查询录像总数
export const getTotalVideoNumApi = (params) => {
  params = {
    ...params,
    task: 'NVRRecTotal',
  }
  return http.post(`/api162/dalirobotcms/ajax/nvrrecsearch.php`, params)
}
// 查询录像数据
export const getVideoTableDataApi = (params) => {
  params = {
    ...params,
    task: 'NVRRecSearch',
  }
  return http.post(`/api162/dalirobotcms/ajax/nvrrecsearch.php`)
}
