<!--
* @description 堆叠图-图表
* @fileName stackingDiagramEchart.vue
* @author
* @date 2024/04/25 15:57:37
!-->
<template>
  <Echart autoresize :options="chartOpt" theme="theme" :style="`width: 100%; height: 200px`" />
</template>

<script lang="ts" setup>
import echartConfig from '@/components/EchartCanvas/style/config'
import { ref, nextTick, onMounted, defineProps, watch } from 'vue'
import { xmqAQWorkers } from '@/api/home'

const props = defineProps({
  currentTenantId: {
    //滚动速度
    type: String,
    default: 'edgs'
  }
})

const chartOpt = ref<any>({
  title: {
    text: '项目',
    textStyle: {
      color: '#C9EEFF'
    },
    left: '16px',
    top: '16px'
  },
  grid: {
    ...echartConfig.grid,
    top: '20%',
    left: 10,
    right: 15,
    bottom: 10
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff'
      }
    },
    extraCssText: `z-index: 2;`,
    padding: 0,
    formatter: (param: any) => {
      const str = `<div class="chart-tooltip-top">${param[0].name}</div>`
      let content = ''
      for (let index = 0; index < param.length; index++) {
        const item = param[index]
        content += `<div>${item.marker}<span class="chart-tooltip-label">${item.seriesName}：</span><span class="chart-tooltip-value" style='color: ${item.color}'>${item.value}</span></div>`
      }
      return '<div class="chart-tooltip">' + str + '<div class="chart-tooltip-content">' + content + '</div>' + '</div>'
    },
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  legend: {
    itemWidth: 12,
    itemHeight: 12,
    right: 0,
    top: 10,
    textStyle: {
      color: '#C7E9FD',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    },
    data: []
  },
  calculable: true,
  xAxis: {
    ...echartConfig.xAxis,
    minInterval: 1,
    type: 'value',
    axisLine: {
      show: false
    },
    axisPointer: {
      type: 'none'
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.45)',
        type: 'dashed'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      interval: 0,
      color: '#C9EEFF',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC'
    }
  },
  yAxis: {
    ...echartConfig.yAxis[0],
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#C9EEFF',
      fontSize: 14,
      fontFamily: 'PingFangSC-Regular, PingFang SC',
      formatter: function (value: string) {
        // 如果需要根据值来决定是否换行，可以在这里添加逻辑
        return value.split('1').join('\n\r')
      }
    },
    splitArea: {
      show: false
    },

    data: []
  },
  series: []
})

const returnname = (value: string) => {
  const newName = value.replace('武汉至重庆高速公路', '')
  const len = newName.length
  if (len > 6 && len <= 12) {
    return newName.substring(0, 6) + '\n' + newName.substring(6, 12)
  } else if (len > 12) {
    return newName.substring(0, 6) + '\n' + newName.substring(6, 11) + '...'
  } else {
    return newName
  }
}

const init = async () => {
  const name = ref<any>([])
  // const name = ['机场高速二期', '武黄高速', '黄黄高速', '黄小高速']
  const color = ['#43E7B6', '#2D9BFC']
  const lwry: any = []
  const gly: any = []
  const res = await xmqAQWorkers({
    tenantId: props?.currentTenantId || 'edgs'
  })
  if (res.code === 200) {
    if (res.data.list.length) {
      res.data.list.map((item: any) => {
        name.value.push(item.tenantName)
        lwry.push(item.type1)
        gly.push(item.type3)
      })
      const data = [
        {
          name: '劳务人员',
          value: [...lwry]
        },
        {
          name: '管理人员',
          value: [...gly]
        }
      ]
      chartOpt.value.legend.data = data.map((e) => returnname(e.name))
      chartOpt.value.yAxis.data = name
      chartOpt.value.series = data.map((e, i) => {
        return {
          name: e.name,
          type: 'bar',
          stack: '总量',
          barMaxWidth: 25,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: e.value
        }
      })
    }
  }
}
watch(
  () => props.currentTenantId,
  () => {
    init()
  }
)
onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss"></style>
