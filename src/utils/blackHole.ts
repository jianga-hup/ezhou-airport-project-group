/** 黑洞场景交互方法 */

/**
 * 定位-跳转
 * @param {any} global // 黑洞的api函数
 * @param {number[]} pos // 跳转的经纬度
 * @param {number[]} camRotate // 高度
 * @param {number[]} camDir // 视角
 * @param {number} time // 视角移动的时间
 */
const setCamLocateTo = (
  global: any,
  pos: number[],
  camRotate: number[] = [0.16731797267092677, -0.4044192344994686, -0.8308394475125602, 0.3437376779539577],
  camDir: number[] = [0.5560570011191978, -0.5569879238982458, -0.6168995575763097],
  time: number = 1.5
) => {
  global.$BlackHole3D.Camera.setCamLocateTo(
    {
      camPos: pos,
      camRotate,
      camDir
    },
    0,
    time
  )
}

export default { setCamLocateTo }
