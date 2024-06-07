import { ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
import { getItem, removeItem, setItem, removeAll } from '@/utils/cache/cookies'
import { loginApi } from '@/api/login'
import { ElMessage } from 'element-plus'
// import { resetRouter } from "@/router"

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getItem('token') || '')
  const user = ref<string>(getItem('username'))
  const info = ref<{ userName: string; [key: string]: any }>(getItem('info'))

  /** 登录 */
  const login = async (obj: FormData) => {
    const { data, code, message } = await loginApi(obj)
    if (code === 200) {
      setItem('token', data.token)
      setItem('username', data.info.userName)
      setItem('info', data.info)
      token.value = data.token
      user.value = data.info.userName
      info.value = data.info
      return true
    } else {
      ElMessage({
        message: message,
        type: 'error'
      })
      return false
    }
  }

  /** 登出 */
  const logout = () => {
    removeItem('token')
    removeItem('info')
    removeAll()
    token.value = ''
    // resetRouter()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeItem('token')
    removeItem('info')
    removeAll()
    token.value = ''
  }
  return { token, user, info, login, logout, resetToken }
})
/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
