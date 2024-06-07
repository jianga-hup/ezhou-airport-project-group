<!--
* @description 坐标轴
* @fileName coordinate.vue
* @author
* @date 2024/03/27 00:30:57
!-->
<template>
  <div class="coordinate">
    <div class="axis" v-if="axis.length" />
    <template v-if="axis.length">
      <div class="axis-x">{{ axis[0].toFixed(3) }}</div>
      <div class="axis-y">{{ axis[1].toFixed(3) }}</div>
      <div class="axis-z">{{ axis[2].toFixed(3) }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { wgs84tobd09 } from '@/utils/bdToWgs84'
import { ref, watch, inject } from 'vue'
const axis = ref<number[]>([])
/** 获取全局对象 */
const global: any = inject('global')
interface Props {
  elemPos: number[]
}
const props = withDefaults(defineProps<Props>(), {})
watch(
  () => props.elemPos,
  () => {
    axis.value = []
    if (props.elemPos.length) {
      const forward = true
      const destCRS = 'EPSG:4326'
      const coordList = [props.elemPos]
      const trans01 = global.$BlackHole3D.Coordinate.getTransEngineCoords(forward, destCRS, coordList)
      const pos4326 = wgs84tobd09(parseFloat(trans01[0][0]), parseFloat(trans01[0][1]))
      axis.value = [...pos4326, trans01[0][2]]
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.coordinate {
  position: absolute;
  z-index: 2;
  pointer-events: none; /* 设置div不可被探测 */
  .axis {
    width: 97px;
    height: 97px;
    background: url('@/assets/images/home/content/axis.png');
    background-size: 100% 100%;
  }
  .axis-x,
  .axis-y,
  .axis-z {
    position: absolute;
    font-size: 14px;
    font-family: DINCond-Black, DINCond-Black;
    font-weight: bold;
    line-height: 28px;
    letter-spacing: 2px;
  }
  .axis-x {
    top: 45px;
    right: -70px;
    color: #d81d04;
  }
  .axis-y {
    bottom: -10px;
    left: 20px;
    color: #16ff23;
  }
  .axis-z {
    top: 0px;
    left: 50px;
    color: #1400ff;
  }
}
</style>
