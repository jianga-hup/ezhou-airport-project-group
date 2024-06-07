<!--
* @description 线性图表
* @fileName issuanceTimesEchart.vue
* @author
* @date 2024/02/26 10:48:03
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :id="id + 'char'" :style="`width: 100%; height: ${height}px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import * as echarts from 'echarts'
import { reactive, watch, nextTick } from 'vue'
interface Props {
  id: string
  yTitle: string
  list: any[]
  kyes: string[]
  height: number
  name: string
  dashed: boolean
}
const props = withDefaults(defineProps<Props>(), {
  yTitle: '',
  height: 120,
  name: '次数',
  dashed: false
})
const yTitle = props.yTitle
const chartOpt = reactive<any>({
  grid: {
    ...echartConfig.grid,
    top: '20%',
    left: 30,
    right: 15,
    bottom: 10
  },
  tooltip: {
    ...echartConfig.tooltip
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
    name: yTitle,
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
        type: 'solid'
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
const init = () => {
  if (props.dashed) {
    chartOpt.yAxis.splitLine.lineStyle.type = 'dashed'
  }
  const x = props.list.map((e) => e[props.kyes[0]])
  const time = props.list.map((e) => e[props.kyes[1]])
  chartOpt.xAxis.data = time
  const series = [
    {
      name: props.name,
      type: 'line',
      smooth: false,
      symbol: 'circle',
      symbolSize: 0,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#9AC9FF'
            },
            {
              offset: 1,
              color: '#1978E6'
            }
          ])
        }
      },
      data: x
    }
  ]
  chartOpt.series = series
}
// 监听
watch(
  () => props.list,
  () => {
    const char3d = document.getElementById(props.id + 'char')
    if (char3d) {
      const myChart = echarts.init(char3d)
      myChart && myChart.clear()
      myChart && myChart.setOption(chartOpt)
    }
    nextTick(() => {
      init()
    })
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss"></style>
