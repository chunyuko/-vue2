<template>
  <el-dialog
    title="输入信息"
    :visible.sync="isShowCreateUserSon"
    :append-to-body="isTrue"
    class="dialogCreateUser"
  >
    <el-form
      :inline="true"
      label-position="right"
      label-width="8rem"
      class="dialogForm"
      :model="form"
      ref="ruleForm"
    >
      <div v-for="(val, index) in form.createUserForm" :key="index">
        <el-form-item
          :label="val.formtitle"
          :rules="val.rules"
          :prop="'createUserForm.' + index + '.selected'"
        >
          <el-input v-if="val.type === 1" v-model="val.selected" clearable></el-input>
          <el-select
            v-if="val.type === 2"
            v-model="val.selected"
            placeholder="请选择"
            filterable
            @blur="handleBlur('createUserForm.' + index + '.selected')"
          >
            <el-option
              v-for="(option_content, index_content) in val.formcontent"
              :key="index_content"
              :label="val.formcontent[index_content]"
              :value="val.value[index_content]"
            ></el-option>
          </el-select>
          <el-input v-if="val.type === 3" v-model="val.selected" show-password clearable></el-input>
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
  addUser,
  editUser,
  delUser,
  getDepart,
  getRoleInfo,
} from '@/views/systemManage/js/sysMagPermissionsManage/sysMagPeopleManage'
export default {
  props: ['isShowCreateUser'],
  data() {
    return {
      isTrue: true,
      //判断是新增还是修改
      task: '',
      // 表格操作中的id
      id: '',
      //当前选中的运维班id
      OperatorID: '',
      //新增用户弹窗是否开启
      isShowCreateUserSon: false,
      //密码input选项在新增时可以用，修改时删除
      passwordInput: {
        type: 3,
        formtitle: '密码:',
        selected: '',
        rules: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
      //存储部门id和名称
      departData: [],
      //存储角色id和名称
      roleData: [],
      //新增form表单，type: 1输入框，type: 2下拉框，type: 3密码拉框
      form: {
        createUserForm: [
          {
            type: 1,
            formtitle: '用户名:',
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
            formtitle: '手机号:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入手机号',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 1,
            formtitle: '电子邮箱:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入电子邮箱',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 2,
            formtitle: '部门:',
            formcontent: [],
            value: [],
            selected: '',
            rules: [
              {
                required: true,
                message: '请选择所属部门',
                trigger: 'change',
              },
            ],
          },
          {
            type: 1,
            formtitle: '岗位:',
            selected: '',
            rules: [
              {
                required: true,
                message: '请输入岗位',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 2,
            formtitle: '所属角色:',
            formcontent: [],
            value: [],
            selected: '',
            rules: [
              {
                required: true,
                message: '请选择所属角色',
                trigger: 'change',
              },
            ],
          },
          {
            type: 2,
            formtitle: '用户类型:',
            formcontent: ['短期用户', '长期用户'],
            value: ['0', '1'],
            selected: '',
            rules: [
              {
                required: true,
                message: '请选择用户类型',
                trigger: 'change',
              },
            ],
          },
          {
            type: 2,
            formtitle: '用户状态:',
            formcontent: ['启用', '禁用'],
            value: ['0', '1'],
            selected: '',
            rules: [],
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
    submitDialog() {
      const _this = this
      const selected = []
      for (let i = 0; i < this.form.createUserForm.length; i++) {
        selected.push(this.form.createUserForm[i].selected)
      }
      //判断带星号的选项是否填写
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.task === 'AddUser') {
            const res = await addUser(selected, this.OperatorID)
            if (res === 'OK') {
              this.$message.success('新增用户成功')
              //操作成功刷新当前页
              this.$emit('tableChange')
            } else {
              this.$message.error('新增用户失败')
            }
          }
          if (this.task === 'ModifyUser') {
            selected.push(this.id)
            const res = await editUser(selected)
            if (res === 'OK') {
              this.$message.success('修改用户成功')
              //操作成功刷新当前页
              this.$emit('tableChange')
            } else {
              this.$message.error('修改用户失败')
            }
          }

          _this.$emit('closeCreatedia')
        } else {
          this.$message.error('请确保带星号的选项均已输入信息')
        }
      })
    },
    //下拉框失焦验证
    handleBlur(data) {
      const _this = this
      _this.$refs.ruleForm.validateField(data)
    },
    //新增触发的相关操作
    addUser(OperatorID) {
      this.task = 'AddUser'
      this.OperatorID = OperatorID
      if (this.form.createUserForm[1].formtitle !== '密码:') {
        this.form.createUserForm.splice(1, 0, this.passwordInput)
      }
      for (let i = 0; i < this.form.createUserForm.length; i++) {
        this.form.createUserForm[i].selected = ''
      }
    },
    //修改触发的相关操作
    editUser(row) {
      this.task = 'ModifyUser'
      if (this.form.createUserForm[1].formtitle === '密码:') {
        this.form.createUserForm.splice(1, 1)
      }
      this.id = row.id
      this.form.createUserForm[0].selected = row.userName
      this.form.createUserForm[1].selected = row.telphone
      this.form.createUserForm[2].selected = row.email
      //所属部门（初始化时才获取到下拉框内容，所以这样赋值selected）
      for (let i = 0; i < this.form.createUserForm[3].formcontent.length; i++) {
        if (this.form.createUserForm[3].formcontent[i] === row.departmentName) {
          this.form.createUserForm[3].selected = this.form.createUserForm[3].value[i]
        }
      }

      this.form.createUserForm[4].selected = row.job
      //所属角色（初始化时才获取到下拉框内容，所以这样赋值selected）
      for (let i = 0; i < this.form.createUserForm[5].formcontent.length; i++) {
        if (this.form.createUserForm[5].formcontent[i] === row.identity) {
          this.form.createUserForm[5].selected = this.form.createUserForm[5].value[i]
        }
      }
      // 用户类型和用户状态目前定死
      //用户类型
      switch (row.type) {
        case '短期用户':
          this.form.createUserForm[6].selected = '0'

          break
        case '长期用户':
          this.form.createUserForm[6].selected = '1'

          break
        default:
      }
      //用户状态
      switch (row.disable) {
        case '启用':
          this.form.createUserForm[7].selected = '0'
          break
        case '禁用':
          this.form.createUserForm[7].selected = '1'
          break
        default:
      }
    },
  },
  async mounted() {
    this.isShowCreateUserSon = JSON.parse(JSON.stringify(this.isShowCreateUser))
    this.departData = await getDepart()
    this.roleData = await getRoleInfo()
    // this.$emit('ReturnData', this.departData, this.roleData)
    //初始化时就将部门和所属角色下拉框内容写好
    for (let i = 0; i < this.departData.length; i++) {
      this.form.createUserForm[3].formcontent.push(this.departData[i].departmentName)
      this.form.createUserForm[3].value.push(this.departData[i].id)
    }
    for (let i = 0; i < this.roleData.length; i++) {
      this.form.createUserForm[5].formcontent.push(this.roleData[i].IdentityName)
      this.form.createUserForm[5].value.push(this.roleData[i].id)
    }
  },
  created() {
    this.$bus.$on('delUserData', async (id) => {
      const res = await delUser(id)
      if (res === 'OK') {
        this.$message.success('删除用户成功')
        //操作成功刷新当前页
        this.$emit('delTableData')
      } else {
        this.$message.error('删除用户失败')
      }
    })
  },
  destroyed() {
    this.$bus.$off('delUserData')
  },
  watch: {
    isShowCreateUser: {
      handler(newVal, oldVal) {
        const _this = this
        this.isShowCreateUserSon = newVal
        //清除验证消息
        if (this.isShowCreateUser) {
          this.$nextTick(() => {
            _this.$refs.ruleForm.clearValidate()
          })
        }
      },
      immediate: false,
    },
    isShowCreateUserSon: {
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
  height: 65rem;
  margin-top: 12rem !important;
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
