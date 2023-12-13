<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'dataToolsButtonSets',
})
</script>

<script setup>
const props = defineProps({
  /**
   * 按钮数组
   *[
   *  {
   *    label: String,// 按钮名称
   *    onClick: Function // 按钮事件
   *    notActive: Boolean // 是否不能高亮(选填，默认为可以高亮)
   *  }
   *]
   */
  btnSets: {
    type: Array,
    default() {
      return []
    },
  },
})

const isActive = ref(0)
const handleClick = (index, fn, notActice) => {
  if (!notActice) {
    isActive.value = index
  }
  fn()
}
</script>

<template>
  <div class="dataToolsButtonSets">
    <div
      class="btnContainer"
      v-for="(item, index) in btnSets"
      :key="index"
      :class="{ active: isActive === index }"
      @click="handleClick(index, item.onClick, item.notActive ? item.notActive : false)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.dataToolsButtonSets {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  .btnContainer {
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    background-color: #0c347b;
    border-radius: 0.2rem;
    border: solid 0.1rem #0b3d7b;
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #c7c7c7;

    &.active {
      color: #fff;
      border: solid 0.1rem #54ccff;
      background-color: #256df7;
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
}
</style>
