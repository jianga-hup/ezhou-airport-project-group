<!--
* @description 质量监理3级详情页面
* @fileName showDetails.vue
* @author 
* @date 2024/03/01 15:28:23
!-->
<template>
  <PopUpBox :visible="visible" :title="title" @close="close">
    <div class="content">
      <component :is="comis" :id="id" :type="type" />
    </div>
  </PopUpBox>
</template>

<script lang="ts" setup>
import PopUpBox from '@/components/DetailsPopUpBox.vue'
import InspectionDetails from './supervision/inspectionDetails.vue'
import PatrolDetails from './supervision/patrolDetails.vue'
import BystanderDetails from './supervision/bystanderDetails.vue'
import WorkingDetails from './workingprocedure/workingDetails.vue'
import QualityMonitoringDetails from './quality/qualityMonitoringDetails.vue'
import { reactive } from 'vue'
interface Props {
  visible: boolean
  popCu: { title: string; id: string; type?: string }
}
const data = reactive([
  {
    name: '监理巡视详情',
    com: PatrolDetails
  },
  {
    name: '监理指令详情',
    com: InspectionDetails
  },
  {
    name: '监理旁站详情',
    com: BystanderDetails
  },
  {
    name: '工序报验详情',
    com: WorkingDetails
  },
  {
    name: '质量监测详情',
    com: QualityMonitoringDetails
  }
])
const props = withDefaults(defineProps<Props>(), {
  visible: false
})
const type = props.popCu.type || ''
let title = props.popCu.title
if (props.popCu?.type === '0') {
  title = '拌合站详情'
} else if (props.popCu?.type === '1') {
  title = '压力机详情'
} else if (props.popCu?.type === '2') {
  title = '万能机详情'
}
const id = props.popCu.id
const comis = data.filter((e) => e.name === props.popCu.title)[0].com
const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
</script>

<style scoped lang="scss">
.content {
  padding: 45px 38px 0px 36px;
}
</style>
