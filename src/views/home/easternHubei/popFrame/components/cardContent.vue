<!--
* @description 卡片内容
* @fileName cardContent.vue
* @author
* @date 2024/02/26 09:28:26
!-->
<template>
  <div class="card-content">
    <div class="flex">
      <img :src="viteImages(item.src)" class="wihi-70 pr-12px" />
      <div class="text">
        <div class="t1">{{ item.t1 }}</div>
        <div @click="detailsall" class="count mt-8px">{{ item.total }}</div>
      </div>
    </div>
    <div class="mt-12px flex">
      <div class="t2">{{ item.t2 }}</div>
      <div class="count1 ml-8px">{{ item.day }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
interface itemStyle {
  color?: string
  opacity?: number | string
}
interface items {
  name: string
  value: number
  rate: number
  itemStyle: itemStyle
}
interface Card {
  t1: string // 累计
  t2: string // 今日
  total: string | number // 累计
  day: string | number // 今日
  src: string // 图片路径
  list?: items[]
  line?: any[]
  loading: boolean
}
/** topcard接口 */
interface TopCard {
  item: Card
}
withDefaults(defineProps<TopCard>(), {})

const emit = defineEmits(['detailsall'])
const detailsall = () => {
  emit('detailsall')
}
</script>

<style scoped lang="scss">
.card-content {
  position: relative;
  width: 296px;
  height: 142px;
  background: rgba(0, 44, 80, 0.3);
  padding: 16px;
  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 3px;
    background-color: #26adff;
  }
  .text {
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 18px;
      color: #ffffff;
      line-height: 21px;
    }
    .count {
      font-family: DIN, DIN;
      font-weight: bold;
      font-size: 30px;
      color: #ffffff;
      line-height: 35px;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }
  .t2,
  .count1 {
    font-size: 20px;
    color: #0091ff;
    line-height: 23px;
  }
  .t2 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
  }
  .count1 {
    font-family: DIN, DIN;
    font-weight: 500;
  }
}
</style>
