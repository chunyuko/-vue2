let vm = null
let TimeDiv = null
let pageDiv = null
let playtime = null
var timerwork
var playspeed = 1000 //用来设置倍速
// var arrDevStrId = []
var arrDevStr = [] //组合后的点位

var arrcameraId = [] //所选摄像机ID

var arrcameraType = [] //所选摄像机ID

var StartTime
var EndTime
var CameraID
var CameraType
var prelist

var nginxPort = 11001
var videoUrl = 'http://' + window.location.hostname

var PlaybackStUrl //video iframe的播放以及关闭的src地址
var count = 0 //放在这里不会使得每页都是1-10而会在第二页显示11-20
window.addEventListener('message', function (e) {
  massagestationID = e.data
  console.log('massagestationID---massagestationID-0--', massagestationID)
})
setTimeout(() => {
  InitPage()
}, 100)

function InitPage() {
  TreeVue()
  PageVue()
  TimeVue()
  playtimeVue()

  pageDiv.total = 0 ///总条数【假数据 or 初始值
  // window.addEventListener('message', function (e) {
  //   massagestationID = e.data
  //   console.log('massagestationID---massagestationID', massagestationID)

  //   TreeVue()
  // })

  document.getElementById('o0').src = '' + videoUrl + ':' + nginxPort + '/video0.html'
  console.log('iframe初始地址:', document.getElementById('o0').src)
}

function TreeVue() {
  vm = new Vue({
    el: '#TreeDiv',
    data() {
      return {
        // iconlevel: 'eee',
        filterText: '',
        treeData: [],
        defaultProps: {
          value: 'id',
          label: 'label',
          children: 'children',
          disabled: (data) => {
            if (data.level == 4) {
              return false
            }
            return true
          },
        },
        // icons: {
        //   category: 'categoryTreeIcons',
        //   table: 'tableIcon',
        //   class: 'classIcon',
        // },
      }
    },
    // created() {
    //   console.log('--------iiiiii----,')
    // },
    methods: {
      /*   handleNodeClick(data) {
        // console.log('handleNodeClick', data)
        if (data.level == 5) {
          // arrDevStrId.push(data.id)
          arrcameraId.push(data.cameraId)
          arrcameraType.push(data.cameraType)

          // arrDevStr.push(data.cameraId + '_' + data.cameraType)
          arrDevStr.push(data.dvrId + '_' + data.dvrChannel)
        }
      }, */
      handleCheckChange(data) {
        let res = this.$refs.tree.getCheckedNodes()
        let arr1 = []

        arrDevStr = [] //组合后的点位

        arrcameraId = [] //所选摄像机ID

        arrcameraType = [] //所选摄像机ID

        res.forEach((data) => {
          //选中节点数组构建
          if (data.level == 4) {
            arr1.push(data.id)
            arrcameraId.push(data.cameraId)
            arrcameraType.push(data.cameraType)
            arrDevStr.push(data.dvrId + '_' + data.dvrChannel)
            return
          }
        })
        // console.log('获取层级', arr1)

        let menuArr = this.unique(arr1) // 去除重复的节点
        /*   arrcameraId = this.unique(arrcameraId)  //不要去重，因为时一一对应的，去重会影响，尤其是arrcameraType
        arrcameraType = this.unique(arrcameraType)
        // console.log('???', arrcameraType)
        arrDevStr = this.unique(arrDevStr) */

        this.permissionIds = menuArr.join(',')
      },
      unique(arr) {
        let newArr = []
        let len = arr.length
        for (let i = 0; i < len; i++) {
          if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i])
          }
        }
        return newArr
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      },
    },
  })

  console.log('massagestationID---', massagestationID)
  $.post(
    '/api42/dalirobotcms/ajax/realTimeData.php',
    {
      task: 'getCameraTree',
      stationID: massagestationID,
    },
    function (res) {
      res = eval('(' + res + ')')
      if (res.code == 200) {
        console.log('treeData res', res)

        // var htmlInput = '<div class="zz">11</div>'
        // setTimeout(() => {
        /*   if (res.data[3]) {
          for (var i = 0; i < res.data[3].length; i++) {
            if (res.data[3][i].level == 4) {
              // console.log('0')
              // document.getElementsByClassName('eee').setAttribute('class', 'box')
              // document.getElementsByClassName('eee').innerHTML = htmlInput

              ddd(event)
              // qe.className = 'taot'
              // console.log('00', qe)

              // vm.iconlevel = 'w9ww'
              // debugger
            }
          }
        } */
        // }, 1000)

        // if (res.data[2]) {
        //   for (var i = 0; i < res.data[2].length; i++) {
        //     // console.log('4')
        //     // console.log('4', res.data[3][i])

        //     if (res.data[2][i].level == 3) {
        //       console.log('0000')
        //       vm.iconlevel = 'w9wwwwwwssssww'
        //     }
        //   }
        // }
        const treeData = handleDataToTree(res.data)
        vm.treeData = treeData
      } else {
        alert('数据返回失败')
      }
    }
  )
}

