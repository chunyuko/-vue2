import { http } from '@/service'

// 巡视点位配置

// 获取变电站树 taskList.php task=getStationTree
export const getStationTreeApi = (params) => {
  // return http.post(`/api42/dalirobotcms/ajax/taskList.php`, params)
  return http.post(`/api42/dalirobotcms/ajax/realTimeData.php`, params)
}

// 获取点位树 task=getDevListTree
export const getDeviceTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/realTimeData.php`, params)
}

// 获取 点位配置列表
export const getPosSetInfoApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 新增点位关联
export const addPosLinkApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 修改点位关联 废弃 修改也可以
export const revisePosLinkApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 删除点位关联 task=delDevIDIn3D
export const delPosLinkApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/deviceData.php`, params)
}

// 临时接口测试 获取区域ID
export const getAreaApi = () => {
  // 这里写的一个临时地址
  return http.get(`/api42/dalirobotcms/ajax/getAllAreaByJM.php`)
  // return http.post(`/api42/dalirobotcms/ajax/updatearea.php`, params)
}

// 临时接口测试 获取间隔 updatespace.php?task=GetAllSpace
export const getSpaceApi = () => {
  return http.get(`/api42/dalirobotcms/ajax/updatespace.php?task=GetAllSpace`)
  //return http.post(`/api42/dalirobotcms/ajax/updatespace.php?task=GetAllSpace`, params)
}

// 临时接口测试 获取一次设备
export const getFirstDevApi = () => {
  return http.get(`/api42/dalirobotcms/ajax/updatefirstdev.php?task=GetAllFirstDev`)
}
//获取区域下摄像机
export const getcameraDevApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getCameraInfo.php`, params)
}
// 临时接口测试 设备 SearchDeviceType=GetDevByFirstDev&FirstDevID=FirstDevID
export const getDevApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getdeivceinfo.php`, params)
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
