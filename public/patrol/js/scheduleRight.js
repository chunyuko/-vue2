setTimeout(Init, 500)
// vue 实例对象
let vm = null
let PageT
let begin = null

function CreateHTMLele() {
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

function Init() {
  initApp()
  initpage()
  aaa()
  initbegin()
  // GetTaskNum()
  ele_init('InspectionType', 3, 'InspectionType', {
    OP: RunPathType_s,
    CSS: 'patrolSta_checkbox',
  })
}

function initApp() {
  vm = new Vue({
    el: '#app',
    data: function () {
      return {
        value1: [],
        begin: '',
        end: '',
      }
    },
    created() {
      this.getCurrentMonthFirst()
      this.getCurrentMonthLast()
    },
    methods: {
      // getdatetime() {
      //   this.end = new Date()
      //   const start = new Date()
      //   start.setTime(start.getTime() - 3600 * 1000 * 24 * 12)
      //   this.begin = start

      //   console.log('--获取时间选择器---shijian-1111--', new Date())
      //   console.log('--获取时间选择器---shijian--1111-start', start)

      //   this.value1[0] = this.formatDate(this.begin)
      //   this.value1[1] = this.formatDate(this.end)
      //   console.log('--获取时间选择器---shijian-1111--value1', this.value1)
      // },
      // formatDate(date) {
      //   var myyear = date.getFullYear()
      //   var mymonth = date.getMonth() + 1
      //   var myweekday = date.getDate()

      //   if (mymonth < 10) {
      //     mymonth = '0' + mymonth
      //   }
      //   if (myweekday < 10) {
      //     myweekday = '0' + myweekday
      //   }
      //   return myyear + '-' + mymonth + '-' + myweekday
      // },

      getCurrentMonthFirst() {
        var date = new Date()
        // console.log('时间选择器修改触发begin，date', date)

        date.setDate(1)
        var month = parseInt(date.getMonth() + 1)
        var day = date.getDate()

        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()

        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        this.begin = date.getFullYear() + '-' + month + '-' + day + ' ' + '00:00:00'
        // date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second

        this.value1[0] = this.begin
      },
      getCurrentMonthLast() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        var day = new Date(year, month, 0)
        this.end = year + '-' + month + '-' + day.getDate() + ' ' + '00:00:00'
        this.value1[1] = this.end
      },

      selectTime() {
        if (this.value1 != '' && this.value1 != null) {
          // var year = this.value1[0].getFullYear()
          // var month = this.value1[0].getMonth() + 1

          this.begin = this.value1[0]
          this.end = this.value1[1]
        } else {
          this.begin = ''
          this.end = ''
        }
        // console.log('时间选择器修改触发begin，', this.value1[0])
        // console.log('时间选择器修改触发end，', this.end)
      },
    },
    // mounted() {
    //   let that = this
    //   that.getdatetime()
    // },
  })
}

// function GetTaskNum() {
//   //表格数据显示条数，加载内容太大，所以根据条数指定显示具体页码的数据
//   var StationVal = window.parent.document.getElementById('Station').value
//   console.log('变电站111', StationVal)
//   if (StationVal == '') {
//     console.log('父页面变电站未进行选择，此时为默认选中的第一个变电站')
//     StationVal = $(window.parent.document).find('#Station option:first').val()
//     // var aa=window.parent.document.$('#Station option:first').val();
//     // console.log("父页面变电站未进行选择，此时为默认选中的第一个变电站",$(window.parent.document).find('#Station option:first').val())
//   }
//   console.log('最终传值的变电站', StationVal)
//   $.post(
//     '/api162/dalirobotcms/ajax/queryinspectionlog.php',
//     {
//       task: 'query',
//       PageNow: '',
//       pageNum: '15',
//       BeginTime: '',
//       EndTime: '',
//       StationID: StationVal,
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

