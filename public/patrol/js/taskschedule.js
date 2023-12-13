var allRequest = new Object()
allRequest = GetRequest()

var year = GetRequestAll('year')
var month = GetRequestAll('month')

var ThisMonthMaxUnixTime = 0
var AllTaskObj = new Array()

// $(window.frames['scheduleifr'].document).find('#TaskStation').text()
// $(window.frames[0].document).find('#TaskStation').text()
// window.frames['scheduleifr'].CreateHTMLele()
// window.frames[0].CreateHTMLele()
// window.frames['scheduleifr'].btnSearchClick()
// window.frames[0].btnSearchClick()
// window.frames['scheduleifr'].btnSearchClickGrid()
// window.frames[0].btnSearchClickGrid()
// window.frames['scheduleifr'].InsertToTable()
// window.frames[0].InsertToTable()

function init() {
  ele_init('Station', 3, 'Station', {
    OP: Station_s,
    CSS: 'Station_checkbox',
  })

  ele_init('TaskStation', 7, 'TaskStation', {
    OP: TaskStation_s,
    CSS: 'channel_checkbox',
  })

  ele_init('yearSelect', 3, 'yearSelect', {
    OP: Years_s,
    ONCHANGE: reloadPage,
  })
  ele_init('monthSelect', 3, 'monthSelect', {
    OP: Month_s,
    ONCHANGE: reloadPage,
  })
  var nowDay = new Date()
  var m = nowDay.getMonth() + 1
  var y = nowDay.getFullYear()
  if (year == '') {
    year = y
  }
  if (month == '') {
    month = m
  }

  flush_html_ele_value(month, 'monthSelect')
  flush_html_ele_value(year, 'yearSelect')
  //	getThisMonthTaskSchedule();        //////////////////////按照大立协议规则展示
  getThisMonthTaskScheduleGrid() //////////////////////按照国王协议规则展示
  showDays()
  //   $_('changeColor1').style.border = '#B4E3D4 0px solid'
  //   $_('changeColor2').style.border = '#B4E3D4 0px solid'
  $_('changeColor3').style.border = '#B4E3D4 1px solid'
  $_('changeColor4').style.backgroundColor = '#D0E3E1'
  $_('calendartop').style.backgroundColor = '#D0E3E1'
  $_('calendartop').style.border = '#B4E3D4 1px solid'
  $('#calendar th').css('background-color', '#E3F1F1')
  resizepage()
}

var days = 0
function showDaysBlue() {
  var lastDay = new Date(year, month - 1, 0) //所选月份的上月最后一天，中国标准时间：具体到秒
  var firstDay = new Date(year, month, 0) //所选月份本月的最后一天，中国标准时间：具体到秒
  var starDay = lastDay.getDay() + 1 //所选月份第一天前面空格数
  days = firstDay.getDate() //每月天数
  var nowDay = new Date() //获取当前中国标准时间：具体到秒
  var d = nowDay.getDate() //本月几号
  if (starDay == 7) {
    starDay = 0
  }
  var html =
    '<tr style="height:30px;" class="weeks"><th height="30">日</th><th height="30">一</th><th height="30">二</th><th height="30">三</th><th height="30">四</th><th height="30">五</th><th height="30">六</th></tr>'
  html += '<tr>'
  for (var i = 0; i < starDay; i++) {
    html += '<td style="background:rgba(0,0,0,0)">&nbsp;</td>'
  }

  for (j = 1; j <= days; j++) {
    i++
    if (j == d) {
      html +=
        '<td id="day_' +
        j +
        '" class="today" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;;">' +
        j +
        '</div><div align=left class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>'
    } else {
      html +=
        '<td id="day_' +
        j +
        '" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;">' +
        j +
        '</div><div align=left class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>'
    }
    if (i % 7 == '0') {
      html += '</tr><tr>'
    }
  }
  html += '</tr>'
  $_('caledays').innerHTML = html
}
//上述循环语句：表格制作

function showDays() {
  var lastDay = new Date(year, month - 1, 0)
  var firstDay = new Date(year, month, 0)
  var starDay = lastDay.getDay() + 1
  days = firstDay.getDate()
  var nowDay = new Date()
  var d = nowDay.getDate()
  if (starDay == 7) {
    starDay = 0
  }
  var html =
    '<tr style="height:30px;border:1px #1662ad  solid" ><th height="30">日</th><th height="30">一</th><th height="30">二</th><th height="30">三</th><th height="30">四</th><th height="30">五</th><th height="30">六</th></tr>'
  html += '<tr>'
  for (var i = 0; i < starDay; i++) {
    html += '<td style="background:">&nbsp;</td>'
  }

  for (j = 1; j <= days; j++) {
    i++
    if (j == d) {
      html +=
        '<td id="day_' +
        j +
        '" class="today" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;">' +
        j +
        '</div><div align=left class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>'
    } else {
      html +=
        '<td id="day_' +
        j +
        '" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;">' +
        j +
        '</div><div align=left class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>'
    }
    if (i % 7 == '0') {
      html += '</tr><tr>'
    }
  }
  html += '</tr>'
  $_('caledays').innerHTML = html
}

