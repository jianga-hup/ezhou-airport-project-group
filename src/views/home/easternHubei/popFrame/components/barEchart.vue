<!--
* @description 柱状图-立体
* @fileName barEchart.vue
* @author 
* @date 2024/02/26 15:17:24
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 100%; height: 120px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import * as echarts from 'echarts'
import { ref, nextTick, onMounted } from 'vue'
interface Props {
  list: { num: number; project: string }[]
}
const props = withDefaults(defineProps<Props>(), {})
const list = props.list
const chartOpt = ref({})
const init = () => {
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx: any, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x + 3, shape.y]
      const c1 = [shape.x - 13, shape.y - 3]
      const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 3]
      const c3 = [xAxisPoint[0] + 3, xAxisPoint[1]]
      ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
    }
  })
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx: any, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x + 3, shape.y]
      const c2 = [xAxisPoint[0] + 3, xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + 15, xAxisPoint[1] - 5]
      const c4 = [shape.x + 15, shape.y - 5]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx: any, shape) {
      const c1 = [shape.x + 3, shape.y]
      const c2 = [shape.x + 15, shape.y - 5] //右点
      const c3 = [shape.x - 2, shape.y - 8]
      const c4 = [shape.x - 14, shape.y - 3]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft)
  echarts.graphic.registerShape('CubeRight', CubeRight)
  echarts.graphic.registerShape('CubeTop', CubeTop)
  const VALUE = list.map((e) => e.num)
  const x = list.map((e) => e.project)
  const option = {
    backgroundColor: 'transparent',
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        const item = params[1]
        return item.name + ' : ' + item.value
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '20%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: x,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#7ebaf2'
        }
      },
      axisLabel: {
        color: '#C9EEFF',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular, PingFang SC'
      }
    },
    yAxis: {
      min: 0,
      ...echartConfig.yAxis[0],
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#C9EEFF',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular, PingFang SC'
      },
      boundaryGap: ['5%', '5%']
    },
    series: [
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(51, 173, 234, 0)'
                    },
                    {
                      offset: 1,
                      color: '#1E93BC'
                    }
                  ])
                }
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(51, 143, 234, 0)'
                    },
                    {
                      offset: 0.36,
                      color: 'rgba(51, 143, 234, 0.36)'
                    },
                    {
                      offset: 0.97,
                      color: 'rgba(51, 143, 234, 0.97)'
                    },
                    {
                      offset: 1,
                      color: '#338FEA'
                    }
                  ])
                }
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: '#27AFEA'
                }
              }
            ]
          }
        },
        data: VALUE
      },
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
            fontFamily: 'DINCond-Black, DINCond-Black',
            fontSize: 14,
            color: '#fff',
            offset: [2, -5]
          }
        },
        itemStyle: {
          color: 'transparent'
        },
        tooltip: {},
        data: VALUE
      }
    ]
  }
  chartOpt.value = option
}
onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss"></style>
