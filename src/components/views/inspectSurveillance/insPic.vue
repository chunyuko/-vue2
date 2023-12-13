<script>
import { defineComponent, ref, toRefs, watch } from 'vue'
import { handleImagApi } from '@/service/api/views/realTimeSurveillance/inspectSurveillance'
export default defineComponent({
  name: 'insPic',
})
</script>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default() {
      return []
    },
  },
})
const { data } = toRefs(props)
const imgData = ref([])
watch(
  data,
  async (newVal) => {
    const arrList = JSON.parse(JSON.stringify(newVal))
    for (let i = 0; i < arrList.length; i++) {
      const imgs = await handleImagApi({ url: encodeURIComponent(arrList[i].src) })
      arrList[i].src = window.URL.createObjectURL(imgs)
    }
    imgData.value = arrList
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="insPic">
    <div class="picContainer" v-for="(item, index) in imgData" :key="index">
      <div class="row">
        <div class="icon"></div>
        <div>{{ item.label }}</div>
      </div>
      <div class="row">
        <div class="icon"></div>
        <div>{{ item.status }}</div>
      </div>
      <div class="picContent">
        <!-- <el-image class="pic" fit="fill" :src="item.src" :preview-src-list="[item.src]"> </el-image> -->
        <el-image class="pic" fit="fill" :src="item.src" :preview-src-list="[item.src]"> </el-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.insPic {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% + 0.5rem);

  .picContainer {
    padding: 0.5rem;
    width: 18.9rem;
    height: 13.5rem;
    background-color: #0d2f6c;
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem 0.5rem 0;

    .row {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;

      .icon {
        width: 0.7rem;
        height: 0.7rem;
        border: solid 0.1rem #4ae2ef;
        border-radius: 50%;
        margin-right: 0.5rem;
        margin-top: 0.1rem;
      }
    }

    .picContent {
      flex: 1;

      .pic {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
