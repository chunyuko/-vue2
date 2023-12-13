let vm = null
let TimeDiv = null
var beginT
var endT
var NumSelect
var arrPoint = []
var arrPic = [] //图片地址
var arrnum = [] //图片处理后的地址
var currentpage = 1
var massagestationID //接收的变电站值
// var arrr = []

var arrline1 = [] //点位识别结果存储数组
var arrline2 = []
var arrline3 = []
var arrline4 = []
var arrline5 = []
var arrline6 = []
var arrT1 = []
var arrT2 = []
var arrT3 = []
var arrT4 = []
var arrT5 = []
var arrT6 = []
var arrlineTittle = [] //标题名
var minTime
var maxTime
var menuArr = []
// var namearr = [] //图片框中的名称Picpointname
// var timearr = [] //图片框中的时间Pictime
// var statusarr = [] //图片框中的状态 Surestatus Picstatus

var nginxPort = 11001
var videoUrl = 'http://' + window.location.hostname

window.addEventListener('message', function (e) {
  massagestationID = e.data
  // console.log('shoudao传值::::::::::：', massagestationID)
})
setTimeout(() => {
  Init()
}, 50)

function Init() {
  /* 按钮 */

  document.getElementById('butt1').style.background = '#2b6ceb'
  document.getElementById('butt1').style.color = '#fff'
  document.getElementById('butt1').style.border = '1px solid #fff'

  // Test()
  TreeVue()
  TimeVue()
  serchSure()
  document.getElementById('totalpage').innerHTML = '1'
  document.getElementById('total').innerHTML = '1'

  document.getElementById('nowpage').innerHTML = currentpage

  document.getElementById('once').value = '1'

  // window.getStationInfo()

  // console.log('0:::', document.getElementById('4Picpointname_1').innerHTML)

  // arrPic = [
  //   'D:/DLFTP/1/2023/02/22/164-dltask/CCD/20854-grid_HBJMDL001_20230222140405.jpg',
  //   'D:/DLFTP/1/2023/02/22/162-dltask/CCD/20854-grid_HBJMDL001_20230222060405.jpg',
  //   'D:/DLFTP/1/2023/02/21/173-dltask/CCD/20854-grid_HBJMDL001_20230221221206.jpg',
  //   'D:/DLFTP/1/2023/02/21/164-dltask/CCD/20854-grid_HBJMDL001_20230221140304.jpg',
  //   'D:/DLFTP/1/2023/02/21/162-dltask/CCD/20854-grid_HBJMDL001_20230221060305.jpg',
  //   'D:/DLFTP/1/2023/02/20/173-dltask/CCD/20854-grid_HBJMDL001_20230220221205.jpg',
  // ]
  // UrlTran(arrPic[0])
}

