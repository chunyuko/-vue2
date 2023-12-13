var allRequest = new Object()
allRequest = GetRequest()
var cou = 0
var year = GetRequestAll('year')
var month = GetRequestAll('month')
var heightnum = 0 //heightnum表示月历行数
function init() {
  // JumpMidSta()
  StationAjax()
  ele_init('TaskStation', 7, 'TaskStation', {
    OP: TaskStation_s,
    CSS: 'channel_checkbox',
  })
  ele_init('InspectionType', 7, 'InspectionType', {
    OP: RunPathType_s,
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
  //   $("#monthSelect option[value='-1']").css('visibility','hidden');
  $("#monthSelect option[value='-1']").css('display', 'none')

  var nowDay = new Date()
  var m = nowDay.getMonth() + 1
  var y = nowDay.getFullYear()
  if (year == '') {
    year = y
  }
  if (month == '') {
    month = m
  }
  flush_html_ele_value(month.toString(), 'monthSelect') //toString()当前月份
  flush_html_ele_value(year, 'yearSelect')
  showDays()
  getThisMonthTaskScheduleGrid() //月历展示
  $_('changeColor3').style.border = '#B4E3D4 1px solid'
  $_('changeColor4').style.backgroundColor = '#D0E3E1'
  $_('calendartop').style.backgroundColor = '#D0E3E1'
  $_('calendartop').style.border = '#B4E3D4 1px solid'
  $('#calendar th').css('background-color', '#E3F1F1')
  // resizepage()
}

var days = 0
function showDays() {
  var lastDay = new Date(year, month - 1, 0) //所选月份的上月最后一天，中国标准时间：具体到秒
  var firstDay = new Date(year, month, 0) //所选月份本月的最后一天，中国标准时间：具体到秒
  var starDay = lastDay.getDay() //所选月份第一天前面空格数    若var starDay = lastDay.getDay()+1  则月历安排不是从1-7而是7123456
  days = firstDay.getDate() //每月天数
  var nowDay = new Date() //获取当前中国标准时间：具体到秒
  var d = nowDay.getDate() //本月几号
  // console.log("月历构建 lastDay",lastDay)
  // console.log("月历构建 firstDay",firstDay)
  // console.log("月历构建 starDay",starDay)
  // console.log("月历构建 days",days)
  // console.log("月历构建 nowDay",nowDay)
  // console.log("月历构建 d",d)
  var yushu = (days + starDay) % 7 //处理最后一天为周日导致tbody多出一行的问题

  if (starDay == 7) {
    starDay = 0
  }
  var html =
    '<tr style="height:30px;border:1px #1662ad  solid" ><th height="30">一</th><th height="30">二</th><th height="30">三</th><th height="30">四</th><th height="30">五</th><th height="30">六</th><th height="30">七</th></tr>'
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
        '</div><div align=left title="" name="dayDiv" class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>'
      //指定实时日期，现不做特殊处理显示
    } else if (j < 10) {
      html +=
        '<td id="day_' +
        j +
        '" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;">0' +
        j +
        '</div><div align=left title="" name="dayDiv" class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>' //overflow: hidden;月历超出部分隐藏
    } else {
      html +=
        '<td id="day_' +
        j +
        '" valign=top><div style="background:;border:0px #BED5EF solid;height:15px;width:100%;color:#FFF;">' +
        j +
        '</div><div align=left title="" name="dayDiv" class="dayDiv" id="dayDiv_' +
        j +
        '"></div></td>' //overflow: hidden;月历超出部分隐藏
    }

    // console.log("月历构建 i",i)

    if (yushu != 0) {
      if (i % 7 == '0') {
        html += '</tr><tr>' //每七天换行
        cou++
        // console.log('0026行数iiii', i)
        heightnum++
      }
      if (cou == 4) {
        // console.log('21用于测试月历图显示行数对任务显示区域的影响', cou)
        //           for(var i=1;i<=12;i++){
        //         //   $("dayDiv_"+i+"").style.backgroundColor=red
        //         //   $("dayDiv_"+i+"").style.height='200px'
        // }
        // $("dayDiv").attr("class","dayDivMod")
      }
    }
    if (yushu == 0) {
      if (j < 28 && i % 7 == '0') {
        html += '</tr><tr>' //每七天换行

        // console.log('0026行数i', i)
        heightnum++
      }
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
  var year = get_ele_value('yearSelect')
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
  } else if (str == 'now') {
    var nowDay = new Date()
    var month = nowDay.getMonth() + 1
    var year = nowDay.getFullYear()
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
  for (var i = 0; i < daysdiv.length; i++) {
    daysdiv[i].style.height = daysdivheight + 'px'
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
  var StationID = ''

  // console.log('1122 BeginTime', BeginTime)
  // console.log('1122 EndTime', EndTime)
  //   console.log("1122 StationID",StationID)

  xmlHttpGetTaskGrid = createXMLHttpRequest()
  try {
    var sendText = 'BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&StationID=' + StationID
    var url = '/api162/dalirobotcms/ajax/querytaskscheduleGrid.php?' + sendText
    // console.log('月历表格传递的请求数据：url', url)
    xmlHttpGetTaskGrid.onreadystatechange = getThisMonthTaskScheduleGridRes
    xmlHttpGetTaskGrid.open('POST', url, true)
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
      // console.log('月历表格返回的数据：arr', arr)
      arr.sort(function (x, y) {
        return x.Start_Time - y.Start_Time
      })
      ShowTaskSchedule(arr)
    }
  }
}

function GetDayFromUnixTime(datetimeUnix) {
  var dateTimeStr = UnixTimeToStr(datetimeUnix) //巡检任务的日期和具体时间字符串
  var dates = dateTimeStr.split(' ') //巡检任务的日期和具体时间数组
  var dateArray = dates[0].split('-') //巡检任务时间年月日分离数组
  var daystr = dateArray[2] //该月有巡检任务的的'日'
  return daystr
}

// 下面两个函数是日历内容的显示，以及不同类型不同字色表示
var days = 0
function ShowTaskSchedule(dataArray) {
  var l = dataArray.length //每月最多总任务条数  dataArray:每99条任务为一小数组的大数组
  if (l <= 0) {
    return false
  }
  for (var i = 0; i < l; i++) {
    if (dataArray[i].Start_Time < dataArray[i].SetTime) {
      continue
    }
    var datetimeUnix = dataArray[i].Start_Time
    var day = parseInt(GetDayFromUnixTime(datetimeUnix)) //day / GetDayFromUnixTime(datetimeUnix) 含有任务的日子,出现次数表示这个日子的任务次数
    var temphtml = $_('dayDiv_' + day).innerHTML
    var num = $_('dayDiv_' + day).childNodes
    if (day > 0 && day <= 31) {
      var tempID = dataArray[i].Task_Rule_Id + '_' + dataArray[i].Start_Time
      var disDayContent =
        "<div class='taskDay' onmouseover='taskDaymouseover(this);' title='' onmouseout='taskDaymouseout(this);' >"
      if (dataArray[i].TaskStation == 1) {
        disDayContent +=
          "<div style='display: inline-block;background-color: black; height:5px;width: 18px;border-radius: 5px;'></div><font color='black'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 2) {
        disDayContent +=
          "<div style='display: inline-block;background-color: #31cb72; height:5px;width: 18px;border-radius: 5px;'></div><font color='#31cb72'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 3) {
        disDayContent +=
          "<div style='display: inline-block;background-color: #f8c335; height:5px;width: 18px;border-radius: 5px;'></div><font color='#f8c335'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 4) {
        disDayContent +=
          "<div style='display: inline-block;background-color: #817271; height:5px;width: 18px;border-radius: 5px;'></div><font color='#817271'>" +
          dataArray[i].Task_Desc +
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) +
          '</font>'
      } else if (dataArray[i].TaskStation == 5) {
        disDayContent +=
          "<div style='display: inline-block;background-color: #3271f8; height:5px;width: 18px;border-radius: 5px;'></div><font color='#3271f8'>" +
          dataArray[i].Task_Desc + //巡检任务名称
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) + //巡检任务时间
          '</font>'
      } else if (dataArray[i].TaskStation == 6) {
        disDayContent +=
          "<div style='display: inline-block;background-color: #fc3131; height:5px;width: 18px;border-radius: 5px;'></div><font color='#fc3131'>" +
          dataArray[i].Task_Desc + //巡检任务名称
          '\r\n' +
          UnixTimeToHourMinSecStr(dataArray[i].Start_Time) + //巡检任务时间
          '</font>'
      } else {
        disDayContent +=
          "<div style='display: inline-block;background-color: #fc3131; height:5px;width: 18px;border-radius: 5px;'></div><font color='#fc3131'>TaskStation error " +
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
      // console.log('4和12月历显示有误原因查找', heightnum)
      if (heightnum == 5) {
        var addTxt =
          "<div class='taskDay' style='margin-top: 54px;position: absolute;margin-left: 5px; background: #fff;width: 140px;height: 25px;color:green;text-align:center;border-radius:2px;font-weight:bold;line-height:25px'>共：" +
          parseInt(num) +
          '  条</div>'
        $_('dayDiv_' + i).innerHTML = addTxt + htmlTxt
      }
      if (heightnum == 4) {
        // for (j = 1; j <= 5; j++) {  //【在此用不了,会使页面无响应】

        // var j=4
        var ele = document.getElementById('dayDiv_' + i + '')
        // console.log("ele",ele)
        ele.style.height = '70px'

        // ele.style.backgroundColor='red'
        // }
        // var ele =document.getElementById("dayDiv").className;
        // console.log("ele",ele)
        // ele.style.backgroundColor='red'

        // var ele =document.getElementsByTagName("dayDiv");
        // console.log("ele",ele.length)

        var addTxt =
          "<div class='taskDay' style='margin-top: 75px;position: absolute;margin-left: 5px; background: #fff;width: 140px;height: 25px;color:green;text-align:center;border-radius:2px;font-weight:bold;line-height:25px'>共：" +
          parseInt(num) +
          '  条</div>'
        $_('dayDiv_' + i).innerHTML = addTxt + htmlTxt
      }

      //   console.log("heightnum",heightnum)
    }
  }
}
function StationAjax() {
  $.post(
    '/api162/dalirobotcms/ajax/taskList.php',
    {
      task: 'getStationTree',
    },
    function (res) {
      var arrSta = []
      var arrStaTd = []
      res = eval('(' + res + ')')
      // console.log('月历页面变电站层级情况打印', res)
      var len = Object.keys(res.data).length
      // console.log('月历页面变电站层级情况打印len', len)

      for (var i = 0; i < len; i++) {
        var arr = res.data[i]
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].level == len) {
            arrSta.push(arr[j].label)
            arrStaTd.push(arr[j].id)
          }
          // console.log('月历页面变电站层级情况打印arrSta', arrSta)
          // console.log('月历页面变电站层级情况打印arrStaTd', arrStaTd)

          let oHtml = ''
          oHtml += '<option value="-1">请选择变电站</option>'
          for (let i = 0; i < arrSta.length; i++) {
            oHtml += '<option value="' + arrStaTd[i] + '">' + arrSta[i] + ' </option>'
          }
          $('#Station').html(oHtml)
        }
        //变电站默认选中第一个
        $("#Station option[value='" + arrStaTd[0] + "']").attr('selected', 'selected')
      }

      //         var myselect=document.getElementById("Station")
      //   var index=myselect.selectedIndex
      //   console.log("select选中项的变电站id:",myselect.options[index].value)
    }
  )
}

