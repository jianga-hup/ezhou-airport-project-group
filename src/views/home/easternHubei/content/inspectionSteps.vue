<!--
* @description 工序步骤条-横向
* @fileName inspectionSteps.vue
* @author
* @date 2024/02/23 10:43:44
!-->
<template>
  <div class="inspectionSteps flex flex-justify-around">
    <div class="flex steps-item" v-for="(e, i) in list" :key="i">
      <div :class="`steps${i} steps mr-6px mt-6px`" />
      <div class="text">
        <div class="count">
          {{ Number(parseFloat(e.count as string).toFixed(0)) }}<span>{{ e.unit }}</span>
        </div>
        <div class="t1 mt-4px">{{ e.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
interface Tabs {
  name: string // 名称
  count: number | string // 统计值
  unit?: string // 单位
}
const props = defineProps({
  list: {
    type: Array as PropType<Tabs[]>,
    required: true
  }
})
const list = props.list
</script>

<style scoped lang="scss">
.inspectionSteps {
  .steps-item {
    .steps {
      width: 3px;
      height: 42px;
    }
    .steps0 {
      background: url('@/assets/images/home/content/inspection-clz.png');
      background-size: 100% 100%;
    }
    .steps1 {
      background: url('@/assets/images/home/content/inspection-ycl.png');
      background-size: 100% 100%;
    }
    .steps2 {
      background: url('@/assets/images/home/content/inspection-cll.png');
      background-size: 100% 100%;
    }
    .text {
      .count {
        font-family: DIN, DIN;
        font-weight: bold;
        font-size: 20px;
        color: #ffffff;
        line-height: 24px;
      }
      .t1 {
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #bfe9ff;
        line-height: 20px;
      }
    }
  }
}
</style>
