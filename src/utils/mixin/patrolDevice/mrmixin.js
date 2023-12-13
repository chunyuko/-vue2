import { resetIpt, download } from '@/views/PatrolDevice/js/commenFun'
import { pullDownList, exportFiles } from '@/service/api/views/patrolDevice/deviceAlarm.js'
export const mrmixin = {
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
      addTabTitle: '维保记录录入',
      pageNowIs: 1,
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
          labelName: '计划名称',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'planname',
        },
        {
          labelName: '维保类型',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'maintaintype',
        },
        {
          labelName: '维保时间',
          placeHolder: '请选择',
          opts: '',
          typeis: 'mulCheck',
          identification: 'maintaintime',
        },
        {
          labelName: '维保单位',
          placeHolder: '请选择',
          opts: [],
          typeis: 'select',
          identification: 'maintaincompany',
        },
        {
          labelName: '维保人员',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
          identification: 'maintainperson',
        },
        {
          labelName: '工作负责人',
          placeHolder: '',
          // opts: '',
          typeis: 'text',
          identification: 'workleader',
        },
        {
          labelName: '维保结论',
          placeHolder: '',
          opts: [
            { id: 0, vals: '不合格' },
            { id: 1, vals: '合格' },
          ],
          typeis: 'select',
          identification: 'maintainconclusion',
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
      selectDataIs: [],
      seleFilters: {},
      pullDownData: {},
    }
  },

  methods: {
    getFromGrason(val) {
      this.addIsShows = val
    },
    refresh() {
      this.getMainRe(this.pageNowIs)
    },
    //获取维保记录列表
    getMainRe(pageNowI) {
      const listFn = (pageTypeI) => {
        const recordData = {
          task: 'cameraMaintainList',
          pageNow: pageNowI,
          pageNum: 10,
          pageType: pageTypeI,
        }
        this.$refs.childTab.selectIf(recordData, 'cameraData')
      }
      if (this.mrtips === '摄像机计划') {
        listFn(0)
      } else if (this.mrtips === '机器人计划') {
        listFn(1)
      } else if (this.mrtips === '无人机计划') {
        listFn(2)
      } else if (this.mrtips === '声音采集计划') {
        listFn(3)
      }
    },
    handleTags(item) {
      // alert(item)
      if (item === '录入') {
        if (this.selectDataIs.length > 0) {
          this.$bus.$emit('showEdit', {})
          this.$refs.showRowDatas.defaultFun()
        }
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
      } else if (item === '导出') {
        const expRecor = async (pageTypeI) => {
          const rparams = {
            task: 'cameraPlanList',
            export: 1,
            pageType: pageTypeI,
          }
          const exports = await exportFiles(rparams)
          download(exports, '导出.xlsx')
        }
        if (this.mrtips === '摄像机计划') {
          expRecor(0)
        } else if (this.mrtips === '机器人计划') {
          expRecor(1)
        } else if (this.mrtips === '无人机计划') {
          expRecor(2)
        } else if (this.mrtips === '声音采集计划') {
          expRecor(3)
        }
      } else if (item === '预览') {
        alert('')
      } else if (item === '重置') {
        resetIpt(this)
        this.filterVals = []
        this.getMainRe()
      } else if (item === '筛选') {
        //筛选函数
        const selFun = (pageTypeI) => {
          const _this = this
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
          // console.log('_this.seleFilters', _this.seleFilters)
          const paramSelI = {
            task: 'cameraMaintainList',
            pageNow: 1,
            pageNum: 10,
            pageType: pageTypeI,
            // maintainCompany: '大立科技',
            // company: '1',
            // devops: '6E8E131D-ADAE-E2DB-B899-2A6AD53BA142',
            // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
          }
          const rparaObj = [
            { id: 'volLevel', prop: 'level', type: 'select' },
            { id: 'cameraMaintainType', prop: 'maintaintype', type: 'select' },
            { id: 'planName', prop: 'planname', pullId: 'plan', type: 'idToText' },
            { id: 'chargePerson', prop: 'workleader' },
            { id: 'maintainPerson', prop: 'maintainperson' },
            { id: 'resultStatus', prop: 'maintainconclusion', type: 'select' },
            {
              id: 'maintainCompany',
              prop: 'maintaincompany',
              pullId: 'maintainCompany',
              type: 'idToText',
            },
          ]
          rparaObj.forEach((item) => {
            if (_this.seleFilters[item.prop]) {
              if (item.type === 'select') {
                paramSelI[item.id] = _this.seleFilters[item.prop].val3
              } else if (item.type === 'idToText') {
                console.log('_this.pullDownData', _this.pullDownData)
                paramSelI[item.id] = _this.pullDownData[item.pullId].find((its) => {
                  return its.id === _this.seleFilters[item.prop].val3
                }).name
              } else {
                paramSelI[item.id] = _this.seleFilters[item.prop].val
              }
            }
          })
          if (_this.seleFilters.maintaintime) {
            paramSelI.startDate = _this.seleFilters.maintaintime.val4[0]
            paramSelI.endDate = _this.seleFilters.maintaintime.val4[1]
          }
          _this.$refs.childTab.selectIf(paramSelI, 'cameraData')
        }
        if (this.mrtips === '摄像机计划') {
          selFun(0)
        } else if (this.mrtips === '机器人计划') {
          selFun(1)
        } else if (this.mrtips === '无人机计划') {
          selFun(2)
        } else if (this.mrtips === '声音采集计划') {
          selFun(3)
        }
      }
    },
  },
  mounted() {
    //筛选框 获取下拉选项
    const pullDownI = (pageTypeI) => {
      const params = {
        task: 'getSelectList',
        stationID: '',
        pageType: pageTypeI,
      }
      pullDownList(params).then((result) => {
        this.pullDownData = result.data
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
        console.log('下拉', recData)
        const handleFn = (label, items) => {
          const obj = {
            part: 'devops',
            name: 'company',
            level: 'volLevel',
            transformer: 'stationID',
            maintaintype: 'cameraMaintainType',
            planname: 'plan',
            maintaincompany: 'maintainCompany',
          }
          if (recData[obj[label]]) {
            recData[obj[label]].map((el) => {
              const iptObj = { id: el.id, fId: el.fId, vals: el.name ? el.name : el.vals }
              items.opts.push(iptObj)
            })
          }

          return items
        }

        this.searchDatasOne.map((item) => {
          if (item.identification && item.opts instanceof Array) {
            handleFn(item.identification, item)
            // console.log(item, 'item')
          }
        })
      })
    }
    if (this.mrtips === '摄像机计划') {
      pullDownI(0)
    } else if (this.mrtips === '机器人计划') {
      pullDownI(1)
    } else if (this.mrtips === '无人机计划') {
      pullDownI(2)
    } else if (this.mrtips === '声音采集计划') {
      pullDownI(3)
    }
    this.getMainRe()
    const _this = this
    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码')
      _this.pageNowIs = msg
      _this.getMainRe(msg)
    })
    _this.$bus.$on('input', function (msg) {
      _this.filterVals.push(msg)
      for (let j = _this.filterVals.length - 1; j >= 0; j--) {
        for (let k = 1; k < _this.filterVals.length; k++) {
          if (j >= k) {
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
    _this.$bus.$off('input')
    _this.$bus.$off('pageNow')
    _this.$bus.$off('selectDatas')
  },
}
