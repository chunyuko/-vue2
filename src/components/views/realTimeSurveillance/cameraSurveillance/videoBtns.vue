<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'videoBtns',
})
</script>

<script setup>
const emits = defineEmits(['screenSplit', 'closeVideo', 'closeAllVideo', 'cameraInsChange'])
// 轮巡切换时间
const changeTime = ref('8')

// 画面分割
const onScreeenSplit = (num) => {
  // onCloseAllVideo()
  emits('screenSplit', num)
}

// 关闭视频
const onCloseVideo = () => {
  const cameraInfo = window.CameraInfo
  if (cameraInfo.CameraID) {
    const devID =
      parseInt(cameraInfo.CameraType) === 0
        ? cameraInfo.CameraID + '_0'
        : cameraInfo.CameraID + '_1'
    emits('closeVideo', devID)
  }
}
// 关闭全部视频
const onCloseAllVideo = () => {
  emits('closeAllVideo')
}

// 开始自动切换
const onCameraInsChange = () => {
  emits('cameraInsChange', parseInt(changeTime.value))
}
</script>

<template>
  <div class="videoControl">
    <div class="leftClip">
      <div style="margin-right: 0.5rem">
        <el-button size="mini" type="primary" @click="onScreeenSplit(1)">一屏</el-button>
        <el-button size="mini" type="primary" @click="onScreeenSplit(4)">四屏</el-button>
        <el-button size="mini" type="primary" @click="onScreeenSplit(9)">九屏</el-button>
        <el-button size="mini" type="primary" @click="onCameraInsChange">开始自动切换</el-button>
      </div>
      <div>
        <span>轮巡切换时间：</span>
        <el-select v-model="changeTime" placeholder="请选择" size="mini">
          <el-option value="3" label="3 秒"></el-option>
          <el-option value="8" label="8 秒"></el-option>
          <el-option value="10" label="10 秒"></el-option>
          <el-option value="15" label="15 秒"></el-option>
          <el-option value="30" label="30 秒"></el-option>
        </el-select>
      </div>
    </div>
    <div class="rightClip">
      <el-button size="mini" type="primary" @click="onCloseVideo">关闭</el-button>
      <el-button size="mini" type="primary" @click="onCloseAllVideo">关闭所有</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.videoControl {
  display: flex;
  padding: 1rem;
  justify-content: space-between;

  .leftClip {
    // flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }

    span {
      white-space: nowrap;
    }

    :deep(.el-input__inner) {
      width: 10rem;
    }
  }
  .rightClip {
    // flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  button:not(:first-child) {
    margin-left: 0.5rem;
  }
}
</style>
