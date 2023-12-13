<script>
import { defineComponent, ref, computed, toRefs, onUnmounted } from 'vue'
import { useStore, useEventBus } from '@hooks/useVue'
import useTree from '@/views/dataTools/hooks/common/useTree'
import { useEcharts } from '@/utils/hooks/useCommon'

import Tree from '@/components/common/tree'
export default defineComponent({
  name: 'dataToolsOverllLayout',
})
</script>

<script setup>
const echarts = useEcharts()
const store = useStore()
const bus = useEventBus()
const props = defineProps({
  // 被选中的树节点的 nodes
  nodes: {
    type: Array,
    default() {
      return []
    },
  },
  time: {
    type: Array,
    default() {
      return []
    },
  },
  dialog: {
    type: Boolean,
    default: false,
  },
  data: {},
})
const { time, dialog, data } = toRefs(props)
// console.log('shu的传值stationID   --datadata', data.value)
const isDisabled = ref(true)
const emits = defineEmits(['update:nodes', 'update:dialog'])
// 树的 element 对象
const treeRef = ref(null)
const stationID = computed(() => {
  // console.log('shu的传值stationID store', store)
  // console.log('shu的传值stationID store.state', store.state)

  // console.log('shu的传值stationID', store.state.stationID)
  return store.state.stationID
})
// 是否显示对话框
const dialogVisible = computed({
  get: () => {
    return dialog.value
  },
  set: (val) => {
    emits('update:dialog', val)
  },
})

// 树
const { treeData, treeLoading, getCheckedNodes } = useTree(
  stationID,
  time,
  data,
  treeRef,
  emits,
  bus
)

// 折线图
const echartRef = ref(null)
const setLineChart = (option) => {
  const myChart = echarts.init(echartRef.value)
  window.onresize = () => {
    myChart.resize()
  }
  myChart.setOption(option)
  myChart.resize()
}

onUnmounted(() => {
  if (window.onresize) {
    window.onresize = null
  }
})

defineExpose({
  setLineChart,
})
</script>

<template>
  <div class="viewsContainer">
    <div class="leftContainer">
      <div style="margin-bottom: 0.5rem">
        <el-button type="primary" size="mini" @click="getCheckedNodes">确定</el-button>
      </div>
      <Tree
        ref="treeRef"
        :data="treeData"
        :loading="treeLoading"
        :isSearch="true"
        :isCheckbox="true"
        :isDisabled="isDisabled"
      ></Tree>
    </div>
    <div class="rightContainer">
      <div class="btnsContainer">
        <slot name="btnsContainer"></slot>
      </div>
      <div class="infoContainer">
        <slot name="infoContainer"></slot>
      </div>
    </div>
    <el-dialog
      title="历史数据曲线"
      :visible.sync="dialogVisible"
      width="45%"
      close-on-press-escape
      center
      :close-on-click-modal="false"
    >
      <div style="height: 100%; width: 100%" ref="echartRef"></div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.viewsContainer {
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;

  .leftContainer {
    flex: 0 0 36.7rem;
    padding: 2rem 1rem;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #00176e;
    display: flex;
    flex-direction: column;
  }
  .rightContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 3rem;

    .btnsContainer {
      width: 100%;
    }
    .infoContainer {
      flex: 1;
      margin-top: 1rem;
    }
  }

  :deep(.el-dialog) {
    background-color: transparent;
    background: url(@/assets/images/views/dataTools/moduleBg.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    min-height: 52%;

    .el-dialog__header {
      padding: 3rem 2rem 1rem;

      .el-dialog__title {
        color: #fff;
        font-size: 2.7rem;
        font-weight: bold;
        font-stretch: normal;
      }
      .el-dialog__headerbtn {
        top: 2.5rem;
        right: 5rem;
        .el-dialog__close {
          font-size: 3.5rem;
          color: #fff;
        }
      }
    }

    .el-dialog__body {
      color: #fff;
    }
  }
}
</style>
