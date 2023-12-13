var allRequest = new Object()
allRequest = GetRequest()
let begin = null
let end = null

function CreateHTMLele() {
  ele_init('TaskStation', 7, 'TaskStation', {
    OP: TaskStation_s,
    CSS: 'channel_checkbox',
  })
  ele_init('SureState', 7, 'SureState', {
    OP: SureState_s,
    CSS: 'channel_checkbox',
  })
  ele_init('InspectionType', 3, 'InspectionType', {
    OP: SelRunPathType_s,
    CSS: 'patrolSta_checkbox',
  })
}

function Init() {
  initVue()
  initApp()
  CreateHTMLele()
  resizepage()
}

function initApp() {
  // console.log('时间选择器 清空时的调用情况')
  begin = new Vue({
    el: '#divtb',
    data: function () {
      return {
        value: '',
        value1: '',
        // defaultValue: '',
        // defaultValue: '2021-02-12 10:11:22',
      }
    },
    // created() {
    // this.defaultValue = '2021-02-12 10:11:22'

    //   console.log('获取时间选择器---shijian---', new Date())

    //   this.defaultValue = new Date()
    //   this.defaultValue.setHours(8)
    //   this.defaultValue.setMinutes(0)

    //   // console.log('获取时间选择器---shijian---', new Date())
    // },
    methods: {
      getdatetime() {
        // this.defaultValue = new Date()
        this.value1 = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7) //* 7才对。才是七天前的时间
        this.value = start
        // console.log('--获取时间选择器---shijian---', new Date())
        // console.log('--获取时间选择器---shijian---start', start)
      },
      selectTime(val) {
        this.value = val
        // console.log('value', val)
      },
      selectTime1(val1) {
        this.value1 = val1
        // console.log('value1', val1)
      },
    },
    mounted() {
      let that = this
      that.getdatetime()
    },
  })
  // console.log('时间选择器 清空时的调用情况1')
}

function resizepage() {
  var wh = pagesize()
  var bw = parseInt(wh.w)
  var bh = parseInt(wh.h)
  $_('wrapDiv').style.width = bw - 20 + 'px'
  $_('wrapDiv').style.height = bh + 'px'
  $_('divContent').style.height = bh - 100 + 'px'
  $_('Queryiframeifr').style.height = bh - 235 + 'px'
  document.getElementById('Queryiframeifr').contentWindow.resizePageStyle(bw)
}

function initVue() {
  // console.log('父页面开始执行initVue函数')
  vm = new Vue({
    el: '#app',
    data() {
      return {
        treeData: [],
        treeProps: {
          value: 'id',
          label: 'label',
          children: 'children',
        },
        query: '',
        arrId: [],
        arrIdAll: [],
        treearrid: [],
      }
    },
    methods: {
      handleCheckChange(data) {
        // console.log('修改时id的处理测试')

        let res = this.$refs.tree.getCheckedNodes()
        let arr = []
        res = Array.from(res)
        // console.log('修改时id的处理测试---', res.length)

        res.forEach(function (data) {
          if (data.level == res.length) {
            arr.push(data.id)
          }
        })
        let menuArr = this.unique(arr) // 去除重复的节点
        this.permissionIds = menuArr.join(',')
        this.arrId = menuArr
        document.getElementById('name').innerHTML = ''
      },
      // 数组去重
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
    },
  })
  $.post(
    '/api162/dalirobotcms/ajax/taskList.php',
    {
      task: 'getStationTree',
    },
    function (res) {
      res = eval('(' + res + ')')
      // console.log('res', res)
      if (res.code == 200) {
        const treeData = handleDataToTree(res.data)
        vm.treeData = treeData
        console.log('treeData数据', treeData)
        var arrIdAlltree = []
        for (var i = 0; i < res.data.length; i++) {
          // console.log('无须选中便获取所有变电站节点', res.data[i])
          for (var j = 0; j < res.data[i].length; j++) {
            if (res.data[i][j].level == res.data.length) {
              arrIdAlltree.push(res.data[i][j].id)
            }
          }
        }

        vm.arrIdAll = arrIdAlltree
        // console.log('vm.arrIdAll', vm.arrIdAll)
        vm.treearrid.push(vm.arrIdAll[0])
        // console.log('变电站初始默认选中第一个id:', vm.treearrid)
        document.getElementById('name').innerHTML = vm.arrIdAll[0]
        // console.log(
        //   '变电站初始默认选中第一个id11111111:',
        //   document.getElementById('name').innerHTML
        // )
      } else {
        alert('数据返回失败')
      }
    }
  )
}

function JumpMidSta() {
  // console.log('y')

  if (Queryiframeifr.window.document.getElementById('Jump1').value != '') {
    // console.log('yz')
    // 向vue中发送数据
    window.parent.postMessage(
      {
        cmd: 'QueryJumpinsRes',
        params: {
          success: true,
          Jump1: Queryiframeifr.window.document.getElementById('Jump1').value,
          Jump2: Queryiframeifr.window.document.getElementById('Jump2').value,
          Jump3: Queryiframeifr.window.document.getElementById('Jump3').value,
          Jump4: Queryiframeifr.window.document.getElementById('Jump4').value,
        },
      },
      '*'
    ) /*当有多个iframe页面传值时，可以设计通过其中的字段获取对应的值*/
  }
}
