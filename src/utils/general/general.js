// 获取跳转页面，？后携带的 key-value 值
export function getUrlRequest() {
  // 传递中文乱码 在携带参数的时候如果有中文先encodeURI
  const url = decodeURI(document.location.toString())

  if (url.indexOf('?') !== -1) {
    const paraObj = {}
    const arrUrl = url.split('?')
    const para = arrUrl[1]
    let strs = para.split('&')

    for (let i = 0; i < strs.length; i++) {
      paraObj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }

    return paraObj
  }
  return {}
}
