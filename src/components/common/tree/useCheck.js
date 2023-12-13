export default function useCheck(emits, highLightArr, checkOnClickNode, isHideCheckBox, treeRef) {
  const onCheck = (data, nodes) => {
    let dataArr = []
    if (checkOnClickNode.value && isHideCheckBox.value) {
      dataArr = treeRef.value.getCheckedNodes()
      highLightArr.value = []
      dataArr.forEach((item) => {
        highLightArr.value.push(item.key)
      })
    }
    emits('check', data, nodes, dataArr)
  }

  return {
    onCheck,
  }
}
