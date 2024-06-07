<!--
* @description 监理巡视-3级详情
* @fileName patrolDetails.vue
* @author
* @date 2024/03/01 18:46:26
!-->
<template>
  <div class="patrolDetails" v-if="!loading">
    <el-row>
      <el-col :span="12">
        <span class="t1 mr-10px">工程项目:</span>
        <span class="t1 t2">{{ info.projectName }}</span>
      </el-col>
      <el-col :span="12">
        <span class="t1 mr-10px">发起位置:</span>
        <span class="t1 t2">{{ info.location }}</span>
      </el-col>
    </el-row>
    <Collapse title="监理巡视" basicinfo :basics="basics" :info="info" />
    <Collapse title="巡查现场照片" :imgs="imgs" :srcList="srcList" />
    <Collapse title="附件" :fileList="fileList" file />
  </div>
</template>

<script lang="ts" setup>
import { getJLXSDetail } from '@/api/home'
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
  { title: '巡视人', value: 'inspectorList', type: 1 },
  { title: '巡视时间', value: 'inspectTime', type: 1 },
  { title: '分部分项', value: 'subProject', type: 1 },
  { title: '巡视范围', value: 'inspectRangeText', type: 1 },
  { title: '巡视记录模板', value: '', type: 2 },
  { title: '主要施工情况', value: 'constructionSituation', type: 2 },
  { title: '质量安全环保等情况', value: 'safetyConditionStr', type: 2 },
  { title: '发现的问题及处理意见', value: 'foundQuestion', type: 2 }
]
const props = withDefaults(defineProps<Props>(), {})
const info = ref({
  projectName: '',
  location: ''
})
const srcList = ref<string[]>([])
const imgs = ref<img[]>([])
const fileList = ref<flie[]>([])
const loading = ref<boolean>(true)

onMounted(() => {
  init()
})
const init = async () => {
  loading.value = true
  const { code, data } = await getJLXSDetail({ id: props.id })
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
.patrolDetails {
  max-height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .t1 {
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }
  .t2 {
    color: #ffffff;
  }
}
</style>
