<script>
// 来自范超威的控制盘组件 样式有问题所以复制一份调试
import { defineComponent } from 'vue'
import { directionalControlApi } from '@/service/api/views/realTimeSurveillance/cameraSurveillance'
import { useEventBus } from '@hooks/useVue'
export default defineComponent({
  name: 'steeringWheel',
})
</script>

<script setup>
const bus = useEventBus()
const cameraInfo = window.CameraInfo

// 方向控制
const directionalControl = async (cmd) => {
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
    PTZSpeed: bus.$emit('getSliderVal'),
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
  // 也就加了一个高度
  height: 100%;

  > div {
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
