var allRequest = new Object()
allRequest = GetRequest()
//任务类型
var PathType = 0
var disableFlaseSta = []
var arrlabelmoth = []
var arrlabelweek = []

function Init() {
  // console.log('页面是否含有参数检测', window.location.href)
  // console.log('页面是否含有参数检测11', window.location.search)
  var url = location.search //获取url中"?"符后的字串
  if (url.indexOf('?') != -1) {
    //判断是否有参数
    var str = url.slice(1) //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
    var strs = str.split('=') //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
    //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
    if (strs[1]) {
      window.setTimeout(function () {
        // console.log('111')
        SelectHeader()
        window.setTimeout(function () {
          alert('请选择点位后添加任务')
        }, 2000)
      }, 800)
    }
  }

  initVue()
  initApp()

  // AjaxStaData()
  // ele_init('Month', 3, '周期(月)', { OP: Month_s })
  // ele_init('Week', 3, '周期(周)', { OP: Week_s })
  ele_init('hourRule', 3, '执行方式', { OP: hourRule_s })
  //   ele_init('TaskSta', 4, 'TaskSta', {
  //     OP: TaskSta_s,
  //     CSS: 'TaskSta_checkbox',
  //   })
  // $("#Month option[value='-1']").css('display', 'none')
  // $("#Week option[value='-1']").css('display', 'none')

  ele_init('TaskMod', 3, 'TaskMod', {
    OP: TaskMod_s,
    CSS: 'patrolSta_checkbox',
  })
  ele_init('TaskSta1', 4, 'TaskSta1', {
    OP: TaskSta1_s,
    CSS: 'TaskSta_checkbox',
  })

  ele_init('TaskSta', 4, 'TaskSta', {
    OP: TaskSta_s,
    CSS: 'TaskSta_checkbox',
  })
  ele_init('InspectionType1', 3, 'InspectionType1', {
    //类型为3不行 why [因为没有引入select.js文件]]
    OP: RunPathType_s,
    CSS: 'patrolSta_checkbox',
  })

  ele_init('InspectionType', 4, 'InspectionType', {
    OP: RunPathType_s,
    CSS: 'Device_checkbox',
    ONCLICK: RunPathTypeCheck,
    DISALL: 'true',
    CHECKALLCLICK: RunPathTypeCheckAll,
  })

  // ele_init('DevArea', 7, 'DevArea', {
  //   //【修改1】
  //   OP: Area_s,
  //   CSS: 'Device_checkbox',
  //   ONCLICK: AreaCheck,
  //   DISALL: 'true',
  //   CHECKALLCLICK: AreaCheckAll,
  // })

  ele_init('FirstDevs', 7, 'FirstDevs', {
    OP: SelAreaDevType_s,
    CSS: 'Device_checkbox',
    ONCLICK: FirstDevTypeCheck,
    DISALL: 'true',
    CHECKALLCLICK: FirstDevTypeCheckCheckAll,
  })

  ele_init('DeviceDetialType', 7, 'DeviceDetialType', {
    OP: DeviceDetialType_s,
    CSS: 'Device_checkbox',
    ONCLICK: DeviceDetialTypeCheck,
    DISALL: 'true',
    CHECKALLCLICK: DeviceDetialTypeCheckAll,
  })

  ele_init('DevSelfType', 7, 'DevSelfType', {
    OP: DevSelfType_s,
    CSS: 'Device_checkbox',
    ONCLICK: DevSelfTypeCheck,
    DISALL: 'true',
    CHECKALLCLICK: DevSelfTypeCheckAll,
  })

  //   ele_init('AppearType', 7, 'AppearType', {
  //     OP: AppearType_s,
  //     CSS: 'Device_checkbox',
  //     ONCLICK: AppearTypeCheck,
  //     DISALL: 'true',
  //     CHECKALLCLICK: AppearTypeCheckAll,
  //   })

  ele_init('PointSourType', 7, 'PointSourType', {
    OP: PointSourType_s,
    CSS: 'Device_checkbox',
    ONCLICK: PointSourTypeCheck,
    DISALL: 'true',
    CHECKALLCLICK: PointSourTypeCheckAll,
  })

  resizepage()

  $_('divtb').style.border = '#B4E3D4 0px solid'
  $_('changeColor1').style.backgroundColor = '#D9ECEA'
  $_('changeColor2').style.border = '#B4E3D4 0px solid'
  $_('changeColor3').style.border = '#B4E3D4 0px solid'
  $_('changeColor4').style.border = '#B4E3D4 0px solid'
}

