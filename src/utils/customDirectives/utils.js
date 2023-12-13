let timer = null
// 防抖
export const debounce = function (func, delay) {
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    const self = this
    timer = setTimeout(() => {
      func.apply(self)
    }, delay)
  }
}
