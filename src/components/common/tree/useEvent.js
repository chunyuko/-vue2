export default function useEvent(emits, highlightCurrentAndChild, highLightArr, highLightDataArr) {
  // 双击
  const n = {
    count: 0,
    prev: null,
    timer: null,
  }
  const dbClicks = (node, id, cb) => {
    n.count++

    if (n.prev === node[id] && n.count === 2) {
      cb()
    }

    n.prev = node[id]
    n.timer = setTimeout(() => {
      n.count = 0
      n.prev = null
    }, 300)
  }
  const onNodeClick = (data, node, el) => {
    dbClicks(node, 'id', () => {
      emits('node-dbclick', data)
    })
    const highLight = highlightCurrentAndChild.value
    if (highLight) {
      handleGetHighLight(data)
    }
    emits('node-click', data, node, el, highLightDataArr)
  }

  // 点击设置当前和 children 高亮
  const handleGetHighLight = (data) => {
    highLightDataArr.value = []
    highLightArr.value = []

    const traversalData = (data) => {
      if (data.children.length > 0) {
        data.children.forEach((item) => {
          traversalData(item)
        })
      }
      highLightDataArr.value.push(data)
      highLightArr.value.push(data.key)
    }
    traversalData(data)
  }

  return {
    onNodeClick,
  }
}
