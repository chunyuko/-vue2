import { http } from '@/service'

// 静默监视配置

// 获取变电站树 taskList.php task=getStationTree
export const getStationTreeApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/taskList.php`, params)
}

// 摄像机树 cameraData.php GetAllCamera
export const getCameraTreeApi = (params) => {
  return http.get(`/api42/dalirobotcms/ajax/getmaindata.php`, params)
}

// 摄像机组 cameraData.php GetvideoGroup
export const getCameraGroupApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/getmaindata.php`, params)
}

// 获取静默任务列表 silenceManage.php task=getList StationID= ...
export const getSilenceListApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 添加/修改静默任务 silenceManage.php task=Modify StationID= ...
export const addModifyTaskApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 删除任务 暂时没有接口
export const delTaskApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 获取摄像机守望位 task= GetDev CameraID=
export const getDevByCameraIDApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 批量设置守望位 task=BatchModifySW IDStr=1,2,3
export const setWatchPosSApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 批量设置静默监视 task= BatchModifySilence CameraID=1,2,3
export const setModifyTaskSApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
}

// 导出 task= Export
export const exportWatchInfoApi = (params) => {
  return http.post(`/api42/dalirobotcms/ajax/silenceManage.php`, params)
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

// ES6数组去重
export const noRepeat = (arr) => {
  const newArr = [...new Set(arr)]
  return newArr
}
