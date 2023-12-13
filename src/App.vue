<template>
  <div id="app">
    <div class="app-wrapper" v-if="isRouteAlive">
      <!-- <keep-alive include="cameraSurveillance,robotSurveillance" max="2"> -->
      <!-- cameraSurveillance,robotSurveillance,insPosSet,substationOverviewInfo -->
      <router-view v-slot="{ Component }">
        <transition name="zoom-fade" mode="out-in" appear>
          <component :is="Component" :key="numTime" />
        </transition>
      </router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isRouteAlive: true,
      numTime: '1',
    }
  },
  watch: {
    numTime: function () {
      this.key = new Date().getTime()
    },
  },
  methods: {
    reload() {
      this.isRouteAlive = false
      this.$nextTick(function () {
        this.isRouteAlive = true
      })
    },
  },
}
</script>

<style lang="scss">
@import url('@/assets/style/transition.scss');
html {
  font-size: 10px;
  height: 100%;
  font-family: 'Microsoft YaHei';

  body {
    font-size: 1.2rem;
    height: 100%;
    width: 100%;
    min-height: 70rem;
    min-width: 144rem;
    font-family: MicrosoftYaHei;

    #app {
      height: 100%;
      width: 100%;
      background: #f5f7f2;
      background-size: 100% 100%;
      // color: $blueTheme-color;

      .app-wrapper {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
