setTimeout(Init, 500)
//打开页面后，勾选哪些设备
var RunT
var PageT
var AllTaskObj = new Array()

function CreateHTMLele() {
  ele_init('InspectType', 3, '巡检方式', { OP: InspectWorkType_s })
  ele_init('Task_Rule', 3, 'Task_Rule', { OP: Task_Rule_s, ONCHANGE: NormalSelectChange })
  ele_init('ConcurrentTask', 3, 'ConcurrentTask', { OP: YesOrNo_s })
  ele_init('RuleWeek', 7, '每周重复', { OP: Week_s, CSS: 'week_checkbox', DISALL: 'true', VT: 1 })
  ele_init('RuleMonth', 7, '每月重复', { OP: Day_s, CSS: 'day_checkbox', DISALL: 'true', VT: 1 })
  flush_html_ele_value('1', 'Task_CaliFlag')
  ele_init('RepeatInterval', 2, '重复间隔(分钟)', '')
  ele_init('RuleMonthGrid', 7, '周期(月)', {
    OP: Month_s,
    CSS: 'day_checkbox',
    DISALL: 'true',
    VT: 0,
  })
  ele_init('RuleWeekGrid', 7, '周期(周)', {
    OP: Week_s,
    CSS: 'week_checkbox',
    DISALL: 'true',
    VT: 0,
  })
  ele_init('Task_IfrFlag', 3, 'Task_IfrFlag', { OP: Task_Finish_IFR_s })
}

function Init() {
  //   initApp()

  GetTaskPath(1)

  initpage()

  //   ele_init('InspectionType', 3, 'InspectionType', {
  //     OP: RunPathType_s,
  //     CSS: 'patrolSta_checkbox',
  //   })
  ele_init('patrolSta', 3, 'patrolSta', {
    OP: patrolSta_s,
    CSS: 'patrolSta_checkbox',
  })

  //跳转修改
  // /*   日历页面的跳转 */
  // var from = sessionStorage.getItem('from')
  // if (from == 'shedulejump') {
  //   AddPath()
  //   sessionStorage.setItem('from', '') //销毁 from ,防止在shedulejump页面刷新 依然触发$('#xxx').click()
  // }

  // if (from == 'vuejump') {
  //   // 因为设计到总父页面的跳转，所以需要vue页面的处理
  //   sessionStorage.setItem('from', '')
  // }

  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  if (window.parent.parent.parent.parent.PageStyle != 0) {
  }
}

/* 表格数据的获取*/
function GetTaskPath(page) {
  //1220有问题，数据获取部分任务没有变电站id。包括任务新建时，也没有产生变电站id【新建显示：普洱系统不在线！有变电站id的任务才会自动收缩树】
  // console.log("触发表格初始化")
  // console.log("初始默认获取变电站 taGetTPath1",window.parent.$('#taGetTPath1').val())

  //选择变电站后获取变电站
  let TreeId = window.parent.document.getElementById('TreeId')
  // console.log("触发表格初始化 TreeId",TreeId)
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })

  var key = key.toString() //数组转为字符串（中间逗号隔开）
  // console.log("初始化的变电站获取 keyPoint",key)

  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }
  // console.log("zui终初始化的变电站获取",key)
  var len = 0
  $.post(
    '/api162/dalirobotcms/ajax/querytaskpath.php',
    {
      stationID: key,
      page: '',
      num_every_page: '', //这里原是显示每页条数，现在是显示总共页面条数（变电站和运维班显示的条数。其他数据能显示，但是变电站和运维班数据不显示），在总页面的基础上通过分页每页显示10条数据
      PathType: '0,1,2,3,4,5,6',
      TaskName: '',
      ExecuteType: '0',
    },
    function (res) {
      res = JSON.parse(res)
      // console.log('1216 taskpath数据1216：', res)
      //因为num_every_page现在代替完整显示条数，所以这里获取任务条数赋值给num_every_page获得初始化表格
      len = res.length
      // 初始化表格
      // console.log('1216 taskpath数据1216条数：', len)

      // 第一次请求是数据名称不全是的所有任务，第二次请求是含有任务名称数据是所有任务，是在第一次请求的基础上获取所有数据（全的数据

      //【报错的数据清除了，自动清除的？】
      $.post(
        '/api162/dalirobotcms/ajax/querytaskpath.php',
        {
          stationID: key,
          page: page,
          num_every_page: len, //这里原是显示每页条数，现在是显示总共页面条数（变电站和运维班显示的条数。其他数据能显示，但是变电站和运维班数据不显示），在总页面的基础上通过分页每页显示10条数据
          PathType: '0,1,2,3,4,5,6',
          TaskName: '',
          ExecuteType: '0',
        },
        function (res) {
          // debugger
          res = JSON.parse(res)
          console.log('taskpath数据：', res)
          // console.log('taskpath数据条数：', res.length)

          PageT.totalnum = res.length

          for (let path of res) {
            if (path.PathType == 0) {
              var PaTy = '<span> 全面巡检</span>'
            } else if (path.PathType == 1) {
              var PaTy = '<span> 特殊巡检</span>'
            } else if (path.PathType == 2) {
              var PaTy = '<span> 专项巡视</span>'
            } else if (path.PathType == 3) {
              var PaTy = '<span> 自定义巡视</span>'
            } else if (path.PathType == 4) {
              var PaTy = '<span> 熄灯巡视</span>'
            } else if (path.PathType == 5) {
              var PaTy = '<span> 例行巡视</span>'
            } else if (path.PathType == 6) {
              var PaTy = '<span> 静默巡视</span>'
            } else {
              var PaTy = '<span> 出现错误 请检查</span>'
            }

            /* 要不要加else在无数据时显示（在思考 */
            if (path.DisableFlag == 0) {
              var stateFlag = '<span> 启用</span>'
            } else if (path.DisableFlag == 1) {
              var stateFlag = '<span> 停用</span>'
            } else {
              var stateFlag = '<span> 出现错误 请检查</span>'
            }

            if (path.ExecuteType == 0) {
              var ExTy = '<span> 全部任务</span>'
            } else if (path.ExecuteType == 1) {
              var ExTy = '<span> 典型任务</span>'
            } else if (path.ExecuteType == 2) {
              var ExTy = '<span> 临时任务</span>'
            } else {
              var ExTy = '<span> 出现错误 请检查</span>'
            }
            tbody.innerHTML +=
              '<tr>' +
              '<td>' +
              "<input name='Id' type='radio' value='" +
              path.Task_Path_Id +
              "' />" +
              '</td>' +
              '<td>' +
              path.SectionName +
              '</td>' +
              '<td>' +
              path.StationName +
              '</td>' +
              // '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
              '<td>' +
              "<div  class='tmp' title='" +
              path.Task_Path_Desc +
              "'><span>" +
              path.Task_Path_Desc +
              '</span></div> ' +
              '</td>' /* 任务名称 */ +
              '<td>' +
              PaTy +
              '</td>' /* 巡视类型 */ +
              '<td>' +
              ExTy +
              '</td>' /* 执行类型 */ +
              // '<td>' + path.TaskRuleGrid + '</td>' +  /* 执行方式 */
              '<td>' +
              "<a href='javascript:void(0)' onclick='NowRun(this);'>立即执行</a><a href='javascript:void(0)' onclick='RuleRun(this);' style='padding-left: 1.5rem;'>定期执行</a><a href='javascript:void(0)' onclick='CycleRun(this);' style='padding-left: 1.5rem;'>周期执行</a><a href='javascript:void(0)' onclick='StopRun(this);' style='padding-left: 1.5rem;'>取消执行</a>" +
              '</td>' +
              '<td>' +
              stateFlag +
              '</td>' /* 状态 */ +
              '<td>' +
              ' 未设置的时间 ' +
              '</td>' +
              '<td>' +
              "<a href='javascript:void(0)' onclick='LookAtTest(this);' >查看</a>" +
              '</td>' /* onclick='LookAtTest(this);' */ +
              '</tr>'
          }

          var a = document.getElementById('tbody').getElementsByTagName('tr')
          var zz = new Array(a.length)
          //alert(zz.length);
          for (var i = 0; i < a.length; i++) {
            zz[i] = a[i].innerHTML
          } //div的字符串数组付给zz
          var pageno = 1 //当前页
          var pagesize = 10 //每页多少条信息
          if (zz.length % pagesize == 0) {
            var pageall = zz.length / pagesize
          } else {
            var pageall = parseInt(zz.length / pagesize) + 1
          } //一共多少页
          $('#p').text(pageall) //将pageall的值存放到div中，便于下次使用
          change(1, pageall, zz)
          // console.log("配置页面的页码测试",pageall)
        }
      )
    }
  )
}

