// 获取跳转页面，？后携带的 key-value 值
function getUrlRequest() {
  // 传递中文乱码 在携带参数的时候如果有中文先encodeURI
  const url = decodeURI(document.location.toString())

  if (url.indexOf('?') !== -1) {
    const paraObj = {}
    const arrUrl = url.split('?')
    const para = arrUrl[1]
    strs = para.split('&')

    for (var i = 0; i < strs.length; i++) {
      paraObj[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }

    return paraObj
  }
  return {}
}

// 将扁平化的数据结构整理为树形结构
function handleDataToTree(data) {
  // console.log("运行测试")
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
  //  console.log("运行测试11")
  return resTreeData
}
