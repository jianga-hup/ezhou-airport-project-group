<!--
* @description 场景信息展示
* @fileName sceneInformation.vue
* @author
* @date 2024/03/12 10:08:06
!-->
<template>
  <!-- 图例 -->
  <div class="lend p-e-a">
    <div class="lend-header">图例</div>
    <div class="lend-inner">
      <el-checkbox-group v-model="checkList" @change="handleCkeck">
        <el-checkbox :label="e.key" v-for="(e, i) in leng" :key="i" class="uno-flex-y-center mt8px">
          <div class="uno-flex-y-center">
            <img :src="viteImages(`@/assets/images/home/map/icon_${e.key}.png`)" class="wihi-22 ml6px mr9px" />
            <div class="t1">{{ e.name }}</div>
            <div class="t1 ml5px">({{ e.count }})</div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
  <!-- 服务区 -->
  <div v-for="(m, i) in area" class="monomer text-center" :id="`area-${i}`" :key="i + 'a'">
    <div :class="`content${m.montype} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 互通 -->
  <div v-for="(m, i) in Interworking" class="monomer text-center" :id="`king-${i}`" :key="i + 'k'">
    <div :class="`content${m.montype} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 桥梁 -->
  <div v-for="(m, i) in bridge" class="monomer text-center" :id="`bridge-${i}`" :key="i + 'b'">
    <div :class="`content${m.montype} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 隧道 -->
  <div v-for="(m, i) in tunnel" class="monomer text-center" :id="`tunnel-${i}`" :key="i + 't'">
    <div :class="`content${m.montype} `">
      <div class="t1">{{ m.name }}</div>
      <div class="t1">
        进度：<span class="count">{{ 0 }}</span
        >%
      </div>
    </div>
    <img :src="setshowimg(m.montype)" @click="getclcki(m)" class="img" />
  </div>
  <!-- 无人机描点 -->
  <div class="monomer z-2" :id="`wrj-${i}`" v-for="(e, i) in wrj" :key="i + 'w'">
    <div :class="`contentwrj absolute t-l-c -top-25px`">
      <div class="t1">{{ e.name }}</div>
    </div>
    <img
      src="@/assets/images/xmq/icon_wrj.png"
      @click="handleOpen(e.url)"
      width="38"
      height="47"
      class="cursor-pointer p-e-a"
    />
  </div>
  <!-- 工序 -->
  <div class="monomer gx" v-if="state.gxinfo.isshow" id="gx-0">
    <div class="uno-flex-between-center">
      <div class="tkt1 ell-text w-270px">{{ state.gxinfo.unitWorkName }}</div>
      <img
        src="@/assets/images/common/icon_close.png"
        class="wihi-22 cursor-pointer p-e-a"
        @click="state.gxinfo.isshow = false"
      />
    </div>
    <div class="details cursor-pointer p-e-a uno-flex-y-center" @click="handleDetias('gx', state.gxinfo)">
      详情 <el-icon><DArrowRight /></el-icon>
    </div>
    <div class="mt15px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">工序报验：</div>
      <div class="tkt2">{{ state.gxinfo.byprojectName }}</div>
    </div>
    <div class="mt10px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">报验人：</div>
      <div class="tkt2">{{ state.gxinfo.creatorName }}</div>
    </div>
    <div class="mt10px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">发起时间：</div>
      <div class="tkt2">{{ state.gxinfo.creationTime }}</div>
    </div>
  </div>
  <!-- 质检 -->
  <div class="monomer zj" v-if="state.zjinfo.isshow" id="zj-0">
    <div class="uno-flex-between-center">
      <div class="tkt1 ell-text w-270px">{{ state.zjinfo.gcbw }}</div>
      <img
        src="@/assets/images/common/icon_close.png"
        class="wihi-22 cursor-pointer p-e-a"
        @click="state.zjinfo.isshow = false"
      />
    </div>
    <div class="details cursor-pointer p-e-a uno-flex-y-center" @click="handleDetias('zj', state.zjinfo)">
      详情 <el-icon><DArrowRight /></el-icon>
    </div>
    <div class="mt15px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">标段：</div>
      <div class="tkt2">{{ state.zjinfo.bdmc }}</div>
    </div>
    <div class="mt10px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">表名：</div>
      <div class="tkt2">{{ state.zjinfo.bgmc }}</div>
    </div>
    <div class="mt10px content uno-flex-y-center">
      <div class="slx" />
      <div class="text ml7px">完成时间：</div>
      <div class="tkt2">{{ state.zjinfo.wcsj }}</div>
    </div>
  </div>

  <UnmannedAerialVehicle v-if="visible" :visible="visible" :url="url" title="" @close="visible = false" />
  <ShowDetails v-if="Tvisible" :visible="Tvisible" :popCu="popCu" @close="Tvisible = false" />
  <QualityInspectionDetails v-if="Qvisible" :title="title" :visible="Qvisible" :url="url" @close="Qvisible = false" />
