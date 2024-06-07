<!--
* @description 监理统计
* @fileName supervisionStatistics.vue
* @author
* @date 2024/02/23 15:57:39
!-->
<template>
  <div class="supervisionStatistics">
    <TopTitle title="监理巡视统计" />
    <div class="flex mt-16px item-card" v-loading="state.xsinfo.loading">
      <template v-if="!state.xsinfo.loading">
        <CardContent :item="state.xsinfo" @detailsall="detailsall" />
        <div class="mt-2px ml-32px item-pie">
          <TextTime title="巡视状态分布" />
          <PieGl :list="state.xsinfo.list" />
        </div>
        <div class="item-line ml-32px">
          <TextTime title="监理指令下发次数分布" show-time @cliclTitle="cliclTitle" />
          <IssuanceTimesEchart
            id="one"
            :kyes="['countNum', 'inspectTime']"
            :list="state.xsinfo.line"
            v-if="state.xsinfo.line.length"
          /></div
      ></template>
    </div>
    <TopTitle title="监理旁站统计" class="mt-24px" />
    <div class="flex mt-16px item-card" v-loading="state.pzinfo.loading">
      <template v-if="!state.pzinfo.loading">
        <CardContent :item="state.pzinfo" @detailsall="detailsall" />
        <div class="mt-2px ml-32px item-pie">
          <TextTime title="旁站记录状态分布" />
          <PieGl :list="state.pzinfo.list" v-if="state.pzinfo.list.length" />
        </div>
        <div class="item-line ml-32px">
          <TextTime title="旁站项目登记情况" />
          <BarEchart :list="state.pzinfo.line" />
        </div>
      </template>
    </div>
    <TopTitle title="监理指令统计" class="mt-24px" />
    <div class="flex mt-16px item-card" v-loading="state.zlinfo.loading">
      <template v-if="!state.zlinfo.loading">
        <CardContent :item="state.zlinfo" @detailsall="detailsall" />
        <div class="mt-2px ml-32px item-pie">
          <TextTime title="巡视状态分布" />
          <PieGl :list="state.zlinfo.list" />
        </div>
        <div class="item-line ml-32px">
          <TextTime title="监理指令下发次数分布" show-time @cliclTitle="cliclTitle1" />
          <IssuanceTimesEchart
            id="two"
            :kyes="['num', 'date']"
            :list="state.zlinfo.line"
            v-if="state.zlinfo.line.length"
          /></div
      ></template>
    </div>
  </div>
  <Details v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="visibles = false" />
</template>

<script lang="ts" setup>
import TopTitle from './components/topTitle.vue'
import CardContent from './components/cardContent.vue'
import PieGl from './components/pieGl.vue'
import TextTime from './components/textTime.vue'
import IssuanceTimesEchart from './components/issuanceTimesEchart.vue'
import BarEchart from './components/barEchart.vue'
import Details from '../overviewRight/details/details.vue'
import {
  selectSupervisionPatrolCountAndStatusData,
  selectSupervisionPatrolCountDistributionData,
  selectSupervisionBesideCountAndStatusData,
  selectBesideProjectCountDistributionData,
  countNum,
  statusDistribute,
  countNumByDate
} from '@/api/home'
import { onMounted, reactive, ref } from 'vue'
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
/** 监理内容 */
interface CardData {
  todayPatrolCount: number
  todayPatrolStatusData?: null | any
  totalPatrolCount: number
  totalPatrolStatusData: any
}
interface info<T> {
  t1: string
  total: number
  t2: string
  day: number
  src: string
  list: item[]
  line: T[]
  loading: boolean
}
const state = reactive<{
  xsinfo: info<{ countNum: number; inspectTime: string }>
  pzinfo: info<{ num: number; project: string }>
  zlinfo: info<{ num: number; date: string }>
}>({
  xsinfo: {
    t1: '累计巡视次数',
    total: 0,
    t2: '今日巡视次数：',
    day: 0,
    src: '@/assets/images/common/jlxs-card.png',
    list: [],
    line: [],
    loading: true
  },
  pzinfo: {
    t1: '累计旁站登记次数',
    total: 0,
    t2: '今日旁站登记次数：',
    day: 0,
    src: '@/assets/images/common/jlxs-card.png',
    list: [],
    line: [],
    loading: true
  },
  zlinfo: {
    t1: '累计监理指令下发次数',
    total: 0,
    t2: '今日监理指令下发次数：',
    day: 0,
    src: '@/assets/images/common/jlxs-card.png',
    list: [],
    line: [],
    loading: true
  }
})
// 点击
const cliclTitle = (e: string) => {
  selectSupervi(e)
}
// 点击
const cliclTitle1 = (e: string) => {
  getcountNumByDate(Number(e))
}

