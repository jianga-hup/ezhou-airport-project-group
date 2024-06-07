<!--
* @description 进度统计详情弹框
* @fileName ProgressStatisticsDetails.vue
* @author 
* @date 2024/03/01 10:44:40
!-->
<template>
  <PopUpBox :visible="visible" width="1666" :title="title" @close="close">
    <div class="content">
      <TableGantt
        :loading="state.loading"
        :table-data="state.tableData"
        :date-copy="state.tableDataCopy"
        :keys="state.keys"
      />
    </div>
  </PopUpBox>
</template>

<script lang="ts" setup>
import PopUpBox from '@/components/DetailsPopUpBox.vue'
import TableGantt from '../../content/tableGantt.vue'
import { progressSummaryStatisticsTable } from '@/api/home'
import { onMounted, reactive } from 'vue'
interface Tree {
  name: string
  code: string
  id: string
  endTime: string
  startTime: string
  list: Tree[]
  [key: string]: string | number | Tree[] | boolean | Tree
}
const props = withDefaults(defineProps<{ visible: boolean; title: string }>(), {
  visible: false
})
const visible = props.visible

const state = reactive({
  loading: true,
  keys: [],
  tableDataCopy: [],
  tableData: []
})

const init = async () => {
  state.loading = true
  const { code, data } = await progressSummaryStatisticsTable({
    type: '',
    startTime: '',
    endTime: ''
  })
  state.loading = false
  if (code === 200) {
    state.keys = data.map((item: Tree) => item.id) // 默认展开
    state.tableDataCopy = JSON.parse(JSON.stringify(data)) // 备份的全量数据
    const result = data.map((v: Tree) => {
      v.list = v.list.map((c: Tree) => {
        Reflect.deleteProperty(c, 'list')
        c.hasChildren = true
        c.list = []
        return c
      })
      return v
    })
    // console.log(result)
    state.tableData = result
  }
}

onMounted(() => {
  init()
})

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