//清除表格（用于父查询后之前页面显示的表格清除）
function NullEmpty() {
  // console.log("父页面调用函数的标志")
  $('#DataTable tbody').empty()
}

/* 弹窗的取消功能 */
function hiddenparam() {
  // console.log('11111111111111111')

  window.parent.$_('paramwrap').style.display = 'none'
  //   $_('paramwrapGrid').style.display = 'none'

  window.parent.$_('Modifyparamwrap').style.display = 'none'

  document.getElementById('Modify_path_id').value = '0'
  //   window.parent.SelectHeader();//执行父页面函数  用于新增修改时的弹窗取消

  // console.log('清空222')
  window.parent.document.getElementById('cleanCheck').click() //清空树选择[树的遍历和清空使用函数无关]这样子清空的话不会折叠节点
  // console.log('结束清空222')
  //   GetTaskPath(pageno);
  //   location.reload();

  //  $("#Id").attr("checked",false)

  // $("[name='Id']").checked=true
  // $("[name='Id']").checked=true

  // for(var i=0; i<document.forms[0].Id.length; i++){
  //     document.forms[0].Id[i].checked = true;
  //     console.log("测试函数是否进入 用于单选状态")
  // }
}

/* 详情查看弹窗的退出 */
function Hidden() {
  window.parent.$_('viewset').style.display = 'none'
  window.parent.$_('LookAt').style.display = 'none'
  window.parent.$_('RuleRun').style.display = 'none'
  window.parent.$_('CycleRun').style.display = 'none'
}

/* 新增 */
function AddPath() {
  let TreeIdPoint = window.parent.document.getElementById('TreeIdPoint')
  // console.log("调用111111111111id数组",TreeIdPoint)
  var keyPoint = []
  $(TreeIdPoint)
    .find('li')
    .each(function () {
      keyPoint.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })
  var keyPoint = keyPoint.toString() //数组转为字符串（中间逗号隔开）
  // console.log("新建点位空格检测",keyPoint)

  if (keyPoint.length == 0) {
    alert('请选择点位')
  } else {
    window.parent.$_('paramwrap').style.display = DisBlock //新增任务的弹窗样式 【！！！111】
  }
}

/* 新增功能的确认按键 */
function AddPathAjax() {
  //【！！！222  函数不动，直接在父页面调用该函数，该函数的元素获取值路径改为父页面就行】
  let TreeIdPoint = window.parent.document.getElementById('TreeIdPoint')
  var keyPoint = []
  $(TreeIdPoint)
    .find('li')
    .each(function () {
      keyPoint.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })

  var keyPoint = keyPoint.toString() //数组转为字符串（中间逗号隔开）
  // console.log('新建点位空格检测', keyPoint)

  let TreeId = window.parent.document.getElementById('TreeId')
  // console.log("触发表格初始化 TreeId",TreeId)
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })

  var key = key.toString() //数组转为字符串（中间逗号隔开）
  // console.log('初始化的变电站获取 keyPoint', key)

  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }
  // console.log('12新建是的请求数据 变电站id', key)
  // console.log('1216 1216 $_(TaskName).value', window.parent.$_('TaskName').value)
  // console.log('1216 1216 InspectionType', window.parent.get_ele_value('InspectionType1'))
  // console.log('1216 1216 TaskSta', window.parent.get_ele_value('TaskSta'))

  $.post(
    '/api162/dalirobotcms/ajax/taskmanageGrid.php',
    {
      task: 'Add',
      StationIDNow: key,
      Task_Path_Name: window.parent.$_('TaskName').value,
      PathType: window.parent.get_ele_value('InspectionType1'),
      ExecuteType: window.parent.get_ele_value('TaskSta'),
      DevStr: keyPoint,
      DeviceLevel: '3',
      Priority: '4',
      userName: 'super',
    },
    function (res) {
      // console.log('taskpath add数据:', res) //OK   //普洱系统不在线   点位树未清空，可能和任务新建失败变电站id未获取有关
      // GetTaskPath(1)
      // location.reload();
      // console.log("1216新建功能运位置测试1:")

      if (res == 'OK') {
        //清空新建表单内容
        var TaskStaIns = window.parent.document.getElementsByName('TaskSta_r')
        for (var i = 0; i < TaskStaIns.length; i++) {
          if (TaskStaIns[i].checked) {
            TaskStaIns[i].checked = false
          }
        }
        window.parent.document.getElementById('InspectionType1_s').value = '0'
        window.parent.document.getElementById('TaskName').value = ''
        // window.parent.cleaninfo()
        window.parent.$_('paramwrap').style.display = 'none'
        // console.log("1216新建功能运位置测试2:")
        //清空树的点位选择
        document.getElementById('TreeIdchild').innerHTML = ''
        document.getElementById('Modify_path_id').value = 0
        window.parent.document.getElementById('cleanCheck').click() //清空树选择[树的遍历和清空使用函数无关]这样子清空的话不会折叠节点
        // window.parent.SelectHeader();//执行父页面函数
        document.getElementById('Modify_path_id').value = 1
      } else {
        alert('未新建成功')
      }
      GetTaskPath(pageno)
      GetTaskPath(PageT.currentPage)

      location.reload()
    }
  )
}

/* 删除功能 */
function deletePathAjax() {
  for (let i = 0; i < checkArray.length; i++) {
    if (checkArray[i].checked) {
      if (confirm('确定删除吗?')) {
        var Task_Path_Id = get_radio_value('Id')
        $.post(
          '/api162/dalirobotcms/ajax/taskmanageGrid.php',
          {
            task: 'del',
            Task_Path_Id: Task_Path_Id,
          },
          function (res) {
            if (res == 'OK') {
              alert('删除成功！')
            } else {
              alert('删除失败！')
            }
            GetTaskPath(pageno)
            GetTaskPath(PageT.currentPage)

            location.reload()
          }
        )
      }
      i--
      flag = 1
      break
    } else {
      flag = 0
    }
  }
  if (flag == 0) {
    alert('请先进行删除选择')
  }
}

var flag = 0
var checkArray = document.getElementsByName('Id')
/* 修改 */
function Modify() {
  document.getElementById('Modify_path_id').value = '1'
  for (let i = 0; i < checkArray.length; i++) {
    //判断是否被选中
    if (checkArray[i].checked) {
      i--
      flag = 1
      break
    } else {
      flag = 0
    }
  }
  if (flag == 1) {
    window.parent.$_('Modifyparamwrap').style.display = DisBlock
    window.parent.SelectHeader() //执行父页面函数

    // 原内容获取不到，现在将数据和新建一样清空
    var TaskStaIns = window.parent.document.getElementsByName('TaskSta1_r')
    for (var i = 0; i < TaskStaIns.length; i++) {
      if (TaskStaIns[i].checked) {
        TaskStaIns[i].checked = false
      }
    }
    window.parent.document.getElementById('InspectionType_s').value = '0'
    window.parent.document.getElementById('TaskName').value = ''
  } else {
    alert('请先进行修改选择')
  }
}