/* function ddd(event) {
  var event = event || e
  console.log('当前点击div的class', event.currentTarget.className) //获取id属性值
  // $("#s2id_status").children("a").children("span")
  console.log(
    '00:000:',
    document.getElementsByClassName('' + event.currentTarget.className + '').children('span')
  )
} */
function TimeVue() {
  TimeDiv = new Vue({
    el: '#TimeDiv',
    data: function () {
      return {
        endvalue: '',
        beginvalue: '',
      }
    },

    methods: {
      getdatetime() {
        this.endvalue = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        this.beginvalue = start
      },
      selectTime(val) {
        this.value = val
      },
      selectTime1(val1) {
        this.value1 = val1
      },
    },
    mounted() {
      let that = this
      that.getdatetime()
    },
  })
}

function PageVue() {
  pageDiv = new Vue({
    el: '#pageDiv',
    data: function () {
      return {
        currentPage: 1,
        size: 10, //每页条数
        total: '', //总条数【变量】
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        Tableinfo(val)
      },
    },
  })
}

/* 中国标准时间换成格式时间 */
function ChTrantime(ChTime) {
  var time = new Date(ChTime)
  if (time.getMonth() < 9) {
    var Month = '0' + (time.getMonth() + 1)
  } else {
    var Month = time.getMonth() + 1
  }
  if (time.getDate() < 10) {
    var day = '0' + time.getDate()
  } else {
    var day = time.getDate()
  }
  if (time.getHours() < 10) {
    var Hours = '0' + time.getHours()
  } else {
    var Hours = time.getHours()
  }
  if (time.getMinutes() < 10) {
    var Minutes = '0' + time.getMinutes()
  } else {
    var Minutes = time.getMinutes()
  }
  if (time.getSeconds() < 10) {
    var Seconds = '0' + time.getSeconds()
  } else {
    var Seconds = time.getSeconds()
  }

  var ChTime =
    time.getFullYear() + '-' + Month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds

  return ChTime
}
/* 查询录像总数 */
function searchData() {
  console.log('查询录像总数:DevStr', arrDevStr.toString())
  console.log('查询录像总数:beginvalue', ChTrantime(TimeDiv.beginvalue))
  console.log('查询录像总数:endvalue', ChTrantime(TimeDiv.endvalue))
  pageDiv.currentPage = 1
  $.post(
    '/api42/dalirobotcms/ajax/nvrrecsearch.php',
    {
      task: 'NVRRecTotal',
      DevStr: arrDevStr.toString(),
      // DevStr: arrDevStr.toString(),//有数据的摄像机：DLM-T-4S30-171.96

      BeginTime: ChTrantime(TimeDiv.beginvalue),
      EndTime: ChTrantime(TimeDiv.endvalue),
    },
    function (res) {
      res = eval('(' + res + ')')
      console.log('查询录像总数  --res', res)
      console.log('查询录像 总数量res', res.TotalNum)
      pageDiv.total = eval(res.TotalNum) //总条数  //res.TotalNum是字符串，pageDiv.total是变量，所以这里需要统一，在此是将字符串改成变量
      if (res.TotalNum > 0) {
        //在有数据的情况下
        /* 查询录像数据 */
        console.log('res.TotalNum在有数据的情况下,开始执行列表获取')
        Tableinfo(1)
      } else {
        pageDiv.total = 0
        $('#tablecreate tbody').empty()
      }
    }
  )
}
function Tableinfo(page) {
  var fistpag = 10 * page - 9
  var endpag = fistpag + 9
  count = fistpag - 1
  // console.log('fistpag', fistpag)
  // console.log('endpag', endpag)
  // console.log('count', count)

  $.post(
    '/api42/dalirobotcms/ajax/nvrrecsearch.php',
    {
      task: 'NVRRecSearch',
      StartNum: fistpag,
      EndNum: endpag, //分页 or 滑动显示条数
    },
    function (res) {
      // console.log('录像数据(表格) 0 --res', res) //取数据StartTime：开始时间 + EndTime：结束时间
      res = eval('(' + res + ')')
      console.log('录像数据(表格)  --res', res) //取数据StartTime：开始时间 + EndTime：结束时间
      //数据准备好后，写入表格
      // if (res != '') {
      let temp = ''

      $('#tablecreate tbody').empty()
      for (let path of res) {
        count++
        /* 拿列表获取数据的信息对比树选中节点的信息对比 获取摄像机ID和Type */
        var prelist = path.NVRID + '_' + path.ChannelID
        var curcameraId
        var curcameraType
        // console.log('prelist', prelist)
        // console.log('arrDevStr', arrDevStr)
        // console.log('arrcameraId', arrcameraId)
        // console.log('arrcameraType', arrcameraType)
        /* 用来自己对比摄像机树选中节点和列表获取 */
        for (var i = 0; i < arrDevStr.length; i++) {
          if (prelist == arrDevStr[i]) {
            // console.log('列表中该行数据对应的序号', i)
            // console.log('列表中该行数据对应的cameraId', arrcameraId[i])
            // console.log('列表中该行数据对应的cameraType', arrcameraType[i])
            curcameraId = arrcameraId[i]
            curcameraType = arrcameraType[i]
          }
        }
        console.log('curcameraId curcameraType:', curcameraId, curcameraType)
        /*  */
        temp +=
          '<tr ondblclick ="videoGet(this)">' + //双击触发函数
          '<td>' +
          count +
          "<input name='curcameraId' type='hidden' value='" +
          curcameraId +
          "' style='display:none'/>" +
          "<input name='curcameraType' type='hidden' value='" +
          curcameraType +
          "' style='display:none'/>" +
          "<input name='prelist' type='hidden' value='" +
          prelist +
          "' style='display:none'/>" +
          '</td>' + //条数
          '<td>' +
          path.StartTime +
          "<input name='StartTime' type='hidden' value='" +
          path.StartTime +
          "' style='display:none'/>" +
          '</td>' + //开始时间
          '<td>' +
          path.EndTime +
          "<input name='EndTime' type='hidden' value='" +
          path.EndTime +
          "' style='display:none'/>" +
          '</td>' + //结束时间
          '</tr>'
      }
      $('#tablecreate tbody').append(temp)
      // }
    }
  )
}
/* 双击表格数据获取视频回放流 【还是 检索按钮 就能同步出现】*/
function videoGet(obj) {
  StartTime = $(obj).closest('tr').find("input[name='StartTime']").val()
  EndTime = $(obj).closest('tr').find("input[name='EndTime']").val()
  CameraID = $(obj).closest('tr').find("input[name='curcameraId']").val()
  CameraType = $(obj).closest('tr').find("input[name='curcameraType']").val()

  console.log('获取视频回放流:CameraID', CameraID) //这里不对，现在是获取表格时获取的所有CameraID，实际上应该是双击列表那条的CameraID
  console.log('获取视频回放流:CameraType', CameraType) //和CameraID一样，需要在列表数据获取的接口返回参数中含有
  console.log('获取视频回放流:StartTime', StartTime)
  console.log('获取视频回放流:EndTime', EndTime)

  /* 用于录像下载的参数NVRID+ChannelID */

  prelist = $(obj).closest('tr').find("input[name='prelist']").val()

  /*  */
  $.post(
    '/api42/dalirobotcms/ajax/getCameraStreamUrl.php',
    {
      task: 'GetCameraStreamPlaybackUrl',
      CameraID: CameraID,
      CameraType: CameraType, //0 红外 1：可见光
      StreamType: 0, //0：主码流 1：子码流
      StartTime: StartTime,
      EndTime: EndTime,
    },
    function (res) {
      res = eval('(' + res + ')')
      console.log('获取视频回放流  --res', res)

      console.log('获取视频回放流res.StreamUrl', res.StreamUrl)
      PlaybackStUrl = res.StreamUrl
      document.getElementById('o0').src =
        videoUrl + ':' + nginxPort + '/live?port=1935&app=live&stream=' + PlaybackStUrl //iframe地址src
    }
  )
}

