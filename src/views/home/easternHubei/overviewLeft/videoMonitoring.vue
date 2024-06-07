<!--
* @description 视频监控
* @fileName videoMonitoring.vue
* @author
* @date 2024/01/29 17:27:23
!-->
<template>
  <div class="video-monitoring mt-30px">
    <CardTitle :show="true" title="视频监控">
      <div class="xq text-center p-e-a">视频监控</div>
    </CardTitle>
    <div class="video-content mt-12px" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.video-monitoring {
  .xq {
    position: absolute;
    top: -5px;
    right: -6px;
    width: 82px;
    height: 26px;
    background: linear-gradient(90deg, rgba(0, 113, 198, 0), rgba(0, 113, 198, 0.7));
    border: 1px solid rgba(0, 113, 198, 0.8);
    font-size: 14px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 16px;
    cursor: pointer;
    line-height: 24px;
  }
  .video-content {
    width: 100%;
    height: 172px;
    border-radius: 1px;
    border: 1px solid #2cb5ff;
  }
}
</style>
