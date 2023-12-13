import {
  cameraLedgerEdit,
  exportFiles,
  cameraLedgerAdd,
  exportCarFiles,
  carLedgerDel,
  carData,
} from '@/service/api/views/patrolDevice/deviceAlarm'
import {
  download,
  handleFilter,
  delDatas,
  bookEdit,
  pullDown,
  resetIpt,
} from '@/views/PatrolDevice/js/commenFun'
export const mixin = {
  data() {
    return {
      maskShow: false,
      hasSelection: {},
      bookAddTitle: '台账新增',
      bookEditTitle: '台账修改',
      ParameterLists: ['显示设置', '新增', '复制', '修改', '删除', '导出', '导入'],
      conditions: ['筛选', '重置'],
      addIsShow: false,
      editIsShow: false,
      custIsShow: false,
      newTabTitles: [],
      fileList: [],
      tableHead: [],
      dialogVisible: false,
      filterVals: [],
      filterTabDatas: [],
      filterObj: {},
      dialogVisibleval: true,
      showEdit: {},
      selectDataIs: [],
      searchDatasAfter: [],
      seleFilters: {},
      pullDownLists: {},
      hicalRela: {}, //有层级关系的下拉选项
      pageTotals: 0,
      pageNowIs: 1,
      exportDialog: false,
      fileExcel: new FormData(),
      copyData: {},
      finalParam: {},
    }
  },
  provide() {
    return {
      searchDatasIs: this.searchDatas,
      addItemShow: this.addIsShow,
      refresh: this.refresh,
      customTipI: this.customTip,
      filterVals: this.filterVals,
      pullDownLists: this.pullDownLists,
      tabTitles: this.tabTitles,
      finalParam: this.finalParam,
    }
  },
  inject: {
    reload: { default: null }, //刷新整个页面
  },
  methods: {
    refresh() {
      this.getReload()
    },
    getReload() {
      // console.log(this.pageNowIs, 'this.pageNowIs')
      this.getBook(this.pageNowIs)
    },
    getBook(pageNowI, filterParams) {
      //小函数
      const getListFun = (taskType, pageTypeI, ajaxPhp) => {
        this.$refs.childTab.selectIf(
          {
            task: taskType, //'getAllCamera',
            pageNow: pageNowI ? pageNowI : 1,
            pageNum: 10,
            pageType: pageTypeI,
            ...filterParams,
          },
          ajaxPhp
        ) //'cameraData'
      }
      if (this.customTip === '摄像机台账') {
        getListFun('getAllCamera', 0, 'cameraData')
      } else if (this.customTip === '机器人台账') {
        getListFun('getAllCar', 1, 'carData')
      } else if (this.customTip === '无人机台账') {
        getListFun('getAllCar', 2, 'carData')
      } else if (this.customTip === '声音采集器台账') {
        getListFun('getAllCamera', 3, 'cameraData')
      }
    },
    getFromGrason(val) {
      this.addIsShow = val
    },
    getFromCust(val) {
      this.custIsShow = val
    },
    async handleTags(item) {
      // alert(this.addIsShow);
      if (item === '新增') {
        // if (this.selectDataIs.length > 0) {
        this.$bus.$emit('showEdit', {})
        setTimeout(() => {
          this.$bus.$emit('showDefault', true)
        }, 600)
        this.$bus.$emit('add', this.bookAddTitle)
        // this.addIsShow = true
        this.$bus.$emit('dialogVisibleval', this.dialogVisibleval)
      } else if (item === '复制') {
        if (this.selectDataIs.length > 1) {
          return this.$message.error('一次只能复制一条')
        } else if (this.selectDataIs.length === 0) {
          return this.$message.error('您并未选择需要复制的数据')
        }
        //获取目前选中ID---摄像机台账新增
        if (this.customTip === '摄像机台账' || this.customTip === '声音采集器台账') {
          const camId = this.selectDataIs[0].cameraID
          //根据ID获取台账信息
          const getCopParam = {
            task: 'getCamera',
            camera_id: camId,
          }
          this.copyData = await cameraLedgerAdd(getCopParam)
          console.log('copyData复制的数据', this.copyData.data)

          //根据已获取台账信息新增一条数据
          const copyParam = new FormData()
          copyParam.append('task', 'addCamera')

          const keyI = Object.keys(this.copyData.data)
          //将键值转为入参格式
          const keyPara = keyI.map((el) => {
            const indexI = el.indexOf('_')
            if (indexI !== -1) {
              const beforeUpper = el.slice(0, indexI)
              const afterUpper = el.slice(indexI + 2)
              const Upper = el.charAt(indexI + 1).toUpperCase()
              return beforeUpper + Upper + afterUpper
            }
            return el
          })
          console.log(keyPara, '复制数据的入参')
          const valueI = Object.values(this.copyData.data)
          // console.log(keyI, valueI)
          const ipI = []
          keyPara.forEach((item, index) => {
            if (item === 'ipcIp') {
              ipI.push(valueI[index])
            }
            if (item === 'ifrIp') {
              ipI.push(valueI[index])
            }
            const ips = ipI.join('/')
            console.log(ips, copyParam.get('ip'))
            if (copyParam.get('ip') === null && ips !== []) {
              copyParam.append('ip', '')
            } //需要将ifrIp和ipcIp拼在一起
            // console.log(ipI, ips)
            if (item === 'ipcVideo_url') {
              item = 'IPCVideoUrl'
            } else if (item === 'stationId') {
              item = 'stationID'
            } else if (item === 'type') {
              item = 'modelType'
            }

            if (
              item !== 'cameraId' &&
              item !== 'ipcType' &&
              item !== 'ifrType' &&
              item !== 'ipcType' &&
              item !== 'ipcIp' &&
              item !== 'stationName' &&
              item !== 'sectionName' &&
              item !== 'ifrIp' &&
              item !== 'parentId'
            ) {
              copyParam.append(item, valueI[index])
            }

            return copyParam
          })
          //新增一条数据
          if (this.customTip === '声音采集器台账') {
            copyParam.append('pageType', 3)
          } else if (this.customTip === '摄像机台账') {
            copyParam.append('pageType', 0)
          }
          console.log(copyParam.get('stationID'), '复制数据的入参')
          cameraLedgerEdit(copyParam).then((res) => {
            console.log(res, '复制数据结果')
          })
          this.reload()
        } else if (this.customTip === '机器人台账') {
          const carID = this.selectDataIs[0].carID
          const getRobParam = {
            task: 'getCarByID',
            carID: carID,
          }
          const copyRob = await carData(getRobParam)
          console.log(copyRob, '根据机器人id获取的接口数据')
          const copyParas = new FormData()
          copyParas.append('task', 'modifyCar')
          const objEx = {
            stationID: copyRob.data.station_id,
            carType: copyRob.data.car_type,
            carName: copyRob.data.car_name,
            carNumber: copyRob.data.car_name,
            productionCode: copyRob.data.production_code,
            manufacture: copyRob.data.manufacture,
            size: copyRob.data.size,
            weight: copyRob.data.weight,
            operationTime: copyRob.data.operation_time,
            transmission: copyRob.data.transmission,
            protectLevel: copyRob.data.protect_level,
            commMode: copyRob.data.comm_mode,
            carMoveSpeed: copyRob.data.carMoveSpeed,
            leftRightPrecision: copyRob.data.left_right_precision,
            frontBackPrecision: copyRob.data.front_back_precision,
            navigation: copyRob.data.navigation,
            pageType: 1,
            carVersion: copyRob.data.carVersion,
          }
          Object.keys(objEx).map((key) => {
            copyParas.append(key, objEx[key])
            return copyParas
          })
          console.log('机器人复制入参', copyParas.get('stationID'))
          carLedgerDel(copyParas).then((res) => {
            console.log(res, '机器人复制数据结果')
          })
          this.reload()
        } else if (this.customTip === '无人机台账') {
          const carID = this.selectDataIs[0].carID
          const getRobParam = {
            task: 'getCarByID',
            carID: carID,
          }
          const copyRob = await carData(getRobParam)
          console.log(copyRob, '根据无人机id获取的接口数据')
          const copyParas = new FormData()
          copyParas.append('task', 'modifyCar')
          const objEx = {
            stationID: copyRob.data.station_id,
            carType: copyRob.data.car_type,
            carName: copyRob.data.car_name,
            carNumber: copyRob.data.car_name,
            productionCode: copyRob.data.production_code,
            manufacture: copyRob.data.manufacture,
            size: copyRob.data.size,
            weight: copyRob.data.weight,
            operationTime: copyRob.data.operation_time,
            transmission: copyRob.data.transmission,
            protectLevel: copyRob.data.protect_level,
            commMode: copyRob.data.comm_mode,
            carMoveSpeed: copyRob.data.carMoveSpeed,
            leftRightPrecision: copyRob.data.left_right_precision,
            frontBackPrecision: copyRob.data.front_back_precision,
            navigation: copyRob.data.navigation,
            carVersion: copyRob.data.carVersion,
            //无人机参数
            flyLandMode: copyRob.flyLandMode,
            maxWeight: copyRob.maxWeight,
            resistWindLevel: copyRob.resistWindLevel,
            carFlyHeight: copyRob.carFlyHeight,
            carFlyTime: copyRob.carFlyTime,
            carHeight: copyRob.carHeight,
            carLength: copyRob.carLength,
            carWidth: copyRob.carWidth,
            workRadius: copyRob.workRadius,
            pageType: 2,
          }
          Object.keys(objEx).map((key) => {
            copyParas.append(key, objEx[key])
            return copyParas
          })
          console.log('无人机复制入参', copyParas.get('stationID'))
          carLedgerDel(copyParas).then((res) => {
            console.log(res, '无人机复制数据结果')
          })
          this.reload()
        }
      } else if (item === '删除') {
        if (this.selectDataIs.length === 0) {
          return this.$message.info('您并未选择要删除的数据')
        }
        const _this = this
        this.dialogVisible = true
        _this.$bus.$on('helloEdit', function (msg) {
          _this.hasSelection = msg
        })
      } else if (item === '修改') {
        this.$bus.$emit('edit', this.bookEditTitle)
        if (this.customTip === '摄像机台账') {
          bookEdit(this, 'getCamera', 'camera_id', '修改')
        } else if (this.customTip === '机器人台账') {
          bookEdit(this, 'getCarByID', 'carID', '修改')
        } else if (this.customTip === '无人机台账') {
          bookEdit(this, 'getCarByID', 'carID', '修改')
        } else if (this.customTip === '声音采集器台账') {
          bookEdit(this, 'getCamera', 'camera_id', '修改')
        }
      } else if (item === '导出') {
        // console.log(this.selectDataIs)
        //导出接口函数
        const exportFun = async (taskPara, IDName, pageType, apiPara) => {
          if (this.selectDataIs.length === 0) {
            const params = {
              task: taskPara, //'getAllCamera',
              export: 1,
              pageNow: Math.floor(this.pageTotals / 10),
              pageNum: 10,
              pageType: pageType,
            }
            if (apiPara === 'carData') {
              const exports = await exportCarFiles(params)
              download(exports, '导出.xlsx')
            } else if (apiPara === 'cameraData') {
              const exports = await exportFiles(params)
              download(exports, '导出.xlsx')
            }
          }
          // else {
          //   //选中行数导出
          //   const camID = this.selectDataIs.map((item) => {
          //     return item[IDName] //.cameraID
          //   })
          //   // console.log(camID, 'camID')
          //   const params = {
          //     task: taskPara, //'getAllCamera',
          //     export: 1,
          //     cameraID: camID.join(','),
          //     pageType: pageType,
          //   }
        }

        if (this.customTip === '摄像机台账') {
          exportFun('getAllCamera', 'cameraID', 0, 'cameraData')
        } else if (this.customTip === '机器人台账') {
          exportFun('getAllCar', 'carID', 1, 'carData')
        } else if (this.customTip === '无人机台账') {
          exportFun('getAllCar', 'carID', 2, 'carData')
        } else if (this.customTip === '声音采集器台账') {
          exportFun('getAllCamera', 'cameraID', 3, 'cameraData')
        }

        // console.log(exports)
      } else if (item === '重置') {
        const _this = this
        resetIpt(_this)
        _this.filterVals = []
        _this.finalParam = {}
        //重置函数
        _this.getBook(1)
        // const resetFun = (taskPara, pageTypeI) => {
        //   const params = {
        //     task: taskPara, //'getAllCamera',
        //     pageNow: 1,
        //     pageNum: 10,
        //     pageType: pageTypeI,
        //   }
        //   _this.$refs.childTab.selectIf(params, 'cameraData')
        // }
        if (_this.customTip === '摄像机台账') {
          resetFun('getAllCamera', 0)
        } else if (_this.customTip === '机器人台账') {
          resetFun('getAllCar', 1)
        } else if (_this.customTip === '无人机台账') {
          resetFun('getAllCar', 2)
        } else if (_this.customTip === '声音采集器台账') {
          resetFun('getAllCamera', 3)
        }
      } else if (item === '筛选') {
        setTimeout(() => {
          this.$bus.$emit('filterPage1', 1)
        }, 300)

        if (this.customTip === '摄像机台账') {
          handleFilter(
            this,
            {
              task: 'getAllCamera',
              pageType: 0,
              // pageNow: this.pageNowIs ? this.pageNowIs : 1,
              pageNum: 10,
            },
            'cameraData',
            this.pullDownLists
          )
        } else if (this.customTip === '机器人台账') {
          handleFilter(
            this,
            {
              task: 'getAllCar',
              pageType: 1,
              // pageNow: this.pageNowIs ? this.pageNowIs : 1,
              pageNum: 10,
              // cameraID: 1,
              // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
            },
            'carData'
          )
        } else if (this.customTip === '无人机台账') {
          handleFilter(
            this,
            {
              task: 'getAllCar',
              pageType: 2,
              // pageNow: this.pageNowIs ? this.pageNowIs : 1,
              pageNum: 10,
              // cameraID: 1,
              // stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
            },
            'carData'
          )
        } else if (this.customTip === '声音采集器台账') {
          handleFilter(
            this,
            {
              task: 'getAllCamera',
              pageType: 3,
              // pageNow: this.pageNowIs ? this.pageNowIs : 1,
              pageNum: 10,
            },
            'cameraData'
          )
        }
      } else if (item === '显示设置') {
        this.$refs.childCustom.showCustom()
      } else if (item === '缺陷次数') {
        this.$refs.childAddBooks.showAddBooks()
      }
    },
    delTab() {
      if (this.customTip === '摄像机台账') {
        delDatas(this, 'delCamera', 'cameraID')
      } else if (this.customTip === '机器人台账') {
        delDatas(this, 'delCar', 'carID')
      } else if (this.customTip === '无人机台账') {
        delDatas(this, 'delCar', 'carID')
      } else if (this.customTip === '声音采集器台账') {
        delDatas(this, 'delCamera', 'cameraID')
      }
    },
    //导入文件成功函数
    handleAvatarSuccess(res, file) {
      const _this = this
      //导入参数函数
      const importFun = (taskPara, pageType) => {
        // debugger
        _this.fileExcel.append('task', taskPara)
        _this.fileExcel.append('pageType', pageType)
        _this.fileExcel.append('file', file.raw)
        console.log(file.raw, '文件信息', _this.fileExcel.get('task'), '导入参数信息')
        if (pageType === 0 || pageType === 3) {
          cameraLedgerEdit(_this.fileExcel)
            .then((res) => {
              // console.log('formdataedit', res)
              if (res.code === 200 && res.msg === 'ok') {
                _this.$message.success('导入成功')
              } else {
                _this.$message.error('导入失败：' + res.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else if (pageType === 1 || pageType === 2) {
          carLedgerDel(_this.fileExcel)
            .then((res) => {
              // console.log('formdataedit', res)
              if (res.code === 200 && res.msg === 'ok') {
                _this.$message.success('导入成功')
              } else {
                _this.$message.error('导入失败：' + res.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
      if (_this.customTip === '摄像机台账') {
        importFun('importCamera', 0)
      } else if (_this.customTip === '机器人台账') {
        importFun('importCar', 1)
      } else if (_this.customTip === '无人机台账') {
        importFun('importCar', 2)
      } else if (_this.customTip === '声音采集器台账') {
        importFun('importCamera', 3)
      }
    },
  },
  mounted() {
    this.getBook(1)

    //显示下拉
    if (this.customTip === '摄像机台账') {
      pullDown(this, 'getSelectList', 0, 'viction')
    } else if (this.customTip === '机器人台账') {
      pullDown(this, 'getSelectList', 1, 'robot')
    } else if (this.customTip === '无人机台账') {
      pullDown(this, 'getSelectList', 2, 'uav')
    } else if (this.customTip === '声音采集器台账') {
      pullDown(this, 'getSelectList', 3, 'soundColl')
    }

    const _this = this
    _this.$bus.$on('pagecontents', function (msg) {
      _this.pageTotals = Number(msg)
      // console.log(_this.pageTotals === 314, '数据总条数')
    })
    _this.$bus.$on('pageNow', function (msg) {
      // console.log(msg, '页码', '筛选参数', _this.finalParam)
      // _this.filterVals.forEach((item) => {})
      _this.pageNowIs = msg
      _this.getBook(_this.pageNowIs, _this.finalParam) //
    })
    _this.$bus.$on('selectDatas', function (data) {
      // console.log(data, '选中了table  数据显示了')
      _this.selectDataIs = data
    })
    _this.$bus.$on('maskIsShow', function (data) {
      // console.log(data)
      _this.maskShow = data
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
      // _this.$bus.$emit('pullDownLists', _this.pullDownLists)
      // console.log('_this.filterVals过滤的筛选数据', _this.filterVals)
    })
    // console.log('_this.filterVals过滤的筛选数据waimianwai1111', _this.filterVals)
  },
  beforeDestroy() {
    const _this = this
    // 销毁事件（重要）
    _this.$bus.$off('helloEdit')
    _this.$bus.$off('maskIsShow')
    _this.$bus.$off('input')
    _this.$bus.$off('selectDatas')
    _this.$bus.$off('pageNow')
    _this.$bus.$off('pagecontents')
  },
}