</template>

<script lang="ts" setup>
import UnmannedAerialVehicle from './unmannedAerialVehicle.vue'
import { viteImages } from '@/utils'
import ShowDetails from '../../easternHubei/overviewRight/details/showDetails.vue'
import QualityInspectionDetails from '../../easternHubei/overviewRight/details/qualityInspectionDetails.vue'
import BlackBim from '@/utils/blackHole'
import { inject, onMounted, ref, onBeforeUnmount, computed, nextTick, reactive, watch } from 'vue'
import { whmonomer } from '@/utils/whmonomer'
import { useCardInfoStore } from '@/store/modules/cardInfo'
interface Leng {
  name: string
  count: number
  key: string
}
/** 获取全局对象 */
const global: any = inject('global')
/** 工序-质检信息 */
const infoStore = useCardInfoStore()
const monomers = ref<Monomer[]>([])
const leng = computed(() => {
  const arr: Leng[] = [
    { name: '桥梁', count: monomers.value.filter((m) => m.montype === 2).length, key: 'ql' },
    { name: '互通', count: monomers.value.filter((m) => m.montype === 1).length, key: 'ht' },
    { name: '服务区', count: monomers.value.filter((m) => m.montype === 3).length, key: 'fwq' },
    { name: '隧道', count: monomers.value.filter((m) => m.montype === 4).length, key: 'sd' }
  ]
  return arr
})
const checkList = ref<string[]>(['ql', 'ht', 'fwq', 'sd'])
const visible = ref(false)
const isenlarge = ref(false)
/** 工序数据 */
const gxData = () => ({ byprojectName: '', creationTime: '', creatorName: '', id: '', unitWorkName: '', isshow: false })
/** 质检数据 */
const zjData = () => ({ bgmc: '', bdmc: '', wcsj: '', isshow: false, url: '', gcbw: '' })
const state = reactive<{ gxinfo: GXINFO; zjinfo: ZJINFO }>({
  gxinfo: gxData(),
  zjinfo: zjData()
})

/** 弹框相关 */
const Tvisible = ref<boolean>(false)
const popCu = reactive({
  title: '',
  id: '',
  type: ''
})
/** 质检弹框 */
const Qvisible = ref(false)
const title = ref('')

/** 无人机图标 */
const wrj = ref([
  {
    position3857: [12776263.570585, 3552758.444531, 0],
    url: 'https://fh.dji.com/share/live/9pAlKe4fHjfB',
    name: '柯家墩大桥2号机'
  },
  {
    position3857: [12776537.327020342, 3552436.178258181, 0],
    url: 'https://fh.dji.com/share/t8ZS12XsjyB',
    name: '柯家墩大桥1号机'
  },
  {
    position3857: [12788335.680228189, 3545139.898251619, 0],
    url: 'https://fh.dji.com/share/pJTO5tLKHKE', // 鄂州收费站机场
    name: '鄂州收费站机场'
  },
  {
    position3857: [12771236.67248387, 3556194.244457103, 0],
    url: 'https://fh.dji.com/share/uKPM72wyDsL', // 蒲团收费站机场
    name: '蒲团收费站机场'
  },
  {
    position3857: [12759571.948321607, 3560406.554473013, 0],
    url: 'https://fh.dji.com/share/q7qUQlbpbuC', // 庙岭收费站机场
    name: '庙岭收费站机场'
  }
])
const url = ref('')

