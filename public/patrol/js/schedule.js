var Task_Path_s = new Array()
Task_Path_s.push(new selectobj('请选择巡检路线', ''))

// vue 实例对象
let vm = null

function CreateHTMLele() {
  //   ele_init('TaskStation', 7, 'TaskStation', {
  //     // OP: TaskStation_s,
  //     CSS: 'channel_checkbox',
  //   })

  //super用户才有“重复执行”的选项
  ele_init('Task_Rule', 3, 'Task_Rule', {
    OP: Robot_Rule_s,
    ONCHANGE: NormalSelectChangeRule,
  })

  ele_init('RuleWeek', 7, '重复周', {
    OP: Week_s,
    CSS: 'week_checkbox',
    DISALL: 'true',
    VT: 1,
  })
  ele_init('RuleMonth', 7, '重复月', {
    OP: Day_s,
    CSS: 'day_checkbox',
    DISALL: 'true',
    VT: 1,
  })
  ele_init('RepeatInterval', 2, '重复间隔', '')
}

function NormalSelectChangeRule() {
  NormalSelectChange()
}

function NormalSelectChangeBlue() {
  $('#paramdiv').css('display', 'block')
  if (get_ele_value('Task_Rule') == 0 || get_ele_value('Task_Rule') == 1) {
    $('#repeatInter,#repeatMonth,#repeatWeek').css('display', 'none')
  } else if (get_ele_value('Task_Rule') == 2) {
    //每周
    $('#repeatInter,#repeatMonth').css('display', 'none')
    $('#repeatWeek').css('display', '')
  } else if (get_ele_value('Task_Rule') == 3) {
    $('#repeatInter,#repeatWeek').css('display', 'none')
    $('#repeatMonth').css('display', '')
  } else if (get_ele_value('Task_Rule') == 4) {
    $('#repeatMonth,#repeatWeek').css('display', 'none')
    $('#repeatInter').css('display', '')
  }
}

function Init() {
  document.oncontextmenu = OnConTextMenu
  CreateHTMLele()

  //   disBeginEndTimeOneWeek()
  //   disTimeNowToObj($_('TaskBeginTime'))
  //   InitCalendar()

  //	btnSearchClick();         //////大立协议规则显示任务列表

  //   btnSearchClickGrid() //////国网协议规则显示任务列表

  GetTaskPathInfo()
  //   $_('changeColor1').style.border = '#C1E7DD 0px solid'
  //   $_('changeColor1').style.backgroundColor = '#073a7d'
  initApp()
  resizepage()
}

function initApp() {
  vm = new Vue({
    el: '#app',
    data: function () {
      return {
        value1: '',
      }
    },
  })
}

var xmlHttpDeleteTaskRule = ''
function DeleteTaskRule() {
  var ScheduleIDChk = ''
  var o = document.getElementsByName('ScheduleIDChk')
  var l = o.length - 1
  for (var i = l; i >= 0; i--) {
    if (o[i].checked == true) {
      ScheduleIDChk += o[i].value + ','
    }
  }

  if (ScheduleIDChk == '') {
    alert('请选择要删除的任务！')
    return false
  }

  if (ScheduleIDChk != '') {
    ScheduleIDChk = ScheduleIDChk.substr(0, ScheduleIDChk.length - 1)
  }
  if (
    !confirm(
      '重要提示：本系统是按照任务规则存储巡检任务，删除本任务，将删除与本任务相同规则的所有任务！请确认！'
    )
  ) {
    return
  }
  xmlHttpDeleteTaskRule = createXMLHttpRequest()
  try {
    var q = 'task=delTaskMultiRule&ScheduleIDChk=' + ScheduleIDChk
    var url = 'ajax/taskmanage.php?' + q
    xmlHttpDeleteTaskRule.onreadystatechange = DeleteTaskRuleRes
    xmlHttpDeleteTaskRule.open('get', url, true)
    xmlHttpDeleteTaskRule.send(null)
  } catch (e) {
    alert(e)
  }
}

