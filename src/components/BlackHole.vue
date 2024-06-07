<!--
* @description 黑洞场景展示
* @fileName BlackHole.vue
* @author
* @date 2024/02/28 09:32:37
!-->
<template>
  <div class="emscripten_border" ref="canvasSceneBox">
    <div v-show="iscanvas" id="canvas-container" class="scene-container">
      <canvas ref="canvasRef" class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" tabindex="1" />
    </div>
    <div class="loading" v-show="showpercentage">
      <div class="loading-box">
        <div class="text-center">
          <img width="100" src="@/assets/images/menu/logo-1.png" />
        </div>
        <div class="uno-flex-y-center mt-10px loadingtext">
          <div style="flex: 1">环境加载中...</div>
          <div>{{ percentage }}%</div>
        </div>
        <el-progress
          class="mt-10px"
          :text-inside="true"
          :stroke-width="14"
          :percentage="percentage"
          define-back-color="rgba(69,102,131, .7)"
          :show-text="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick, inject } from 'vue'
import { componentStore } from '@/store/modules/component'
import mapuser from '@/config/user-map'
/** 获取全局对象 */
const global: any = inject('global')
const iscanvas = ref(false)
const showpercentage = ref(true)
const percentage = ref(0)
const canvasRef = ref<HTMLCanvasElement | null>()
const canvasSceneBox = ref<HTMLDivElement | null>()
const isshow = ref<boolean>(false)
let BlackHole3D: any = undefined
const component = componentStore()

onMounted(() => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  const canvasCopyFlag: boolean = isCanvasCopyed()
  if (!canvasCopyFlag) {
    initEngine()
  } else {
    nextTick(() => {
      BlackHole3D = global.$BlackHole3D
      const canvasBox = document.getElementById('canvas-container')
      let canvasContent = document.getElementById('canvas')
      if (canvasBox && canvasCopyFlag) {
        canvasBox.innerHTML = ''
        canvasContent = document.getElementById('canvas') as HTMLElement
        showpercentage.value = false
        iscanvas.value = false
        canvasBox.append(canvasContent)
        canvasContent.style.display = 'block'
      }
      RESystemEngineCreated({ detail: { succeed: 1 } })
    })
  }
  addEventListener()
})

