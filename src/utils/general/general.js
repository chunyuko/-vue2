// 获取跳转页面，？后携带的 key-value 值
export function getUrlRequest() {
  // 传递中文乱码 在携带参数的时候如果有中文先encodeURI
  const url = decodeURI(document.location.toString())

  if (url.indexOf('?') !== -1) {
    const paraObj = {}
    const arrUrl = url.split('?')
    const para = arrUrl[1]
    const strs = para.split('&')

    for (let i = 0; i < strs.length; i++) {
      paraObj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }

    return paraObj
  }
  return {}
}
export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs))
    }
  }
}
