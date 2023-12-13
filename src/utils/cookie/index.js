class CookieProxy {
  /**
   * 设置 cookie
   * @param {string} key
   * @param {string} value
   * @param {number} expire 有效时间(时间戳)
   */
  setCookie(key, value, expire) {
    const date = new Date()
    date.setTime(date.getTime() + expire)
    document.cookie = `${key}=${encodeURI(value)}; Expires=${date.toUTCString()}`
  }

  /**
   * 获取 cookie
   * @param {string} key
   * @returns string
   */
  getCookie(key) {
    let value = ''
    if (document.cookie.length > 0) {
      let arr = document.cookie.split(';')
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(key + '=') >= 0) {
          arr = arr[i].split('=')
          value = arr[1]
          break
        }
      }
    }
    return decodeURI(value)
  }

  /**
   * 清楚 cookie
   * @param {string} key
   */
  clearCookie(key) {
    const date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie = key + "='';Expires=" + date.toUTCString() + ';'
  }
}

const cookieProxy = new CookieProxy()

export default cookieProxy
