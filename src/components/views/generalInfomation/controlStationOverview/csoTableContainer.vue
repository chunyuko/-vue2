<script>
import { defineComponent, toRefs, ref } from 'vue'
export default defineComponent({
  name: 'csoTableContainer',
})
</script>

<script setup>
import { useRouter } from '@/utils/hooks/useVue.js'
import useSubAndControlTable from '@/views/generalInfomation/hooks/common/useSubAndControlTable'

// 父组件传来的数据。父组件：controlStationOverview.vue | substationOverviewInfo.vue ...
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  // 总数
  totalNum: {
    type: Number,
    default: 0,
  },
  // 是否是告警窗
  isAlarmWindow: {
    type: Boolean,
    default: false,
  },
  // 无限下拉所需要传入的对象
  moreLoad: {
    type: Object,
    default() {
      return {}
    },
  },
  tableType: {
    type: Number,
    default: 0,
  },
  stationID: {
    type: String,
    default: '',
  },
})

// 创建一个ref对象，其value值指向props对象中属性。应用：要将响应式对象中的某个属性单独提供给外部使用时
const { tableType, stationID } = toRefs(props)

// 表格点击事件
const { checkSingleAlarm, morePatrolAlarmInfo, moreDeviceAlarmInfo } = useSubAndControlTable(
  stationID,
  tableType
)
</script>

<template>
  <div class="csoTableContainer">
    <div class="titleContainer">
      <div class="titleBox" :class="{ small: !isAlarmWindow, big: isAlarmWindow }">
        {{ totalNum }}
      </div>
      <div class="labelBox">总数</div>
    </div>
    <!-- 表格主体 -->
    <div class="contentContainer">
      <div class="tableContainer">
        <el-table
          :class="{ tableStyle1: !isAlarmWindow, tableStyle2: isAlarmWindow }"
          height="100%"
          style="width: 100%"
          :data="data"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          v-loading="loading"
          element-loading-background="rgba(13, 47, 108, 0.5)"
          v-load-more="moreLoad"
          @row-dblclick="checkSingleAlarm"
        >
          <slot></slot>
        </el-table>
      </div>
      <!-- ”更多“跳转 -->
      <div class="moreContiner">
        <div
          class="moreClick"
          @click="checkSingleAlarm"
          :class="{ smallStyle: !isAlarmWindow, bigStyle: isAlarmWindow }"
        >
          更多>>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/style/theme/elementUI/blueTheme/common/tableStyle/index.scss';

.el-table {
  $base-color: #062c76;
  $header-font-color: #5afeec;
  &.tableStyle1 {
    $row-td-border: 0.1rem solid $base-color !important;
    @include table-style1($base-color, $header-font-color, $row-td-border);
    :deep(.el-table__cell) {
      padding: 0.5rem 0;
    }
  }
  &.tableStyle2 {
    @include table-style2($base-color, $header-font-color);
    :deep(.el-table__cell) {
      padding: 1.9rem 0;
    }
  }
}
.csoTableContainer {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  box-sizing: border-box;

  .titleContainer {
    flex: 0 0 9.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .titleBox {
      background: url(@/assets/images/title/title2.png) no-repeat;
      background-size: 100% 100%;
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #5afeec;
      font-size: 3rem;
      height: 40%;

      &.small {
        max-height: 10.5rem;
      }

      &.big {
        max-height: 18rem;
      }
    }

    .labelBox {
      margin-top: 1rem;
      color: #fff;
      font-size: 1.6rem;
    }
  }

  .contentContainer {
    flex: 1;
    display: flex;
    flex-direction: column;

    .tableContainer {
      flex: 1;
      position: relative;

      :deep(.el-table) {
        position: absolute;
        background-color: transparent;
      }
    }

    .moreContiner {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 0.5rem 0.5rem 0.5rem;
      .moreClick {
        color: #00e8fe;
        cursor: pointer;

        &.smallStyle {
          font-size: 1.2rem;
        }
        &.bigStyle {
          font-size: 1.6rem;
        }
      }
    }
  }
}
</style>