// $(window).resize(function () {
//   location.reload()
//   //这里你可以写你的刷新代码！
// })

function JumpMidSta() {
  if (scheduleifr.window.document.getElementById('Jump1').value != '') {
    // console.log('y')
    // 向vue中发送数据
    window.parent.postMessage(
      {
        cmd: 'calenderJumpinsRes',
        params: {
          success: true,
          Jump1: scheduleifr.window.document.getElementById('Jump1').value,
          Jump2: scheduleifr.window.document.getElementById('Jump2').value,
          Jump3: scheduleifr.window.document.getElementById('Jump3').value,
          Jump4: scheduleifr.window.document.getElementById('Jump4').value,
        },
      },
      '*'
    ) /*当有多个iframe页面传值时，可以设计通过其中的字段获取对应的值*/
  }
}

function JumpMidtask() {
  if (scheduleifr.window.document.getElementById('Jumptask').value != '') {
    // console.log('y')
    // 向vue中发送数据
    window.parent.postMessage(
      {
        cmd: 'JumptaskConfig',
        params: {
          Jumptask: scheduleifr.window.document.getElementById('Jumptask').value,
        },
      },
      '*'
    ) /*当有多个iframe页面传值时，可以设计通过其中的字段获取对应的值*/
  }
}

function HiddenPar() {
  $_('LookAt').style.display = 'none'
}
