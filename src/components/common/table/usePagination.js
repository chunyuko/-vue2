import { http } from '@/service'
export default function usePagination(pagination, url, emits) {
  // const handleQuery = async () => {
  //   const params = {
  //     page: pagination.value.pageNum,
  //     limit: pagination.value.pageSize,
  //   }
  //   const res = await http.get(url.value, params)
  //   return res
  // }
  const handleSizeChange = async (size) => {
    pagination.value.pageSize = size
    // const res = handleQuery()
    emits('size-change', size)
  }
  const handleCurrentChange = async (current) => {
    pagination.value.pageNum = current
    // const res = handleQuery()
    emits('page-change', current)
  }
  return {
    handleSizeChange,
    handleCurrentChange,
  }
}
