<!--
* @description 图表展示信息
* @fileName chartShow.vue
* @author 
* @date 2024/02/27 14:09:19
!-->
<template>
  <div class="chartShow">
    <div v-for="(e, i) in names" :key="i">
      <div class="uno-flex-x-between uno-flex-y-center mb-13px" v-if="i === 0">
        <div class="uno-flex-y-center">
          <img src="@/assets/images/common/chart-pie.png" class="wihi-24 mr-2px" />
          <div class="t1">{{ e }}</div>
        </div>
        <div class="count">{{ counts[i] }}%</div>
      </div>
      <div class="uno-flex-x-between uno-flex-y-center mb-16px" v-else>
        <div class="uno-flex-y-center pl-8px">
          <div class="wihi-10 mr-6px" :style="`background: ${color[i - 1]}`" />
          <div class="t1">{{ e }}</div>
        </div>
        <div class="count1">{{ counts[i] }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  names: string[]
  counts: any[]
  color: string[]
}
const props = withDefaults(defineProps<Props>(), {
  color: () => ['#2D9BFC', '#EF9832']
})
const names = props.names
const counts = props.counts
</script>

<style scoped lang="scss">
.chartShow {
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #e0f2fe;
    line-height: 19px;
  }
  .count {
    font-family: DIN, DIN;
    font-weight: bold;
    font-size: 22px;
    color: #e0f2fe;
    line-height: 28px;
  }
  .count1 {
    font-family: DINCond-Black, DINCond-Black;
    font-weight: 400;
    font-size: 18px;
    color: #e0f2fe;
    line-height: 23px;
  }
}
</style>
