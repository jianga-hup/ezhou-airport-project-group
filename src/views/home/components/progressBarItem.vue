<!--
* @description 进度条-子进度条
* @fileName progressBarItem.vue
* @author
* @date 2024/04/07 16:18:54
!-->
<template>
  <div class="progressBarItem uno-flex-y-center mt7px" v-for="(e, i) in child" :key="i">
    <div class="progressBarItem-title mr11px">{{ e.name }}</div>
    <div class="progressBarItem-box">
      <div
        class="progressBarItem-box-bg"
        :style="`width: ${e.value}%; background: linear-gradient(90deg, ${color[inx]} 0%, ${color[inx]} 78%, #ddecfd 100%);`"
      />
      <div class="progressBarItem-box-line" :style="`left: ${e.value - 1}%`" />
    </div>
    <div class="progressBarItem-count flex items-baseline flex-justify-end">
      <div class="count">{{ e.value }}</div>
      <div class="unit">%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ProgressItem {
  name: string
  value: number
}
interface Props {
  child: ProgressItem[]
  inx: number
}
const color = ['#119BFF', '#31F367', '#FF852C', '#FF4C4C']
withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.progressBarItem {
  width: 100%;
  &-title {
    font-family:
      Alibaba PuHuiTi 3,
      Alibaba PuHuiTi 30;
    font-weight: normal;
    font-size: 16px;
    color: #e7f2ff;
  }
  &-box {
    position: relative;
    width: 234px;
    height: 4px;
    background: #2d3a5c;
    &-bg {
      height: 4px;
      // background: linear-gradient(90deg, #119bff 0%, #119bff 78%, #ddecfd 100%);
      animation: moveStripes 3s linear infinite;
    }
    &-line {
      position: absolute;
      top: -4px;
      width: 2px;
      height: 12px;
      background: #d4e7fc;
      box-shadow: 0px 0px 8px 0px rgba(212, 231, 252, 0.5);
    }
  }
  &-count {
    width: calc(100% - 65px - 11px - 234px);
    .count {
      font-family:
        Source Han Sans SC,
        Source Han Sans SC;
      font-weight: bold;
      font-size: 16px;
      color: #e7f2ff;
      line-height: 19px;
    }
    .unit {
      color: #4d5376;
      font-family:
        Source Han Sans SC,
        Source Han Sans SC;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
@keyframes moveStripes {
  to {
    background-position: 220px 0;
  }
}
</style>
