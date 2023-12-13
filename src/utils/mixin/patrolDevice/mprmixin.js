import { resetIpt, handleFilter } from '@/views/PatrolDevice/js/commenFun'
import { pullDownList } from '@/service/api/views/patrolDevice/deviceAlarm.js'
export const mrmixin = {
  data() {
    return {
      addTabTitle: '计划新增',
      mpTabTitles: [
        {
          label: '',
          prop: 'checkIs',
          type: 'selection',
          width: '60',
        },
        {
          label: '序号',
          prop: 'id',
          type: 'index',
          width: '60',
        },
        {
          label: '部门/班组',
          prop: 'part',
          type: '',
          width: '120',
        },
        {
          label: '电压等级',
          prop: 'level',
          type: '',
          width: '120',
        },
        {
          label: '变电站',
          prop: 'transformer',
          type: '',
          width: '200',
        },
        {
          label: '维保类型',
          prop: 'maintaintype',
          type: 'hide',
          width: '120',
        },
        {
          label: '计划名称',
          prop: 'planname',
          type: '',
          width: '320',
        },
        {
          label: '计划内容',
          prop: 'plancontent',
          type: '',
          width: '240',
        },
        {
          label: '维保内容',
          prop: 'maintaincontent',
          type: '',
          width: '240',
        },
        {
          label: '维保时间',
          prop: 'maintaintime',
          type: '',
          width: '120',
        },
        {
          label: '维保单位',
          prop: 'maintaincompany',
          type: '',
          width: '120',
        },
        {
          label: '维保人员',
          prop: 'maintainperson',
          type: '',
          width: '100',
        },
        {
          label: '工作负责人',
          prop: 'workleader',
          type: '',
          width: '100',
        },
        {
          label: '维保结论',
          prop: 'maintainconclusion',
          type: '',
          width: '',
        },
      ],
      searchDatasOne: [
        {
          labelName: '运维单位',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'name',
        },
        {
          labelName: '部门/班组',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'part',
        },
        {
          labelName: '电压等级',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'level',
        },
        {
          labelName: '变电站',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'transformer',
        },
        {
          labelName: '维保类型',
          placeHolder: '请选择',
          opts: [
            {
              id: 0,
              fId: -1,
              vals: '年度',
            },
            {
              id: 1,
              fId: -1,
              vals: '季度',
            },
            {
              id: 2,
              fId: -1,
              vals: '月度',
            },
            {
              id: 3,
              fId: -1,
              vals: '临时',
            },
          ],
          typeis: 'select',
        },
        {
          labelName: '维保时间',
          placeHolder: '请选择',
          opts: '',
          typeis: 'sigCheck',
        },
        {
          labelName: '维保单位',
          placeHolder: '请选择时间',
          // opts: '',
          typeis: 'select',
        },
        {
          labelName: '维保人员',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
        },
        {
          labelName: '工作负责人',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
        },
        {
          labelName: '维保结论',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
        },
        {
          labelName: '计划名称',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
        },
      ],
      ParameterLists: ['录入', '导出'],
      conditions: ['筛选', '重置'],
      addIsShows: false,
      dialogVisibleval: true,
      filterVals: [],
      filterTabDatas: [],
      filterObj: {},
      searchOneAfter: [],
      finalParam: {},
    }
  },

  provide() {
    return {
      searchDatas: this.searchDatasOne,
      addItemShow: this.addIsShow,
    }
  },
  methods: {
    getFromGrason(val) {
      this.addIsShows = val
    },
    handleTags(item) {
      // alert(item)
      if (item === '录入') {
        this.addIsShows = true
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
      } else if (item === '导出') {
        alert('')
      } else if (item === '预览') {
        alert('')
      } else if (item === '重置') {
        resetIpt(this)
      } else if (item === '筛选') {
        handleFilter(this)
      }
    },
  },
  mounted() {
    //筛选框 获取下拉选项
    const params = {
      task: 'getSelectList',
      stationID: '',
    }
    pullDownList(params).then((result) => {
      const recData = result.data
      // this.searchOneAfter =
      this.searchDatasOne.map((item) => {
        if (item.identification === 'part') {
          recData.devops.map((el) => {
            const iptObj = { id: el.id, fId: el.fId, vals: el.name }
            item.opts.push(iptObj)
          })
        } else if (item.identification === 'name') {
          recData.company.map((el) => {
            const iptObj = { id: el.id, fId: el.fId, vals: el.name }
            item.opts.push(iptObj)
          })
        } else if (item.identification === 'level') {
          recData.volLevel.map((el) => {
            const iptObj = { id: el.id, fId: el.fId, vals: el.name }
            item.opts.push(iptObj)
          })
        } else if (item.identification === 'transformer') {
          recData.stationID.map((el) => {
            const iptObj = { id: el.id, fId: el.fId, vals: el.name }
            item.opts.push(iptObj)
          })
        }
        return item
      })
      // console.log('下拉', recData)
      console.log('下拉', item)
    })

    const _this = this
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)

      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (_this.filterVals[j].lableName === _this.filterVals[j - k].lableName) {
            _this.filterVals.splice(j - k, j - k + 1)
          }
        }
      }
      // console.log(_this.filterVals)
    })
  },
  beforeDestroy() {
    const _this = this
    _this.$bus.$off('input')
  },
}
export const mpmixin = {
  provide() {
    return {
      searchDatas: this.searchDatasOne,
      addItemShow: this.addIsShow,
    }
  },
  data() {
    return {
      addTabTitle: '计划新增',
      editTabTitle: '计划修改',
      mpTabTitles: [
        {
          label: '',
          prop: 'checkIs',
          type: 'selection',
          width: '60',
        },
        {
          label: '序号',
          prop: 'id',
          type: 'index',
          width: '60',
        },
        {
          label: '部门/班组',
          prop: 'part',
          type: '',
          width: '180',
        },
        {
          label: '电压等级',
          prop: 'level',
          type: '',
          width: '180',
        },
        {
          label: '变电站',
          prop: 'transformer',
          type: '',
          width: '220',
        },
        {
          label: '维保类型',
          prop: 'maintaintype',
          type: 'hide',
          width: '120',
        },
        {
          label: '计划名称',
          prop: 'planname',
          type: '',
          width: '220',
        },
        {
          label: '计划内容',
          prop: 'plancontent',
          type: '',
          width: '240',
        },
        {
          label: '计划时间',
          prop: 'plantime',
          type: '',
          width: '200',
        },
        {
          label: '计划状态',
          prop: 'planstate',
          type: '',
          width: '120',
        },
        {
          label: '备注',
          prop: 'remark',
          type: '',
          width: '',
        },
      ],
      searchDatasOne: [
        {
          labelName: '运维单位',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'name',
        },
        {
          labelName: '部门/班组',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'part',
        },
        {
          labelName: '电压等级',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'level',
        },
        {
          labelName: '变电站',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'transformer',
        },
        {
          labelName: '维保类型',
          placeHolder: '请选择',
          opts: [
            {
              id: 0,
              fId: -1,
              vals: '年度',
            },
            {
              id: 1,
              fId: -1,
              vals: '季度',
            },
            {
              id: 2,
              fId: -1,
              vals: '月度',
            },
            {
              id: 3,
              fId: -1,
              vals: '临时',
            },
          ],
          typeis: 'select',
        },
        {
          labelName: '计划名称',
          placeHolder: '请选择',
          opts: '',
          typeis: 'text',
        },
        {
          labelName: '计划时间',
          placeHolder: '请选择时间',
          // opts: '',
          typeis: 'sigCheck',
        },
        {
          labelName: '计划状态',
          placeHolder: '请选择',
          // opts: '',
          typeis: 'text',
        },
        {
          labelName: '备注',
          placeHolder: '请选择',
          // opts: '',
          typeis: 'text',
        },
      ],
      ParameterLists: ['新增', '修改', '删除', '导出', '计划执行'],
      conditions: ['筛选', '重置'],
      addIsShows: false,
      editIsShow: false,
      testExcel: [
        {
          id: '3',
          part: '3',
          level: '3',
          transformer: '3',
          maintaintype: 'maintaintype3',
          planname: 'planname3',
          plancontent: 'plancontent3',
          plantime: 'plantime3',
          planstate: 'planstate3',
          remark: 'remark3',
        },
      ],
      dialogVisible: false,
      dialogVisibleval: true,
      filterTabDatas: [],
      filterObj: {},
      filterVals: [],
      toTabDatas: [],
      seleFilters: {},
    }
  },
  methods: {
    getFromGrason(val) {
      this.addIsShows = val
      this.editIsShow = val
    },

    handleTags(item) {
      if (item === '新增') {
        this.addIsShows = true
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
      } else if (item === '修改') {
        this.editIsShow = true
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
        this.$refs.childTab.editTabs()
      } else if (item === '删除') {
        const _this = this
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
        this.dialogVisible = true
      } else if (item === '导出') {
        // this.outExe()
      } else if (item === '重置') {
        const _this = this
        resetIpt(_this)
        _this.filterVals = []
        const params = {
          task: 'getAllCamera',
          pageNow: 1,
          pageNum: 10,
        }
        _this.$refs.childTab.selectIf(params, 'cameraData')
      } else if (item === '筛选') {
        handleFilter(this)
        const _this = this
        // console.log('_this.filterVals', _this.filterVals)
        const seleFilter = _this.filterVals.map((item) => {
          return { lable: item.lableName, val: item.value1, val3: item.value3, val4: item.value4 }
        })
        _this.mpTabTitles.forEach((el) => {
          if (el.label !== '' || el.label !== '序号') {
            _this.seleFilters[el.prop] = seleFilter.find((item) => {
              return item.lable === el.label
            })
          }
        })
        const paramsSel = {
          task: 'getAllCamera',
          pageNow: 1,
          // export: 1,
          // pageNum: 10,
          // company: 1,
          // devops: '6E8E131D-ADAE-E2DB-B899-2A6AD53BA142',
          // volLevel: 0,
          // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
          // cameraMaintainType: 0,
          // planName: 'xx',
          // startDate: '2022-01-01',
          // endDate: '2022-01-02',
          // planStatus: 0,
          // comments: 'xx',
        }
        if (_this.seleFilters.planname) {
          paramsSel.planName = _this.seleFilters.planname.val
        }
        if (_this.seleFilters.productionCode) {
          paramsSel.startDate = _this.seleFilters.productionCode.val
        }
        if (_this.seleFilters.productionCode) {
          paramsSel.endDate = _this.seleFilters.productionCode.val
        }
        if (_this.seleFilters.productionCode) {
          paramsSel.planName = _this.seleFilters.productionCode.val
        }
        if (_this.seleFilters.productionCode) {
          paramsSel.planStatus = _this.seleFilters.productionCode.val
        }
        if (_this.seleFilters.productionCode) {
          paramsSel.comments = _this.seleFilters.productionCode.val
        }
      } else {
        alert('计划执行')
      }
    },
    delTab() {
      this.dialogVisible = false
      this.$refs.childTab.deleteTab()
    },
  },
  mounted() {
    //筛选框 获取下拉选项
    const params = {
      task: 'getSelectList',
      stationID: '',
    }
    pullDownList(params).then((result) => {
      const recData = result.data
      const handleFn = (label, items) => {
        const obj = {
          part: 'devops',
          name: 'company',
          level: 'volLevel',
          transformer: 'stationID',
        }
        recData[obj[label]].map((el) => {
          const iptObj = { id: el.id, fId: el.fId, vals: el.name }
          items.opts.push(iptObj)
        })
        return items
      }
      this.searchDatasOne.map((item) => {
        handleFn(item.identification, item)
        // console.log(item, 'item')
      })
    })
    //获取维保计划列表
    const paramTab = {
      task: 'cameraPlanList',
      pageNow: 1,
      // pageNum: 10,
    }
    pullDownList(paramTab).then((res) => {
      // console.log(res.data.data)
      this.toTabDatas = res.data.data
    })
    const _this = this
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)

      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (_this.filterVals[j].lableName === _this.filterVals[j - k].lableName) {
            _this.filterVals.splice(j - k, j - k + 1)
          }
        }
      }
      // console.log(_this.filterVals)
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    this.$bus.$off('input')
  },
}
