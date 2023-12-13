import { http } from '@/service'

// 阈值告警设置

// 获取变电站 updatestationinfo.php task=GetStation
export const getStationApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/updatestationinfo.php`, params)
}

// 获取变电站信息 deviceData.php task=getStationInfo
export const getStationInfosApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 获取变电站上面信息 deviceData.php task=getStationInfo
export const getStationupApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/taskList.php`, params)
}

// 获取阈值告警列表 queryDeviceAlarm task=query ...
export const getAlarmTableApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryDeviceAlarm.php`, params)
}

// 获取点位树 task=getDevListTree
export const getDeviceTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/realTimeData.php`, params)
}

// 获取某个点位阈值 queryDeviceAlarm.php task=querySingleDevAlarm DeviceID=25
export const getDeviceAlarmApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryDeviceAlarm.php`, params)
}

// 告警阈值设置 (新增 修改) updatedeviceparam.php task=ModifyDevice
export const updateDeviceAlarmApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/updatedeviceparam.php`, params)
}

// 删除告警阈值设置 queryDeviceAlarm.php task=DelDevAlarm DeviceID=25
export const deleteDeviceAlarmApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryDeviceAlarm.php`, params)
}

// 导出告警阈值信息 queryDeviceAlarm.php exportflag=1
export const exportDeviceAlarmApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/queryDeviceAlarm.php`, params)
}

// 将扁平化的数据结构整理为树形结构 ** 功能方法
export const handleDataToTree = (data) => {
  const resTreeData = [] //输出结果
  const itemMap = {} //数据的存储地图

  for (const key in data) {
    if (parseInt(key) !== parseInt(key)) {
      break
    }
    // 读取每一层对象数据的 key ,并作为地图表示
    itemMap[key] = {}
    for (const item of data[key]) {
      const id = item.id
      const fId = item.fId

      // 如果地图中不存在该节点则在地图上生成该节点
      if (!itemMap[key][id]) {
        itemMap[key][id] = {
          children: [],
        }
      }

      itemMap[key][id] = {
        ...item,
        key: item.id, //注意，为了默认展开的功能，将id值与key值调换
        id: item.id,
        children: itemMap[key][id].children,
      }

      if (fId === '-1') {
        // fId 为 -1，则为总节点
        itemMap[key][id].level = 0
        resTreeData.push(itemMap[key][id])
      } else if (!parseInt(key)) {
        // 代表是区域层，区域存在同级嵌套的情况
        if (!itemMap[key][fId]) {
          itemMap[key][fId] = {
            children: [],
          }
        }
        itemMap[key][fId].children.push(itemMap[key][id])
      } else {
        // 其他的层级的操作。
        if (!itemMap[parseInt(key) - 1][fId]) {
          // 如果找不到上一层，说明数据错误或其他原因，不做任何操作
          continue
        }
        // 找到上一级的父级，将该节点赋值到父级的 children 内
        itemMap[(parseInt(key) - 1).toString()][fId].children.push(itemMap[key][id])
      }
    }
  }

  return resTreeData
}
