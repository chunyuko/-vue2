<template>
  <div>
    <el-dialog title="详情" :visible.sync="isShowDetailSon" class="detailDialog">
      <el-form label-position="right" label-width="15rem" :inline="true" :disabled="true">
        <el-form-item v-for="(val, index) in detailData" :key="index" :label="val.formtitle">
          <el-input v-model="val.formcontent"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['isShowDetail', 'detailData'],

  data() {
    return {
      //是否打开弹窗
      isShowDetailSon: '',
    }
  },
  methods: {},
  mounted() {
    this.isShowDetailSon = JSON.parse(JSON.stringify(this.isShowDetail))
  },
  watch: {
    isShowDetail: {
      handler(newVal, oldVal) {
        this.isShowDetailSon = newVal
      },
      immediate: false,
    },
    isShowDetailSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closediaDetail')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.detailDialog {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-dialog) {
    width: 85rem;
    height: 29rem;
    margin-top: 20rem !important;
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
    }
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    background-color: #14357b;
  }
}
</style>