/** 服务区 */
const area = computed(() => {
  return checkList.value.includes('fwq') ? monomers.value.filter((m) => m.montype === 3) : []
})
/** 互通 */
const Interworking = computed(() => {
  return checkList.value.includes('ht') ? monomers.value.filter((m) => m.montype === 1) : []
})
/** 桥梁 */
const bridge = computed(() => {
  if (isenlarge.value) {
    return checkList.value.includes('ql') ? monomers.value.filter((m) => m.montype === 2) : []
  } else {
    return checkList.value.includes('ql') ? monomers.value.filter((m) => m.montype === 2 && m.show) : []
  }
})
/** 隧道 */
const tunnel = computed(() => {
  return checkList.value.includes('sd') ? monomers.value.filter((m) => m.montype === 4) : []
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
    } else if (type == 'wrj') {
      ele.style.left = screenPos[0] + 'px'
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
  // // 放大
  // const locate = global.$BlackHole3D.Camera.getCamLocate()
  // // 监听相机位置
  // if (locate && locate.camPos[2] <= 1421) {
  //   !isenlarge.value && (isenlarge.value = true)
  // } else {
  //   isenlarge.value && (isenlarge.value = false)
  // }
  // 工序数据
  if (state.gxinfo.isshow) {
    mapshow(state.gxinfo.position3857 as number[], 'gx-0', '')
  }
  // 质检数据
  if (state.zjinfo.isshow) {
    mapshow(state.zjinfo.position3857 as number[], 'zj-0', '')
  }
  wrj.value.map((e, i) => {
    mapshow(e.position3857, `wrj-${i}`, 'wrj')
  })
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
const setshowimg = (type: number) => {
  const imgs: string[] = ['ht', 'ql', 'fwq', 'sd']
  return viteImages(`@/assets/images/home/content/content-${imgs[type - 1]}.png`)
}

/** 点击跳转场景定位 */
const getclcki = (m: Monomer) => {
  if (m?.position3857) {
    const pos = m.position3857
    const p = [pos[0] - 400, pos[1] + 500, 570]
    BlackBim.setCamLocateTo(global, p)
  }
}

/** 点击多选框 */
const handleCkeck = () => {
  nextTick(() => {
    RECameraMove()
  })
}

/** 无人机视频 */
const handleOpen = (src: string) => {
  visible.value = true
  url.value = src
}

/** 点击详情 */
const handleDetias = (str: string, item: GXINFO | ZJINFO) => {
  if (str == 'gx') {
    popCu.title = '工序报验详情'
    popCu.id = (item as GXINFO).id
    Tvisible.value = true
  } else if (str == 'zj') {
    title.value = (item as ZJINFO).bgmc
    url.value = (item as ZJINFO).url
    Qvisible.value = true
  }
}

onMounted(() => {
  document.addEventListener('RECameraMove', RECameraMove)
  // // console.log(monomer, 'monomer')
  monomers.value = whmonomer
  // const srcCRS = `PROJCS["CGCS2000_3_Degree_GK_CM_115E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",114.750000],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]`
  // const destCRS = 'EPSG:4326'
  // const coordList = [[520009.839, 3349568.362, 0, 0]]
  // const trans02 = global.$BlackHole3D.Coordinate.getTransGeoCoords(srcCRS, destCRS, coordList)
  // console.log('trans02', trans02[0])
  // const pos = global.$BlackHole3D.Coordinate.getTransEngineCoords(false, 'EPSG:4326', [
  //   [trans02[0][0], trans02[0][1], 0]
  // ])[0]
  // console.log(pos)
  // const srcCRS = 'EPSG:3857'
  // const destCRS = 'EPSG:4326'
  // const coordList = [[12788652.878624776, 3354295.795164572, 0, 0]]
  // const trans02 = global.$BlackHole3D.Coordinate.getTransGeoCoords(srcCRS, destCRS, coordList)
  // console.log(trans02)
  RECameraMove()
})

onBeforeUnmount(() => {
  document.removeEventListener('RECameraMove', RECameraMove)
})

/** 监听工序信息 */
watch(
  () => infoStore.gxinfo.list,
  () => {
    const list = infoStore.gxinfo.list
    let show = true
    if (list.length) {
      list.map((e: GXINFO) => {
        if (show) {
          const x = whmonomer.filter((x) => e.unitWorkName.indexOf(x.name.replace(/号/g, '#')) !== -1)
          if (x.length) {
            show = false
            state.gxinfo = { ...e, isshow: true, position3857: x[0].position3857 }

            nextTick(() => {
              RECameraMove()
            })
          }
        }
      })
    } else {
      Object.assign(state.gxinfo, gxData())
    }
  },
  { deep: true, immediate: true }
)
/** 监听质检信息 */
watch(
  () => infoStore.zjinfo.list,
  () => {
    const list = infoStore.zjinfo.list
    let show = true
    if (list.length) {
      list.map((e: ZJINFO) => {
        if (show) {
          const x = whmonomer.filter((x) => e.gcbw.indexOf(x.name.replace(/号/g, '#')) !== -1)
          if (x.length) {
            show = false
            state.zjinfo = { ...e, isshow: true, position3857: x[0].position3857 }
            nextTick(() => {
              RECameraMove()
            })
          }
        }
      })
    } else {
      Object.assign(state.zjinfo, zjData())
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.lend {
  position: absolute;
  bottom: 10px;
  left: 70px;
  width: 172px;
  padding: 12px 0px;
  background: rgba(0, 28, 61, 0.4);
  border-radius: 2px;
  border: 2px solid rgba(76, 175, 255, 0.4);
  &-header {
    position: relative;
    padding: 0px 12px 10px 12px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 19px;
    border-bottom: 2px solid rgba(44, 181, 255, 0.24);
    &::after {
      content: '';
      position: absolute;
      left: 15px;
      bottom: -1px;
      width: 22px;
      height: 4px;
      background: #23adff;
    }
  }
  &-inner {
    padding-left: 12px;
    padding-bottom: 5px;
    .img {
      width: 22px;
      height: 22px;
    }
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      line-height: 19px;
    }
  }
}
.monomer {
  display: none;
  pointer-events: none; /* 设置div不可被探测 */
  position: absolute;
  z-index: 1;
  .content2,
  .content3,
  .content4,
  .content1,
  .contentwrj {
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
  .content2 {
    background: linear-gradient(180deg, rgba(53, 148, 235, 0.6) 0%, rgba(37, 67, 222, 0.6) 100%);
  }
  .content3 {
    background: linear-gradient(180deg, rgba(153, 255, 105, 0.6) 0%, rgba(66, 255, 0, 0.6) 100%);
  }
  .content4 {
    background: linear-gradient(180deg, rgba(255, 206, 79, 0.6) 0%, rgba(249, 188, 33, 0.6) 100%);
  }
  .contentwrj {
    width: 144px;
    background: linear-gradient(180deg, rgba(237, 129, 32, 0.6) 0%, rgba(249, 188, 33, 0.6) 100%);
  }
}
.gx,
.zj {
  width: 375px;
  height: 250px;
  padding: 14px 5px 0px 60px;
  &::after,
  &::before {
    content: '';
    position: absolute;
    border: 2px solid rgba(192, 223, 255, 1);
    animation: animate 8s linear infinite;
  }
  &::after {
    top: 6px;
    left: 44px;
    width: calc(100% - 44px);
    height: calc(100% - 102px);
    animation-delay: -4s;
  }
  &::before {
    top: 6px;
    left: 44px;
    width: calc(100% - 44px);
    height: calc(100% - 102px);
  }
  .tkt1 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    line-height: 19px;
    letter-spacing: 2px;
  }
  .details {
    position: absolute;
    right: 10px;
    top: 52px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #f59a23;
    line-height: 19px;
  }
  .content {
    .slx {
      width: 7px;
      height: 7px;
      box-shadow: 0px 2px 4px 0px rgba(254, 196, 42, 0.53);
      border: 2px solid #ffdd2b;
      transform: rotate(45deg);
    }
    .text {
      font-size: 14px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      line-height: 19px;
      // -webkit-background-clip: text;
    }
    .tkt2 {
      width: 150px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #f89334;
      line-height: 19px;
    }
  }
}
.gx {
  background: url('@/assets/images/home/map/content-gx.png');
  background-size: 100% 100%;
}
.zj {
  background: url('@/assets/images/home/map/content-zj.png');
  background-size: 100% 100%;
  .content {
    .tkt2 {
      width: auto;
      color: #23adff;
    }
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
