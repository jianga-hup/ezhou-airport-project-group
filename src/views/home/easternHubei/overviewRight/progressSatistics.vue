<!--
* @description 进度统计 + 详情
* @fileName progressSatistics.vue
* @author
* @date 2024/01/30 11:52:27
!-->
<template>
  <CardTitle :show="true" title="进度统计">
    <div class="xq text-center z-11" @click="visible = true">详情</div>
  </CardTitle>
  <div class="progress-statistics mt-12px">
    <div class="statistics">
      <div class="text-center mt-14px count">{{ total }}</div>
      <div class="text-center te1">项目总进度</div>
      <img src="@/assets/images/animation/tkbxdb.png" class="tkbxdb p-c" />
      <img src="@/assets/images/home/content/tbxzl.png" class="tbxzl" />
      <img src="@/assets/images/home/content/tbxzr.png" class="tbxzr" />
      <div class="tbxk">
        <ProgressSatisticsEchart :value="value" />
      </div>
    </div>
    <div class="mt-11px progress-view pl-5px">
      <div class="flex progress-li flex-items-baseline" v-for="(e, i) in list" :key="i" :class="{ 'mt-1px': i > 0 }">
        <div class="title w-70px">{{ e.projectName }}</div>
        <div class="progress-box p-3px ml-12px">
          <div class="box-bground">
            <div :class="`h-full bg-color${i}`" :style="`width: ${e.rate}%;`" />
          </div>
        </div>
        <div :class="`count c${i} ml-6px text-right`">{{ e.rate }}<span class="font-size-14px">%</span></div>
      </div>
    </div>
  </div>
  <ProgressStatisticsDetails v-if="visible" :visible="visible" title="进度统计详情" @close="visible = false" />
</template>

<script lang="ts" setup>
// import { progressStatistics } from '@/api/home'
import ProgressSatisticsEchart from '../content/progressSatisticsEchart.vue'
import ProgressStatisticsDetails from './details/ProgressStatisticsDetails.vue'
import { ref, onMounted } from 'vue'
interface Props {
  value: number
}
const props = withDefaults(defineProps<Props>(), {
  value: 0
})
// const value = ref<number | string>(0)
// const total = ref<number | string>(0)
const value = (props.value / 100).toFixed(2)
const total = props.value
interface listDate {
  jd: number
  jh: number
  projectName: string
  projectType: string
  rate: number
}
const list = ref<listDate[]>([])
const visible = ref<boolean>(false)
// const init = async () => {
//   const { code, data } = await progressStatistics()
//   if (code === 200) {
//     total.value = data.rate || 0
//     value.value = data.rate ? (data.rate / 100).toFixed(2) : 0
//     list.value = data.list || []
//   }
// }

// 初始化
onMounted(() => {
  // init()
})
</script>

<style scoped lang="scss">
@keyframes bar-main {
  // form {
  //   background-position: 40px 0;
  // }
  // to {
  //   background-position: 0px 0;
  // }
  0% {
    background-position: 40px 0;
  }
  100% {
    background-position: 0px 0;
  }
}
.progress-statistics {
  .statistics {
    position: relative;
    height: 130px;
    width: 100%;
    overflow: hidden;
    .tbxk {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      transform: scale(1.6) rotateX(64deg);
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
      font-size: 25px;
      font-family: YouSheBiaoTiHei;
      color: #ffffff;
    }
    .te1 {
      position: relative;
      z-index: 2;
      font-size: 20px;
      font-family:
        PingFangSC-Regular,
        PingFang SC;
      font-weight: 400;
      color: #bfe9ff;
    }
  }

  .progress-view {
    height: 98px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .progress-li {
      .title {
        font-size: 16px;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 500;
        color: #c9e7ff;
        line-height: 19px;
      }
      .progress-box {
        width: 266px;
        height: 14px;
        border-radius: 2px;
        border: 1px solid rgba(58, 243, 254, 0.18);
        .box-bground {
          width: 100%;
          height: 100%;
          background: rgba(58, 243, 254, 0.11);
          border-radius: 2px;
          .bg-color0 {
            background: linear-gradient(
              135deg,
              #409eff 0,
              #409eff 25%,
              transparent 25%,
              transparent 50%,
              #409eff 50%,
              #409eff 75%,
              transparent 75%,
              transparent
            );
            background-size: 6px 6px;
            animation: bar-main 2s linear infinite;
          }
          .bg-color1 {
            background: linear-gradient(
              135deg,
              #00ffed 0,
              #00ffed 25%,
              transparent 25%,
              transparent 50%,
              #00ffed 50%,
              #00ffed 75%,
              transparent 75%,
              transparent
            );
            background-size: 6px 6px;
            animation: bar-main 2s linear infinite;
          }
          .bg-color2 {
            background: linear-gradient(
              135deg,
              #ffb711 0,
              #ffb711 25%,
              transparent 25%,
              transparent 50%,
              #ffb711 50%,
              #ffb711 75%,
              transparent 75%,
              transparent
            );
            background-size: 6px 6px;
            animation: bar-main 2s linear infinite;
          }
        }
      }
      .count {
        width: calc(100% - 64px - 12px - 266px - 6px);
        font-size: 24px;
        font-family: DIN, DIN;
        font-weight: bold;
        line-height: 28px;
      }
      .c0 {
        color: #119bff;
      }
      .c1 {
        color: #11fff1;
      }
      .c2 {
        color: #ffb711;
      }
    }
  }
}
.xq {
  position: absolute;
  top: -5px;
  right: -6px;
  width: 54px;
  height: 26px;
  background: linear-gradient(90deg, rgba(0, 113, 198, 0), rgba(0, 113, 198, 0.7));
  border: 1px solid rgba(0, 113, 198, 0.8);
  font-size: 14px;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  color: #ffffff;
  cursor: pointer;
  line-height: 24px;
}
</style>