function ModifySubVal() {
  var Task_Path_Id = get_radio_value('Id')
  // $("#Id").attr("checked","checked")
  document.getElementById('TreeIdchild').value = Task_Path_Id
  // console.log("ModifySubVal修改指定行的Task_Path_Id获取",Task_Path_Id)
  // 修改行的点位获取
  $.ajax({
    type: 'POST',
    url: '/api162/dalirobotcms/ajax/querytaskpathdev.php',
    async: false,
    data: {
      task: 'getDeviceTree',
      Task_Path_Id: Task_Path_Id,
    },
    success: function (res) {
      var reg = /[\r\n\s]/g
      res = res.replace(reg, '')
      var res = JSON.parse(res)
      // console.log("ModifySubVal ajax的获取 ",res)
      var str = ''
      for (var i = 0; i < res[0].length; i++) {
        //存放任务修改前的点位id
        str += '<li name="childLi">' + res[0][i] + '</li>'
      }
      document.getElementById('TreeIdchild').innerHTML = str
    },
  })

  let TreeId = window.parent.document.getElementById('TreeId')
  //    console.log("触发表格初始化 TreeId",TreeId)
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })
  var key = key.toString() //数组转为字符串（中间逗号隔开）
  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }
  //    console.log("1216修改行的的变电站获取 keyPoint",key)
  //    修改行的变电站获取
  $.ajax({
    type: 'POST',
    url: '/api162/dalirobotcms/ajax/querytaskpath.php',
    // dataType: "json",
    async: false,
    data: {
      stationID: key,
      page: pageno,
      num_every_page: '10',
      PathType: '0,1,2,3,4,5,6',
      TaskName: '',
      ExecuteType: '0',
    },
    success: function (res) {
      res = JSON.parse(res)
      // console.log("Modify通过ajax获取的数据 ",res)
      for (let path of res) {
        if (path.Task_Path_Id == Task_Path_Id) {
          // console.log('选中行的变电站id', path.Station_ID)
          $('#ModStation').val(path.Station_ID)
        }
      }
    },
  })

  // console.log("传过去的变电站id",$('#ModStation').val())
}
/* 修改功能的确定按键 */
/* 问题：在于点击修改后，修改的弹窗内容并没有根据radio选择显示，目前是修改的弹窗内容为假数据 */
function ModifyPathAjax() {
  let TreeIdPoint = window.parent.document.getElementById('TreeIdPoint') //获取的是手动选择后树上所有被选中的节点id，若未进行选择，则原有点位未获取
  // console.log("调用111111111111id数组",TreeIdPoint)
  var keyPoint = []
  $(TreeIdPoint)
    .find('li')
    .each(function () {
      keyPoint.push($(this).text())
    })
  // console.log('keyPoint数组1', keyPoint)
  if (keyPoint.length == 0) {
    ModifySubVal() //执行子页面函数
    var liarr = []
    var lival = document.getElementsByName('childLi')
    for (var i = 0; i < lival.length; i++) {
      liarr.push(lival[i].innerHTML)
    }
    // console.log("数组2",liarr)
    keyPoint = liarr
    var keyPoint = keyPoint.toString()
  } else if (keyPoint.length != 0) {
    var keyPoint = keyPoint.toString()
  }

  // console.log('最终keyPoint', keyPoint)

  //注释内容为：为判断数组情况直接取数组再合并的情况，实现效果一样，但是不简易
  /* 

    // GetTaskPath(1)
    let TreeIdPoint = window.parent.document.getElementById('TreeIdPoint');  //获取的是手动选择后树上所有被选中的节点id，若未进行选择，则原有点位未获取
    // console.log("调用111111111111id数组",TreeIdPoint)  
    var keyPoint=[]
    $(TreeIdPoint).find('li').each(function() {
        keyPoint.push($(this).text()); 
    });
    console.log("keyPoint数组1",keyPoint)


ModifySubVal();   //执行子页面函数
var liarr=[]
var lival=document.getElementsByName("childLi")
for(var i=0;i<lival.length;i++){
    liarr.push(lival[i].innerHTML)
}
console.log("数组2",liarr)



function MergeArray(keyPoint,liarr){
    var _arr = new Array();
    for(var i=0;i<keyPoint.length;i++){
       _arr.push(keyPoint[i]);
    }
    for(var i=0;i<liarr.length;i++){
        var flag = true;
        for(var j=0;j<keyPoint.length;j++){
            if(liarr[i]==keyPoint[j]){
                flag=false;
                break;
            }
        }
        if(flag){
            _arr.push(liarr[i]);
        }
    }
    return _arr;
}

console.log("数组合并去重",);


var PoKEy=[]

PoKEy=MergeArray(keyPoint,liarr)
    var PoKEy = PoKEy.toString();
    console.log("PoKEy",PoKEy) */
  var Task_Path_Id = document.getElementById('TreeIdchild').value
  $.post(
    '/api162/dalirobotcms/ajax/taskmanageGrid.php',
    {
      task: 'Modify',
      Task_Path_Name: window.parent.$_('TaskNamee').value,
      PathType: window.parent.get_ele_value('TaskMod'),
      ExecuteType: window.parent.get_ele_value('TaskSta1'),
      DevStr: keyPoint,
      Task_Path_Id: Task_Path_Id,
    },
    function (res) {
      // console.log('taskpath 修改状态:', res) //OK
      if (res == 'OK') {
        // console.log('OK状态执行') //OK

        //清空树的点位选择
        document.getElementById('Modify_path_id').value = '0'
        window.parent.SelectHeader() //执行父页面函数
        // window.parent.cleaninfo();//执行父页面函数

        alert('修改成功！') // GetTaskPath(pageno)
        window.parent.$_('Modifyparamwrap').style.display = 'none'
      } else {
        alert('修改失败！')
      }
      GetTaskPath(pageno)
      GetTaskPath(PageT.currentPage)

      location.reload()
      // window.parent.cleaninfo();//执行父页面函数
    }
  )
}

/* 判断输入框是否为空 */
function isNull() {
  var str = document.getElementById('TaskName1').value
  if (str == '') {
    alert('空')
    return false
  }
}

/* 查看详情 */
function LookAtTest(obj) {
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  // console.log('0000000Task_Path_Id', Task_Path_Id)
  $.post(
    '/api162/dalirobotcms/ajax/querytaskpathdev.php',
    {
      task: 'getDeviceInfo',
      Task_Path_Id: Task_Path_Id,
    },

    function (res) {
      res = JSON.parse(res)
      // console.log('-----点位配置详情数据获取', res)
      window.parent.$('#TabPoint tbody').empty()
      let temp = ''
      var count = 0
      for (let point of res) {
        count++
        temp +=
          '<tr>' +
          '<td>' +
          count +
          '</td>' +
          '<td id="tdd">' +
          "<div title='" +
          point.Device_Desc +
          "'><span>" +
          point.Device_Desc +
          '</span></div> ' +
          '</td>' +
          '</tr>'
      }
      window.parent.$('#TabPoint tbody').append(temp)
    }
  )
  window.parent.$_('LookAt').style.display = DisBlock
}

/*   显示设置的弹窗 */
function ViewSet() {
  window.parent.$_('viewset').style.display = DisBlock //新增任务的弹窗样式【点击显示弹窗】
}

