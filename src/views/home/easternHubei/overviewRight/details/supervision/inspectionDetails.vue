<!--
* @description 监理指令-3级详情
* @fileName inspectionDetails.vue
* @author
* @date 2024/03/01 16:20:01
!-->
<template>
  <div class="inspection" v-if="!loading">
    <Collapse title="监理指令" basicinfo :basics="basics" :info="info" />
    <Collapse title="巡查现场照片" :imgs="imgs" :srcList="srcList" />
    <Collapse title="附件" :fileList="fileList" file />
  </div>
</template>

<script lang="ts" setup>
import { getJLZLDetails } from '@/api/home'
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
  { title: '监理机构', value: 'supervisoryOrganization', type: 1 },
  { title: '要求回复日期', value: 'requestReplyDate', type: 1 },
  { title: '指令标题', value: 'title', type: 2 },
  { title: '监理指令内容', value: 'content', type: 2 }
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
  const { code, data } = await getJLZLDetails({ id: props.id })
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
.inspection {
  max-height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
