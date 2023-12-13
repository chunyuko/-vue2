<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VideoPlaybackTitleContainer',
})
</script>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="container">
    <div class="titleContainer">{{ title }}</div>
    <div class="contentContainer">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: 100%;
  position: relative;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  border: 0.2rem solid #145aab;
  box-sizing: border-box;

  .titleContainer {
    flex: 0 0 3.4rem;
    background: linear-gradient(to right, #0037a1, #20034e);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
  }
  .contentContainer {
    height: calc(100% - 3.4rem);
    overflow: hidden;
    flex: 1;
    // background-color: #031b4c;
    background-color: transparent;
    box-shadow: 0 0 1rem #005dd5 inset;
    box-sizing: border-box;
    padding: 1rem;
  }
}
</style>