/* 显示设置功能【每列功能】 */
function cowselect(id) {
  let column = window.parent.document.getElementById(id) //获取 radio元素
  let checkVal = column.checked //获取 radio checked值【】
  let table = document.getElementById('DataTable')
  let trs = table.getElementsByTagName('tr') //获取所有 tr
  let ths = trs[0].getElementsByTagName('th') // 获取 th
  let xb = 0

  for (var i = 0; i < ths.length; i++) {
    if (ths[i].getAttribute('name') == id) {
      xb = i
      if (checkVal) {
        ths[i].style.display = ''
      } else {
        ths[i].style.display = 'none'
      }
    }
  }
  for (var i = 1; i < trs.length; i++) {
    let tds = trs[i].getElementsByTagName('td')
    if (checkVal) {
      tds[xb].style.display = ''
    } else {
      tds[xb].style.display = 'none'
    }
  }
}
/* 显示设置功能【全选中的选项】 */
function setAll() {
  var ch = window.parent.document.getElementsByName('lover[]')
  var all = window.parent.document.getElementById('all')

  var j = 0
  for (i = 0; i < ch.length; i++) {
    if (ch[i].checked) {
      j = j + 1
      if (j == 9) {
        all.checked = true
      } else {
        all.checked = false
      }
    }
  }
}
/* 显示设置功能【全选】 */
function aall() {
  var all = window.parent.document.getElementById('all')
  var ch = window.parent.document.getElementsByName('lover[]') //获取四个子选项的名称，建立数组
  if (all.checked == true) {
    for (i = 0; i < ch.length; i++) {
      ch[i].checked = true
    }
  } else {
    for (i = 0; i < ch.length; i++) {
      ch[i].checked = false
    }
  }
}

/* 显示设置功能*/
function verify() {
  var checkbox = window.parent.document.getElementsByName('lover[]')
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      // console.log('显示设置移动至父页面的执行情况')
      cowselect('cow1')
      cowselect('cow2')
      cowselect('cow3')
      cowselect('cow4')
      cowselect('cow5')
      cowselect('cow6')
      cowselect('cow7')
      cowselect('cow8')
      cowselect('cow9')
    } else {
      // console.log('显示设置移动至父页面的执行情况11')

      cowselect('cow1')
      cowselect('cow2')
      cowselect('cow3')
      cowselect('cow4')
      cowselect('cow5')
      cowselect('cow6')
      cowselect('cow7')
      cowselect('cow8')
      cowselect('cow9')
    }
  }
  window.parent.$_('viewset').style.display = 'none' //执行后弹窗去掉
}

// 立即执行
function NowRun(obj) {
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  // console.log('立即执行', Task_Path_Id),
  $.post(
    '/api162/dalirobotcms/ajax/robotruntask.php',
    {
      Task_Path_Id: Task_Path_Id,
      CommunicateProtocol: '0',
    },
    function (res) {
      // console.log("立即执行 res",res)
      if (res == 'OK') {
        //42进不去函数res中，但是162暂时用不了   出现问题！！！
        alert('立即执行完成')
      }
    }
  )
}

// 取消执行
function StopRun(obj) {
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  $.post(
    '/api162/dalirobotcms/ajax/updatetaskpathinfo.php',
    {
      task: 'delTaskRule',
      Task_Path_Id: Task_Path_Id,
    },
    function (res) {
      res = JSON.parse(res)
      if (res.code == 200) {
        alert('取消执行完成')
      }
    }
  )
}

/* 定期执行 */
function RuleRun(obj) {
  window.parent.$_('RuleRun').style.display = DisBlock //新增任务的弹窗样式
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  return Task_Path_Id
}

/* 定期执行 */
function RuleRunAjax() {
  var RepeatNum = window.parent.document.getElementById('Time').value
  var TaskRuleGrid = window.parent.$('#hourRule option:selected').val()
  // console.log("定期执行 父组件值的获取00")   //【父页面的elementui组件值获取】
  // console.log("定期执行 父组件值的获取",window.parent.RunT.form.value)   //【父页面的elementui组件值获取】

  var Start_Time = window.parent.RunT.form.value //【父页面的elementui组件值获取】
  var BeginTime = window.parent.RunT.value1
  var EndTime = window.parent.RunT.value2
  var UnBeginTime = window.parent.RunT.value3
  var UnEndTime = window.parent.RunT.value4
  if (
    Start_Time == '' ||
    BeginTime == '' ||
    EndTime == '' ||
    UnBeginTime == '' ||
    UnEndTime == ''
  ) {
    alert('有时间未进行选择')
    return
  } else {
    $.post(
      '/api162/dalirobotcms/ajax/updatetaskpathinfo.php',
      {
        task: 'AddTaskRule',
        TaskRuleGrid: TaskRuleGrid,
        RepeatNum: RepeatNum,
        Start_Time: Start_Time,
        BeginTime: BeginTime,
        EndTime: EndTime,
        UnBeginTime: UnBeginTime,
        UnEndTime: UnEndTime,
      },
      function (res) {
        res = JSON.parse(res)
        if (res.code == 200) {
          alert('定期执行完成')
        }
      }
    )
  }

  window.parent.$_('RuleRun').style.display = 'none'
}

/* 周期执行 */
function CycleRun(obj) {
  window.parent.$_('CycleRun').style.display = DisBlock

  var ch = window.parent.document.getElementsByName('moth[]')
  for (var i = 0; i < ch.length; i++) {
    ch[i].checked = false
  }
  document.getElementById('MandWDiv').innerHTML = '请选择月份'

  var chweek = window.parent.document.getElementsByName('week[]')
  for (var i = 0; i < chweek.length; i++) {
    chweek[i].checked = false
  }
  document.getElementById('MandW_Div').innerHTML = '请选择周'

  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
}
/* 周期执行的确认按键 */
function CycleRunAjax() {
  var arrmoth = []
  var optionsMoth = window.parent.document.getElementsByName('moth[]')
  for (var i = 0; i < optionsMoth.length; i++) {
    if (optionsMoth[i].checked == true) {
      arrmoth.push(window.parent.document.getElementById('moth' + (i + 1) + '').value)
    }
  }
  // console.log('selectedd多选内容：', arrmoth)

  var arrweek = []
  var optionsWeek = window.parent.document.getElementsByName('week[]')
  for (var i = 0; i < optionsWeek.length; i++) {
    if (optionsWeek[i].checked == true) {
      arrweek.push(window.parent.document.getElementById('week' + (i + 1) + '').value)
    }
  }
  // console.log('selectedd多week选内容：', arrweek)

  var RuleMonth = arrmoth.toString()
  var RuleWeek = arrweek.toString()
  console.log('select多选内容：moth', RuleMonth, 'week', RuleWeek)

  var Start_Time = window.parent.RunT.form.value
  var BeginTime = window.parent.RunT.value1
  var EndTime = window.parent.RunT.value2
  var UnBeginTime = window.parent.RunT.value3
  var UnEndTime = window.parent.RunT.value4
  if (
    Start_Time == '' ||
    BeginTime == '' ||
    EndTime == '' ||
    UnBeginTime == '' ||
    UnEndTime == ''
  ) {
    alert('有时间未进行选择')
    return
  } else {
    $.post(
      '/api162/dalirobotcms/ajax/updatetaskpathinfo.php',
      {
        task: 'AddTaskRule',
        TaskRuleGrid: '2',
        RuleMonth: RuleMonth,
        RuleWeek: RuleWeek,
        Start_Time: Start_Time,
        BeginTime: BeginTime,
        EndTime: EndTime,
        UnBeginTime: UnBeginTime,
        UnEndTime: UnEndTime,
      },
      function (res) {
        res = JSON.parse(res)
        if (res.code == 200) {
          alert('周期执行完成')
        }
      }
    )
  }
  window.parent.$_('CycleRun').style.display = 'none'
}

