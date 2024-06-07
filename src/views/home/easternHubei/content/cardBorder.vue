<!--
* @description 卡片四个角边框
* @fileName cardBorder.vue
* @author
* @date 2024/01/29 17:45:01
!-->
<template>
  <div class="card-border p-9px">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.card-border {
  // width: 434px;
  min-height: 97px;
  // background: rgba(0, 43, 52, 0.08);
  // border: 1px solid rgba(44, 181, 255, 0.8);
  background:
    linear-gradient(to left, #3af3fe, #1c75ac) left top no-repeat,
    linear-gradient(to bottom, #3af3fe, #1c75ac) left top no-repeat,
    linear-gradient(to left, #3af3fe, #1c75ac) right top no-repeat,
    linear-gradient(to bottom, #3af3fe, #1c75ac) right top no-repeat,
    linear-gradient(to left, #3af3fe, #1c75ac) left bottom no-repeat,
    linear-gradient(to bottom, #3af3fe, #1c75ac) left bottom no-repeat,
    linear-gradient(to left, #3af3fe, #1c75ac) right bottom no-repeat,
    linear-gradient(to left, #3af3fe, #1c75ac) right bottom no-repeat,
    rgba(0, 43, 52, 0.08);
  border: 1px solid rgba(44, 181, 255, 0.8);
  background-size:
    1px 10px,
    10px 1px,
    1px 10px,
    10px 1px;
}
</style>