function DeleteTaskRuleRes() {
  if (xmlHttpDeleteTaskRule.readyState == 4) {
    if (xmlHttpDeleteTaskRule.status == 200) {
      var s = xmlHttpDeleteTaskRule.responseText
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')

      if (s == 'OK') {
        alert('巡检任务删除成功！')
        window.parent.location.reload()
      } else {
        alert('巡检任务删除失败！')
      }
      return
    }
  }
}
var xmlHttpSearch
function btnSearchClick() {
  ClearTable($_('DataTable'))

  InitDataTable($_('DataTable'), 'hidden')
  xmlHttpSearch = createXMLHttpRequest()

  try {
    var sendText =
      '&BeginTime=' +
      $_('BeginTime').value +
      '&EndTime=' +
      $_('EndTime').value +
      '&StationID=' +
      window.parent.parent.parent.StationIDNow

    //   var sendText =
    //   '&BeginTime=' +
    //   $_('BeginTime').value +
    //   '&EndTime=' +
    //   $_('EndTime').value +
    //   '&StationID=' +
    //   window.parent.parent.parent.StationIDNow +
    //   '&TaskName=' +
    //   encodeURIComponent($_('TaskName').value)

    var url = 'ajax/querytaskschedule.php?TaskStation=' + get_ele_value('TaskStation') + sendText
    xmlHttpSearch.onreadystatechange = SearchStateChange
    xmlHttpSearch.open('GET', url, true)
    xmlHttpSearch.send(null)
  } catch (e) {
    alert(e)
  }
}
var EveryPageNum = 10
function SearchStateChange() {
  if (xmlHttpSearch.readyState == 4) {
    if (xmlHttpSearch.status == 200) {
      var s = xmlHttpSearch.responseText
      if (s == '') {
        alert('没有符合要求的结果！')
        InitDataTable($_('DataTable'), 'hidden')
        return
      }
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      var arr = JSON.parse(s)
      InitDataTable($_('DataTable'), 'Dis')
      //按时间排序
      arr.sort(function (x, y) {
        return x.Start_Time - y.Start_Time
      })
      ShowData(arr, $_('DataTable'), EveryPageNum)
      ScrollTbHeadChange()
    }
  }
}

var TaskStation = ''
var xmlHttpSearchGrid
function btnSearchClickGrid() {
  TaskStation = get_ele_value('TaskStation')
  ClearTable($_('DataTable'))
  InitDataTable($_('DataTable'), 'hidden')
  xmlHttpSearchGrid = createXMLHttpRequest()
  try {
    var sendText =
      '&BeginTime=' +
      $_('BeginTime').value +
      '&EndTime=' +
      $_('EndTime').value +
      '&StationID=' +
      window.parent.parent.parent.StationIDNow

    //   var sendText =
    //   '&BeginTime=' +
    //   $_('BeginTime').value +
    //   '&EndTime=' +
    //   $_('EndTime').value +
    //   '&StationID=' +
    //   window.parent.parent.parent.StationIDNow +
    //   '&TaskName=' +
    //   encodeURIComponent($_('TaskName').value)

    var url =
      'ajax/querytaskscheduleGrid.php?TaskStation=' + get_ele_value('TaskStation') + sendText
    xmlHttpSearchGrid.onreadystatechange = SearchStateChangeGrid
    xmlHttpSearchGrid.open('GET', url, true)
    xmlHttpSearchGrid.send(null)
  } catch (e) {
    alert(e)
  }
}
var EveryPageNum = 10
function SearchStateChangeGrid() {
  if (xmlHttpSearchGrid.readyState == 4) {
    if (xmlHttpSearchGrid.status == 200) {
      var s = xmlHttpSearchGrid.responseText
      if (s == '') {
        alert('没有符合要求的结果！')
        InitDataTable($_('DataTable'), 'hidden')
        return
      }
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      var arr = JSON.parse(s)
      InitDataTable($_('DataTable'), 'Dis')
      //按时间排序
      arr.sort(function (x, y) {
        return x.Start_Time - y.Start_Time
      })
      ShowData(arr, $_('DataTable'), EveryPageNum)
      ScrollTbHeadChange()
    }
  }
}

