<template>
  <el-dialog
    title="容量设置"
    :visible.sync="isShowSettingVolumeSon"
    :append-to-body="isTrue"
    class="dialogSettingVolume"
  >
    <el-form
      :inline="true"
      label-position="right"
      label-width="15rem"
      class="dialogForm"
      :model="form"
      ref="ruleForm"
    >
      <div v-for="(val, index) in form.SettingVolumeForm" :key="index">
        <el-form-item
          :label="val.formtitle"
          :rules="val.rules"
          :prop="'SettingVolumeForm.' + index + '.selected'"
        >
          <el-input v-if="val.type === 1" v-model="val.selected" class="appendSelect">
            <template slot="append" v-if="val.formtitle === '最大容量:'">
              <el-select v-model="memoryUnits">
                <el-option label="KB" value="0"> </el-option>
                <el-option label="MB" value="1"> </el-option>
                <el-option label="GB" value="2"> </el-option>
                <el-option label="TB" value="3"> </el-option> </el-select
            ></template>
            <template slot="append" v-if="val.formtitle === '剩余容量百分比警告:'"> % </template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="colseDialog">取 消</el-button>
      <el-button type="primary" @click="submitDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getProperty, updatesys } from '@/views/systemManage/js/sysMagLogManage'
export default {
  props: ['isShowSettingVolume'],
  data() {
    return {
      //内存单位
      memoryUnits: '1',
      isTrue: true,
      //新增用户弹窗是否开启
      isShowSettingVolumeSon: false,
      //新增form表单，type: 1输入框，type: 2下拉框
      form: {
        SettingVolumeForm: [
          {
            type: 1,
            formtitle: '最大容量:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入最大容量',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 1,
            formtitle: '剩余容量百分比警告:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入剩余容量百分比警告',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    //弹窗取消按钮
    colseDialog() {
      const _this = this
      _this.$emit('closeSettingVolume')
    },
    //弹窗提交按钮
    async submitDialog() {
      const _this = this
      const res = await updatesys(
        this.form.SettingVolumeForm[0].selected,
        this.memoryUnits,
        this.form.SettingVolumeForm[1].selected
      )
      if (res === 'OK') {
        this.$message.success('设置成功！')
        _this.$emit('closeSettingVolume')
      } else {
        this.$message.error('设置失败！')
      }
    },
    //下拉框失焦验证
    handleBlur(data) {
      const _this = this
      _this.$refs.ruleForm.validateField(data)
    },
  },
  mounted() {
    this.isShowSettingVolumeSon = JSON.parse(JSON.stringify(this.isShowSettingVolume))
  },
  watch: {
    isShowSettingVolume: {
      handler(newVal, oldVal) {
        const _this = this
        this.isShowSettingVolumeSon = newVal
        //重置表单和清除验证消息
        if (this.isShowSettingVolume) {
          this.$nextTick(async () => {
            _this.$refs.ruleForm.resetFields()
            const res = await getProperty()
            if (res) {
              this.form.SettingVolumeForm[0].selected = res.LogHDDCapacity
              this.memoryUnits = res.LogHDDCapacityUnit
              this.form.SettingVolumeForm[1].selected = res.LogHDDAlarm
            }

            console.log(res)
          })
        }
      },
      immediate: false,
    },
    isShowSettingVolumeSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closeSettingVolume')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 51rem;
  height: 27rem;
  margin-top: 35rem !important;
  .el-dialog__headerbtn {
    font-size: 2.8rem;
    .el-dialog__close,
    .el-icon,
    .el-icon-close {
      color: #fff;
    }
  }
  .el-dialog__header {
    background-color: #0d60ae;
    line-height: 2.4rem;
    .el-dialog__title {
      color: #fff;
      vertical-align: top;
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
    .dialogForm {
      text-align: center;
      .el-form-item__label :before {
        content: '* ';
        color: red;
      }
      .el-input .el-input__inner {
        color: #fff;
        background: none;
        border: solid 0.1rem #4278c0;
        height: 3rem;
        width: 16rem;
      }
      .appendSelect {
        .el-input-group__append {
          background: #06255d;
          border: solid 0.1rem #4278c0;
          border-left: none;
          color: #fff;
          width: 70px;
          padding: 0;
          .el-select {
            width: 70px;

            .el-input--suffix {
              width: 70px;
              .el-input__inner {
                width: 70px;
                border: none;
              }
              .el-input__icon {
                line-height: 30px;
              }
            }
          }
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
</style>
