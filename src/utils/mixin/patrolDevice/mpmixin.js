import { resetIpt, download } from '@/views/PatrolDevice/js/commenFun'
import {
  pullDownList,
  patroCameraLedger,
  cameraLedgerAdd,
  exportFiles,
  exportCarFiles,
} from '@/service/api/views/patrolDevice/deviceAlarm.js'
export const mpmixin = {
  provide() {
    return {
      searchDatas: this.searchDatasOne,
      addItemShow: this.addIsShow,
      refresh: this.refresh,
      filterVals: this.filterVals,
      titleToSearch: this.addTabTitle,
    }
  },
  data() {
    return {
      addTabTitle: '计划新增',
      editTabTitle: '计划修改',
      pageNowIs: 1,
      toTabHight: '88%',
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
          opts: [],
          typeis: 'select',
          identification: 'maintaintype',
        },
        {
          labelName: '计划名称',
          placeHolder: '请选择',
          opts: '',
          typeis: 'text',
          // identification: 'planname',
        },
        {
          labelName: '计划状态',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'planstate',
        },
        {
          labelName: '计划时间',
          placeHolder: '请选择时间',
          opts: [],
          typeis: 'mulCheck',
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
      dialogVisible: false,
      dialogVisibleval: true,
      filterTabDatas: [],
      filterObj: {},
      filterVals: [],
      toTabDatas: [],
      seleFilters: {},
      selectDataIs: [],
      showEdit: {},
    }
  },
  methods: {
    getFromGrason(val) {
      this.addIsShows = val
      this.editIsShow = val
    },
    refresh() {
      this.getMainPlan(this.pageNowIs)
    },
    //获取维保计划列表
    getMainPlan(pageNowI) {
      //请求函数
      const reqFun = (pageTypeI) => {
        const paramTab = {
          task: 'cameraPlanList',
          pageNow: pageNowI,
          pageType: pageTypeI,
          pageNum: 10,
          // pageType => 0摄像机 1机器人 2无人机 3声音采集器
        }
        this.$refs.childTab.selectIf(paramTab, 'cameraData')
      }
      if (this.mptips === '摄像机计划') {
        reqFun(0)
      } else if (this.mptips === '机器人计划') {
        reqFun(1)
      } else if (this.mptips === '无人机计划') {
        reqFun(2)
      } else if (this.mptips === '声音采集计划') {
        reqFun(3)
      }
    },
    async handleTags(item) {
      if (item === '新增') {
        this.$bus.$emit('showEdit', {})
        setTimeout(() => {
          this.$bus.$emit('showDefault', true)
        }, 600)
        this.$bus.$emit('add', this.addTabTitle)
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
      } else if (item === '修改') {
        if (this.selectDataIs.length > 1) {
          return this.$message.error('只能选择一条修改')
        } else if (this.selectDataIs.length === 0) {
          return this.$message.error('您并未选择需要修改的数据')
        }
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
        this.$bus.$emit('edit', this.editTabTitle)
        const params = {
          task: 'getCameraMaintain',
          maintainID: this.selectDataIs[0].maintainID,
        }
        const res = await patroCameraLedger(params)
        this.showEdit = res.data
        // console.log('this.showEdit', this.showEdit)
        // console.log('下拉处理选项：', this.pullDownLists)
        this.$bus.$emit('showEdit', this.showEdit)
      } else if (item === '删除') {
        this.dialogVisible = true
        const _this = this
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
        this.dialogVisible = true
      } else if (item === '导出') {
        // if (this.selectDataIs.length === 0) {
        const exportFun = async (pageTypeI) => {
          console.log('导出维保计划')
          const params = {
            task: 'cameraPlanList',
            export: 1,
            pageType: pageTypeI,
            // pageNow: '1',
            // pageNum: '10',
            // company: '1',
            // devops: '6E8E131D-ADAE-E2DB-B899-2A6AD53BA142',
            // volLevel: '0',
            // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
            // cameraMaintainType: '0',
            // planName: 'xx',
            // startDate: '2022-01-01',
            // endDate: '2022-01-02',
            // planStatus: '0',
            // comments: 'xx',
          }

          const exports = await exportFiles(params)
          download(exports, '维保计划列表.xlsx')
        }
        if (this.mptips === '摄像机计划') {
          exportFun(0)
        } else if (this.mptips === '机器人计划') {
          exportFun(1)
        } else if (this.mptips === '无人机计划') {
          exportFun(2)
        } else if (this.mptips === '声音采集计划') {
          exportFun(3)
        }
      } else if (item === '重置') {
        resetIpt(this)
        this.filterVals = []
        this.getMainPlan()
      } else if (item === '筛选') {
        //筛选函数
        const selFun = (pageTypeI) => {
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
          // console.log(_this.seleFilters, '_this.seleFilters')
          const paramsSel = {
            task: 'cameraPlanList',
            pageNow: 1,
            pageNum: 10,
            pageType: pageTypeI,
          }
          const paraObj = [
            { id: 'volLevel', prop: 'level', type: 'select' },
            { id: 'cameraMaintainType', prop: 'maintaintype', type: 'select' },
            { id: 'planName', prop: 'planname' },
            { id: 'planStatus', prop: 'planstate', type: 'select' },
            { id: 'comments', prop: 'remark' },
            { id: 'manufacture', prop: 'plancontent' },
          ]
          paraObj.forEach((item) => {
            if (_this.seleFilters[item.prop]) {
              if (item.type === 'select') {
                paramsSel[item.id] = _this.seleFilters[item.prop].val3
              } else {
                paramsSel[item.id] = _this.seleFilters[item.prop].val
              }
            }
          })
          if (_this.seleFilters.plantime) {
            paramsSel.startDate = _this.seleFilters.plantime.val4[0]
            paramsSel.endDate = _this.seleFilters.plantime.val4[1]
          }
          _this.$refs.childTab.selectIf(paramsSel, 'cameraData')
        }

        if (this.mptips === '摄像机计划') {
          selFun(0)
        } else if (this.mptips === '机器人计划') {
          selFun(1)
        } else if (this.mptips === '无人机计划') {
          selFun(2)
        } else if (this.mptips === '声音采集计划') {
          selFun(3)
        }
      } else if (item === '计划执行') {
        const executePlan = {
          task: 'execCameraPlan',
          maintainID: this.selectDataIs[0].maintainID,
        }
        cameraLedgerAdd(executePlan).then((res) => {
          console.log(res)
        })
        setTimeout(() => {
          this.getMainPlan()
        }, 500)
      }
    },
    delTab() {
      this.dialogVisible = false
      // this.$refs.childTab.deleteTab()
      const IDs = this.selectDataIs.map((item) => {
        return item.maintainID
      })
      // console.log(IDs.join(','))
      const params = {
        task: 'delCameraMaintain',
        maintainID: IDs.join(','),
      }
      cameraLedgerAdd(params)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      setTimeout(() => {
        this.getMainPlan()
      }, 500)
    },
    //控制table距离底部高度
    controlHight() {
      if (tbBottom.bottom < 920) {
        console.log(tbBottom, 'table距离底部高度')
        this.toTabHight = '30rem'
      }
    },
  },
  mounted() {
    //筛选框 获取下拉选项
    const params = {
      task: 'getSelectList',
      stationID: '',
      pageType: 0,
    }
    pullDownList(params).then((result) => {
      const recData = result.data
      //电压等级排序
      recData.volLevel = recData.volLevel.map((item) => {
        const numkV = item.name.slice(0, -2)
        return { id: item.id, vals: item.name, sortNum: numkV }
      })
      function ObjSortFun(valName) {
        return function (val1, val2) {
          val1 = val1[valName]
          val2 = val2[valName]
          return val1 - val2
        }
      }
      recData.volLevel.sort(ObjSortFun('sortNum'))
      console.log('下拉', recData.volLevel)
      const handleFn = (label, items) => {
        const obj = {
          part: 'devops',
          name: 'company',
          level: 'volLevel',
          transformer: 'stationID',
          maintaintype: 'cameraMaintainType',
          planstate: 'planStatus',
        }
        recData[obj[label]].map((el) => {
          const iptObj = { id: el.id, fId: el.fId, vals: el.name ? el.name : el.vals }
          items.opts.push(iptObj)
        })
        return items
      }
      this.searchDatasOne.map((item) => {
        if (item.identification) {
          handleFn(item.identification, item)
          // console.log(item, 'item')
        }
      })
    })

    //获取维保计划列表
    this.getMainPlan()
    const _this = this

    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码')
      _this.pageNowIs = msg
      _this.getMainPlan(msg)
    })
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)

      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (j > k) {
            if (_this.filterVals[j].lableName === _this.filterVals[j - k].lableName) {
              _this.filterVals.splice(j - k, j - k + 1)
            }
          }
        }
      }
      // console.log(_this.filterVals)
    })
    _this.$bus.$on('selectDatas', function (data) {
      // console.log(data)
      _this.selectDataIs = data
    })
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    _this.$bus.$off('input')
    _this.$bus.$off('selectDatas')
    _this.$bus.$off('pageNow')
  },
}
