import { ref } from 'vue'

export default function useIfrCamera(cameraIframeRef) {
  // 视频全屏的标识
  const isCameraFullScreenIfr = ref(false)
  // 画面分割数
  const screenNumIfr = ref(1)

  // 全屏放大
  const fullScreenIfr = () => {
    // console.log('全屏')
    isCameraFullScreenIfr.value = true
  }
  // 缩小
  const switchClickResizeIfr = () => {
    // console.log('缩小')
    isCameraFullScreenIfr.value = false
  }
  /**
   * 打开视频
   * @param {String} DevID 是 CameraID + '_0'
   */
  const openVideoIfr = (DevID) => {
    console.log(cameraIframeRef.value.contentWindow, '打开可见光/红外视频', DevID)
    if (cameraIframeRef.value.contentWindow.AllVWObj.length > 0) {
      cameraIframeRef.value.contentWindow.OpenVideoByDevID(DevID, '', 1)
    }
  }
  // 关闭视频
  const closeVideoIfr = (DevID) => {
    console.log(cameraIframeRef.value.contentWindow, '关闭可见光视频/红外', DevID)
    if (cameraIframeRef.value.contentWindow.AllVWObj.length > 0) {
      cameraIframeRef.value.contentWindow.CloseVideoByDevID(DevID)
    }
  }
  // 批量打开视频
  const openBulkVideoIfr = (arr) => {
    console.log('批量打开视频', arr)
    if (cameraIframeRef.value.contentWindow.AllVWObj.length > 0) {
      cameraIframeRef.value.contentWindow.OpenVideoByDevIDArr(arr)
    }
  }
  // 关闭所有视频
  const closeAllVideoIfr = () => {
    console.log('关闭所有视频')
    if (cameraIframeRef.value.contentWindow.AllVWObj.length > 0) {
      cameraIframeRef.value.contentWindow.closeAllVideoIfr()
    }
  }
  // 画面分割
  const screenSplitIfr = (num) => {
    screenNumIfr.value = num
    console.log(cameraIframeRef.value.contentWindow.vwsplit, 'Ifr画面分割')
    cameraIframeRef.value.contentWindow.vwsplit(num, 1)
  }

  return {
    isCameraFullScreenIfr,
    screenNumIfr,
    fullScreenIfr,
    switchClickResizeIfr,
    openVideoIfr,
    closeVideoIfr,
    openBulkVideoIfr,
    closeAllVideoIfr,
    screenSplitIfr,
  }
}
