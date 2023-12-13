<script>
import { defineComponent, toRefs, computed, ref } from 'vue'
// import { useRouter } from 'vue-router'
import LightBlueButton from '@/components/common/buttons/lightBlueButton.vue'

export default defineComponent({
  name: 'cameraSurveillanceTable',
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
  // 是哪个table，1巡视告警,2装置告警
  tableHeaderType: {
    type: Number,
    default: 1,
  },
  stationID: {
    type: String,
    default: '',
  },
})
const { data, loading, stationID } = toRefs(props)
const emits = defineEmits(['getTableData'])
// table 数据
const tableData = computed(() => {
  // console.log(data.value, '表格数据')
  return data.value.length > 0 ? data.value : [{}]
})
// 处理 table 的格式
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    if (rowIndex === 0) {
      return {
        rowspan: tableData.value.length,
        colspan: 1,
      }
    }
    return {
      rowspan: 0,
      colspan: 0,
    }
  }
  return {
    rowspan: 1,
    colspan: 1,
  }
}
// 切换表格
const changeTableData = (type) => {
  emits('getTableData', type)
}
//跳转到巡视异常确认
// import { useRouter } from '@/utils/hooks/useVue.js'
const jumpInsres = (row, column, cell, event) => {
  // console.log('双击表格数据', row, stationID, 'stationID')
  useRouter().push({
    path: '/manageInspectionResults/insResConfirmAnomaly',
    query: { stationID: stationID.value, resultId: row.Result_ID, dateTime: row.Date_Time },
  })
}
//单击表格底色变蓝
const turnBlue = ref({})
const rowClick = (row, column, event) => {
  // console.log('变色', row, column)
  turnBlue.value = row
}
const cellStyleFun = ({ row, column, rowIndex, columnIndex }) => {
  if (turnBlue.value === row && columnIndex !== 0) {
    return { textAlign: 'center', backgroundColor: '#005dd5 !important' }
    // backgroundColor: '#005dd5 !important'
    //color: '#005dd5 !important'
  }
  return { textAlign: 'center' }
}
</script>

<template>
  <div class="container">
    <div class="table">
      <el-table
        height="100%"
        style="width: 100%"
        class="tableStyle"
        :data="tableData"
        :span-method="arraySpanMethod"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="cellStyleFun"
        v-loading="loading"
        @row-click="rowClick"
        highlight-current-row
        @cell-dblclick="jumpInsres"
        element-loading-background="rgba(13, 47, 108, 0.5)"
      >
        <el-table-column label="告警列表" width="120">
          <template>
            <div class="tableButton">
              <LightBlueButton style="margin-bottom: 1rem" @click.native="changeTableData(1)"
                >巡视告警</LightBlueButton
              >
              <LightBlueButton style="margin: 0" @click.native="changeTableData(2)"
                >装置告警</LightBlueButton
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="序号" width="50"> </el-table-column>
        <el-table-column prop="stationName" label="变电站" width="170" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="warnTime" label="告警时间" width="170" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="pointName"
          label="点位名称"
          width="260"
          v-if="tableHeaderType === 1"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="cameraName"
          label="装置名称"
          width="260"
          v-if="tableHeaderType === 2"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="insResult" label="识别结果" width="100"> </el-table-column>
        <el-table-column prop="warnContent" label="告警描述" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="warnLevel" label="告警等级" width="100"> </el-table-column>
        <el-table-column prop="confirmStatus" label="确认状态" width=""> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/theme/elementUI/blueTheme/common/tableStyle/index.scss';

.el-table {
  $base-color: #0c41b1;
  &.tableStyle {
    @include table-style1($base-color);
  }
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .tableButton {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .table {
    flex: 1;
    position: relative;

    :deep(.el-table) {
      position: absolute;
      background-color: transparent;
    }
  }
}
// .el-table__body tr.current-row > td {
//   background-color: #0c41b1;
// }
</style>