/* 构建树 */
function TreeVue() {
  vm = new Vue({
    el: '#TreeDiv',

    data() {
      return {
        filterText: '',
        treeData: [],
        defaultProps: {
          value: 'id',
          label: 'label',
          children: 'children',
          disabled: (data) => {
            if (data.level == 5 || data.level == 6) {
              return false
            }
            return true
          },
        },
        // arrId: [],
      }
    },

    methods: {
      getCheckedNode() {
        let res = this.$refs.tree.getCheckedNodes()
        let arr = []
        res.forEach((item) => {
          arr.push(item.level)
        })
        menuArr = this.unique(arr) // 去除重复的节点
        // this.permissionIds = menuArr.join(',')
        console.log('menuArr,', menuArr)
        // console.log('arr,', this.permissionIds)
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
      /* 
       getCheckedNode() {
        let res = this.$refs.tree.getCheckedNodes()
        let arr = []
        res.forEach((item) => {
          arr.push(item.id)
        })
        let menuArr = this.unique(arr) // 去除重复的节点
        this.permissionIds = menuArr.join(',')
        console.log('menuArr,', menuArr)
        console.log('arr,', this.permissionIds)
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
      }, */
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

  // setTimeout(() => {
  //   console.log('massagestationID', massagestationID)
  // }, 500)
  console.log('massagestationID已传值的变电站', massagestationID)

  $.post(
    '/api162/dalirobotcms/ajax/realTimeData.php',
    {
      task: 'getDevListTree',
      stationID: massagestationID, //暂时写死，稍后修改
      GridDevType: 4, //1表计,2可见光,4红外,5声音
    },
    function (res) {
      res = eval('(' + res + ')')
      if (res.code == 200) {
        console.log('可见光点位树: res--', res)
        const treeData = handleDataToTree(res.data)
        vm.treeData = treeData
      } else {
        alert('数据返回失败')
      }
    }
  )
}
/* 时间选择器 */
function TimeVue() {
  TimeDiv = new Vue({
    el: '#Time',
    data: function () {
      return {
        value1: [],
      }
    },
    created() {
      this.getdatetime()
    },
    methods: {
      getdatetime() {
        this.value1[1] = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        this.value1[0] = start
      },
      selectTime() {
        if (this.value1 != '' && this.value1 != null) {
          this.begin = this.value1[0]
          this.end = this.value1[1]
        } else {
          this.begin = ''
          this.end = ''
        }
      },
    },
  })
}

function unique(arr) {
  let newArr = []
  let len = arr.length
  for (let i = 0; i < len; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
/* 图片地址获取 */
function resultPic(page) {
  // console.log('传参·图片地址获取beginT', beginT)
  // console.log('传参·图片地址获取endT', endT)
  // console.log('传参·图片地址获取page', page)
  // console.log('传参·图片地址获取NumSelect', NumSelect)
  console.log('传参·图片地址获取arrPoint  arrPoint.toString()', arrPoint.toString())

  $.post(
    '/api162/dalirobotcms/ajax/queryinspectionresult.php',
    {
      task: 'query',
      BeginTime: beginT,
      EndTime: endT,
      StationID: massagestationID, //暂时写死，稍后修改
      GridDevType: 4, //1表计,2可见光,4红外,5声音
      PageNow: page, //点击改变
      num_every_page: NumSelect, //4/6/9
      DevStr: arrPoint.toString(),
    },
    function (res) {
      // var dispathGrid
      res = eval('(' + res + ')')
      console.log('图片地址获取res', res)
      console.log('图片地址获取res', res.length)
      if (res == '') {
        $_('4Pic').style.display = 'none'
        $_('6Pic').style.display = 'none'
        $_('9Pic').style.display = 'none'
        document.getElementById('totalpage').innerHTML = '0'

        document.getElementById('total').innerHTML = '0'
        document.getElementById('nowpage').innerHTML = '1'
      } else {
        if (NumSelect == 4) {
          $_('4Pic').style.display = DisBlock
        } else if (NumSelect == 6) {
          $_('6Pic').style.display = DisBlock
        } else if (NumSelect == 9) {
          $_('9Pic').style.display = DisBlock
        }
        document.getElementById('totalpage').innerHTML = res[res.length - 1].totalpages
        document.getElementById('total').innerHTML = document.getElementById('totalpage').innerHTML
        if (res.length != NumSelect) {
          console.log('213--3-:')

          for (res.length; res.length < NumSelect; res.length++) {
            $_('' + NumSelect + 'rowpic_' + res.length + '').style.display = 'none'
            // console.log('213---:', $_('' + NumSelect + 'rowpic_' + res.length + ''))
          }
        }
        arrline1 = []
        arrline2 = []
        arrline3 = []
        arrline4 = []
        arrline5 = []
        arrline6 = []
        arrT1 = []
        arrT2 = []
        arrT3 = []
        arrT4 = []
        arrT5 = []
        arrT6 = []
        arrlineTittle = []
        minTime = new Date(res[0].Date_Time).getTime()
        maxTime = new Date(res[0].Date_Time).getTime()
        for (var i = 0; i < res.length; i++) {
          // /* --------- */
          console.log('yunxing运行测试--')
          // 折线图条数限制
          if (arrPoint.length < 7) {
            for (var j = 0; j < arrPoint.length; j++) {
              if (res[i].Device_Id == arrPoint[j]) {
                eval('arrline' + (1 + j)).push([
                  new Date(res[i].Date_Time).getTime(),
                  res[i].Inspection_Result.toString(),
                ])

                eval('arrT' + (1 + j)).push(res[i].fullDeviceDesc)
                console.log('yunxing运行测试--', eval('arrT' + (1 + j)))

                // eval('arrT' + (1 + j)) = unique(eval('arrT' + (1 + j)))
              }
            }
          }

          // arrlineTittle.push(res[i].fullDeviceDesc)
          // arrlineTittle = unique(arrlineTittle)
          if (maxTime < new Date(res[i].Date_Time).getTime()) {
            maxTime = new Date(res[i].Date_Time).getTime()
          }
          // 最小值
          if (minTime > new Date(res[i].Date_Time).getTime()) {
            minTime = new Date(res[i].Date_Time).getTime()
          }
          console.log('yunxing运行测试-1-', minTime)
          /* --------- */

          arrPic.push(res[i].Infrared_Cap) //图片地址数组
          // console.log('213---:')
          $_('' + NumSelect + 'rowpic_' + i + '').style.display = ''
          // console.log('213---:::::')

          // namearr.push(res[i].Infrared_Cap) //图片框中的名称Picpointname
          // timearr.push(res[i].Infrared_Cap) //图片框中的时间Pictime
          // statusarr.push(res[i].Infrared_Cap) //图片框中的状态 Surestatus Picstatus

          document.getElementById('' + NumSelect + 'Picpointname_' + i + '').innerHTML =
            res[i].fullDeviceDesc
          document.getElementById('' + NumSelect + 'Pictime_' + i + '').innerHTML = res[i].Date_Time
          document.getElementById('' + NumSelect + 'Picbutton_' + i + '').value = res[i].Device_Id

          if (res[i].Is_Deal == 0) {
            //未处理
            document.getElementById('' + NumSelect + 'Surestatus_' + i + '').innerHTML = '未确认'
          } else {
            //已处理
            document.getElementById('' + NumSelect + 'Surestatus_' + i + '').innerHTML = '已确认'
          }

          if (res[i].Inspection_Result.toString()[0] != 'E') {
            //未处理
            // console.log('============00', res[i].Inspection_Result.replace(/[.]?0+$/, ''))
            document.getElementById('' + NumSelect + 'Picstatus_' + i + '').innerHTML =
              res[i].Inspection_Result.replace(/[.]?0+$/, '') + ' &#8451'
          } else if (res[i].Inspection_Result.toString()[0] == 'E') {
            document.getElementById('' + NumSelect + 'Picstatus_' + i + '').innerHTML =
              res[i].Inspection_Result
          } else {
            document.getElementById('' + NumSelect + 'Picstatus_' + i + '').innerHTML =
              res[i].Inspection_Result
          }
        }
        UrlTran(arrPic[0])
        // echartsLine()
      }
    }
  )
}

/* 图片地址处理接口 */
var xhr = new XMLHttpRequest()
var formData = new FormData()
function UrlTran(dispathGrid) {
  formData.append('url', encodeURIComponent(dispathGrid))
  formData.append('ImgType', 'realTime')
  var url = '/api162/dalirobotcms/ajax/getimgdata.php'
  xhr.open('POST', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function (e) {
    var content = xhr.response
    arrnum.push(content)
    // console.log('123456 arrnum', arrnum)
    if (arrnum.length < arrPic.length) {
      UrlTran(arrPic[arrnum.length])
    }
    if (arrnum.length == arrPic.length) {
      addPic()
    }
  }
  xhr.send(formData)
}

/* 确定按钮 */
function serchSure() {
  arrPoint = []
  document.getElementById('once').value = 0
  //时间获取处理
  var time1 = TimeDiv.value1[0]
  // console.log('typeof TimeDiv.value1[0]', typeof TimeDiv.value1[0])
  if (typeof TimeDiv.value1[0] == 'object') {
    if (time1.getMonth() < 10) {
      var Month = '0' + (time1.getMonth() + 1)
    } else {
      var Month = time1.getMonth() + 1
    }
    if (time1.getDate() < 10) {
      var day = '0' + time1.getDate()
    } else {
      var day = time1.getDate()
    }
    if (time1.getHours() < 10) {
      var Hours = '0' + time1.getHours()
    } else {
      var Hours = time1.getHours()
    }
    if (time1.getMinutes() < 10) {
      var Minutes = '0' + time1.getMinutes()
    } else {
      var Minutes = time1.getMinutes()
    }
    if (time1.getSeconds() < 10) {
      var Seconds = '0' + time1.getSeconds()
    } else {
      var Seconds = time1.getSeconds()
    }

    beginT =
      time1.getFullYear() + '-' + Month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds

    var time2 = TimeDiv.value1[1]

    if (time2.getMonth() < 10) {
      var Month1 = '0' + (time2.getMonth() + 1)
    } else {
      var Month1 = time2.getMonth() + 1
    }
    if (time2.getDate() < 10) {
      var day1 = '0' + time2.getDate()
    } else {
      var day1 = time2.getDate()
    }
    if (time2.getHours() < 10) {
      var Hours1 = '0' + time2.getHours()
    } else {
      var Hours1 = time2.getHours()
    }
    if (time2.getMinutes() < 10) {
      var Minutes1 = '0' + time2.getMinutes()
    } else {
      var Minutes1 = time2.getMinutes()
    }
    if (time2.getSeconds() < 10) {
      var Seconds1 = '0' + time2.getSeconds()
    } else {
      var Seconds1 = time2.getSeconds()
    }
    endT =
      time2.getFullYear() +
      '-' +
      Month1 +
      '-' +
      day1 +
      ' ' +
      Hours1 +
      ':' +
      Minutes1 +
      ':' +
      Seconds1
  } else {
    beginT = TimeDiv.value1[0]
    endT = TimeDiv.value1[1]
  }
  // console.log('beginT', beginT)
  // console.log('endT', endT)

  //图数获取
  var radioSelect = document.getElementsByName('selectNum')
  for (var i = 0; i < radioSelect.length; i++) {
    if (radioSelect[i].checked) {
      NumSelect = radioSelect[i].value
    }
  }
  //点位获取
  for (var i = 0; i < vm.$refs.tree.getCheckedNodes().length; i++) {
    if (vm.$refs.tree.getCheckedNodes()[i].level == 6)
      arrPoint.push(vm.$refs.tree.getCheckedNodes()[i].id)
  }
  // if (arrPoint.length == 0) {//初始无点位不符合要求
  //   // alert('请选择点位节点')
  // }

  if (menuArr.length == 1 && menuArr[0] != 6) {
    //!= 7是因为目前只开放6和7两层
    alert('请选择点位节点')
  }
  console.log('确定按钮的时间获取开始时间 : ', beginT, '结束时间 : ', endT)
  console.log('确定按钮的图数获取 : ', NumSelect)
  console.log('确定按钮的点位获取 : ', arrPoint.toString())
  //
  // $_('4Pic').style.display = 'none'
  // $_('6Pic').style.display = 'none'
  // $_('9Pic').style.display = 'none'
  // if (NumSelect == 4) {
  //   $_('4Pic').style.display = DisBlock
  // } else if (NumSelect == 6) {
  //   $_('6Pic').style.display = DisBlock
  // } else if (NumSelect == 9) {
  //   $_('9Pic').style.display = DisBlock
  // }

  //清空原存储的一些数组
  arrPic = []
  arrnum = []
  currentpage = 1
  document.getElementById('nowpage').innerHTML = currentpage
  $_('echartsDiv').style.display = 'none'

  resultPic(1)
}
/* 图片切换按钮 */
function radioFun() {
  currentpage = 1
  document.getElementById('nowpage').innerHTML = currentpage
  var radioSelect = document.getElementsByName('selectNum')
  for (var i = 0; i < radioSelect.length; i++) {
    if (radioSelect[i].checked) {
      NumSelect = radioSelect[i].value
    }
  }
  $_('4Pic').style.display = 'none'
  $_('6Pic').style.display = 'none'
  $_('9Pic').style.display = 'none'
  if (NumSelect == 4) {
    $_('4Pic').style.display = DisBlock
  } else if (NumSelect == 6) {
    $_('6Pic').style.display = DisBlock
  } else if (NumSelect == 9) {
    $_('9Pic').style.display = DisBlock
  }

  if (beginT != '' && NumSelect != '' && arrPoint != '') {
    arrPic = []
    arrnum = []
    resultPic(1)
  }

  if (document.getElementById('once').value == 1) {
    arrPic = []
    arrnum = []
    resultPic(1)
  }

  // console.log('传参·图片地址获取beginT', beginT)
  // console.log('传参·图片地址获取endT', endT)
  // // console.log('传参·图片地址获取page', page)
  // console.log('传参·图片地址获取NumSelect', NumSelect)
  // console.log('传参·图片地址获取arrPoint', arrPoint.toString())

  // serchSure()
}

function addPic() {
  // console.log('arrnum:', arrnum, 'NumSelect:', NumSelect) //后续传图片数组就可以
  var arrN = arrnum
  var imgs = ''
  for (var i = 0; i < arrN.length; i++) {
    imgs = '<img src="' + URL.createObjectURL(arrN[i]) + '"/>'
    // console.log('11--99--:', NumSelect, i)
    document.getElementById('' + NumSelect + 'displayPic_' + i + '').innerHTML = imgs
    // console.log('11--99--:1', document.getElementById('' + NumSelect + 'displayPic_' + i + ''))
  }
}

/* 上一页 */
function prePage() {
  if (currentpage == 1) {
    console.log('当前是首页')
  } else {
    currentpage--
    //清空原存储的一些数组
    arrPic = []
    arrnum = []
    resultPic(currentpage)
    document.getElementById('nowpage').innerHTML = currentpage
  }
}

/* 下一页 */
function nextPage() {
  if (currentpage == document.getElementById('total').innerHTML) {
    console.log('当前是最后一页')
  } else {
    currentpage++
    //清空原存储的一些数组
    arrPic = []
    arrnum = []
    resultPic(currentpage)
    document.getElementById('nowpage').innerHTML = currentpage
  }
}
/* 详情按钮点击：获取视频流 */
function PicbuttonClick(event) {
  var curcameraID
  var curcameraType
  var event = event || e
  console.log('当前点击div的id', event.currentTarget.id) //获取id属性值
  console.log(
    '当前点击div的Device_Id',
    document.getElementById('' + event.currentTarget.id + '').value
  ) //获取id属性值

  document.getElementById('o0').src = '' + videoUrl + ':' + nginxPort + '/video0.html'

  var currentDeviceId = document.getElementById('' + event.currentTarget.id + '').value
  console.log('--currentDeviceId--', currentDeviceId)
  $.post(
    '/api162/dalirobotcms/ajax/getCameraInfo.php',
    {
      task: 'getCameraByDevID',
      deviceID: currentDeviceId,
    },
    function (res) {
      console.log('获取视频cameraID  -1-res', res)

      res = eval('(' + res + ')')
      console.log('获取视频cameraID  --res', res)
      if (res.code == 200) {
        curcameraID = res.data[0].cameraID
        curcameraType = res.data[0].cameraType

        console.log('获取视频回放流:CameraID', curcameraID)
        console.log('获取视频回放流:MonitorType', curcameraType)
        // console.log('获取视频回放流:StreamType', StreamType)

        $.post(
          '/api162/dalirobotcms/ajax/getCameraStreamUrl.php',
          {
            task: 'GetCameraStreamUrl',
            CameraID: curcameraID,
            MonitorType: curcameraType, //0 红外 1：可见光
            StreamType: 0, //0：主码流 1：子码流
          },
          function (res) {
            res = eval('(' + res + ')')
            console.log('获取视频回放流  --res', res)

            console.log('获取视频回放流res.StreamUrl', res.StreamUrl)
            document.getElementById('o0').src =
              videoUrl + ':' + nginxPort + '/live?port=1935&app=live&stream=' + res.StreamUrl //iframe地址src
          }
        )
      }
      console.log('获取视频cameraID  --res', curcameraID, '1--', curcameraType)
    }
  )

  // /* 暂时显示(假的) */
  // document.getElementById('o0').src = '' + videoUrl + ':' + nginxPort + '/video0.html'
  // console.log('--iframe初始地址:', document.getElementById('o0').src)
  // $_('WindPicbutton').style.display = DisBlock

  /* 真正的视频流地址 */

  $_('WindPicbutton').style.display = DisBlock
  document.getElementById('imgId').value = currentDeviceId

  /* 原定跳转至实时监控画面 */
  // // var jump1 = event.currentTarget.id
  // // console.log('跳转触发事件:jump1', jump1)
  // window.parent.postMessage(
  //   {
  //     cmd: 'PicbuttonClick',
  //     params: {
  //       success: true,
  //       // jump1: jump1,
  //     },
  //   },
  //   '*'
  // )
}

/* 视频停止回放 */
function videoStop(event) {
  var curcameraIDdown
  var curcameraTypedown
  var event = event || e
  console.log('当前点击div的id---', event.currentTarget.id) //获取id属性值
  console.log(
    '当前点击div的id--imgId-',
    document.getElementById('' + event.currentTarget.id + '').value
  ) //获取id属性值

  var currentDeviceId = document.getElementById('' + event.currentTarget.id + '').value

  $.post(
    '/api162/dalirobotcms/ajax/getCameraInfo.php',
    {
      task: 'getCameraByDevID',
      deviceID: currentDeviceId,
    },
    function (res) {
      console.log('获取视频cameraID  -1-res', res)

      res = eval('(' + res + ')')
      console.log('获取视频cameraID  --res', res)
      if (res.code == 200) {
        curcameraIDdown = res.data[0].cameraID
        curcameraTypedown = res.data[0].cameraType
        console.log('停止回放:CameraID', curcameraIDdown)
        console.log('停止回放:MonitorType', curcameraTypedown)

        $.post(
          '/api162/dalirobotcms/ajax/getCameraStreamUrl.php',
          {
            task: 'StopCameraStream',
            CameraID: curcameraIDdown,
            MonitorType: curcameraTypedown,
          },
          function (res) {
            res = eval('(' + res + ')')
            console.log('停止回放 --res', res)
            document.getElementById('o0').src = '' //iframe地址src
          }
        )
      }
      console.log('停止回放  --res', curcameraIDdown, '1--', curcameraTypedown)
    }
  )

  $_('WindPicbutton').style.display = 'none'
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

  // var ChTime =
  //   time.getFullYear() + '-' + Month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds
  var ChTime = Month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds

  return ChTime
}

/* 转为时间戳 */
function timestampToTime(timestamp) {
  var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return '\n' + h + m + s + '\n' + Y + M + D
}

// var arrX = ['1', '11', '111', '111', '111', '1111', '1', '2'] //x轴
/* 折线图 */
function echartsLine() {
  // 折线图条数限制
  if (arrPoint.length > 6) {
    alert('超出折线图条数限制')
    return
  }
  for (var i = 0; i < arrPoint.length; i++) {
    arrlineTittle.push(unique(eval('arrT' + (1 + i))).toString())
  }

  /*  console.log('arrT1:', arrT1)
  console.log('arrT2:', arrT2)
  console.log('arrT3:', arrT3)

  console.log('arrPoint:', arrPoint)

  console.log('arrline1:', arrline1)
  console.log('arrline12:', arrline2)

  console.log('arrline13:', arrline3)

  console.log('arrline14:', arrline4)

  console.log('arrline15:', arrline5)
  console.log('arrline16:', arrline6)
  console.log('arrlineTittle:', arrlineTittle)

  console.log('maxTime:', maxTime)
  console.log('minTime:', minTime) */
  /*   for (var i = 1; i <= 6; i++) {
    var arrlineGet = eval('arrline' + i)//变量名动态获取
    if (arrlineGet.length != 0) {
      arrlineTittle.push(i)
    }
    console.log('---0022---', arrlineTittle)
  } */
  console.log('---0022---', arrline1)
  $_('echartsDiv').style.display = DisBlock
  // arrlineTittle = ['先', '反对']
  // console.log('arrlineTittle:', arrlineTittle)

  var myChart = echarts.init(document.getElementById('main'))
  var option
  // 指定图表的配置项和数据
  option = {
    // title: {
    //   text: '图表名',
    // },
    // tooltip: {    //随鼠标指向显示每条线具体数值的提示框
    //   trigger: 'axis',
    // },
    legend: {
      //每条线的表示情况
      data: arrlineTittle,
      textStyle: {
        fontSize: 14, //字体大小
        color: '#ffffff', //字体颜色
      },
    },
    grid: {
      //图像整体位置
      left: '8%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    // toolbox: {  //下载
    //   feature: {
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: 'value',
      // name: 'x轴',
      splitLine: false, //去掉水平参考线
      min: minTime,
      max: maxTime,
      axisLabel: {
        // rotate: 20, //设置日期显示样式（倾斜度）

        formatter: function (e) {
          return timestampToTime(e)
        },
        textStyle: {
          fontSize: '14', //轴字体大小
        },
      },
      axisLine: {
        lineStyle: {
          color: '#7da6de', // 颜色
          // width: 3, // 粗细
        },
      },
    },
    yAxis: {
      type: 'value',
      name: '摄氏度', //单位

      // name: '℃', //单位
      // min:0,
      // max:80,
      splitLine: false, //去掉水平参考线
      axisLine: {
        show: true, //纵轴显示
        lineStyle: {
          color: '#7da6de', // 颜色
          // width: 3, // 粗细
        },
      },
      axisLabel: {
        textStyle: {
          fontSize: '20', //轴字体大小
        },
      },
      nameTextStyle: {
        //单位名称字体大小
        fontSize: 20,
      },
    },
    /* yAxis:[
      {
        max: 3000,
        // min:0,
        type: 'value',
        // minInterval: 700,
        interval: 600, //每次增加几个
      },
    ], */
    series: [
      {
        name: arrlineTittle[0],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline1,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: 'red', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: 'red', //折线颜色
            },
          },
        },
      },
      {
        name: arrlineTittle[1],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline2,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: '#f0fd30', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: '#f0fd30', //折线颜色
            },
          },
        },
      },

      {
        name: arrlineTittle[2],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline3,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: 'green', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: 'green', //折线颜色
            },
          },
        },
      },
      {
        name: arrlineTittle[3],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline4,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: '#8A2BE2', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: '#8A2BE2', //折线颜色
            },
          },
        },
      },
      {
        name: arrlineTittle[4],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline5,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: '#87CEFA', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: '#87CEFA', //折线颜色
            },
          },
        },
      },
      {
        name: arrlineTittle[5],
        type: 'line',
        // stack: 'Total',//加上就不会交叉
        data: arrline6,
        symbolSize: 10, //设定zhe点的大小
        itemStyle: {
          normal: {
            color: '#FFA500', //折线点的颜色
            lineStyle: {
              width: 4, // 0.1的线条是非常细的了
              color: '#FFA500', //折线颜色
            },
          },
        },
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  option && myChart.setOption(option)
}

