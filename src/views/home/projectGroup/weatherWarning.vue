<!--
* @description 天气预警
* @fileName weatherWarning.vue
* @author
* @date 2024/05/13 10:23:36
!-->
<template>
  <CardTitle :show="true" title="天气预警" class="mt34px" />
  <div class="weatherWarning mt16px">
    <div class="weatherWarning-header pt11px uno-flex-around-center">
      <div class="text-center cursor-pointer" v-for="(e, i) in weather" :key="i">
        <div class="t1" :style="{ color: e.color }">{{ e.cnt }}</div>
        <div class="t2 mt2px">{{ e.level }}</div>
      </div>
    </div>
    <div class="mt15px inner">
      <template v-if="weathers.list.length">
        <div class="inner-item uno-flex-y-center" v-for="(e, i) in weathers.list" :key="i">
          <img src="@/assets/images/warning/冰雹橙色预警.png" class="w-64px h-52px mr12px" />
          <div class="text">
            <div class="ell">{{ e.content }}</div>
            <div class="font-400 mt8px">{{ e.publishTime }}</div>
          </div>
        </div>
      </template>
      <div v-else class="uno-flex-center w-100% h-420px">
        <img src="@/assets/images/menu/zwsj.png" class="wihi-200" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCmaWeatherAlarmInfo } from '@/api/weather'
import { reactive, onMounted, nextTick } from 'vue'
interface Weather {
  cnt: number
  level: string
  color: string
  list: { [key: string]: any }[]
}
const weather = reactive<Weather[]>([
  {
    cnt: 0,
    level: '红色预警',
    color: '#FF5650',
    list: []
  },
  { cnt: 0, level: '橙色预警', color: '#FF891B', list: [] },
  {
    cnt: 0,
    level: '黄色预警',
    color: '#F8D20C',
    list: []
  },
  { cnt: 0, level: '蓝色预警', color: '#1271FF', list: [] }
])
const weathers = reactive<{ list: { [key: string]: any }[] }>({
  list: []
})

/** 初始化 */
const init = async () => {
  const { code, data } = await getCmaWeatherAlarmInfo({
    levelCode: '',
    adCodes: '420200,421100,420700'
  })
  if (code === 200) {
    data.alarmCountItem.map((v2: { cnt: number; level: string }) => {
      weather.map((v1) => {
        // 如果当前的天气等级等于当前的等级，则将当前的等级的值加上当前的值
        const x = data.list.filter((e: { level: string; [key: string]: any }) => e.level === v2.level)
        if (v1.level === v2.level) {
          v1.cnt = v2.cnt
          v1.list = [...v1.list, ...x]
        }
      })
    })
    weathers.list = data.list
  }
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<style scoped lang="scss">
.weatherWarning {
  width: 411px;
  height: 547px;
  background: url('@/assets/images/xmq/weatherWarning.png');
  background-size: 100% 100%;
  &-header {
    .t1 {
      font-family: Quartz-Regular;
      font-weight: 400;
      font-size: 28px;
      line-height: 33px;
    }
    .t2 {
      font-family: PangMenZhengDao, PangMenZhengDao;
      font-weight: 400;
      font-size: 16px;
      color: #c7e9fd;
      line-height: 19px;
    }
  }
  .inner {
    width: 100%;
    &-item {
      height: 77px;
      position: relative;
      width: 100%;
      padding: 4px 19px 0px 19px;
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 1px;
        width: 410px;
        height: 1px;
        background: linear-gradient(90deg, #b3d9f5 0%, rgba(179, 217, 245, 0) 100%);
      }
      .text {
        width: calc(100% - 64px - 12px);
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #c7e9fd;
        line-height: 19px;
      }
    }
    &-item:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>
