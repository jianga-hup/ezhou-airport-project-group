import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { getItem } from '@/utils/cache/cookies'
import { ResultEnum } from '@/utils/cache/httpEnums'
import { interactiveStore } from '@/store/modules/interactive'

const interactive = interactiveStore()

/** 不需要token的接口 */
const noToken: string[] = ['/oauth2-server/oauth', '/tenant/public/findTenant']

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  useUserStore().logout()
  location.reload()
}

const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  timeout: 60000
})

/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    const active = interactive.state.active
    const token = active === 'edgs' ? getItem('token') : getItem(active + 'token')
    let flag: boolean = true
    noToken.forEach((item) => {
      if (config.url && config.url.indexOf(item) != -1) {
        flag = false
      }
    })
    if (flag) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    // 二进制数据则直接返回
    const responseType = response.request?.responseType
    if (responseType === 'blob' || responseType === 'arraybuffer') return data
    // * 登陆失效（code == 203）登录失效不会有确认框
    if (data.code === 401 || data.code === 203) {
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      logout()
      return Promise.reject(data)
    }

    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
  get<T = any>(url: string, params?: object | undefined, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: object | undefined, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.delete(url, { data, ...config })
  }
}

export default http
