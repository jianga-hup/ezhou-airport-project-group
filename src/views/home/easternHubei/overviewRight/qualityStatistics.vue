<!--
* @description 质量统计
* @fileName qualityStatistics.vue
* @author
* @date 2024/01/30 15:23:46
!-->
<template>
  <CardTitle :show="true" title="质量统计" class="mt-30px">
    <Tabs :list="list" v-model="active" class="absolute -top-5px -right-6px" />
  </CardTitle>
  <QualitySupervision v-if="active === 0" @detailsall="detailsall" @details="details" />
  <ProcessQualityInspection v-if="active === 1" @detailsall="detailsall" @details="details" />
  <QualityInspectionForm v-if="active === 2" @detailsall="detailsall" />
  <!-- <QualityMonitoring v-if="active === 2" @detailsall="detailsall" @details="details" /> -->
  <Details v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="visibles = false" />
  <ShowDetails v-if="Tvisible" :visible="Tvisible" :popCu="popCu" @close="Tvisible = false" />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Tabs from '../content/tabs.vue'
import QualitySupervision from './qualityStatistics-qualitySupervision.vue'
import ProcessQualityInspection from './qualityStatistics-processQualityInspection.vue'
import QualityInspectionForm from './qualityStatistics-qualityInspectionForm.vue'
// import QualityMonitoring from './qualityStatistics-qualityMonitoring.vue'
import Details from './details/details.vue'
import ShowDetails from './details/showDetails.vue'
const list = [
  { name: '质量监理', id: 0 },
  { name: '工序报验', id: 1 },
  { name: '质检表格', id: 2 }
  // { name: '质量监测', id: 2 }
]
const active = ref<number>(0)
const visibles = ref<boolean>(false)
const Tvisible = ref<boolean>(false)
const popCu = reactive({
  title: '',
  id: '',
  type: ''
})
const frameCu = reactive({
  name: 0
})

/** tabs详情页面 */
const detailsall = (val: number) => {
  frameCu.name = val
  visibles.value = true
}
/**
 * 单个详情页面
 * [组件名称, 详情标题]
 * id 唯一标识
 */
const details = (inner: string, id: string, type: string = '') => {
  popCu.title = inner
  popCu.id = id
  popCu.type = type
  Tvisible.value = true
}
</script>

<style scoped lang="scss"></style>
