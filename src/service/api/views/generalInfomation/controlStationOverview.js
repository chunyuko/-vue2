import { http, exportHttp } from '@/service'

// 接入情况
export function getAccessStatusApi(params) {
  params = {
    ...params,
    task: 'getNums',
  }
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}

// 装置离线情况
export function getOfflineStatusApi(params) {
  params = {
    ...params,
    task: 'getOfflineList',
  }
  // 导出：导出按钮
  if (params.export === 1) {
    return exportHttp.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
  }
  // 不导出：数据展示
  return http.post(`/api162/dalirobotcms/ajax/stationData.php`, params)
}
