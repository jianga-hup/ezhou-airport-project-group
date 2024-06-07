<!--
* @description 进度统计-图表
* @fileName progressSatisticsEchart.vue
* @author
* @date 2024/01/30 13:49:40
!-->
<template>
  <Echart ref="chartRef" :options="options" class="uno-wh-full" />
  <!-- <div class="progress-echart"></div> -->
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as echarts from 'echarts'
const options = ref({})
interface Props {
  value: number | string // 仪表盘数据源
}
const props = withDefaults(defineProps<Props>(), {
  value: 0
})
const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: '#4FADFD' // 0% 处的颜色
  },
  {
    offset: 1,
    color: '#28E8FA' // 100% 处的颜色
  }
])
const init = () => {
  let clors = [
    [props.value, color],
    [1, '#173164']
  ]

  if (Number(props.value) === 0) {
    clors = [[1, '#173164']]
  }
  options.value = {
    backgroundColor: 'transparent',
    title: {
      show: false
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '40%'],
        startAngle: 90,
        endAngle: -249,
        splitNumber: 7,
        radius: '55%',
        pointer: {
          show: false
        },
        progress: {
          show: false,
          roundCap: true,
          width: 0
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 0,
            shadowBlur: 0,
            color: clors
          }
        },
        axisTick: {
          distance: -14,
          length: 10,
          splitNumber: 3,
          lineStyle: {
            width: 10,
            shadowBlur: 0,
            color: 'auto'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: []
      }
    ]
  }
}

// 监听
watch(
  () => props.value,
  () => {
    init()
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss"></style>
