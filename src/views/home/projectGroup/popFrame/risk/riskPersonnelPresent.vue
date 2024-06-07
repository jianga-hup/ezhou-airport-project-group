<!--
* @description 在场人员
* @fileName riskPersonnelPresent.vue
* @author
* @date 2024/05/07 09:29:55
!-->
<template>
  <CardTitle :show="true" title="在场人员" />
  <div class="riskPersonnelPresent mt12px">
    <div class="schedule-text uno-flex-between-center">
      <div class="t1">人数即将满载(满载{{ rightInfo?.expectedPersonnel || 0 }})</div>
      <div class="count">{{ rightInfo?.rate == null ? 0 : rightInfo?.rate }}%</div>
    </div>
    <div class="mt8px schedule-view h-10px">
      <div class="box h-10px" :style="{ width: (rightInfo?.rate == null ? 0 : Number(rightInfo?.rate)) + '%' }" />
    </div>
    <div class="mt13px uno-flex-between-center">
      <div class="uno-flex-y-center">
        <img src="@/assets/images/xmq/risk_dqzcrs.png" width="41" height="35" class="mr9px" />
        <div class="t1">当前在场人数</div>
      </div>
      <div class="uno-flex-baseline">
        <span class="count1">{{ rightInfo?.total || 0 }}</span>
        <span class="unit ml4px">人</span>
      </div>
    </div>
    <!-- <div class="mt12px uno-flex-between-center">
      <div class="present pre1">
        <div class="absolute left-53px -top-6px">
          <span class="count2">10</span>
          <span class="unit ml3px">人</span>
        </div>
        <div class="absolute left-53px top-23px t3">施工人员</div>
      </div>
      <div class="present pre2">
        <div class="absolute left-53px -top-6px">
          <span class="count2">10</span>
          <span class="unit ml3px">人</span>
        </div>
        <div class="absolute left-53px top-23px t3">管理人员</div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  rightInfo: {
    type: Object,
    default: () => ({})
  }
})

const rightInfo = props.rightInfo
</script>

<style scoped lang="scss">
.riskPersonnelPresent {
  .t1,
  .unit {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #c7e9fd;
    line-height: 21px;
  }
  .schedule-text {
    .count {
      font-family: DINCond-Black, DINCond-Black;
      font-weight: 400;
      font-size: 20px;
      color: #1f93ff;
      line-height: 23px;
    }
  }
  .schedule-view {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    .box {
      background: #1f93ff;
      border-radius: 50px;
    }
  }
  .count1,
  .count2 {
    font-family: DINCond-Black, DINCond-Black;
    font-weight: 400;
    font-size: 24px;
    color: #f4fafe;
    line-height: 28px;
  }
  .count2 {
    font-size: 20px;
    line-height: 23px;
  }
  .unit {
    font-weight: 400;
    font-size: 16px;
    color: #f4fafe;
    line-height: 19px;
  }
  .present {
    width: 189px;
    height: 48px;
    position: relative;
  }
  .pre1 {
    background: url('@/assets/images/xmq/risk_sgry.png') no-repeat;
    background-size: 100% 100%;
  }
  .pre2 {
    background: url('@/assets/images/xmq/risk_glry.png') no-repeat;
    background-size: 100% 100%;
  }
  .t3 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #e0f2fe;
    line-height: 19px;
  }
}
</style>
