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
              <div class="t1">CAD图纸</div>
              <el-switch v-model="form.cad" @change="onswitch('cad')" />
            </div>
          </template>
        </div>
      </div>
    </div>
    <ZoomInOut />
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { ref, reactive, inject, onMounted } from 'vue'
import mapuser from '@/config/user-map'
import { interactiveStore } from '@/store/modules/interactive'
import { isLoadCAD, hideCAD } from '@/hooks/useProject' // 一些交互操作
import ZoomInOut from '@/components/ZoomInOut.vue'
withDefaults(defineProps<{ isshow: boolean }>(), {})
/** 获取全局对象 */
const global: any = inject('global')
interface imgss {
  img: string
  type: string
  title: string
}
const imgs: imgss[] = [
  {
    img: '@/assets/images/common/fuw.png',
    type: 'fw',
    title: '复位'
  },
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
  cad: false
})
const active = ref<string>('')
const interactive = interactiveStore()

const hadleclick = (e: imgss) => {
  // console.log(JSON.stringify(global.$BlackHole3D.Camera.getCamLocate()))
  if (type.includes(active.value) && active.value === e.type) {
    active.value = ''
  } else {
    active.value = e.type
  }
  if (e.type === 'fw') {
    global.$BlackHole3D.Camera.setCamLocateTo(mapuser.whfw, 0, 0)
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
      // 打开武黄CAD
      isLoadCAD(global, ['whgs'])
    } else {
      // 关闭鄂东CAD
      hideCAD(global, 2)
    }
    interactive.state.cads[1] = form[key] ? true : false
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

/** 初始化判断天地图是否打开 */
onMounted(() => {
  form.tdt = interactive.state.tdt
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
