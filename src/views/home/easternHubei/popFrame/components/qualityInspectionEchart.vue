<!--
* @description 质检统计图表
* @fileName qualityInspectionEchart.vue
* @author
* @date 2024/02/27 19:31:30
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 100%; height: 130px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import * as echarts from 'echarts'
import { reactive, nextTick, onMounted } from 'vue'
interface Props {
  nAxis: string[]
  list: any[]
}
const props = withDefaults(defineProps<Props>(), {})
const chartOpt = reactive<any>({
  grid: {
    ...echartConfig.grid,
    top: '30%',
    left: 10,
    right: 15,
    bottom: 10
  },
  tooltip: {
    ...echartConfig.tooltip,
    trigger: 'axis'
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    right: 0,
    textStyle: {
      color: '#C7E9FD',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
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
    }
  },
  yAxis: {
    ...echartConfig.yAxis[0],
    minInterval: 10,
    type: 'value',
    axisLabel: {
      color: '#C9EEFF',
      fontSize: 16,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    },
    nameTextStyle: {
      color: '#C9EEFF',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC',
      align: 'right'
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        //分割线
        color: 'rgba(176,215,255,0.5)',
        type: 'dashed'
      }
    }
  },
  series: []
})

const init = () => {
  const list = props.list
  const name: string[] = props.nAxis
  if (name.length) {
    const x1: number[] = list.map((e) => e.c1)
    const x2: number[] = list.map((e) => e.c2)
    const x3: number[] = list.map((e) => e.c3)
    const t: string[] = list.map((e) => e.x)
    const x: [number[], number[], number[]] = [x1, x2, x3]
    const getAverage = (arr: number[]) => {
      const sum = arr.reduce((a, b) => a + b, 0) // 计算数组总和
      const average = (sum / arr.length).toFixed(1)
      return average
    }
    const result = getAverage([...x1, ...x2, ...x3])
    chartOpt.yAxis.minInterval = result
    const color = [
      ['rgba(44, 134, 240, 1)'],
      ['rgba(229, 151, 33, 1)'],
      ['rgba(72, 229, 33, 1)'],
      ['rgba(165, 12, 12, 1)'],
      ['rgba(229, 33, 209, 1)'],
      ['rgba(37, 33, 229, 1)']
    ]
    chartOpt.xAxis.data = t
    const series: any[] = []
    x.forEach((e, i) => {
      series.push({
        name: name[i],
        type: 'bar',
        barWidth: '5%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color[i][0]
            },
            {
              offset: 0.48,
              color: color[i][0]
            },
            {
              offset: 1,
              color: color[i][0]
            }
          ])
        },
        data: e
      })
    })
    chartOpt.series = series
  }
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss"></style>