// function GetTaskPath(page) {
//   var StationVal = window.parent.document.getElementById('Station').value
//   console.log('变电站111', StationVal)
//   if (StationVal == '') {
//     console.log('父页面变电站未进行选择，此时为默认选中的第一个变电站')
//     StationVal = $(window.parent.document).find('#Station option:first').val()
//     // var aa=window.parent.document.$('#Station option:first').val();
//     // console.log("父页面变电站未进行选择，此时为默认选中的第一个变电站",$(window.parent.document).find('#Station option:first').val())
//   }
//   console.log('最终传值的变电站', StationVal)
//   $.post(
//     '/api162/dalirobotcms/ajax/queryinspectionlog.php',
//     {
//       task: 'query',
//       PageNow: page,
//       pageNum: '15',

//       BeginTime: '',
//       EndTime: '',
//       StationID: StationVal,
//       Task_Path_Desc: '',
//       InspectType: '',
//       TaskStation: '',
//       Is_Deal: '',
//     },
//     function (res) {
//       // console.log("11数据初始化：",res)
//       res = JSON.parse(res)
//       console.log('00数11据初始化：', res)
//       var count = 0
//       for (let path of res) {
//         count++

//         if (path.RunPragress == '') {
//           var RunPrag = '<span>00.00</span>'
//         } else {
//           var RunPrag = '<span></span>'
//         }

//         //确定一下TaskStation任务状态这里是：1-6还是0-5
//         if (path.TaskStation == 1) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: black; height:5px;width: 18px;border-radius: 5px;'></div><span> 已执行</span>"
//           var lastCow1 = '<span> </span>'
//           var lastCow2 = '<span> </span>'
//         } else if (path.TaskStation == 2) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: #31cb72; height:5px;width: 18px;border-radius: 5px;'></div><span> 正在执行</span>"
//           var lastCow1 = "<img  src='img/操作1.png' alt='' title='暂停' onclick='Pause(this)'/>"
//           var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
//         } else if (path.TaskStation == 3) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: #f8c335; height:5px;width: 18px;border-radius: 5px;'></div><span> 暂停</span>"
//           var lastCow1 = "<img src='img/操作4.png' alt='' onclick='Pause(this)' title='继续'/>"
//           var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
//           // 这里为了测试所以lastCow数据乱了，记得改回来
//         } else if (path.TaskStation == 4) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: #817271; height:5px;width: 18px;border-radius: 5px;'></div><span> 终止</span>"
//           var lastCow1 = '<span> </span>'
//           var lastCow2 = '<span> </span>'
//         } else if (path.TaskStation == 5) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: #3271f8; height:5px;width: 18px;border-radius: 5px;'></div><span> 未执行</span>"
//           var lastCow1 = '<span> </span>'
//           var lastCow2 = '<span> </span>'
//         } else if (path.TaskStation == 6) {
//           var TaskSta =
//             "<div style='display: inline-block;background-color: #fc3131; height:5px;width: 18px;border-radius: 5px;'></div><span> 超期</span>"
//           var lastCow1 = '<span> </span>'
//           var lastCow2 = '<span> </span>'
//         } else {
//           var TaskSta = '<span> 出现错误 请检查</span>'
//           var lastCow1 = '<span> </span>'
//           var lastCow2 = '<span> </span>'
//         }

//         if (path.InspectType == 0) {
//           var PaTy = '<span> 全面巡检</span>'
//         } else if (path.InspectType == 1) {
//           var PaTy = '<span> 特殊巡检</span>'
//         } else if (path.InspectType == 2) {
//           var PaTy = '<span> 专项巡视</span>'
//         } else if (path.InspectType == 3) {
//           var PaTy = '<span> 自定义巡视</span>'
//         } else if (path.InspectType == 4) {
//           var PaTy = '<span> 熄灯巡视</span>'
//         } else if (path.InspectType == 5) {
//           var PaTy = '<span> 例行巡视</span>'
//         } else if (path.InspectType == 6) {
//           var PaTy = '<span> 静默任务</span>'
//         } else {
//           var PaTy = '<span> 出现错误 请检查</span>'
//         }

