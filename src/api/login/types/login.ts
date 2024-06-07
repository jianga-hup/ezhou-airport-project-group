export interface LoginRequestTenant {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string | number
}

// export interface LoginRequestToken {
//   /** 用户名 */
//   username: string | Blob
//   /** 密码 */
//   password: string | number | Blob
//   /** 类型 */
//   grant_type: string | Blob
//   /** 类型 */
//   client_secret: string | Blob
//   /** 项目类型 */
//   client_name: string | Blob
//   /** 租户id */
//   client_id: string | Blob
// }

/** 租户接口返回的信息 */
// interface findTenant {
//   client_id: string
//   client_name: string
//   client_secret: string
// }

/** 用户信息 */
// interface tokenInfo {
//   userName?: string
//   userId?: string
//   [propName: string]: any
// }

// 勤快一点你可以定义，我比较懒，返回数据我就约束了
// export type LoginCodeResponseData = ApiResponseData<findTenant[]>

// export type LoginResponseData = ApiResponseData<{ token: string; info: tokenInfo }>
