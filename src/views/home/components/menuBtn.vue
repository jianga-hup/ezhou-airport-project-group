<!--
* @description 菜单切换按钮
* @fileName menuBtn.vue
* @author
* @date 2024/04/25 10:32:28
!-->
<template>
  <div class="menuBtn">
    <div class="menuBtn-item" :class="[item.id === modelValue ? 'active' : 'tive']" v-for="item in tabs" :key="item.id">
      <div class="pl52px item-box" @click="hendck(item.id)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Tabs {
  id: string
  name: string
}
interface Props {
  tabs: Tabs[]
  modelValue: string
}
withDefaults(defineProps<Props>(), {})

const selfEmit = defineEmits(['update:modelValue'])
const hendck = (id: string) => {
  selfEmit('update:modelValue', id)
}
</script>

<style scoped lang="scss">
.menuBtn {
  .menuBtn-item {
    width: 226px;
    height: 65px;
    font-family: PangMenZhengDao, PangMenZhengDao;
    font-weight: 400;
    font-size: 24px;
    line-height: 42px;
    color: #ffffff;
    background: url('@/assets/images/menu/icon_xz.png');
    background-size: 100% 100%;
    .item-box {
      cursor: pointer;
      width: 68%;
    }
  }
  .active {
    opacity: 1;
  }
  .tive {
    opacity: 0.4;
  }
}
</style>
