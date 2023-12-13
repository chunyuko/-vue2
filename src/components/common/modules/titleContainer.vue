<script>
import { defineComponent, toRefs, computed } from 'vue'
export default defineComponent({
  name: 'titleContent',
})
</script>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: '#0d2f6c',
  },
})
const { title, bgColor } = toRefs(props)
const contentStyle = computed(() => {
  return {
    backgroundColor: bgColor.value,
  }
})
</script>

<template>
  <div class="titleContainer">
    <div class="title">
      <div class="titleNameContainer">
        <div class="blueIcon"></div>
        <div class="name">{{ title }}</div>
      </div>
      <div>
        <slot name="titleRight"></slot>
      </div>
    </div>
    <div class="content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.titleContainer {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    flex: 0 0 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .titleNameContainer {
      display: flex;
      align-items: center;

      .blueIcon {
        width: 1rem;
        height: 2rem;
        background-color: #4ae2ef;
      }

      .name {
        font-size: 1.6rem;
        padding: 0 1rem;
      }
    }
  }
  .content {
    height: 100%;
    flex: 1 1 auto;
    margin-top: 0.2rem;
    box-sizing: border-box;
    padding: 0;
  }
}
</style>
