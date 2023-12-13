<script>
import { defineComponent, ref, toRefs, nextTick } from 'vue'
import CheckIns from './checkIns.vue'
import { useMessage } from '@/utils/hooks/useVue'
import { getInsTableDataApi } from '@/service/api/views/realTimeSurveillance/inspectSurveillance'
export default defineComponent({
  name: 'insTable',
})
</script>
<script setup>
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
  UUID: {
    type: String,
    default: '',
  },
})
const { UUID } = toRefs(props)
const emits = defineEmits(['update:data'])
const message = useMessage()
const loading = ref(false)
const pageNow = ref(1)
const pageNum = 10
// 列表数据总数
const count = ref(0)

// 获取表格数据
const getInsTableData = async () => {
  if (!UUID.value) {
    return
  }

  loading.value = true
  const params = {
    UUID: UUID.value,
    pageNow: pageNow.value,
    pageNum,
  }
  const res = await getInsTableDataApi(params)
  if (res.code === 200) {
    const tableData = res.data.data.map((item, index) => {
      return {
        ...item,
        ID: (pageNow.value - 1) * 10 + index + 1,
      }
    })
    emits('update:data', tableData)
    // console.log(tableData, '巡视列表数据')
    count.value = parseInt(res.data.count)
  } else {
    message.error('表格数据获取失败')
  }
  loading.value = false
}

// 当前页数改变
const handleCurrentChange = () => {
  getInsTableData()
}

defineExpose({
  getInsTableData,
  pageNow,
})
const checkInsRef = ref()
const toSonData = ref({})
const cellclick = (row, column, cell, event) => {
  toSonData.value = row
  // console.log(toSonData, 'toSonData')
}
//查看巡视列表
const checkIns = () => {
  checkInsRef.value.sonShow()
  checkInsRef.value.showImg()
}
</script>

<template>
  <div class="insTable">
    <div class="table">
      <el-table
        stripe
        height="100%"
        style="width: 100%"
        :data="data"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        v-loading="loading"
        element-loading-background="rgba(13, 47, 108, 0.5)"
        @cell-click="cellclick"
      >
        <el-table-column prop="ID" label="序号" width="60"> </el-table-column>
        <el-table-column prop="area_desc" label="设备区域"> </el-table-column>
        <el-table-column prop="device_type" label="巡检点类型"> </el-table-column>
        <el-table-column prop="device_desc" label="点位名称"> </el-table-column>
        <el-table-column prop="inspection_result" label="巡检结果"> </el-table-column>
        <el-table-column prop="date_time" label="巡检时间" width="160"> </el-table-column>
        <el-table-column label="操作" width="60">
          <template>
            <el-button type="text" size="small" @click="checkIns">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageNum"
      layout="prev, pager, next, jumper"
      :total="count"
      :current-page.sync="pageNow"
    >
    </el-pagination>
    <!-- 查看弹窗 -->
    <CheckIns ref="checkInsRef" :toSonDatas="toSonData"></CheckIns>
  </div>
</template>

<style scoped lang="scss">
.insTable {
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .table {
    flex: 1;
    position: relative;

    :deep(.el-table) {
      position: absolute;
    }
  }
}

:deep(.el-table__body) {
  width: 100% !important;
}
:deep(.el-table__header) {
  width: 100% !important;
}
</style>
