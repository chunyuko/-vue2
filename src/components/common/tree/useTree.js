import { ref } from 'vue'
import { getTreeApi } from '@/service/api/views/deviceInfoMain/deviceInfoMain'
export default function useTree(
  treeRef,
  getTreeDataFn
  // { openVideo, closeVideo, openBulkVideo, closeAllVideo }
) {
  // const message = useMessage()
  const treeLoading = ref(false)
  // 从西电站的树数据
  const treeData = ref([])
  // 装置树数据
  // 切换树
  const showPointTree = ref(true)
  // 获取点位树
  const loadTreeData = async () => {
    try {
      treeLoading.value = true
      const { res } = await getTreeDataFn()
      treeData.value = res.data
    } catch (e) {
      console.log(e)
    } finally {
      treeLoading.value = false
    }
  }
  return {
    treeLoading,
    treeData,
    loadTreeData,
  }
}