var reload = 0
function reloadPage() {
  if (reload > 1) {
    var year = get_ele_value('yearSelect')
    var month = get_ele_value('monthSelect')
    window.location = 'calendarLeft.html?year=' + year + '&month=' + month
  }
  reload++
}

function reloadPageYear(str) {
  var year = get_ele_value('yearSelect')
  if (str == 'reduce') {
    year = parseInt(year) - 1
    if (year < 2011) {
      year = 2011
    }
  } else if (str == 'plus') {
    year = parseInt(year) + 1
    if (year > 2030) {
      year = 2030
    }
  }
  window.location = 'calendarLeft.html?year=' + year + '&month=' + month
}

function reloadPageMonth(str) {
  var month = get_ele_value('monthSelect')
  if (str == 'reduce') {
    month = parseInt(month) - 1
    if (month < 1) {
      month = 12
      year = parseInt(year) - 1
    }
  } else if (str == 'plus') {
    month = parseInt(month) + 1
    if (month > 12) {
      month = 1
      year = parseInt(year) + 1
    }
  }
  window.location = 'calendarLeft.html?year=' + year + '&month=' + month
}

function resizepage() {
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  $_('calendarmaintd').style.height = parseInt(bh - 20 - 30) + 'px'
  $_('calendar').style.height = parseInt(bh - 20 - 30) + 'px'
  $_('scheduleifr').style.height = bh + 'px'
  var daysdivheight = parseInt(bh - 20 - 30 - 30) / 6 - 20 //方框展示的中间部分区域dayDiv
  var daysdiv = getElementsByClassNamenew($_('calendar'), 'div', 'dayDiv') //数组
  //alert("daysdivheight="+daysdivheight);
  for (var i = 0; i < daysdiv.length; i++) {
    daysdiv[i].style.height = daysdivheight + 'px'
  }
}

var xmlHttpGetTask
function getThisMonthTaskSchedule() {
  var i = get_ele_value('yearSelect')
  if (i < 0) {
    return false
  }
  var strYear = $_('year').options[i].value
  var i = get_ele_value('monthSelect')
  if (i < 0) {
    return false
  }
  var strMonth = $_('month').options[i].value
  var BeginTime = GetFirstDayByYearMonth(strYear, strMonth)
  var EndTime = GetLastDayByYearMonth(strYear, strMonth)
  xmlHttpGetTask = createXMLHttpRequest()
  try {
    var sendText =
      'BeginTime=' +
      BeginTime +
      '&EndTime=' +
      EndTime +
      '&StationID=' +
      window.parent.parent.parent.StationIDNow
    //alert(sendText);
    var url = 'ajax/querytaskschedule.php?' + sendText
    xmlHttpGetTask.onreadystatechange = getThisMonthTaskScheduleRes
    xmlHttpGetTask.open('GET', url, true)
    xmlHttpGetTask.send(null)
  } catch (e) {
    alert(e)
  }
}
function getThisMonthTaskScheduleRes() {
  if (xmlHttpGetTask.readyState == 4) {
    if (xmlHttpGetTask.status == 200) {
      var s = xmlHttpGetTask.responseText
      //alert("s="+s);
      if (s == '') {
        return
      }
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      var arr = JSON.parse(s)
      arr.sort(function (x, y) {
        return y.Start_Time - x.Start_Time
      })
      ShowTaskSchedule(arr)
    }
  }
}

var xmlHttpGetTaskGrid
function getThisMonthTaskScheduleGrid() {
  var i = get_ele_value('yearSelect')
  if (i < 0) {
    return false
  }
  var strYear = get_ele_value('yearSelect')
  var i = get_ele_value('monthSelect')
  if (i < 0) {
    return false
  }
  var strMonth = get_ele_value('monthSelect')
  var BeginTime = GetFirstDayByYearMonth(strYear, strMonth)
  var EndTime = GetLastDayByYearMonth(strYear, strMonth)
  xmlHttpGetTaskGrid = createXMLHttpRequest()
  try {
    var sendText =
      'BeginTime=' +
      BeginTime +
      '&EndTime=' +
      EndTime +
      '&StationID=' +
      window.parent.parent.parent.StationIDNow
    var url = 'ajax/querytaskscheduleGrid.php?' + sendText
    xmlHttpGetTaskGrid.onreadystatechange = getThisMonthTaskScheduleGridRes
    xmlHttpGetTaskGrid.open('GET', url, true)
    xmlHttpGetTaskGrid.send(null)
  } catch (e) {
    alert(e)
  }
}

