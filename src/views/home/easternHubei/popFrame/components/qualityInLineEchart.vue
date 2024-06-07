<!--
* @description 质检线行图表
* @fileName qualityInLineEchart.vue
* @author
* @date 2024/02/27 19:51:04
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 100%; height: 130px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import * as echarts from 'echarts'
import { reactive, onMounted, nextTick } from 'vue'
interface Props {
  nAxis: string[]
  list: any[]
}
const props = withDefaults(defineProps<Props>(), {})
const chartOpt = reactive<any>({
  grid: {
    ...echartConfig.grid,
    top: '30%',
    left: 30,
    right: 15,
    bottom: 10
  },
  tooltip: {
    ...echartConfig.tooltip
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    right: 0,
    icon: 'roundRect',
    textStyle: {
      color: '#C7E9FD',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    },
    itemStyle: {
      borderWidth: 0
    }
  },
  xAxis: {
    ...echartConfig.xAxis,
    type: 'category',
    data: [],
    axisLabel: {
      color: '#C9EEFF',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    },
    axisLine: {
      lineStyle: {
        //分割线
        color: 'rgba(176,215,255,0.8)'
      }
    }
  },
  yAxis: {
    ...echartConfig.yAxis[0],
    name: '万元',
    minInterval: 10,
    type: 'value',
    axisLabel: {
      color: '#C9EEFF',
      fontSize: 16,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    },
    splitLine: {
      lineStyle: {
        //分割线
        color: 'rgba(176,215,255,0.5)',
        width: 1,
        type: 'dashed'
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  series: []
})
const list = props.list
const init = () => {
  const x1: number[] = list.map((e) => e.c1)
  const x2: number[] = list.map((e) => e.c2)
  const x3: number[] = list.map((e) => e.c3)
  const time: string[] = list.map((e) => e.x)
  const x: number[][] = [x1, x2, x3]
  const name = props.nAxis
  const getAverage = (arr: number[]) => {
    const sum = arr.reduce((a, b) => a + b, 0) // 计算数组总和
    const average = (sum / arr.length).toFixed(1)
    return average
  }
  const result = getAverage([...x1, ...x2, ...x3])
  chartOpt.yAxis.minInterval = result
  const series: any[] = []
  const color = [
    ['#9AC9FF', '#1978E6'],
    ['#FFD09A', '#E67B19'],
    ['#C5FFB8', '#5DE93F']
  ]
  chartOpt.xAxis.data = time
  x.forEach((e, i) => {
    series.push({
      name: name[i],
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'none',
      symbolSize: 0,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: color[i][0]
          },
          {
            offset: 1,
            color: color[i][1]
          }
        ])
      },
      data: e
    })
  })
  chartOpt.series = series
}
onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss"></style>
