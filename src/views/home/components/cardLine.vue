<!--
* @description 卡片样式线条
* @fileName cardLine.vue
* @author
* @date 2024/04/25 15:11:35
!-->
<template>
  <div class="topcard" :style="{ height: height + 'px', width: width + 'px' }">
    <li class="li" />
    <div class="box">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  height: number
  width: number
}
withDefaults(defineProps<Props>(), {
  height: 90,
  width: 930
})
</script>

<style scoped lang="scss">
.topcard {
  position: relative;
  // width: 930px;
  // height: 90px;
  background: rgba(0, 28, 61, 0.3);
  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-image: linear-gradient(180deg, rgba(33, 202, 255, 0), rgba(33, 202, 255, 1)) 1 1;
    animation: animate 8s linear infinite;
  }
  &::after {
    animation-delay: -4s;
  }
  .li {
    position: absolute;
    top: 0px;
    right: 83px;
    width: 6px;
    height: 3px;
    background: #21caff;
    transform: rotate(-45deg);
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      right: 5px;
      width: 100%;
      height: 100%;
      background: #21caff;
    }
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      right: 10px;
      width: 100%;
      height: 100%;
      background: #21caff;
    }
  }
  .box {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 12px;
      height: 2px;
      background: #21caff;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0px;
      right: 0px;
      width: 83px;
      height: 2px;
      background: linear-gradient(270deg, #21caff 0%, rgba(33, 202, 255, 0) 100%);
    }
  }
}

@keyframes animate {
  0%,
  100% {
    clip-path: inset(0 0 calc(100% - 1px) 0);
  }
  25% {
    clip-path: inset(0 calc(100% - 1px) 0 0);
  }
  50% {
    clip-path: inset(calc(100% - 1px) 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 calc(100% - 1px));
  }
}
li {
  all: unset;
}
</style>