/* 【以下：暂时不知道放哪里用的接口函数】 */

/* 视频停止回放【】 */
function videoStop() {
  console.log('停止回放:CameraID', arrcameraId.toString())
  $.post(
    '/api162/dalirobotcms/ajax/getCameraStreamUrl.php',
    {
      task: 'StopPlayback',
      CameraID: arrcameraId.toString(),
    },
    function (res) {
      res = eval('(' + res + ')')
      console.log('停止回放 --res', res)
      PlaybackStUrl = ''
      document.getElementById('o0').src = PlaybackStUrl //iframe地址src
    }
  )
}

/* 视频暂停与播放 */
function Pause() {
  var numb = document.getElementById('catchStop').getAttribute('src')
  // console.log('111--', numb)
  if (numb == '../patrol/img/操作4.png') {
    /*  $.post(
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
    ) */
    document.getElementById('catchStop').setAttribute('src', '../patrol/img/操作1.png')
    $('#catchStop').attr('title', '暂停')

    console.log('jishi')
    console.log('playspeed', playspeed)
    timerwork = setInterval(function () {
      playtime.changeTime()
    }, playspeed)
  }
  if (numb == '../patrol/img/操作1.png') {
    console.log('zhongjie')
    clearInterval(timerwork)

    /*  $.post(
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
    ) */
    document.getElementById('catchStop').setAttribute('src', '../patrol/img/操作4.png')
    $('#catchStop').attr('title', '播放')
  }
}