//         if (path.Is_Deal == 0) {
//           var IsDeal = "<img src='img/任务错误.png' alt=''  title='任务错误' />"
//         } else if (path.Is_Deal == 1) {
//           var IsDeal = "<img src='img/任务正确.png' alt=''  title='任务正确' />"
//         } else {
//           var IsDeal = '<span> 出现错误 请检查</span>'
//         }

//         tbody.innerHTML +=
//           '<tr>' +
//           '<td>' +
//           "<input name='Id' type='radio' value='" +
//           path.Task_Path_Id +
//           "' />" +
//           '</td>' +
//           '<td>' +
//           count +
//           "<input name='UUIDId' type='hidden' value='" +
//           path.UUID +
//           "' style='display:none'/>" +
//           '</td>' /* 序号 */ +
//           // '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
//           '<td>' +
//           "<div class='tmp' title='" +
//           path.Task_Path_Desc +
//           "'><span>" +
//           path.Task_Path_Desc +
//           '</span></div> ' +
//           '</td>' /* 任务名称 */ +
//           // '<td>' + path.Start_Time + '</td>' +/*   时间 */
//           '<td>' +
//           "<div class='tmptime' title='" +
//           path.Start_Time +
//           "'><span>" +
//           path.Start_Time +
//           '</span></div> ' +
//           '</td>' /* 任务名称 */ +
//           '<td>' +
//           TaskSta +
//           '&nbsp&nbsp' +
//           path.RunPragress +
//           RunPrag +
//           '%' +
//           '</td>' /* 任务状态 */ +
//           '<td>' +
//           PaTy +
//           '</td>' /* 巡视类型 */ +
//           '<td>' +
//           IsDeal +
//           '</td>' /* 结果 */ +
//           '<td>' +
//           lastCow1 +
//           "&nbsp&nbsp&nbsp<img src='img/操作2.png' alt='' onclick='LookAtTest(this);' title='详情'/>&nbsp&nbsp&nbsp" +
//           lastCow2 +
//           '</td>' +
//           '</tr>'
//       }
//       // console.log("页码page",page)
//       // if(page==1){
//       //     GetTaskPath(2)
//       // }
//       // if(page==2){
//       //     GetTaskPath(3)
//       // }
//       // if(page==3){
//       //     GetTaskPath(4)
//       // }

//       // var a = document.getElementById("tbody").getElementsByTagName("tr");
//       // var zz =new Array(a.length);
//       // for(var i=0;i<a.length;i++)
//       // { zz[i]=a[i].innerHTML } //div的字符串数组付给zz
//       // var pageno=1;               //当前页
//       // var pagesize=15;            //每页多少条信息
//       // if(zz.length%pagesize==0)
//       // {var  pageall =zz.length/pagesize }
//       // else
//       // {var  pageall =parseInt(zz.length/pagesize)+1}
//       // console.log("页面总数",pageall)      //一共多少页
//       // $("#p").text(pageall);      //将pageall的值存放到div中，便于下次使用
//       // change(1,pageall,zz);
//     }
//   )
// }

