import { ref, watch, nextTick } from 'vue'

export default function useSearch(treeRef) {
  // 搜索文本
  const filterText = ref('')
  // 搜索监听

  watch(
    filterText,
    (val) => {
      treeRef.value.filter(val)
    },
    { deep: true }
  )
  // 搜索查询
  const filterNode = (value, data) => {
    if (!value) {
      return true
    }
    return data.label.indexOf(value) !== -1
  }
  return {
    filterText,
    filterNode,
  }
}
