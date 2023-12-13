setTimeout(Init, 500)
let vm = null
function CreateHTMLele() {
  ele_init('InspectType', 3, '巡检方式', { OP: InspectWorkType_s })
  if (window.parent.parent.parent.sessionUserType == 0) {
    ele_init('Task_Rule', 3, 'Task_Rule', { OP: Task_Rule_s, ONCHANGE: NormalSelectChange })
  } else {
    ele_init('Task_Rule', 3, 'Task_Rule', { OP: Robot_Rule_s, ONCHANGE: NormalSelectChange })
  }
  ele_init('ConcurrentTask', 3, 'ConcurrentTask', { OP: YesOrNo_s })
  ele_init('RuleWeek', 7, '每周重复', { OP: Week_s, CSS: 'week_checkbox', DISALL: 'true', VT: 1 })
  ele_init('RuleMonth', 7, '每月重复', { OP: Day_s, CSS: 'day_checkbox', DISALL: 'true', VT: 1 })
  flush_html_ele_value('1', 'Task_CaliFlag')
  ele_init('RepeatInterval', 2, '重复间隔(分钟)', '')

  ele_init('WorkWay', 3, '执行方式', { OP: WorkWay_s, ONCHANGE: WorkWayChange })
  ele_init('Priority', 3, '优先级', { OP: Priority_s })
  ele_init('DeviceLevel', 3, '设备层级', { OP: DeviceLevel_s })
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
  initpage()
  aaa(1)
  // window.parent.document.getElementById('selFunQuery').click()//在父页面变电站默认选中后，自动触发查询的点击事件【使得初始时表格数据获取完全】
  //   GetTaskPath(1)
  // GetTaskNum()
  ele_init('TaskSta', 4, 'TaskSta', {
    OP: TaskSta_s,
    CSS: 'TaskSta_checkbox',
  })
  ele_init('InspectionType', 3, 'InspectionType', {
    OP: RunPathType_s,
    CSS: 'patrolSta_checkbox',
  })
  ele_init('patrolSta', 3, 'patrolSta', {
    OP: patrolSta_s,
    CSS: 'patrolSta_checkbox',
  })

  CreateHTMLele()
  $_('changeColor1').style.background = '#073a7d88'
  $_('tableChange').style.background = '#073a7d88'
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  $_('Divcontents').style.height = bh - 45 + 'px' ///15
}
// function initApp() {
//     vm = new Vue({
//         el: '#progress',
//         data: function () {
//           return {
//           percentage: '',
//           customColor: '',
//           }
//         },
//     })
//   }
/* 下面function是任务查询需要的 */
// function GetTaskPath(page){
// // console.log("11重置后初始进入",document.getElementById("aa").value)

// //  if(document.getElementById("aa").value=='1'){
// //         document.getElementById("aa").value='0'
// //         console.log("重置后初始进入")
// //     }