/* 秒转换为时分秒 [和playtime.formatTooltip(val)一样的功能]*/
// function formatSeconds(value) {
//   var secondTime = parseInt(value) // 秒
//   var minuteTime = 0 // 分
//   var hourTime = 0 // 小时
//   if (secondTime >= 60) {
//     minuteTime = parseInt(secondTime / 60)
//     secondTime = parseInt(secondTime % 60)
//     if (minuteTime >= 60) {
//       hourTime = parseInt(minuteTime / 60)
//       minuteTime = parseInt(minuteTime % 60)
//     }
//   }
//   var result = '' + (parseInt(secondTime) < 10 ? '0' + parseInt(secondTime) : parseInt(secondTime))

//   result =
//     '' +
//     (parseInt(minuteTime) < 10 ? '0' + parseInt(minuteTime) : parseInt(minuteTime)) +
//     ':' +
//     result
//   result =
//     '' + (parseInt(hourTime) < 10 ? '0' + parseInt(hourTime) : parseInt(hourTime)) + ':' + result
//   return result
// }

/* 时分秒转化为秒 */
function timeEvent(e) {
  var time = e
  var len = time.split(':')
  if (len.length == 3) {
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    var sec = time.split(':')[2]
    return Number(hour * 3600) + Number(min * 60) + Number(sec)
  }
  if (len.length == 2) {
    var min = time.split(':')[0]
    var sec = time.split(':')[1]
    return Number(min * 60) + Number(sec)
  }
  if (len.length == 1) {
    var sec = time.split(':')[0]
    return Number(sec)
  }
}
/* 播放进度条 */
function playtimeVue() {
  var sta = 25200 //视频开始时间
  var statime = '07:00:00' //视频开始时间

  var end = 36000 //视频结束时间
  var endtime = '10:00:00' //视频结束时间
  var cur = 28200 //视频播放的开始时间
  playtime = new Vue({
    el: '#PlayTime',
    data: function () {
      return {
        workTime: cur, //值范围单位是秒，从0计算小时分钟秒,这里和changeTime函数要注意，这里不赋值changeTime直接赋值cur再加计时器即表示从cur开始播放，这里赋值即表示一开始的播放位置
        max: end,
        min: sta,
        marks: {
          [sta]: {
            style: {
              width: '36px',
              color: '#1989FA',
              // left: '1%',
            },
            label: '' + statime + '',
          },
          /* 480: {
            style: {
              color: '#1989FA',
            },
            label: this.$createElement('strong', '08:00'),
          }, */
          [end]: {
            style: {
              width: '36px',
              color: '#1989FA',
              // left: '98%',
            },
            label: '' + endtime + '',
          },
        },
      }
    },
    /*     mounted() {},

    watch: {}, */
    methods: {
      formatTooltip(val) {
        let hour = 0
        let min = 0
        let sec = 0
        hour = parseInt(val / 3600)
        if (hour < 10) {
          hour = '0' + hour.toString()
        } else {
          hour = hour.toString()
        }
        min = parseInt((val - hour * 3600) / 60)
        if (min < 10) {
          min = '0' + min.toString()
        } else {
          min = min.toString()
        }

        sec = val - hour * 3600 - min * 60
        if (sec < 10) {
          sec = '0' + sec.toString()
        } else {
          sec = sec.toString()
        }
        let time = hour + ':' + min + ':' + sec
        this.workTime = time
        console.log(time)
        return time
      },

      currentTime(val) {
        // console.log('currentTime', val)
        // console.log('currentTimethis.workTime', this.workTime)

        console.log('拖拽进度条位置 now', val)
      },

      changeTime() {
        // console.log('this.workTime 0:', playspeed) //这里应该不需要对playspeed进行处理吧
        cur = timeEvent(this.workTime)
        this.workTime = cur
        cur += 1
        this.workTime = cur
        // console.log('workTime-', this.workTime)

        /* 视频播放结束 */
        if (this.workTime == end) {
          console.log('视频播放结束')
          clearInterval(timerwork)
          document.getElementById('catchStop').setAttribute('src', '../patrol/img/操作4.png')
          $('#catchStop').attr('title', '播放')
          return
        }
      },
    },
  })
}