function resizepage() {
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  if (window.parent.parent.parent.parent.PageStyle != 0) {
    $_('devicetreeifr').style.height = bh - 235 + 'px'
    $_('taskpathifr').style.height = bh - 235 + 'px'
    $_('divtb').style.height = bh + 'px'
  }

  //4k屏，调整样式
  document.getElementById('taskpathifr').contentWindow.resizePageStyle(bw)
  if (window.screen.availWidth > 3000) {
    $('#changeColor2').find('td').css('font-size', '16px')
    $('#changeColor2').find('th').css('font-size', '16px')
  }
}

var HTTP = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    },
  ],
})

/* 变电站树和点位树的构建 */
function initVue() {
  vm = new Vue({
    el: '#app',
    data() {
      return {
        treeData: [],
        treeProps: {
          value: 'id',
          label: 'label',
          children: 'children',
          disabled: this.disabledFn,
        },
        query: '',
        arrId: [],
        arrIdPoint: [],
        treearrid: [],
        // pp: [],
      }
    },

    mounted() {
      this.$refs.tree.getCheckedKeys() //当前的选中项id(包括选中的父项)的数组
      // console.log('当前选中项', this.$refs.tree.getCheckedKeys())
    },

    methods: {
      handleCheckChange(data) {
        let res = this.$refs.tree.getCheckedNodes()
        // console.log('99父页面vue的 变电站 数组res', res)

        // let arr1 = []
        // res.forEach((data) => {  //选中节点数组构建
        //     if(data.level==2){
        //         arr1.push(data.id)
        //         if(arr1[0].indexOf("-")==-1){
        //             console.log("第二层为变电站树的层级")
        //             return
        //         }
        //     }

        // })
        // console.log('1301111111111',arr1)

        let arr = this.$refs.tree.getCheckedKeys(true) //正在测试，显示正常，但后端层级还未完成，建议等层级完善后再进行修改，则可以替代data.level==5的条件判断

        let menuArr = this.unique(arr) // 去除重复的节点
        this.permissionIds = menuArr.join(',')

        if (this.permissionIds.indexOf('-') == -1) {
          //变电站与点位区分
          this.arrIdPoint = menuArr
          //  console.log("99父页面vue的 点位 数组",this.arrIdPoint)
        } else if (this.permissionIds.indexOf('-') != -1) {
          this.arrId = arr //变电站id
          // console.log('99父页面vue的 变电站 数组', this.arrId)
          for (var i = 0; i < this.arrId.length; i++) {
            // console.log('初始巡检区域的获取：this.arrId[i]', this.arrId[i])
            AjaxStaData(this.arrId[i])
          }
        }
      },
      //数组去重
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

      onQueryChanged(query) {
        const _this = this
        _this.$refs.tree.filter(query)
      },
      filterMethod(query, node) {
        return node.label.includes(query)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },

      disabledFn(item) {
        // console.log('pp disableFlaseSta', disableFlaseSta) //没事别打印，影响性能
        // console.log('pp item', item)

        if (disableFlaseSta != '') {
          return false
        }
        if (disableFlaseSta == '') {
          if (item.level == 6 || item.level == 7) {
            return false
          } else {
            return true
          }
        }
      },
    },
  })

  $.post(
    '/api162/dalirobotcms/ajax/taskList.php',
    {
      task: 'getStationTree',
    },
    function (res) {
      res = eval('(' + res + ')')
      // console.log('运维班变电树的获取数据', res)

      if (res.code == 200) {
        const treeData = handleDataToTree(res.data)
        // console.log('运维班变电树的获取数据res.data', res.data)

        for (var q = 0; q < res.data.length; q++) {
          for (var a = 0; a < res.data[q].length; a++) {
            disableFlaseSta.push(res.data[q][a].id)
          }
        }

        vm.treeData = treeData //树数据赋值

        var arrStation = [] //变电站层的所有变电站id
        var arrStationdef = [] //默认勾选（可不用

        // console.log('运维班变电树的获取数据res.data', res.data)

        for (var q = 0; q < res.data[res.data.length - 1].length; q++) {
          arrStation.push(res.data[res.data.length - 1][q].id)
        }
        arrStationdef.push(arrStation[0])
        vm.treearrid = arrStationdef
        // console.log('ch初始巡检区域的获取:', vm.treearrid.toString())
        AjaxStaData(vm.treearrid.toString())
        $('#taGetTPath1').val(arrStation[0])
        //    console.log("赋值初始默认 taGetTPath1",$('#taGetTPath1').val())
      }
    }
  )
}
/* 执行表格中的时间选择器 */
function initApp() {
  RunT = new Vue({
    el: '#appChild',
    data: function () {
      return {
        form: {
          value: '',
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
      }
    },
    methods: {
      selectTime(val) {
        this.form.value = val
      },
      selectTime1(val1) {
        this.value1 = val1
      },
      selectTime2(val2) {
        this.value2 = val2
        //   console.log("value2",val2)
      },
      selectTime3(val3) {
        this.value3 = val3
      },
      selectTime4(val4) {
        this.value4 = val4
      },
    },
  })
}
/* 查询功能 */
function SelectHeader() {
  // console.log("1216新建功能运位置测试3:")
  let TreeId = document.getElementById('TreeId')
  var arrkey = []
  $(TreeId)
    .find('li')
    .each(function () {
      arrkey.push($(this).text())
    })
  var key = arrkey.toString()

  // console.log('请选择变电站 判断参数', vm.treearrid)
  // console.log('请选择变电站 判断参数', vm.$refs.tree.getCheckedKeys())
  // console.log('请选择变电站 判断参数', key)

  if (vm.$refs.tree.getCheckedKeys() == '' && vm.treearrid != '') {
    //只能初始判断。进入点位树之后，再去修改会触动查询，此时依旧会判断
    alert('请选择变电站')
    return
  }
  // if (vm.$refs.tree.getCheckedKeys() != '' && vm.treearrid != '') {
  //   //只能初始判断。进入点位树之后，再去修改会触动查询，此时依旧会判断

  // }

  /* 
    // console.log('请选择变电站 判断参数', vm.treearrid)
    if (vm.$refs.tree.getCheckedKeys() == '') {
      if (vm.treearrid == 0) {
        //只能初始判断。进入点位树之后，再去修改会触动查询，此时依旧会判断
        alert('已选择变电站')
        return
      } else {
        //只能初始判断。进入点位树之后，再去修改会触动查询，此时依旧会判断
        alert('请选择变电站')
        return
      }
    } */

  if (vm.treearrid.toString() != '' && key == '') {
    if (vm.treearrid.toString().indexOf('-') == -1) {
      key = ''
    } else {
      key = vm.treearrid.toString()
    }
  }
  // console.log("父查询初始选中展开的默认(变电站", key)

  // console.log("清空点位树选择的标志判断",taskpathifr.window.document.getElementById("Modify_path_id").value)

  if (taskpathifr.window.document.getElementById('Modify_path_id').value == 1) {
    //Modify_path_id的值为0是用来修改结束后树默认值置空的
    $('#taskpathifr')[0].contentWindow.ModifySubVal() //执行子页面函数
    var liarr = []
    var lival = taskpathifr.window.document.getElementsByName('childLi')

    for (var i = 0; i < lival.length; i++) {
      liarr.push(lival[i].innerHTML)
    }
    // console.log('父函数查询时的点位数组获取测试', liarr)

    vm.treearrid = liarr
    //  console.log("父查询点击修改后的(点位数组",liarr)

    key = taskpathifr.window.$('#ModStation').val()
    //  console.log("父查询 点击修改后的(变电站", key)
  }

  if (taskpathifr.window.document.getElementById('Modify_path_id').value == 0) {
    //Modify_path_id的值为0是用来修改结束后树默认值置空的
    key = taskpathifr.window.$('#ModStation').val()
    if (key == '') {
      //即查询未点击，taskpathifr.window.$('#ModStation').val()未初始空的状态
      let TreeId = document.getElementById('TreeId')
      var key = []
      $(TreeId)
        .find('li')
        .each(function () {
          key.push($(this).text())
        })

      var key = key.toString()
      //  console.log("父查询 变电站id的获取",key)

      if (vm.treearrid.toString() != '' && key == '') {
        if (vm.treearrid.toString().indexOf('-') == -1) {
          key = ''
        } else {
          key = vm.treearrid.toString()
        }
      }
      //  console.log("父查询初始选中展开的默认(变电站", key)
    }

    vm.treearrid = []
  }

  // console.log('父查询即将ajax vm.treearrid', vm.treearrid)
  //显示无误，但是当数组为变电站时，判断变电站还是点位的语句陷入了循环

  var selectDevArea = document.getElementsByName('DevArea_c') //【修改2 selectDevArea】

  // console.log('【修改2 selectDevArea】:', selectDevArea)
  var selectFirstDevs = document.getElementsByName('FirstDevs_c')
  var selectDeviceDetialType = document.getElementsByName('DeviceDetialType_c')
  var selectDevSelfType = document.getElementsByName('DevSelfType_c')
  // var selectAppearType = document.getElementsByName("AppearType_c");
  var selectPointSourType = document.getElementsByName('PointSourType_c')
  var AreaID = []
  for (var i = 0; i < selectDevArea.length; i++) {
    if (selectDevArea[i].checked) {
      AreaID.push(selectDevArea[i].value)
      console.log('-------------巡检区域选中项：', selectDevArea[i].value)
    }
  }
  AreaID = AreaID.toString()
  // console.log('巡检区域选中项：', AreaID)

  var GridDevType = []
  for (var i = 0; i < selectFirstDevs.length; i++) {
    if (selectFirstDevs[i].checked) {
      GridDevType.push(selectFirstDevs[i].value)
    }
  }
  GridDevType = GridDevType.toString()
  // console.log('设备类型选中项：', GridDevType)

  var GridDevSel = []
  for (var i = 0; i < selectDeviceDetialType.length; i++) {
    if (selectDeviceDetialType[i].checked) {
      GridDevSel.push(selectDeviceDetialType[i].value)
    }
  }
  GridDevSel = GridDevSel.toString()
  // console.log('识别类型选中项：', GridDevSel)

  var DevSelfType = []
  for (var i = 0; i < selectDevSelfType.length; i++) {
    if (selectDevSelfType[i].checked) {
      DevSelfType.push(selectDevSelfType[i].value)
    }
  }
  DevSelfType = DevSelfType.toString()
  // console.log('表计类型选中项：', DevSelfType)

  // 这里是外观类型，暂时没有接口数据
  //   for( var i = 0 ; i < selectAppearType.length ; i++){
  //       if (selectAppearType[i].checked) {
  //         //   console.log("外观类型选中项：",selectAppearType[i].value)
  //       }
  // }

  var CarType = []
  for (var i = 0; i < selectPointSourType.length; i++) {
    if (selectPointSourType[i].checked) {
      CarType.push(selectPointSourType[i].value)
    }
  }
  CarType = CarType.toString()
  // console.log('点位来源选中项：', CarType)

  // debugger  //停止调试

  /*   console.log('传输的变电站id key', key)
  console.log('传输的巡检区域id AreaID', AreaID)
  console.log('传输的设备类型id GridDevType', GridDevType)
  console.log('传输的识别类型id GridDevSel', GridDevSel)
  console.log('传输的表计类型id DevSelfType', DevSelfType)
  console.log('传输的点位来源id CarType', CarType)
 */
  // console.log('传输的变电站id  document.getElementById', document.getElementById('SelectKey').value)

  if (vm.$refs.tree.getCheckedKeys() == '' && vm.treearrid == '' && key == '') {
    console.log('fuhe---')
    key = document.getElementById('SelectKey').value
  }
  // console.log('传输的变电站id key---', key)
  // console.log('传输的变电站id key', key)
  // console.log('传输的巡检区域id AreaID', AreaID)
  // console.log('传输的设备类型id GridDevType', GridDevType)
  // console.log('传输的识别类型id GridDevSel', GridDevSel)
  // console.log('传输的表计类型id DevSelfType', DevSelfType)
  // console.log('传输的点位来源id CarType', CarType)
  if (key.length != 0) {
    // console.log('chee初始巡检区域的获取:', key)

    // AjaxStaData(key)
    document.getElementById('SelectKey').value = key
    $.post(
      '/api162/dalirobotcms/ajax/realTimeData.php',
      {
        task: 'getDevListTree',
        stationID: key,
        //   DeviceType:'1',
        AreaID: AreaID, //巡检区域
        GridDevType: GridDevType, //设备类型

        GridDevSel: GridDevSel, //识别类型
        DevSelfType: DevSelfType, //表计类型
        CarType: CarType, //点位来源

        //   Province:'1',//省公司
        //   Company:'1',//电力公司
        //   OperatorID:'1'//运维班ID
      },

      function (res) {
        // console.log("00111129查询后变电站res")

        // console.log("111129查询后变电站res",res)

        res = eval('(' + res + ')')
        console.log('配置页面查询后变电站res', res)
        if (res.code == 200) {
          const treeData = handleDataToTree(res.data)
          vm.treeData = treeData
          disableFlaseSta = []
          // console.log('111111111111treeData', treeData[0])
          // for (var j = 0; j < res.data[2].length; j++) {
          //   vm.pp.push(res.data[2][j])
          // }
          // console.log('pp', vm.pp)

          // vm.disabledFn(treeData[0])
        }
      }
    )
  }

  //    $("#taskpathifr")[0].contentWindow.NullEmpty();   //清除原有表格数据，避免新产生的表格数据是在其原数据基础上的
  //    $("#taskpathifr")[0].contentWindow.GetTaskPath(1);   //获取表格一开始的选择（第一页
}

/* 置空 */
function purge() {
  document.getElementById('cleanCheck').click() //清空树选择
  var a = document.getElementById('DevArea_checkall') //【修改3  a 】
  console.log('【修改3 a:', a)

  var b = document.getElementById('FirstDevs_checkall')
  var c = document.getElementById('DeviceDetialType_checkall')
  var e = document.getElementById('DevSelfType_checkall')
  // var f=document.getElementById("AppearType_checkall");
  var g = document.getElementById('PointSourType_checkall')
  // console.log(a.value)
  a.checked = false
  b.checked = false
  c.checked = false
  e.checked = false
  // f.checked = false
  g.checked = false
  var checkboxa = document.getElementsByName('DevArea_c') //【修改4 checkboxa】
  console.log('【修改4 checkboxa】:', checkboxa)

  for (var i = 0; i < checkboxa.length; i++) {
    checkboxa[i].checked = false
  }
  var checkboxb = document.getElementsByName('FirstDevs_c')
  for (var i = 0; i < checkboxb.length; i++) {
    checkboxb[i].checked = false
  }
  var checkboxc = document.getElementsByName('DeviceDetialType_c')
  for (var i = 0; i < checkboxc.length; i++) {
    checkboxc[i].checked = false
  }
  var checkboxd = document.getElementsByName('DevSelfType_c')
  for (var i = 0; i < checkboxd.length; i++) {
    checkboxd[i].checked = false
  }
  // var checkboxe = document.getElementsByName("AppearType_c");
  // for ( var i = 0; i < checkboxe.length; i++) {
  //   checkboxe[i].checked=false
  // }
  var checkboxf = document.getElementsByName('PointSourType_c')
  for (var i = 0; i < checkboxf.length; i++) {
    checkboxf[i].checked = false
  }

  taskpathifr.window.$('#DataTable tbody').empty()
  // console.log('配置页面父页面页数获取')

  // console.log(
  // '配置页面父页面对子页面表格的页数获取',
  // taskpathifr.window.document.getElementById('p').innerHTML
  // )
  // taskpathifr.window.document.getElementById("p").innerHTML=0
}

function cleaninfo() {
  document.getElementById('cleanCheck').click() //清空树选择
  // vm.treearrid=[]
}

/* 新建 */
function AddHidden() {
  $('#taskpathifr')[0].contentWindow.hiddenparam() //执行子页面函数
}
function AddAjax() {
  $('#taskpathifr')[0].contentWindow.AddPathAjax() //执行子页面函数
}

/* 显示设置 */
function HiddenPar() {
  $('#taskpathifr')[0].contentWindow.Hidden() //执行子页面函数
}

function verifyPar() {
  $('#taskpathifr')[0].contentWindow.verify() //执行子页面函数
}
function aallPar() {
  $('#taskpathifr')[0].contentWindow.aall() //执行子页面函数
}
function setAllPar() {
  $('#taskpathifr')[0].contentWindow.setAll() //执行子页面函数
}

function RuleRunAjaxPar() {
  $('#taskpathifr')[0].contentWindow.RuleRunAjax() //执行子页面函数
}
function CycleRunAjaxPar() {
  $('#taskpathifr')[0].contentWindow.CycleRunAjax() //执行子页面函数
}

function ModifyPathAjaxPar() {
  $('#taskpathifr')[0].contentWindow.ModifyPathAjax() //执行子页面函数
}

// function unique(arr) {
//   let newArr = []
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     if (newArr.indexOf(arr[i]) == -1) {
//       newArr.push(arr[i])
//     }
//   }
//   return newArr
// }
function MothClick() {
  $_('hiddweek').style.display = 'none'

  console.log('!--!!!!!!-', $_('hiddmoth').style.display)

  if ($_('hiddmoth').style.display == 'block') {
    document.getElementById('imgIMG').src = 'img/箭头-左1.png'

    document.getElementById('imgIMG').style.width = '13px'
    document.getElementById('imgIMG').style.height = '13px'
    arrlabelmoth = []
    var ch = document.getElementsByName('moth[]')
    for (var i = 0; i < ch.length; i++) {
      if (ch[i].checked == true) {
        console.log('labelmoth--', document.getElementById('labelmoth' + (i + 1) + '').innerHTML)
        arrlabelmoth.push(document.getElementById('labelmoth' + (i + 1) + '').innerHTML)
      }
    }
    console.log('arrlabelmoth--', arrlabelmoth.toString())
    if (arrlabelmoth.length != 0) {
      document.getElementById('MandWDiv').innerHTML = arrlabelmoth.toString()
      document.getElementById('MandWDiv').style.color = '#fff'
    } else {
      document.getElementById('MandWDiv').innerHTML = '请选择月份'
      document.getElementById('MandWDiv').style.color = '#a7bfdb'
    }

    $_('hiddmoth').style.display = 'none'
  } else {
    document.getElementById('imgIMG').src = 'img/下拉1.png'
    document.getElementById('imgIMG').style.width = '18px'
    document.getElementById('imgIMG').style.height = '18px'
    $_('hiddmoth').style.display = DisBlock
  }
}

function WeekClick() {
  console.log('!--!!!!!!-', $_('hiddweek').style.display)

  $_('hiddmoth').style.display = 'none'

  if ($_('hiddweek').style.display == 'block') {
    document.getElementById('imgIMGweek').src = 'img/箭头-左1.png'

    document.getElementById('imgIMGweek').style.width = '13px'
    document.getElementById('imgIMGweek').style.height = '13px'
    arrlabelweek = []
    var ch = document.getElementsByName('week[]')
    for (var i = 0; i < ch.length; i++) {
      if (ch[i].checked == true) {
        console.log('labelweek--', document.getElementById('labelweek' + (i + 1) + '').innerHTML)
        arrlabelweek.push(document.getElementById('labelweek' + (i + 1) + '').innerHTML)
      }
    }
    console.log('arrlabelweek--', arrlabelweek.toString())
    if (arrlabelweek.length != 0) {
      document.getElementById('MandW_Div').innerHTML = arrlabelweek.toString()
      document.getElementById('MandW_Div').style.color = '#fff'
    } else {
      document.getElementById('MandW_Div').innerHTML = '请选择周'
      document.getElementById('MandW_Div').style.color = '#a7bfdb'
    }

    $_('hiddweek').style.display = 'none'
  } else {
    document.getElementById('imgIMGweek').src = 'img/下拉1.png'
    document.getElementById('imgIMGweek').style.width = '18px'
    document.getElementById('imgIMGweek').style.height = '18px'
    $_('hiddweek').style.display = DisBlock
  }
}

/* 巡检区域 数据获取 */
function AjaxStaData(Sta) {
  // console.log('传输的变电站id key', vm.arrId)

  /*  */
  var arrStaData = []
  var arrStaDataVal = []
  // console.log('传输的变电站--00---', Sta)

  $.post(
    '/api162/dalirobotcms/ajax/updatearea.php',
    {
      task: 'GetAllAreaByStation',
      StationID: 'F4E34FA8-4295-13CB-8A1F-75473BEF05C0', //暂时写死，稍后修改
    },
    function (res) {
      // console.log('巡检区域: res11--', res)

      var res = JSON.parse(res)
      console.log('巡检区域: res33--', res)

      // res = eval('(' + res + ')')
      // console.log('巡检区域: res22--', res)
      for (var i = 0; i < res.length; i++) {
        arrStaData.push(res[i].Area_Desc)
        arrStaDataVal.push(res[i].Area_Id)
      }
      var len = arrStaData.length
      var htmlInput = ''
      var htmlInputFirst =
        '<div class="Device_checkbox"><input type="checkbox" id="DevArea_checkall" onclick="DevAreacheckall()" value="0"> 全选</div>'
      for (var i = 0; i < len; i++) {
        htmlInput +=
          '<div class="Device_checkbox"><input type="checkbox" onclick="CheckBox.prototype.CheckBoxOnclick(this);" name="DevArea_c" value="' +
          arrStaDataVal[i] +
          '"> ' +
          arrStaData[i] +
          '</div>'
      }
      document.getElementById('DevArea').innerHTML = htmlInputFirst + htmlInput
      // if (res.code == 200) {

      // } else {
      //   alert('数据返回失败')
      // }
    }
  )

  // console.log('巡检区域: res--000', arr1, arr2)
  /*  */
  // var arrStaData = ['220kv', '1000kv', '500kv'] //选择项文本
  // var arrStaDataVal = ['1', '2', '4'] //向后端传输的值(每一个选项对应的值)

  // var len = arrStaData.length
  // var htmlInput = ''
  // var htmlInputFirst =
  //   '<div class="Device_checkbox"><input type="checkbox" id="DevArea_checkall" onclick="DevAreacheckall()" value="0"> 全选</div>'
  // for (var i = 0; i < len; i++) {
  //   htmlInput +=
  //     '<div class="Device_checkbox"><input type="checkbox" onclick="CheckBox.prototype.CheckBoxOnclick(this);" name="DevArea_c" value="' +
  //     arrStaDataVal[i] +
  //     '"> ' +
  //     arrStaData[i] +
  //     '</div>'
  // }
  // document.getElementById('DevArea').innerHTML = htmlInputFirst + htmlInput
  // document.getElementsByClassName('DevArea1')[0].innerHTML = htmlInputFirst + htmlInput

  // var qe = document.getElementsByClassName('DevArea1')[0]
  // qe.className = 'taot'
  // console.log('00', qe)

  /* 测试修改情况----可行 */
  // var arrStaData = ['222', 'assddsf', 'dfs', '333']
  // console.log('qq:', document.getElementById('testDevArea').innerText)
  // document.getElementById('testDevArea').innerText = arrStaData[2]

  // console.log('qq111:', document.getElementById('testDevAreainput').value)
  // document.getElementById('testDevAreainput').value = '222'
}
/*巡检区域 全选按钮   */
function DevAreacheckall() {
  var ch = document.getElementsByName('DevArea_c')
  var all = document.getElementById('DevArea_checkall')

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
