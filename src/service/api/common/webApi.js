import { http } from '@/service'
// 根据3D中的一次设备ID获取3D中的摄像机ID
export const getCameraByFirstDevIDIn3D = (params) => {
  return http.post(`/api162/dalirobotcms/ajax/deviceData.php`, params)
}
