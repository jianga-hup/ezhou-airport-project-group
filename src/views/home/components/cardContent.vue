<!--
* @description 卡片内容
* @fileName cardContent.vue
* @author
* @date 2024/04/10 14:47:51
!-->
<template>
  <div class="cardContent pl12px pr12px pb8px">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.cardContent {
  position: relative;
  width: 100%;
  background: rgba(0, 32, 68, 0.4);
  overflow-y: auto;
  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(192, 223, 255, 1);
    animation: animate 8s linear infinite;
  }
  &::after {
    animation-delay: -4s;
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
</style>
