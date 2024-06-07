<!--
* @description 监理旁站-3级详情
* @fileName bystanderDetails.vue
* @author
* @date 2024/03/01 18:54:53
!-->
<template>
  <div class="bystander" v-if="!loading">
    <Collapse title="监理旁站" basicinfo :basics="basics" :info="info" />
    <Collapse title="巡查现场照片" :imgs="imgs" :srcList="srcList" />
    <Collapse title="附件" :fileList="fileList" file />
  </div>
</template>

<script lang="ts" setup>
import { getJLPZDetails } from '@/api/home'
import Collapse from '../../../content/collapse.vue'
import { ref, onMounted } from 'vue'
interface Props {
  id: string
}
interface img {
  pileNumber: string
  shootingDate: string
  [key: string]: any
}
interface flie {
  url: string | null
  fileId: string | null
  remark: string | null
  fileName: string | null
}
const basics = [
  { title: '合同段', value: 'contractSection', type: 1 },
  { title: '施工单位', value: 'constructionUnit', type: 1 },
  { title: '旁站人', value: 'bystander', type: 1 },
  { title: '旁站时间', value: 'besideDate', type: 1 },
  { title: '分部分项', value: 'subProject', type: 1 },
  { title: '分部分项补充说明', value: 'subProjectDescription', type: 1 },
  { title: '旁站项目', value: 'besideProject', type: 1 },
  { title: '施工过程简述', value: 'constructionProcessStr', type: 2 },
  { title: '旁站工作情况', value: 'besideSituationStr', type: 2 },
  { title: '主要数据记录', value: 'dataRecordingStr', type: 2 },
  { title: '发现的问题及处理意见', value: 'foundQuestion', type: 2 }
]
const props = withDefaults(defineProps<Props>(), {})
const info = ref({})
const srcList = ref<string[]>([])
const imgs = ref<img[]>([])
const fileList = ref<flie[]>([])
const loading = ref<boolean>(true)

onMounted(() => {
  init()
})
const init = async () => {
  loading.value = true
  const { code, data } = await getJLPZDetails({ id: props.id })
  loading.value = false
  // console.log(code, data)
  if (code === 200) {
    info.value = data
    if (data.image !== null) {
      const arr1 = JSON.parse(data.image)
      arr1.map((v: img) => {
        v.images = JSON.parse(v.images)
        v.images.map((i: any) => {
          srcList.value.push(i.url)
        })
        return v
      })
      imgs.value = arr1
    }
    if (data.file !== null) {
      data.file = JSON.parse(data.file)
      fileList.value = data.file
    }
  }
}
</script>

<style scoped lang="scss">
.bystander {
  max-height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
