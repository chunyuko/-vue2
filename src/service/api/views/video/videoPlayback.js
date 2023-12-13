import { http } from '@/service'

export const useVideoInstance = (params) => {
  return http.get(`/robot/VideoPlayBack.php`, params)
}
