<script>
import { defineComponent, toRefs } from 'vue'

import {
  ipcFocusControlApi,
  ifrFocusControlApi,
  ipcMultiControlApi,
  ipcApertureControlApi,
} from '@/service/api/views/realTimeSurveillance/cameraSurveillance'
import { goGridApi } from '@/service/api/views/realTimeSurveillance/robotSurveillance'
import LightBlueButton from '@/components/common/buttons/lightBlueButton.vue'
import SteeringWheel from '@/components/common/cameraControl/steeringwheel.vue'
export default defineComponent({
  name: 'robotSurveillanceControl',
})
</script>

<script setup>
const props = defineProps({
  carID: {
    type: String,
    default: '',
  },
  robotSelectValI: {
    type: String,
    default: '',
  },
  cameraipcID: {
    type: String,
    default: '',
  },
  cameraifrID: {
    type: String,
    default: '',
  },
})
const { carID, robotSelectValI, cameraipcID, cameraifrID } = toRefs(props)

// 变倍控制
const handleMulti = async (cmd) => {
  console.log('变倍控制cameraipcID', cameraipcID.value, 'CarID', robotSelectValI.value)
  const cameraInfo = cameraipcID.value
  if (parseInt(cameraInfo) === 0) {
    return
  }
  const params = {
    cmd,
    CameraID: cameraInfo,
    CarID: robotSelectValI.value,
    CommunicateProtocol: 0,
  }
  const res = await ipcMultiControlApi(params)
  console.log('变倍控制调用接口返回结果', res)
}
// 焦距控制
const handlefocal = async (cmd) => {
  console.log('焦距控制cameraipcID', cameraipcID.value, 'CarID', robotSelectValI.value)
  const cameraInfo = cameraipcID.value
  const params = {
    cmd,
    CameraID: cameraInfo,
    CarID: robotSelectValI.value,
    CommunicateProtocol: 0,
  }
  const res = cameraInfo === 0 ? await ifrFocusControlApi(params) : await ipcFocusControlApi(params)
  console.log('焦距控制调用接口返回结果', res)
}
// 光圈控制
const handleAperture = async (cmd) => {
  console.log('光圈控制cameraipcID', cameraipcID.value, 'CarID', robotSelectValI.value)
  const cameraInfo = cameraipcID.value
  if (parseInt(cameraInfo) === 0) {
    return
  }
  const params = {
    cmd,
    CameraID: cameraInfo,
    CarID: robotSelectValI.value,
    CommunicateProtocol: 0,
  }
  const res = await ipcApertureControlApi(params)
  console.log('光圈控制调用接口返回结果', res)
}
// 一键返航
// const hanldeGoBack = async () => {
//   const params = {
//     CommunicateProtocol: 0,
//     CarID: carID.value,
//   }
//   await goBackApi(params)
// }
//机器人其他操作

const robotGrid = async (commandIs) => {
  console.log(commandIs, '机器人其他操作cameraipcID')
  const params = {
    type: 1,
    Command: commandIs,
    CarID: robotSelectValI.value,
  }
  const res = await goGridApi(params)
  console.log('机器人其他操作---', res, '机器人id', robotSelectValI.value)
}
</script>

<template>
  <div class="robotSurveillanceControl">
    <div class="controlBox">
      <div class="controlContent">
        <el-button class="btnStyle" size="mini" type="primary">转弯</el-button>
        <SteeringWheel
          :width="'100%'"
          :height="'100%'"
          :type="2"
          :control="'robot'"
        ></SteeringWheel>
      </div>
      <div class="label">运动控制</div>
    </div>
    <div class="controlBox">
      <div class="controlContent">
        <el-button class="btnStyle" size="mini" type="primary">复位</el-button>
        <SteeringWheel
          :width="'100%'"
          :height="'100%'"
          :type="1"
          :control="'robot'"
        ></SteeringWheel>
      </div>
      <div class="label">云台控制</div>
    </div>
    <div class="smallBtnsBox">
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
    </div>
    <div class="btnsBox">
      <div class="singleBtn" @click="robotGrid(1)">
        <LightBlueButton color="#fff">远方复位</LightBlueButton>
      </div>
      <div class="singleBtn" @click="robotGrid(3)">
        <LightBlueButton color="#fff">一键返航</LightBlueButton>
      </div>
      <div class="singleBtn" @click="robotGrid(2)">
        <LightBlueButton color="#fff">系统自检</LightBlueButton>
      </div>
      <div class="singleBtn" @click="robotGrid(8)">
        <LightBlueButton color="#fff">任务终止</LightBlueButton>
      </div>
      <div class="singleBtn" @click="robotGrid(6)">
        <LightBlueButton color="#fff">控制权获取</LightBlueButton>
      </div>
      <div class="singleBtn" @click="robotGrid(7)">
        <LightBlueButton color="#fff">控制权释放</LightBlueButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.robotSurveillanceControl {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  box-sizing: border-box;

  .controlBox {
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
      margin-top: 0.5rem;
    }

    .controlContent {
      flex: 0 0 14rem;
      padding: 1rem;
      box-sizing: border-box;
      position: relative;

      .btnStyle {
        position: absolute;
        border: 0.1rem solid #058abd;
        background-color: #1e5dd3;
        bottom: 0;
        right: 0;
        padding: 0.5rem 0.7rem;
        font-size: 1.2rem;
        transform: scale(0.8);
      }

      .control {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        position: relative;
        background-image: url(@/assets/images/control/steeringwheel.png);
      }
      .up {
        position: absolute;
        height: 15%;
        width: 46%;
        left: 27%;
        top: 15%;
        border-radius: 50% 50% 0 0;
      }
      .left {
        position: absolute;
        height: 46%;
        width: 15%;
        top: 27%;
        left: 15%;
        border-radius: 50% 0 0 50%;
      }
      .right {
        position: absolute;
        height: 46%;
        width: 15%;
        top: 27%;
        right: 15%;
        border-radius: 0 50% 50% 0;
      }
      .down {
        position: absolute;
        height: 15%;
        width: 46%;
        left: 27%;
        bottom: 15%;
        border-radius: 0 0 50% 50%;
      }
    }

    .label {
      margin-top: 1rem;
      color: #fff;
      text-align: center;
    }
  }

  .smallBtnsBox {
    margin-top: 2rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;

    .column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        margin: 1rem;
        height: 2.2rem;
        cursor: pointer;
      }
    }
  }

  .btnsBox {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;

    .singleBtn {
      text-align: center;
      margin-top: 1rem;
    }
  }
}
</style>