function InsertToTable(i, DataInfoArray, everypagenum) {
  var l = DataInfoArray.length
  if (TaskStation) {
    if (TaskStation.indexOf(DataInfoArray['TaskStation']) == -1) {
      return
    }
  }
  var cntr = $_('DataTable')
  objTR = cntr.insertRow(InserRowOrder)
  ;(function () {
    var TempID = DataInfoArray['Task_Rule_Id'] + '_' + DataInfoArray['Start_Time']
    objTR.onclick = function () {
      SelectRow()
    }
    objTR.ondblclick = function () {
      window.parent.OnClickTask(TempID)
    }
  })()

  var tempObj = new TaskObj(
    DataInfoArray['Task_Rule_Id'] + '_' + DataInfoArray['Start_Time'],
    DataInfoArray['Task_Rule_Id'],
    DataInfoArray['Start_Time']
  )
  window.parent.AllTaskObj.pao(tempObj, 'ID')

  var n = 0
  var objCell = objTR.insertCell(n++)
  objCell.innerHTML =
    "<input type=checkbox name=ScheduleIDChk value='" + DataInfoArray['Task_Rule_Id'] + "'>"
  objCell = objTR.insertCell(n++)
  objCell.innerHTML = DataInfoArray['Task_Desc']

  objCell = objTR.insertCell(n++)
  objCell.innerHTML = timestamptostr(DataInfoArray['Start_Time'])

  /*
	0：任务未执行
	1：任务已执行，且已结束
	2：任务已执行，但未结束，也可能是意外中断
	3: 正在执行
	4: 任务超期
	*/

  var DisTaskStation = ''
  objCell = objTR.insertCell(n++)
  if (DataInfoArray['TaskStation'] == '0') {
    DisTaskStation = "<font color='blue'>等待执行</font>"
  } else if (DataInfoArray['TaskStation'] == 1) {
    DisTaskStation = "<font color='green'>执行完成</font>"
  } else if (DataInfoArray['TaskStation'] == 2) {
    DisTaskStation = "<font color='brown'>中途终止</font>"
  } else if (DataInfoArray['TaskStation'] == 3) {
    DisTaskStation = "<font color='red'>正在执行</font>"
  } else if (DataInfoArray['TaskStation'] == 4) {
    DisTaskStation = "<font color='orange'>任务超期</font>"
  }

  objCell.innerHTML = DisTaskStation

  objCell = objTR.insertCell(n++)
  if (DataInfoArray['InspectType'] == 1) {
    objCell.innerHTML =
      "<a href='javascript:void(0);' onclick='DelTask(" +
      DataInfoArray['Task_Rule_Id'] +
      ")'>任务删除</a>"
  } else {
    objCell.innerHTML =
      "<a href='javascript:void(0);' onclick='RunInspectionTask(" +
      DataInfoArray['Task_Path_Id'] +
      ")'>立即执行</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='DelTask(" +
      DataInfoArray['Task_Rule_Id'] +
      ")'>任务删除</a>"
  }

  if (window.parent.parent.parent.parent.PageStyle == 0) {
    // $('.scroll_table tr,.scroll_table td').css('color', '#BED5EF')
    // $('.scroll_table tr,.scroll_table td').css('background', '#060e34')
    // $('.scroll_table tr,.scroll_table td').css('border', '#1E2748 1px solid')
  }
}

var xmlHttpDelTask
function DelTask(Task_Rule_Id) {
  if (
    !confirm(
      '重要提示：本系统是按照任务规则存储巡检任务，删除本任务，将删除与本任务相同规则的所有任务！请确认！'
    )
  ) {
    return
  }
  xmlHttpDelTask = createXMLHttpRequest()
  try {
    var q = 'task=delTaskRule&Task_Rule_Id=' + Task_Rule_Id
    var url = 'ajax/taskmanage.php'
    xmlHttpDelTask.onreadystatechange = function () {
      DelTaskRes()
    }
    xmlHttpDelTask.open('post', url, true)
    xmlHttpDelTask.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpDelTask.send(q)
  } catch (e) {
    alert(e)
  }
}

