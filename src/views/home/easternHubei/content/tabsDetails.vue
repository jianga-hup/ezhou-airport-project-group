<!--
* @description tabs页
* @fileName tabsDetails.vue
* @author 
* @date 2024/02/28 19:57:50
!-->
<template>
  <div class="tabsDetails flex">
    <div
      class="tabs-item mr-32px"
      @click="hendck(i)"
      :class="{ hover: modelValue === i }"
      v-for="(e, i) in tabs"
      :key="i"
    >
      {{ e }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  tabs: string[]
  modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0
})
const tabs = props.tabs
const selfEmit = defineEmits(['update:modelValue'])
const hendck = (id: number) => {
  selfEmit('update:modelValue', id)
}
</script>

<style scoped lang="scss">
.tabsDetails {
  .tabs-item {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 28px;
    line-height: 42px;
    letter-spacing: 4px;
    background: linear-gradient(180deg, #ffffff 0%, #a3c3ff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    opacity: 0.6;
  }
  .hover {
    position: relative;
    font-size: 36px;
    opacity: 1;
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      bottom: -9px;
      width: 123px;
      height: 7px;
      background: url('@/assets/images/common/statisticalPopFrame-line.png');
      background-size: 100% 100%;
    }
  }
}
</style>
