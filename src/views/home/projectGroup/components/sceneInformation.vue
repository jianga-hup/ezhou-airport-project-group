<!--
* @description 场景信息展示
* @fileName sceneInformation.vue
* @author
* @date 2024/03/12 10:08:06
!-->
<template>
  <!-- 服务区 -->
  <div v-for="(m, i) in area" class="monomer text-center" :id="`area-${i}`" :key="i + 'a'">
    <div :class="`content${m.type} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype, m.type)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 互通 -->
  <div v-for="(m, i) in Interworking" class="monomer text-center" :id="`king-${i}`" :key="i + 'k'">
    <div :class="`content${m.type} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype, m.type)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 桥梁 -->
  <div v-for="(m, i) in bridge" class="monomer text-center" :id="`bridge-${i}`" :key="i + 'b'">
    <div :class="`content${m.type} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype, m.type)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 隧道 -->
  <div v-for="(m, i) in tunnel" class="monomer text-center" :id="`tunnel-${i}`" :key="i + 't'">
    <div :class="`content${m.type} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype, m.type)" @click="getclcki(m)" class="img" />
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import BlackBim from '@/utils/blackHole'
import { inject, onMounted, ref, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import { monomer } from '@/utils/monomer'
import { whmonomer } from '@/utils/whmonomer'

interface Props {
  checkList: string[]
}

const props = withDefaults(defineProps<Props>(), {})
const checkLists = ref<string[]>([])

/** 获取全局对象 */
const global: any = inject('global')
const monomers = ref<Monomer[]>([])

/** 服务区 */
const area = computed(() => {
  return checkLists.value.includes('fwq')
    ? monomers.value
        .filter((m) => m.montype === 3 && m.isxmq)
        .concat(whmonomer.filter((m) => m.montype === 3 && m.isxmq))
    : []
})
/** 互通 */
const Interworking = computed(() => {
  return checkLists.value.includes('ht')
    ? monomers.value
        .filter((m) => m.montype === 1 && m.isxmq)
        .concat(whmonomer.filter((m) => m.montype === 1 && m.isxmq))
    : []
})
/** 桥梁 */
const bridge = computed(() => {
  return checkLists.value.includes('ql')
    ? monomers.value
        .filter((m) => m.montype === 2 && m.isxmq)
        .concat(whmonomer.filter((m) => m.montype === 2 && m.isxmq))
    : []
})
/** 隧道 */
const tunnel = computed(() => {
  return checkLists.value.includes('sd')
    ? monomers.value
        .filter((m) => m.montype === 4 && m.isxmq)
        .concat(whmonomer.filter((m) => m.montype === 4 && m.isxmq))
    : []
})

/** div悬浮在场景 */
const mapshow = (pos: number[], id: string, type: string) => {
  const screenPos = global.$BlackHole3D ? global.$BlackHole3D.Coordinate.getWorldPosToScreenPos(pos, 80000) : null
  const Height = document.getElementById('canvas')!.offsetHeight
  const Width = document.getElementById('canvas')!.offsetWidth
  const ele = document.querySelector(`#${id}`) as HTMLElement
  if (
    screenPos[0] <= Width &&
    screenPos[1] <= Height &&
    screenPos[0] >= 0 &&
    screenPos[1] >= 0 &&
    screenPos[2] >= 0 &&
    screenPos[2] <= 1
  ) {
    if (!ele) return
    ele.style.display = 'block'
    // 根据实际情况调整标签位置
    ele.style.left = screenPos[0] + 'px'
    ele.style.bottom = screenPos[1] + 'px'
    if (type == 'center') {
      ele.style.transform = 'translate(-50%,-50%)'
    } else if (type == 'left') {
      ele.style.transform = 'translateX(-50%)'
    }
    // 根据需求调视口远近，div进行隐藏
    if (screenPos[3] > 0 && screenPos[3] < 0.3) {
      ele.style.display = 'none'
    }
  } else {
    ele && (ele.style.display = 'none')
  }
}

/** 监听移动场景 */
const RECameraMove = () => {
  area.value.length &&
    area.value.map((e, i) => {
      mapshow(e.position3857, `area-${i}`, 'left')
    })
  Interworking.value.length &&
    Interworking.value.map((e, i) => {
      mapshow(e.position3857, `king-${i}`, 'left')
    })
  bridge.value.length &&
    bridge.value.map((e, i) => {
      mapshow(e.position3857, `bridge-${i}`, 'left')
    })
  tunnel.value.length &&
    tunnel.value.map((e, i) => {
      mapshow(e.position3857, `tunnel-${i}`, 'left')
    })
}

/** 图片替换 */
const setshowimg = (type: number, o: string) => {
  const imgs: string[] = ['ht', 'ql', 'fwq', 'sd']
  return viteImages(`@/assets/images/xmq/${o}-${imgs[type - 1]}.png`)
}

/** 点击跳转场景定位 */
const getclcki = (m: Monomer) => {
  if (m?.position3857) {
    const pos = m.position3857
    const p = [pos[0] - 400, pos[1] + 500, 570]
    BlackBim.setCamLocateTo(global, p)
  }
}

onMounted(() => {
  document.addEventListener('RECameraMove', RECameraMove)
  monomers.value = monomer
  nextTick(() => {
    RECameraMove()
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('RECameraMove', RECameraMove)
})

watch(
  () => props.checkList,
  () => {
    checkLists.value = props.checkList
    nextTick(() => {
      RECameraMove()
    })
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.monomer {
  display: none;
  pointer-events: none; /* 设置div不可被探测 */
  position: absolute;
  z-index: 1;
  .contentez,
  .contentwh,
  .content4,
  .content2 {
    min-width: 104px;
    padding: 4px 18px;
    border-radius: 16px;
    border-image: linear-gradient(223deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
    height: auto;
    .t1 {
      font-size: 14px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 18px;
      // -webkit-background-clip: text;
      .count {
        font-family: DIN-Bold;
        font-weight: bold;
      }
    }
  }
  .img {
    width: 40px;
    height: 57px;
    pointer-events: auto; /* 设置div可被探测 */
    cursor: pointer;
  }
  .content1 {
    background: linear-gradient(180deg, rgba(245, 101, 244, 0.6) 0%, rgba(232, 13, 184, 0.6) 100%);
  }
  .contentez {
    background: linear-gradient(180deg, rgba(53, 148, 235, 0.6) 0%, rgba(37, 67, 222, 0.6) 100%);
  }
  .contentwh {
    background: linear-gradient(180deg, rgba(153, 255, 105, 0.6) 0%, rgba(66, 255, 0, 0.6) 100%);
  }
  .content4 {
    background: linear-gradient(180deg, rgba(255, 206, 79, 0.6) 0%, rgba(249, 188, 33, 0.6) 100%);
  }
}
</style>