function echartsStop() {
  $_('echartsDiv').style.display = 'none'
  document.getElementById('butt1').style.background = '#2b6ceb'
  document.getElementById('butt1').style.color = '#fff'
  document.getElementById('butt1').style.border = '1px solid #fff'

  document.getElementById('butt2').style.background = '#14357b'
  document.getElementById('butt2').style.color = '#C0C4CC'
  document.getElementById('butt2').style.border = '0px solid #fff'

  document.getElementById('butt3').style.background = '#14357b'
  document.getElementById('butt3').style.color = '#C0C4CC'
  document.getElementById('butt3').style.border = '0px solid #fff'
}

/* function Test() {
  $.post(
    '/api42/dalirobotcms/ajax/getCameraInfo.php',
    {
      task: 'getCameraByDevID',
      deviceID: '5269',
    },
    function (res) {
      console.log('获取视频cameraID  -1-res', res)

      res = eval('(' + res + ')')
      console.log('获取视频cameraID  --res', res)
      if (res.code == 200) {
        curcameraID = res.data.cameraID
        curcameraType = res.data.cameraType
        console.log('获取视频回放流:CameraID', curcameraID)
        console.log('获取视频回放流:MonitorType', curcameraType)
      }
      console.log('获取视频cameraID  --res', curcameraID, '1--', curcameraType)
    }
  )
} */

