<!--
* @description 质检表格
* @fileName qualityStatistics-qualityInspectionForm.vue
* @author
* @date 2024/06/03 11:21:08
!-->
<template>
  <div class="qualityInspectionForm mt-18px">
    <div class="flex flex-justify-between items-center">
      <div class="unit-title">质检表格统计</div>
      <div class="xq text-center" @click="detailsall">详情</div>
    </div>
    <InspectionSteps :list="list" class="mt-12px" />
    <div class="unit-title mt-12px">实时质检</div>
    <div class="pl-10px mt-12px">
      <div class="inspection-box flex flex-justify-between items-center">
        <div class="t1">今日填报质检表格数</div>
        <div class="count">{{ count }}</div>
      </div>
    </div>
    <div class="mt-8px scroll-view" v-if="state.list.length">
      <vue-auto-scroll class="v-s-s sccolw" :steep="0.45" :list="state.list">
        <CardBoder v-for="(e, i) in state.list" :key="i" class="mt-8px">
          <div class="milset-content">
            <div class="item-title text-truncate">{{ e.gcbw }}</div>
            <div class="mt-8px flex">
              <div class="t2 mr-4px">标段:</div>
              <div class="t3">{{ e.bdmc }}</div>
            </div>
            <div class="mt-8px flex">
              <div class="t2 mr-4px">表名:</div>
              <div class="t3">{{ e.bgmc }}</div>
            </div>
            <div class="mt-8px flex flex-justify-between">
              <div class="flex">
                <div class="t2 mr-4px">完成时间:</div>
                <div class="t3">{{ e.wcsj }}</div>
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
  <QualityInspectionDetails v-if="visible" :title="title" :visible="visible" :url="url" @close="visible = false" />
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
import InspectionSteps from '../content/inspectionSteps.vue'
import CardBoder from '../content/cardBorder.vue'
import QualityInspectionDetails from './details/qualityInspectionDetails.vue'
const infoStore = useCardInfoStore()
interface Tabs {
  name: string // 名称
  count: number | string // 统计值
  unit?: string // 单位
}
interface StateList {
  bdmc: string
  dw_name: string
  gcbw: string
  bgmc: string
  tbr: string
  wcsj: string
  tx_state: string
  url: string
}
const list: Tabs[] = reactive([
  { name: '已填写', count: 0 },
  { name: '已报审', count: 0 },
  { name: '已审批', count: 0 }
])
const count = ref(0)
const state = reactive<{ list: StateList[] }>({
  list: []
})
const visible = ref(false)
const url = ref('')
const title = ref('')

const emit = defineEmits(['detailsall', 'details'])
const detailsall = () => {
  emit('detailsall', 3)
}

/** 点击详情 */
const hadlePrew = (e: StateList) => {
  visible.value = true
  url.value = e.url
  title.value = e.bgmc
}

watch(
  () => infoStore.zjinfo.type,
  () => {
    const type = infoStore.zjinfo.type
    count.value = infoStore.zjinfo.day
    list[0].count = type.sg_filled
    list[1].count = type.sg_apply
    list[2].count = type.sg_approved
    if (infoStore.zjinfo.list.length) {
      state.list = infoStore.zjinfo.list
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.qualityInspectionForm {
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
