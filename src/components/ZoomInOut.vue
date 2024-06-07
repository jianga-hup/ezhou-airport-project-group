<!--
* @description 放大-缩小
* @fileName ZoomInOut.vue
* @author
* @date 2024/05/24 11:03:34
!-->
<template>
  <div class="uno-flex-x-center">
    <div class="zoominout">
      <el-icon @click="onZoominout(1)" class="zoom p-e-a"><CloseBold /></el-icon>
      <el-icon @click="onZoominout(0)" class="out p-e-a"><SemiSelect /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

/** 获取全局对象 */
const global: any = inject('global')
/** 点击放大缩小 */
const onZoominout = (val: number) => {
  const camera = global.$BlackHole3D.Camera.getCamLocate()
  console.log(camera.camPos[2], 'camera')
  if (val > 0) {
    camera.camPos[2] -= outnumber(camera.camPos[2], val)
    global.$BlackHole3D.Camera.setCamLocateTo(camera, 0, 0.1)
  } else {
    camera.camPos[2] += outnumber(camera.camPos[2], val)
    global.$BlackHole3D.Camera.setCamLocateTo(camera, 0, 0.1)
  }
}
/** 放大缩小的度数 */
const outnumber = (val: number, zoom: number) => {
  let num: number = 0
  if (val > 50000) {
    num = Number(val.toFixed(0).substring(0, 4)) - 3
  } else if (val < 50000 && val > 30000) {
    num = Number(val.toFixed(0).substring(0, 4)) + 1
  } else if (val < 30000 && val > 10000) {
    num = Number(val.toFixed(0).substring(0, 4))
  } else if (val < 10000 && val > 1000) {
    num = Number(val.toFixed(0).substring(0, 3))
  } else if (val < 1000 && val > 100) {
    num = Number(val.toFixed(0).substring(0, 2))
  } else if (val < 100 && val > 10) {
    num = Number(val.toFixed(0).substring(0, 1))
  } else if (val < 1 && zoom === 0) {
    num = 0.1
  } else if (val < 10) {
    num = Number((Number(val.toFixed(0)) / 10).toFixed(2))
  }
  return num
}
</script>

<style scoped lang="scss">
.zoominout {
  width: 27px;
  height: 63px;
  background: #0f4889;
  box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  .zoom {
    position: relative;
    width: 100%;
    height: 32px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transform: rotate(45deg);
    &::after {
      content: '';
      position: absolute;
      bottom: 3px;
      left: 60%;
      transform: translateX(-50%);
      width: 23px;
      height: 0px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transform: rotate(-45deg);
    }
  }
  .out {
    width: 100%;
    height: 32px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
