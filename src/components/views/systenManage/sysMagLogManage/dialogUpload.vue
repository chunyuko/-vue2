<template>
  <div>
    <el-dialog title="导入日志" :visible.sync="isShowUploadSon" :append-to-body="isTrue">
      <div>你好</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['isShowUpload'],
  data() {
    return {
      isTrue: true,
      //导入弹窗是否开启
      isShowUploadSon: false,
    }
  },
  watch: {
    isShowUpload: {
      handler(newVal, oldVal) {
        const _this = this
        this.isShowUploadSon = newVal
      },
      immediate: false,
    },
    isShowUploadSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closeUpload')
        }
      },
      immediate: false,
    },
  },
  mounted() {
    this.isShowUploadSon = JSON.parse(JSON.stringify(this.isShowUpload))
  },
}
</script>

<style scoped lang="scss"></style>
