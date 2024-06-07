<!--
* @description 首页头部卡片
* @fileName projectOverviewTopCard.vue
* @author
* @date 2024/01/29 11:18:04
!-->
<template>
  <div class="top-card t-l-c">
    <div class="flex grid-justify-center">
      <div
        class="card-item p-16px flex items-center"
        :class="{ 'ml-32px': inx > 0 }"
        v-for="(item, inx) in list"
        :key="inx"
      >
        <img :src="viteImages(item.src)" class="img pr-9px" />
        <div class="text">
          <div class="title">{{ item.name }}</div>
          <div class="mt-8px flex items-baseline">
            <div class="text1">今日{{ item.type !== 4 ? '上' : '填' }}报</div>
            <div
              @click="hadnlePopFrame(item)"
              :class="`count1 color${item.type} ml-12px mr-16px cut${item.show ? 0 : 1}`"
            >
              {{ item.day }}
            </div>
            <div class="text1">{{ item.unit }}</div>
            <div class="text1 ml-16px">累计{{ item.type !== 4 ? '上' : '填' }}报</div>
            <div
              @click="hadnlePopFrame(item)"
              :class="`count1 color${item.type} ml-12px mr-16px cut${item.show ? 0 : 1}`"
            >
              {{ item.total }}
            </div>
            <div class="text1">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <StatisticalPopFrame v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="close" />
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import StatisticalPopFrame from '../popFrame/statisticalPopFrame.vue'
import { ref, reactive } from 'vue'

interface Card {
  name: string // 名称
  total: string | number // 累计
  day: string | number // 今日
  src: string // 图片路径
  type: number // 类型 0 监理巡视 1 工序 2 质检 3 质量
  unit: string // 单位
  show: boolean // 是否有值
}
/** topcard接口 */
interface TopCard {
  list: Card[]
}
/** 统计页面的名称以及用什么组件 */
interface FrameCu {
  name: number
  title: string
}
const props = withDefaults(defineProps<TopCard>(), {})
const list = props.list
const visibles = ref(false)
const frameCu = reactive<FrameCu>({
  name: 0,
  title: ''
})
const hadnlePopFrame = (e: Card) => {
  frameCu.name = e.type
  if (e.type === 0) {
    frameCu.title = '监理统计'
  } else if (e.type === 1) {
    frameCu.title = '工序报验统计'
  } else if (e.type === 2) {
    frameCu.title = '质检表格'
  } else if (e.type === 3) {
    frameCu.title = '质量监测统计'
  }
  visibles.value = true
}
const close = () => {
  visibles.value = false
}
</script>

<style scoped lang="scss">
.top-card {
  width: 100%;
  position: absolute;
  top: 139px;
  pointer-events: none; /* 设置div不可被探测 */
  z-index: 4;
  .card-item {
    min-width: 247px;
    height: 105px;
    background: rgba(0, 44, 80, 0.6);
    position: relative;
    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: 0px;
      border: 2px solid rgba(192, 223, 255, 1);
      animation: animate 8s linear infinite;
    }
    &::after {
      width: calc(100%);
      height: calc(100%);
      animation-delay: -4s;
    }
    &::before {
      width: calc(100%);
      height: calc(100%);
    }
    .img {
      width: 66px;
      height: 75px;
    }
    .text {
      .title {
        font-size: 20px;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 23px;
      }
      .text1 {
        font-size: 16px;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 19px;
      }
      .count1 {
        font-size: 30px;
        font-family: DIN, DIN;
        font-weight: bold;
        line-height: 35px;
      }
      .color0 {
        color: #fbff11;
      }
      .color1 {
        color: #f59a23;
      }
      .color2 {
        color: #00afff;
      }
      .color3 {
        color: #c08dff;
      }
      .cut0 {
        text-decoration-line: underline;
        cursor: pointer;
        pointer-events: auto; /* 设置div可被探测 */
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    clip-path: inset(0 0 calc(100% - 1px) 0);
  }
  25% {
    clip-path: inset(0 calc(100% - 1px) 0 0);
  }
  50% {
    clip-path: inset(calc(100% - 1px) 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 calc(100% - 1px));
  }
}
</style>
