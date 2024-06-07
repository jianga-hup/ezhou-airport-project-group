<!--
* @description 各月分析图表
* @fileName monthlyAnalysis.vue
* @author
* @date 2024/02/27 15:52:05
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 100%; height: 130px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import * as echarts from 'echarts'
import { reactive, nextTick, onMounted } from 'vue'
interface Props {
  xAxis: string[]
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
    minInterval: 10000,
    type: 'value',
    name: '生产量(方)',
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
const list = props.list

const init = () => {
  const name: string[] = props.list[0].map((e: any) => e.deptName)
  if (name.length) {
    const x: [number][] = []
    name.map((_, index) => {
      list.map((e) => {
        if (x[index] && x[index].length) {
          x[index].push(e[index].gujifangshu)
        } else {
          x.push([e[index].gujifangshu])
        }
      })
    })
    const color = [
      ['rgba(44, 134, 240, 1)'],
      ['rgba(229, 151, 33, 1)'],
      ['rgba(72, 229, 33, 1)'],
      ['rgba(165, 12, 12, 1)'],
      ['rgba(229, 33, 209, 1)'],
      ['rgba(37, 33, 229, 1)']
    ]
    chartOpt.xAxis.data = props.xAxis
    const series: any[] = []
    // console.log(x, 'xxxxxxx')
    x.forEach((e, i) => {
      series.push({
        name: name[i],
        type: 'bar',
        barWidth: '5%',
        itemStyle: {
          // normal: {
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