//     let TreeIdall = window.parent.document.getElementById('TreeIdAll');
//     console.log("调用88数组",TreeIdall)
//     var keyall=[]
//     $(TreeIdall).find('li').each(function() {
//         keyall.push($(this).text());
//     });
//     var keyall = keyall[0];//初始默认选择第一个节点
//     console.log("初始变电站id",keyall)
//     $.post(
//         '/api162/dalirobotcms/ajax/queryinspectionlog.php',
//         {
//           task: 'query',
//           PageNow:page,
//           BeginTime:'',
//           EndTime:'',
//           StationID:keyall,
//           Task_Path_Desc:'',
//           InspectType:'',
//           TaskStation:'',
//           Is_Deal:''
//         },
//         function (res) {
//             res = JSON.parse(res)
//             console.log("数111212据：",res)
//             $('#DataTable tbody').empty();
//             let temp = '';
//             var count = 0
//             for (let path of res) {
//             count++;
//            if(path.InspectType==0){
//                 var PaTy = "<span> 全面巡检</span>"
//             }
//             else if(path.InspectType==1){
//                 var PaTy = "<span> 特殊巡检</span>"
//             }
//             else if(path.InspectType==2){
//                 var PaTy = "<span> 专项巡视</span>"
//             }
//             else if(path.InspectType==3){
//                 var PaTy = "<span> 自定义巡视</span>"
//             }
//             else if(path.InspectType==4){
//                 var PaTy = "<span> 熄灯巡视</span>"
//             }
//             else if(path.InspectType==5){
//                 var PaTy = "<span> 例行巡视</span>"
//             }
//             else if(path.InspectType==6){
//                 var PaTy = "<span> 静默任务</span>"
//             }
//             else{
//                 var PaTy = "<span> 出现错误 请检查</span>"
//             }
//             var lastCow1 = "<img src='img/操作1.png' alt='' title='暂停' onclick='Pause(this)'/>"
//             var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
//             if(path.RunPragress==0 || path.RunPragress==100){
//                 var lastCow1 = "<span> </span>"
//                 var lastCow2 = "<span> </span>"
//             }
//             temp +=
//                     '<tr>' +
//                     '<td>' + "<input name='Id' type='radio' value='"+path.Task_Path_Id+"' />"+ '</td>' +
//                     '<td>' + count+ "<input name='UUIDId' type='hidden' value='"+path.UUID+"' style='display:none'/>" + '</td>' +   /* 序号 */
//                     '<td>' + path.SectionName + '</td>' +    /* 运维班 */
//                     '<td>' + path.StationName + '</td>' +    /* 变电站 */
//                     '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
//                     '<td>' + PaTy + '</td>' +    /* 巡视类型 */
//                     '<td>' + path.Start_Time + '</td>' +/*   时间 */
//                     '<td>' + " <div id='progress' style='border: 0px red solid;height: 20px;width: 200px;'><meter min='0' max='100' value='"+path.RunPragress+"' style='width: 145px;height: 15px;float:left;padding-left:5px'></meter><span>"+path.RunPragress+"%</span></div>" + '</td>' +   /* 进度 */
//                     '<td>' + path.End_Time + '</td>' +      /* 时间 */
//                     '<td>' + "<span style='color:#c2dffb;'>总测点："+path.InspectDevCount +"；</span><span style='color:#31cb72;'>正常："+path.InspectCount +"；</span><span style='color:#fc3131;'>报警："+path.AlarmDevCount +"；</span><span style='color:#f8c335;'>失败："+path.ErrorCount +"；</span><span style='color:#3271f8;'>异常："+path.InspectAbnormalCount +"；</span>"+ '</td>' +   /* 结果 */
//                     '<td>' +  lastCow1+ "&nbsp&nbsp&nbsp<img src='img/操作2.png' alt=''  onclick='LookAtTest(this);' title='详情'/>&nbsp&nbsp&nbsp"+lastCow2+ '</tr>';
//             }
//             // $('#DataTable tbody').append(temp);
//             // var a = document.getElementById("tbody").getElementsByTagName("tr");
//             // var zz =new Array(a.length);
//             // //alert(zz.length);
//             // for(var i=0;i<a.length;i++)
//             // { zz[i]=a[i].innerHTML } //div的字符串数组付给zz
//             // var pageno=1;               //当前页
//             // var pagesize=15;            //每页多少条信息
//             // if(zz.length%pagesize==0)
//             // {var  pageall =zz.length/pagesize }
//             // else
//             // {var  pageall =parseInt(zz.length/pagesize)+1}       //一共多少页
//             // $("#p").text(pageall);      //将pageall的值存放到div中，便于下次使用
//             // change(1,pageall,zz);
//           }
//         )
// }
// function GetTaskNum() {
//   //表格数据显示条数，加载内容太大，所以根据条数指定显示具体页码的数据
//   let TreeIdall = window.parent.document.getElementById('TreeIdAll')
//   console.log('调用88数组', TreeIdall)
//   var keyall = []
//   $(TreeIdall)
//     .find('li')
//     .each(function () {
//       keyall.push($(this).text())
//     })
//   var keyall = keyall[0] //初始默认选择第一个节点
//   console.log('初始变电站id', keyall)
//   $.post(
//     '/api162/dalirobotcms/ajax/queryinspectionlog.php',
//     {
//       task: 'query',
//       PageNow: '',
//       pageNum: '15',
//       BeginTime: '',
//       EndTime: '',
//       StationID: keyall,
//       Task_Path_Desc: '',
//       InspectType: '',
//       TaskStation: '',
//       Is_Deal: '',
//     },
//     function (res) {
//       // console.log("11数据初始化：",res)
//       res = JSON.parse(res)
//       console.log('-----111数11据初始化：', res)
//       console.log('-----111数11据初始化len：', res.length)
//       PageT.totalnum = res.length
//     }
//   )
// }
function aaa(page) {
  var coun = 0
  var cou = 0
  var arrTaskStaVal = [1, 2, 3, 4, 5, 6]
  var arrSureStaVal = [0, 1]
  let TreeId = window.parent.document.getElementById('TreeId')

  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })
  var key = key.toString()

  let TreeIdall = window.parent.document.getElementById('TreeIdAll')
  // console.log('调用88数组', TreeIdall)
  var keyall = []
  $(TreeIdall)
    .find('li')
    .each(function () {
      keyall.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })

  var keyall = keyall[0] //初始默认选择第一个节点

  let keyDef = window.parent.document.getElementById('name').innerHTML //初始的默认选中而已，实行点击事件之后便失去了作用（置空

  if (keyDef == '' && key == '') {
    alert('请选择变电站') //考虑一下要不要注释掉，且注释后异步问题的显示情况，延迟处理到500了依旧不行，考虑其他解决方案

    $('#DataTable tbody').empty()
    return //结束整个函数
  }

  if (key == '' && keyDef != '') {
    key = keyDef
  }

  // 开始时间和结束时间的获取
  var StartTime = $('#BEGIN', window.parent.document).val()
  var EndTime = $('#END', window.parent.document).val()
  // console.log('11ceshi默认初始表格获取时shijian的值309valueStartTime', StartTime)
  // console.log('11ceshi默认初始表格获取时shijian的值309valueEndTime', EndTime)
  if (StartTime == '') {
    StartTime = ''
  }
  if (EndTime == '') {
    EndTime = ''
  }
  // console.log('11ceshi默认初始表格获取时shijian的值309valueStartTime---', StartTime)
  // console.log('11ceshi默认初始表格获取时shijian的值309valueEndTime---', EndTime)
  var IntypeVal = window.parent.document.getElementById('InspectionType_s').value
  if (IntypeVal == '') {
    IntypeVal = 0
  }
  // console.log('搜索任务类型', IntypeVal)
  var SureSta = window.parent.document.getElementsByName('SureState_c')
  var SureStaVal = []
  for (var i = 0; i < SureSta.length; i++) {
    if (SureSta[i].checked) {
      SureStaVal.push(SureSta[i].value)
    } else {
      cou++
      if (cou == SureSta.length) {
        var SureStaVal = arrSureStaVal.toString()
      }
    }
  }
  SureStaVal = SureStaVal.toString()
  // console.log('搜索确认状态', SureStaVal)

  var TaskSta = window.parent.document.getElementsByName('TaskStation_c')
  var TaskStaVal = []
  for (var i = 0; i < TaskSta.length; i++) {
    if (TaskSta[i].checked) {
      TaskStaVal.push(TaskSta[i].value)
    } else {
      coun++
      if (coun == TaskSta.length) {
        var TaskStaVal = arrTaskStaVal.toString()
      }
    }
  }
  TaskStaVal = TaskStaVal.toString()
  // console.log('搜索执行状态', TaskStaVal)

  var TaskNameVal = window.parent.document.getElementById('TaskName').value
  // console.log('搜索页面查询输入的任务名称值', TaskNameVal)

  // var arrIntype = [0, 1, 2, 3, 4, 5, 6]
  // if (IntypeVal == '-1') {
  //   IntypeVal = arrIntype
  // }
  // IntypeVal = IntypeVal.toString()

  // console.log('搜索页面查询输入的--------StationID', key)
  // console.log('9911ceshi默认初始表格获取时shijian的值309valueStartTime', StartTime)
  // console.log('9911ceshi默认初始表格获取时shijian的值309valueEndTime', EndTime)

  // console.log('IntypeVal------IntypeVal', IntypeVal)
  $.post(
    '/api162/dalirobotcms/ajax/queryinspectionlog.php',
    {
      task: 'query',
      PageNow: page,
      pageNum: '15',
      BeginTime: StartTime,
      EndTime: EndTime,
      StationID: key,
      Task_Path_Desc: TaskNameVal,
      InspectType: IntypeVal,
      TaskStation: TaskStaVal,
      Is_Deal: SureStaVal,
    },
    function (res) {
      res = JSON.parse(res)
      console.log('chaxun数11据：666------------', res)
      $('#DataTable tbody').empty()
      PageT.totalnum = eval(res[res.length - 1].totalsqlcounts)
      PageT.currentPage = page
      // console.log('chaxun数11据----555555555555555555---- PageT.currentPage0：', PageT.currentPage)

      let temp = ''
      var count = 0

      /*    if (page) {
        // PageT.totalnum = res.length //条数
        PageT.totalnum = res[res.length - 1].totalsqlcounts
      } else {
        console.log('00--00--0--09-999999--0---')
        PageT.totalnum = res.length //条数
      } */

      // console.log('chaxun数11据--------666666666666666：totalnum', PageT.totalnum)
      /*  if (!page) {
        res = res.slice(0, 15)
        console.log('chaxun数11据：666', res)
      } */

      if (res == '') {
        temp += '<tr>' + '</tr>'
      } else {
        for (let path of res) {
          count++
          if (path.RunPragress == '') {
            var RunPrag = '<span>00.00</span>'
          } else {
            var RunPrag = '<span></span>'
          }
          if (path.InspectType == 0) {
            var PaTy = '<span> 全面巡检</span>'
          } else if (path.InspectType == 1) {
            var PaTy = '<span> 特殊巡检</span>'
          } else if (path.InspectType == 2) {
            var PaTy = '<span> 专项巡视</span>'
          } else if (path.InspectType == 3) {
            var PaTy = '<span> 自定义巡视</span>'
          } else if (path.InspectType == 4) {
            var PaTy = '<span> 熄灯巡视</span>'
          } else if (path.InspectType == 5) {
            var PaTy = '<span> 例行巡视</span>'
          } else if (path.InspectType == 6) {
            var PaTy = '<span> 静默任务</span>'
          } else {
            var PaTy = '<span> 出现错误 请检查</span>'
          }
          if (path.End_Time != '') {
            var lastCow1 = '<span> </span>'
            var lastCow2 = '<span> </span>'
          } else {
            if (path.TaskStation == 2) {
              var lastCow1 = "<img src='img/操作1.png' alt='' title='暂停' onclick='Pause(this)'/>"
              var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
            } else if (path.TaskStation == 3) {
              var lastCow1 = "<img src='img/操作4.png' alt='' title='继续' onclick='Pause(this)'/>"
              var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
            } else {
              var lastCow1 = '<span> </span>'
              var lastCow2 = '<span> </span>'
            }
          }
          temp +=
            '<tr  ondblclick ="ondblJump(this)" >' +
            '<td>' +
            "<input name='Id' type='radio' value='" +
            path.Task_Path_Id +
            "' placeholder='" +
            path.UUID +
            "'/>" +
            '</td>' +
            '<td>' +
            count +
            "<input name='UUIDId' type='hidden' value='" +
            path.UUID +
            "' style='display:none'/>" +
            '</td>' /* 序号 */ +
            '<td>' +
            path.SectionName +
            '</td>' /* 运维班 */ +
            // '<td>' + path.StationName + '</td>' +    /* 变电站 */
            '<td>' +
            "<div class='tmpSta' title='" +
            path.StationName +
            "'><span>" +
            path.StationName +
            '</span></div> ' +
            '</td>' /* 任务名称 */ +
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
            path.Start_Time +
            "<input name='Start_Time' type='hidden' value='" +
            path.Start_Time +
            "' style='display:none'/>" +
            '</td>' /*   时间 */ +
            '<td>' +
            " <div id='progress' style='border: 0px red solid;height: 20px;width: 200px;'><meter min='0' max='100' value='" +
            path.RunPragress +
            "' style='width: 145px;height: 15px;float:left;padding-left:5px'></meter><span>" +
            path.RunPragress +
            RunPrag +
            '%</span></div>' +
            '</td>' /* 进度 */ +
            '<td>' +
            path.End_Time +
            "<input name='End_Time' type='hidden' value='" +
            path.End_Time +
            "' style='display:none'/>" +
            '</td>' /* 时间 */ +
            '<td>' +
            "<span style='color:#c2dffb;'>总测点：" +
            path.InspectDevCount +
            "；</span><span style='color:#31cb72;'>正常：" +
            path.InspectCount +
            "；</span><span style='color:#fc3131;'>报警：" +
            path.AlarmDevCount +
            "；</span><span style='color:#f8c335;'>失败：" +
            path.ErrorCount +
            "；</span><span style='color:#3271f8;'>异常：" +
            path.InspectAbnormalCount +
            '；</span>' +
            '</td>' /* 结果 */ +
            '<td>' +
            lastCow1 +
            "&nbsp&nbsp&nbsp<img src='img/操作2.png' alt=''  onclick='LookAtTest(this);' title='详情'/>&nbsp&nbsp&nbsp" +
            lastCow2 +
            '</tr>'
        }
      }
      $('#DataTable tbody').append(temp)
    }
  )
}
parent
  .$(window.parent.document)
  .find('#selFunQuery')
  .on('click', function () {
    aaa(1)
  })

