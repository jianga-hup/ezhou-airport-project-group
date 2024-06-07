const echartConfig = {
  loading: {
    text: '加载中',
    color: '#4179B3',
    textColor: '#4179B3',
    maskColor: 'rgba(255, 255, 255, 0.1)'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 2,
        type: 'solid',
        shadowBlur: 4,
        shadowColor: '#008BD7',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#008BD7' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(47, 180, 253, 0.3)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
    },
    textStyle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 14
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
  color: ['#29DDF1', '#009EEB', '#19D08E', '#F5AB24', '#EE6351', '#33ccff', '#6699ff', '#3366ff', '#0033ff', '#006666'],
  colorList: [
    ['#00D0FF', 'rgba(0, 208, 255, 1)', 'rgba(0, 208, 255, 0.6)'],
    ['#51DF9D', 'rgba(81, 223, 157, 1)', 'rgba(81, 223, 157, 0.6)'],
    ['#FFD538', 'rgba(255, 213, 56, 1)', 'rgba(255, 213, 56, 0.6)'],
    ['#FF710F', 'rgba(255, 113, 15, 1)', 'rgba(255, 113, 15, 0.6)'],
    ['#FF5650', 'rgba(255, 86, 80, 1)', 'rgba(255, 86, 80, 0.6)']
  ],
  legend: {
    top: 0,
    left: 'left',
    icon: 'rect',
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: '#8C8C8C'
    }
  },
  grid: {
    top: '60px',
    right: '16px',
    left: '16px',
    bottom: '0px',
    borderColor: '#0d1c38',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.15)'
      }
    },
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 12
    },
    axisPointer: {
      show: true
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.15)'
      }
    },
    data: []
  },
  yAxis: [
    {
      type: 'value',
      name: '',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'solid'
        }
      }
    },
    {
      type: 'value',
      name: '',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'solid'
        }
      }
    }
  ],
  dataZoom: {
    show: true,
    bottom: 0,
    start: 50,
    end: 100,
    height: 12,
    handleIcon:
      'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '100%',
    handleStyle: {
      color: '#90979c'
    },
    textStyle: {
      color: '#fff'
    },
    borderColor: '#90979c'
  },
  gradient(dir: any, start = '', end = '', type = 'linear') {
    return {
      color: {
        type,
        ...dir,
        colorStops: [
          {
            offset: 0,
            color: start // 0% 处的颜色
          },
          {
            offset: 1,
            color: end // 100% 处的颜色
          }
        ]
      }
    }
  }
}

export default echartConfig