function aaa(page) {
  var begin = vm.begin
  var end = vm.end
  // console.log('begin ', begin)
  // console.log('end', end)

  // console.log(
  //   'ceshi默认初始表格获取时shijian的值getCurrentMonthFirst309',
  //   vm.getCurrentMonthFirst()
  // )

  // console.log('ceshi默认初始表格获取时shijian的值getCurrentMonthLast309', vm.getCurrentMonthLast())

  var Intype = window.parent.document.getElementsByName('InspectionType_c')
  var IntypeVal = []
  for (var i = 0; i < Intype.length; i++) {
    if (Intype[i].checked) {
      IntypeVal.push(Intype[i].value)
    }
  }
  IntypeVal = IntypeVal.toString()
  // console.log('任务类型', IntypeVal)

  var TaskSta = window.parent.document.getElementsByName('TaskStation_c')
  var TaskStaVal = []
  for (var i = 0; i < TaskSta.length; i++) {
    if (TaskSta[i].checked) {
      TaskStaVal.push(TaskSta[i].value)
    }
  }
  TaskStaVal = TaskStaVal.toString()
  // console.log('执行状态', TaskStaVal)

  var StationVal = window.parent.document.getElementById('Station').value
  // console.log('变电站', StationVal)
  if (StationVal == '-1') {
    $('#DataTable tbody').empty()
    alert('请选择变电站')
    return
  }

  var TaskNameVal = window.parent.document.getElementById('TaskName').value
  // console.log('搜索页面查询输入的任务名称值', TaskNameVal)
  // console.log('搜索页面查询输入的StationVal', StationVal)

  var arrIntype = [0, 1, 2, 3, 4, 5, 6]
  if (IntypeVal == '') {
    IntypeVal = arrIntype
  }
  IntypeVal = IntypeVal.toString()

  // $.post(
  //   '/api162/dalirobotcms/ajax/querytaskscheduleGrid.php',
  //   {
  //     task: 'query',
  //     PageNow: '',
  //     pageNum: '15',
  //     BeginTime: begin,
  //     EndTime: end,
  //     StationID: StationVal,
  //     Task_Path_Desc: TaskNameVal,
  //     InspectType: IntypeVal,
  //     TaskStation: TaskStaVal,
  //     Is_Deal: '',
  //   },
  //   function (res) {
  //     res = JSON.parse(res)
  //     console.log('chaxun数11据--------0000000000000----------0000：', res)
  //     PageT.totalnum = res.length
  //   }
  // )
  $.post(
    '/api162/dalirobotcms/ajax/querytaskscheduleGrid.php',
    {
      task: 'query',
      PageNow: page,
      pageNum: '15',
      BeginTime: begin,
      EndTime: end,
      StationID: StationVal,
      Task_Path_Desc: TaskNameVal,
      InspectType: IntypeVal,
      TaskStation: TaskStaVal,
      Is_Deal: '',
    },
    function (res) {
      res = JSON.parse(res)
      // console.log('chaxun数11据：', res)
      // console.log('chaxun数11据--------0000000000000----------0000：', res)

      $('#DataTable tbody').empty()
      PageT.currentPage = page
      // console.log('chaxun数11据--------0000000000000---- PageT.currentPage0：', PageT.currentPage)

      let temp = ''
      var count = 0

      if (page) {
        //   console.log('00--00--0--0--0---')
        // PageT.totalnum = res[res.length - 1].totalpages
      } else {
        // console.log('00--00--0--09-999999--0---')

        PageT.totalnum = res.length //条数
      }

      // console.log('chaxun数11据--------0000000000000----------0000：totalnum', PageT.totalnum)

      for (let path of res) {
        count++
        if (path.RunPragress == '') {
          var RunPrag = '<span>00.00</span>'
        } else {
          var RunPrag = '<span></span>'
        }
        if (path.TaskStation == 1) {
          var TaskSta =
            "<div style='display: inline-block;background-color: black; height:5px;width: 18px;border-radius: 5px;'></div><span> 已执行</span>"
          var lastCow1 = '<span> </span>'
          var lastCow2 = '<span> </span>'
        } else if (path.TaskStation == 2) {
          var TaskSta =
            "<div style='display: inline-block;background-color: #31cb72; height:5px;width: 18px;border-radius: 5px;'></div><span> 正在执行</span>"
          var lastCow1 = "<img src='img/操作1.png' alt='' title='暂停' onclick='Pause(this)'/>"
          var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
        } else if (path.TaskStation == 3) {
          var TaskSta =
            "<div style='display: inline-block;background-color: #f8c335; height:5px;width: 18px;border-radius: 5px;'></div><span> 暂停</span>"
          var lastCow1 = "<img src='img/操作4.png' alt='' onclick='Pause(this)' title='继续'/>"
          var lastCow2 = "<img src='img/操作3.png' alt='' title='终止' onclick='Finish(this)'/>"
          // 这里为了测试所以lastCow数据乱了，记得改回来
        } else if (path.TaskStation == 4) {
          var TaskSta =
            "<div style='display: inline-block;background-color: #817271; height:5px;width: 18px;border-radius: 5px;'></div><span> 终止</span>"
          var lastCow1 = '<span> </span>'
          var lastCow2 = '<span> </span>'
        } else if (path.TaskStation == 5) {
          var TaskSta =
            "<div style='display: inline-block;background-color: #3271f8; height:5px;width: 18px;border-radius: 5px;'></div><span> 未执行</span>"
          var lastCow1 = '<span> </span>'
          var lastCow2 = '<span> </span>'
        } else if (path.TaskStation == 6) {
          var TaskSta =
            "<div style='display: inline-block;background-color: #fc3131; height:5px;width: 18px;border-radius: 5px;'></div><span> 超期</span>"
          var lastCow1 = '<span> </span>'
          var lastCow2 = '<span> </span>'
        } else {
          var TaskSta = '<span> 出现错误 请检查</span>'
          var lastCow1 = '<span> </span>'
          var lastCow2 = '<span> </span>'
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

        if (path.Is_Deal == 0) {
          var IsDeal = "<img src='img/任务错误.png' alt=''  title='任务错误' />"
        } else if (path.Is_Deal == 1) {
          var IsDeal = "<img src='img/任务正确.png' alt=''  title='任务正确' />"
        } else {
          var IsDeal = '<span> 出现错误 请检查</span>'
        }

        var nowData = new Date(path.Start_Time * 1000)
        var StaTime =
          nowData.toLocaleDateString().replace(/\//g, '-') +
          ' ' +
          nowData.toTimeString().slice(0, 9)

        // const nowDataEnd = new Date(res.End_Time * 1000)
        // res.End_Time =nowData.toLocaleDateString().replace(/\//g, '-') + ' ' + nowDataEnd.toTimeString().slice(0, 9)

        temp +=
          '<tr  ondblclick ="ondblJump(this)" >' +
          '<td>' +
          "<input name='Id' type='radio' value='" +
          path.Task_Path_Id +
          "' />" +
          '</td>' +
          '<td>' +
          // "<div style=' width: 80%;height: 100%;margin-left: -10px;background: #ff00002e;' onclick='ondblJump()'>" +
          count +
          // ' </div>' +
          // +
          // "<input style='opacity:0; width: 80%;height: 100%;margin-left: -10px;background: #ff00002e;' onclick='ondblJump()'/>" +
          "<input name='UUIDId' type='hidden' value='" +
          path.UUID +
          "' style='display:none'  />" +
          '</td>' /* 序号 */ +
          // '<td>' + path.Task_Path_Desc + '</td>' +    /* 任务名称 */
          '<td>' +
          "<div class='tmp' title='" +
          path.Task_Desc +
          "'><span>" +
          path.Task_Desc +
          '</span></div> ' +
          '</td>' /* 任务名称 */ +
          '<td>' +
          "<div class='tmptime' title='" +
          StaTime +
          "'><span>" +
          StaTime +
          '</span></div> ' +
          "<input name='End_Time' type='hidden' value='" +
          path.End_Time +
          "' style='display:none'  />" +
          "<input name='Start_Time' type='hidden' value='" +
          StaTime +
          "' style='display:none'  />" +
          '</td>' /* 任务名称 */ +
          // '<td>' + path.Start_Time + '</td>' +/*   时间 */
          '<td>' +
          TaskSta +
          '&nbsp&nbsp' +
          path.RunPragress +
          RunPrag +
          '%' +
          '</td>' /* 任务状态 */ +
          '<td>' +
          PaTy +
          '</td>' /* 巡视类型 */ +
          '<td>' +
          IsDeal +
          '</td>' /* 结果 */ +
          '<td>' +
          lastCow1 +
          "&nbsp&nbsp&nbsp<img src='img/操作2.png' alt='' onclick='LookAtTest(this);' title='详情'/>&nbsp&nbsp&nbsp" +
          lastCow2 +
          '</td>' +
          '</tr>'
      }
      $('#DataTable tbody').append(temp)
    }
  )
}
parent
  .$(window.parent.document)
  .find('#selectFun')
  .on('click', function () {
    aaa()
  })

parent
  .$(window.parent.document)
  .find('#purge')
  .on('click', function () {
    var Inscheckbox = window.parent.document.getElementsByName('InspectionType_c')
    for (var i = 0; i < Inscheckbox.length; i++) {
      Inscheckbox[i].checked = false
    }
    var Taskcheckbox = window.parent.document.getElementsByName('TaskStation_c')
    for (var i = 0; i < Taskcheckbox.length; i++) {
      Taskcheckbox[i].checked = false
    }
    window.parent.document.getElementById('TaskName').value = ''
    window.parent.document.getElementById('Station').value = -1
    // initApp()
    $('#DataTable tbody').empty()
    PageT.totalnum = 0
  })

function initbegin() {
  begin = new Vue({
    el: '#begin',
    data: function () {
      return {
        value1: '',
      }
    },
  })
}

var AddOrModifyTaskRuleFlag = 0
function hiddenparam() {
  AddOrModifyTaskRuleFlag = 0

  $_('paramwrap').style.display = 'none'
}

/* 暂停与继续 */
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

/* 添加任务的跳转 */
function jumpAdd() {
  //跳转修改
  document.getElementById('Jumptask').value = 1 //跳转条件
  window.parent.JumpMidtask()
  //原跳转写法
  // window.parent.location.href = 'pointIframe.html'
  // sessionStorage.setItem('from', 'shedulejump')
}

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
      // console.log('详情获取数据res', res)
      console.log('li详情获取数据res处理', res)
      const nowData = new Date(res.Start_Time * 1000)
      res.Start_Time =
        nowData.toLocaleDateString().replace(/\//g, '-') + ' ' + nowData.toTimeString().slice(0, 9)
      // console.log('详情获取数据res时间处理11', res.Start_Time)
      const nowDataEnd = new Date(res.End_Time * 1000)
      res.End_Time =
        nowData.toLocaleDateString().replace(/\//g, '-') +
        ' ' +
        nowDataEnd.toTimeString().slice(0, 9)

      console.log('li详情获取数据res处理11res.RunTime', res.RunTime)

      // 传入用户输入的数据
      let TranTime = getTime(res.RunTime)
      console.log('li详情获取数据res处理11TranTime', TranTime)

      // console.log(
      //   `输入的秒数是${res.RunTime}：，转换后是${TranTime[0]}时${TranTime[1]}分${TranTime[2]}秒`
      // )
      let ResRunTranTime = TranTime[0] + '时' + TranTime[1] + '分' + TranTime[2] + '秒'
      console.log('li详情获取数据res处理11TResRunTranTime', ResRunTranTime)

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
      window.parent.document.getElementById('Start_Time').innerHTML = res.Start_Time
      window.parent.document.getElementById('End_Time').innerHTML = res.End_Time
      window.parent.document.getElementById('AlarmDevCount').innerHTML = res.AlarmDevCount
      window.parent.document.getElementById('AlarmDevList').innerHTML = res.AlarmDevList
      window.parent.document.getElementById('InspectDevCount').innerHTML = res.InspectDevCount
      window.parent.document.getElementById('RunTime').innerHTML = ResRunTranTime //[秒数：数字需要转为几分几秒]
      window.parent.document.getElementById('ErrorCount').innerHTML = res.ErrorCount
      // window.parent.document.getElementById('ErrorDev').innerHTML = res.ErrorDev
      // window.parent.document.getElementById('InspectErrorCount').innerHTML = res.InspectErrorCount
      // window.parent.document.getElementById('InspectCount').innerHTML = res.InspectCount
      // window.parent.document.getElementById('AlreadyDealCount').innerHTML = res.AlreadyDealCount
      // window.parent.document.getElementById('NoDealCount').innerHTML = res.NoDealCount
      // window.parent.document.getElementById('UnInspectDev').innerHTML = res.UnInspectDev
      // window.parent.document.getElementById('ErrorInspectDev').innerHTML = res.ErrorInspectDev
      // window.parent.document.getElementById('CarDevNum').innerHTML = res.CarDevNum
    },
  })
  window.parent.$_('LookAt').style.display = DisBlock
}