parent
  .$(window.parent.document)
  .find('#purge')
  .on('click', function () {
    // console.log('重置')
    // $.post(
    //     '/api162/dalirobotcms/ajax/queryinspectionlog.php',
    //     {
    //       task: 'query',
    //       PageNow:'',
    //       BeginTime:'',
    //       EndTime:'',
    //       StationID:'',
    //       Task_Path_Desc:'',
    //       InspectType:'0',
    //       TaskStation:'0',
    //       Is_Deal:'0'
    //     },
    //     function (res) {
    //         res = JSON.parse(res)
    //         console.log("数11据11：",res)
    //         $('#DataTable tbody').empty();
    //         let temp = '';
    //         var count = 0
    //         for (let path of res) {
    //         count++;

    //        if(path.InspectType==0){
    //                 var PaTy = "<span> 全面巡检</span>"
    //             }
    //         else if(path.InspectType==1){
    //             var PaTy = "<span> 特殊巡检</span>"
    //         }
    //         else if(path.InspectType==2){
    //             var PaTy = "<span> 专项巡视</span>"
    //         }
    //         else if(path.InspectType==3){
    //             var PaTy = "<span> 自定义巡视</span>"
    //         }
    //         else if(path.InspectType==4){
    //             var PaTy = "<span> 熄灯巡视</span>"
    //         }
    //         else if(path.InspectType==5){
    //             var PaTy = "<span> 例行巡视</span>"
    //         }
    //         else if(path.InspectType==6){
    //             var PaTy = "<span> 辅控任务</span>"
    //         }
    //         else{
    //             var PaTy = "<span> 出现错误 请检查</span>"
    //         }

    //          console.log("percentage11",path.RunPragress)

    //         var lastCow1 = "<img src='img/操作1.png' alt='' title='暂停' onclick='Pause(this)'/>"
    //         var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
    //         if(path.RunPragress==0 || path.RunPragress==100){
    //             var lastCow1 = "<span> </span>"
    //             var lastCow2 = "<span> </span>"
    //         }

    //             temp +=
    //                 '<tr>' +
    //                 '<td>' + "<input name='Id' type='radio' value='"+path.Task_Path_Id+"' />"+ '</td>' +
    //                 '<td>' + count+ "<input name='UUIDId' type='hidden' value='"+path.UUID+"' style='display:none'/>" + '</td>' +   /* 序号 */

    //                 '<td>' + path.SectionName + '</td>' +    /* 运维班 */
    //                 '<td>' + path.StationName + '</td>' +    /* 变电站 */
    //                 '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
    //                 '<td>' + PaTy + '</td>' +    /* 巡视类型 */
    //                 '<td>' + path.Start_Time + '</td>' +/*   时间 */
    //                 '<td>' + " <div id='progress' style='border: 0px red solid;height: 20px;width: 200px;'><meter min='0' max='100' value='"+path.RunPragress+"' style='width: 145px;height: 15px;float:left;padding-left:5px'></meter><span>"+path.RunPragress+"%</span></div>" + '</td>' +   /* 进度 */

    //                 '<td>' + path.End_Time + '</td>' +      /* 时间 */
    //                 '<td>' + "<span style='color:#c2dffb;'>总测点："+path.InspectDevCount +"；</span><span style='color:#31cb72;'>正常："+path.InspectCount +"；</span><span style='color:#fc3131;'>报警："+path.AlarmDevCount +"；</span><span style='color:#f8c335;'>失败："+path.ErrorCount +"；</span><span style='color:#3271f8;'>异常："+path.InspectAbnormalCount +"；</span>"+ '</td>' +   /* 结果 */

    //                 '<td>' +  lastCow1+ "&nbsp&nbsp&nbsp<img src='img/操作2.png' alt=''  onclick='LookAtTest(this);' title='详情'/>&nbsp&nbsp&nbsp"+lastCow2+ '</tr>';
    //         }
    //         $('#DataTable tbody').append(temp);
    //       }
    //     )

    // document.getElementById("aa").value='1'
    // console.log("00重置后初始进入",document.getElementById("aa").value)

    var checkSure = window.parent.document.getElementsByName('SureState_c')
    for (var i = 0; i < checkSure.length; i++) {
      checkSure[i].checked = false
    }

    var Taskcheckbox = window.parent.document.getElementsByName('TaskStation_c')
    for (var i = 0; i < Taskcheckbox.length; i++) {
      Taskcheckbox[i].checked = false
    }

    window.parent.document.getElementById('TaskName').value = ''
    window.parent.document.getElementById('InspectionType_s').value = ''

    parent.$('#cleanCheck', parent.doucment).trigger('click')

    // console.log('重置清空作用是实现与否')

    $('#DataTable tbody').empty()
    //  window.parent.initApp(); //清空父页时间选择器 出现问题！！！  【清空表格和时间只能实现其一，时间选择在清空后不可在此使用】
    // console.log('重置清空作用是实现与否13')

    // document.getElementById("aa").value='1'
    // console.log("00重置后初始进入",document.getElementById("aa").value)

    PageT.totalnum = 0
  })