/* 查询功能 */
function selectFunction() {
  var cou = 0
  var arr = [0, 1, 2, 3, 4, 5, 6]
  var pointIframeIns = window.parent.document.getElementsByName('InspectionType_r')
  for (var i = 0; i < pointIframeIns.length; i++) {
    if (pointIframeIns[i].checked) {
      var PathType = pointIframeIns[i].value
    } else {
      cou++
      if (cou == pointIframeIns.length) {
        var PathType = arr.toString()
      }
    }
  }
  var input = document.getElementById('TaskName1').value
  var taType = $('#patrolSta option:selected').val()
  let TreeId = window.parent.document.getElementById('TreeId')
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text())
    })
  var key = key.toString()
  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }

  // console.log('查询表格筛选：stationID', key)
  // // console.log("查询表格筛选：pageno",pageno)
  // console.log('查询表格筛选：PathType', PathType)
  // console.log('查询表格筛选：input', input)
  // console.log('查询表格筛选：taType', taType)

  // $.post(
  //             '/api162/dalirobotcms/ajax/querytaskpath.php',
  //             {
  //                 stationID: key,
  //                 page:'',
  //                 num_every_page:'10',
  //                 PathType:PathType,
  //                 TaskName:input,
  //                 ExecuteType:taType
  //             },
  //             function (res) {
  //                 res = JSON.parse(res)
  //                 console.log("查询表格筛选后的内容：",res)
  //                 console.log("查询表格筛选后的内容条数：",res.length)

  //                 PageT.totalnum=res.length

  //                 $('#DataTable tbody').empty();
  //                 let temp = '';
  //                 for (let path of res) {
  //                     if(path.PathType==0){
  //                         var PaTy = "<span> 全面巡检</span>"
  //                     }
  //                     else if(path.PathType==1){
  //                         var PaTy = "<span> 特殊巡检</span>"
  //                     }
  //                     else if(path.PathType==2){
  //                         var PaTy = "<span> 专项巡视</span>"
  //                     }
  //                     else if(path.PathType==3){
  //                         var PaTy = "<span> 自定义巡视</span>"
  //                     }
  //                     else if(path.PathType==4){
  //                         var PaTy = "<span> 熄灯巡视</span>"
  //                     }
  //                     else if(path.PathType==5){
  //                         var PaTy = "<span> 例行巡视</span>"
  //                     }
  //                     else{
  //                         var PaTy = "<span> 出现错误 请检查</span>"
  //                     }

  //      /* 要不要加else在无数据时显示 */
  //                     if(path.DisableFlag==0){
  //                         var stateFlag = "<span> 启用</span>"
  //                     }
  //                     else if(path.DisableFlag==1){
  //                         var stateFlag = "<span> 停用</span>"
  //                     }
  //                     else{
  //                         var stateFlag = "<span> 出现错误 请检查</span>"
  //                     }

  //                     if(path.ExecuteType==0){
  //                         var ExTy = "<span> 全部任务</span>"
  //                     }
  //                     else if(path.ExecuteType==1){
  //                         var ExTy = "<span> 典型任务</span>"
  //                     }
  //                     else if(path.ExecuteType==2){
  //                         var ExTy = "<span> 临时任务</span>"
  //                     }
  //                     else{
  //                         var ExTy = "<span> 出现错误 请检查</span>"
  //                     }
  //                     temp +=
  //                         '<tr>' +
  //                         '<td>' +  "<input name='Id' type='radio' value='"+path.Task_Path_Id+"' />"+ '</td>' +
  //                         '<td>' + path.SectionName + '</td>' +
  //                         '<td>' + path.StationName + '</td>' +
  //                 // '<td>' + path.StationName +"<input name='stationID' type='hidden' value='"+path.stationID+"' style='display:none'/>" + '</td>' +

  //                         '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
  //                         '<td>' + PaTy + '</td>' +  /* 巡视类型 */
  //                         '<td>' + ExTy + '</td>' +  /* 执行类型 */
  //                         // '<td>' + path.TaskRuleGrid + '</td>' +  /* 执行方式 */
  //                         '<td>' + "<a href='javascript:void(0)' onclick='NowRun(this);'>立即执行</a><a href='javascript:void(0)' onclick='RuleRun(this);' style='padding-left: 1.5rem;'>定期执行</a><a href='javascript:void(0)' onclick='CycleRun(this);' style='padding-left: 1.5rem;'>周期执行</a><a href='javascript:void(0)' onclick='StopRun(this);' style='padding-left: 1.5rem;'>取消执行</a>" + '</td>' +
  //                         '<td>' + stateFlag + '</td>' +  /* 状态 */
  //                         '<td>' + " 未设置的时间 " + '</td>' +
  //                         '<td>' + "<a href='javascript:void(0)' onclick='LookAtTest(this);' >查看</a>" + '</td>' +/* onclick='LookAtTest(this);' */
  //                         '</tr>';
  //                 }
  // // console.log("测试子查询问题")

  //                 $('#DataTable tbody').append(temp);

  //               }
  //     )

  $.post(
    '/api162/dalirobotcms/ajax/querytaskpath.php',
    {
      stationID: key,
      page: '',
      num_every_page: '', //这里原是显示每页条数，现在是显示总共页面条数（变电站和运维班显示的条数。其他数据能显示，但是变电站和运维班数据不显示），在总页面的基础上通过分页每页显示10条数据
      PathType: '0,1,2,3,4,5,6',
      TaskName: '',
      ExecuteType: '0',
    },
    function (res) {
      res = JSON.parse(res)
      // console.log('1216 taskpath数据1216查询：', res)
      //因为num_every_page现在代替完整显示条数，所以这里获取任务条数赋值给num_every_page获得初始化表格
      len = res.length
      // 初始化表格
      // console.log('1216 taskpath数据1216条数：', len)

      // 第一次请求是数据名称不全是的所有任务，第二次请求是含有任务名称数据是所有任务，是在第一次请求的基础上获取所有数据（全的数据

      //【报错的数据清除了，自动清除的？】
      console.log('taType', taType)

      $.post(
        '/api162/dalirobotcms/ajax/querytaskpath.php',
        {
          stationID: key,
          page: '1',
          num_every_page: len, //这里原是显示每页条数，现在是显示总共页面条数（变电站和运维班显示的条数。其他数据能显示，但是变电站和运维班数据不显示），在总页面的基础上通过分页每页显示10条数据
          PathType: PathType,
          TaskName: input,
          ExecuteType: taType,
        },
        function (res) {
          // debugger
          res = JSON.parse(res)
          console.log('taskpath数据查询：', res)
          // console.log('taskpath数据条数查询：', res.length)
          if (res.length == 0) {
            $('#DataTable tbody').empty()

            PageT.totalnum = 0

            PageT.currentPage = 1
            return
          } else {
            PageT.totalnum = res.length
            $('#DataTable tbody').empty()
            let temp = ''
            for (let path of res) {
              if (path.PathType == 0) {
                var PaTy = '<span> 全面巡检</span>'
              } else if (path.PathType == 1) {
                var PaTy = '<span> 特殊巡检</span>'
              } else if (path.PathType == 2) {
                var PaTy = '<span> 专项巡视</span>'
              } else if (path.PathType == 3) {
                var PaTy = '<span> 自定义巡视</span>'
              } else if (path.PathType == 4) {
                var PaTy = '<span> 熄灯巡视</span>'
              } else if (path.PathType == 5) {
                var PaTy = '<span> 例行巡视</span>'
              } else if (path.PathType == 6) {
                var PaTy = '<span> 静默巡视</span>'
              } else {
                var PaTy = '<span> 出现错误 请检查</span>'
              }

              /* 要不要加else在无数据时显示（在思考 */
              if (path.DisableFlag == 0) {
                var stateFlag = '<span> 启用</span>'
              } else if (path.DisableFlag == 1) {
                var stateFlag = '<span> 停用</span>'
              } else {
                var stateFlag = '<span> 出现错误 请检查</span>'
              }
              console.log('ExecuteType:', path.ExecuteType)
              if (path.ExecuteType == 0) {
                var ExTy = '<span> 全部任务</span>'
              } else if (path.ExecuteType == 1) {
                var ExTy = '<span> 典型任务</span>'
              } else if (path.ExecuteType == 2) {
                var ExTy = '<span> 临时任务</span>'
              } else {
                var ExTy = '<span> 出现错误 请检查</span>'
              }
              temp +=
                '<tr>' +
                '<td>' +
                "<input name='Id' type='radio' value='" +
                path.Task_Path_Id +
                "' />" +
                '</td>' +
                '<td>' +
                path.SectionName +
                '</td>' +
                '<td>' +
                path.StationName +
                '</td>' +
                // '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
                '<td>' +
                "<div class='tmp' title='" +
                path.Task_Path_Desc +
                "'><span>" +
                path.Task_Path_Desc +
                '</span></div> ' +
                '</td>' /* 任务名称 */ +
                '<td>' +
                PaTy +
                '</td>' /* 巡视类型 */ +
                '<td>' +
                ExTy +
                '</td>' /* 执行类型 */ +
                // '<td>' + path.TaskRuleGrid + '</td>' +  /* 执行方式 */
                '<td>' +
                "<a href='javascript:void(0)' onclick='NowRun(this);'>立即执行</a><a href='javascript:void(0)' onclick='RuleRun(this);' style='padding-left: 1.5rem;'>定期执行</a><a href='javascript:void(0)' onclick='CycleRun(this);' style='padding-left: 1.5rem;'>周期执行</a><a href='javascript:void(0)' onclick='StopRun(this);' style='padding-left: 1.5rem;'>取消执行</a>" +
                '</td>' +
                '<td>' +
                stateFlag +
                '</td>' /* 状态 */ +
                '<td>' +
                ' 未设置的时间 ' +
                '</td>' +
                '<td>' +
                "<a href='javascript:void(0)' onclick='LookAtTest(this);' >查看</a>" +
                '</td>' /* onclick='LookAtTest(this);' */ +
                '</tr>'
            }

            $('#DataTable tbody').append(temp)
          }
          var a = document.getElementById('tbody').getElementsByTagName('tr')
          var zz = new Array(a.length)
          //alert(zz.length);
          for (var i = 0; i < a.length; i++) {
            zz[i] = a[i].innerHTML
          } //div的字符串数组付给zz
          var pageno = 1 //当前页
          var pagesize = 10 //每页多少条信息
          if (zz.length % pagesize == 0) {
            var pageall = zz.length / pagesize
          } else {
            var pageall = parseInt(zz.length / pagesize) + 1
          } //一共多少页
          $('#p').text(pageall) //将pageall的值存放到div中，便于下次使用
          change(1, pageall, zz)
          // console.log("配置页面的页码测试",pageall)
        }
      )
    }
  )
}

