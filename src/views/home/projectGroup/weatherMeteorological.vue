<!--
* @description 实时天气
* @fileName weatherMeteorological.vue
* @author
* @date 2024/05/11 17:00:54
!-->
<template>
  <CardTitle :show="true" title="实时天气" />
  <div class="weatherMeteorological mt12px h-238px overflow-y-auto">
    <div class="unit-title2">鄂州天气</div>
    <div class="mt12px uno-flex-between-center">
      <div class="weather text-center" v-for="(e, i) in weather.ez" :key="i">
        <div class="t1">{{ getYear(e.date) }}</div>
        <img
          class="wihi-30 mt1px mb2px"
          :src="
            viteImages(
              `@/assets/images/weather/${
                e.text_day === '霾'
                  ? '雾'
                  : e.text_day === '扬沙'
                    ? '沙尘暴'
                    : e.text_day === '阵雨'
                      ? '雷阵雨'
                      : e.text_day
              }.png`
            )
          "
        />
        <div class="t1">{{ e.low }}~{{ e.high }}℃</div>
      </div>
    </div>
    <div class="unit-title2 mt20px">黄石天气</div>
    <div class="mt12px uno-flex-between-center">
      <div class="weather text-center" v-for="(e, i) in weather.hs" :key="i">
        <div class="t1">{{ getYear(e.date) }}</div>
        <img
          class="wihi-30 mt1px mb2px"
          :src="
            viteImages(
              `@/assets/images/weather/${
                e.text_day === '霾'
                  ? '雾'
                  : e.text_day === '扬沙'
                    ? '沙尘暴'
                    : e.text_day === '阵雨'
                      ? '雷阵雨'
                      : e.text_day
              }.png`
            )
          "
        />
        <div class="t1">{{ e.low }}~{{ e.high }}℃</div>
      </div>
    </div>
    <div class="unit-title2 mt20px">黄冈天气</div>
    <div class="mt12px uno-flex-between-center">
      <div class="weather text-center" v-for="(e, i) in weather.hg" :key="i">
        <div class="t1">{{ getYear(e.date) }}</div>
        <img
          class="wihi-30 mt1px mb2px"
          :src="
            viteImages(
              `@/assets/images/weather/${
                e.text_day === '霾'
                  ? '雾'
                  : e.text_day === '扬沙'
                    ? '沙尘暴'
                    : e.text_day === '阵雨'
                      ? '雷阵雨'
                      : e.text_day
              }.png`
            )
          "
        />
        <div class="t1">{{ e.low }}~{{ e.high }}℃</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils/index'
import { getWeatherBySectionWay } from '@/api/weather'
import { onMounted, reactive, nextTick } from 'vue'

interface Weather {
  date: string
  text_day: string
  low: number
  high: number
}

const weather = reactive<{ hs: Weather[]; hg: Weather[]; ez: Weather[] }>({
  hs: [],
  hg: [],
  ez: []
})

/** 初始化 */
const init = () => {
  getWeather(0)
  getWeather(1)
  getWeather(2)
}

/** 天气接口 */
const getWeather = async (inx: number) => {
  const weathers = [
    [420200, 30.22007, 115.077048],
    [421100, 30.447711, 114.879365],
    [420700, 30.396536, 114.890593]
  ]
  const { code, data } = await getWeatherBySectionWay({
    districtId: weathers[inx][0],
    latitude: weathers[inx][1],
    longitude: weathers[inx][2]
  })
  if (code === 200) {
    // return data.forecasts
    if (inx === 0) {
      weather.hs = data.forecasts
    } else if (inx === 1) {
      weather.hg = data.forecasts
    } else if (inx === 2) {
      weather.ez = data.forecasts
    }
    console.log('天气', weather.hs, weather.hg, weather.ez)
  }
}

/** 优化年份 */
const getYear = (date: string) => {
  return date.slice(5)
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss">
.weatherMeteorological {
  &::-webkit-scrollbar {
    display: none;
  }
}
.weather {
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 19px;
  }
}
</style>
