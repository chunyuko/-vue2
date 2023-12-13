<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, toRefs } from 'vue'
import createUnityInstance from 'webGL'
import { getCameraByFirstDevIDIn3D } from '../../../service/api/common/webApi.js'
export default defineComponent({
  name: 'webGL',
})
</script>

<script setup>
const props = defineProps({
  //加载背景图
  bacImg: {
    type: String,
    default: '',
  },
})
// const { bacImg } = toRefs(props)
// 地图容器
const containerRef = ref(null)
// canvas 地图 element 对象
const mapRef = ref(null)
// 三维实例
const unityInstance = ref(null)
// 文件配置
const buildUrl = process.env.VUE_APP_TD_PREFIX_URL
const config = {
  dataUrl: buildUrl + '/WEBGL.data.unityweb',
  frameworkUrl: buildUrl + '/WEBGL.framework.js.unityweb',
  codeUrl: buildUrl + '/WEBGL.wasm.unityweb',
  streamingAssetsUrl: 'StreamingAssets',
  companyName: 'DefaultCompany',
  productName: 'TestProject20221130',
  productVersion: '1.0',
  matchWebGLToCanvasSize: true,
}
// 加载
const loading = ref(false)

const sendMessage = (handleName, params) => {
  unityInstance.value ? unityInstance.value.SendMessage('VirtuallyScene', handleName, params) : ''
}
//云镜运动参数(实时通知)
const angle = ref(10)
let add = 0 //加法
const ptzMove = (params) => {
  if (angle.value <= 170 && add === 0) {
    angle.value += params
  }
  if (angle.value >= 170 && add === 0) {
    add = 1 //减法
    angle.value -= params
  }
  if (angle.value < 170 && add === 1) {
    angle.value -= params
  }
  if (angle.value <= 10 && add === 1) {
    add = 0
    angle.value += params
  }
  // console.log('云镜运动参数', 'angle.value', angle.value)
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        Params: [
          {
            ObjectName: '摄像头1_001',
            PTZ_BearingAngle: 130.0,
            PTZ_PitchAngle: -130.0,
            Camera_HorizontalAngle: angle.value,
            Camera_VerticalAngle: 145.0,
          },
        ],
        ProtocolCode: 600,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//导航路径节点参数
const navigator = (params) => {
  console.log('导航路径', 'params')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        Params: [
          {
            Coordinate2D_NodeX: 0.0,
            Coordinate2D_NodeY: 0.0,
          },
          {
            Coordinate2D_NodeX: 1.0,
            Coordinate2D_NodeY: 1.0,
          },
          {
            Coordinate2D_NodeX: 2.0,
            Coordinate2D_NodeY: 2.0,
          },
        ],
        ProtocolCode: 501,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//机器人导航参数(实时通知)
const realNavigator = (params) => {
  console.log('机器人导航参数', 'params')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ObjectName: '',
        //机器人坐标值
        Coordinate2D_NodeX: 0.0,
        Coordinate2D_NodeY: 1110.0,
        //机器人云台实时角度
        PTZ_BearingAngle: 10,
        PTZ_PitchAngle: 10,
        ProtocolCode: 501,
        ProtocolVersion: 16777217,
      },
    })
  )
}

