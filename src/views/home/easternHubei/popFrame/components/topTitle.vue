<!--
* @description 统计页的头部文字组件
* @fileName topTitle.vue
* @author
* @date 2024/02/23 15:49:12
!-->
<template>
  <div class="topTitle">
    <div class="box" />
    <div class="flex items-center inner pl-12px pt-12px">
      <img src="@/assets/images/common/top-title-jt.png" width="26" height="25" />
      <div class="t1 ml-8px">{{ title }}</div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true
  }
})
const title = props.title
</script>

<style scoped lang="scss">
.topTitle {
  position: relative;
  .box {
    width: 100%;
    height: 48px;
    background: linear-gradient(280deg, rgba(0, 44, 80, 0) 0%, rgba(0, 44, 80, 0.94) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 2px solid;
    opacity: 0.5;
    border-image: linear-gradient(32deg, rgba(141, 220, 255, 0.71), rgba(44, 191, 255, 0)) 2 2;
  }
  .inner {
    position: absolute;
    top: 0px;
    left: 0px;
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 20px;
      color: #ffffff;
      line-height: 23px;
      letter-spacing: 1px;
    }
  }
}
</style>