window.onload = function () {
  var btn1 = document.getElementById('butt1')
  var btn2 = document.getElementById('butt2')
  var btn3 = document.getElementById('butt3')

  btn1.addEventListener(
    'click',
    function () {
      document.getElementById('butt1').style.background = '#2b6ceb'
      document.getElementById('butt1').style.color = '#fff'
      document.getElementById('butt1').style.border = '1px solid #fff'

      document.getElementById('butt2').style.background = '#14357b'
      document.getElementById('butt2').style.color = '#C0C4CC'
      document.getElementById('butt2').style.border = '0px solid #fff'

      document.getElementById('butt3').style.background = '#14357b'
      document.getElementById('butt3').style.color = '#C0C4CC'
      document.getElementById('butt3').style.border = '0px solid #fff'
    },
    false
  )

  btn2.addEventListener(
    'click',
    function () {
      document.getElementById('butt1').style.background = '#14357b'
      document.getElementById('butt1').style.color = '#C0C4CC'
      document.getElementById('butt1').style.border = '0px solid #fff'

      document.getElementById('butt2').style.background = '#2b6ceb'
      document.getElementById('butt2').style.color = '#fff'
      document.getElementById('butt2').style.border = '1px solid #fff'

      document.getElementById('butt3').style.background = '#14357b'
      document.getElementById('butt3').style.color = '#C0C4CC'
      document.getElementById('butt3').style.border = '0px solid #fff'
    },
    false
  )

  btn3.addEventListener(
    'click',
    function () {
      document.getElementById('butt1').style.background = '#14357b'
      document.getElementById('butt1').style.color = '#C0C4CC'
      document.getElementById('butt1').style.border = '0px solid #fff'

      document.getElementById('butt2').style.background = '#14357b'
      document.getElementById('butt2').style.color = '#C0C4CC'
      document.getElementById('butt2').style.border = '0px solid #fff'

      document.getElementById('butt3').style.background = '#2b6ceb'
      document.getElementById('butt3').style.color = '#fff'
      document.getElementById('butt3').style.border = '1px solid #fff'
    },
    false
  )
}