function getThisMonthTaskScheduleGridRes() {
  if (xmlHttpGetTaskGrid.readyState == 4) {
    if (xmlHttpGetTaskGrid.status == 200) {
      var s = xmlHttpGetTaskGrid.responseText
      if (s == '') {
        return
      }
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      var arr = JSON.parse(s)
      arr.sort(function (x, y) {
        return x.Start_Time - y.Start_Time
      })
      ShowTaskSchedule(arr)
    }
  }
}

function GetDayFromUnixTime(datetimeUnix) {
  var dateTimeStr = UnixTimeToStr(datetimeUnix) //这部分是巡检任务的时间以及巡检任务数组
  var dates = dateTimeStr.split(' ') //巡检任务时间数组
  var dateArray = dates[0].split('-') //巡检任务时间年月日分离数组
  var daystr = dateArray[2] //该月有巡检任务的的'日'
  return daystr
}

var days = 0
function ShowTaskSchedule(dataArray) {
  var l = dataArray.length
  if (l <= 0) {
    return false
  }
  for (var i = 0; i < l; i++) {
    if (dataArray[i].Start_Time < dataArray[i].SetTime) {
      continue
    }

    var datetimeUnix = dataArray[i].Start_Time

    var day = parseInt(GetDayFromUnixTime(datetimeUnix))
    var temphtml = $_('dayDiv_' + day).innerHTML
    var num = $_('dayDiv_' + day).childNodes
    if (day > 0 && day <= 31) {
      var tempID = dataArray[i].Task_Rule_Id + '_' + dataArray[i].Start_Time
      var disDayContent =
        "<div class='taskDay' onmouseover='taskDaymouseover(this);' onmouseout='taskDaymouseout(this);' >"

      /*
			0：任务未执行
			1：任务已执行，且已结束
			2：任务已执行，但未结束，也可能是意外中断
			3: 正在执行
			*/

      if (dataArray[i].TaskStation == '0') {
        disDayContent +=
          "<font color='#00ccff'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 1) {
        disDayContent +=
          "<font color='green'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 2) {
        disDayContent +=
          "<font color='brown'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 3) {
        disDayContent +=
          "<font color='red'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 4) {
        disDayContent +=
          "<font color='orange'>" +
          dataArray[i].Task_Desc + //巡检任务名称
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) + //巡检任务时间
          '</font>'
      }
      disDayContent += '</div>'

      $_('dayDiv_' + day).innerHTML = temphtml + disDayContent
    }
  }

  for (var i = 1; i <= days; i++) {
    if ($_('dayDiv_' + i).innerHTML == '') {
      continue
    } else {
      var num = $_('dayDiv_' + i).childNodes.length
      var htmlTxt = $_('dayDiv_' + i).innerHTML //if (day > 0 && day <= 31) 中的disDayContent + else if (dataArray[i].TaskStation == 4)中的disDayContent
      var addTxt = "<div class='taskDay'>共：" + parseInt(num) + '条</div>'
      $_('dayDiv_' + i).innerHTML = addTxt + htmlTxt
    }
  }
}

function taskDaymouseover(obj) {
  obj.style.background = '#00ff00' //绿色
}
function taskDaymouseout(obj) {
  obj.style.background = '#ffffff'
}

var xmlHttpSearch
function OnClickTask(taskID) {
  if (taskID == '') {
    return false
  }
  var taskInfos = taskID.split('_')
  var Task_Rule_Id = taskInfos[0]
  var Start_Time = taskInfos[1]
  xmlHttpSearch = createXMLHttpRequest()
  try {
    var q = 'Task_Rule_Id=' + Task_Rule_Id + '&BeginTime=' + Start_Time
    var url = 'ajax/queryinspectionresultbytask.php'
    xmlHttpSearch.onreadystatechange = function () {
      OnClickTaskRes()
    }
    xmlHttpSearch.open('post', url, true)
    //post这一句必须加上
    xmlHttpSearch.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpSearch.send(q)
  } catch (e) {
    alert(e)
  }
}
function OnClickTaskRes() {
  if (xmlHttpSearch.readyState == 4) {
    if (xmlHttpSearch.status == 200) {
      var s = xmlHttpSearch.responseText
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      s = s.replace(/[\\]/g, '\\\\')
      if (s === 0) {
        alert('该任务还未进行巡检！')
        return
      } else {
        var url = 'queryinspectionresult.html?UUID=' + s
        window.parent.parent.parent.fu(url)
      }
    }
  }
}