function hiddenparam() {
  $_('LookAt').style.display = 'none'
  $_('viewset').style.display = 'none'
  $_('paramwrap').style.display = 'none'
  $_('paramwrapGrid').style.display = 'none'
}

function ViewSet() {
  $_('viewset').style.display = DisBlock //新增任务的弹窗样式【点击显示弹窗】
}

function cowselect(id) {
  let column = document.getElementById(id) //获取 tadio元素
  let checkVal = column.checked //获取 radio checked值
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

function setAll() {
  var ch = document.getElementsByName('lover[]')
  var all = document.getElementById('all')
  var j = 0
  for (i = 0; i < ch.length; i++) {
    if (ch[i].checked) {
      j = j + 1
      if (j == 10) {
        all.checked = true
      } else {
        all.checked = false
      }
    }
  }
}
//选择全选后，所有选框，都为true，再次点击，全为false
function aall() {
  var all = document.getElementById('all')
  var ch = document.getElementsByName('lover[]') //获取四个子选项的名称，建立数组
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

function verify() {
  var checkbox = document.getElementsByName('lover[]')
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked) {
      cowselect('cow1')
      cowselect('cow2')
      cowselect('cow3')
      cowselect('cow4')
      cowselect('cow5')
      cowselect('cow6')
      cowselect('cow7')
      cowselect('cow8')
      cowselect('cow9')
      cowselect('cow10')
    } else {
      cowselect('cow1')
      cowselect('cow2')
      cowselect('cow3')
      cowselect('cow4')
      cowselect('cow5')
      cowselect('cow6')
      cowselect('cow7')
      cowselect('cow8')
      cowselect('cow9')
      cowselect('cow10')
    }
  }
  $_('viewset').style.display = 'none' //执行后弹窗去掉
}

