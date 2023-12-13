import { http, exportHttp } from '@/service'

// 获取历史图片分析数据
export const getHistoryPhotoDataApi = (params) => {
  // params = {
  //   ...params,
  //   task: 'query',
  // }
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresult.php`, params)
}
// 图片横向对比
export const getPhotoComparisionApi = (params) => {
  params = {
    ...params,
    task: 'queryDiffArea',
  }
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
// 图片差异智能判别
export const getPhotoDiffDataApi = (params) => {
  params = {
    ...params,
    task: 'DetectFiveResult',
  }
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}
// 获取数据曲线
export const getDataCurvesApi = (params) => {
  params = {
    ...params,
    task: 'GetResultValue',
  }
  return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
}

// // 获取数据曲线
// export const getDataCurvesApi = (params) => {
//   params = {
//     ...params,
//     task: 'GetResultValue',
//   }
//   return http.post(`/api162/dalirobotcms/ajax/queryinspectionresultforJM.php`, params)
// }

//获取图片内容
export const getImgApi = (params) => {
  return exportHttp.post(`/api162/dalirobotcms/ajax/getimgdata.php`, params)
}
