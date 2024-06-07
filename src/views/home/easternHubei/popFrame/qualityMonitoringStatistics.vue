<!--
* @description 质量监测统计
* @fileName qualityMonitoringStatistics.vue
* @author 
* @date 2024/02/27 11:18:13
!-->
<template>
  <div class="qualityMonitoringStatistics">
    <div class="flex h-215px" v-loading="state.snbhz.info.loading">
      <template v-if="!state.snbhz.info.loading">
        <div class="w-645px mr-23px">
          <TopTitle title="水泥拌合站生产统计" />
          <div class="flex mt-16px">
            <CardContent :item="state.snbhz.info" @detailsall="detailsall" />
            <div class="mt-2px ml-32px w-c-328">
              <TextTime title="盘数超标率" />
              <div class="flex">
                <PassRateEchart :rate="state.snbhz.pass.hgRate" />
                <ChartShow
                  :names="['合格率', '累计盘数', '未超标数']"
                  :counts="[state.snbhz.pass.hgRate, state.snbhz.pass.ljps, state.snbhz.pass.hgps]"
                  class="w-c-145"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-c-668 mt-2px">
          <TextTime title="各月产能分析" />
          <div class="w-100% mt8px pl-10px">
            <div class="flex tabs">
              <div class="item mr-12px" v-for="(e, i) in state.tabs" :key="i">
                <div class="uno-flex-y-center">
                  <div class="t1 mr-5px">{{ e.SectionName }}</div>
                  <div class="t1 t2">今日</div>
                </div>
                <div class="mt-2px count">{{ e.toDay }}</div>
              </div>
            </div>
            <MonthlyAnalysis :xAxis="xAxis" :list="list" />
          </div>
        </div>
      </template>
    </div>
    <div class="h-478px" v-loading="state.ylj.info.loading">
      <template v-if="!state.ylj.info.loading">
        <TopTitle title="压力机试验统计" class="mt-24px" />
        <div class="flex mt-16px">
          <CardContent :item="state.ylj.info" @detailsall="detailsall" />
          <div class="mt-2px ml-32px w-317px mr-23px">
            <TextTime title="试验合格率" />
            <div class="flex">
              <PassRateEchart :rate="state.ylj.pass.hgRate" />
              <ChartShow
                :names="['合格率', '试验总数', '合格数']"
                :counts="[state.ylj.pass.hgRate, state.ylj.pass.ljps, state.ylj.pass.hgps]"
                class="w-c-145"
              />
            </div>
          </div>
          <div class="w-c-668">
            <IssuanceTimesEchart
              id="ylj"
              :kyes="['count', 'mon']"
              :list="state.ylj.info.line"
              dashed
              name="试验次数"
              :height="150"
            />
          </div>
        </div>
        <TopTitle title="万能机试验统计" class="mt-24px" />
        <div class="flex mt-16px">
          <CardContent :item="state.wnj.info" @detailsall="detailsall" />
          <div class="mt-2px ml-32px w-317px mr-23px">
            <TextTime title="试验合格率" />
            <div class="flex">
              <PassRateEchart :rate="state.wnj.pass.hgRate" />
              <ChartShow
                :names="['合格率', '试验总数', '合格数']"
                :counts="[state.wnj.pass.hgRate, state.wnj.pass.ljps, state.wnj.pass.hgps]"
                class="w-c-145"
              />
            </div>
          </div>
          <div class="w-c-668">
            <IssuanceTimesEchart
              id="wnj"
              :kyes="['count', 'mon']"
              :list="state.wnj.info.line"
              dashed
              name="试验次数"
              :height="150"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
  <Details v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="visibles = false" />
</template>