/* 暂停与继续*/
function Pause(obj) {
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  var numb = obj.getAttribute('src') //获取被选中的单选按钮的value值
  if (numb == 'img/操作4.png') {
    $.post(
      '/api162/dalirobotcms/ajax/gridTask.php',
      {
        Task_Path_Id: Task_Path_Id,
        taskComd: 'continue',
        CommunicateProtocol: '0',
      },
      function (res) {
        // console.log('已继续任务', res)

        res = JSON.parse(res)
        alert('已继续任务')
      }
    )
    obj.setAttribute('src', 'img/操作1.png')
  }
  if (numb == 'img/操作1.png') {
    $.post(
      '/api162/dalirobotcms/ajax/queryinspectionlog.php',
      {
        Task_Path_Id: Task_Path_Id,
        taskComd: 'pause',
        CommunicateProtocol: '0',
      },
      function (res) {
        res = JSON.parse(res)
        alert('已暂停任务')
      }
    )
    obj.setAttribute('src', 'img/操作4.png')
  }
}

/* 终止 */
function Finish(obj) {
  var Task_Path_Id = $(obj).closest('tr').find("input[name='Id']").val()
  $.post(
    '/api162/dalirobotcms/ajax/gridTask.php',
    {
      Task_Path_Id: Task_Path_Id,
      taskComd: 'stop',
      CommunicateProtocol: '0',
    },
    function (res) {
      res = JSON.parse(res)
      alert('已终止任务')
    }
  )
}

