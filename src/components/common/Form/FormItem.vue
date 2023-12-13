<script>
import { defineComponent, defineProps, toRefs, computed } from 'vue'
export default defineComponent({
  name: '',
})
</script>

<script setup>
const props = defineProps({
  itemOptions: {
    type: Object,
    default: () => {},
  },
  prop: {
    type: String,
  },
})
const { itemOptions, prop } = toRefs(props)
</script>

<template>
  <div>
    <div v-if="itemOptions.type === 'select'">
      <el-form-item :label="itemOptions.label" :prop="prop">
        <el-input v-model="form.name" />
      </el-form-item>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
