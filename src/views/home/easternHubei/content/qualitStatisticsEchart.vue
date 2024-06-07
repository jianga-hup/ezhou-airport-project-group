<!--
* @description 质量统计的进度图标
* @fileName qualitStatisticsEchart.vue
* @author
* @date 2024/01/30 16:33:42
!-->
<template>
  <Echart ref="chartRef" :options="options" class="w-100% h-80px" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
const options = ref({})
interface Props {
  rate: number // 仪表盘数据源
  text: string
}
const props = withDefaults(defineProps<Props>(), {
  rate: 0
})
const rich = {
  count: {
    fontSize: 20,
    color: '#D9F8FF',
    fontFamily: 'DINCond-Black, DINCond-Black'
  },
  unit: {
    color: '#D9F8FF',
    fontFamily: 'DINCond-Black, DINCond-Black',
    fontSize: 14
  }
}

const init = () => {
  const rate = props.rate ?? 0
  const text = props.text ?? ''
  options.value = {
    tooltip: {
      show: false
    },
    series: [
      {
        name: '刻度',
        type: 'gauge',
        center: ['50%', '70%'],
        radius: '125%',
        min: 0, //最小刻度
        max: 100, //最大刻度
        splitNumber: 8, //刻度数量
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          show: true,
          lineStyle: {
            width: 0,
            shadowBlur: 1,
            color: [
              [0, '#0FE4FF'],
              [1, '#0FE4FF']
            ]
          }
        }, //仪表盘轴线
        axisLabel: {
          show: false
        }, //刻度标签。
        axisTick: {
          show: true,
          splitNumber: 2,
          lineStyle: {
            color: 'auto',
            width: 1
          },
          length: -5
        }, //刻度样式
        splitLine: {
          show: false
        }, //分隔线样式
        pointer: {
          //仪表盘指针
          show: false
        },
        detail: {
          show: false
        },
        title: {
          show: false
        },
        data: [
          {
            value: rate,
            name: text
          }
        ]
      },
      {
        //类型
        type: 'gauge',
        //半径
        radius: 55,
        //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        //结束角度。
        endAngle: 0,
        center: ['50%', '70%'],
        //仪表盘轴线相关配置。
        axisLine: {
          show: true,
          // 属性lineStyle控制线条样式
          lineStyle: {
            width: 5,
            color: [
              [
                rate / 100,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(14, 116, 255, 0)'
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(14, 156, 255, 1)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(15, 195, 255, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(15, 228, 255, 1)'
                  }
                ])
              ],
              [
                1,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(14, 156, 255, 0.2)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(15, 195, 255, 0.2)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(15, 228, 255, 0)'
                  }
                ])
              ]
            ]
          }
        },
        //分隔线样式。
        splitLine: {
          show: false
        },
        //刻度样式。
        axisTick: {
          show: false
        },
        //刻度标签。
        axisLabel: {
          show: false
        },
        //仪表盘指针。
        pointer: {
          //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
          show: false,
          //指针长度
          length: '90%',
          width: 0
        },
        //仪表盘标题。
        title: {
          show: true,
          offsetCenter: [0, '20%'], // x, y，单位px
          textStyle: {
            color: '#2CB5FF'
          },
          fontSize: 18,
          fontFamily: 'PangMenZhengDao'
        },

        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, '-25%'],
          // formatter: '{value}' + '%',
          formatter: function (value: string | number) {
            return `{count|${value}}{unit|%}`
          },
          rich: rich
        },
        data: [
          {
            value: rate,
            name: text
          }
        ]
      }
    ]
  }
}

onMounted(() => {
  init()
})

// 监听
watch(
  () => props.rate,
  () => {
    init()
  }
)
</script>

<style scoped lang="scss"></style>