// var k;
// function change(e,all,zu){  //初始时候，此时页面不提示已为第一页
//     zz=zu;
//     var pagesize=15;   //每页多少条信息
//     pageall=all;     //总页数
//     pageno=e;        //当前页
//     if(e <1)//如果输入页<1页
//     { e=1;pageno=1}//就等于第1页 ， 当前页为1
//     if(e>pageall)//如果输入页大于最大页
//     {e=pageall;pageno=pageall}//输入页和当前页都=最大页
//     document.getElementById("tbody").innerHTML="";//全部清空
//     for(var i=0;i<pagesize;i++)
//     {
//         var div =document.createElement("tr");//建立div对象
//         div.innerHTML=zz[(e-1)*pagesize+i];//建立显示元素
//         document.getElementById("tbody").appendChild(div);//加入tbody中
//         if(zz[(e-1)*pagesize+i+1]==null)//超出范围跳出
//             break
//     }
//     var ye="";
//     for(var j=1;j<=pageall;j++)
//     {
//         if(j<4){
//             if(e==j)
//             {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//             else
//             {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
//         }
//         else if(j>=4){
//             if(j<=(pageall-1)){
//                 if(e==j)
//                 {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//                 else
//                 {ye=ye+" .... "}
//             }
//             else if(j>(pageall-1)){
//                 if(e==j)
//                 {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//                 else
//                 {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}

//             }

//         }
//     }

//     document.getElementById("a1").innerHTML=pageall;
//     document.getElementById("a2").innerHTML=pageno;
//     document.getElementById("a3").innerHTML=ye;

//     k=zu;

