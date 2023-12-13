<template>
  <div>
    <el-dialog title="巡视报告导出" :visible.sync="isShowExportSon" class="exportDialog">
      <div v-for="(value, index) in typeExportSon" :key="index" style="margin-top: 1rem">
        <span>{{ value }}</span>
        <div style="margin-top: 0.5rem" class="divFlex">
          <el-checkbox
            v-if="dialogCheckSon[index].isCheckAll === true"
            :indeterminate="dialogCheckSon[index].Indeterminate"
            v-model="dialogCheckSon[index].checkAll"
            class="allCheck"
            @change="handleCheckAllChange($event, index)"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="dialogCheckSon[index].checked"
            class="groupCheck"
            @change="handleCheckedTypeChange($event, index, dialogCheckSon[index].isCheckAll)"
          >
            <el-checkbox
              v-for="(val, ind) in dialogCheckSon[index].checkOption"
              :label="val"
              :key="ind"
              >{{ val }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="colseDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'exportDialog',
  props: ['typeExport', 'isShowExport', 'dialogCheck'],
  emits: ['closedia'],
  data() {
    return {
      //全选框半选中
      // isIndeterminate: false,
      //按点位还是报告分类下载
      typeExportSon: [],
      isShowExportSon: '',
      //导出选项
      dialogCheckSon: [],
    }
  },
  methods: {
    handleCheckAllChange(event, num) {
      //event的值当前这个选框是true或者false
      this.dialogCheckSon[num].checked = event ? this.dialogCheckSon[num].checkOption : []
      this.dialogCheckSon[num].Indeterminate = false
    },
    handleCheckedTypeChange(event, num, flag) {
      if (flag === true) {
        const checkedCount = event.length
        this.dialogCheckSon[num].checkAll =
          checkedCount === this.dialogCheckSon[num].checkOption.length
        this.dialogCheckSon[num].Indeterminate =
          checkedCount > 0 && checkedCount < this.dialogCheckSon[num].checkOption.length
      }
    },
    //将关闭的消息告诉父组件
    colseDialog() {
      const _this = this
      _this.$emit('closedia')
    },
    //按确定键提交信息
    submitDialog() {
      const data = []
      for (let i = 0; i < this.dialogCheckSon.length; i++) {
        data.push(this.dialogCheckSon[i].checked)
      }
      this.$emit('subExport', data)
      this.$emit('closedia')
    },
  },
  mounted() {
    this.typeExportSon = JSON.parse(JSON.stringify(this.typeExport))
    this.isShowExportSon = JSON.parse(JSON.stringify(this.isShowExport))
    this.dialogCheckSon = JSON.parse(JSON.stringify(this.dialogCheck))
  },
  /*
    深度侦听
    语法：
      watch:{
        变量名:{
          handler(newVal,oldVal){

          },
          deep:true,//深度侦听，（对象里面层的值改变了）
          immediate:true,//立即侦听（网页打开handler执行一次）
        }
      } */
  watch: {
    isShowExport: {
      handler(newVal, oldVal) {
        if (newVal === true) {
          for (let i = 0; i < this.dialogCheckSon.length; i++) {
            this.dialogCheckSon[i].checked = []
            this.dialogCheckSon[i].Indeterminate = false
            this.dialogCheckSon[i].checkAll = false
          }
        }
        this.isShowExportSon = newVal
      },
      immediate: false,
    },
    isShowExportSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closedia')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
.divFlex {
  display: flex;
  flex-direction: row;
}
.exportDialog {
  caret-color: rgba(0, 0, 0, 0);
  :deep(.el-dialog) {
    width: 85rem;
    height: 29rem;
    margin-top: 30rem !important;
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
      .allCheck {
        float: left;
        margin-right: 3rem;
        width: 9rem;
        color: #fff;
      }
      .groupCheck {
        width: 65rem;
        label {
          width: 10rem;
          color: #fff;
        }
      }
    }
    .el-dialog__footer {
      background-color: #06255d;
    }
  }
}
</style>
