<script>
// 范超威的设备树
import { defineComponent, ref } from 'vue'
import CameraBtns from '@/components/views/realTimeSurveillance/cameraSurveillance/cameraBtns.vue'
import VideoBtns from '@/components/views/realTimeSurveillance/cameraSurveillance/videoBtns.vue'
import LightBlueButton from '@/components/common/lightBlueButton.vue'
import Tree from '@/components/common/tree'
import Table from '@/components/views/cameraSurveillance/table.vue'
import SteeringWheel from '@/components/common/cameraControl/steeringwheel.vue'
export default defineComponent({
  name: 'cameraSurveillance',
})
</script>

<script setup>
const triangleRef = ref(null)
const treeContentRef = ref(null)
// const showTreeContent = () => {
//   const element = triangleRef.value
//   const treeElem = treeContentRef.value
//   if (element.className.indexOf('show') !== -1) {
//     element.classList.remove('show')
//     element.classList.add('close')
//     treeElem.classList.remove('treeShow')
//     treeElem.classList.add('treeClose')
//   } else {
//     element.classList.remove('close')
//     element.classList.add('show')
//     treeElem.classList.remove('treeClose')
//     treeElem.classList.add('treeShow')
//   }
// }

const treeData = ref([
  [
    {
      TreeLevel: 0,
      level: 1,
      id: '1',
      label: '默认区域',
      fId: '-1',
    },
    {
      TreeLevel: 1,
      level: 1,
      id: '3527E9E4-4F12-89F8-02A3-EDDE936FAD87',
      label: '1234455',
      fId: '1',
    },
    {
      TreeLevel: 1,
      level: 1,
      id: '4C66467A-76ED-26D8-DD38-548CE3C53CE4',
      label: '1111111',
      fId: '1',
    },
    {
      TreeLevel: 3,
      level: 1,
      id: '544947B7-9903-9A4C-A645-30A616B4C522',
      label: '333',
      fId: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
    },
    {
      TreeLevel: 2,
      level: 1,
      id: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
      label: '222',
      fId: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
    },
    {
      TreeLevel: 1,
      level: 1,
      id: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
      label: '区域1001',
      fId: '1',
    },
    {
      TreeLevel: 1,
      level: 1,
      id: 'A2F26888-55A1-CFB8-6C0F-F792BF8262BF',
      label: 'cccdd',
      fId: '1',
    },
  ],
  [
    {
      CarType: 2,
      OperateUser: 2,
      User: '5,7,6',
      LoginState: 1,
      level: 2,
      id: 3,
      label: '123',
      fId: '3527E9E4-4F12-89F8-02A3-EDDE936FAD87',
      SerialNum: '1122334455',
    },
  ],
  [
    {
      CameraIDOnRobot: 1,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '5,6,7',
      level: 3,
      id: 23,
      label: '400V球机1222',
      fId: 3,
    },
    {
      CameraIDOnRobot: 2,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 24,
      label: '400V球机2',
      fId: 3,
    },
    {
      CameraIDOnRobot: 3,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 25,
      label: '400V球机3',
      fId: 3,
    },
    {
      CameraIDOnRobot: 4,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 26,
      label: '400V球机4',
      fId: 3,
    },
    {
      CameraIDOnRobot: 5,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '1,2,7',
      level: 3,
      id: 27,
      label: '变电站',
      fId: 3,
    },
    {
      CameraIDOnRobot: 6,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 28,
      label: '控制室球机',
      fId: 3,
    },
    {
      CameraIDOnRobot: 7,
      CameraType: 1,
      IFRCameraType: 0,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 29,
      label: 'EPS球机',
      fId: 3,
    },
    {
      CameraIDOnRobot: 8,
      CameraType: 0,
      IFRCameraType: 1,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 30,
      label: '固定式摄像机1',
      fId: 3,
    },
    {
      CameraIDOnRobot: 9,
      CameraType: 0,
      IFRCameraType: 1,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 31,
      label: '固定式摄像机2',
      fId: 3,
    },
    {
      CameraIDOnRobot: 10,
      CameraType: 0,
      IFRCameraType: 1,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '6,7',
      level: 3,
      id: 32,
      label: '固定式摄像机3测试修改1',
      fId: 3,
    },
    {
      CameraIDOnRobot: 11,
      CameraType: 0,
      IFRCameraType: 1,
      IPCOffline: 0,
      IFROffline: 0,
      Admin: 2,
      User: '',
      level: 3,
      id: 33,
      label: '固定式摄像机4',
      fId: 3,
    },
  ],
])
const pointTreeBtn = () => {
  treeData.value = [
    [
      {
        TreeLevel: 0,
        level: 1,
        id: '1',
        label: '默认区域',
        fId: '-1',
      },
      {
        TreeLevel: 1,
        level: 1,
        id: '3527E9E4-4F12-89F8-02A3-EDDE936FAD87',
        label: '1234455',
        fId: '1',
      },
      {
        TreeLevel: 1,
        level: 1,
        id: '4C66467A-76ED-26D8-DD38-548CE3C53CE4',
        label: '1111111',
        fId: '1',
      },
      {
        TreeLevel: 3,
        level: 1,
        id: '544947B7-9903-9A4C-A645-30A616B4C522',
        label: '333',
        fId: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
      },
      {
        TreeLevel: 2,
        level: 1,
        id: '9AEFBE6A-F364-8A98-0E4F-0A4E466E1B3E',
        label: '222',
        fId: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
      },
      {
        TreeLevel: 1,
        level: 1,
        id: 'A29A5DEA-C2CB-D0D1-363A-36DCB2CE1C86',
        label: '区域1001',
        fId: '1',
      },
    ],
    [
      {
        CarType: 2,
        OperateUser: 2,
        User: '5,7,6',
        LoginState: 1,
        level: 2,
        id: 3,
        label: '123',
        fId: '3527E9E4-4F12-89F8-02A3-EDDE936FAD87',
        SerialNum: '1122334455',
      },
    ],
    [
      {
        CameraIDOnRobot: 1,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '5,6,7',
        level: 3,
        id: 23,
        label: '400V球机1222',
        fId: 3,
      },
      {
        CameraIDOnRobot: 2,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 24,
        label: '400V球机2',
        fId: 3,
      },
      {
        CameraIDOnRobot: 3,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 25,
        label: '400V球机3',
        fId: 3,
      },
      {
        CameraIDOnRobot: 4,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 26,
        label: '400V球机4',
        fId: 3,
      },
      {
        CameraIDOnRobot: 5,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '1,2,7',
        level: 3,
        id: 27,
        label: '变电站',
        fId: 3,
      },
      {
        CameraIDOnRobot: 6,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 28,
        label: '控制室球机',
        fId: 3,
      },
      {
        CameraIDOnRobot: 7,
        CameraType: 1,
        IFRCameraType: 0,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 29,
        label: 'EPS球机',
        fId: 3,
      },
      {
        CameraIDOnRobot: 8,
        CameraType: 0,
        IFRCameraType: 1,
        IPCOffline: 0,
        IFROffline: 0,
        Admin: 2,
        User: '',
        level: 3,
        id: 30,
        label: '固定式摄像机1',
        fId: 3,
      },
    ],
  ]
}
const contextmenu = {
  1: [
    {
      label: '第一级',
      onClick: () => {
        console.log('第一级')
      },
    },
  ],
  2: [
    {
      label: '第二级',
      onClick: () => {
        console.log('第二级')
      },
    },
  ],
  3: [
    {
      label: '第三级',
      onClick: () => {
        console.log('第三级')
      },
    },
  ],
}
</script>

