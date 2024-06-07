<!--
* @description 项目概况
* @fileName overview.vue
* @author
* @date 2024/01/29 16:32:50
!-->
<template>
  <div class="overview">
    <CardTitle :show="true" title="项目概况" />
    <div class="mt-12px flex items-center">
      <div class="w-57% flex">
        <img src="@/assets/images/animation/xmlc.png" class="wihi-70" />
        <div class="text mt6px">
          <div class="t1">项目里程</div>
          <div>
            <span class="count">{{ info.mileage }}</span
            ><span class="t1">公里</span>
          </div>
        </div>
      </div>
      <div class="w-43% flex">
        <img src="@/assets/images/animation/ztz.png" class="wihi-70" />
        <div class="text mt6px">
          <div class="t1">总投资</div>
          <div>
            <span class="count">{{ info.total }}</span
            ><span class="t1">亿</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12px unit-title">施工单位</div>
    <div class="mt-8px unit-ui">
      <div :class="[`unit-li cr${i} font-text`, { 'mt-6px': i > 0 }]" v-for="(e, i) in info.list" :key="i">{{ e }}</div>
    </div>
    <div class="mt-12px unit-title">工程类别</div>
    <div class="font-text mt-8px h-19px">
      {{ info.category }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  info: {
    mileage: string
    total: string
    category: string
    list: string[]
  }
}
withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.overview {
  width: 100%;
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
  .unit-title {
    padding-left: 31px;
    position: relative;
    font-size: 20px;
    font-family: PangMenZhengDao, PangMenZhengDao;
    font-weight: 400;
    color: #ffffff;
    line-height: 23px;
    text-shadow: 0px 0px 6px #4398c7;
    // background-clip: text;
    // -webkit-text-fill-color: transparent;
    &::after {
      content: '';
      position: absolute;
      left: -5px;
      top: 1px;
      width: 25px;
      height: 20px;
      background: url('@/assets/images/common/unit-title.png');
      background-size: 100% 100%;
    }
  }
  .unit-ui {
    .unit-li {
      // width: 204px;
      height: 28px;
      background: linear-gradient(96deg, rgba(21, 104, 234, 0.5) 0%, rgba(21, 104, 234, 0) 100%);
      border-radius: 50px 50px 50px 50px;
      padding: 3px 3px 0px 26px;
      position: relative;
    }
    .cr0,
    .cr1,
    .cr2,
    .cr3,
    .cr4,
    .cr5 {
      &::after {
        content: '';
        position: absolute;
        left: 12px;
        top: 11px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
    }
    .cr0 {
      &::after {
        background: #fc9d2d;
      }
    }
    .cr1 {
      &::after {
        background: #2d5bfc;
      }
    }
    .cr2 {
      &::after {
        background: #2dcafc;
      }
    }
    .cr3 {
      &::after {
        background: #fc2d2d;
      }
    }
    .cr4 {
      &::after {
        background: #df2dfc;
      }
    }
    .cr5 {
      &::after {
        background: #2d5bfc;
      }
    }
  }
  .font-text {
    font-size: 16px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    line-height: 19px;
  }
}
</style>
