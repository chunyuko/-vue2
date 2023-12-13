import { ref, watch } from 'vue'
import { Message } from 'element-ui'
export default function useTable(
  listRequestFn,
  filterOptions,
  // exportRequestFn,
  tableLoading,
  searchFlag
) {
  const tableData = ref([])
  const pagination = ref({
    pageNum: 1,
    pageSize: 20,
    total: 4,
    pageSizes: [10, 20, 30, 40, 50],
  })
  //获取列表数据
  const loadData = async () => {
    try {
      tableLoading.value = true
      tableData.value = []
      const { data, total } = await listRequestFn(pagination.value, filterOptions)
      tableData.value = data.data
      tableLoading.value = false
      pagination.value.total = Number(data.count)
    } catch (error) {
      Message.error('表格加载失败')
      console.log('表格加载失败:', error)
    }
  }

  //获取导出文件
  const exportFile = async () => {
    if (!exportRequestFn) {
      throw new Error('当前没有提供exportRequestFn函数')
    }
    if (typeof exportRequestFn !== 'function') {
      throw new Error('exportRequestFn必须是一个函数')
    }
    try {
      const { link } = await exportRequestFn(filterOptions.value)
      window.location.href = link
    } catch (error) {
      Message.error(error)
      console.log('导出失败', 'error')
    }
  }

  watch(
    pagination,
    (newValue, oldValue) => {
      if (searchFlag.value) {
        loadData()
      }
    },
    { deep: true }
  )
  return { tableData, pagination, loadData, exportFile }
}
