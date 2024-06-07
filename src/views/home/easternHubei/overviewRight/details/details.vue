<!--
* @description 详情弹框
* @fileName details.vue
* @author
* @date 2024/02/28 19:54:55
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
        <Tabs :tabs="tabs" v-model="active" />
        <div />
        <el-icon class="frame-close" @click="close"><CircleClose /></el-icon>
      </div>
      <component :is="comis" :active="active" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import Tabs from '../../content/tabsDetails.vue'
import SupervisionDetails from './supervisionDetails.vue'
import WorkingprocedureDetails from './workingprocedureDetails.vue'
import QualityDetails from './qualityDetails.vue'
import QualityInspectionForms from './qualityInspectionForms.vue'
/** 统计页面的名称以及用什么组件 */
interface FrameCu {
  name: number
}
const data = reactive([
  {
    name: '监理详情',
    com: SupervisionDetails,
    tabs: ['监理巡视', '监理指令', '监理旁站']
  },
  {
    name: '工序报验详情',
    com: WorkingprocedureDetails,
    tabs: ['工序报验']
  },
  {
    name: '质量监测详情',
    com: QualityDetails,
    tabs: ['拌合站生产', '压力机试验', '万能机试验']
  },
  {
    name: '质检表格详情',
    com: QualityInspectionForms,
    tabs: ['质检表格列表']
  }
])
const active = ref<number>(0)
const props = defineProps<{ visibles: boolean; frameCu: FrameCu }>()
const selfEmit = defineEmits(['close'])
const visibles = props.visibles
const comis = data[props.frameCu.name].com
const tabs = data[props.frameCu.name].tabs
const close = () => {
  selfEmit('close')
}
</script>

<style scoped lang="scss">
.statistical {
  .frame-header {
    position: relative;
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
