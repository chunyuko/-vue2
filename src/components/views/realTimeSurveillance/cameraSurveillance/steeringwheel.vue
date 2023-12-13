<script>
import { defineComponent } from 'vue'

import { directionalControlApi } from '@/service/api/views/realTimeSurveillance/cameraSurveillance'
import { useStore } from '@hooks/useVue'
export default defineComponent({
  name: 'steeringWheel',
})
</script>

<script setup>
const store = useStore()

// 方向控制
const directionalControl = async (cmd) => {
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
}
</script>

<template>
  <div class="content">
    <img src="@/assets/images/control/steeringwheel.png" alt="" />
    <div
      class="left"
      @mousedown="directionalControl('Left')"
      @mouseup="directionalControl('Stop')"
      @blur="directionalControl('Stop')"
    ></div>
    <div
      class="right"
      @mousedown="directionalControl('Right')"
      @mouseup="directionalControl('Stop')"
      @blur="directionalControl('Stop')"
    ></div>
    <div
      class="up"
      @mousedown="directionalControl('Up')"
      @mouseup="directionalControl('Stop')"
      @blur="directionalControl('Stop')"
    ></div>
    <div
      class="down"
      @mousedown="directionalControl('Down')"
      @mouseup="directionalControl('Stop')"
      @blur="directionalControl('Stop')"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  div {
    background-color: transparent;
    position: absolute;
    cursor: pointer;
  }

  .left {
    height: 8.8rem;
    width: 3rem;
    top: calc(50% - 4.4rem);
    left: 3rem;
    border-radius: 50% 0 0 50%;
  }
  .right {
    height: 8.8rem;
    width: 3rem;
    top: calc(50% - 4.4rem);
    right: 3rem;
    border-radius: 0 50% 50% 0;
  }
  .up {
    width: 8.8rem;
    height: 3rem;
    left: calc(50% - 4.4rem);
    top: 3rem;
    border-radius: 50% 50% 0 0;
  }
  .down {
    width: 8.8rem;
    height: 3rem;
    left: calc(50% - 4.4rem);
    bottom: 3rem;
    border-radius: 0 0 50% 50%;
  }
}
</style>
