<!-- 信息总览 -> 变电站总览 -->
<script>
import { defineComponent, ref, toRefs, computed } from 'vue'

import { getPreviewDataApi } from '@/service/api/views/manageInspectionResults/insResManageReport'
import LightBlueButton from '@/components/common/buttons/lightBlueButton.vue'
import useSubAndControlTable from '@/views/generalInfomation/hooks/common/useSubAndControlTable'

export default defineComponent({
  name: 'subTable',
})
</script>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default() {
      return []
    },
  },
  // table 的类型
  tableType: {
    type: Number,
    default: 1,
  },
  // table 标题类型，巡视告警和装置告警的 header 不一样
  tableHeaderType: {
    type: Number,
    default: 1,
  },
  // 是否处于加载状态
  loading: {
    type: Boolean,
    default: false,
  },
  stationID: {
    type: String,
    default: '',
  },
})

const { data, tableType, tableHeaderType, stationID } = toRefs(props)

// 表格点击事件
const {
  morePatrolMissionInfo,
  morePatrolAlarmInfo,
  moreDeviceAlarmInfo,
  moreDeviceAnomalyInfo,
  gridData,
  dialogTableVisible,
  checkSingleMission,
  checkSingleAlarm,
  missionDialogTableHeader,
} = useSubAndControlTable(stationID, tableType)

