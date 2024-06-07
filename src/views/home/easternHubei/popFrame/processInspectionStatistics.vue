<!--
* @description 工序报验统计
* @fileName processInspectionStatistics.vue
* @author
* @date 2024/02/26 15:44:46
!-->
<template>
  <div class="processInspectionStatistics" v-loading="loading">
    <template v-if="!loading">
      <div class="flex flex-justify-between">
        <div class="card-item w-663px" v-for="(e, i) in list" :key="i">
          <div class="box pt-12px flex justify-center">
            <img :src="viteImages(e.img)" class="wihi-60 pr-12px" />
            <div class="text">
              <div class="count" @click="detailsall">{{ e.count }}</div>
              <div class="t1 mt-4px">{{ e.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24px flex flex-justify-between">
        <div class="card-item w-663px">
          <TopTitle title="工序报验状态分布" />
          <PieGl
            :list="state.list"
            v-if="state.list.length"
            :styl="{ widths: 615, height: 200, imgw: 250, imgh: 170, top: 15, left: 70 }"
          />
        </div>
        <div class="card-item w-663px">
          <TopTitle title="各标段工序报验排行" />
          <ProcessTbale :list="state.tables" class="mt-12px" />
        </div>
      </div>
      <TopTitle title="各月工序报验分析" class="mt-24px" />
      <IssuanceTimesEchart
        id="one"
        :kyes="['total', 'monthYear']"
        :list="state.line"
        v-if="state.line.length"
        dashed
        yTitle="工序报验次数"
        name="报验次数"
        :height="260"
      />
    </template>
  </div>
  <Details v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="visibles = false" />
</template>

<script lang="ts" setup>
import TopTitle from './components/topTitle.vue'
import PieGl from './components/pieGl.vue'
import ProcessTbale from './components/processTbale.vue'
import IssuanceTimesEchart from './components/issuanceTimesEchart.vue'
import Details from '../overviewRight/details/details.vue'
import { getAllSizeStat, getWfStatusStat, getSectionStat, getGroupByMonthStat } from '@/api/home'
import { viteImages } from '@/utils'
import { reactive, onMounted, nextTick, ref } from 'vue'
import moment from 'moment'
interface Card {
  img: string
  count: number
  text: string
}
interface itemStyle {
  color?: string
  opacity?: number | string
}
/** 状态分布 */
interface item {
  name: string
  value: number
  rate: number
  itemStyle: itemStyle
}
/** 排行 */
interface table {
  sectionName: string
  total: number
  ycl: string | number
  clz: string | number
  sectionId: string
}
/** 各月工序报验分析 */
interface line {
  total: number
  monthYear: number
  [k: string]: any
}
const list = reactive<Card[]>([
  {
    img: '@/assets/images/common/gxbysl.png',
    count: 0,
    text: '工序报验数量'
  },
  {
    img: '@/assets/images/common/jrgxsl.png',
    count: 0,
    text: '今日工序报验数量'
  }
])
const state = reactive<{ list: item[]; tables: table[]; line: line[] }>({
  list: [],
  tables: [],
  line: []
})
const loading = ref<boolean>(true)

/** 初始化 */
const init = async () => {
  loading.value = true
  await getAllSize()
  await getWfStatus()
  await getSection()
  await getGroupBy()
  loading.value = false
}
/** 获取头部总数统计 */
const getAllSize = async () => {
  const { code, data } = await getAllSizeStat()
  if (code === 200) {
    list[0].count = data.total
    list[1].count = data.toDay
  }
}
/** 工序报验状态分布  */
const getWfStatus = async () => {
  const { code, data } = await getWfStatusStat()
  if (code === 200) {
    const name = [
      {
        n: '已处理',
        k: 'ycl',
        c: '#2D9BFC'
      },
      {
        n: '处理中',
        k: 'clz',
        c: '#EF9832'
      }
    ]
    const list: item[] = []
    name.map((e) => {
      const rate: string = (data[e.k] / data.total).toFixed(2)
      const l: string = isNaN(Number(rate)) ? '0' : rate
      list.push({
        name: e.n,
        value: data[e.k],
        rate: Number(l) * 100,
        itemStyle: {
          color: e.c
        }
      })
    })
    state.list = list
  }
}
/** 各标段工序报验排行 */
const getSection = async () => {
  state.tables = []
  const { code, data } = await getSectionStat()
  if (code === 200) {
    state.tables = data
  }
}
/**  各月工序报验分析*/
const getGroupBy = async () => {
  const { code, data } = await getGroupByMonthStat({
    startTime: moment().startOf('month').subtract(11, 'months').format('YYYY-MM-DD'),
    endTime: moment().format('YYYY-MM-DD')
  })
  // console.log(code, data)
  if (code === 200) {
    state.line = data
  }
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
  frameCu.name = 1
  visibles.value = true
}
</script>

<style scoped lang="scss">
.processInspectionStatistics {
  padding: 45px 38px 0px 36px;
  min-height: 700px;
  :deep(.el-loading-mask) {
    background-color: transparent;
  }
  .card-item {
    .box {
      position: relative;
      width: 100%;
      height: 84px;
      background: rgba(0, 44, 80, 0.3);
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: 0px;
        width: 100%;
        height: 3px;
        background-color: #26adff;
      }
      .text {
        .count {
          font-family: DIN, DIN;
          font-weight: bold;
          font-size: 28px;
          color: #ffffff;
          line-height: 33px;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 5px;
        }
        .t1 {
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          line-height: 19px;
        }
      }
    }
  }
}
</style>
