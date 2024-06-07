<!--
* @description 标签页切换
* @fileName tabs.vue
* @author
* @date 2024/01/30 15:28:35
!-->
<template>
  <div class="tabs flex">
    <div
      :class="[
        `tabs-item text-center`,
        {
          active: props.modelValue === e.id
        }
      ]"
      v-for="e in list"
      :key="e.id"
      @click="hendck(e.id as number)"
    >
      {{ e.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Tabs {
  name: string
  id: number | string
}
interface Props {
  list: Tabs[]
  modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0
})
const list = props.list
const selfEmit = defineEmits(['update:modelValue'])
const hendck = (id: number) => {
  selfEmit('update:modelValue', id)
}
</script>

<style scoped lang="scss">
.tabs {
  .tabs-item {
    width: 82px;
    height: 26px;
    border: 1px solid rgba(0, 113, 198, 0.8);
    font-size: 14px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    cursor: pointer;
    border-right: none;
    &:last-child {
      border-right: 1px solid rgba(0, 113, 198, 0.8);
    }
  }
  .active {
    color: #ffffff;
    background: rgba(0, 113, 198, 0.7);
  }
}
</style>
