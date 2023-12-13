<script>
import { defineComponent, toRefs, inject } from 'vue'

import {
  directionalControlApi,
  robotControlApi,
} from '@/service/api/views/realTimeSurveillance/cameraSurveillance'
import { useStore } from '@hooks/useVue'
export default defineComponent({
  name: 'steeringWheel',
})
</script>

<script setup>
const store = useStore()
const props = defineProps({
  width: {
    type: String,
    default: '21.5rem',
  },
  height: {
    type: String,
    default: '21.5rem',
  },
  // 运动控制还是云台控制，1云台2运动
  type: {
    type: Number,
    default: 1,
  },
  control: {
    type: String,
    default: '',
  },
})
const { width, height, type, control } = toRefs(props)

const customStyle = {
  width: width.value,
  height: height.value,
}
const cameraipcID = inject('cameraipcID')
const cameraifrID = inject('cameraifrID')
const robotId = inject('robotId')
const directionalControl = async (cmd) => {
  if (control.value === 'robot') {
    // 机器人方向控制
    console.log(cameraipcID, '点击云台cameraipcID', robotId, 'CarID')
    const PTZSpeed = store.state.sliderVal
    if (!cameraipcID.value) {
      return
    }
    const params = {
      cmd,
      CameraID: cameraipcID.value,
      CarID: robotId.value,
      CommunicateProtocol: 0,
      PTZSpeed,
    }
    const res = await directionalControlApi(params)
    console.log(res, '机器人云台方向控制接口调用结果')
  } else {
    // 摄像机方向控制
    console.log(window, '摄像机点击云台转向输出的window对象')
    const cameraInfo = window.CameraInfo
    const PTZSpeed = store.state.sliderVal
    if (!cameraInfo.CameraID) {
      return
    }
    const params = {
      cmd,
      CameraID: cameraInfo.CameraID,
      CarID: cameraInfo.CarID,
      CommunicateProtocol: 0,
      PTZSpeed,
    }
    const res = await directionalControlApi(params)
    console.log(res, '摄像机云台方向控制接口调用结果')
  }
}
// 运动控制
const sportsControl = async (cmd) => {
  console.log(robotId.value, '点击运动控制输出的robotId对象')
  const CarSpeed = store.state.robotSpeed
  const params = {
    cmd,
    CarSpeed,
    CarID: robotId.value,
  }
  const res = await robotControlApi(params)
  console.log(res, '机器人运动控制接口调用结果')
}
</script>

<template>
  <div
    class="content"
    :style="customStyle"
    :class="{ motion: type === 2, steeringwheel: type === 1 }"
  >
    <!-- <img src="@/assets/images/control/steeringwheel.png" alt="" /> -->
    <div
      class="left"
      @mousedown="type === 1 ? directionalControl('Left') : sportsControl('Left')"
      @mouseup="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
      @blur="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
    ></div>
    <div
      class="right"
      @mousedown="type === 1 ? directionalControl('Right') : sportsControl('Right')"
      @mouseup="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
      @blur="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
    ></div>
    <div
      class="up"
      @mousedown="type === 1 ? directionalControl('Up') : sportsControl('Up')"
      @mouseup="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
      @blur="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
    ></div>
    <div
      class="down"
      @mousedown="type === 1 ? directionalControl('Down') : sportsControl('Down')"
      @mouseup="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
      @blur="type === 1 ? directionalControl('Stop') : sportsControl('Stop')"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.motion {
  background: url(@/assets/images/control/steeringwheel.png) no-repeat;
}

.steeringwheel {
  background: url(@/assets/images/control/steeringwheel.png) no-repeat;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: 100% 100%;

  div {
    background-color: transparent;
    position: absolute;
    cursor: pointer;
  }

  .left {
    // height: 8.8rem;
    // width: 3rem;
    // top: calc(50% - 4.4rem);
    // left: 3rem;
    // border-radius: 50% 0 0 50%;
    position: absolute;
    height: 46%;
    width: 15%;
    top: 27%;
    left: 15%;
    border-radius: 50% 0 0 50%;
  }
  .right {
    // height: 8.8rem;
    // width: 3rem;
    // top: calc(50% - 4.4rem);
    // right: 3rem;
    // border-radius: 0 50% 50% 0;
    position: absolute;
    height: 46%;
    width: 15%;
    top: 27%;
    right: 15%;
    border-radius: 0 50% 50% 0;
  }
  .up {
    // width: 8.8rem;
    // height: 3rem;
    // left: calc(50% - 4.4rem);
    // top: 3rem;
    // border-radius: 50% 50% 0 0;
    height: 15%;
    width: 46%;
    left: 27%;
    top: 15%;
    border-radius: 50% 50% 0 0;
  }
  .down {
    // width: 8.8rem;
    // height: 3rem;
    // left: calc(50% - 4.4rem);
    // bottom: 3rem;
    // border-radius: 0 0 50% 50%;
    position: absolute;
    height: 15%;
    width: 46%;
    left: 27%;
    bottom: 15%;
    border-radius: 0 0 50% 50%;
  }
}
</style>