/* 视频播放倍速设置 */
function speedSelect(event) {
  var event = event || e
  console.log('当前点击div的id', event.currentTarget.id) //获取id属性值
  console.log('当前点击div的id', document.getElementById(event.currentTarget.id).innerText)
  console.log(
    '当前点击div的id--',
    document.getElementById(event.currentTarget.id).getAttribute('value')
  ) //div没有value属性,需要使用.getAttribute('value')获取

  document.getElementById('speedtext').innerText = document
    .getElementById(event.currentTarget.id)
    .getAttribute('value')

  playspeed = 1000 / document.getElementById(event.currentTarget.id).getAttribute('value')
  Pause()
  Pause() //执行两次，实现播放进行中的倍速调整
}

/* 下载录像【录像下载进度和停止下载页要吗？要的话如何显示】 */
function videoDownload() {
  console.log('当前点击的是录像下载')

  console.log('下载录像:NVRChannelID', prelist) //双击列表数据获取到的
  // console.log('下载录像:FileName', FileName) //固定接口传参值吗【？？】

  $.post(
    '/api162/dalirobotcms/ajax/nvrrecsearch.php',
    {
      task: 'NVRRecDownload',
      NVRChannelID: prelist, //列表数据返回的参数 NVRID+"_"+ChannelID
      FileName: '10',
    },
    function (res) {
      res = eval('(' + res + ')')
      console.log('录像下载 --res', res)
    }
  )
}

/* 抓图 */
function videoPic() {
  console.log('当前点击的是 抓图')

  console.log('抓图:cameraID', CameraID) //双击列表数据获取到的
  console.log('抓图:cameraType', CameraType)

  $.post(
    '/api42/dalirobotcms/ajax/captureAndRecord.php',
    {
      task: 'captureImg',
      cameraID: CameraID, //列表数据返回的参数 NVRID+"_"+ChannelID
      cameraType: CameraType,
    },
    function (res) {
      res = eval('(' + res + ')')
      console.log('抓图 --res', res)
    }
  )
}