/* 重置功能 */
function clearFunction() {
  // var CurPage=parseInt($_("CurPage").value);
  // GetTaskPath(CurPage);
  var pointIframeIns = window.parent.document.getElementsByName('InspectionType_r')
  for (var i = 0; i < pointIframeIns.length; i++) {
    if (pointIframeIns[i].checked) {
      pointIframeIns[i].checked = false
    }
  }
  document.getElementById('patrolSta_s').value = '0'
  document.getElementById('TaskName1').value = ''

  selectFunction()
}

/*      var xmlHttpGetTaskGrid
     function toExcel() {
        var cou=0
            var arr=[0,1,2,3,4,5,6]
            var pointIframeIns = window.parent.document.getElementsByName("InspectionType_r");
            for( var i = 0 ; i < pointIframeIns.length ; i++){
               if (pointIframeIns[i].checked) {
                    var PathType=pointIframeIns[i].value
                }
                else{
                    cou++
                 if(cou==pointIframeIns.length){
                    var PathType=arr.toString()}
                } 
            }  
            var input = document.getElementById("TaskName1").value;
            var taType = $("#patrolSta option:selected").val();
            // let TreeId = window.parent.document.getElementById('TreeId');   //树在有选择的情况下会有值，但是初始默认选中项值获取不到
            // var key=[]
            // $(TreeId).find('li').each(function() {
            //   key.push($(this).text()); 
            // });
            // var key = key.toString();
        
            let TreeId = window.parent.document.getElementById('TreeId');    //除了手动选中项是值，还能够获取初始默认选中项的变电站id值
            var key=[]
            $(TreeId).find('li').each(function() {
              key.push($(this).text()); 
            });
            var key = key.toString();
            if(key==''){
                key=window.parent.$('#taGetTPath1').val()
            }
            console.log("导出：stationID",key)
            console.log("导出：PathType",PathType)
            console.log("导出：input",input)
            console.log("导出：taType",taType)
      
   
     
     
       xmlHttpGetTaskGrid = createXMLHttpRequest();
       try {
         var sendText = 'stationID=' +key + '&TaskName=' + input + '&PathType=' +PathType+ '&ExecuteType=' +taType+ '&exportflag=' +1
         var url = '/api162/dalirobotcms/ajax/querytaskpath.php?' + sendText
         console.log("请求数据：url",url)
         xmlHttpGetTaskGrid.onreadystatechange = toExcelRes
         xmlHttpGetTaskGrid.responseType="blob"
         xmlHttpGetTaskGrid.open('POST', url, true)
         xmlHttpGetTaskGrid.send(sendText)
       } catch (e) {
         alert(e)
       }
     }
     
     function toExcelRes() {
        console.log("xmlHttpGetTaskGrid",xmlHttpGetTaskGrid)

       if (xmlHttpGetTaskGrid.readyState == 4) {
         if (xmlHttpGetTaskGrid.status == 200) {
           var s = xmlHttpGetTaskGrid.responseText  //同样responseText异常问题不显示
           if (s == '') {
             return
           }
           var reg = /[\r\n]/g
           s = s.replace(reg, '')
           console.log("s",s)

           var arr = JSON.parse(s)
           console.log("返回的数据：arr",arr)
           



            //     const xlsx="/temp/TaskInfo.xls";
//             //     const blob=new Blob([res.data],{type:xlsx});
//             //     const a =document.createElement("a");
//             //     let fileName="12.xlsx"
//             //     a.download=fileName;
//             //     a.href=window.URL.createObjectURL(blob)
//             //     a.click();
//             //     a.remove();



           
         }
       }
     } */

// 同使用
var xhr = new XMLHttpRequest()
var formData = new FormData()
function toExcel() {
  var cou = 0
  var arr = [0, 1, 2, 3, 4, 5, 6]
  var pointIframeIns = window.parent.document.getElementsByName('InspectionType_r')
  for (var i = 0; i < pointIframeIns.length; i++) {
    if (pointIframeIns[i].checked) {
      var PathType = pointIframeIns[i].value
    } else {
      cou++
      if (cou == pointIframeIns.length) {
        var PathType = arr.toString()
      }
    }
  }
  var input = document.getElementById('TaskName1').value
  var taType = $('#patrolSta option:selected').val()
  // let TreeId = window.parent.document.getElementById('TreeId');   //树在有选择的情况下会有值，但是初始默认选中项值获取不到
  // var key=[]
  // $(TreeId).find('li').each(function() {
  //   key.push($(this).text());
  // });
  // var key = key.toString();

  let TreeId = window.parent.document.getElementById('TreeId') //除了手动选中项是值，还能够获取初始默认选中项的变电站id值
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text())
    })
  var key = key.toString()
  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }
  // console.log('导出：stationID', key)
  // console.log('导出：PathType', PathType)
  // console.log('导出：input', input)
  // console.log('导出：taType', taType)

  // 添加请求的参数
  formData.append('stationID', key)
  formData.append('TaskName', input)
  formData.append('PathType', PathType)

  formData.append('ExecuteType', taType)
  formData.append('exportflag', 1)
  // console.log('0001---')

  // var sendText = 'stationID=' +key + '&TaskName=' + input + '&PathType=' +PathType+ '&ExecuteType=' +taType+ '&exportflag=' +1
  //
  // 添加请求的方式，地址
  /* var url = '/api162/dalirobotcms/ajax/querytaskpath.php'
       
xhr.open('POST', url, true)
// 设置responseType
// xhr.setRequestHeader("Content-type", "application/json");
// xhr.setRequestHeader("Authorization", "Bearer 6cda86e3-ba1c-4737-972c-f815304932ee");

xhr.responseType = "blob";

xhr.onload = function(e) {
  var content = xhr.response;
  console.log("0001---",content) ///responseText异常问题不显示

  if (content.type === 'text/html') {
    let reader = new FileReader()    
    reader.readAsText(content, 'utf-8')
    reader.addEventListener("loadend", () => {
//   console.log("0001-0--p--",JSON.parse(reader.result))
//   console.log("0001-0000--",JSON.parse(reader.result).data)
//   console.log("0001-0i0o00--",JSON.stringify(reader.result).data)
  
  const xlsx="/temp/TaskInfo.xls";
  var elink = document.createElement("a");
  // 设置下载文件名
  elink.download = "下载.xlsx";
  elink.style.display = "none";
  let blob = new Blob([content],{type:xlsx});
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  // 模拟点击事件
  elink.click();
  document.body.removeChild(elink);
    })
}


 */

  // if (content.type === 'text/html') {
  //     let reader = new FileReader()
  //     reader.readAsText(content, 'utf-8')
  //     // reader.onload = () => {

  // reader.addEventListener("loadend", () => {
  //     //   const { msg } =
  //   console.log("0001-0--p--",JSON.parse(reader.result))
  //       const { msg } = JSON.parse(reader.result)
  //   console.log("0001-0--p--",msg)
  //   console.log("0001-0--p--",{ msg })//OK

  //       Message({

  //         message: msg,
  //         type: 'error',
  //         duration: 5 * 1000

  //       })
  // console.log("0001--9-")

  // console.log("0001--7-",Message)

  //       console.log("0001-6--",content)

  //   // 组装a标签
  // //   let timestamp = frs.getLocalTime(new Date());

  //     }
  //   } else {
  //     return
  //   }

  // 保存可用

  var url = '/api162/dalirobotcms/ajax/querytaskpath.php'
  xhr.open('POST', url, true)
  // xhr.responseType = "blob";
  xhr.onload = function (e) {
    var content = xhr.response
    // console.log('0001--JSON.parse(content).data.filename---', JSON.parse(content).data.filename)
    const xlsx = '/api162' + JSON.parse(content).data.filename + ''
    var elink = document.createElement('a')
    // 设置下载文件名
    //   elink.download = "TaskInfo.xlsx";
    //   elink.style.display = "none";
    //   let blob = new Blob([content],{type:xlsx});
    elink.href = xlsx
    document.body.appendChild(elink)
    // 模拟点击事件
    elink.click()
    document.body.removeChild(elink)
  }
  xhr.send(formData)
}

