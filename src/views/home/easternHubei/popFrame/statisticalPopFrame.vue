<!--
* @description 统计弹框(多个弹框页面公用的背景弹框)-solt->头部文字内容
* @fileName statisticalPopFrame.vue
* @author 
* @date 2024/02/23 14:12:35
!-->
<template>
  <el-dialog
    v-model="visibles"
    append-to-body
    align-center
    custom-class="statisticalPopFrame"
    destroy-on-close
    width="1444"
    :show-close="false"
    :before-close="close"
  >
    <div class="statistical">
      <div class="frame-header pt-23px pl-37px">
        <div class="frame-box">{{ title }}</div>
        <el-icon class="frame-close" @click="close"><CircleClose /></el-icon>
      </div>
      <component :is="comis" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Supervision from './supervisionStatistics.vue'
import ProcessInspection from './processInspectionStatistics.vue'
import QualityMonitoring from './qualityMonitoringStatistics.vue'
import QualityTable from './qualityTableStatistics.vue'
/** 统计页面的名称以及用什么组件 */
interface FrameCu {
  name: number
  title: string
}
const data = reactive([
  {
    name: '监理统计',
    com: Supervision
  },
  {
    name: '工序报验统计',
    com: ProcessInspection
  },
  {
    name: '质量表格统计',
    com: QualityTable
  },
  {
    name: '质量监测统计',
    com: QualityMonitoring
  }
])
const props = defineProps<{ visibles: boolean; frameCu: FrameCu }>()
const selfEmit = defineEmits(['close'])
const visibles = props.visibles
const title = props.frameCu.title
const comis = data[props.frameCu.name].com
const close = () => {
  selfEmit('close')
}
</script>

<style scoped lang="scss">
.statistical {
  .frame-header {
    position: relative;
    .frame-box {
      position: relative;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 36px;
      line-height: 42px;
      letter-spacing: 4px;
      background: linear-gradient(90deg, #ffffff 0%, #a3c3ff 100%);
      background: linear-gradient(180deg, #ffffff 0%, #a3c3ff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      &::after {
        content: '';
        position: absolute;
        left: 0px;
        bottom: -9px;
        width: 123px;
        height: 7px;
        background: url('@/assets/images/common/statisticalPopFrame-line.png');
        background-size: 100% 100%;
      }
    }
    .frame-close {
      position: absolute;
      font-size: 30px;
      top: 30px;
      right: 20px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