const emits = defineEmits(['tableTypeChange'])
// table 数据
const tableData = computed(() => {
  return data.value.length > 0 ? data.value : []
})
// table 标题样式
const headerCellStyle = {
  textAlign: 'center',
  height: '3rem',
  padding: '0',
  backgroundColor: 'transparent',
  fontSize: '1.4rem',
  color: '#fff',
}
// table 内容样式
const cellStyle = {
  textAlign: 'center',
  height: '3rem',
  padding: '0',
  backgroundColor: 'transparent',
  fontSize: '1.2rem',
}
// 改变 table 显示的列表
const changeTableType = (typeNum) => {
  emits('tableTypeChange', typeNum)
}
// 根据数据改变每行的样式
const tableRowClassName = ({ row, rowIndex }) => {
  if (tableType.value === 2) {
    if (parseInt(row.Bug_Level) > 0 && tableHeaderType.value === 1) {
      return 'table-warn-color'
    }
  } else if (tableType.value === 3) {
    // TODO
  }
  return ''
}
</script>
<template>
  <div class="tableContainer">
    <div class="titleContainer">
      <div class="titleText">{{ title }}</div>
      <div>
        <!-- 1.任务列表头部按钮 -->
        <!-- .native防止标签阻止click事件 -->
        <LightBlueButton
          :font-size="'1.6'"
          v-if="tableType === 1"
          @click.native="morePatrolMissionInfo"
          >更多</LightBlueButton
        >
        <!-- 2.告警列表头部按钮 -->
        <LightBlueButton
          :font-size="'1.6'"
          v-if="tableType === 2"
          @click.native="morePatrolAlarmInfo"
        >
          巡视告警
        </LightBlueButton>

        <LightBlueButton
          :font-size="'1.6'"
          v-if="tableType === 2"
          @click.native="moreDeviceAlarmInfo"
        >
          装置告警
        </LightBlueButton>
        <!-- 3.装置缺陷头部按钮 -->
        <LightBlueButton
          :font-size="'1.6'"
          v-if="tableType === 3"
          @click.native="moreDeviceAnomalyInfo"
        >
          装置缺陷
        </LightBlueButton>
      </div>
    </div>
    <div class="tableContent">
      <div class="table">
        <el-table
          :data="tableData"
          @row-dblclick="checkSingleAlarm"
          height="100%"
          style="width: 100%"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          v-loading="loading"
          element-loading-background="rgba(13, 47, 108, 0.5)"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="ID" width="60" label="序号"></el-table-column>
          <el-table-column
            prop="Start_Time"
            label="执行时间"
            v-if="tableType === 1"
          ></el-table-column>
          <el-table-column
            prop="Task_Path_Desc"
            label="任务名称"
            v-if="tableType === 1"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="执行状况"
            width="60"
            v-if="tableType === 1"
          ></el-table-column>
          <el-table-column
            prop="warnTime"
            label="告警时间"
            v-if="tableType === 2"
          ></el-table-column>
          <el-table-column
            prop="pointName"
            label="点位名称"
            v-if="tableType === 2 && tableHeaderType === 1"
          ></el-table-column>
          <el-table-column
            prop="cameraName"
            label="装置名称"
            v-if="tableType === 2 && tableHeaderType === 2"
          ></el-table-column>
          <el-table-column
            prop="insResult"
            label="识别结果"
            v-if="tableType === 2"
          ></el-table-column>
          <el-table-column prop="status" label="确认状态" v-if="tableType === 2"></el-table-column>
          <el-table-column prop="defectTime" label="时间" v-if="tableType === 3"></el-table-column>
          <el-table-column
            prop="defectType"
            label="缺陷类型"
            v-if="tableType === 3"
          ></el-table-column>
          <el-table-column
            prop="defectLevel"
            width="60"
            label="缺陷等级"
            v-if="tableType === 3"
          ></el-table-column>
          <el-table-column
            prop="eventContent"
            label="事件描述"
            v-if="tableType === 3"
          ></el-table-column>
          <el-table-column
            prop="defectStatus"
            width="60"
            label="缺陷状态"
            v-if="tableType === 3"
          ></el-table-column>
          <el-table-column prop="Result" label="结果" v-if="tableType === 1">
            <template slot-scope="scope">
              <el-button @click="checkSingleMission(scope.row.UUID)" type="text" size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 任务列表点击“查看”弹出Dialog内嵌详细信息table -->
        <el-dialog center title="详情查看" class="dialogForm" :visible.sync="dialogTableVisible">
          <el-table :data="gridData" class="dialogTable">
            <el-table-column
              v-for="(item, index) in missionDialogTableHeader"
              align="center"
              :key="index"
              :property="item.property"
              :label="item.label"
            ></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tableContainer {
  display: flex;
  flex-direction: column;
  height: 100%;

  .titleContainer {
    width: 45.5rem;
    height: 4rem;
    background-color: #0b2161;
    box-shadow: inset 0rem 0.3rem 0.7rem 0rem rgba(117, 255, 237, 0.35);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    box-sizing: border-box;

    .titleText {
      width: 7.3rem;
      height: 1.8rem;
      font-size: 1.8rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1.7rem;
      letter-spacing: 0rem;
      color: #ffffff;
    }
  }

  .tableContent {
    flex: 1;
    width: 45.5rem;
    background-color: transparent;
    border: solid 0.1rem #20739e;
    border-top: 0;
    box-sizing: border-box;
    padding: 1rem;
    box-sizing: border-box;

    .table {
      position: relative;
      height: 100%;
      :deep(.el-table) {
        position: absolute;
      }

      .dialogForm {
        // background-color: #ffd739;
        top: 15%;
      }

      .dialogTable {
        position: static;
        margin: auto;
      }
    }
  }
}

.el-table {
  background-color: transparent;

  :deep(.cell) {
    padding: 0 !important;
  }

  :deep(.el-table__header-wrapper) {
    tr {
      background-image: linear-gradient(-90deg, #042356 0%, #2966ab 25%, #4da9ff 50%, #042356 100%);
    }
  }
  :deep(th) {
    background-color: transparent;
  }

  :deep(tr) {
    background-color: transparent;
  }

  :deep(.el-table__cell.gutter) {
    background-color: transparent !important;
  }
}
:deep(.el-table__body-wrapper) {
  background-color: transparent !important;
}
:deep(.el-table__body) {
  width: 100% !important;
}
:deep(.el-table__header) {
  width: 100% !important;
}
</style>

<style>
.table-warn-color {
  color: #ffd739 !important;
}

/* 只能放在非scope处，否则不生效 */
.el-dialog__header {
  background-color: #20739e;
}
.el-dialog__body {
  background-color: #0b2161;
}
</style>