/** 初始化加载 */
const initEngine = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  BlackHole3D = global.$BlackHole3D
  BlackHole3D = typeof BlackHole3D !== 'undefined' ? BlackHole3D : {}
  BlackHole3D['canvas'] = canvasRef.value
  if (typeof BlackHole3D.RealBIMWeb === 'undefined') {
    BlackHole3D = (window as any).CreateBlackHoleWebSDK(BlackHole3D)
  }
}
/** 新增监听 */
const addEventListener = () => {
  document.addEventListener('RESystemReady', RESystemReady)
  document.addEventListener('REDataSetLoadProgress', REDataSetLoadProgress)
  document.addEventListener('RESystemEngineCreated', RESystemEngineCreated)
  document.addEventListener('RESystemRenderReady', RESystemRenderReady)
  document.addEventListener('REDataSetLoadFinish', REDataSetLoadFinish) //模型加载完成状态
  document.addEventListener('RESystemSelElement', probeRet)
  window.addEventListener('beforeunload', onBeforeUnload)
  window.addEventListener('resize', onResize)
}
/** 系统初始化监听 */
const RESystemReady = () => {
  document.title = '首页'
  const sysInfo = new BlackHole3D.RESysInfo()
  sysInfo.workerjsPath = '../../public/blackhole/RealBIMWeb_Worker.js'
  sysInfo.renderWidth = canvasSceneBox.value?.clientWidth
  sysInfo.renderHieght = canvasSceneBox.value?.clientHeight
  sysInfo.userName = 'bjadmin'
  sysInfo.passWord = 'Bj@123456.'
  BlackHole3D.initEngineSys(sysInfo)
}
/** 判断是否第一次加载过 */
const isCanvasCopyed = () => {
  let canvasCopyFlag = false
  const canvasCollection: HTMLCollectionOf<HTMLCanvasElement> = document.getElementsByTagName('canvas')
  for (let i = 0; i < canvasCollection.length; i++) {
    if ((canvasCollection[i].parentNode as HTMLElement).tagName === 'BODY') {
      canvasCopyFlag = true
      break
    } else {
      canvasCopyFlag = false
    }
  }
  return canvasCopyFlag
}
// 模型加载进度监听
const REDataSetLoadProgress = (e: any) => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  if (!isshow.value) {
    showpercentage.value = true
    const percent = e.detail.progress
    if (percent < 100) {
      percentage.value = percent
      iscanvas.value = false
      showpercentage.value = true
    } else {
      percentage.value = 100
      iscanvas.value = true
      showpercentage.value = false
      isshow.value = true
      BlackHole3D.Camera.setCamLocateTo(mapuser.xmqfw, 0, 0)
      BlackHole3D.BIM.setElemAlpha(mapuser.bimid, [], 0)
      setBlendAttr()
      if (!global.$BlackHole3D) {
        global.$BlackHole3D = BlackHole3D
      }
      const _window = window as any
      _window.BlackHole3D = BlackHole3D
      clicLoad()
    }
  }
}
/** 场景初始化监听 */
const RESystemEngineCreated = (e: any) => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  const isSuccess = e.detail.succeed
  // 首页展示-场景列表（可以暂且不用获取场景列表，直接拿场景id就行）-场景信息-加载场景-默认视角
  if (isSuccess) {
    const worldCRS = 'EPSG:3857'
    BlackHole3D.Coordinate.setEngineWorldCRS(worldCRS)
    const gis =
      'PROJCS["Transverse_Mercator",GEOGCS["GCS_WGS_1984",DATUM["D_WGS84",SPHEROID["WGS84",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["scale_factor",1],PARAMETER["central_meridian",114.749999],PARAMETER["latitude_of_origin",0],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["Meter",1]]'
    const dataSetList = [
      {
        //天地图
        dataSetId: mapuser.tdw,
        resourcesAddress:
          'https://engine3.bjblackhole.com/engineweb/api/autoconvert/EngineRes/RequestEngineRes?dir=url_res04&path=3a0ee4e20ea988ae6935e332e0f1185e'
      },
      {
        dataSetId: mapuser.hfyx,
        dataSetCRS: 'EPSG:3857',
        resourcesAddress:
          'http://59.173.239.197:3010/blackhole3D/EngineRes/RequestEngineRes?dir=url_res02&path=3a0ff90950911db02646ac0a4c1c89e0',
        engineOrigin: [0, 0, 0.0]
      },
      {
        dataSetId: mapuser.bimid,
        resourcesAddress:
          'http://59.173.239.197:3010/blackHole3D/EngineRes/RequestEngineRes?dir=url_res02&path=3a12d42d7e83e79b141a996e0f704210',
        dataSetCRS: gis,
        engineOrigin: [500000, 3000000, 10.0]
      },
      {
        dataSetId: mapuser.qxid,
        resourcesAddress:
          'http://59.173.239.197:3010/blackhole3D/EngineRes/RequestEngineRes?dir=url_res02&path=3a111adfe1006cd08d352d70711bb02e',
        dataSetCRS: gis,
        engineOrigin: [0, 0, 10.0]
      }
    ]
    //场景初始化成功，执行模型加载
    BlackHole3D.Model.loadDataSet(dataSetList, true)
    BlackHole3D.Common.setMaxResMemMB(500)
    BlackHole3D.Common.setExpectMaxInstMemMB(400)
    BlackHole3D.Common.setExpectMaxInstDrawFaceNum(5000000)
    BlackHole3D.Common.setPageLoadLev(2)
    BlackHole3D.Graphics.setGeoCoordVisible(false) // 关闭左上UI
    BlackHole3D.Graphics.setViewCubeVisible(false) // 关闭右上相机
  } else {
    console.log('===========================  场景初始化 --> 失败！！！')
  }
}
/** 系统引擎渲染器初始化完成 */
const RESystemRenderReady = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  BlackHole3D.canvas.focus()
}
/** 模型加载完成状态 */
const REDataSetLoadFinish = (e: any) => {
  BlackHole3D.Graphics.setSysUIPanelVisible(false) // 关闭底部
  BlackHole3D.Common.setGhostState(false)
  if (e.detail.succeed) {
    //模型加载完成！！！
    // this.$emit('onloading', true)
  } else {
    //模型加载失败！！！
  }
}
/** 点击操作 */
const probeRet = () => {
  const ProbeRet = BlackHole3D.Probe.getCurCombProbeRet()
  console.log(ProbeRet)
  // 点击的是构件
  if (ProbeRet.elemType === 'BIMElem') {
    if (ProbeRet.dataSetId !== mapuser.qxid) {
      component.state.gild = ProbeRet.elemId
    }

    // 坐标轴显示
    component.state.axis = ProbeRet.elemCenter
    // this.$store.dispatch('mapInfo/setAxis', { info: ProbeRet.elemCenter })
    // // this.$emit('memberback', ProbeRet)
    // if (ProbeRet && Object.prototype.hasOwnProperty.call(ProbeRet, 'elemId')) {
    //   this.$store.dispatch('member/setGild', { info: ProbeRet.elemId })
    // }
  } else {
    component.state.axis = []
  }
}
/** 资源释放 */
const onBeforeUnload = () => {
  if (typeof (window as any).BlackHole3D.releaseEngine != 'undefined') {
    ;(window as any).BlackHole3D.releaseEngine()
  } //资源释放
}
/** 大小适应 */
const onResize = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | 首页'
  BlackHole3D.m_re_em_window_width = canvasSceneBox.value?.clientWidth
  BlackHole3D.m_re_em_window_height = canvasSceneBox.value?.clientHeight
}
/** 删除监听 */
const removeEventListener = () => {
  document.removeEventListener('RESystemReady', RESystemReady)
  document.removeEventListener('RESystemSelElement', probeRet)
  document.removeEventListener('REDataSetLoadProgress', REDataSetLoadProgress)
  document.removeEventListener('RESystemEngineCreated', RESystemEngineCreated)
  document.removeEventListener('REDataSetLoadFinish', REDataSetLoadFinish) //模型加载完成状态
  document.removeEventListener('RESystemRenderReady', RESystemRenderReady)
  window.removeEventListener('beforeunload', onBeforeUnload)
  window.removeEventListener('resize', onResize)
}
/** 设置高亮颜色 */
const setBlendAttr = () => {
  const blendAttr = new BlackHole3D.RESelElemsBlendAttr()
  blendAttr.elemClr = new BlackHole3D.REColor(255, 255, 0, 255)
  blendAttr.clrWeight = 255
  blendAttr.alphaWeight = 255
  blendAttr.probeMask = 0
  blendAttr.attrValid = true
  BlackHole3D.BIM.setSelElemsBlendAttr(blendAttr)
}
onBeforeUnmount(() => {
  BlackHole3D.Model.unloadAllDataSet()
  BlackHole3D.Panorama.unloadDataSet([])
  removeEventListener()
})

const emit = defineEmits(['clicLoad'])
const clicLoad = () => {
  emit('clicLoad')
}
</script>

<style scoped lang="scss">
.emscripten_border {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: block;
  .scene-container {
    height: 100%;
    .emscripten {
      width: 100%;
      height: 100%;
    }
  }
}
.loadingtext {
  font-size: 24px;
}
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 1);
  .loading-box {
    width: 300px;
    margin: 0 auto;
    margin-top: 13%;
    color: #409eff;
    font-size: 14px;
  }
}
</style>
