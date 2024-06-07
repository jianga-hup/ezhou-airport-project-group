<!--
* @description 工序3级详情页面
* @fileName workingDetails.vue
* @author 
* @date 2024/03/01 19:06:28
!-->
<template>
  <div class="working" v-if="!loading">
    <Collapse title="基本信息" basicinfo :basics="basics" :info="info" />
    <Collapse title="工序报验" basicinfo :basics="basics1" :info="info" />
    <Collapse title="巡查现场照片">
      <el-image
        v-for="(item, index) in images"
        :key="index"
        class="wihi-100 mr-10px"
        :src="item.diskPath"
        fit="contain"
        :preview-src-list="[item.diskPath]"
      />
    </Collapse>
  </div>
</template>

<script lang="ts" setup>
import { getGXBYDetails, queryFileList } from '@/api/home'
import Collapse from '../../../content/collapse.vue'
import { ref, onMounted } from 'vue'
interface Props {
  id: string
}
interface imgs {
  diskPath: string
  [key: string]: any
}
const basics = [
  { title: '发起人', value: 'zjHeadName', type: 1 },
  { title: '发起时间', value: 'creationTime', type: 1 },
  { title: '施工标段', value: 'sgSectionName', type: 1 },
  { title: '施工单位', value: 'sgUnit', type: 1 },
  { title: '监理标段', value: 'jlSectionName', type: 1 },
  { title: '监理单位', value: 'jlUnit', type: 1 }
]
const basics1 = [
  { title: '分部分项', value: 'fullPathName', type: 2 },
  { title: '单位工程', value: 'unitWorkName', type: 1 },
  { title: '分部工程', value: 'divisionalWorkName', type: 1 },
  { title: '分项工程', value: 'subitemWorkName', type: 1 },
  { title: '具体部位', value: 'positionName', type: 1 },
  { title: '分部分项补充描述', value: 'remark', type: 2 },
  { title: '报验项目名称', value: 'byProjectName', type: 1 },
  { title: '隐蔽工程', value: 'jlUnit', type: 1 },
  { title: '建议到场校验时间', value: 'jyInspectTime', type: 1 },
  { title: '编号', value: 'code', type: 1 },
  { title: '自检检验项', value: 'zjInspectionItems', type: 2 },
  { title: '质检负责人', value: 'creatorName', type: 1 },
  { title: '自检结果', value: 'zjResult', type: 1 }
]
const props = withDefaults(defineProps<Props>(), {})
const info = ref({ zjResult: '' })
const loading = ref<boolean>(true)
const images = ref<imgs[]>([])

const init = async () => {
  loading.value = true
  const { code, data } = await getGXBYDetails({ id: props.id })
  loading.value = false
  if (code === 200) {
    info.value = data
    info.value.zjResult = data.zjResult === 1 ? '符合设计及规范要求' : '不符合设计及规范要求'
  }
}

const getimgs = async () => {
  const { data, code } = await queryFileList({ bizId: props.id })
  if (code === 200) {
    images.value = data
  }
}

onMounted(() => {
  init()
  getimgs()
})
</script>

<style scoped lang="scss">
.working {
  max-height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
