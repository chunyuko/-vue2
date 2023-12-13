<template>
  <div>
    <el-dialog title="详情预览" :visible.sync="isShowPreviewSon" class="previewDialog">
      <el-form label-position="right" label-width="15rem" :inline="true" :disabled="true">
        <el-form-item v-for="(val, index) in previewData" :key="index" :label="val.formtitle">
          <el-input v-model="val.formcontent"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['isShowPreview', 'previewData'],

  data() {
    return {
      //全选框半选中
      isShowPreviewSon: '',
    }
  },
  methods: {},
  mounted() {
    this.isShowPreviewSon = JSON.parse(JSON.stringify(this.isShowPreview))
  },
  watch: {
    isShowPreview: {
      handler(newVal, oldVal) {
        this.isShowPreviewSon = newVal
      },
      immediate: false,
    },
    isShowPreviewSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closediaPreview')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.previewDialog {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-dialog) {
    width: 65rem;
    height: 29rem;
    margin-top: 25rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      height: 2.4rem;
      .el-dialog__title {
        line-height: 1.8rem;
        font-size: 1.8rem;
        color: #fff;
      }
    }
    .el-dialog__headerbtn {
      font-size: 2rem;
      .el-dialog__close,
      .el-icon,
      .el-icon-close {
        color: #fff;
      }
    }
    .el-dialog__body {
      background-color: #06255d;
      color: #fff;
      .el-form-item {
        margin-left: 85px;
      }
    }
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    background-color: #14357b;
  }
}
</style>
