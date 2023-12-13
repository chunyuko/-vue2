<script>
import { defineComponent, ref, toRefs, watch, onUnmounted, computed } from 'vue'
import { useStore } from '@hooks/useVue'
import useCamera from '@/utils/hooks/useCamera'
export default defineComponent({
  name: 'insCamera',
})
</script>

<script setup>
const props = defineProps({
  UUID: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default() {
      return []
    },
  },
})
const store = useStore()
const { data, UUID } = toRefs(props)

const IframeRef = ref(null)
// const robotIframeRef = ref(null)

// 视频
const { openVideo, closeVideo, screenSplit } = useCamera(IframeRef)
// // 机器人
// const {
//   openVideo: robotOpenVideo,
//   closeVideo: robotCloseVideo,
//   screenSplit: robotScreenSplit,
// } = useCamera(robotIframeRef)
// 定时器
const interval = ref(null)

// 当前正在播放中的视频和机器人的 UUID
const currentUUID = ref('')
// 视频播放列表
const videoList = ref([])
// 视频巡视进度条数组
const videoProgressArr = ref([])
// 视频巡视进度条
const videoProgress = ref(0)
// 机器人播放列表
const robotList = ref([])
// 视频巡视进度条数组
const robotProgressArr = ref([])
// 机器人巡视进度条
const robotProgress = ref(0)
// 视频 iframe 路径
// const iframeSrc = ref(`../../patrol/videomonitorforJM.html${window.location.search}`)
const iframeSrc = computed(() => {
  console.log(121212121212)
  return `../../patrol/videomonitorforJM.html?${store.state.stationID}`
})
watch(
  iframeSrc,
  (newValue) => {
    console.log(screenSplit)
    setTimeout(() => {
      screenSplit(1)
    }, 3000)
    console.log(screenSplit)
    console.log(newValue, 'xwqjoi')
  },
  { immediate: true, deep: true }
)
// true 表示切换到视频，false 表示切换到机器人
const isCamera = ref(true)
const tabChange = (bool) => {
  isCamera.value = bool
}

// 当前打开的视频在视频数组中的索引
const videoIndex = ref(0)
// 当前打开的机器人在机器人数组中的索引
const robotIndex = ref(0)
// 定时器方法
const intervalFn = () => {
  // 循环播放
  if (videoList.value.length > 1) {
    if (isCamera.value) {
      closeVideo(videoList.value[videoIndex.value].id)
    }
    if (videoIndex.value === videoList.value.length - 1) {
      videoIndex.value = 0
      if (isCamera.value) {
        openVideo(videoList.value[0].id)
      }
    } else {
      videoIndex.value = videoIndex.value + 1
      if (isCamera.value) {
        openVideo(videoList.value[videoIndex.value].id)
        videoProgress.value = videoProgressArr[videoList.value[videoIndex.value].progressKey]
      }
    }
  }
  if (robotList.value.length > 1) {
    if (!isCamera.value) {
      closeVideo(robotList.value[robotIndex.value].id)
    }
    if (robotIndex.value === robotList.value.length - 1) {
      robotIndex.value = 0
      if (!isCamera.value) {
        openVideo(robot.value[0].id)
      }
    } else {
      robotIndex.value = robotIndex.value + 1
      if (!isCamera.value) {
        // 关闭旧视频，打开新视频
        openVideo(robot.value[robotIndex.value].id)
        robotProgress.value = robotProgressArr[robotList.value[robotIndex.value].progressKey]
      }
    }
  }
}

watch(
  data,
  (carData) => {
    console.log(carData, 'sxioioqoiwjojxqoijw')
    // 处理 carData
    const videoArr = []
    const robotArr = []
    videoProgressArr.value = []
    robotProgressArr.value = []
    if (carData) {
      carData.forEach((item) => {
        if (parseInt(item.name) === 2) {
          console.log(videoProgressArr.value, 'qwswqs')
          videoProgressArr.value.push(parseInt(item.progress))
          item.cameraIds.forEach((id) => {
            videoArr.push({
              id: id,
              progressKey: videoProgressArr.value.length - 1,
            })
          })
        } else {
          robotProgressArr.value.push(parseInt(item.progress))
          item.cameraIds.forEach((id) => {
            robotArr.push({
              id: id,
              progressKey: robotProgressArr.value.length - 1,
            })
          })
        }
      })
    }
    if (
      (!videoList.value.length && !robotList.value.length && currentUUID.value === '') ||
      currentUUID.value !== UUID.value
    ) {
      videoList.value = videoArr
      robotList.value = robotArr
      currentUUID.value = UUID.value
      if (interval.value) {
        clearInterval(interval.value)
      }
      if (isCamera.value) {
        console.log(videoList, 12132423)
        if (videoList.value[0]) {
          openVideo(videoList.value[0].id)
          videoProgress.value = videoProgressArr[videoList.value[0].progressKey]
        }
      } else {
        console.log(videoList, 43323121)
        if (robotList.value[0]) {
          openVideo(robotList.value[0].id)
          robotProgress.value = robotProgressArr[robotList.value[0].progressKey]
        }
      }
      interval.value = setInterval(intervalFn, 15000)
    }
  },
  {
    deep: true,
  }
)

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<template>
  <div class="insCamera">
    <div class="tabContainer">
      <div class="btns">
        <el-button
          size="mini"
          type="primary"
          @click="tabChange(true)"
          :class="{ notActive: !isCamera }"
        >
          视频
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="tabChange(false)"
          :class="{ notActive: isCamera }"
        >
          机器人
        </el-button>
      </div>
    </div>
    <div class="tabContentContainer">
      <div class="progressContainer" v-show="isCamera">
        <div>视频巡视进度：</div>
        <el-progress
          style="flex: 1"
          :text-inside="true"
          :stroke-width="20"
          :percentage="videoProgress"
        ></el-progress>
      </div>
      <div class="progressContainer" v-show="!isCamera">
        <div>机器人巡视进度：</div>
        <el-progress
          style="flex: 1"
          :text-inside="true"
          :stroke-width="20"
          :percentage="robotProgress"
        ></el-progress>
      </div>
      <div class="cameraContent">
        <iframe
          :src="iframeSrc"
          frameborder="0"
          style="width: 100%; height: 100%"
          ref="IframeRef"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.insCamera {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;

  .tabContainer {
    .btns {
      margin-bottom: 2rem;

      .notActive {
        background-color: #051952;
        border-radius: 0.6rem;
        border: solid 0.1rem #7ab9f5;
      }
    }
  }
  .tabContentContainer {
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    .progressContainer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 2rem;

      .el-progress {
        :deep(.el-progress-bar__outer) {
          border-radius: 0.4rem;

          .el-progress-bar__inner {
            border-radius: 0.4rem;
            background-color: #25ca39;
          }
        }
      }
    }

    .cameraContent {
      flex: 1;
      background-color: #000;
    }
  }
}
</style>
