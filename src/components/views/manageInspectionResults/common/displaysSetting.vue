<template>
  <div>
    <el-dialog title="自定义字段" :visible.sync="isShowDisSettingSon" class="disSettingDialog">
      <div>
        <el-tree
          :data="settingData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="buttonClass" @click="colseDialog">取 消</el-button>
        <el-button class="buttonClass" type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DisSettingDialog',
  props: ['isShowDisSetting', 'settingData'],
  emits: ['closedia2'],
  data() {
    return {
      //全选框半选中
      isIndeterminate: false,
      isShowDisSettingSon: '',
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    colseDialog() {
      const _this = this
      _this.$emit('closedia2')
    },
    submitDialog() {
      const _this = this
      const checkedData = this.$refs.tree.getCheckedKeys()
      _this.$emit('closedia2')
      _this.$emit('submitDia', checkedData)
    },
  },
  mounted() {
    this.isShowDisSettingSon = this.isShowDisSetting
  },
  watch: {
    isShowDisSetting: {
      handler(newVal, oldVal) {
        this.isShowDisSettingSon = newVal
      },
      immediate: false,
    },
    isShowDisSettingSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closedia2')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.disSettingDialog {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-dialog) {
    width: 75rem;
    margin-top: 22rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 1.8rem;
      height: 1.8rem;
      .el-dialog__title {
        line-height: 1.8rem;
        font-size: 1.8rem;
        color: #fff;
      }
    }
    .el-dialog__body {
      background-color: #06255d;
      color: #fff;
      padding: 2.5rem 2rem;
      .allCheck {
        float: left;
        margin-right: 30px;
        width: 90px;
        color: #fff;
      }
      .groupCheck label {
        width: 90px;
        color: #fff;
      }
      .el-tree-node__content {
        background-color: #06255d;
      }
    }
    .el-dialog__footer {
      background-color: #06255d;
      /*  .buttonClass {
        background-color: #07275d;
        border: 0.1rem solid #409eff;
        color: #fff;
        height: 3.5rem;
      }
      .buttonClass:hover {
        background-color: #409eff;
        border: none;
      } */
    }
  }
}
</style>
