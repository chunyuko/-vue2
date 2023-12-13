<script>
import { defineComponent, ref, toRefs, computed } from 'vue'
import {
  pauseMissionApi,
  stopMissionApi,
} from '@/service/api/views/realTimeSurveillance/inspectSurveillance'
export default defineComponent({
  name: 'insMissionInfo',
})
</script>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    },
  },
})
const { data } = toRefs(props)
const info = computed(() => {
  if (Object.keys(data.value).length === 0) {
    return {
      // 任务名称
      taskName: '',
      // 预计巡视时间
      estimateTime: 0,
      // 进度
      progress: 0,
      // 巡视点状况
      resultStatusNums: {
        error: 0,
        notfinish: 0,
        finish: 0,
      },
      // 已用时间
      exectime: 0,
      taskId: '',
    }
  }
  return data.value
})

// 暂停任务
const pauseMission = () => {
  if (!info.value.taskId) {
    return
  }
  const params = {
    Task_Path_Id: info.value.taskId,
  }
  pauseMissionApi(params)
}
// 终止任务
const stopMission = () => {
  if (!info.value.taskId) {
    return
  }
  const params = {
    Task_Path_Id: info.value.taskId,
  }
  stopMissionApi(params)
}
</script>

<template>
  <div class="insMissionInfo">
    <div class="row">
      <div style="min-width: 35rem; margin-right: 1.5rem">
        巡视任务名称：{{ info.taskName }}
        <!-- <el-select placeholder="请选择" v-model="missionName"></el-select> -->
      </div>
      <div>
        预计巡视时间：<span style="color: #2f94b1">{{ info.estimateTime }}min</span>
      </div>
    </div>
    <div class="row">
      <div>巡视进度：</div>
      <el-progress
        style="flex: 1"
        :text-inside="true"
        :stroke-width="20"
        :percentage="info.progress"
      ></el-progress>
      <div class="btnGroup">
        <el-button size="mini" type="primary" class="btnStyle" @click="pauseMission"
          >暂停</el-button
        >
        <el-button size="mini" type="primary" class="btnStyle" @click="stopMission">停止</el-button>
      </div>
    </div>
    <div class="row">
      <div>巡视点状况：</div>
      <div class="statusBox">
        <div class="statusIcon statusColor1"></div>
        <div>异常：{{ info.resultStatusNums.error }}个</div>
      </div>
      <div class="statusBox">
        <div class="statusIcon statusColor2"></div>
        <div>完成：{{ info.resultStatusNums.finish }}个</div>
      </div>
      <div class="statusBox">
        <div class="statusIcon statusColor3"></div>
        <div>未完成：{{ info.resultStatusNums.notfinish }}个</div>
      </div>
      <div class="statusBox">
        <div class="statusIcon statusColor2"></div>
        <div>时间：{{ info.exectime }}分钟</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.insMissionInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  .row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 1rem 0;

    .el-select {
      :deep(.el-input__inner) {
        width: 25rem;
        height: 2.2rem;
        line-height: 2.2rem;
        border-radius: 0.2rem;
        border: solid 0.1rem #ffffff;
        color: #fff;
      }

      :deep(.el-input__icon) {
        line-height: 2.2rem;
      }
    }

    .el-progress {
      :deep(.el-progress-bar__outer) {
        border-radius: 0.4rem;

        .el-progress-bar__inner {
          border-radius: 0.4rem;
          background-color: #25ca39;
        }
      }
    }

    .btnGroup {
      margin-left: 4.5rem;
      .btnStyle {
        background-color: #051952;
        border-radius: 0.3rem;
        border: solid 0.1rem #7ab9f5;
      }
    }

    .statusBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-width: 12rem;

      .statusIcon {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.5rem;

        &.statusColor1 {
          background-color: #d38182;
        }
        &.statusColor2 {
          background-color: #25ca39;
        }
        &.statusColor3 {
          background-color: #f7ff9c;
        }
      }
    }
  }
}
</style>
