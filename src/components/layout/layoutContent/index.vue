<template>
  <transition name="fade-slide" mode="out-in" appear>
    <keep-alive include="cameraSurveillance,robotSurveillance" max="2">
      <!-- ['cameraSurveillance', 'robotSurveillance', 'insPosSet', 'substationOverviewInfo'] -->
      <router-view v-slot="{ Component }">
        <!-- <keep-alive :include="tabNameList"> -->
        <component :is="Component" :key="numTime" />
      </router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      numTime: '1',
    }
  },
  props: {
    refreshKey: String,
  },
  watch: {
    numTime: function () {
      this.key = new Date().getTime()
    },
  },
  computed: {
    // tabNameList() {
    //   return this.$store.layoutTabsSetting.tabNameList
    // },
  },
}
</script>

<style scoped lang="scss">
@import url('@/assets/style/transition.scss');
</style>
