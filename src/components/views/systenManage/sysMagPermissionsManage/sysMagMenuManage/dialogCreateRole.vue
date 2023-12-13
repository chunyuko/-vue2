<template>
  <el-dialog
    title="输入信息"
    :visible.sync="isShowCreateRoleSon"
    :append-to-body="isTrue"
    class="dialogCreateRole"
  >
    <el-form
      :inline="true"
      label-position="right"
      label-width="8rem"
      class="dialogForm"
      :model="form"
      ref="ruleForm"
    >
      <div v-for="(val, index) in form.createRoleForm" :key="index">
        <el-form-item
          :label="val.formtitle"
          :rules="val.rules"
          :prop="'createRoleForm.' + index + '.selected'"
          @change="$forceUpdate()"
        >
          <el-input v-if="val.type === 1" v-model="val.selected"></el-input>
          <el-select
            v-if="val.type === 2"
            v-model="val.selected"
            placeholder="请选择"
            :disabled="disabledBool"
            @change="$forceUpdate()"
            @blur="handleBlur('createRoleForm.' + index + '.selected')"
          >
            <el-option
              v-for="(option_content, index_content) in val.formcontent"
              :key="index_content"
              :label="val.formcontent[index_content]"
              :value="val.value[index_content]"
            ></el-option>
          </el-select>
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
import {
  addRole,
  editRole,
  delRole,
} from '@/views/systemManage/js/sysMagPermissionsManage/sysMagMenuManage'

import { modifyMenu } from '@/views/systemManage/js/sysMagPermissionsManage/sysMagMenuManage'
export default {
  props: ['isShowCreateRole', 'treeData'],
  data() {
    return {
      isTrue: true,
      //判断是新增还是修改
      task: '',
      //角色信息
      row: [],
      //角色拥有的菜单
      MenuList: [],
      // 角色类型
      Type: '',
      disabledBool: false,
      //新增用户弹窗是否开启
      isShowCreateRoleSon: false,
      //新增form表单，type: 1输入框，type: 2下拉框
      form: {
        createRoleForm: [
          {
            type: 1,
            formtitle: '角色名称:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 1,
            formtitle: '描述:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入描述',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 2,
            formtitle: '所属身份:',
            formcontent: ['系统管理员', '审计管理员', '业务操作员'],
            value: ['1', '2', '3'],
            selected: '',
            rules: [
              {
                required: true,
                message: '请选择所属身份',
                trigger: 'change',
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
      _this.$emit('closeCreatedia')
    },
    //弹窗提交按钮
    async submitDialog() {
      const _this = this
      const selected = []
      for (let i = 0; i < this.form.createRoleForm.length; i++) {
        if (!this.form.createRoleForm[i].selected) {
          this.$message.error('请确保带星号的选项均已输入信息')
          return
        }
        selected.push(this.form.createRoleForm[i].selected)
      }
      if (this.task === 'AddIdentity') {
        const res = await addRole(selected)
        if (res === 'OK') {
          this.$message.success('新增角色成功')
          //操作成功刷新当前页
          this.$emit('tableChange')
        } else {
          this.$message.error('新增角色失败')
        }
      }
      if (this.task === 'ModifyIdentity') {
        selected.push(this.row.id)
        const res = await editRole(selected)
        if (res === 'OK') {
          this.$message.success('修改角色成功')
          //切换角色时更改菜单权限（将禁用去除）
          const MenuList = this.row.MenuList.split(',')
          const typeMenuList = []
          for (let i = 0; i < this.treeData.length - 1; i++) {
            // selected[2]修改后的userType
            if (this.treeData[i].UserType === selected[2]) {
              typeMenuList.push(this.treeData[i].id)
            }
          }
          const sameArr = typeMenuList.filter((item) => MenuList.indexOf(item) !== -1)
          modifyMenu(this.row.id, sameArr)
          //操作成功刷新当前页
          this.$emit('tableChange')
        } else {
          this.$message.error('修改角色失败')
        }
      }

      _this.$emit('closeCreatedia')
    },
    //下拉框失焦验证
    handleBlur(data) {
      const _this = this
      _this.$refs.ruleForm.validateField(data)
    },
    //新建角色触发的操作
    createRoleSon() {
      // this.disabledBool = false
      //新增时将task设置成AddIdentity
      this.task = 'AddIdentity'
      this.form.createRoleForm[0].selected = ''
      this.form.createRoleForm[1].selected = ''
      this.form.createRoleForm[2].selected = ''
    },
    //修改添加的信息
    editMenuDataSon(row) {
      // this.disabledBool = true
      //新增时将task设置成ModifyIdentity
      this.task = 'ModifyIdentity'
      this.row = row
      this.form.createRoleForm[0].selected = row.IdentityName
      this.form.createRoleForm[1].selected = row.IdentityDesc
      this.form.createRoleForm[2].selected = row.Type
    },
  },
  mounted() {
    this.isShowCreateRoleSon = JSON.parse(JSON.stringify(this.isShowCreateRole))
  },
  created() {
    this.$bus.$on('delRoleData', async (id) => {
      const res = await delRole(id)
      if (res === 'OK') {
        this.$message.success('删除角色成功')
        //操作成功刷新当前页
        this.$emit('delTableData')
      } else {
        this.$message.error('删除角色失败')
      }
    })
  },
  destroyed() {
    this.$bus.$off('delRoleData')
  },
  watch: {
    isShowCreateRole: {
      handler(newVal, oldVal) {
        const _this = this
        this.isShowCreateRoleSon = newVal
        //清除验证消息
        if (this.isShowCreateRole) {
          this.$nextTick(() => {
            _this.$refs.ruleForm.clearValidate()
          })
        }
      },
      immediate: false,
    },
    isShowCreateRoleSon: {
      handler(newVal, oldVal) {
        if (newVal === false) {
          const _this = this
          _this.$emit('closeCreatedia')
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
        width: 28rem;
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