<script lang="ts" setup>
import TopTitle from './components/topTitle.vue'
import CardContent from './components/cardContent.vue'
import TextTime from './components/textTime.vue'
import PassRateEchart from './components/passRateEchart.vue'
import ChartShow from './components/chartShow.vue'
import MonthlyAnalysis from './components/monthlyAnalysis.vue'
import IssuanceTimesEchart from './components/issuanceTimesEchart.vue'
import Details from '../overviewRight/details/details.vue'
import { bhzProductionStatistics, bhzCapacityAnalysis, getTestDataStatic, getTestDataByMonth } from '@/api/home'
import { onMounted, reactive, nextTick, ref } from 'vue'
import moment from 'moment'
interface info {
  t1: string
  total: number
  t2: string
  day: number
  src: string
  loading: boolean
}
interface infol extends info {
  line: any[]
}
interface pass {
  hgRate: string // 合格率
  ljps: number // 总数|累计
  hgps: number // 合格数
}
interface tabs {
  SectionId: string
  SectionName: string
  toDay: number
}
const state = reactive<{
  snbhz: { info: info; pass: pass }
  tabs: tabs[]
  ylj: { info: infol; pass: pass }
  wnj: { info: infol; pass: pass }
}>({
  snbhz: {
    info: {
      t1: '累计产量(m³)',
      total: 0,
      t2: '今日产量(m³):',
      day: 0,
      src: '@/assets/images/common/zljc-snbhz.png',
      loading: true
    },
    pass: {
      hgRate: '0',
      ljps: 0,
      hgps: 0
    }
  },
  tabs: [],
  ylj: {
    info: {
      t1: '累计试验次数',
      total: 0,
      t2: '今日试验次数:',
      day: 0,
      line: [],
      src: '@/assets/images/common/zljc-ylj.png',
      loading: true
    },
    pass: {
      hgRate: '0',
      ljps: 0,
      hgps: 0
    }
  },
  wnj: {
    info: {
      t1: '累计试验次数',
      total: 0,
      t2: '今日试验次数:',
      day: 0,
      line: [],
      src: '@/assets/images/common/zljc-ylj.png',
      loading: true
    },
    pass: {
      hgRate: '0',
      ljps: 0,
      hgps: 0
    }
  }
})
// 水泥拌合站的
const xAxis = ref<string[]>([])
const list = ref<any[]>([])

/** 初始化 */
const init = () => {
  initsnbhz()
  initmachine()
}
/** 水泥拌合站 */
const initsnbhz = async () => {
  state.snbhz.info.loading = true
  await getProduction()
  await getCapacity()
  state.snbhz.info.loading = false
}
/** 水泥拌合站-生产状态 */
const getProduction = async () => {
  const { code, data } = await bhzProductionStatistics()
  // console.log(code, data)
  if (code === 200) {
    state.snbhz.info.total = data.total
    state.snbhz.info.day = data.toDay
    state.snbhz.pass = {
      hgRate: data.hgRate,
      ljps: data.ljps,
      hgps: data.hgps
    }
  }
}
/** 水泥拌合站-产能分析 */
const getCapacity = async () => {
  const { code, data } = await bhzCapacityAnalysis()
  if (code === 200) {
    state.tabs = data.table
    xAxis.value = data.map.date
    list.value = data.map.data
  }
}
/** 万能机-压力机 */
const initmachine = async () => {
  state.ylj.info.loading = true
  await getTestData()
  await getByMonth()
  state.ylj.info.loading = false
}
/** 万能机压力机-产能分析 */
const getTestData = async () => {
  const { code, data } = await getTestDataStatic()
  if (code === 200) {
    state.ylj.info.total = data.ylCount
    state.ylj.info.day = data.jrylCount
    state.ylj.pass.hgRate = String(settoFixed((data.ylCount - data.ylbhgCount) / data.ylCount, 2) * 100)
    state.ylj.pass.ljps = data.ylCount
    state.ylj.pass.hgps = data.ylCount - data.ylbhgCount
    state.wnj.pass.hgRate = String(settoFixed((data.wnCount - data.wnbhgCount) / data.wnCount, 2) * 100)
    state.wnj.pass.ljps = data.wnCount
    state.wnj.pass.hgps = data.wnCount - data.wnbhgCount
    state.wnj.info.total = data.wnCount
    state.wnj.info.day = data.jrwnCount
  }
}
/** 万能机压力机-试验机按月统计 */
const getByMonth = async () => {
  const { code, data } = await getTestDataByMonth({
    startDate: moment().startOf('year').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD')
  })
  if (code === 200) {
    state.wnj.info.line = []
    state.ylj.info.line = []
    data.map((e: any) => {
      state.wnj.info.line?.push({
        mon: e.mon,
        count: e.wnCount
      })
      state.ylj.info.line?.push({
        mon: e.mon,
        count: e.ylCount
      })
    })
  }
}

const settoFixed = (num: number, decimal: number): number => {
  let nums: string = num.toString()
  const index = nums.indexOf('.')
  if (index !== -1) {
    nums = nums.substring(0, decimal + index + 1)
  } else {
    nums = nums.substring(0)
  }
  return Number(parseFloat(nums).toFixed(decimal))
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})

const visibles = ref<boolean>(false)
const frameCu = reactive({
  name: 0
})
const detailsall = () => {
  frameCu.name = 2
  visibles.value = true
}
</script>

<style scoped lang="scss">
.qualityMonitoringStatistics {
  padding: 45px 38px 0px 36px;
  min-height: 700px;
  :deep(.el-loading-mask) {
    background-color: transparent;
  }
  .tabs {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      flex-shrink: 0;
      .t1 {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #e0f2fe;
        line-height: 16px;
      }
      .t2 {
        color: #0091ff;
      }
      .count {
        font-family: DIN, DIN;
        font-weight: bold;
        font-size: 20px;
        color: #e0f2fe;
        line-height: 23px;
      }
    }
  }
}
</style>
