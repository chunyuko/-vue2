/**
 * 为了兼容 ie，需要重写一些 element-ui 的方法
 */

// 修复element-ui NavMenu 在折叠之后,鼠标滑过menu,在其他浏览器没有错误
;(function (window) {
  try {
    new MouseEvent('fix')
    return false // No need to polyfill
  } catch (e) {
    console.error(e)
  }
  // Polyfills DOM4 MouseEvent
  const MouseEvent = function (eventType, params) {
    params = params || { bubbles: false, cancelable: false }
    const mouseEvent = document.createEvent('MouseEvent')
    mouseEvent.initMouseEvent(
      eventType,
      params.bubbles,
      params.cancelable,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
    return mouseEvent
  }

  MouseEvent.prototype = Event.prototype

  window.MouseEvent = MouseEvent
})(window)
