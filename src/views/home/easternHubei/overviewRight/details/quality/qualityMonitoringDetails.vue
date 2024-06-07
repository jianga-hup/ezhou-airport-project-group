<!--
* @description 质量监测三级弹框
* @fileName qualityMonitoringDetails.vue
* @author
* @date 2024/03/04 09:59:04
!-->
<template>
  <div class="monitoring" v-loading="loading">
    <template v-if="!loading">
      <Collapse title="基本信息" basicinfo :basics="basics" :info="info" />
      <Collapse title="试验分析">
        <DetailsTable :table-data="tableData" :columns="columns" :TitleData="TitleData" :operation="false" />
      </Collapse>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Collapse from '../../../content/collapse.vue'
import DetailsTable from '../../../content/detailsTable.vue'
import { getBHZDetails, getYLJorWNJDetails } from '@/api/home'
import { ref, onMounted } from 'vue'
interface Props {
  id: string
  type: string
}
interface columnss {
  title: string
  key: string
  fixed?: string
  width?: number
}
interface basicss {
  title: string
  value: string
  type: number
}
const basicy = [
  { title: '压力机名称', value: 'device_name', type: 1 },
  { title: '试验日期', value: 'data_time', type: 1 },
  { title: '施工部位', value: 'address', type: 1 },
  { title: '评定结果', value: 'result', type: 1 }
]
const basicw = [
  { title: '万能机名称', value: 'device_name', type: 1 },
  { title: '试验日期', value: 'data_time', type: 1 },
  { title: '施工部位', value: 'address', type: 1 },
  { title: '评定结果', value: 'result', type: 1 }
]
const basicb = [
  { title: '拌合站名称', value: 'deviceName', type: 1 },
  { title: '保存时间', value: 'baocunshijian', type: 1 },
  { title: '拌和时间', value: 'jiaobanshijian', type: 1 },
  { title: '盘方量（m3)', value: 'gujifangshu', type: 1 },
  { title: '工程名称', value: 'gongchengmingcheng', type: 1 },
  { title: '浇筑部位', value: 'jiaozuobuwei', type: 1 },
  { title: '出料时间', value: 'chuliaoshijian', type: 1 },
  { title: '强度等级', value: 'qiangdudengji', type: 1 },
  { title: '水泥品种（42.5或52.5）', value: 'shuinipingzhong', type: 1 },
  {
    title: '粉煤灰品种（Ⅰ级或Ⅱ级）',
    value: 'waijiajipingzhong',
    type: 1
  }
]
const TitleData = ref<any[]>([])
const columny = [
  { title: '', key: 'index', width: 200 },
  { title: '试验日期', key: 'syrq', width: 200 },
  { title: '试件编号', key: 'sjbh', width: 200 },
  { title: '试件尺寸', key: '', width: 200 },
  { title: '龄期', key: 'lq', width: 200 },
  { title: '设计强度', key: 'sjqd', width: 200 },
  { title: '抗折荷载', key: '', width: 200 },
  { title: '抗折强度', key: '', width: 200 },
  { title: '抗压面积', key: '', width: 200 },
  { title: '抗折强度代表值', key: '', width: 200 },
  { title: '荷载', key: 'kylz', width: 200 },
  { title: '强度', key: 'kyqd', width: 200 },
  { title: '强度代表值', key: 'qddbz', width: 200 }
]
const columnw = [
  { title: '', key: 'index', width: 200 },
  { title: '试验日期', key: 'syrq', width: 200 },
  { title: '试件编号', key: 'sjbh', width: 200 },
  { title: '试件尺寸', key: '', width: 200 },
  { title: '公称直径', key: 'gczj', width: 200 },
  { title: '原始标距', key: '', width: 200 },
  { title: '断后标距', key: '', width: 200 },
  { title: '力值', key: 'zdlz', width: 200 },
  { title: '抗拉强度', key: 'klqd', width: 200 },
  { title: '屈服力值', key: 'qflz', width: 200 },
  { title: '屈服强度', key: 'qfqd', width: 200 },
  { title: '伸长率', key: '', width: 200 },
  { title: '最大力总伸长率', key: 'zdlzscl', width: 200 }
]
const basics = ref<basicss[]>([])
const info = ref({})
const loading = ref<boolean>(true)
const columns = ref<columnss[]>([])
const tableData = ref<any[]>([])
const props = withDefaults(defineProps<Props>(), {})
if (props.type === '0') {
  basics.value = basicb
} else if (props.type === '1') {
  basics.value = basicy
} else if (props.type === '2') {
  basics.value = basicw
}

const init = async () => {
  loading.value = true
  if (props.type === '0') {
    const { code, data } = await getBHZDetails({ bianhao: props.id })
    // console.log(code, data)
    if (code === 200) {
      tableData.value = [data]
      TitleData.value = data.list
      info.value = data
    }
    loading.value = false
  } else {
    const { code, data } = await getYLJorWNJDetails({ id: props.id })
    if (props.type === '1') {
      columns.value = columny
    } else {
      columns.value = columnw
    }
    if (code === 200) {
      info.value = data
      tableData.value = data.list.map((v: any, i: number) => {
        v.index = '第' + (i + 1) + '次试验'
        return v
      })
    }
    loading.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.monitoring {
  height: 700px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  :deep(.el-loading-mask) {
    background-color: transparent;
  }
}
</style>
