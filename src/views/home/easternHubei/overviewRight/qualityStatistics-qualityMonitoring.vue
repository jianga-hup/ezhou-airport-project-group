<!--
* @description 质量监测
* @fileName qualityStatistics-qualityMonitoring.vue
* @author 
* @date 2024/02/23 11:58:16
!-->
<template>
  <div class="qualityMonitoring mt-18px">
    <div class="flex flex-justify-between items-center">
      <div class="unit-title">质量监测合格率统计</div>
      <div class="xq text-center" @click="detailsall">详情</div>
    </div>
    <div class="flex justify-between mt-12px">
      <div class="pie-item" v-for="(e, i) in state.list" :key="i">
        <PieEchart :rate="e.rate" :text="e.text" />
        <div class="flex justify-between pl-5px pr-5px">
          <span class="lable">{{ e.type === 1 ? '累计盘数' : '试验总数' }}:</span>
          <span class="num">{{ e.total }}</span>
        </div>
        <div class="flex justify-between mt-4px pl-5px pr-5px">
          <span class="lable">{{ e.type === 1 ? '未超标盘数' : '合格数' }}:</span>
          <span class="num n1">{{ e.ycl }}</span>
        </div>
      </div>
    </div>
    <div class="unit-title mt-12px">实时质量监测信息</div>
    <div class="flex flex-justify-between mt-5px">
      <QualityCard :selected="selected" :item="e" v-for="(e, i) in state.card" :key="i" @cliclCard="cliclCard" />
    </div>
    <div class="mt-8px scroll-view" v-if="state.scroll.length">
      <vue-auto-scroll class="v-s-s sccolw" :steep="0.45" :list="state.scroll">
        <CardBoder v-for="(e, i) in state.scroll" :key="i" class="mt-8px">
          <div class="milset-content">
            <div class="t1 text-truncate mb-8px">{{ e.testName }}</div>
            <div class="mb-6px flex">
              <div class="t2 w-70px">设备名称:</div>
              <div class="t3 w-c-70 ml-4px">{{ e.deviceName }}</div>
            </div>
            <div class="mb-6px flex">
              <div class="t2 w-70px">施工部位:</div>
              <div class="t3 w-c-70 ml-4px">{{ e.address }}</div>
            </div>
            <div class="flex flex-justify-between">
              <div class="flex">
                <div class="t2 w-70px">试验日期:</div>
                <div class="t3">{{ e.testDate }}</div>
              </div>
              <div class="xqright flex" @click="hadlePrew(e)">
                详情<el-icon class="mt-3px"><DArrowRight /></el-icon>
              </div>
            </div>
          </div>
        </CardBoder>
      </vue-auto-scroll>
    </div>
    <div class="uno-flex-center w-100% h-128px" v-else>
      <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, nextTick } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
import PieEchart from '../content/qualitStatisticsEchart.vue'
import QualityCard from '../content/qualityCard.vue'
import CardBoder from '../content/cardBorder.vue'
const infoStore = useCardInfoStore()
const zlinfo = infoStore.zlinfo
interface StateList {
  rate: number // 进度
  text: string // 名称
  total: number // 总数
  ycl: number // 已处理
  type: number // 类型
}
interface StateScroll {
  testName: string // 名称
  address: string // 施工部位
  deviceName: string // 设备名称
  testDate: string // 试验日期
  type: string // 类型
  id: string // 唯一标识
  [attribute: string]: any
}
interface StateCard {
  name: string // 名称
  count: number // 统计值
  id: string // 唯一索引值
}
let saveData: StateScroll[] = [] // 保存的数据
const selected = ref<string[]>([])
const state = reactive<{ list: StateList[]; card: StateCard[]; scroll: StateScroll[] }>({
  list: [
    { text: '水泥拌合站', rate: 0, total: 0, ycl: 0, type: 1 },
    { text: '压力机试验', rate: 0, total: 0, ycl: 0, type: 2 },
    { text: '万能机试验', rate: 0, total: 0, ycl: 0, type: 3 }
  ],
  card: [
    { name: '累计拌合盘数', count: 0, id: '0' },
    { name: '累计压力机试验数', count: 0, id: '1' },
    { name: '累计万能机试验数', count: 0, id: '2' }
  ],
  scroll: []
})

/**  点击卡片返回的数据做列表展示 */
const cliclCard = (id: string) => {
  const inx: number = selected.value.indexOf(id)
  if (inx !== -1) {
    selected.value.splice(inx, 1)
  } else {
    selected.value.push(id)
  }
  state.scroll = saveData.filter((e) => selected.value.includes(e.type))
}

watch(
  () => zlinfo.tabs,
  (newvalue) => {
    const list = newvalue
    if (list && list.length) {
      state.list.map((e, i) => {
        e.rate = list[i].rate
        e.total = list[i].total || 0
        e.ycl = list[i].ycl || 0
        state.card[i].count = list[i].total || 0
      })
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => zlinfo.list,
  (newvalue) => {
    const list = newvalue
    if (list && list.length) {
      state.scroll = list
      saveData = list
      nextTick(() => {
        selected.value = state.card.map((item) => item.id)
      })
    }
  },
  { immediate: true, deep: true }
)

const emit = defineEmits(['detailsall', 'details'])
const detailsall = () => {
  emit('detailsall', 2)
}

/** 点击详情 */
const hadlePrew = (e: StateScroll) => {
  let id = e.id
  if (e.type === '0') {
    id = e.bianhao
  }
  emit('details', '质量监测详情', id, e.type)
}
</script>

<style scoped lang="scss">
.qualityMonitoring {
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
  .pie-item {
    width: 33%;
    .lable {
      font-size: 16px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      color: #bfe9ff;
      line-height: 19px;
    }
    .num {
      font-size: 16px;
      font-family: DIN, DIN;
      font-weight: 500;
      color: #ffffff;
      line-height: 19px;
    }
    .n1 {
      color: #43e7b6;
    }
  }
  .scroll-view {
    height: 128px;
    overflow: hidden;
    .v-s-s {
      height: 100%;
      .milset-content {
        .t1 {
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 600;
          font-size: 18px;
          color: #ffffff;
          line-height: 21px;
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
