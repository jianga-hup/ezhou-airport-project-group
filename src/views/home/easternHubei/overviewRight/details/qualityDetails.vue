<!--
 * @description 质量监测详情
 * @fileName qualityDetails.vue
 * @author 
 * @date 2024/02/29 16:44:02
 !-->
<template>
  <div class="qualityDetails">
    <MixingPlantTable :section="section" v-if="active === 0" @details="details" />
    <PressTable :section="section" v-if="active === 1" @details="details" />
    <UniversalMachineTable :section="section" v-if="active === 2" @details="details" />
  </div>
  <ShowDetails v-if="visible" :visible="visible" :popCu="popCu" @close="visible = false" />
</template>

<script lang="ts" setup>
import { getSectionList } from '@/api/home'
import MixingPlantTable from './quality/mixingPlantTable.vue'
import PressTable from './quality/pressTable.vue'
import UniversalMachineTable from './quality/universalMachineTable.vue'
import ShowDetails from './showDetails.vue'
import { onMounted, ref, reactive } from 'vue'
interface Props {
  active: number
}
withDefaults(defineProps<Props>(), {})
interface arbitrarily {
  [key: string]: any
}
interface Tree extends arbitrarily {
  groupId: string
  groupName: string
}
const section = ref<Tree[]>([])
const init = async () => {
  const { code, data } = await getSectionList()
  // console.log(code, data)
  if (code === 200) {
    section.value = data
  }
}
onMounted(() => {
  init()
})

const popCu = reactive({
  title: '',
  id: '',
  type: ''
})
const visible = ref(false)
/**
 * 单个详情页面
 * [组件名称, 详情标题]
 * id 唯一标识
 */
const details = (inner: string, id: string, type: string = '') => {
  popCu.title = inner
  popCu.id = id
  popCu.type = type
  visible.value = true
}
</script>

<style scoped lang="scss">
.qualityDetails {
  padding: 45px 38px 0px 36px;
}
</style>
