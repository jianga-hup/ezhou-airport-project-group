<!--
* @description 项目概括+项目群概况
* @fileName projectOverview.vue
* @author
* @date 2024/04/08 13:56:31
!-->
<template>
  <CardTitle :show="true" title="项目群概况" />
  <div class="projectOverview flex">
    <div class="w-52% flex">
      <img src="@/assets/images/animation/xmlc.png" class="wihi-70" />
      <div class="text mt6px">
        <div class="t1">项目里程</div>
        <div><span class="count">73.87</span><span class="t1">公里</span></div>
      </div>
    </div>
    <div class="w-48% flex">
      <img src="@/assets/images/animation/ztz.png" class="wihi-70" />
      <div class="text mt6px">
        <div class="t1">总投资</div>
        <div><span class="count">139.68</span><span class="t1">亿</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// const tabs = [
//   {
//     label: '项目群概况',
//     value: '1'
//   },
//   {
//     label: '项目概况',
//     value: '2'
//   }
// ]
</script>

<style scoped lang="scss">
.projectOverview {
  .text {
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      line-height: 19px;
    }
    .count {
      font-family: DIN, DIN;
      font-weight: bold;
      font-size: 32px;
      color: #ffffff;
      line-height: 38px;
    }
  }
}
</style>
