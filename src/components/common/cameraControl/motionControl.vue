<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'motionControl',
})
</script>

<script setup></script>

<template>
  <div class="motionControl">
    <img src="@/assets/images/control/controlDesk.png" alt="" />
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.motionControl {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
