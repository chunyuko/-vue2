import {
  cameraLedgerAdd,
  patroCameraLedger,
  pullDownList,
  carData,
} from '@/service/api/views/patrolDevice/deviceAlarm.js'
//台账修改
export const bookEdit = async (thisII, editTask, idName, displayI) => {
  if (thisII.selectDataIs.length > 1) {
    return thisII.$message.error('只能选择一条' + displayI)
  } else if (thisII.selectDataIs.length === 0) {
    return thisII.$message.error('您并未选择需要' + displayI + '的数据')
  }
  thisII.$bus.$emit('dialogVisibleval', thisII.dialogVisibleval)
  const editParams = {}
  editParams.task = editTask
  if (editTask === 'getCamera') {
    editParams[idName] = thisII.selectDataIs[0].cameraID
    const res = await patroCameraLedger(editParams)
    thisII.showEdit = res.data
  } else if (editTask === 'getCarByID') {
    editParams[idName] = thisII.selectDataIs[0].carID
    console.log(editParams, '参数')
    const res = await carData(editParams)
    console.log(res, '机器人根据id获取台账信息')
    thisII.showEdit = res.data
  } else if (editTask === 'getCameraDefectRelation') {
    editParams[idName] = thisII.selectDataIs[0].sheetID
    console.log(editParams, '参数')
    const res = await patroCameraLedger(editParams)
    console.log(res, '根据id获取处理单信息')
    thisII.showEdit = res.data.data[0]
  }

  thisII.showEdit.valLevelI = thisII.pullDownLists.volLevels
  thisII.showEdit.modelI = thisII.pullDownLists.models
  thisII.showEdit.manufactureI = thisII.pullDownLists.manufactures
  // console.log('下拉处理选项：', thisII.pullDownLists)
  thisII.$bus.$emit('showEdit', thisII.showEdit)
}
//预览
export const bookPreview = async (thisII, editTask, idName, displayI) => {
  const editParams = {}
  editParams.task = editTask
  if (editTask === 'getCamera') {
    editParams[idName] = thisII.selectDataIs[0].cameraID
    const res = await patroCameraLedger(editParams)
    thisII.showEdit = res.data
  } else if (editTask === 'getCarByID') {
    editParams[idName] = thisII.selectDataIs[0].carID
    console.log(editParams, '参数')
    const res = await carData(editParams)
    console.log(res, '机器人根据id获取台账信息')
    thisII.showEdit = res.data
  } else if (editTask === 'getCameraDefectRelation') {
    editParams[idName] = thisII.selectDataIs[0].sheetID
    console.log(editParams, '参数')
    const res = await patroCameraLedger(editParams)
    console.log(res, '根据id获取处理单信息')
    thisII.showEdit = res.data.data[0]
  }

  thisII.showEdit.valLevelI = thisII.pullDownLists.volLevels
  thisII.showEdit.modelI = thisII.pullDownLists.models
  thisII.showEdit.manufactureI = thisII.pullDownLists.manufactures
  // console.log('下拉处理选项：', thisII.pullDownLists)
  thisII.$bus.$emit('showEdit', thisII.showEdit)
}
//缺陷处理
export const handleDefeat = async (thisII, editTask, idName) => {
  if (thisII.selectDataIs.length > 1) {
    return thisII.$message.error('只能选择一条进行处理')
  } else if (thisII.selectDataIs.length === 0) {
    thisII.$message.error('您并未选择需要处理的数据')
    return false
  }
  thisII.$bus.$emit('dialogVisibleval', thisII.dialogVisibleval)
  const handleParams = {}
  handleParams.task = editTask
  if (editTask === 'getCameraDefectRelation') {
    handleParams[idName] = thisII.selectDataIs[0].sheetID
    console.log(handleParams, '参数')
    const res = await patroCameraLedger(handleParams)
    console.log(res, '根据id获取处理单信息')
    thisII.showEdit = res.data.data[0]
  }

  thisII.showEdit.valLevelI = thisII.pullDownLists.volLevels
  thisII.showEdit.modelI = thisII.pullDownLists.models
  thisII.showEdit.manufactureI = thisII.pullDownLists.manufactures
  // console.log('下拉处理选项：', thisII.pullDownLists)
  thisII.$bus.$emit('showEdit', thisII.showEdit)
}
//重置
export const resetIpt = (thisIs) => {
  thisIs.$bus.$emit('resetSelection', null)
}
//筛选处理
export const handleFilter = (thisIs, apiParams, dataType, coverAreaIs) => {
  const _this = thisIs
  // console.log('_this.filterVals过滤后的筛选数据', _this.filterVals)
  _this.filterVals = _this.filterVals === undefined ? [] : _this.filterVals
  const seleFilter = _this.filterVals.map((item) => {
    return { lable: item.lableName, val: item.value1, val3: item.value3, val4: item.value4 }
  })
  // console.log(_this.tabTitles, '筛选的选项')
  // debugger
  _this.tabTitles.forEach((el) => {
    if (el.label !== '' || el.label !== '序号') {
      _this.seleFilters[el.prop] = seleFilter.find((item) => {
        return item.lable === el.label
      })
    }
  })
  // console.log(_this.seleFilters, '筛选的默认选项')
  _this.seleFilters.productionCode = seleFilter.find((item) => {
    return item.lable === '出厂序列号'
  })
  _this.seleFilters.master = seleFilter.find((item) => {
    return item.lable === '设备主人'
  })
  _this.seleFilters.operateDate = seleFilter.find((item) => {
    return item.lable === '投运日期'
  })
  _this.seleFilters.returnDate = seleFilter.find((item) => {
    return item.lable === '退运日期'
  })
  _this.seleFilters.detectedate = seleFilter.find((item) => {
    //缺陷发现时间
    return item.lable === '发现时间'
  })
  // console.log(_this.seleFilters, 'findyou')
  const params = apiParams
  const paraObj = [
    //台账查询参数
    { id: 'company', prop: 'name', type: 'select' },
    { id: 'devops', prop: 'part', type: 'select' },
    { id: 'stationID', prop: 'transformer', type: 'select' },
    { id: 'master', prop: 'master' },
    { id: 'volLevel', prop: 'level', type: 'select' },
    { id: 'placePosition', prop: 'place' },
    { id: 'number', prop: 'num' },
    { id: 'type', prop: 'type', type: 'select' },
    { id: 'modelType', prop: 'tnum', type: 'select' },
    { id: 'algorithmVersion', prop: 'version' },
    { id: 'ip', prop: 'ip' },
    { id: 'defectCount', prop: 'flawnum' },
    { id: 'manufacture', prop: 'produ', prop1: 'robotProdu', type1: 'select' },
    { id: 'coverArea', prop: 'area', type: 'selectcoverArea' },
    { id: 'Offline', prop: 'Offline', type: 'select' },
    //加上机器人
    { id: 'carType', prop: 'type', type: 'select' },
    { id: 'cameraName', prop: 'tname' },
    { id: 'carNumber', prop: 'num' },
    { id: 'productionCode', prop: 'serialnumber' },
    { id: 'carVersion', prop: 'tnum', type: 'select' },
    // { id: 'operateStartDate', prop: 'Offline', type: 'select' },
    // { id: 'operateEndDate', prop: 'Offline', type: 'select' },
    //加上无人机

    //加上装置告警
    { id: 'bugLevel', prop: 'alarmlevel', type: 'select' },
    { id: 'status', prop: 'authorizationstate', type: 'select' },
    { id: 'alarmDesc', prop: 'alarmdescription' },
    //加上装置缺陷
    { id: 'defectType', prop: 'detecttype', type: 'select' },
    { id: 'defectLevel', prop: 'defectlevel', type: 'select' },
    { id: 'defectStatus', prop: 'detectstate', type: 'select' },
    { id: 'reportPerson', prop: 'detecteperson' },
    { id: 'defectDesc', prop: 'defectdescription' },
    //加上缺陷安排
    { id: 'sheetDesc', prop: 'sheetDesc' },
    { id: 'createPerson', prop: 'author' },
    { id: 'sheetStatus', prop: 'procestate', type: 'select' },
    { id: 'checkPerson', prop: 'checkperson' },
    { id: 'comments', prop: 'comments' },
  ]
  //遍历对象 判断输入框是否有值  并将值作为参数请求接口
  paraObj.forEach((item) => {
    if (_this.seleFilters[item.prop]) {
      if (item.type === 'select') {
        // debugger
        params[item.id] =
          _this.seleFilters[item.prop].val3 !== undefined ? _this.seleFilters[item.prop].val3 : null
      } else if (item.type === 'selectcoverArea') {
        const areaOne =
          _this.seleFilters[item.prop].val3 !== undefined ? _this.seleFilters[item.prop].val3 : null
        const areaObj = coverAreaIs.aeraList.find((coverA) => {
          return areaOne === coverA.id
        })
        params[item.id] = areaObj.name
      } else {
        params[item.id] =
          _this.seleFilters[item.prop].val !== undefined ? _this.seleFilters[item.prop].val : null
      }
    }
  })
  //双时间选择--台账
  if (_this.seleFilters.operationtime) {
    params.operateStartDate = _this.seleFilters.operationtime.val4[0]
    params.operateEndDate = _this.seleFilters.operationtime.val4[1]
  }
  if (_this.seleFilters.returntime) {
    params.returnStartDate = _this.seleFilters.returntime.val4[0]
    params.returnEndDate = _this.seleFilters.returntime.val4[1]
  }
  //告警发现时间筛选
  if (_this.seleFilters.alarmfoundtime) {
    params.startDate = _this.seleFilters.alarmfoundtime.val4[0]
    params.endDate = _this.seleFilters.alarmfoundtime.val4[1]
  }
  //装置缺陷发现时间
  if (_this.seleFilters.detectedate) {
    params.startDate = _this.seleFilters.detectedate.val4[0]
    params.endDate = _this.seleFilters.detectedate.val4[1]
  }
  console.log(params, '筛选参数')
  _this.finalParam = params
  _this.$refs.childTab.selectIf(_this.finalParam, dataType)
}
//获取下拉选项
export const pullDown = (thisPull, pullTask, pageTypeI, NameTip) => {
  const paramsPull = {}
  paramsPull.task = pullTask
  paramsPull.stationID = ''
  paramsPull.pageType = pageTypeI
  pullDownList(paramsPull).then((result) => {
    const recData = result.data
    if (result.data) {
      const Iscompany = result.data.company.map((item) => {
        const devs = result.data.devops.find((dev) => {
          return dev.fId === item.id
        })
        const devArr = []
        devs ? devArr.push(devs) : console.log(devs, 'devs')
        const devIs = devArr.map((item) => {
          // console.log(item, 'item.id')
          const stas = result.data.stationID.find((sta) => {
            return sta.fId === item.id
          })
          return {
            dev: item,
            stas,
          }
        })
        return {
          comp: item,
          dev: devIs,
        }
      })
      // console.log(Iscompany, 'Iscompany')
      const IsModels = result.data.cameraType.map((item) => {
        item.childern = []
        result.data.modelType.ifrType.map((mtp) => {
          if (mtp.fId === item.id) {
            item.childern.push({
              id: mtp.id,
              vals: mtp.name,
            })
            // return item
          }
        })
        result.data.modelType.ipcType.map((mtp) => {
          if (mtp.fId === item.id) {
            item.childern.push({
              id: mtp.id,
              vals: mtp.name,
            })
            // return item
          }
        })
        return item
      })
      const IsvolLevel = result.data.volLevel.map((item) => {
        const numkV = item.name.slice(0, -2)
        // console.log(numkV, '截取后的字符串')
        return { id: item.id, vals: item.name, sortNum: numkV }
      })
      const manufactureP = result.data.manufacture.map((item) => {
        return { id: item.id, vals: item.name }
      })
      //处理下拉框之间的层级

      thisPull.pullDownLists.company = Iscompany
      thisPull.pullDownLists.models = IsModels
      thisPull.pullDownLists.volLevels = IsvolLevel
      thisPull.pullDownLists.manufactures = manufactureP
      thisPull.pullDownLists.aeraList = result.data.areaList

      // 生成下拉选项  给input框添加option
      thisPull.searchDatas.map((item) => {
        // handleFn(item.identification, item)
        const optsObj = {
          part: 'devops',
          name: 'company',
          transformer: 'stationID',
          produ: 'manufacture',
          area: 'areaList',
        }
        if (NameTip === 'defeat') {
          optsObj.tname = 'cameraName'
        } else if (NameTip === 'robot') {
          optsObj.type = 'carType'
          //装置类型
        } else if (NameTip === 'viction') {
          optsObj.type = 'cameraType'
        } else if (NameTip === 'uav') {
          optsObj.type = 'carType'
        } else if (NameTip === 'soundColl') {
          optsObj.type = 'cameraType'
        }
        const optsFun = (lable) => {
          recData[optsObj[lable]].map((el) => {
            const iptObj = {
              id: el.id,
              fId: el.fId,
              vals: el.name,
              volLevel: el.vol_level ? el.vol_level : null,
            }
            if (Array.isArray(item.opts)) {
              if (iptObj.vals !== '固定式机器人') {
                item.opts.push(iptObj)
              }
            }
          })
        }
        Object.keys(optsObj).forEach((key) => {
          // console.log(key)
          if (item.identification === key) {
            optsFun(key)
          }
        })
        //电压等级排序
        function ObjSortFun(valName) {
          return function (val1, val2) {
            val1 = val1[valName]
            val2 = val2[valName]
            return val1 - val2
          }
        }
        if (item.identification === 'level') {
          IsvolLevel.sort(ObjSortFun('sortNum'))
          // console.log(IsvolLevel, 'IsvolLevel电压等级下拉数据')
          IsvolLevel.map((el) => {
            item.opts.push(el)
          })
        }
        if (item.identification === 'tnum') {
          recData.modelType.ifrType.map((el) => {
            const ifriptObj = { id: el.id, fId: el.fId, vals: el.name }
            if (Array.isArray(item.opts[0].ifr)) {
              item.opts[0].ifr.push(ifriptObj)
            }
          })
          recData.modelType.ipcType.map((el) => {
            // el.map((inItem) => {
            const ipciptObj = { id: el.id, fId: el.fId, vals: el.name }
            if (Array.isArray(item.opts[0].ipc)) {
              item.opts[0].ipc.push(ipciptObj)
            }

            // })
          })
        }
        return item
      })
    }
    console.log('下拉', recData)
  })
}

//导出
export const download = (buff, fileName) => {
  if (buff) {
    const url = window.URL.createObjectURL(new Blob([buff], { type: 'arraybuffer' }))
    // debugger
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
//删除
export const delDatas = (thisI, delParamTask, idName) => {
  thisI.dialogVisible = false
  // console.log(thisI.selectDataIs, '选择删除的数据')
  const IDs = thisI.selectDataIs.map((item) => {
    return item[idName]
  })
  const delParam = {}
  delParam.task = delParamTask
  delParam[idName] = IDs.join(',')
  // console.log(IDs.join(','), '删除的id')
  //不同装置删除
  if (
    delParamTask === 'delCamera' ||
    delParamTask === 'delCameraDefect' ||
    delParamTask === 'delCameraDefectRelation'
  ) {
    cameraLedgerAdd(delParam)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => {
      thisI.refresh()
    }, 500)
  } else if (delParamTask === 'delCar') {
    carData(delParam)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => {
      thisI.refresh()
    }, 500)
  }
}