function DelTaskRes() {
  if (xmlHttpDelTask.readyState == 4) {
    if (xmlHttpDelTask.status == 200) {
      var s = xmlHttpDelTask.responseText
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      if (s == 'OK') {
        alert('巡检任务删除成功！')
        window.parent.location.reload()
      } else {
        alert('巡检任务删除失败！')
      }
      return
    }
  }
}

var xmlHttpGetOnCharge = ''
function GetOnCharge(OperateFlag, Task_Path_Id) {
  if (!confirm('确认执行巡检任务？')) {
    return false
  }

  xmlHttpGetOnCharge = createXMLHttpRequest()
  try {
    var q = ''
    var url = 'ajax/getcaroncharge.php'
    xmlHttpGetOnCharge.onreadystatechange = function () {
      GetOnChargeRes(OperateFlag, Task_Path_Id)
    }
    xmlHttpGetOnCharge.open('post', url, false)
    //post这一句必须加上
    xmlHttpGetOnCharge.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpGetOnCharge.send(q)
  } catch (e) {
    alert(e)
  }
}
function GetOnChargeRes(OperateFlag, Task_Path_Id) {
  if (xmlHttpGetOnCharge.readyState == 4) {
    if (xmlHttpGetOnCharge.status == 200) {
      var s = xmlHttpGetOnCharge.responseText
      if (s == '') {
        return
      }
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      s = s.replace(/[\\]/g, '\\\\')
      var IsInChargeFlag = 0
      if (s == 'Yes') {
        IsInChargeFlag = 1
      }
      GetRobotEdge(OperateFlag, Task_Path_Id, IsInChargeFlag)
    }
  }
}

var xmlHttpGetRobotEdge = ''
function GetRobotEdge(OperateFlag, Task_Path_Id, IsInChargeFlag) {
  xmlHttpGetRobotEdge = createXMLHttpRequest()
  try {
    var q = ''
    var url = 'ajax/getrobotedge.php'
    xmlHttpGetRobotEdge.onreadystatechange = function () {
      GetRobotEdgeRes(OperateFlag, Task_Path_Id, IsInChargeFlag)
    }
    xmlHttpGetRobotEdge.open('GET', url, true)
    xmlHttpGetRobotEdge.send(null)
  } catch (e) {
    alert(e)
  }
}

function GetRobotEdgeRes(OperateFlag, Task_Path_Id, IsInChargeFlag) {
  if (xmlHttpGetRobotEdge.readyState == 4) {
    if (xmlHttpGetRobotEdge.status == 200) {
      var s = xmlHttpGetRobotEdge.responseText
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      s = parseInt(s)

      if (s == '') {
        alert('机器人故障！请检查！')
        return false
      } else if (s == -1) {
        alert('机器人偏离巡检轨迹，请手动控制到巡检轨迹上后，再启动巡检！')
        return false
      } else if (s == -2) {
        //由于在充电房时 ，充电房门可能是关着的，有可能无法定位。所以先执行任务，把充电房门打开，导航程序会自动定位一次的
        if (IsInChargeFlag == 1) {
          if (OperateFlag == 1) {
            RunInspectionTask(Task_Path_Id)
          } else if (OperateFlag == 2) {
            ContinueRunTask()
          }
        } else {
          alert('机器人未定位！请先定位后，再启动巡检！')
          return false
        }
      } else if (s > 0) {
        //alert("OperateFlag="+OperateFlag);
        if (OperateFlag == 1) {
          RunInspectionTask(Task_Path_Id)
        } else if (OperateFlag == 2) {
          ContinueRunTask()
        }
      } else {
        alert('数据接收错误！')
        return false
      }
    }
  }
}