// }
// function change1(e){
//     zz=k;
//     var pagesize=15;
//     pageall=$("#p").text();
//     pageno=e;
//     if(e <1)//如果输入页<1页
//     { e=1;pageno=1}//就等于第1页 ， 当前页为1
//     if(e>pageall)//如果输入页大于最大页
//     {e=pageall;pageno=pageall}//输入页和当前页都=最大页
//     document.getElementById("tbody").innerHTML="";//全部清空

//     for(var i=0;i<pagesize;i++)
//     {
//         var div =document.createElement("tr");//建立div对象
//         div.innerHTML=zz[(e-1)*pagesize+i];//建立显示元素
//         document.getElementById("tbody").appendChild(div);//加入tbody中
//         if(zz[(e-1)*pagesize+i+1]==null)//超出范围跳出
//             break
//     }

//     var ye="";
//     for(var j=1;j<=pageall;j++)
//     {
//         if(j<4){
//             if(e==j)
//             {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//             else
//             {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
//         }
//         else if(j>=4){
//             if(j<=(pageall-1)){
//                 if(e==j)
//                 {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//                 else
//                 {ye=ye+" .... "}
//             }
//             else if(j>(pageall-1)){
//                 if(e==j)
//                 {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
//                 else
//                 {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}

//             }

//         }
//     }
//     document.getElementById("a1").innerHTML=pageall;
//     document.getElementById("a2").innerHTML=pageno;
//     document.getElementById("a3").innerHTML=ye;

// }

function getTime(time) {
  // 转换为式分秒
  let h = parseInt((time / 60 / 60) % 24)
  h = h < 10 ? '0' + h : h
  let m = parseInt((time / 60) % 60)
  m = m < 10 ? '0' + m : m
  let s = parseInt(time % 60)
  s = s < 10 ? '0' + s : s
  // 作为返回值返回
  return [h, m, s]
}
/* 查看详情 */
function LookAtTest(obj) {
  var UUIDId = $(obj).closest('tr').find("input[name='UUIDId']").val()
  console.log('该条任务的uuid：', UUIDId)
  $.ajax({
    type: 'POST',
    url: '/api162/dalirobotcms/ajax/queryinspectionlog.php',
    dataType: 'json',
    async: false,
    data: {
      task: 'queryinspectlog',
      UUID: UUIDId,
    },
    success: function (res) {
      console.log('详情获取数据res', res)
      const nowData = new Date(res.Start_Time * 1000)
      res.Start_Time =
        nowData.toLocaleDateString().replace(/\//g, '-') + ' ' + nowData.toTimeString().slice(0, 9) //时间戳的处理

      const nowDataEnd = new Date(res.End_Time * 1000)
      res.End_Time =
        nowDataEnd.toLocaleDateString().replace(/\//g, '-') +
        ' ' +
        nowDataEnd.toTimeString().slice(0, 9)

      let TranTime = getTime(res.RunTime)
      // console.log(
      //   `输入的秒数是${res.RunTime}：，转换后是${TranTime[0]}时${TranTime[1]}分${TranTime[2]}秒`
      // )
      let ResRunTranTime = TranTime[0] + '时' + TranTime[1] + '分' + TranTime[2] + '秒'
      var reg = /[,，]/g
      if (res.AlarmDevList == '') {
        res.AlarmDevList = '无'
      } else {
        res.AlarmDevList = res.AlarmDevList.replace(reg, ',<br>')
      }
      if (res.ErrorDev == '') {
        res.ErrorDev = '无'
      } else {
        res.ErrorDev = res.ErrorDev.replace(reg, ',<br>')
      }
      if (res.UnInspectDev == '') {
        res.UnInspectDev = '无'
      } else {
        res.UnInspectDev = res.UnInspectDev.replace(reg, ',<br>')
      }
      if (res.ErrorInspectDev == '') {
        res.ErrorInspectDev = '无'
      } else {
        res.ErrorInspectDev = res.ErrorInspectDev.replace(reg, ',<br>')
      }

      document.getElementById('Start_Time').innerHTML = res.Start_Time
      document.getElementById('End_Time').innerHTML = res.End_Time
      document.getElementById('AlarmDevCount').innerHTML = res.AlarmDevCount
      document.getElementById('AlarmDevList').innerHTML = res.AlarmDevList //
      document.getElementById('InspectDevCount').innerHTML = res.InspectDevCount
      document.getElementById('RunTime').innerHTML = ResRunTranTime //秒数单位转换

      // document.getElementById('ErrorCount').innerHTML = res.ErrorCount
      // document.getElementById('ErrorDev').innerHTML = res.ErrorDev
      // document.getElementById('InspectErrorCount').innerHTML = res.InspectErrorCount
      // document.getElementById('InspectCount').innerHTML = res.InspectCount
      // document.getElementById('AlreadyDealCount').innerHTML = res.AlreadyDealCount
      // document.getElementById('NoDealCount').innerHTML = res.NoDealCount
      // document.getElementById('UnInspectDev').innerHTML = res.UnInspectDev
      // document.getElementById('ErrorInspectDev').innerHTML = res.ErrorInspectDev
      // document.getElementById('CarDevNum').innerHTML = res.CarDevNum
    },
  })
  $_('LookAt').style.display = DisBlock
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
        $('#DataTable tbody').empty()
        aaa(val)
      },
    },
  })
}

