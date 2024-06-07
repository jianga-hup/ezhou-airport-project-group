<!--
* @description 头部卡片
* @fileName topCard.vue
* @author
* @date 2024/04/15 14:18:47
!-->
<template>
  <CardLine>
    <div class="uno-wh-full pt16px flex justify-around">
      <div class="box-item" v-for="(item, index) in tabs" :key="index">
        <div class="t1">{{ item.title }}</div>
        <div class="flex mt4px">
          <img :src="viteImages(item.src)" class="wihi-32" />
          <div class="uno-flex-baseline">
            <div class="count ml6px">{{ item.count }}</div>
            <div class="unit">{{ item.unit }}</div>
            <div class="ml8px ratio" v-if="item?.ratio">环比</div>
            <div class="cc1 ml4px" v-if="item?.ratio">+{{ item.ratio }}%</div>
          </div>
        </div>
      </div>
    </div>
  </CardLine>
</template>

<script lang="ts" setup>
import CardLine from './cardLine.vue'
import { viteImages } from '@/utils'
import { ref } from 'vue'
interface Tabs {
  title: string
  count: number
  src: string
  ratio?: number
  unit: string
}
const tabs = ref<Tabs[]>([
  {
    title: '本月累计完成投资',
    count: 0,
    src: '@/assets/images/common/icon_zaigang.png',
    ratio: 0,
    unit: '亿元'
  },
  {
    title: '本年累计完成投资',
    count: 0,
    src: '@/assets/images/common/icon_renwu.png',
    unit: '亿元'
  },
  {
    title: '本年投资目标',
    count: 0,
    src: '@/assets/images/common/icon_xuncha.png',
    unit: '亿元'
  },
  {
    title: '本年完成投资占比',
    count: 0,
    src: '@/assets/images/common/icon_anquan.png',
    unit: '%'
  }
])
</script>

<style scoped lang="scss">
.box-item {
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #c7e9fd;
    line-height: 19px;
  }
  .count {
    font-family: DINCond-Black, DINCond-Black;
    font-weight: 400;
    font-size: 28px;
    color: #c7e9fd;
    line-height: 28px;
  }
  .unit {
    font-family: PingFang SC-Medium;
    font-size: 16px;
    color: #c7e9fd;
    line-height: 28px;
  }
  .ratio {
    font-family: PingFang SC-Regular;
    font-weight: 400;
    font-size: 16px;
    color: #c7e9fd;
  }
  .cc1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #ff5650;
    line-height: 19px;
  }
}
</style>
