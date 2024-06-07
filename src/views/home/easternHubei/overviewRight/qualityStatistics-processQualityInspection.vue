<!--
* @description 工序报验
* @fileName qualityStatistics-processQualityInspection.vue
* @author
* @date 2024/02/23 10:26:32
!-->
<template>
  <div class="processQualityInspection mt-18px">
    <div class="flex flex-justify-between items-center">
      <div class="unit-title">工序报验状态统计</div>
      <div class="xq text-center" @click="detailsall">详情</div>
    </div>
    <InspectionSteps :list="list" class="mt-12px" />
    <div class="unit-title mt-12px">工序报验信息</div>
    <div class="pl-10px mt-12px">
      <div class="inspection-box flex flex-justify-between items-center">
        <div class="t1">今日上报工序报检数</div>
        <div class="count">{{ count }}</div>
      </div>
    </div>
    <div class="mt-8px scroll-view" v-if="state.list.length">
      <vue-auto-scroll class="v-s-s sccolw" :steep="0.45" :list="state.list">
        <CardBoder v-for="(e, i) in state.list" :key="i" class="mt-8px">
          <div class="milset-content">
            <div class="item-title text-truncate">{{ e.unitWorkName }}工序报验</div>
            <div class="mt-8px flex">
              <div class="t2 mr-4px">报验工序:</div>
              <div class="t3">{{ e.byprojectName }}</div>
            </div>
            <div class="mt-8px flex">
              <div class="t2 mr-4px">报验人:</div>
              <div class="t3">{{ e.creatorName }}</div>
            </div>
            <div class="mt-8px flex flex-justify-between">
              <div class="flex">
                <div class="t2 mr-4px">报验时间:</div>
                <div class="t3">{{ e.creationTime }}</div>
              </div>
              <div class="xqright flex" @click="hadlePrew(e)">
                详情<el-icon class="mt-3px"><DArrowRight /></el-icon>
              </div>
            </div>
          </div>
        </CardBoder>
      </vue-auto-scroll>
    </div>
    <div class="uno-flex-center w-100% h-200px" v-else>
      <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
import InspectionSteps from '../content/inspectionSteps.vue'
import CardBoder from '../content/cardBorder.vue'
const infoStore = useCardInfoStore()

interface Tabs {
  name: string // 名称
  count: number | string // 统计值
  unit?: string // 单位
}
interface StateList {
  unitWorkName: string // 工序报验
  byprojectName: string // 报验工序
  creatorName: string // 报验人
  creationTime: string // 报验时间
  [attribute: string]: any
  id?: string // 唯一标识
}
const list: Tabs[] = reactive([
  { name: '处理中', count: 0 },
  { name: '已处理', count: 0 },
  { name: '处理率', count: 0, unit: '%' }
])
const count = ref(0)
const state = reactive<{ list: StateList[] }>({
  list: []
})

watch(
  infoStore.gxinfo.info,
  () => {
    if (infoStore.gxinfo.list.length) {
      const type = infoStore.gxinfo.type
      count.value = infoStore.gxinfo.info.day
      list[0].count = type.clz
      list[1].count = type.ycl
      list[2].count = Number((type.ycl / type.total).toFixed(3)) * 100
      state.list = infoStore.gxinfo.list
    }
  },
  { immediate: true, deep: true }
)

const emit = defineEmits(['detailsall', 'details'])
const detailsall = () => {
  emit('detailsall', 1)
}

/** 点击详情 */
const hadlePrew = (e: StateList) => {
  emit('details', '工序报验详情', e.id)
}
</script>

<style scoped lang="scss">
.processQualityInspection {
  .xq {
    width: 54px;
    height: 26px;
    background: linear-gradient(90deg, rgba(0, 113, 198, 0), rgba(0, 113, 198, 0.7));
    border: 1px solid rgba(0, 113, 198, 0.8);
    font-size: 14px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 16px;
    cursor: pointer;
    line-height: 24px;
  }
  .inspection-box {
    width: 100%;
    height: 40px;
    background: url('@/assets/images/home/content/inspection-box.png');
    background-size: 100% 100%;
    padding: 0px 29px 0px 45px;
    .t1 {
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 24px;
    }
    .count {
      font-family: DIN, DIN;
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      line-height: 30px;
    }
  }
  .scroll-view {
    height: 208px;
    overflow: hidden;
    .v-s-s {
      height: 100%;
      .milset-content {
        padding: 0px 4px;
        .item-title {
          width: 100%;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
          line-height: 24px;
        }
        .t2 {
          font-size: 16px;
          font-weight: 500;
          font-family: PingFang SC-Regular;
          color: rgba(150, 212, 255, 0.7);
        }
        .t3 {
          font-size: 16px;
          font-weight: 500;
          font-family: PingFang SC-Regular;
          color: #96d4ff;
        }
        .xqright {
          font-size: 16px;
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 400;
          color: #f59a23;
          line-height: 19px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