<template>
  <div class="viewsContent">
    <div class="leftContent">
      <div class="threeDContent">
        <div class="treeContent treeShow" ref="treeContentRef">
          <div class="triangle show" ref="triangleRef"></div>
          <div class="treeBox">
            <div class="btnBox">
              &nbsp;&nbsp;
              <LightBlueButton @click.native="pointTreeBtn">设备点位树</LightBlueButton>
              &nbsp;
              <LightBlueButton> 巡视装置树 </LightBlueButton>
            </div>
            <div class="tree">
              <Tree :isSearch="true" :data="treeData" :contextmenu="contextmenu"></Tree>
            </div>
          </div>
        </div>
      </div>
      <div class="tableContent">
        <Table></Table>
      </div>
    </div>
    <div class="rightContent">
      <div class="videoContent">
        <div class="video"></div>
        <VideoBtns></VideoBtns>
      </div>
      <div class="controlContent">
        <div class="directionControl">
          <SteeringWheel></SteeringWheel>
        </div>
        <div class="btns">
          <CameraBtns></CameraBtns>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.viewsContent {
  display: flex;
  flex-direction: row;
  height: 100%;

  .leftContent {
    flex: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;

    .threeDContent {
      position: relative;
      flex: 1;
      background-color: $blueTheme-contentBgColor;
      .treeContent {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        // background-color: rgba(13, 47, 108, 0.3);
        background-color: #000;
        &.treeShow {
          height: 95%;
          width: 35rem;
        }
        &.treeClose {
          height: 2.1rem;
          width: 2.1rem;
        }
        .triangle {
          cursor: pointer;
          position: absolute;
          top: 0.3rem;
          left: 0.3rem;
          width: 0;
          height: 0;
          &.show {
            border-top: 1.5rem solid $blueTheme-color-blueLight;
            border-right: 1.5rem solid transparent;
          }
          &.close {
            border-bottom: 1.5rem solid $blueTheme-color-blueLight;
            border-left: 1.5rem solid transparent;
          }
        }
        .treeBox {
          box-sizing: border-box;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;

          .btnBox {
            margin-bottom: 0.5rem;
          }

          .tree {
            flex: 1;
            overflow: hidden;
          }
        }
      }
    }
    .tableContent {
      margin-top: 1rem;
      flex: 0 0 25rem;
    }
  }

  .rightContent {
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: column;

    .videoContent {
      flex: 2;
      display: flex;
      background-color: $blueTheme-contentBgColor;
      flex-direction: column;

      .video {
        flex: 1;
      }
    }

    .controlContent {
      margin-top: 1rem;
      flex: 1;
      background-color: $blueTheme-contentBgColor;
      padding: 1rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;

      .directionControl {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btns {
        flex: 1;
        height: 100%;
      }
    }
  }
}
</style>
