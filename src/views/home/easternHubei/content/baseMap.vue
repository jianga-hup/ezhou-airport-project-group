<!--
* @description 二维底图->单体工程->跳转
* @fileName baseMap.vue
* @author
* @date 2024/03/13 10:46:33
!-->
<template>
  <div class="baseMap t-l-c">
    <div class="lane-mask-view">
      <!-- 拖拽遮罩，间隔1000米，mileage当前初始桩号里程 -->
      <div
        class="lane-mask absolute top-0px bottom-0px"
        :style="{ left: mileage + 'px' }"
        :key="new Date().getTime()"
        v-if="isshow"
      />
      <!-- v-if="isRoaming && !isAll"2915 39868 13.68 = 1-->
    </div>
    <ul class="base-ul">
      <li class="base-li" v-for="(e, i) in monome" :key="i" :style="e.imgwz">
        <img :src="setimg(e.src as string)" class="img" :style="e.imgwh" />
        <div v-if="e.click" class="cursor-pointer absolute p-e-a" @click="getclcki(e)" :style="e.click" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import BlackBim from '@/utils/blackHole'
import { viteImages } from '@/utils'
import { monomer } from '@/utils/monomer'
import { inject, ref, watch } from 'vue'
import { masktStore } from '@/store/modules/mask'
const mask = masktStore()
/** 获取全局对象 */
const global: any = inject('global')
const monome = ref<Monomer[]>([])
const mileage = ref(0)
const isshow = ref(false)
monome.value = monomer.filter((m) => m.show)

const setimg = (img: string) => {
  return viteImages(`@/assets/images/home/point/${img}.png`)
}

/** 点击跳转场景定位 */
const getclcki = (m: Monomer) => {
  if (m?.position3857) {
    const pos: number[] = m.position3857
    let p: number[] = []
    if (m?.dw && typeof m.dw !== 'undefined') {
      BlackBim.setCamLocateTo(global, m.dw.camPos, m.dw.camRotate, m.dw.camDir)
    } else {
      p = [pos[0] - 400, pos[1] + 500, 570]
      BlackBim.setCamLocateTo(global, p)
    }
  }
}

/** 获取漫游点 */
const getroam = () => {
  isshow.value = mask.state.show
  if (isshow.value && mask.state.inx !== 0) {
    const m = mileage.value + parseFloat(parseFloat(String(mask.state.ml)).toFixed(2))
    mileage.value = m
  } else {
    mileage.value = 0
  }
}

watch(
  () => mask.state,
  () => {
    getroam()
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.baseMap {
  position: absolute;
  bottom: 30px;
  width: 1360px;
  height: 187px;
  background: url('@/assets/images/home/point/home_bootom.png');
  background-size: 100% 100%;
  z-index: 2;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  ul,
  li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  .base-ul {
    position: relative;
    width: 100%;
    height: 100%;
    .base-li {
      position: absolute;
    }
  }
  .lane-mask-view {
    position: absolute;
    top: -20px;
    left: 50px;
    .lane-mask {
      width: 59px;
      height: 220px;
      border: 2px solid #34fdf3;
      background: linear-gradient(
        90deg,
        rgba(0, 140, 255, 0.5) 0%,
        rgba(11, 45, 73, 0.1) 48%,
        rgba(0, 140, 255, 0.5) 99%
      );
      z-index: 9;
    }
  }
}
</style>