// /* 导出功能 */
// function toExcel(){  //不一定完善，确定一下：导出什么，选中条还是当前页面，需要传输条件数据吗
//     var cou=0
//     var arr=[0,1,2,3,4,5,6]
//     var pointIframeIns = window.parent.document.getElementsByName("InspectionType_r");
//     for( var i = 0 ; i < pointIframeIns.length ; i++){
//        if (pointIframeIns[i].checked) {
//             var PathType=pointIframeIns[i].value
//         }
//         else{
//             cou++
//          if(cou==pointIframeIns.length){
//             var PathType=arr.toString()}
//         }
//     }
//     var input = document.getElementById("TaskName1").value;
//     var taType = $("#patrolSta option:selected").val();
//     // let TreeId = window.parent.document.getElementById('TreeId');   //树在有选择的情况下会有值，但是初始默认选中项值获取不到
//     // var key=[]
//     // $(TreeId).find('li').each(function() {
//     //   key.push($(this).text());
//     // });
//     // var key = key.toString();

//     let TreeId = window.parent.document.getElementById('TreeId');    //除了手动选中项是值，还能够获取初始默认选中项的变电站id值
//     var key=[]
//     $(TreeId).find('li').each(function() {
//       key.push($(this).text());
//     });
//     var key = key.toString();
//     if(key==''){
//         key=window.parent.$('#taGetTPath1').val()
//     }
//     console.log("导出：stationID",key)
//     console.log("导出：PathType",PathType)
//     console.log("导出：input",input)
//     console.log("导出：taType",taType)
//     // $.post(
//     //     '/api162/dalirobotcms/ajax/querytaskpath.php',
//     //     {
//     //         stationID:key,
//     //         TaskName:input,
//     //         PathType:PathType,
//     //         ExecuteType:taType,
//     //         exportflag:'1'
//     //     },
//     //     function (res) {

//             // $.ajax({
//             //     type: "POST",
//             //     url:"/api162/dalirobotcms/ajax/querytaskpath.php",
//             //     // async:false,
//             //     // dataType: "blob",
//             //     data:{
//             //         stationID:key,
//             //         TaskName:input,
//             //         PathType:PathType,
//             //         ExecuteType:taType,
//             //         exportflag:'1'
//             //     },
//             //     xhrFields: { responseType: "blob" },
//             //     success:function(res){
//             //                 console.log("111")

//             //                 console.log("导出的res",res)
//             //         res = JSON.parse(res)
//             //         console.log("导出的res",res)
//             //     }

//             // }).done((res) => {
//             //     //	result 为arrayBuffer类型
//             //     res = JSON.parse(res.data)
//             //     console.log("导出的res",res.data)
//             // })
//             //     success:function(res){
//             //         console.log("111")

//             //         console.log("导出的res",res)
//             // res = JSON.parse(res)

//             // if(res.code==200){
//             //     // alert("导出完成")

//             // console.log("导出的res",res.data)
//             // console.log("filename",res.data.filename)

//             //     // download(res.data.filename) // 注意，这里一定是res.data，不然导出的excel会乱码
//             //     // console.log("err",this.download(res.data) )

//             //     const xlsx="/temp/TaskInfo.xls";
//             //     const blob=new Blob([res.data],{type:xlsx});
//             //     const a =document.createElement("a");
//             //     let fileName="12.xlsx"
//             //     a.download=fileName;
//             //     a.href=window.URL.createObjectURL(blob)
//             //     a.click();
//             //     a.remove();

//             // }
//             //     }
//             // })

//             var xhr = new XMLHttpRequest();
//             var formData = new FormData();
//             // 添加请求的参数
//             formData.append("stationID", key);
//             formData.append("TaskName",input);
//             formData.append("PathType",PathType);

//             formData.append("ExecuteType", taType);
//             formData.append("exportflag", 1);
//             // 添加请求的方式，地址
//             xhr.open("POST", frs.urls + "/api162/dalirobotcms/ajax/querytaskpath.php", true);
//             // 设置responseType
//             xhr.responseType = "blob";
//             xhr.onload = function(e) {
//               var content = xhr.response;
//               console.log("111111",content)
//               // 组装a标签
//               let timestamp = frs.getLocalTime(new Date());
//               var elink = document.createElement("a");
//               // 设置下载文件名
//               elink.download = "下载" + timestamp + ".xlsx";
//               elink.style.display = "none";
//               let blob = new Blob([content]);
//               elink.href = URL.createObjectURL(blob);
//               document.body.appendChild(elink);
//               // 模拟点击事件
//               elink.click();
//               document.body.removeChild(elink);
//             };
//             xhr.send(formData);

// }

// 页面所有的单选框在再次单机时取消选中
document.body.onmousedown = function (event) {
  event = event || window.event
  var target = event.target || event.srcElement
  if (target.type === 'radio') {
    target.previousValue = target.checked
  }
}

document.body.onclick = function (event) {
  event = event || window.event
  var target = event.target || event.srcElement
  if (target.type === 'radio') {
    if (target.previousValue) {
      target.checked = false
    }
  }
}

/* 页码部分初始显示 */

