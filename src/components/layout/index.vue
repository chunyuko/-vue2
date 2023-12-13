<script>
import LayoutContent from './layoutContent'
import LayoutHeader from './layoutHeader'
import LayoutRowMenu from './layoutMenu/rowMenu'
import { defineComponent, ref, provide, watch, reactive, getCurrentInstance } from 'vue'
import router from '@/router'
export default defineComponent({
  name: 'Layout',
})
</script>

<script setup>
// 页面刷新的 key
const locationHref = window.location.href
const jumpUrl = ref(true)
const proxy = getCurrentInstance().proxy
const key = ref('0')
const breadcrumbItems = ref([])
const refreshKey = () => {
  key.value = Date.parse(new Date().toString()).toString()
}
const breadcrumbProcess = () => {
  breadcrumbItems.value = []
  router.currentRoute.matched.forEach((item) => {
    breadcrumbItems.value.push({
      title: item.meta.title,
    })
  })
}
locationHref.indexOf('isOut') !== -1
watch(
  () => proxy.$route,
  () => {
    if (locationHref.indexOf('isOut') !== -1) {
      jumpUrl.value = false
    }
    // console.log('>>执行监听')
    breadcrumbProcess()
  },
  { immediate: true, deep: true }
)
// watch(
//   () => a.value,
//   () => {
//     console.log('>>>', a)
//     console.log('>>>', router.currentRoute)
//   }
// )
provide('refreshKey', refreshKey)
</script>

<template>
  <el-container class="layout">
    <el-header class="layout-header" style="height: auto" v-if="jumpUrl">
      <LayoutHeader style="height: 66px"></LayoutHeader>
      <!-- <LayoutRowMenu></LayoutRowMenu> -->
    </el-header>
    <div class="breadcrumbBox" v-if="jumpUrl">
      <span class="breadcrumbName"> 我的位置： </span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">{{
          item.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-main class="layout-content">
      <LayoutContent :refresh-key="key" class="views-content"></LayoutContent>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;

  .layout-header {
    // flex: 0 0 11rem;
    // line-height: 5rem;
    align-items: center;
    padding: 0;
    z-index: 999;
  }

  .layout-content {
    box-sizing: border-box;
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem 1rem;
    background-color: #f5f7f2;
    overflow: hidden;

    .views-content {
      height: 100%;
      overflow: hidden;
    }
  }
  .breadcrumbBox {
    display: flex;
    padding: 0 32px;
    text-align: left;
    line-height: 32px;
    font-size: 12px;
  }
}
::v-deep .el-breadcrumb {
  font-size: 12px;
  line-height: 32px;
}
</style>
