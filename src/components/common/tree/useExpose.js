// import { defineExpose } from 'vue'

export default function useExpose(treeRef, highLightArr, treeData, highlightCurrentAndChild) {
  // 获取当前选中的节点的 key
  const getCurrentKey = () => {
    return treeRef.value.getCurrentKey()
  }
  // 获取当前选中的节点的 node
  const getCurrentNode = () => {
    return treeRef.value.getCurrentNode()
  }
  //若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
  const getCheckedKeys = () => {
    return treeRef.value.getCheckedKeys()
  }
  const getHalfCheckedKeys = () => {
    return treeRef.value.getHalfCheckedKeys()
  }
  // 获取当前选中的有节点的 node
  const getCheckedNodes = () => {
    return treeRef.value.getCheckedNodes()
  }
  // 通过 keys 设置勾选的节点
  const setCheckedKeys = (keys, bool = false) => {
    highLightArr.value = keys
    return treeRef.value.setCheckedKeys(keys, bool)
  }

  /**
   * 高亮当前选择的节点及其父节点
   * @param {Object | Array | String} unkown 传入节点的 key, data 或 node。多个以数组形式传入，单个直接传入。
   */
  const highLightNode = (unkown) => {
    const set = new Set()

    // 递归去获取 node 的 key
    const recursionToGetNodeKey = (node) => {
      set.add(node.data.key)
      if (node.parent) {
        recursionToGetNodeKey(node.parent)
      }
    }

    // 传入是数组还是对象
    if (unkown instanceof Array || typeof unkown === 'string') {
      let nodes = null
      // 判断传入的是 data 还是 node
      if (!('parent' in unkown[0])) {
        nodes = unkown.map((data) => {
          return treeRef.value.getNode(data)
        })
      } else {
        nodes = unkown
      }
      nodes.forEach((node) => {
        recursionToGetNodeKey(node)
      })
    } else if (!('parent' in unkown)) {
      recursionToGetNodeKey(treeRef.value.getNode(unkown))
    } else {
      recursionToGetNodeKey(unkown)
    }

    highLightArr.value = [...set]
  }

  /**
   * 获取对应层级的树节点数据
   * @param {Number} level 层级，指需要获取哪层的数据。默认为0，返回整棵树的数据。
   * @returns level 为 0 则返回整棵树的数据对象；其他则返回该层级的节点数组。
   */
  function getTreeDataByLevel(level = 0) {
    console.log('获取树节点层级-->', level, 'treeData.value', treeData)
    const treeDataVal = treeData.value
    let data = null
    if (!level) {
      data = treeDataVal
    } else {
      data = recursionToGetData(treeDataVal, level)
    }
    return data
  }

  // 递归树的数据，获得对应层节点数据
  const recursionToGetData = (treeData, level) => {
    let res = []
    const recursionFn = (data, level) => {
      if (data[0] && parseInt(data[0].level) < level) {
        // 还未到层级，继续递归
        data.forEach((item) => {
          if (item.children.length > 0) {
            recursionFn(item.children, level)
          }
        })
      } else if (data[0] && parseInt(data[0].level) === level) {
        // 到对应层级，开始插入
        data.forEach((item) => {
          res.push(item)
        })
      }
    }
    recursionFn(treeData, level)
    console.log('递归树的数据，获得对应层节点数据', res, '---', level, 'treeData.value', treeData)
    return res
  }

  return {
    getCurrentKey,
    getCurrentNode,
    highLightNode,
    getTreeDataByLevel,
    getCheckedNodes,
    setCheckedKeys,
    getCheckedKeys,
    getHalfCheckedKeys,
  }
}