/** 监理巡视 */
const getOne = async () => {
  state.xsinfo.loading = true
  await electSuperv()
  await selectSupervi()
  state.xsinfo.loading = false
}
const electSuperv = async () => {
  const { code, data } = await selectSupervisionPatrolCountAndStatusData()
  // console.log(res, 'res')
  if (code === 200) {
    setInfoList(state.xsinfo, data)
  }
}
const selectSupervi = async (val: string = '1') => {
  state.xsinfo.line = []
  // 1-近7天 2-近30天
  const { code, data } = await selectSupervisionPatrolCountDistributionData({ timeType: val })
  // console.log(code, data)
  if (code === 200) {
    state.xsinfo.line = data
  }
}

/** 监理旁站 */
const getTwo = async () => {
  state.pzinfo.loading = true
  await selectSupervis()
  await selectBeside()
  state.pzinfo.loading = false
}
const selectSupervis = async () => {
  const { code, data } = await selectSupervisionBesideCountAndStatusData()
  if (code === 200) {
    setInfoList(state.pzinfo, data)
  }
}
const selectBeside = async () => {
  const { code, data } = await selectBesideProjectCountDistributionData()
  if (code == 200) {
    state.pzinfo.line = data
  }
}

/** 监理指令 */
const getTreeh = async () => {
  state.zlinfo.loading = true
  await gountNum()
  await statusDistri()
  await getcountNumByDate()
  state.zlinfo.loading = false
}
const gountNum = async () => {
  const { code, data } = await countNum()
  if (code === 200) {
    state.zlinfo.total = data.totalNum
    state.zlinfo.day = data.todayNum
  }
}
const statusDistri = async () => {
  const { code, data } = await statusDistribute()
  if (code === 200) {
    const list: item[] = []
    const count = data
      .map((e: any) => e.num)
      .reduce((accumulator: any, currentValue: any) => accumulator + currentValue)
    data.map((e: any) => {
      if (e.status === '已完成') {
        list.push({
          name: e.status,
          value: e.num,
          rate: Number((e.num / count).toFixed(2)) * 100,
          itemStyle: {
            color: '#2D9BFC'
          }
        })
      } else if (e.status === '处理中') {
        list.push({
          name: e.status,
          value: e.num,
          rate: Number((e.num / count).toFixed(2)) * 100,
          itemStyle: {
            color: '#EF9832'
          }
        })
      } else if (e.status === '未启动') {
        list.push({
          name: e.status,
          value: e.num,
          rate: Number((e.num / count).toFixed(2)) * 100,
          itemStyle: {
            color: '#6B46D6'
          }
        })
      }
    })
    state.zlinfo.list = list
  }
}
const getcountNumByDate = async (val: number = 1) => {
  const { code, data } = await countNumByDate({ timeFlag: val - 1 })
  if (code === 200) {
    state.zlinfo.line = data
  }
}

const setInfoList = (key: any, data: CardData) => {
  if (data?.todayPatrolStatusData || data?.totalPatrolStatusData) {
    key.total = data.totalPatrolCount
    key.day = data.todayPatrolCount
    const name = [
      {
        n: '已完成',
        k: 'passNum',
        c: '#2D9BFC'
      },
      {
        n: '处理中',
        k: 'watiNum',
        c: '#EF9832'
      },
      {
        n: '未启动',
        k: 'returnNum',
        c: '#6B46D6'
      }
    ]
    const list: item[] = []
    name.map((e) => {
      const l: string = (data.totalPatrolStatusData[e.k] / data.totalPatrolCount).toFixed(2)
      list.push({
        name: e.n,
        value: data.totalPatrolStatusData[e.k],
        rate: Number(l) * 100,
        itemStyle: {
          color: e.c
        }
      })
    })
    key.list = list
  }
}
// 初始化
onMounted(() => {
  getOne()
  getTwo()
  getTreeh()
})

const visibles = ref<boolean>(false)
const frameCu = reactive({
  name: 0
})
const detailsall = () => {
  frameCu.name = 0
  visibles.value = true
}
</script>

<style scoped lang="scss">
.supervisionStatistics {
  padding: 45px 38px 0px 36px;
  .item-card {
    height: 142px;
    :deep(.el-loading-mask) {
      background-color: transparent;
    }
  }
  .item-pie {
    width: 400px;
  }
  .item-line {
    width: calc(100% - 400px - 32px - 32px - 296px);
  }
}
</style>
