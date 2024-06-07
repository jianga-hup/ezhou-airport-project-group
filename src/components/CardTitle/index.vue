<!--
* @description 卡片头部标题
* @fileName index.vue
* @author
* @date 2024/01/29 15:34:08
!-->
<template>
  <div :class="[show ? 'cardHeader' : 'card-title flex items-center justify-between w-${width}px']">
    <div class="text">{{ title }}</div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CardTitle'
})
/** 卡片头部标题cardtitle接口 */
interface CardTitle {
  title: string // 标题
  width: string | number // 宽度
  show: boolean // 是否显示动态
}
const props = withDefaults(defineProps<CardTitle>(), {
  width: 440,
  title: '',
  show: false
})
const title = props.title
</script>

<style scoped lang="scss">
.cardHeader {
  position: relative;
  width: 410px;
  height: 27px;
  background: url('@/assets/images/animation/cardHeader.png');
  background-size: 100% 100%;
  .text {
    position: absolute;
    bottom: 6px;
    left: 17px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
    letter-spacing: 3px;
    background: linear-gradient(-180deg, #ffffff 0%, #a3c3ff 100%);
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
.card-title {
  // width: 440px;
  height: 55px;
  background: url('@/assets/images/menu/card-title.png');
  background-size: 100% 100%;
  padding: 10px 12px 0px 31px;
  .text {
    font-size: 20px;
    font-family:
      Source Han Sans SC,
      Source Han Sans SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 23px;
    letter-spacing: 1px;
  }
}
</style>
