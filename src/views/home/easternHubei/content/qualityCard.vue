<!--
* @description 质量信息的小卡片组件
* @fileName qualityCard.vue
* @author 
* @date 2024/02/21 16:12:55
!-->
<template>
  <div class="quality-card" :class="[selected.includes(item.id) ? 'show' : 'hide']" @click="hendck">
    <div class="card-header pt-8px text-center">{{ item.name }}</div>
    <div class="card-count pt-7px text-center">{{ item.count }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Tabs {
  name: string
  count: number
  id: string
}
interface Props {
  item: Tabs
  selected: string[]
}
const props = withDefaults(defineProps<Props>(), {})
const item = props.item
const selfEmit = defineEmits(['cliclCard'])
const hendck = () => {
  selfEmit('cliclCard', item.id)
}
</script>

<style scoped lang="scss">
.quality-card {
  position: relative;
  min-width: 140px;
  height: 72px;
  cursor: pointer;
  .card-header {
    font-size: 16px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    line-height: 19px;
  }
  .card-count {
    font-size: 28px;
    font-family: DIN, DIN;
    font-weight: bold;
    line-height: 33px;
  }
}
.show {
  background: url('@/assets/images/home/content/quality_card_active.png');
  background-size: 100% 100%;
  .card-header {
    color: #fff;
  }
  .card-count {
    color: #2cb5ff;
  }
}
.hide {
  background: url('@/assets/images/home/content/quality_card.png');
  background-size: 100% 100%;
  .card-header {
    color: #cccccc;
  }
  .card-count {
    color: rgba(29, 123, 173, 0.8);
  }
}
</style>
