<!--
* @description 登录页面
* @fileName index.vue
* @author
* @date 2024/01/25 18:52:33
!-->
<template>
  <div class="login uno-wh-full">
    <div class="login-content">
      <div class="content-title text-center mb101px">{{ title }}</div>
      <el-form ref="ruleFormRef" :model="form" status-icon :rules="rules" class="demo-ruleForm">
        <div class="pl53px content-form">
          <el-form-item prop="username">
            <div class="flex items-center form-item">
              <img src="@/assets/images/login/login_user.png" class="wihi-40 mr20px" />
              <el-input v-model="form.username" autocomplete="off" placeholder="请输入账号名" style="width: 514px" />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="flex items-center form-item mt30px">
              <img src="@/assets/images/login/login_password.png" class="wihi-40 mr20px" />
              <el-input
                v-model="form.password"
                type="password"
                show-password
                autocomplete="off"
                placeholder="请输入密码"
                style="width: 514px"
              />
            </div>
          </el-form-item>
          <el-form-item prop="checked" label-width="0px">
            <el-checkbox v-model="form.checked" class="pl60px">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="pl60px mt81px">
            <el-button class="btn" :loading="loading" type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { rsaPublicData } from '@/utils/passWord'
import { findTenant } from '@/api/login'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const title: string = import.meta.env.VITE_APP_TITLE
const form = reactive({
  username: '',
  password: '',
  checked: false
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof form>>({
  username: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }]
})
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  formEl.validate(async (valid) => {
    if (valid) {
      const userInfo = {
        username: form.username,
        password: rsaPublicData(form.password)
      }
      if (form.checked == true) {
        setCookie(form.username, form.password, 7)
      } else {
        setCookie('', '', -1)
      }
      const { code, data } = await findTenant(userInfo)
      if (code === 200) {
        const userToken = {
          ...userInfo,
          grant_type: 'password',
          ...data[0]
        }
        const formdata = new FormData()
        for (const key in userToken) {
          formdata.append(key, userToken[key] as Blob)
        }
        userStore
          .login(formdata)
          .then((res) => {
            if (res) {
              router.push({ path: '/' })
            }
            loading.value = false
          })
          .catch(() => {
            loading.value = false
          })
          .finally(() => {
            loading.value = false
          })
      }
    } else {
      loading.value = false
      return false
    }
  })
}
/** 检验是否记住密码账号 */
const getCookie = () => {
  if (document.cookie.length > 0) {
    form.checked = true
    const arr: string[] = document.cookie.split('; ') //cookie存储格式问题，;后面有一个空格
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].split('=')
      if (arr2[0] == 'bzhusername') {
        form.username = arr2[1]
      }
      if (arr2[0] == 'bhzpassword') {
        form.password = arr2[1]
      }
    }
  }
}
/** 记住密码账号 */
const setCookie = (c_name: string, c_pwd: string, exdays: number) => {
  const exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
  window.document.cookie = 'bzhusername' + '=' + c_name + ';path=/;expires=' + exdate.toUTCString()
  window.document.cookie = 'bhzpassword' + '=' + c_pwd + ';path=/;expires=' + exdate.toUTCString()
}

// 初始化加载
onMounted(() => {
  getCookie()
})
</script>

<style scoped lang="scss">
.login {
  background: url('@/assets/images/login/login_content.png');
  background-size: 100% 100%;
  .login-content {
    position: absolute;
    top: 271px;
    right: 181px;
    width: 663px;
    .content-title {
      font-size: 48px;
      font-family: YouSheBiaoTiHei;
      color: #a9d7ff;
      background: linear-gradient(to right, #a9d7ff, #a9d7ff);
      line-height: 62px;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .content-form {
      .form-item {
        :deep(.el-input__wrapper) {
          background-color: transparent;
          border-radius: 4px;
          border: 1px solid rgba(206, 237, 255, 0.33);
          box-shadow: none;
          .el-input__inner {
            height: 64px;
            font-size: 18px;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 400;
            color: #9edbff;
            &::placeholder {
              font-size: 18px;
              font-family:
                PingFangSC,
                PingFang SC;
              font-weight: 400;
              color: #9edbff;
              line-height: 25px;
            }
          }
          .el-input__icon {
            font-size: 18px;
          }
        }
      }
      :deep(.el-checkbox) {
        .el-checkbox__inner {
          margin-top: 3px;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid rgba(206, 237, 255, 0.33);
          background: transparent;
          &::after {
            height: 14px;
            left: 7px;
            width: 6px;
            border-color: #9edbff;
          }
        }
        .el-checkbox__label {
          font-size: 18px;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 400;
          color: #9edbff;
        }
      }
      .el-form-item__content {
        .el-form-item__error {
          padding-left: calc(40px + 20px);
          font-size: 16px;
        }
      }
      .btn {
        width: 514px;
        height: 64px;
        background: #4cafff;
        border-radius: 4px;
        font-size: 24px;
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 500;
        color: #0a1422;
      }
    }
  }
}
</style>
