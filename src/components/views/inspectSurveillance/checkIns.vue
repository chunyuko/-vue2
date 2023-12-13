<script>
import { defineComponent, ref, toRefs, inject, watch } from 'vue'
import { handleImagApi } from '@/service/api/views/realTimeSurveillance/inspectSurveillance'
export default defineComponent({
  name: 'checkIns',
})
</script>
<script setup>
const props = defineProps({
  toSonDatas: {
    type: Object,
    default() {
      return {}
    },
  },
})
const insInfo = inject('insInfo')
const { toSonDatas } = toRefs(props)
const dialogVisible = ref(false)
const checkdData = ref([
  {
    labelName: '巡视任务名称 :',
    placeHolder: '请选择',
    identification: 'taskName',
    type: 'common',
  },
  {
    labelName: '巡检时间 :',
    placeHolder: '请选择',
    identification: 'date_time',
    type: 'common',
  },
  {
    labelName: '设备区域',
    placeHolder: '请输入',
    identification: 'area_desc',
    type: 'ipt',
  },
  {
    labelName: '巡检点类型',
    placeHolder: '请输入',
    identification: 'device_type',
    type: 'ipt',
  },
  {
    labelName: '点位名称',
    placeHolder: '请输入',
    identification: 'device_desc',
    type: 'ipt',
  },
  {
    labelName: '巡检结果',
    placeHolder: '请输入',
    identification: 'inspection_result',
    type: 'ipt',
  },
])
const sonShow = () => {
  // console.log('这里是子组件的方法')
  dialogVisible.value = true
}

//展示任务信息
console.log(insInfo, '任务信息')

//可见光图片处理前
const infraredImgUrl = ref('')
//红外图片处理前
const ipcImgUrl = ref('')
//可见光图片处理后
const afterinfraredImgUrl = ref('')
//红外图片处理后
const afteripcImgUrl = ref('')
watch(
  toSonDatas,
  () => {
    console.log(toSonDatas.value)
    infraredImgUrl.value = toSonDatas.value.infrared_cap
    ipcImgUrl.value = toSonDatas.value.ipc_pic_cap
  },
  { immediate: true, deep: true }
)
// 获取图片内容
const showImg = async () => {
  const infraredImgData = await handleImagApi({ url: encodeURIComponent(infraredImgUrl.value) })
  afterinfraredImgUrl.value = window.URL.createObjectURL(infraredImgData)
  const ipcImgData = await handleImagApi({ url: encodeURIComponent(ipcImgUrl.value) })
  afteripcImgUrl.value = window.URL.createObjectURL(ipcImgData)
  // console.log(infraredImgUrl.value, '红外图片处理结果', afterinfraredImgUrl.value, '转换后图片结果')
  // console.log(ipcImgUrl.value, '可见光图片处理结果', afteripcImgUrl.value, '转换后图片结果')
}
defineExpose({ sonShow, showImg })
</script>
<template>
  <el-dialog title="巡视列表数据" class="addBooks" :visible.sync="dialogVisible" :show-close="true">
    <div class="ipts">
      <div class="inner" v-for="(item, index) in checkdData" :key="index">
        <span class="spa">{{ item.labelName }}</span>
        <el-input v-if="item.type === 'ipt'" v-model="toSonDatas[item.identification]" readonly>
        </el-input>
        <span style="color: azure; line-height: 4rem" v-if="item.type === 'common'">{{
          insInfo[item.identification]
            ? insInfo[item.identification]
            : toSonDatas[item.identification]
        }}</span>
      </div>
    </div>

    <div class="imgs">
      <div class="one">
        <div class="title">可见光图片</div>
        <el-image style="width: 25rem; height: 25rem" :src="afteripcImgUrl"> </el-image>
      </div>
      <div class="one">
        <div class="title">红外图片</div>
        <el-image class="imgError" style="width: 25rem; height: 25rem" :src="afterinfraredImgUrl">
        </el-image>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.inner {
  display: flex;
  color: #fff;
  margin-left: 1rem;
  font-size: 1.6rem;
  margin-top: 2rem;
  text-align: center;
}
.spa {
  display: inline-block;
  width: 13rem;
  line-height: 4rem;
}
.ipts {
  display: flex;
  flex-wrap: wrap;
}
.imgs {
  display: flex;
  justify-content: space-around;
}
.title {
  color: #fff;
  margin-left: 1rem;
  font-size: 1.6rem;
  margin-top: 3rem;
  text-align: center;
  margin-bottom: 2rem;
}
.imgError {
  :deep(.el-image__error) {
    background: #0d5ead;
  }
}
// .addBooks {
// width: 90%;
// background-color: #07275d;
// position: absolute;
// top: 0rem;
// left: 10%;
// // height: 102rem;
// overflow: none;
// overflow-x: auto;
// margin-top: 2rem;
// z-index: 1000;
// margin-bottom: 1.8rem;
// margin-left: -4.1rem !important;
// }
.addBooks {
  :deep(.el-dialog) {
    width: 78rem;
    height: 0rem;
    margin-top: 33rem !important;
    margin-left: 23%;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      cursor: move;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body::before,
    .el-dialog__body::after {
      content: '';
      display: block;
    }
    .el-dialog__body::after {
      clear: both;
    }
    .el-dialog__body {
      background-color: #06255d;
      padding: 0;
      height: 52rem;
    }
    .el-dialog__footer {
      background-color: #06255d;
    }
  }
}
.addBooks::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background: #08193d;
}

:deep(.el-form-item__label) {
  width: 11rem !important;
  font-size: 1.6rem;
}

.titleIs {
  width: 131.5rem;
  height: 4.8rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 1.6rem;
  box-sizing: border-box;
  padding: 1.2rem 2rem;
}
</style>
