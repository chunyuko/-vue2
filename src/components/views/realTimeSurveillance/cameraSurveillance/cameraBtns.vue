<script>
import { defineComponent, ref } from 'vue'

import {
  ipcFocusControlApi,
  ifrFocusControlApi,
  ipcMultiControlApi,
  ipcApertureControlApi,
  ipcWiperControlApi,
} from '@/service/api/views/realTimeSurveillance/cameraSurveillance'
import { useStore } from '@hooks/useVue'
export default defineComponent({
  name: 'cameraBtns',
})
</script>

<script setup>
const store = useStore()
// 滑块标记
const sliderMarks = {
  1: '1',
  25: '25',
  50: '50',
  75: '75',
  100: '100',
}

// 变倍控制
const handleMulti = async (cmd) => {
  const cameraInfo = window.CameraInfo
  if (parseInt(cameraInfo.CameraType) === 0) {
    return
  }
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
  }
  const res = await ipcMultiControlApi(params)
}
// 焦距控制
const handlefocal = async (cmd) => {
  const cameraInfo = window.CameraInfo
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
  }
  const res =
    cameraInfo.CameraType === 0
      ? await ifrFocusControlApi(params)
      : await ipcFocusControlApi(params)
}
// 光圈控制
const handleAperture = async (cmd) => {
  const cameraInfo = window.CameraInfo
  if (parseInt(cameraInfo.CameraType) === 0) {
    return
  }
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
  }
  const res = await ipcApertureControlApi(params)
}
// 雨刷
const isWiperOpen = ref(false)
const handleWiper = async () => {
  const cameraInfo = window.CameraInfo
  isWiperOpen.value = !isWiperOpen.value
  const cmd = isWiperOpen.value ? 'Open' : 'Close'
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
  }
  const res = await ipcWiperControlApi(params)
}
// 灯光控制
const isLampOpen = ref(false)
const handleLamp = async () => {
  const cameraInfo = window.CameraInfo
  isLampOpen.value = !isLampOpen.value
  const cmd = isLampOpen.value ? 'Open' : 'Close'
  const params = {
    cmd,
    CameraID: cameraInfo.CameraID,
    CarID: cameraInfo.CarID,
    CommunicateProtocol: 0,
  }
  const res = await ipcWiperControlApi(params)
}
</script>

<template>
  <div class="cameraControl">
    <div class="btns">
      <div class="column">
        <img
          src="@/assets/images/control/MultiUp.png"
          alt=""
          title="倍数放大"
          @mousedown="handleMulti('ZoomIn')"
          @mouseup="handleMulti('Stop')"
          @blur="handleMulti('Stop')"
        />
        <img
          src="@/assets/images/control/MultiDown.png"
          alt=""
          title="倍数缩小"
          @mousedown="handleMulti('ZoomOut')"
          @mouseup="handleMulti('Stop')"
          @blur="handleMulti('Stop')"
        />
      </div>
      <div class="column">
        <img
          src="@/assets/images/control/focalUp.png"
          alt=""
          title="焦点后移"
          @mousedown="handlefocal('Add')"
          @mouseup="handlefocal('Stop')"
          @blur="handlefocal('Stop')"
        />
        <img
          src="@/assets/images/control/focalDown.png"
          alt=""
          title="焦点前移"
          @mousedown="handlefocal('Sub')"
          @mouseup="handlefocal('Stop')"
          @blur="handlefocal('Stop')"
        />
      </div>
      <div class="column">
        <img
          src="@/assets/images/control/apertureUp.png"
          alt=""
          title="光圈放大"
          @mousedown="handleAperture('IrisIn')"
          @mouseup="handleAperture('Stop')"
          @blur="handleAperture('Stop')"
        />
        <img
          src="@/assets/images/control/apertureDown.png"
          alt=""
          title="光圈缩小"
          @mousedown="handleAperture('IrisOut')"
          @mouseup="handleAperture('Stop')"
          @blur="handleAperture('Stop')"
        />
      </div>
      <div class="column">
        <img src="@/assets/images/control/wiper.png" alt="" title="雨刷" @click="handleWiper()" />
        <img src="@/assets/images/control/audio.png" alt="" title="语音对讲" />
      </div>
      <div class="column">
        <img src="@/assets/images/control/lamp.png" alt="" title="补光" @click="handleLamp()" />
        <!-- <img src="@/assets/images/control/keyboard.png" alt="" title="键盘控制" /> -->
        <img src="" alt="" />
      </div>
    </div>
    <div class="speedControl">
      <img src="@/assets/images/control/speedIcon.png" alt="" title="云台转动速度" />
      <el-slider
        v-model="store.state.sliderVal"
        :marks="sliderMarks"
        :min="1"
        :max="100"
        style="flex: 1"
      ></el-slider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cameraControl {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        margin: 1.8rem 1rem;
        height: 2.2rem;
        cursor: pointer;
      }
    }
  }
  .speedControl {
    width: 80%;
    flex: 0 0 8rem;
    display: flex;
    align-items: center;

    img {
      height: 2.5rem;
      margin-right: 3rem;
      width: 5rem;
    }
  }
}
</style>
