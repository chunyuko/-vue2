<template>
  <el-dialog title="修改密码" :visible.sync="isEditPasswordSon" :append-to-body="isTrue">
    <el-form :inline="true" label-position="right" label-width="8rem">
      <el-form-item label="新密码：">
        <el-input v-model="newPassword" show-password clearable></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="colseDialog">取 消</el-button>
      <el-button type="primary" @click="submitDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editPassword } from '@/views/systemManage/js/sysMagPermissionsManage/sysMagPeopleManage'
export default {
  props: ['isEditPassword'],
  data() {
    return {
      isTrue: true,
      //新增用户弹窗是否开启
      isEditPasswordSon: false,
      //新修改的密码
      newPassword: '',
      //table点击修改后储存id,提交时用
      id: '',
    }
  },
  methods: {
    //弹窗取消按钮
    colseDialog() {
      const _this = this
      _this.$emit('closePassworddia')
    },
    //弹窗提交按钮
    async submitDialog() {
      const _this = this
      if (this.newPassword !== '') {
        const res = await editPassword(this.id, this.newPassword)
        if (res === 'OK') {
          this.$message.success('修改密码成功')
        } else {
          this.$message.error('修改密码失败')
        }
        _this.$emit('closePassworddia')
      } else {
        this.$message.error('请输入新密码')
      }
    },
    editPasswordSon(id) {
      this.id = id
      this.newPassword = ''
    },
  },
  mounted() {
    this.isEditPasswordSon = JSON.parse(JSON.stringify(this.isEditPassword))
  },
  watch: {
    isEditPassword: {
      handler(newVal, oldVal) {
        const _this = this
        this.isEditPasswordSon = newVal
      },
      immediate: false,
    },
    isEditPasswordSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closePassworddia')
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
  height: 20rem;
  margin-top: 40rem !important;
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
    text-align: center;
  }
  .el-dialog__footer {
    background-color: #06255d;
    height: 6rem;
    margin-top: -2rem;
  }
}
</style>
