<!--
* @description 项目总览（综合态势）
* @fileName projectOverview.vue 首页
* @author
* @date 2024/01/29 10:53:22
!-->
<template>
  <div class="project-0verview" :class="{ bg: msak.bgshow }">
    <TopCard :list="list" />
    <div :class="[isleft ? 'overview-left' : 'overview1']">
      <img
        src="@/assets/images/menu/home-left.png"
        :class="['img-l', isleft ? 'img-l1' : 'img-l2']"
        @click="isleft = !isleft"
      />
      <div :class="['left', { 'slide-in-left': isleft }]" v-if="isleft">
        <Overview
          :info="{
            mileage: '36.47',
            total: '70.59',
            category: '双向六车道高速公路建设工程',
            list: ['湖北交投建设集团有限公司']
          }"
        />
        <VideoMonitoring />
        <ProjectMilestones />
      </div>
    </div>
    <div :class="[isright ? 'overview-right' : 'overview2']">
      <img
        src="@/assets/images/menu/home-right.png"
        :class="['img-r', isright ? 'img-r1' : 'img-r2']"
        @click="isright = !isright"
      />
      <div :class="['right', { 'slide-in-right': isright }]" v-if="isright && !gild">
        <ProgressSatistics :value="12.76" />
        <QualityStatistics />
      </div>
      <div :class="['right w-right', { 'slide-in-right': isright }]" v-if="isright && gild">
        <Information />
      </div>
    </div>
    <Legend :isshow="isright" />
    <BaseMap class="slide-in-bottom" />
  </div>
  <div :class="{ lengmap: isleft }">
    <SceneInformation />
  </div>
</template>

<script lang="ts" setup>
import Legend from './content/legend.vue' // 图例
import BaseMap from './content/baseMap.vue' // 二维底图
import SceneInformation from './content/sceneInformation.vue' // 场景信息
import TopCard from './content/projectOverviewTopCard.vue' // 头部卡片
import Overview from './overviewLeft/overview.vue' // 项目概括
import VideoMonitoring from './overviewLeft/videoMonitoring.vue' // 视频监控
import ProjectMilestones from './overviewLeft/projectMilestones.vue' // 项目大事记
import ProgressSatistics from './overviewRight/progressSatistics.vue' // 进度统计
import QualityStatistics from './overviewRight/qualityStatistics.vue' // 进度统计
import Information from './overviewRight/component/information.vue' // 构件信息
import { onMounted, ref, watch, computed, onBeforeUnmount } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
import { useinit, reset } from '@/hooks/useCardInfo'
import { masktStore } from '@/store/modules/mask'

import { componentStore } from '@/store/modules/component'

// 头部卡片信息
const infoStore = useCardInfoStore()
// 构件信息
const component = componentStore()
// 阴影背景
const msak = masktStore()
const list = ref([
  {
    name: '监理巡视旁站',
    src: '@/assets/images/home/map/map-zljl.png',
    total: 0,
    day: 0,
    type: 0,
    unit: '条',
    show: true
  },
  {
    name: '今日工序报验数',
    src: '@/assets/images/home/map/map-gxby.png',
    total: 0,
    day: 0,
    type: 1,
    unit: '条',
    show: true
  },
  {
    name: '质检表格',
    src: '@/assets/images/home/map/map-gxzj.png',
    total: 0,
    day: 0,
    type: 2,
    unit: '条',
    show: true
  }
  // {
  //   name: '水泥拌合站',
  //   src: '@/assets/images/home/map/map-zljc.png',
  //   total: 0,
  //   day: 0,
  //   type: 3,
  //   unit: '盘',
  //   show: true
  // }
])
const isleft = ref(false)
const isright = ref(false)
watch(
  () => infoStore.jlinfo.info,
  (newVal) => {
    list.value[0].total = newVal.total
    list.value[0].day = newVal.day
  },
  { deep: true, immediate: true }
)
watch(
  () => infoStore.gxinfo.info,
  (newVal) => {
    list.value[1].total = newVal.total
    list.value[1].day = newVal.day
  },
  { deep: true, immediate: true }
)
watch(
  () => infoStore.zjinfo.type,
  () => {
    list.value[2].total = infoStore.zjinfo.total
    list.value[2].day = infoStore.zjinfo.day
  },
  { deep: true, immediate: true }
)
const gild = computed(() => {
  return component.state.gild
})
watch(gild, (newVal) => {
  if (newVal && !isright.value) {
    isright.value = true
  }
})

// 定时器
const timer = ref<number | null | NodeJS.Timeout>(null)

onMounted(() => {
  useinit()
  timer.value = setInterval(
    () => {
      useinit()
    },
    1000 * 60 * 2
  )
})

onBeforeUnmount(() => {
  reset()
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style scoped lang="scss">
.project-0verview {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none; /* 设置div不可被探测 */
}
.bg {
  background: url('@/assets/images/menu/bg-top.png');
  background-size: 100% 100%;
}
.overview1,
.overview-left {
  // pointer-events: none; /* 设置div不可被探测 */
  background: linear-gradient(-90deg, rgba(4, 17, 35, 0) 0.74%, #041123 16.11%);
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 5;
  width: calc(434px + 128px);
  height: 100%;
  padding-top: 106px;
  padding-left: 28px;
  overflow: hidden;
  .left {
    width: calc(434px);
  }
}
.overview1 {
  width: calc(68px);
  transition: all 0.3s;
}
.img-l,
.img-r {
  pointer-events: auto; /* 设置div可被探测 */
  width: 44px;
  height: 743px;
  position: absolute;
  top: 126px;
  cursor: pointer;
}
.img-l1 {
  left: 478px;
  transition: all 0.3s;
}
.img-l2 {
  left: 0px;
  transition: all 0.3s;
}
.img-r1 {
  right: 478px;
  transition: all 0.3s;
}
.img-r2 {
  right: 0px;
  transition: all 0.3s;
}
.overview2,
.overview-right {
  // pointer-events: none; /* 设置div不可被探测 */
  background: linear-gradient(90deg, rgba(4, 17, 35, 0) 0.74%, #041123 16.11%);
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 5;
  width: calc(434px + 128px);
  height: 100%;
  overflow: hidden;
  .w-right,
  .right {
    position: absolute;
    right: 28px;
    top: 106px;
    pointer-events: auto;
    width: calc(434px);
  }
  .w-right {
    width: calc(452px);
  }
}
.overview2 {
  width: calc(68px);
  transition: all 0.3s;
}
.lengmap {
  :deep(.lend) {
    bottom: 200px;
    left: 540px;
  }
}
</style>