var xhr = new XMLHttpRequest()
var formData = new FormData()
function toExcel() {
  // var checkLength = $("input:radio[name='Id']:checked").length;

  //if(checkLength == 0) {
  //    alert("请至少勾选中一项需要删除的内容！");
  //    return;
  // }
  /* 
    $("input[type='radio']").each(function(){ //遍历checkbox的选择状态
        if($(this).prop("checked")){ //如果值为checked表明选中了
            var delei = $(this).closest('tr').find('td').eq(1).$("input[name='UUIDId']").value;//获取eq为2的那一列数据（就是第7列）
            console.log("选中改行的列值：",$(this).closest('tr').find('td').eq(1).find("input[name='UUIDId']").value);
            console.log("选中改行的列值：",$(this).closest('tr').find('td').eq(1).find("input[name='UUIDId']").val());
            
            console.log("选中改行的列值："+typeof delei+delei);
        }
    }); */

  var radio = document.getElementsByName('Id')
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      // alert(radio[i].value)
      var UUIDId = radio[i].placeholder
    }
  }

  // var UUIDId=$(obj).closest("tr").find("input[name='UUIDId']").val();

  // console.log('导出该条任务的uuid：', UUIDId)

  // var exportByLogID='xlsx'//文件格式
  formData.append('task', 'query')
  formData.append('exportflag', 1)
  formData.append('exporttype', 'xlsx')
  formData.append('UUID', UUIDId)
  // console.log('导出============')
  var url = '/api162/dalirobotcms/ajax/exportinspectionresult.php'
  xhr.open('POST', url, true)
  // xhr.responseType = "blob";
  xhr.onload = function (e) {
    // console.log('查询页面的导出情况e', e)
    var content = xhr.response
    // console.log('查询页面的导出情况', content)
    const xlsx = '/api162' + content + ''
    var elink = document.createElement('a')
    elink.href = xlsx
    document.body.appendChild(elink)
    elink.click()
    document.body.removeChild(elink)
  }
  xhr.send(formData)
}

/* 双击跳转‘巡视结果全览’信息获取 */
function ondblJump(obj) {
  var JumpUUID = $(obj).closest('tr').find("input[name='UUIDId']").val()
  var Jumpbegin = $(obj).closest('tr').find("input[name='Start_Time']").val()
  var Jumpend = $(obj).closest('tr').find("input[name='End_Time']").val()
  let TreeId = window.parent.document.getElementById('TreeId')
  var key = []
  $(TreeId)
    .find('li')
    .each(function () {
      key.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })
  var key = key.toString()
  let TreeIdall = window.parent.document.getElementById('TreeIdAll')
  // console.log('调用88数组', TreeIdall)
  var keyall = []
  $(TreeIdall)
    .find('li')
    .each(function () {
      keyall.push($(this).text()) //数组key存放所有选中值，同步增加删除
    })
  var keyall = keyall[0] //初始默认选择第一个节点
  let keyDef = window.parent.document.getElementById('name').innerHTML //初始的默认选中而已，实行点击事件之后便失去了作用（置空
  if (keyDef == '' && key == '') {
    alert('请选择变电站') //考虑一下要不要注释掉，且注释后异步问题的显示情况，延迟处理到500了依旧不行，考虑其他解决方案
    $('#DataTable tbody').empty()
    return //结束整个函数
  }
  if (key == '' && keyDef != '') {
    key = keyDef
  }

  var JumpSta = key
  // console.log('触发事件:JumpUUID', JumpUUID)
  // console.log('触发事件:开始时间Jumpbegin ', Jumpbegin)
  // console.log('触发事件:结束时间Jumpend', Jumpend)
  // console.log('触发事件：变电站', JumpSta)

  document.getElementById('Jump1').value = JumpUUID
  // document.getElementById('Jump2').value = Jumpbegin
  document.getElementById('Jump2').value = Jumpend
  document.getElementById('Jump3').value = JumpSta
  document.getElementById('Jump4').value = Jumpbegin

  window.parent.JumpMidSta()
}
