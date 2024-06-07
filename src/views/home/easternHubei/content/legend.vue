<!--
* @description 图例操作
* @fileName legend.vue
* @author
* @date 2024/02/28 11:42:26
!-->
<template>
  <div :class="[isshow ? 'legend' : 'legend1']">
    <div class="img-inner mb-20px" v-for="(e, i) in imgs" :key="i">
      <div class="img-item text-center">
        <img :src="viteImages(activeImg(e))" class="wihi-44 img" @click="hadleclick(e)" />
        <div class="title">{{ e.title }}</div>
      </div>
      <!-- 悬浮框 -->
      <div class="leng-map" v-if="showMap(e)">
        <div class="legend-header">{{ e.title }}</div>
        <div class="legend-line" />
        <div class="legend-conten">
          <div class="uno-flex-x-between mt-15px uno-flex-y-center" v-if="active === 'jdzs'">
            <div class="t1">是否开启</div>
            <el-switch v-model="form.jdzs" @change="onswitch('jdzs')" />
          </div>
          <template v-if="active === 'tckz'">
            <div class="uno-flex-x-between mt-15px uno-flex-y-center">
              <div class="t1">天地图</div>
              <el-switch v-model="form.tdt" @change="onswitch('tdt')" />
            </div>
            <div class="uno-flex-x-between mt-15px uno-flex-y-center">
              <div class="t1">航飞影像</div>
              <el-switch v-model="form.hfyx" @change="onswitch('hfyx')" />
            </div>
            <div class="uno-flex-x-between mt-15px uno-flex-y-center">
              <div class="t1">CAD图纸</div>
              <el-switch v-model="form.cad" @change="onswitch('cad')" />
            </div>
            <div class="uno-flex-x-between mt-15px uno-flex-y-center">
              <div class="t1">全线白模</div>
              <el-switch v-model="form.qx" @change="onswitch('qx')" />
            </div>
            <div class="uno-flex-x-between mt-15px uno-flex-y-center">
              <div class="t1">BIM模型</div>
              <el-switch v-model="form.bim" @change="onswitch('bim')" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 漫游暂停和继续 -->
    <div class="pauseAndContinue mb20px" v-if="active === 'my'">
      <div class="img-item text-center" v-if="my.continue">
        <img :src="viteImages('@/assets/images/common/map_mybf.png')" class="wihi-44 img" @click="handlePause(false)" />
        <div class="title">漫游播放</div>
      </div>
      <div class="img-item text-center" v-else>
        <img :src="viteImages('@/assets/images/common/map_myzt.png')" class="wihi-44 img" @click="handlePause(true)" />
        <div class="title">漫游暂停</div>
      </div>
    </div>
    <ZoomInOut />
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { ref, reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import mapuser from '@/config/user-map'
import { interactiveStore } from '@/store/modules/interactive'
import { isLoadCAD, hideCAD } from '@/hooks/useProject' // 一些交互操作
import { roamData } from '@/utils/ezjcmy'
import { masktStore } from '@/store/modules/mask'
// import { getStructureStatus } from '@/api/home'
import ZoomInOut from '@/components/ZoomInOut.vue'
withDefaults(defineProps<{ isshow: boolean }>(), {})
/** 获取全局对象 */
const global: any = inject('global')
const msak = masktStore()
interface imgss {
  img: string
  type: string
  title: string
}
interface MY {
  /** 漫游是否开启 */
  isMy: boolean
  /** 漫游定时器 */
  timer: undefined | number | NodeJS.Timeout
  /** 漫游定时器 */
  timer2: undefined | number | NodeJS.Timeout
  /** 当前索引值 */
  inx: number
  /** 是否暂停 */
  continue: boolean
  /** 保存的方位信息 */
  move: any
}
const imgs: imgss[] = [
  {
    img: '@/assets/images/common/many.png',
    type: 'my',
    title: '漫游'
  },
  {
    img: '@/assets/images/common/fuw.png',
    type: 'fw',
    title: '复位'
  },
  // {
  //   img: '@/assets/images/common/jdzs.png',
  //   type: 'jdzs',
  //   title: '进度着色'
  // },
  {
    img: '@/assets/images/common/tuckz.png',
    type: 'tckz',
    title: '图层控制'
  }
]
const type = ['jdzs', 'tckz']
const form = reactive({
  jdzs: true,
  tdt: true,
  cad: false,
  hfyx: true,
  bim: true,
  qx: true
})
const active = ref<string>('')
const interactive = interactiveStore()
/** 漫游用到的参数 */
const my = reactive<MY>({
  isMy: false,
  timer: undefined,
  timer2: undefined,
  inx: 0,
  continue: false,
  move: {}
})

/** 漫游的触发函数-监听相机定位完成事件 */
const RELocateCam = () => {
  my.timer2 && clearInterval(my.timer2)
  my.timer && clearInterval(my.timer)
  // 漫游开启和漫游不暂停
  if (my.isMy && !my.continue) {
    if (roamData.length > my.inx) {
      my.timer = setInterval(() => {
        if (my.inx - 1 >= 0) {
          msak.state = {
            ml: roamData[my.inx - 1].ml,
            inx: my.inx,
            show: true
          }
        }
      }, 50)
      const locTime = roamData[my.inx].time
      const camLoc = new global.$BlackHole3D.RECamLoc()
      camLoc.camPos = roamData[my.inx].camPos
      camLoc.camDir = roamData[my.inx].camDir
      global.$BlackHole3D.Camera.setCamPreferFPS(false)
      global.$BlackHole3D.Camera.setCamLocateTo(camLoc, 0, locTime)
      my.inx++
    } else {
      const action = imgs.filter((e) => e.type === 'fw')
      hadleclick(action[0])
    }
  }
}

// const getBimColor = async () => {
//   const { code, data = [] } = await getStructureStatus({ id: '' })
//   console.log(code, data, 'xxxxxxxxx')
// }

// onMounted(() => {
//   console.log('xxxxxxxxxxxxxxxxxxxxxx')
//   getBimColor()
// })
/** 定时器清除 */
const clearInter = () => {
  my.timer && clearInterval(my.timer)
  my.timer2 && clearInterval(my.timer2)
}

const hadleclick = (e: imgss) => {
  // console.log(JSON.stringify(global.$BlackHole3D.Camera.getCamLocate()))
  if (type.includes(active.value) && active.value === e.type) {
    active.value = ''
  } else {
    active.value = e.type
  }
  clearInter()
  my.inx = 0
  my.isMy = false
  my.continue = false
  if (e.type === 'fw') {
    global.$BlackHole3D.Camera.setCamLocateTo(mapuser.ezjcfw, 0, 0)
    msak.state.show = false
    !msak.bgshow && (msak.bgshow = true)
  } else if (e.type === 'my') {
    //监听相机定位完成事件
    msak.bgshow = false
    document.addEventListener('RELocateCam', RELocateCam)
    const camLoc = new global.$BlackHole3D.RECamLoc()
    camLoc.camPos = roamData[0].camPos
    camLoc.camDir = roamData[0].camDir
    my.isMy = true
    global.$BlackHole3D.Camera.setCamLocateTo(camLoc, 0, roamData[0].time)
    global.$BlackHole3D.Camera.setCamPreferFPS(false)
    msak.state = {
      ml: roamData[0].ml,
      inx: 0,
      show: true
    }
  }
}
const showMap = (e: imgss): boolean => {
  return type.includes(e.type) && active.value === e.type
}
const onswitch = (key: string) => {
  if (key == 'tdt') {
    global.$BlackHole3D.Grid.setDataSetAlpha(mapuser.tdw, form[key] ? 255 : 0)
    interactive.state.tdt = form[key] ? true : false
  } else if (key === 'cad') {
    if (form[key]) {
      // 打开鄂东CAD
      isLoadCAD(global, ['edgs'])
    } else {
      // 关闭鄂东CAD
      hideCAD(global, 1)
    }
    interactive.state.cads[0] = form[key] ? true : false
  } else if (key === 'hfyx') {
    global.$BlackHole3D.Grid.setDataSetAlpha(mapuser.hfyx, form[key] ? 255 : 0)
    interactive.state.hfs = interactive.state.hfs.fill(form[key] ? true : false)
  } else if (key === 'bim') {
    global.$BlackHole3D.BIM.setElemAlpha(mapuser.bimid, [], form[key] ? 255 : 0)
  } else if (key === 'qx') {
    global.$BlackHole3D.BIM.setElemAlpha(mapuser.qxid, [], form[key] ? 255 : 0)
  }
}
const activeImg = (e: imgss) => {
  let str = e.img
  if (type.includes(active.value) && active.value === e.type) {
    const s = str.slice(0, str.indexOf('.png'))
    str = s + '-active.png'
  }
  return str
}
/** 跳转到提供的位置 */
const getGoTo = (current: any) => {
  const camLoc = new global.$BlackHole3D.RECamLoc()
  camLoc.camPos = current.camPos
  camLoc.camDir = current.camDir
  global.$BlackHole3D.Camera.setCamLocateTo(camLoc, 0, 0)
}
/** 漫游暂停和播放 */
const handlePause = (val: boolean) => {
  clearInter()
  if (val) {
    const current = global.$BlackHole3D.Camera.getCamLocate()
    my.continue = val
    my.move = current
    getGoTo(current)
  } else {
    // 当前位置
    const current = global.$BlackHole3D.Camera.getCamLocate()
    const c1 = current.camPos.map((e: string) => parseInt(e).toString())
    const c2 = my.move.camPos.map((e: string) => parseInt(e).toString())
    if (c1.every((value: any, index: string | number) => value === c2[index])) {
      my.continue = val
      //现在的位置
      const move = my.move
      // 要去的位置
      const goto = roamData[my.inx - 1] // 要去
      const into = roamData[my.inx - 2] // 之前的位置
      //里程 要去的里程 - 之前的里程
      const mileage = Number(goto.camPos[1].toFixed(0)) - Number(into.camPos[1].toFixed(0))
      //1秒多少里程
      const miaolc = mileage / goto.time
      //现在离下一个的距离
      const mie = Number(goto.camPos[1].toFixed(0)) - Number(move.camPos[1].toFixed(0))
      // 剩下多少秒
      const sxmiao = Number((mie / miaolc).toFixed(2))
      const camLoc = new global.$BlackHole3D.RECamLoc()
      camLoc.camPos = goto.camPos
      camLoc.camDir = goto.camDir
      // console.log('sxmiao', sxmiao)
      global.$BlackHole3D.Camera.setCamLocateTo(camLoc, 0, sxmiao)
      let time = 0
      my.timer2 = setInterval(
        () => {
          if (time < sxmiao * 1000 && time - sxmiao * 1000 < 50) {
            time += 50
          } else {
            clearInterval(my.timer2)
          }
          if (my.inx - 1 >= 0) {
            msak.state = {
              ml: roamData[my.inx - 1].ml,
              inx: my.inx,
              show: true
            }
          }
        },
        time > sxmiao * 1000 ? sxmiao * 1000 - time : 50
      )
    } else {
      // 先定位到当前的位置
      getGoTo(my.move)
    }
  }
}

/** 初始化判断天地图是否打开 */
onMounted(() => {
  form.tdt = interactive.state.tdt
})

onBeforeUnmount(() => {
  !msak.bgshow && (msak.bgshow = true)
  clearInter()
  document.removeEventListener('RELocateCam', RELocateCam)
  if (form.bim) {
    global.$BlackHole3D.BIM.setElemAlpha(mapuser.bimid, [], 0)
  }
})
</script>

<style scoped lang="scss">
.legend1,
.legend {
  position: absolute;
  top: 249px;
  right: 524px;
  pointer-events: none; /* 设置div不可被探测 */
  z-index: 3;
  .pauseAndContinue,
  .img-inner {
    position: relative;
    .img-item {
      .img {
        pointer-events: auto;
        cursor: pointer;
      }
      .title {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
      }
    }
    .leng-map {
      position: absolute;
      pointer-events: auto;
      top: 0px;
      right: 80px;
      width: 129px;
      padding-bottom: 10px;
      background: rgba(0, 75, 116, 0.8);
      border-radius: 1px;
      border: 1px solid rgba(76, 175, 255, 0.4);
      .legend-header {
        padding: 5px 14px 5px 9px;
        font-size: 14px;
        font-family:
          PingFangSC-Medium,
          PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
      }
      .legend-line {
        width: 100%;
        height: 2px;
        border: 2px solid rgba(44, 181, 255, 0.24);
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 22px;
          bottom: 1px;
          width: 20px;
          height: 3px;
          background: #23adff;
        }
      }
      .legend-conten {
        padding: 0px 14px 0px 9px;
        :deep(.el-switch) {
          height: 20px;
          width: 36px;
          .el-switch__core {
            background: #dae4eb;
            border-radius: 100px;
            height: 20px;
            // width: 33px !important;
            min-width: 36px;
            border: 0px solid rgba(0, 0, 0, 0.88);
            &::after {
              top: 1px;
              width: 13px;
              height: 13px;
              background: #ffffff;
              box-shadow: 0px 3px 6px 0px rgba(0, 35, 11, 0.2);
              border-radius: 14px;
              border: 0px solid rgba(0, 0, 0, 0.88);
            }
          }
        }
        :deep(.is-checked) {
          .el-switch__core {
            background: #23adff;
            border-radius: 100px;
            border: 0px solid rgba(0, 0, 0, 0.88);
          }
        }
        .t1 {
          font-size: 14px;
          font-family:
            PingFangSC-Regular,
            PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 24px;
        }
      }
    }
  }
}
.legend1 {
  right: 68px;
  transition: all 0.3s;
}
</style>
