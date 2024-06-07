/** 所有 api 接口的响应数据都应该准守该格式 */
// * 请求响应参数(不包含data)
interface Result {
  code: number
  message: string
  success?: boolean
}

// * 请求响应参数(包含data)
declare interface ResultData<T = any> extends Result {
  /** 第三方的接口 */
  rows?: any
  total?: number
  data: T
}
