<!--
* @description 进度条
* @fileName progressBar.vue
* @author
* @date 2024/04/07 14:35:01
!-->
<template>
  <div class="progressBar">
    <div class="uno-flex-x-center" :class="{ mt14px: i > 0 }" v-for="(e, i) in list" :key="i">
      <div class="btn mr4px uno-flex-center" @click="handleActive(i)">
        <el-icon class="icon" :class="{ 'icon-90': active === i }"><ArrowRightBold /></el-icon>
      </div>
      <div class="progressBar-item">
        <div class="progressBar-item-henader uno-flex-between-center">
          <div class="t1">{{ e.name }}</div>
          <div class="flex items-baseline">
            <div class="count font-size-24px" :style="`color: ${color[i]};`">{{ e.value }}</div>
            <div class="count font-size-14px" :style="`color: ${color[i]};`">%</div>
          </div>
        </div>
        <div class="progressBar-item-box">
          <div class="progressBar-item-box-backgroud">
            <div :style="`width: ${e.value}%;`" :class="`b${i} bg`" />
          </div>
        </div>
        <div class="progressBar-item-inner" v-if="active === i">
          <progressBarItem :child="e.child" :inx="i" />
        </div>
      </div>
    </div>
    <div class="uno-flex-center w-100% h-250px" v-if="list.length === 0">
      <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import progressBarItem from './progressBarItem.vue'
import { ref } from 'vue'
interface ProgressItem {
  name: string
  value: number
}
interface Progress {
  name: string
  value: number
  child: ProgressItem[]
}
const color = ['#119BFF', '#31F367', '#FF852C', '#FF4C4C']
const active = ref<null | number>(0)
const list = ref<Progress[]>([
  {
    name: '机场高速二期',
    value: 12.76,
    child: [
      // {
      //   name: '桥梁工程',
      //   value: 98
      // },
      // {
      //   name: '路基工程',
      //   value: 88
      // },
      // {
      //   name: '临建工程',
      //   value: 78
      // }
    ]
  },
  {
    name: '武黄高速',
    value: 3.04,
    child: [
      // {
      //   name: '桥梁工程',
      //   value: 98
      // },
      // {
      //   name: '路基工程',
      //   value: 88
      // },
      // {
      //   name: '临建工程',
      //   value: 78
      // }
    ]
  }
  // {
  //   name: '黄黄高速',
  //   value: 40,
  //   child: [
  //     {
  //       name: '桥梁工程',
  //       value: 98
  //     },
  //     {
  //       name: '路基工程',
  //       value: 88
  //     },
  //     {
  //       name: '临建工程',
  //       value: 78
  //     }
  //   ]
  // },
  // {
  //   name: '黄小高速',
  //   value: 20,
  //   child: [
  //     {
  //       name: '桥梁工程',
  //       value: 98
  //     },
  //     {
  //       name: '路基工程',
  //       value: 88
  //     },
  //     {
  //       name: '临建工程',
  //       value: 78
  //     }
  //   ]
  // }
])
const handleActive = (i: number) => {
  if (active.value === i) {
    active.value = null
  } else {
    active.value = i
  }
}
</script>

<style scoped lang="scss">
.progressBar {
  width: 410px;
  .btn {
    width: 40px;
    height: 40px;
    background: url('@/assets/images/common/bar_icon.png');
    background-size: 100% 100%;
    color: #fff;
    cursor: pointer;
    .icon {
      transform: rotate(0deg);
      transition: all 0.2s linear;
    }
    .icon-90 {
      transform: rotate(90deg);
    }
  }
  &-item {
    width: calc(100% - 44px);
    &-henader {
      .t1 {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #c9e7ff;
        line-height: 19px;
      }
      .count {
        font-family: DIN, DIN;
        font-weight: bold;
        // font-size: 24px;
        line-height: 28px;
      }
    }
    &-box {
      width: 100%;
      height: 14px;
      padding: 2px 3px;
      border-radius: 2px;
      border: 1px solid rgba(58, 243, 254, 0.18);
      &-backgroud {
        width: 100%;
        height: 100%;
        background: rgba(58, 243, 254, 0.11);
        border-radius: 2px;
        .b0 {
          background: linear-gradient(
            -45deg,
            #119bff 40%,
            rgba(58, 243, 254, 0.11) 0,
            rgba(58, 243, 254, 0.11) 70%,
            #119bff 0
          );
        }
        .b1 {
          background: linear-gradient(
            -45deg,
            #31f367 36%,
            rgba(58, 243, 254, 0.11) 0,
            rgba(58, 243, 254, 0.11) 67%,
            #31f367 0
          );
        }
        .b2 {
          background: linear-gradient(
            -45deg,
            #ff852c 36%,
            rgba(58, 243, 254, 0.11) 0,
            rgba(58, 243, 254, 0.11) 67%,
            #ff852c 0
          );
        }
        .b3 {
          background: linear-gradient(
            -45deg,
            #ff4c4c 36%,
            rgba(58, 243, 254, 0.11) 0,
            rgba(58, 243, 254, 0.11) 67%,
            #ff4c4c 0
          );
        }
        .bg {
          height: 100%;
          background-size: 14px 10px;
          animation: moveStripes 1s linear infinite;
        }
      }
    }
    &-inner {
      width: 100%;
    }
  }
}
@keyframes moveStripes {
  to {
    background-position: 40px 0;
  }
}
</style>
