<!--
* @description 项目信息
* @fileName projectInformation.vue
* @author
* @date 2024/04/10 14:49:45
!-->
<template>
  <div class="projectInformation pt16px">
    <CardContent v-for="(e, i) in card" :key="i" :class="{ mt16px: i > 0 }">
      <div class="relative z-1">
        <div class="uno-flex-between-center">
          <div class="text uno-flex-y-center">
            <img :src="viteImages(`@/assets/images/xmq/title-inco${i}.png`)" class="mr8px" width="32" height="31" />
            <div class="t1" :style="`color: ${color[i]}`">{{ e.name }}</div>
          </div>
          <img @click="hanleLocation(e)" src="@/assets/images/common/locking.png" class="wihi-28 cursor-pointer" />
        </div>
        <div class="mt11px flex">
          <div class="w-55% uno-flex-y-center">
            <img src="@/assets/images/xmq/icon_xmlc.png" class="wihi-54 mr8px" />
            <div class="text-t">
              <div class="t1">项目里程</div>
              <div class="count mt2px">{{ e.xmlc }}<span class="t1">公里</span></div>
            </div>
          </div>
          <div class="w-45% uno-flex-y-center">
            <img src="@/assets/images/xmq/icon_pfgs.png" class="wihi-54 mr8px" />
            <div class="text-t">
              <div class="t1">批复概算</div>
              <div class="count mt2px">{{ e.pfgs }}<span class="t1">亿</span></div>
            </div>
          </div>
        </div>
        <div class="mt12px inner text-t flex flex-wrap">
          <div class="w-80px t1">施工单位：</div>
          <div class="t1 well">
            <div class="text-truncate" :class="{ mt8px: o > 0 }" v-for="(t, o) in e.sgdw" :key="o">{{ t }}</div>
          </div>
        </div>
        <div class="mt12px inner text-t flex flex-wrap">
          <div class="w-80px t1">工程类别：</div>
          <div class="t1 well">
            <div class="text-truncate" :class="{ mt8px: o > 0 }" v-for="(t, o) in e.gclb" :key="o">{{ t }}</div>
          </div>
        </div>
      </div>
    </CardContent>
  </div>
</template>

<script lang="ts" setup>
import mapuser from '@/config/user-map'
import CardContent from '../components/cardContent.vue'
import { viteImages } from '@/utils'
import { inject, reactive } from 'vue'
interface cardItem {
  name: string
  xmlc: number
  pfgs: number
  type: number
  sgdw: string[]
  gclb: string[]
}
/** 获取全局对象 */
const global: any = inject('global')
const color = ['#4287ff', '#31F367', '#FF852C', '#FF4D4D']
const card = reactive<cardItem[]>([
  {
    name: '机场高速二期',
    xmlc: 36.47,
    pfgs: 70.59,
    type: 0,
    sgdw: ['湖北交投建设集团'],
    gclb: ['双向六车道高速公路建设工程']
  },
  {
    name: '武黄高速',
    xmlc: 37.4,
    pfgs: 69.09,
    type: 1,
    sgdw: ['湖北交投建设集团有限公司', '中建三局集团有限公司'],
    gclb: ['双向八车道高速公路改扩建工程']
  },
  {
    name: '黄黄高速',
    xmlc: 0,
    pfgs: 0,
    type: 1,
    sgdw: ['-'],
    gclb: ['-']
  },
  {
    name: '黄小高速',
    xmlc: 0,
    pfgs: 0,
    type: 1,
    sgdw: ['-'],
    gclb: ['-']
  }
])

const hanleLocation = (e: cardItem) => {
  if (e.type === 0) {
    global.$BlackHole3D.Camera.setCamLocateTo(mapuser.ezjcfw, 0, 1)
  } else if (e.type === 1) {
    global.$BlackHole3D.Camera.setCamLocateTo(mapuser.whfw, 0, 1)
  }
}
</script>

<style scoped lang="scss">
.projectInformation {
  height: 830px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .text {
    .t1 {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
    }
  }
  .text-t {
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 19px;
    }
    .count {
      font-family: DIN, DIN;
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      line-height: 23px;
    }
  }
  .inner {
    .well {
      width: calc(100% - 80px);
    }
  }
}
</style>
