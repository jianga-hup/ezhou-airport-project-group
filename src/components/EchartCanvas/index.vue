<!--
* @description
* @fileName index.vue 封装的Echarts图表，可以传递options来展示图表也可以根据initEcharts方法来
* @author
* @date 2024/01/24 17:21:40
!-->
<template>
  <div ref="chartRef" :id="id" :class="classMain" class="uno-wh-full" :style="{ width: width, height: height }" />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import theme from './style/theme.json' // 引入默认主题

defineOptions({
  name: 'Echarts'
})

/** 定义echrts接口 */
interface EchartsProps {
  options: echarts.EChartsOption
  classMain: string
  width?: string
  height?: string
  id?: string
}

const props = withDefaults(defineProps<EchartsProps>(), {
  options: () => ({}),
  classMain: 'chart'
})

let myChart: echarts.ECharts
const chartRef = ref<HTMLElement>()
const _resizeHandler = ref()

const handlerResize = () => {
  myChart.resize()
}
// 初始化
onMounted(() => {
  // 定义实例
  echarts.registerTheme('myTheme', theme) // 覆盖默认主题
  myChart = echarts.init(chartRef.value as unknown as HTMLDivElement, 'myTheme')
  initEcharts()
})

// 初始化图表
/**
 * 初始化echart
 * @param data 数据项
 * @param clearCaching 是否清除缓存
 */
const initEcharts = (data?: any, clearCaching = false) => {
  if (props.options == null) return
  if (data || props.options) {
    myChart?.setOption(data || props.options, clearCaching)
    addResize()
  }
}

// 即将销毁时
onBeforeUnmount(() => {
  myChart.clear()
  myChart.dispose()
  removeResize()
})

// 监听
watch(
  () => props.options,
  (val) => {
    if (myChart) {
      initEcharts(val)
    }
  },
  { deep: true }
)

// 自适应
const addResize = () => (_resizeHandler.value = window.addEventListener('resize', handlerResize)) // TODO debounce
const removeResize = () => {
  if (_resizeHandler.value) window.removeEventListener('resize', _resizeHandler.value)
}

// 切换组件时消除自适应
onDeactivated(() => removeResize())

// 对外暴露接口
defineExpose({
  chartRef,
  initEcharts
})
</script>

<style scoped></style>