var k
function change(e, all, zu) {
  //初始时候，此时页面不提示已为第一页
  zz = zu
  var pagesize = 10 //每页多少条信息
  pageall = all //总页数
  pageno = e //当前页
  PageT.currentPage = pageno
  // console.log('页码修改运行测试', pageno)
  if (e < 1) {
    //如果输入页<1页
    e = 1
    pageno = 1
  } //就等于第1页 ， 当前页为1
  if (e > pageall) {
    //如果输入页大于最大页
    e = pageall
    pageno = pageall
  } //输入页和当前页都=最大页
  document.getElementById('tbody').innerHTML = '' //全部清空
  for (var i = 0; i < pagesize; i++) {
    var div = document.createElement('tr') //建立div对象
    div.innerHTML = zz[(e - 1) * pagesize + i] //建立显示元素
    document.getElementById('tbody').appendChild(div) //加入tbody中
    if (zz[(e - 1) * pagesize + i + 1] == null)
      //超出范围跳出
      break
  }
  var ye = ''
  for (var j = 1; j <= pageall; j++) {
    if (j < 4) {
      if (e == j) {
        ye =
          ye +
          "<span><a href='javascript:void(0)' onclick='change1(" +
          j +
          ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
          j +
          '</a></span> '
      } else {
        ye =
          ye +
          "<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1(" +
          j +
          ")'>" +
          j +
          '</a> '
      }
    } else if (j >= 4) {
      if (j <= pageall - 1) {
        if (e == j) {
          ye =
            ye +
            "<span><a href='javascript:void(0)' onclick='change1(" +
            j +
            ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
            j +
            '</a></span> '
        } else {
          ye = ye + ' .... '
        }
      } else if (j > pageall - 1) {
        if (e == j) {
          ye =
            ye +
            "<span><a href='javascript:void(0)' onclick='change1(" +
            j +
            ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
            j +
            '</a></span> '
        } else {
          ye =
            ye +
            "<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1(" +
            j +
            ")'>" +
            j +
            '</a> '
        }
      }
    }
  }
  document.getElementById('a1').innerHTML = pageall
  document.getElementById('a2').innerHTML = pageno
  document.getElementById('a3').innerHTML = ye
  k = zu
}

/* 页码部分的具体实现 */
function change1(e) {
  zz = k
  var pagesize = 10
  pageall = $('#p').text()
  pageno = e

  // console.log('页码运行页测试', pageno)
  PageT.currentPage = pageno
  // console.log('页码修改运行测试', pageno)

  if (e < 1) {
    //如果输入页<1页
    e = 1
    pageno = 1
  } //就等于第1页 ， 当前页为1
  if (e > pageall) {
    //如果输入页大于最大页
    e = pageall
    pageno = pageall
  } //输入页和当前页都=最大页
  document.getElementById('tbody').innerHTML = '' //全部清空
  for (var i = 0; i < pagesize; i++) {
    var div = document.createElement('tr') //建立div对象
    div.innerHTML = zz[(e - 1) * pagesize + i] //建立显示元素
    document.getElementById('tbody').appendChild(div) //加入tbody中
    if (zz[(e - 1) * pagesize + i + 1] == null)
      //超出范围跳出
      break
  }
  var ye = ''
  for (var j = 1; j <= pageall; j++) {
    if (j < 4) {
      if (e == j) {
        ye =
          ye +
          "<span><a href='javascript:void(0)' onclick='change1(" +
          j +
          ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
          j +
          '</a></span> '
      } else {
        ye =
          ye +
          "<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1(" +
          j +
          ")'>" +
          j +
          '</a> '
      }
    } else if (j >= 4) {
      if (j <= pageall - 1) {
        if (e == j) {
          ye =
            ye +
            "<span><a href='javascript:void(0)' onclick='change1(" +
            j +
            ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
            j +
            '</a></span> '
        } else {
          ye = ye + ' .... '
        }
      } else if (j > pageall - 1) {
        if (e == j) {
          ye =
            ye +
            "<span><a href='javascript:void(0)' onclick='change1(" +
            j +
            ")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>" +
            j +
            '</a></span> '
        } else {
          ye =
            ye +
            "<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1(" +
            j +
            ")'>" +
            j +
            '</a> '
        }
      }
    }
  }
  document.getElementById('a1').innerHTML = pageall
  document.getElementById('a2').innerHTML = pageno
  document.getElementById('a3').innerHTML = ye
}

/* 页码组件 */
function initpage() {
  PageT = new Vue({
    el: '#pageChild',
    data: function () {
      return {
        currentPage: 1,
        totalnum: '',
      }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        change1(val) //调用原页码实现函数
      },
    },
  })
}

// /* 导入功能 【接口未完善 qi】*/
// function GetExcel() {
//   $.ajax({
//     url: '/api162/dalirobotcms/ajax/cameraData.php',
//     type: 'POST',
//     async: false,
//     data: {
//       task: 'importCamera',
//       file: '', //自己加的参数
//     },
//     // 告诉jQuery不要去处理发送的数据
//     processData: false,
//     // 告诉jQuery不要去设置Content-Type请求头
//     contentType: false,
//     beforeSend: function () {
//       console.log('正在进行，请稍候')
//     },
//     success: function (result) {
//       console.log('result???????/daoru????', result)
//       if (result.result_code == 200) {
//         utils.showMessage('导入成功！')
//         parts_manage.refresh()
//       } else if (result.result_code == 999) {
//         utils.showMessage(result.description + '，请重试！')
//       } else {
//         utils.showMessage('导入失败，请重试！')
//       }
//     },
//   })

//   /*  let TreeId = window.parent.document.getElementById('TreeId')
//   var key = []
//   $(TreeId)
//     .find('li')
//     .each(function () {
//       key.push($(this).text())
//     })
//   var key = key.toString()
//   if (key == '') {
//     key = window.parent.$('#taGetTPath1').val()
//   }
//   // console.log('导入：stationID', key)

//   $.post(
//     '/api162/dalirobotcms/ajax/importtaskpathinfo.php',
//     {
//       stationID: key,
//     },
//     function (res) {
//       // console.log('导入', res)
//       res = JSON.parse(res)
//       if (res.code == 200) {
//         alert('导入完成')
//       }
//     }
//   ) */
// }

/* <!-- 导入功能测试 --> */
function importExcel(obj) {
  let TreeId = window.parent.document.getElementById('TreeId')
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text())
    })
  var key = key.toString()
  if (key == '') {
    key = window.parent.$('#taGetTPath1').val()
  }
  console.log('导入：stationID', key)

  var formData = new FormData()
  formData.append('file', $('#articleImageFile')[0].files[0])
  formData.append('stationID', key)
  // console.log('-:', formData)
  $.ajax({
    url: '/api42/dalirobotcms/ajax/importtaskpathinfo.php',
    type: 'POST',
    async: false,
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      result = eval('(' + result + ')')
      console.log('导入接口返回result:', result)
      /*  if (result.result_code == 200) {
        utils.showMessage('导入成功！')
        parts_manage.refresh()
      } else if (result.result_code == 999) {
        utils.showMessage(result.description + '，请重试！')
      } else {
        utils.showMessage('导入失败，请重试！')
      } */
    },
  })

  // var formData = new FormData()
  // var name = $('#articleImageFile').val()
  // formData.append('file', $('#articleImageFile')[0].files[0])
  // formData.append('name', name) //可以使用formData.append()传递多个参数
  // formData.append('task', 'importCamera')

  // console.log('----:name', name) //选择文件的本机地址以及文件名
  // console.log('---:file', $('#articleImageFile')[0].files[0]) //文件信息
  // console.log('-:', formData)
  // $.ajax({
  //   url: '/api162/dalirobotcms/ajax/cameraData.php',
  //   type: 'POST',
  //   async: false,
  //   data: formData,
  //   // 告诉jQuery不要去处理发送的数据
  //   processData: false,
  //   // 告诉jQuery不要去设置Content-Type请求头
  //   contentType: false,
  //   beforeSend: function () {
  //     console.log('正在进行，请稍候')
  //   },
  //   success: function (result) {
  //     result = eval('(' + result + ')')
  //     console.log('导入接口返回result:', result)
  //     /*  if (result.result_code == 200) {
  //       utils.showMessage('导入成功！')
  //       parts_manage.refresh()
  //     } else if (result.result_code == 999) {
  //       utils.showMessage(result.description + '，请重试！')
  //     } else {
  //       utils.showMessage('导入失败，请重试！')
  //     } */
  //   },
  // })
}
