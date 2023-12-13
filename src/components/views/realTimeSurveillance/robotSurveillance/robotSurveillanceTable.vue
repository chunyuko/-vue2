<script>
import { defineComponent, computed, toRefs, ref } from 'vue'
export default defineComponent({
  name: 'robotSurveillanceTable',
})
</script>

<script setup>
import { useRouter } from '@/utils/hooks/useVue.js'
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
  // 是否处于加载
  loading: {
    type: Boolean,
    default: false,
  },
  tableHeaderType: {
    type: Number,
    default: 1,
  },
  tableTypeI: {
    type: Number,
    default: 1,
  },
  stationID: {
    type: String,
    default: '',
  },
})
const { data, tableTypeI, stationID } = toRefs(props)
// table 数据
const tableData = computed(() => {
  return data.value.length > 0 ? data.value : [{}]
})
const jumpInsres = (row, column, cell, event) => {
  console.log('双击表格数据', row, stationID, 'stationID', tableTypeI.value, 'tableTypeI.value')
  console.log('resultid: ', row.result_id)
  if (tableTypeI.value === 2) {
    useRouter().push({
      path: '/manageInspectionResults/insResConfirmAnomaly',
      query: { stationID: stationID.value, resultId: row.result_id, dateTime: row.date_time },
    })
  } else if (tableTypeI.value === 3) {
    useRouter().push({
      path: '/PatrolDevice/DeviceFlaw/DeviceAlarm/index',
      // query: { stationID: stationID.value, resultId: row.Result_ID, dateTime: row.Date_Time },
    })
  } else if (tableTypeI.value === 1) {
    useRouter().push({
      path: '/manageInspectionResults/insResShowResults',
      // query: { stationID: stationID.value, resultId: row.Result_ID, dateTime: row.Date_Time },
    })
  }
}
//单击表格底色变蓝
const turnBlue = ref({})
const rowClick = (row, column, event) => {
  console.log('变色', row, column)
  turnBlue.value = row
}
const cellStyleFun = ({ row, column, rowIndex, columnIndex }) => {
  if (turnBlue.value === row) {
    return { textAlign: 'center', backgroundColor: '#005dd5 !important' }
  }
  return { textAlign: 'center' }
}
</script>

<template>
  <div class="robotSurveillanceTable">
    <el-table
      height="20rem"
      style="width: 100%"
      :data="tableData"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="cellStyleFun"
      v-loading="loading"
      highlight-current-row
      element-loading-background="rgba(13, 47, 108, 0.5)"
      @cell-dblclick="jumpInsres"
      @row-click="rowClick"
    >
      <!-- @row-click="rowClick" -->
      <slot></slot>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/theme/elementUI/blueTheme/common/tableStyle/index.scss';

.el-table {
  $base-color: #0c41b1;
  $header-font-color: #5afeec;
  $row-td-border: 0.1rem solid $base-color !important;
  @include table-style1($base-color, $header-font-color, $row-td-border);
}
.robotSurveillanceTable {
  position: relative;

  :deep(.el-table) {
    position: absolute;
  }
}
</style>