/* 
var k;
function change(e,all,zu){  //初始时候，此时页面不提示已为第一页
    zz=zu;	
    var pagesize=15;   //每页多少条信息
    pageall=all;     //总页数
    pageno=e;        //当前页
    if(e <1)//如果输入页<1页
    { e=1;pageno=1}//就等于第1页 ， 当前页为1
    if(e>pageall)//如果输入页大于最大页
    {e=pageall;pageno=pageall}//输入页和当前页都=最大页
    document.getElementById("tbody").innerHTML="";//全部清空
    for(var i=0;i<pagesize;i++)
    {
        var div =document.createElement("tr");//建立div对象
        div.innerHTML=zz[(e-1)*pagesize+i];//建立显示元素
        document.getElementById("tbody").appendChild(div);//加入tbody中
        if(zz[(e-1)*pagesize+i+1]==null)//超出范围跳出
            break
    }
    var ye="";
    for(var j=1;j<=pageall;j++)
    {
        if(j<4){
            if(e==j)
            {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
            else
            {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
        }
        else if(j>=4){
            if(j<=(pageall-1)){
                if(e==j)
                {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
                else
                {ye=ye+" .... "}
            }
            else if(j>(pageall-1)){
                if(e==j)
                {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
                else
                {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
            
            }
            
        }
    }
    document.getElementById("a1").innerHTML=pageall;
    document.getElementById("a2").innerHTML=pageno;
    document.getElementById("a3").innerHTML=ye;
    k=zu;
}
function change1(e){
    zz=k;	
    var pagesize=15; 
    pageall=$("#p").text();
    pageno=e;
    if(e <1)//如果输入页<1页
    { e=1;pageno=1}//就等于第1页 ， 当前页为1
    if(e>pageall)//如果输入页大于最大页
    {e=pageall;pageno=pageall}//输入页和当前页都=最大页
    document.getElementById("tbody").innerHTML="";//全部清空
    for(var i=0;i<pagesize;i++)
    {
        var div =document.createElement("tr");//建立div对象
        div.innerHTML=zz[(e-1)*pagesize+i];//建立显示元素
        document.getElementById("tbody").appendChild(div);//加入tbody中
        if(zz[(e-1)*pagesize+i+1]==null)//超出范围跳出
            break
    }
    var ye="";
    for(var j=1;j<=pageall;j++)
    {
        if(j<4){
            if(e==j)
            {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
            else
            {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
        }
        else if(j>=4){
            if(j<=(pageall-1)){
                if(e==j)
                {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
                else
                {ye=ye+" .... "}
            }
            else if(j>(pageall-1)){
                if(e==j)
                {ye=ye+"<span><a href='javascript:void(0)' onclick='change1("+j+")' style='color:#fff;padding-left:5px;padding-right:5px;border:1px #1662ad solid'>"+j+"</a></span> "}
                else
                {ye=ye+"<a style='padding-left:5px;padding-right:5px;color:#1662ad;' href='javascript:void(0)' onclick='change1("+j+")'>"+j+"</a> "}
            }  
        }
    }
    document.getElementById("a1").innerHTML=pageall;
    document.getElementById("a2").innerHTML=pageno;
    document.getElementById("a3").innerHTML=ye;
}

 */

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

