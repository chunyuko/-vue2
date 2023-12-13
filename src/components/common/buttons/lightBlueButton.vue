<script>
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'lightBlueButton',
})
</script>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'mini',
  },
  fontSize: {
    type: String,
    default: '1.2',
  },
  color: {
    type: String,
    default: '#01e2e6',
  },
  clickIs: {
    type: Boolean,
    default: null,
  },
})
const { fontSize, color, clickIs } = toRefs(props)

const btnStyle = {
  fontSize: `${fontSize.value}rem`,
  color: color.value,
}
</script>

<template>
  <el-button
    :size="props.size"
    round
    :class="{ btnStyleClick: clickIs, btnStyle: !clickIs }"
    :style="btnStyle"
  >
    <slot></slot>
  </el-button>
</template>

<style scoped lang="scss">
.btnStyle {
  background-color: transparent;
  border: 1px solid #01e2e6;
  color: #01e2e6;
  padding: 0.5rem 1.5rem;
}
.btnStyleClick {
  background-color: rgba(#01e2e6, 0.3);
  border: 1px solid #01e2e6;
  color: #01e2e6;
  padding: 0.5rem 1.5rem;
}
</style>
