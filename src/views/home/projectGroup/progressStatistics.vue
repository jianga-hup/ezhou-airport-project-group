<!--
* @description 进度统计
* @fileName progressStatistics.vue
* @author
* @date 2024/04/10 16:18:31
!-->
<template>
  <CardTitle :show="true" title="进度统计" />
  <div class="progress-statistics mt-11px">
    <div class="statistics">
      <div class="text-center mt-14px count mt-25px">{{ total }}</div>
      <div class="text-center te1">项目总进度</div>
      <img src="@/assets/images/animation/tkbxdb.png" class="tkbxdb p-c" />
      <img src="@/assets/images/home/content/tbxzl.png" class="tbxzl" />
      <img src="@/assets/images/home/content/tbxzr.png" class="tbxzr" />
      <div class="tbxk">
        <ProgressSatisticsEchart :value="value" />
      </div>
    </div>
  </div>
  <div class="h-306px">
    <ProgressBar class="mt12px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProgressSatisticsEchart from '../easternHubei/content/progressSatisticsEchart.vue'
import ProgressBar from '../components/progressBar.vue'
const value = ref<number | string>(0)
const total = ref<number | string>(0)
</script>

<style scoped lang="scss">
.progress-statistics {
  .statistics {
    position: relative;
    height: 130px;
    width: 100%;
    overflow: hidden;
    .tbxk {
      position: absolute;
      top: 7px;
      left: 0px;
      width: 100%;
      height: 100%;
      transform: scale(1.7) rotateX(64deg);
    }
    .tkbxdb {
      width: 330px;
      height: 230px;
      z-index: 1;
    }
    .tbxzr,
    .tbxzl {
      position: absolute;
      width: 46.5px;
      height: 120px;
      top: 10px;
    }
    .tbxzl {
      left: 0px;
    }
    .tbxzr {
      right: 0px;
    }
    .count {
      position: relative;
      z-index: 2;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 28px;
      color: #ffffff;
    }
    .te1 {
      position: relative;
      z-index: 2;
      font-size: 16px;
      color: #bfe9ff;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
    }
  }
}
</style>
