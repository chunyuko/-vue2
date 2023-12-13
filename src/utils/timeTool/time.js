/**
 * 获取最近3天日期
 * @param {*} day
 * getDay(dates)  //dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
 */ export function getDay(day) {
  const that = this
  const today = new Date()
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds) //注意，这行是关键代码
  const tYear = today.getFullYear()
  let tMonth = today.getMonth()
  let tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}

export function doHandleMonth(month) {
  let m = month
  if (month.toString().length == 1) {
    m = '0' + month
  }
  return m
}
/**
 * 获取本周起止日期
// getMonday(type, dates)  //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
// getMonday("s", 1)  //得到下周一的yyyy-mm-dd格式日期
// getMonday("e", 1)  //得到下周日的yyyy-mm-dd格式日期
 */
export function getMonday(type, dates) {
  let dd
  const now = new Date()
  const nowTime = now.getTime()
  let day = now.getDay()
  const longTime = 24 * 60 * 60 * 1000
  const n = longTime * 7 * (dates || 0)
  if (type == 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type == 'e') {
    dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  const y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  day = y + '-' + m + '-' + d
  return day
}

/**
 * 获取上月，本月
// getMonth(type, months)  //type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
// getMonth("s", 1)  //得到下月第一天的yyyy-mm-dd格式日期
// getMonth("e", 1)  //得到下月最后一天的yyyy-mm-dd格式日期/***   
 */
export function getMonth(type, months) {
  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months != 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? '0' + month : month
  const date = d.getDate()
  const firstday = year + '-' + month + '-' + '01'
  let lastday = ''
  if (
    month == '01' ||
    month == '03' ||
    month == '05' ||
    month == '07' ||
    month == '08' ||
    month == '10' ||
    month == '12'
  ) {
    lastday = year + '-' + month + '-' + 31
  } else if (month == '02') {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + '-' + month + '-' + 29
    } else {
      lastday = year + '-' + month + '-' + 28
    }
  } else {
    lastday = year + '-' + month + '-' + 30
  }
  let day = ''
  if (type == 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}