//定位模型
const followDev = (params) => {
  console.log('3d跟随视角', params, 'params')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ObjectName: params,
        ProtocolCode: 200,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//禁用输入
const forbiddenInput = () => {
  console.log('禁用3d输入')
  sendMessage('OnDisableSceneInput', 'MainScene')
}
//启用
const allowInput = () => {
  console.log('启用3d输入')
  sendMessage('OnEnableSceneInput', 'MainScene')
}
//拾取模型
const pickupModelI = (bindingType) => {
  // console.log('拾取模型')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ModelBindingType: bindingType, //0: 默认，1：仅拾取设备模型，2：仅拾取点位模型
        ProtocolCode: 100,
        Coordinate2D_OriginX: 0,
        Coordinate2D_OriginY: 11190,
        Coordinate2D_AngleH: 0,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//回到初始视角
const goBackInit = () => {
  // console.log('回到初始视角')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ObjectName: '', //0: 默认，1：仅拾取设备模型，2：仅拾取点位模型
        ProtocolCode: 10,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//测面积
const measuredArea = () => {
  console.log('测面积')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        MeasureAreaType: 0, //0: 默认面积类型
        ProtocolCode: 400,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//测距
const measuredLength = () => {
  console.log('测距')
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        MeasureDistanceType: 0, //0: 默认测距类型
        ProtocolCode: 300,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//切换场景
const changeScene = (sceneNameIs) => {
  // console.log(sceneNameIs, '切换场景')
  sendMessage('OnLoadScene', sceneNameIs)
}
//展示设备关联点位
const showPoint = (showPoints, devType, relationDevType, relationdevList) => {
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ObjectType: devType, //选取模型的类型(0：无效, 1:设备, 2:点位, 3:云镜)
        ObjectName: showPoints,
        ObjectSynopsis: '测试点击物体的名称',
        RelationObjectType: relationDevType, //选取的对象关联的模型类型(1:设备, 2:点位, 3:云镜)
        RelationObjectNameList: relationdevList, //
        RelationObjectSynopsisList: ['测试关联摄像机1', '测试关联摄像机2', '测试关联摄像机3'],
        ProtocolCode: 1000,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//根据浮标展示数据
const showDatas = (devType, objectName, resultDatas) => {
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        ObjectType: devType, //浮动标签关联的 3D 实体模型的类型(0：无效, 1:设备, 2:点位, 3:云镜)
        ObjectName: objectName,
        ResultSynopsis: resultDatas, //展示结果
        ProtocolCode: 2000,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//清除浮标
const clearUi = (uIElementMask) => {
  console.log('清除浮标', uIElementMask)
  sendMessage(
    'OnWebRequestByJSON',
    JSON.stringify({
      Param: {
        UIElementMask: uIElementMask,
        //1: 仅清除所有锚点浮动标签
        //2: 仅清除所有实体模型标签
        //4: 仅清除所有透明选取盒
        //8: 仅清除所有 UI 展示面板
        //255: 清除所有辅助 UI 元素
        ProtocolCode: 9999,
        ProtocolVersion: 16777217,
      },
    })
  )
}
//模型名称
const threeObj = ref({})
const emits = defineEmits(['threeDtoFather'])
onMounted(() => {
  // 三维加载完成时触发
  window.OnSceneName = (params) => {
    //隐藏ui组件
    clearUi(65535)
    sendMessage('OnDisableSceneInput', 'MainScene')
    sendMessage('OnLoadScene', 'MainScene')
    //MainScene/500KV继电器室1/500KV继电器室2/1000KV继电器
  }
  // 切换场景 loading
  window.OnSceneLoading = (params) => {}

  // 场景装载完毕
  window.OnSceneActive = (params) => {
    loading.value = false
    // alert('场景装载完毕啦啦啦')
    sendMessage('OnEnableSceneInput', 'MainScene')
    //路径
    navigator()
    //0: 摄像机模型,
    //1: 仅选择设备实体模型或者摄像机模型
    //2：仅选择点位实体模型或者摄像机模型
    pickupModelI(1)

    //摄像机云台
    let timer = null
    timer = setInterval(() => {
      // ptzMove(10)
    }, 1000)
  }
  //接收通知函数
  window.OnUnityRequestByJSON = (params) => {
    threeObj.value = params
    emits('threeDtoFather', threeObj.value)

    //双击打开视频
    emits('dbCikthreeD', threeObj.value)
    //点击模型  展示关联模型
    const showObj = JSON.parse(params)
    console.log('我接收模型名称', showObj)
    const objectNameIs = showObj.Param.ObjectName
    //根据三维名称显示关联模型
    let cameraRelLists = []
    let pointRelLists = []
    const cameraRelateFun = async (modelTypeIs) => {
      if (modelTypeIs === 'findCameras') {
        const params = {
          task: 'getCameraByFirstDevIDIn3D',
          firstDevIDIn3D: objectNameIs, //objectNameIs,
        }
        const res = await getCameraByFirstDevIDIn3D(params)
        cameraRelLists = res.data
        console.log(cameraRelLists, 'cameraRelLists', res)
      } else if (modelTypeIs === 'findPoint') {
        const params = {
          task: 'getdevByFirstDevIDIn3D',
          firstDevIDIn3D: objectNameIs,
        }
        const res = await getCameraByFirstDevIDIn3D(params)
        pointRelLists = res.data
        setTimeout(() => {
          console.log(pointRelLists, 'pointRelLists', res)
        }, 1000)
      }

      return pointRelLists
    }

    cameraRelateFun('findCameras')
    cameraRelateFun('findPoint')
    const allRelates = cameraRelLists.concat(pointRelLists)
    // showPoint(objectNameIs, 1, 2, ['drdk2997', '摄像头1_015', 'CameraRig_L_220'])
    showPoint(objectNameIs, 1, 2, allRelates)
    //点击浮标显示数据
    // showDatas(3, objectNameIs, '测试需要展示的内容--吧啦吧啦---》' + objectNameIs)
  }

  mapRef.value.style.width = '100%'
  mapRef.value.style.height = '100%'
  // 创建三维实例
  createUnityInstance(mapRef.value, config, (progress) => {
    loading.value = true
  })
    .then((instance) => {
      unityInstance.value = instance
    })
    .catch((message) => {
      alert(message)
    })
})

onBeforeUnmount(() => {
  sendMessage('OnLoadScene', '')
  clearInterval(timer)
  timer = null
})
defineExpose({
  followDev,
  forbiddenInput,
  pickupModelI,
  goBackInit,
  changeScene,
  clearUi,
  measuredArea,
  measuredLength,
})
</script>

<template>
  <div
    class="webGLContainer"
    id="unity-container"
    v-loading="loading"
    ref="containerRef"
    element-loading-text="拼命加载中"
  >
    <canvas
      ref="mapRef"
      class="canvasContainer"
      id="unity-canvas"
      width="1920"
      height="1080"
    ></canvas>
    <div id="unity-loading-bar">
      <div id="unity-logo"></div>
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full" ref="progressRef"></div>
      </div>
    </div>
    <div id="unity-warning"></div>
    <div id="unity-footer">
      <div id="unity-webgl-logo"></div>
      <div id="unity-fullscreen-button"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.webGLContainer {
  width: 100%;
  height: 100%;

  .canvasContainer {
    width: 100%;
    height: 100%;
    flex: 1 1 auto;
  }
}
:deep(.el-loading-mask) {
  background-image: url('../../../assets/images/views/realTimeSurveillance/1.png');
  background-size: cover;
}
:deep(.el-loading-spinner) {
  font-size: 3.8rem;
  font-weight: bold;
  .path {
    stroke: #fff;
  }
  .el-loading-text {
    color: #fff;
  }
}
</style>
