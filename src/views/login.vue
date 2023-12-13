<script>
import { defineComponent, ref } from 'vue'
import { ROLES, TOKEN } from '@/constant'
import { useSessionStorage } from '@hooks/useCommon'
import { useRouter, useMessage } from '@hooks/useVue'
import { storageSession } from '@/utils/storage'

import { testApi, loginApi, loginUrl } from '@/service/api/views/login'

export default defineComponent({
  name: 'login',
})
</script>

<script setup>
const message = useMessage()
const useSession = useSessionStorage()
const router = useRouter()

const account = ref('super')
const password = ref('Dali123.')
// const account = ref('')
// const password = ref('')
// 登录处理
const loginSubmit = async () => {
  const params = {
    username: account.value,
    password: password.value,
  }
  const res = {}
  res.code = 200
  // const res = await loginApi(params)
  if (parseInt(res.code) === 200) {
    useSession.setItem(TOKEN, '1111')
    useSession.setItem(ROLES, 1)
    useSession.setItem('account', account.value)
    router.replace({ path: '/' })
  } else {
    message.error(res.msg)
  }
}
const testFn = async () => {
  const params = {
    task: 'GetCarInfo',
    stationID: '417DA09F-8A2D-83A3-AC4A-AA94CD126222',
  }
  const res = await testApi(params)
  console.log('@@@', res)
}

const forgetPassword = () => {
  alert('请联系管理员')
}
</script>

<template>
  <div class="login">
    <!-- 登录框 -->
    <div class="loginContainer">
      <h3 class="titleContainer">用户登录</h3>
      <hr class="segLine" />
      <el-form label-position="right">
        <el-form-item class="userContainer">
          <el-input placeholder="请输入用户名" v-model="account" clearable>
            <label slot="prepend" disabled>
              <i class="el-icon-user"></i>
            </label>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" type="password" v-model="password" clearable>
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <div class="setContainer">
          <input type="checkbox" checked />
          <label>记住密码</label>
          <label class="forgetPassword" @click="forgetPassword">忘记密码？</label>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%; background-color: #01dcf8"
            @click="loginSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <el-button type="primary" @click="testFn">测试</el-button> -->
    </div>
  </div>
</template>
<!-- position: relative;
top: 30%;
right: 30%; -->
<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/images/login/登录背景含字.jpg');
  margin: 0;
  background-size: 100% 100%;
  .loginContainer {
    // right: 24rem;
    // top: 35rem;
    // position: absolute;
    // background-color: transparent;
    //
    box-sizing: border-box;
    padding: 2rem 2.5rem;
    background: rgba(137, 207, 240, 0.2);
    border: solid 0.1rem #fff;
    // opacity: 0.5;
    border-radius: 0.6rem;
    width: 40rem;
    position: absolute;
    top: 30%;
    right: 17%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;

    // :deep(.el-form-item) {
    //   margin-top: 1rem;
    // }
    .titleContainer {
      text-align: center;
      color: #707070;
      margin-bottom: 2rem;
      font-size: large;
      color: #fff;
    }
    .segLine {
      margin: 0 0 3rem 0;
      opacity: 0.5;
    }
    .userContainer {
      :deep(.el-input-group__prepend) {
        background-color: #e6e6fa;
      }
    }
    .el-input-group__prepend {
      background-color: skyblue;
    }

    .setContainer {
      margin-bottom: 2rem;
      display: flex;

      .forgetPassword {
        // 父元素设置display:flex配合使用
        margin-left: auto;
      }
      .forgetPassword:hover {
        cursor: pointer;
      }
    }
  }
}
:deep(.el-input__inner) {
  width: 100% !important;
  background-color: #fff !important;
  border: 1px solid #dcdfe6 !important;
  color: #000 !important;
}
</style>
