import http from '@/utils/request'
import type * as Login from './types/login'
const API_PATH = 'http://59.173.239.197:1020'

/** 先获取租户信息 */
export function findTenant(data: Login.LoginRequestTenant) {
  return http.post(`${API_PATH}/system-manager-server/tenant/public/findTenant`, data)
}

/** 登录并返回 Token */
export function loginApi(data: FormData) {
  return http.post(`${API_PATH}/oauth2-server/oauth/token`, data)
}

/** 用户信息 */
export function selectByUserIdOrg(params: { userId: string }) {
  return http.get(`${API_PATH}/system-manager-server/tenant_user/selectByUserIdOrg`, params)
}
