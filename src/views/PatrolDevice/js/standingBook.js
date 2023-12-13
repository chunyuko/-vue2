import { cameraLedgerEdit, caraLedgerEdit } from '@/service/api/views/patrolDevice/deviceAlarm'
//camera修改
const apiRel = (params, thisIs) => {
  cameraLedgerEdit(params)
    .then((res) => {
      // console.log('formdataedit', res)
      if (res.code === 200 && res.msg === 'OK') {
        thisIs.$message({
          message: '提交成功',
          type: 'success',
        })
      } else {
        thisIs.$message({
          message: '提交失败：' + res.msg,
          type: 'error',
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//car修改
const apiCar = (params, thisIs) => {
  caraLedgerEdit(params)
    .then((res) => {
      // console.log('formdataedit', res)
      if (res.code === 200 && res.msg === 'OK') {
        thisIs.$message({
          message: '提交成功',
          type: 'success',
        })
      } else {
        thisIs.$message({
          message: '提交失败：' + res.msg,
          type: 'error',
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
//台账新增
export const bookAdd = (thisIs) => {
  if (thisIs.customTipI === '摄像机台账') {
    thisIs.fileone.append('task', 'addCamera')
    thisIs.fileone.append('pageType', 0)
    const vicionObj = [
      { props: 'stationID', vals: thisIs.addDatas.transformer },
      { props: 'cameraType', vals: thisIs.addDatas.type },
      { props: 'cameraName', vals: thisIs.addDatas.tname },
      { props: 'number', vals: thisIs.addDatas.num },
      { props: 'placePosition', vals: thisIs.addDatas.place },
      { props: 'coverArea', vals: thisIs.addDatas.area },
      { props: 'manufacture', vals: thisIs.addDatas.produ },
      { props: 'modelType', vals: thisIs.addDatas.tnum },
      { props: 'productionCode', vals: thisIs.addDatas.serialnumber },
      { props: 'master', vals: thisIs.addDatas.master },
      { props: 'algorithmVersion', vals: thisIs.addDatas.version },
      { props: 'ip', vals: thisIs.addDatas.ip },
      { props: 'defectCount', vals: thisIs.addDatas.flawnum },
      { props: 'operationTime', vals: thisIs.addDatas.operationTime },
      { props: 'returnTime', vals: thisIs.addDatas.returnTime },
      { props: 'IFRState', vals: thisIs.addDatas.IFRState },
      { props: 'IPCState', vals: thisIs.addDatas.IPCState },
      { props: 'WiperState', vals: thisIs.addDatas.WiperState },
      { props: 'NightState', vals: thisIs.addDatas.NightState },
      { props: 'MoveDetState', vals: thisIs.addDatas.MoveDetState },
      { props: 'IPCVideoUrl', vals: thisIs.addDatas.IPCVideoUrl },
      { props: 'VideoUrl', vals: thisIs.addDatas.VideoUrl },
    ]
    vicionObj.forEach((item) => {
      thisIs.fileone.append(item.props, item.vals ? item.vals : null)
      return thisIs.fileone
    })
    apiRel(thisIs.fileone, thisIs)
  } else if (thisIs.customTipI === '机器人台账') {
    thisIs.fileone.append('task', 'modifyCar')
    thisIs.fileone.append('pageType', 1)
    const robotObj = [
      { props: 'stationID', vals: thisIs.addDatas.transformer },
      { props: 'carType', vals: thisIs.addDatas.type },
      { props: 'carName', vals: thisIs.addDatas.tname },
      { props: 'carNumber', vals: thisIs.addDatas.num },
      { props: 'productionCode', vals: thisIs.addDatas.serialnumber },
      { props: 'manufacture', vals: thisIs.addDatas.produ },
      { props: 'size', vals: thisIs.addDatas.size },
      { props: 'weight', vals: thisIs.addDatas.weight },
      { props: 'operationTime', vals: thisIs.addDatas.operationTime },
      { props: 'transmission', vals: thisIs.addDatas.transmission },
      { props: 'protectLevel', vals: thisIs.addDatas.master },
      { props: 'algorithmVersion', vals: thisIs.addDatas.protectLevel },
      { props: 'commMode', vals: thisIs.addDatas.commMode },
      { props: 'carMoveSpeed', vals: thisIs.addDatas.carMoveSpeed },
      { props: 'leftRightPrecision', vals: thisIs.addDatas.leftRightPrecision },
      { props: 'frontBackPrecision', vals: thisIs.addDatas.frontBackPrecision },
      { props: 'navigation', vals: thisIs.addDatas.navigation },
      { props: 'carVersion', vals: thisIs.addDatas.tnum },
    ]
    robotObj.forEach((item) => {
      thisIs.fileone.append(item.props, item.vals ? item.vals : null)
      return thisIs.fileone
    })
    apiCar(thisIs.fileone, thisIs)
  } else if (thisIs.customTipI === '无人机台账') {
    console.log('此处为无人机台账新增处')
    thisIs.fileone.append('task', 'modifyCar')
    thisIs.fileone.append('pageType', 2)
    const uavObj = [
      { props: 'stationID', vals: thisIs.addDatas.transformer },
      { props: 'manufacture', vals: '1' },
      { props: 'carVersion', vals: thisIs.addDatas.car_version },
      { props: 'carType', vals: '13' },
      { props: 'carName', vals: thisIs.addDatas.tname },
      { props: 'flyLandMode', vals: thisIs.addDatas.flyLandMode },
      { props: 'maxWeight', vals: thisIs.addDatas.maxWeight },
      { props: 'weight', vals: thisIs.addDatas.weight },
      { props: 'resistWindLevel', vals: thisIs.addDatas.resistWindLevel },
      { props: 'carMoveSpeed', vals: thisIs.addDatas.size },
      { props: 'carFlyHeight', vals: thisIs.addDatas.carMoveSpeed },
      { props: 'carFlyTime', vals: thisIs.addDatas.carFlyTime },
      { props: 'carHeight', vals: thisIs.addDatas.carHeight },
      { props: 'carLength', vals: thisIs.addDatas.carLength },
      { props: 'carWidth', vals: thisIs.addDatas.carWidth },
      { props: 'workRadius', vals: thisIs.addDatas.workRadius },
      { props: 'frontBackPrecision', vals: thisIs.addDatas.carControl },
    ]
    uavObj.forEach((item) => {
      thisIs.fileone.append(item.props, item.vals ? item.vals : null)
      return thisIs.fileone
    })
    apiCar(thisIs.fileone, thisIs)
  } else if (thisIs.customTipI === '声音采集器台账') {
    thisIs.fileone.append('task', 'addCamera')
    thisIs.fileone.append(
      'stationID',
      thisIs.addDatas.transformer ? thisIs.addDatas.transformer : null
    )
    thisIs.fileone.append('cameraType', '14')
    thisIs.fileone.append('ip', '127.0.0.1')
    thisIs.fileone.append('OpenAlarm', '1')
    thisIs.fileone.append('OpenCollect', '1')
    thisIs.fileone.append('pageType', 3)
    const bkAddArr = [
      { label: 'SpecType', vals: 'soundSpeciModel' },
      { label: 'SupplyVol', vals: 'proVal' },
      { label: 'PowerWaste', vals: 'arrayPower' },
      { label: 'TempRange', vals: 'temperScope' },
      { label: 'WaterproofLevel', vals: 'waterProof' },
      { label: 'NoiseRatio', vals: 'signalNoiseRadio' },
      { label: 'Sensitivity', vals: 'sensitivity' },
      { label: 'FreqRange', vals: 'frequencyRes' },
      { label: 'Point', vals: 'directivity' },
      { label: 'ArraySize', vals: 'arrayVolum' },
      { label: 'ArrayWeight', vals: 'arrayWeight' },
      { label: 'ArraySpan', vals: 'arrayAperture' },
      { label: 'ArrEleNum', vals: 'arrayNumer' },
      { label: 'SampFreq', vals: 'sampleFrequency' },
    ]
    bkAddArr.forEach((item) => {
      thisIs.fileone.append(
        item.label,
        thisIs.addDatas[item.vals] ? thisIs.addDatas[item.vals] : null
      )
    })
    apiRel(thisIs.fileone, thisIs)
  }
}

//台账修改
export const stabookEdit = (thisIs) => {
  // console.log(thisIs.addDatas, '台账修改入参了')
  if (thisIs.customTipI === '摄像机台账') {
    thisIs.fileone.append('task', 'updateCamera')
    thisIs.fileone.append('cameraID', thisIs.selectDataEdit.camera_id)
    thisIs.fileone.append('stationID', thisIs.addDatas.transformer)
    // thisIs.fileone.append('volLevel', '66kV')
    const bkEditArr = [
      { label: 'volLevel', vals: 'level', othVals: 'vol_level' },
      { label: 'cameraType', vals: 'type', othVals: 'camera_type' },
      { label: 'cameraName', vals: 'tname', othVals: 'camera_name' },
      { label: 'number', vals: 'num', othVals: 'number' },
      { label: 'placePosition', vals: 'place', othVals: 'place_position' },
      { label: 'coverArea', vals: 'area', othVals: 'cover_area' },
      { label: 'manufacture', vals: 'produ', othVals: 'manufacture' },
      { label: 'modelType', vals: 'tnum', othVals: 'type' },
      { label: 'productionCode', vals: 'serialnumber', othVals: 'production_code' },
      { label: 'master', vals: 'master', othVals: 'master' },
      { label: 'algorithmVersion', vals: 'version', othVals: 'algorithm_version' },
      { label: 'ip', vals: 'ip', othVals: 'ipc_ip' },
      { label: 'defectCount', vals: 'flawnum', othVals: 'defect_count' },
      { label: 'IFRState', vals: 'IFRState', othVals: 'ifr_state' },
      { label: 'IPCState', vals: 'IPCState', othVals: 'ipc_state' },
      { label: 'WiperState', vals: 'WiperState', othVals: 'wiper_state' },
      { label: 'NightState', vals: 'NightState', othVals: 'night_state' },
      { label: 'MoveDetState', vals: 'MoveDetState', othVals: 'move_det_state' },
      { label: 'IPCVideoUrl', vals: 'IPCVideoUrl', othVals: 'ipc_video_url' },
      { label: 'VideoUrl', vals: 'VideoUrl', othVals: 'video_url' },
      { label: 'size', vals: 'size', othVals: 'size' },
      { label: 'weight', vals: 'weight', othVals: 'weight' },
      { label: 'transmission', vals: 'transmission', othVals: 'transmission' },
      { label: 'protectLevel', vals: 'protectLevel', othVals: 'protectLevel' },
      { label: 'commMode', vals: 'commMode', othVals: 'commMode' },
      { label: 'carMoveSpeed', vals: 'carMoveSpeed', othVals: 'carMoveSpeed' },
      {
        label: 'leftRightPrecision',
        vals: 'leftRightPrecision',
        othVals: 'leftRightPrecision',
      },
      {
        label: 'frontBackPrecision',
        vals: 'frontBackPrecision',
        othVals: 'frontBackPrecision',
      },
      { label: 'navigation', vals: 'navigation', othVals: 'navigation' },
    ]
    bkEditArr.forEach((item) => {
      thisIs.fileone.append(
        item.label,
        thisIs.addDatas[item.vals]
          ? thisIs.addDatas[item.vals]
          : thisIs.selectDataEdit[item.othVals]
      )
    })

    //转换日期格式
    if (thisIs.selectDataEdit.return_time) {
      const re = new Date(Number(thisIs.selectDataEdit.return_time * 1000))
      const returnTime = re.getFullYear() + '/' + (re.getMonth() + 1) + '/' + re.getDate()
      thisIs.fileone.append(
        'returnTime',
        thisIs.addDatas.returnTime ? thisIs.addDatas.returnTime : returnTime
      )
    }
    if (thisIs.selectDataEdit.return_time) {
      const op = new Date(Number(thisIs.selectDataEdit.operation_time * 1000))
      const operationTime = op.getFullYear() + '/' + (op.getMonth() + 1) + '/' + op.getDate()
      thisIs.fileone.append(
        'operationTime',
        thisIs.addDatas.operationTime ? thisIs.addDatas.operationTime : operationTime
      )
    }
    apiRel(thisIs.fileone, thisIs)
  } else if (thisIs.customTipI === '机器人台账' || thisIs.customTipI === '无人机台账') {
    thisIs.fileone.append('task', 'modifyCar')
    thisIs.fileone.append('carID', thisIs.selectDataEdit.car_id)
    console.log(thisIs.selectDataEdit, 'thisIs.selectDataEdit修改依赖数据')
    const robotObj = [
      { label: 'carType', vals: 'type', othVals: 'car_type' },
      { label: 'volLevel', vals: 'level', othVals: 'vol_level' },
      { label: 'stationID', vals: 'transformer', othVals: 'station_id' },
      { label: 'carName', vals: 'tname', othVals: 'car_name' },
      { label: 'carNumber', vals: 'num', othVals: 'car_number' },
      { label: 'productionCode', vals: 'serialnumber', othVals: 'production_code' },
      { label: 'manufacture', vals: 'produ', othVals: 'manufacture' },
      { label: 'size', vals: 'size', othVals: 'size' },
      { label: 'weight', vals: 'weight', othVals: 'weight' },
      { label: 'operationTime', vals: 'operationTime', othVals: 'operation_time' },
      { label: 'transmission', vals: 'transmission', othVals: 'transmission' },
      {
        label: 'protectLevel',
        vals: 'protectLevel',
        othVals: 'protect_level',
      },
      // { label: 'algorithmVersion', vals: 'protectLevel', othVals: 'carVersion' },
      { label: 'commMode', vals: 'commMode', othVals: 'comm_mode' },
      { label: 'carMoveSpeed', vals: 'carMoveSpeed', othVals: 'carMoveSpeed' },
      {
        label: 'leftRightPrecision',
        vals: 'leftRightPrecision',
        othVals: 'left_right_precision',
      },
      {
        label: 'frontBackPrecision',
        vals: 'frontBackPrecision',
        othVals: 'front_back_precision',
      },
      { label: 'navigation', vals: 'navigation', othVals: 'navigation' },
      { label: 'carVersion', vals: 'tnum', othVals: 'carVersion' }, //设备型号
      // 无人机参数
      { label: 'carNumber', vals: 'car_number', othVals: 'car_number' },
      { label: 'carVersion', vals: 'car_number', othVals: 'carVersion' },
      { label: 'flyLandMode', vals: 'flyLandMode', othVals: 'flyLandMode' },
      { label: 'maxWeight', vals: 'maxWeight', othVals: 'maxWeight' },
      { label: 'weight', vals: 'weight', othVals: 'weight' },
      { label: 'resistWindLevel', vals: 'resistWindLevel', othVals: 'resistWindLevel' },
      { label: 'carMoveSpeed', vals: 'carMoveSpeed', othVals: 'carMoveSpeed' },
      { label: 'carFlyHeight', vals: 'carMoveSpeed', othVals: 'carFlyHeight' },
      { label: 'carFlyTime', vals: 'carFlyTime', othVals: 'carFlyTime' },
      { label: 'carHeight', vals: 'carHeight', othVals: 'carHeight' },
      { label: 'carLength', vals: 'carLength', othVals: 'carLength' },
      { label: 'carWidth', vals: 'carWidth', othVals: 'carWidth' },
      { label: 'workRadius', vals: 'workRadius', othVals: 'workRadius' },
      // { label: 'frontBackPrecision', vals: 'workRadius', othVals: 'frontBackPrecision' },
    ]
    if (thisIs.customTipI === '机器人台账') {
      thisIs.fileone.append('carType', '1')
      thisIs.fileone.append('pageType', 1)
    } else if (thisIs.customTipI === '无人机台账') {
      thisIs.fileone.append('carType', '13')
      thisIs.fileone.append('pageType', 2)
    }

    robotObj.forEach((item) => {
      thisIs.fileone.append(
        item.label,
        thisIs.addDatas[item.vals]
          ? thisIs.addDatas[item.vals]
          : thisIs.selectDataEdit[item.othVals]
      )
    })
    apiCar(thisIs.fileone, thisIs)
  } else if (thisIs.customTipI === '声音采集器台账') {
    thisIs.fileone.append('task', 'addCamera')
    thisIs.fileone.append(
      'stationID',
      thisIs.addDatas.transformer ? thisIs.addDatas.transformer : null
    )
    thisIs.fileone.append('cameraType', '14')
    thisIs.fileone.append('ip', '127.0.0.1')
    thisIs.fileone.append('OpenAlarm', '1')
    thisIs.fileone.append('OpenCollect', '1')
    thisIs.fileone.append('pageType', 3)
    const bkAddArr = [
      { label: 'SpecType', vals: 'soundSpeciModel' },
      { label: 'SupplyVol', vals: 'proVal' },
      { label: 'PowerWaste', vals: 'arrayPower' },
      { label: 'TempRange', vals: 'temperScope' },
      { label: 'WaterproofLevel', vals: 'waterProof' },
      { label: 'NoiseRatio', vals: 'signalNoiseRadio' },
      { label: 'Sensitivity', vals: 'sensitivity' },
      { label: 'FreqRange', vals: 'frequencyRes' },
      { label: 'Point', vals: 'directivity' },
      { label: 'ArraySize', vals: 'arrayVolum' },
      { label: 'ArrayWeight', vals: 'arrayWeight' },
      { label: 'ArraySpan', vals: 'arrayAperture' },
      { label: 'ArrEleNum', vals: 'arrayNumer' },
      { label: 'SampFreq', vals: 'sampleFrequency' },
    ]
    bkAddArr.forEach((item) => {
      thisIs.fileone.append(
        item.label,
        thisIs.addDatas[item.vals] ? thisIs.addDatas[item.vals] : null
      )
    })
    apiRel(thisIs.fileone, thisIs)
  }
}
