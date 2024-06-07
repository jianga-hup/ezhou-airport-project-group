/** 公用的暴露出去的接口 */
declare interface Monomer {
  name: string
  src?: string
  show: boolean
  isxmq: boolean
  imgwz?: string
  imgwh?: string
  click?: string
  dw?: {
    camRotate: number[]
    camDir: number[]
    camPos: number[]
  }
  position?: number[]
  position4326: number[]
  position3857: number[]
  montype: number
  type: string
}
