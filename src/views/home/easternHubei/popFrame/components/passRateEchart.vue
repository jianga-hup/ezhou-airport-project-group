<!--
* @description 合格率图表
* @fileName passRateEchart.vue
* @author 
* @date 2024/02/27 13:49:45
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 145px; height: ${height}px`" />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { reactive, onMounted, nextTick } from 'vue'
interface Props {
  height: number
  rate: string
}
const props = withDefaults(defineProps<Props>(), {
  height: 103
})
const rate = Number(props.rate)
const chartOpt = reactive<{ series: any[] }>({ series: [] })

const init = () => {
  chartOpt.series = [
    {
      name: '内部圈',
      type: 'gauge',
      z: 2,
      splitNumber: 10,
      radius: '110%',
      center: ['50%', '60%'],
      axisLine: {
        lineStyle: {
          color: [[1, '#288FFE']],
          width: 1,
          shadowColor: 'rgba(145,207,255,.5)',
          shadowBlur: 6,
          shadowOffsetX: 0
        }
      },
      tooltip: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      detail: {
        show: false
      },
      title: {
        //标题
        show: false
      },
      data: [
        {
          name: 'title',
          value: 100
        }
      ],
      itemStyle: {
        color: 'rgba(145,207,255,1)'
      },
      pointer: {
        show: false
      },
      animationDuration: 4000
    },
    {
      name: '内部进度条',
      type: 'gauge',
      radius: '95%',
      center: ['50%', '60%'],
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          color: [
            [
              rate / 100,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#288FFE'
                },
                {
                  offset: 1,
                  color: '#2831FE'
                }
              ])
            ],
            [1, '#303C61']
          ],
          width: 4
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      itemStyle: {
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
          name: 'title',
          value: 100
        }
      ],
      pointer: {
        show: false
      }
    },
    {
      name: '内部阴影',
      type: 'gauge',
      radius: '95%',
      center: ['50%', '60%'],
      z: 4,
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          color: [
            [
              rate / 100,
              new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(40, 143, 254, 0.1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(40, 143, 254, 0.5)'
                },
                {
                  offset: 1,
                  color: 'rgba(40, 143, 254, 0)'
                }
              ])
            ],
            [1, 'rgba(28,128,245,.0)']
          ],
          width: 80
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      itemStyle: {
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
          name: 'title',
          value: 100
        }
      ],
      pointer: {
        show: false
      }
    },
    {
      type: 'pie',
      name: '内层细圆环',
      z: 5,
      radius: ['50%', '51%'],
      center: ['50%', '60%'],
      hoverAnimation: false,
      clockWise: false,
      itemStyle: {
        // normal: {
        color: '#288FFE'
        // }
      },
      label: {
        show: false
      },
      data: [100]
    },
    {
      //指针上的圆
      type: 'pie',
      z: 6,
      tooltip: {
        show: false
      },
      hoverAnimation: false,
      legendHoverLink: false,
      radius: ['0%', '49%'],
      center: ['50%', '60%'],
      label: {
        // normal: {
        show: false
        // }
      },
      labelLine: {
        // normal: {
        show: false
        // }
      },
      data: [
        {
          value: 100,
          itemStyle: {
            // normal: {
            color: '#303C61'
            // }
          }
        }
      ]
    },
    {
      tooltip: {
        show: false
      },
      name: 'wrap',
      type: 'pie',
      hoverAnimation: false,
      legendHoverLink: false,
      center: ['50%', '60%'],
      radius: ['0%', '24%'],
      z: 9,
      label: {
        // normal: {
        show: false,
        position: 'center',
        // },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        // normal: {
        show: false
        // }
      },
      data: [
        {
          value: 87,
          itemStyle: {
            // normal: {
            color: '#4D87FF',
            // },
            emphasis: {
              color: '#4D87FF'
            }
          }
        }
      ]
    },
    //白点
    {
      tooltip: {
        show: false
      },
      name: 'wrap',
      type: 'pie',
      hoverAnimation: false,
      legendHoverLink: false,
      center: ['50%', '60%'],
      radius: ['0%', '10%'],
      z: 13,
      label: {
        // normal: {
        show: false,
        position: 'center',
        // },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        // normal: {
        show: false
        // }
      },
      data: [
        {
          value: 87,
          itemStyle: {
            // normal: {
            color: '#fff',
            // },
            emphasis: {
              color: '#fff'
            }
          }
        }
      ]
    },
    //内圈刻度尺
    {
      name: '刻度尺',
      type: 'gauge',
      z: 10,
      radius: '90%',
      center: ['50%', '60%'],
      splitNumber: 3,
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [
            [0.8, '#00B3FE'],
            [1, '#212D43']
          ],
          width: 35,
          opacity: 0 //刻度背景宽度
        }
      },
      data: [
        {
          show: false,
          value: rate
        }
      ],
      markPoint: {
        show: false
      },
      axisLabel: {
        show: false
      },
      pointer: {
        show: true,
        length: '80%',
        width: 5 //指针粗细
      },
      itemStyle: {
        // normal: {
        color: '#4D87FF' //指针颜色
        // }
      },
      axisTick: {
        show: false
      },
      detail: {
        show: 0
      },
      splitLine: {
        length: 0, //刻度节点线长度
        lineStyle: {
          width: 3,
          color: '#222E48'
        } //刻度节点线
      }
    }
  ]
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss"></style>
