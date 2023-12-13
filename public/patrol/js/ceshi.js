var Task_Path_s = new Array()
Task_Path_s.push(new selectobj('请选择巡检路线', ''))

function Init() {
  document.oncontextmenu = OnConTextMenu

  disBeginEndTimeOneWeek()

  InitCalendar()
  //	btnSearchClick();         //////大立协议规则显示任务列表
  btnSearchClickGrid() //////国网协议规则显示任务列表
  resizepage()

  GetTaskPathInfo()
  //   $_('changeColor1').style.border = '#C1E7DD 0px solid'
  //   $_('changeColor1').style.backgroundColor = '#073a7d'
}

function resizepage() {
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  //alert("bw="+bw+" \r\n bh="+bh);
  $_('wrapDiv').style.width = bw - 20 + 'px'
  $_('wrapDiv').style.height = bh + 'px'
  $_('divContent').style.height = bh - 100 + 'px'
}

var AllTaskPath = new Array()

var xmlHttpGetTaskPath = ''
function GetTaskPathInfo() {
  xmlHttpGetTaskPath = createXMLHttpRequest()
  try {
    var q = ''
    var url = 'ajax/querytaskpath.php'
    xmlHttpGetTaskPath.onreadystatechange = function () {
      GetTaskPathInfoRes()
    }
    xmlHttpGetTaskPath.open('GET', url, true)
    xmlHttpGetTaskPath.send(null)
  } catch (e) {
    alert(e)
  }
}
