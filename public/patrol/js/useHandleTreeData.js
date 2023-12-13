import { ref, computed } from 'vue'

export default function useHandleTreeData(data) {
  // 树的数据格式
  const defaultProps = {
    children: 'children',
    label: 'label',
    value: 'key',
  }
  //树的数据地图
  let treeMap = {}

  // 将扁平化数据处理为树所需要的数据
  const handleDataToTree = (data) => {
    const resTreeData = [] // 输出结果
    const itemMap = {} // 数据的存储地图

    // 对每个节点复制到其父节点上
    const assignmentChildren = (id, fId, key) => {
      if (fId === '-1') {
        // fId 为 -1，说明是根节点
        itemMap[key][id].level = 0
        resTreeData.push(itemMap[key][id])
      } else if (!parseInt(key)) {
        // key 为0，说明是第一层，第一层和根节点的 key 相同
        if (!itemMap[key][fId]) {
          itemMap[key][fId] = {
            children: [],
          }
        }
        itemMap[key][fId].children.push(itemMap[key][id])
      } else {
        // 进入则是第二层往后的层级，直接找父级 push
        itemMap[parseInt(key) - 1][fId] &&
          itemMap[(parseInt(key) - 1).toString()][fId].children.push(itemMap[key][id])
      }
    }

    for (const key in data) {
      itemMap[key] = {}
      for (const item of data[key]) {
        const id = item.id
        const fId = item.fId

        if (!fId) {
          continue
        }

        if (!itemMap[key][id]) {
          itemMap[key][id] = {
            children: [],
          }
        }
        itemMap[key][id] = {
          ...item,
          id: item.id,
          key: item.level + '-' + item.id,
          children: itemMap[key][id].children,
        }

        if (typeof fId === 'string' || typeof fId === 'number') {
          assignmentChildren(id, fId, key)
        } else if (fId instanceof Array) {
          fId.forEach((item) => {
            assignmentChildren(id, item, key)
          })
        }
      }
    }
    treeMap = itemMap
    return resTreeData
  }

  // 树的数据
  const treeData = computed(() => {
    return handleDataToTree(data.value)
  })

  return {
    defaultProps,
    treeData,
  }
}
