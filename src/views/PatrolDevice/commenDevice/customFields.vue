<template>
  <el-dialog :visible.sync="dialogVisible" width="100%" class="CustomFields" ref="moveMouse" v-drag>
    <div class="titleIs">自定义字段</div>
    <el-tree
      :data="treeDataRec"
      show-checkbox
      node-key="id"
      :default-checked-keys="defaultKey"
      default-expand-all
      @check="onCheck"
    >
    </el-tree>
    <div class="btnClass">
      <el-button @click="sureBtn">确定</el-button>
      <el-button @click="quitBtn">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { useLocalStorage } from '@/utils/hooks/useCommon.js'
import { dialgDrag } from '@/utils/mixin/patrolDevice/dialog'
export default {
  name: 'CustomFields',
  props: ['treeDatas', 'customTipIs'],
  mixins: [dialgDrag],
  //v-drag  cursor: move;
  data() {
    return {
      treeDataRec: this.treeDatas,
      quitClass: false,
      treeCheckData: [],
      checkedKeyIs: [],
      dialogVisible: false,
      defaultKey: [],
      customObj: [
        { tip: '摄像机台账', itemIs: 'cameraTreeCheck' },
        { tip: '机器人台账', itemIs: 'robotTreeCheck' },
        { tip: '无人机台账', itemIs: 'uavTreeCheck' },
        { tip: '声音采集器台账', itemIs: 'soundTreeCheck' },
        { tip: '装置告警确认', itemIs: 'deviceAlarm' },
        { tip: '装置缺陷填报', itemIs: 'defectReport' },
        { tip: '装置消缺安排', itemIs: 'aliArrangement' },
      ],
    }
  },
  methods: {
    sureBtn() {
      const _this = this
      // debugger
      _this.$emit('tofather', _this.quitClass)
      if (_this.treeCheckData.length !== 0) {
        _this.$bus.$emit('tofatherdata', _this.treeCheckData)
        _this.$message({
          message: '设置成功',
          type: 'success',
        })
        const useLocal = useLocalStorage()
        if (this.customObj) {
          this.customObj.forEach((item) => {
            if (this.customTipIs === item.tip) {
              useLocal.setItem(item.itemIs, _this.treeCheckData)
            }
          })
          _this.dialogVisible = false
        }
      } else {
        _this.$message.error('请至少选择一个字段')
      }
    },
    onCheck(data, node) {
      console.log(node)
      this.checkedKeyIs = node.checkedKeys
      this.treeCheckData = node.checkedNodes
    },
    quitBtn() {
      this.dialogVisible = false
    },
    showCustom() {
      this.dialogVisible = true
    },
  },
  mounted() {
    // 会将所有字段置为一样
    const useLocal = useLocalStorage()
    if (this.customObj) {
      this.customObj.forEach((item) => {
        if (this.customTipIs === item.tip) {
          this.treeCheckData = useLocal.getItem(item.itemIs)
          if (this.treeCheckData) {
            this.treeCheckData.forEach((item) => {
              this.defaultKey.push(item.id)
            })
          }
        }
      })
    }

    // console.log('this.this.defaultKey', this.defaultKey)
    const _this = this
    _this.$bus.$emit('tofatherdata', _this.treeCheckData)
    _this.$bus.$on('custIsShow', function (msg) {
      console.log(msg, 'msggggg')
    })
  },
  beforeDestroy() {
    const _this = this
    _this.$bus.$off('custIsShow')
  },
}
</script>
<style scoped lang="scss">
.btnClass {
  float: right;
}
:deep(.el-button) {
  background-color: #07275d;
  border: 0.1rem solid #409eff;
  color: #fff;
  height: 3.5rem;
}
:deep(.el-button:hover) {
  background-color: #409eff;
  border: none;
}
.CustomFields {
  width: 60rem;
  // height: 400rem;
  // background-color: #07275d;
  position: absolute;
  left: 25%;
  top: 13rem;
}
.CustomFields {
  :deep(.el-dialog) {
    width: 128rem;
    height: 0rem;
    margin-top: 0rem !important;
    .el-dialog__header {
      background-color: #0d60ae;
      line-height: 2.4rem;
      padding: 0;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body::before,
    .el-dialog__body::after {
      content: '';
      display: block;
    }
    .el-dialog__body::after {
      clear: both;
    }
    .el-dialog__body {
      background-color: #06255d;
      padding: 0;
      .dialogConfirmTitle {
        text-align: center;
        color: #fff;
        font-size: 2.2rem;
        margin-top: -1rem;
      }
      .dialogConfirm {
        .el-divider {
          background-color: #105eae;
        }
        .el-divider__text.is-center {
          background: #105eae;
          color: #fff;
          height: 3rem;
          line-height: 3rem;
          border-radius: 1.5rem;
        }
        .dialogConfirmLeft {
          width: 49%;
          float: left;
          margin-right: 2%;
          button {
            float: right;
            background: #013aaa;
            border: 0rem;
            padding: 0;
            margin: 0;
            width: 8rem;
            height: 2.4rem;
            color: #fff;
          }
          #confirmButton2 {
            margin-right: 0.2rem;
            background: #155fef;
          }
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.5rem;
          }
        }
        .dialogConfirmRight {
          width: 49%;
          float: left;
          .el-input .el-input__inner {
            color: #fff;
            background: none;
            border: solid 0.1rem #4278c0;
            height: 3rem;
            width: 21rem;
          }
          .el-form-item {
            margin-bottom: 1.8rem;
          }
          .el-radio__label {
            color: #fff;
          }
        }
      }
    }
    .el-dialog__footer {
      background-color: #06255d;
      height: 6rem;
      margin-top: -2rem;
    }
  }
}
.titleIs {
  width: 60rem;
  height: 4rem;
  background-color: #1562ac;
  color: #fff;
  font-size: 1.4rem;
  box-sizing: border-box;
  padding: 1rem;
  cursor: move;
}
</style>
