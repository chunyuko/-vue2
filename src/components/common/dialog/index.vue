<script>
import { defineComponent, defineProps, toRefs, computed } from 'vue'
export default defineComponent({
  name: '',
})
</script>

<script setup>
const emits = defineEmits(['cancel', 'confirm', 'close'])
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  dialogVisible: {
    type: Boolean,
    default: false,
    require: true,
  },
  width: {
    type: String || Number,
    default: '50%',
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const { title, dialogVisible, width } = toRefs(props)
const cancel = () => {
  emits('cancel')
}
const confirm = () => {
  emits('confirm')
}
const close = () => {
  emits('close')
}
</script>

<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      :title="title"
      :destroy-on-close="destroyOnClose"
      :width="width"
      @close="close"
    >
      <!-- slot里面存放的自定义内容 -->
      <slot name="content"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm" :loading="loading">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
