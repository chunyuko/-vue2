import { ref } from 'vue'

export default function useCamera(cameraIframeRef) {
  // 视频全屏的标识
  const isCameraFullScreen = ref(false)
  // 画面分割数
  const screenNum = ref(1)

  // 全屏放大
  const fullScreen = () => {
    console.log('全屏')
    isCameraFullScreen.value = true
  }
  // 缩小
  const switchClickResize = () => {
    console.log('缩小')
    isCameraFullScreen.value = false
  }
  /**
   * 打开视频
   * @param {String} DevID 是 CameraID + '_0'
   */
  const openVideo = (DevID) => {
    console.log(cameraIframeRef.value.contentWindow, '打开可见光视频', DevID)
    cameraIframeRef.value.contentWindow.OpenVideoByDevID(DevID, '', 1)
  }
  // 关闭视频
  const closeVideo = (DevID) => {
    console.log(cameraIframeRef.value.contentWindow, '关闭可见光视频', DevID)
    cameraIframeRef.value.contentWindow.CloseVideoByDevID(DevID)
  }
  // 批量打开视频
  const openBulkVideo = (arr) => {
    cameraIframeRef.value.contentWindow.OpenVideoByDevIDArr(arr)
  }
  // 关闭所有视频
  const closeAllVideo = () => {
    cameraIframeRef.value.contentWindow.StopAllMonitor()
  }
  // 画面分割
  const screenSplit = (num) => {
    screenNum.value = num
    // console.log(cameraIframeRef.value.contentWindow.vwsplit, 'cameraIframeRef')
    cameraIframeRef.value.contentWindow.vwsplit(num, 1)
  }

  return {
    isCameraFullScreen,
    screenNum,
    fullScreen,
    switchClickResize,
    openVideo,
    closeVideo,
    openBulkVideo,
    closeAllVideo,
    screenSplit,
  }
}