var xmlHttpRun = ''
function RunInspectionTask(Task_Path_Id) {
  if (!confirm('确认执行巡检任务？')) {
    return false
  }

  xmlHttpRun = createXMLHttpRequest()
  try {
    var url =
      'ajax/robotruntask.php?Task_Path_Id=' +
      Task_Path_Id +
      '&sessionUserType=' +
      window.parent.parent.parent.sessionUserType +
      '&CMSID=' +
      window.parent.parent.parent.CMSID
    //alert("url="+url);
    //xmlHttpRun.onreadystatechange=SearchStateChange;
    xmlHttpRun.open('GET', url, true)
    xmlHttpRun.send(null)
  } catch (e) {
    alert(e)
  }
}

function resizepage() {
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  //alert("bw="+bw+" \r\n bh="+bh);
  $_('wrapDiv').style.width = bw - 20 + 'px'
  $_('wrapDiv').style.height = bh + 'px'
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

function GetTaskPathInfoRes() {
  if (xmlHttpGetTaskPath.readyState == 4) {
    if (xmlHttpGetTaskPath.status == 200) {
      var s = xmlHttpGetTaskPath.responseText
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')
      var arr = JSON.parse(s)
      var l = arr.length
      //alert("l="+l);
      if (l > 0) {
        for (var i = 0; i < l; i++) {
          var objtemp = new TaskPathObj(
            arr[i]['Task_Path_Id'],
            arr[i]['Task_Path_Desc'],
            arr[i]['ConcurrentTask'],
            arr[i]['InspectType'],
            arr[i]['StartTime'],
            arr[i]['BeginTime'],
            arr[i]['EndTime'],
            arr[i]['UnBeginTime'],
            arr[i]['UnEndTime'],
            arr[i]['RepeatNum'],
            arr[i]['TaskRuleGrid'],
            arr[i]['Priority'],
            arr[i]['DeviceLevel'],
            arr[i]['RuleMonth'],
            arr[i]['RuleWeek'],
            arr[i]['Task_IfrFlag']
          )
          AllTaskPath.pao(objtemp, 'Task_Path_Id')
          Task_Path_s.push(new selectobj(arr[i]['Task_Path_Desc'], arr[i]['Task_Path_Id']))
        }
        ele_init('Task_Path', 3, 'Task_Path', {
          OP: Task_Path_s,
          ONCHANGE: Task_PathChange,
        })
        if (window.parent.parent.parent.parent.PageStyle == 0) {
          $('.param_select').css('color', '#BED5EF')
          $('.param_select').css('background', '#060e34')
        }
      } else {
        alert('请先编制巡检线路，然后再制定巡检计划！')
      }

      return
    }
  }
}

function ShowParam() {
  $_('paramwrap').style.display = DisBlock
}

function Task_PathChange() {
  var Task_Path_Id = get_ele_value('Task_Path')
  if (Task_Path_Id == '') {
    return false
  }

  var n = AllTaskPath.qao(Task_Path_Id, 'Task_Path_Id')
  if (n == -1) {
    return false
  }

  $_('Task_Rule_Desc').value = AllTaskPath[n].Task_Path_Desc
}

var AddOrModifyTaskRuleFlag = 0

function hiddenparam() {
  AddOrModifyTaskRuleFlag = 0
  $_('paramwrap').style.display = 'none'
}
var xmlHttpAddTask

function AddTaskRule() {
  var Task_Path_Id = get_ele_value('Task_Path')

  if (Task_Path_Id == '') {
    alert('请选择巡检路线!')
    return false
  }

  var Task_Rule_Desc = $_('Task_Rule_Desc').value
  var TaskBeginTime = $_('TaskBeginTime').value
  var RuleWeek = get_ele_value('RuleWeek')
  var RuleMonth = get_ele_value('RuleMonth')
  var Task_Rule = get_ele_value('Task_Rule')
  var RepeatInterval = get_ele_value('RepeatInterval')

  var ScheduleSet = ''
  if (Task_Rule == 2) {
    ScheduleSet = RuleWeek
  } else if (Task_Rule == 3) {
    ScheduleSet = RuleMonth
  }

  xmlHttpAddTask = createXMLHttpRequest()
  try {
    var q =
      'task=addTaskRule&Task_Path_Id=' +
      Task_Path_Id +
      '&Task_Rule_Desc=' +
      encodeURIComponent(Task_Rule_Desc) +
      '&TaskBeginTime=' +
      TaskBeginTime +
      '&ScheduleSet=' +
      ScheduleSet +
      '&Task_Rule=' +
      Task_Rule +
      '&StationIDNow=' +
      window.parent.parent.parent.StationIDNow +
      '&RepeatInterval=' +
      RepeatInterval
    var url = 'ajax/taskmanage.php'
    xmlHttpAddTask.onreadystatechange = function () {
      AddTaskRuleRes()
    }
    xmlHttpAddTask.open('post', url, true)
    xmlHttpAddTask.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpAddTask.send(q)
  } catch (e) {
    alert(e)
  }
}

function AddTaskRuleRes() {
  if (xmlHttpAddTask.readyState == 4) {
    if (xmlHttpAddTask.status == 200) {
      var s = xmlHttpAddTask.responseText
      //PHP返回的内容会被加上回车换行符
      var reg = /[\r\n]/g
      s = s.replace(reg, '')

      if (s == 'OK') {
        alert('巡检任务编辑成功！')
        window.parent.location.reload()
      } else {
        hiddenparam()
        alert('巡检任务编辑失败！')
      }
      return
    }
  }
}

function ModifyTaskRule() {
  hiddenparam()
}

function AddOrModifyTaskRule() {
  if (AddOrModifyTaskRuleFlag == 1) {
    ModifyTaskRule()
  } else {
    AddTaskRule()
  }
}

var xmlHttpContinueRunTask
function ContinueRunTask(Task_Path_Id) {
  if (!confirm('确认继续执行巡检任务？')) {
    return false
  }
  xmlHttpContinueRunTask = createXMLHttpRequest()
  try {
    var url =
      'ajax/gridTask.php?Task_Path_Id=' +
      Task_Path_Id +
      '&taskComd=continue&sessionUserType=' +
      window.parent.parent.parent.sessionUserType
    xmlHttpContinueRunTask.open('get', url, true)
    xmlHttpContinueRunTask.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpContinueRunTask.send(null)
  } catch (e) {
    alert(e)
  }
}

var xmlHttpstoptask
function stoptask(Task_Path_Id) {
  xmlHttpstoptask = createXMLHttpRequest()
  try {
    var url =
      'ajax/gridTask.php?Task_Path_Id=' +
      Task_Path_Id +
      '&taskComd=stop&sessionUserType=' +
      window.parent.parent.parent.sessionUserType
    xmlHttpstoptask.open('get', url, true)
    xmlHttpstoptask.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttpstoptask.send(null)
  } catch (e) {
    alert(e)
  }
}
var xmlHttppausetask
function pausetask(Task_Path_Id) {
  xmlHttppausetask = createXMLHttpRequest()
  try {
    var url =
      'ajax/gridTask.php?Task_Path_Id=' +
      Task_Path_Id +
      '&taskComd=pause&sessionUserType=' +
      window.parent.parent.parent.sessionUserType
    //		alert(url);
    xmlHttppausetask.open('get', url, true)
    xmlHttppausetask.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8'
    )
    xmlHttppausetask.send(null)
  } catch (e) {
    alert(e)
  }
}

function btnSearchClickList() {
  //	btnSearchClick();         //////大立协议规则显示任务列表
  btnSearchClickGrid() //////国网协议规则显示任务列表
}

function AlertTest() {
  alert('对应事件弹窗')
  //   $_('Alert').style.display = DisBlock //新增任务的弹窗样式
}
