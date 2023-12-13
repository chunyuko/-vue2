import { http, exportHttp } from '@/service'

// 获取任务树
export const getTaskTreeApi = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
// 查询巡视任务详细信息
export const getInsMissionInfoApi = (params) => {
  params = {
    ...params,
    task: 'queryInspectLog',
  }
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
// 查询摄像机
export const getCameraApi = (params) => {
  params = {
    ...params,
    task: 'GetAllCamera',
  }
  return http.post(`/api162/dalirobotcms/ajax/getmaindata.php`, params)
}
// 查询巡视列表
export const getInsTableDataApi = (params) => {
  params = {
    ...params,
    task: 'inspectResultList',
  }
  return http.post(`/api162/dalirobotcms/ajax/realTimeData.php`, params)
}
//处理图片
export const handleImagApi = (params) => {
  params = {
    ...params,
    ImgType: 'realTime',
  }
  return exportHttp.post(`/api162/dalirobotcms/ajax/getimgdata.php`, params)
}
// 暂停任务
export const pauseMissionApi = (params) => {
  params = {
    ...params,
    taskComd: 'pause',
    CommunicateProtocol: 0,
  }
  return http.post(`/api42/dalirobotcms/ajax/gridTask.php`, params)
}
// 终止任务
export const stopMissionApi = (params) => {
  params = {
    taskComd: 'stop',
    CommunicateProtocol: 0,
  }
  return http.post(`/api42/dalirobotcms/ajax/gridTask.php`, params)
}