// /* 导出 */
// function toExcel(){
//     alert("daochu")
// }

// 同使用
var xhr = new XMLHttpRequest()
var formData = new FormData()
function toExcel() {
  var begin = vm.begin
  var end = vm.end
  // console.log('导出begin', begin)

  // console.log('导出end', end)

  var Intype = window.parent.document.getElementsByName('InspectionType_c')
  var IntypeVal = []
  for (var i = 0; i < Intype.length; i++) {
    if (Intype[i].checked) {
      IntypeVal.push(Intype[i].value)
    }
  }
  IntypeVal = IntypeVal.toString()
  // console.log('导出任务类型', IntypeVal)

  var TaskSta = window.parent.document.getElementsByName('TaskStation_c')
  var TaskStaVal = []
  for (var i = 0; i < TaskSta.length; i++) {
    if (TaskSta[i].checked) {
      TaskStaVal.push(TaskSta[i].value)
    }
  }
  TaskStaVal = TaskStaVal.toString()
  // console.log('导出执行状态', TaskStaVal)

  var StationVal = window.parent.document.getElementById('Station').value
  // console.log('导出变电站', StationVal)
  if (StationVal == '-1') {
    $('#DataTable tbody').empty()
    alert('请选择变电站')
    return
  }

  var TaskNameVal = window.parent.document.getElementById('TaskName').value
  // console.log('导出页面查询输入的任务名称值', TaskNameVal)
  // console.log('导出页面查询输入的StationVal', StationVal)

  var arrIntype = [0, 1, 2, 3, 4, 5, 6]
  if (IntypeVal == '') {
    IntypeVal = arrIntype
  }
  IntypeVal = IntypeVal.toString()

  formData.append('task', 'query')
  formData.append('PageNow', '')
  formData.append('StationID', StationVal)
  formData.append('BeginTime', begin)
  formData.append('EndTime', end)
  formData.append('Task_Path_Desc', TaskNameVal)
  formData.append('InspectType', IntypeVal)
  formData.append('TaskStation', TaskStaVal)
  formData.append('Is_Deal', '')
  formData.append('exportflag', 1)

  var url = '/api162/dalirobotcms/ajax/queryinspectionlog.php'
  xhr.open('POST', url, true)
  // xhr.responseType = "blob";
  xhr.onload = function (e) {
    // console.log('月历页面的导出情况e', e)
    var content = xhr.response
    // console.log('月历页面的导出情况', content)
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
  // var Jumpbegin = vm.begin
  // var Jumpend = vm.end
  var Jumpend = $(obj).closest('tr').find("input[name='End_Time']").val()
  const nowData = new Date(Jumpend * 1000)
  Jumpend =
    nowData.toLocaleDateString().replace(/\//g, '-') + ' ' + nowData.toTimeString().slice(0, 9)

  var JumpSta = window.parent.document.getElementById('Station').value

  var Jumpbegin = $(obj).closest('tr').find("input[name='Start_Time']").val()

  // console.log('触发事件:JumpUUID', JumpUUID)
  // console.log('触发事件:开始时间Jumpbegin ', Jumpbegin)
  // console.log('触发事件:结束时间Jumpend', Jumpend)
  // console.log('触发事件：变电站', JumpSta)

  // console.log('触发事件：变电站window.parent.location.href', window.parent.location.href)

  // window.parent.location.href = '../../src/views/manageInspectionResults/insResShowResults.vue'
  // console.log('触发事件：变电站window.parent.location.href1111', window.parent.location.href)

  // // D:\0__Robot\Robot\rampp\htdocs\Web_source code_JM\src\views\manageInspectionResults\insResShowResults.vue

  document.getElementById('Jump1').value = JumpUUID
  // document.getElementById('Jump2').value = Jumpbegin
  document.getElementById('Jump2').value = Jumpend
  document.getElementById('Jump3').value = JumpSta
  document.getElementById('Jump4').value = Jumpbegin

  // console.log('触发事件：变电站window.parent.location.href1111------')

  window.parent.JumpMidSta()
}
