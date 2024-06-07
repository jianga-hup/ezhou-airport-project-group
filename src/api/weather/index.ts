import http from '@/utils/request'

const wetherUrl = `/sg/weather`

/** 天气列表 */
export function getWeatherBySectionWay(data: { longitude: number; latitude: number; districtId: number }) {
  return http.post(`${wetherUrl}/prod/hbjttz/roadnetwork/new/weather/getWeatherBySectionWay`, data)
}

/** 天气预警 */
export function getCmaWeatherAlarmInfo(data: { levelCode: string; adCodes: string }) {
  return http.post(`${wetherUrl}/prod/hbjttz/roadnetwork/new/weather/getCmaWeatherAlarmInfo`, data)
}
