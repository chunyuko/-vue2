import { ref, watch } from 'vue'
import { Message } from 'element-ui'
export default function useTable(listRequestFn, filterOptions, webPage) {
  const loading = ref(false)
  const tableData = ref([])
  const resData = ref([])
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 30, 40, 50],
  })
  //获取列表数据
  const loadData = async () => {
    try {
      loading.value = true
      //data 为数据，total为总数，fun为排序函数，pagemehtod分辨分页的方式
      const { data, total, fun } = await listRequestFn(pagination.value, filterOptions)
      resData.value = data
      fun ? sort(fun, data) : console.log('排序函数不存在')
      console.log(data, total, fun)
      if (webPage) {
        tableData.value = data
      } else {
        changePageAndSize()
      }
      //后端分页可以开启
      // tableData.value = data
      //前端分页开启
      // changePageAndSize()
      pagination.value.total = Number(total)
    } catch (error) {
      // Message.error('表格加载失败')
      console.log('表格加载失败:', error)
    } finally {
      loading.value = false
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
      const { link } = await exportRequestFn(filterOption.value)
      window.open(link)
    } catch (error) {
      Message.error(error)
      console.log('导出失败', 'error')
    }
  }
  //排序
  const sort = (fun, data) => {
    fun(data)
  }
  //前端分页的写法
  const changePageAndSize = () => {
    tableData.value = resData.value.slice(
      (pagination.value.pageNum - 1) * pagination.value.pageSize,
      pagination.value.pageNum * pagination.value.pageSize
    )
  }
  //后端分页的写法
  if (webPage) {
    watch(
      pagination,
      (newValue, oldValue) => {
        console.log('>>>>')
        loadData()
      },
      { deep: true }
    )
  } else {
    watch(
      pagination,
      (newValue, oldValue) => {
        changePageAndSize()
      },
      { deep: true }
    )
  }
  //在前端做分页的写法

  return { tableData, pagination, loadData, exportFile, loading }
}
