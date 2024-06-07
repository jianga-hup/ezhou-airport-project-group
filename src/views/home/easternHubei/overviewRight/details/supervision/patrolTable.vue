<!--
* @description 监理-巡视-表格
* @fileName patrolTable.vue
* @author
* @date 2024/02/29 09:32:42
!-->
<template>
  <el-form :inline="true" :model="form" class="form-inline" ref="ruleFormRef">
    <el-form-item label="巡视时间：" prop="inspectTime">
      <el-date-picker
        v-model="form.inspectTime"
        type="daterange"
        popper-class="popperForm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="合同段：" prop="contractSectionList">
      <el-cascader
        v-model="form.contractSectionList"
        class="darkcader"
        popper-class="dark-them"
        :props="propss"
        :options="options"
      />
    </el-form-item>
    <el-form-item label="巡视人：" prop="inspector">
      <el-input v-model="form.inspector" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="状态：" prop="status">
      <el-select v-model="form.status" placeholder="请选择" clearable popper-class="popperForm" style="width: 160px">
        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
  </el-form>
  <div class="text-right">
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
  </div>
  <DetailsTable :columns="columns" class="mt-20px" :tableData="tableData" :loading="loading" @cliclPview="cliclPview" />
  <div class="text-right flex flex-justify-end mt-20px">
    <el-pagination
      v-model:current-page="page.pageNum"
      v-model:page-size="page.pageSize"
      class="page"
      popper-class="popperForm"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { selectDataList } from '@/api/home'
import DetailsTable from '../../../content/detailsTable.vue'
import type { FormInstance } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
interface Props {
  options: any[]
}
interface column {
  title: string
  key: string
  fixed?: string
}
const ruleFormRef = ref<FormInstance>()
withDefaults(defineProps<Props>(), {})
const form = reactive({
  inspectTime: '',
  contractSectionList: [],
  inspector: '',
  status: ''
})
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const loading = ref(true)
const propss = { multiple: true, value: 'sectionId', label: 'name', emitPath: false }
const statusList: { label: string; value: string }[] = [
  { label: '未启动', value: '0' },
  { label: '处理中', value: '1' },
  { label: '已完成', value: '2' }
]
const columns: column[] = [
  { title: '记录编号', key: 'recordNumber' },
  { title: '填报日期', key: 'createTime' },
  { title: '巡视日期', key: 'inspectTime' },
  { title: '合同段', key: 'contractSection' },
  { title: '施工单位', key: 'constructionUnit' },
  { title: '巡视人', key: 'inspector' },
  { title: '巡视人部门', key: 'inspectorDepart' },
  { title: '岗位', key: 'besidePost' },
  { title: '状态', key: 'status' },
  { title: '操作', key: '' }
]
const tableData = ref<any[]>([])
/** 查询 */
const onSubmit = () => {
  page.pageNum = 1
  init()
}
/** 重置 */
const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  onSubmit()
}

const handleSizeChange = (val: number) => {
  page.pageSize = val
  onSubmit()
}
const handleCurrentChange = (val: number) => {
  page.pageNum = val
  init()
}

const init = async () => {
  loading.value = true
  const { code, data } = await selectDataList({
    inspectBeginTime: form.inspectTime.length ? form.inspectTime[0] : '',
    inspectEndTime: form.inspectTime.length ? form.inspectTime[1] : '',
    contractSectionList: form.contractSectionList,
    inspector: form.inspector,
    status: form.status,
    searchType: '1',
    pageSize: page.pageSize,
    pageNum: page.pageNum
  })
  loading.value = false
  // console.log(code, data)
  if (code === 200) {
    tableData.value = data.list
    page.total = data.total
  }
}
onMounted(() => {
  init()
})

const emit = defineEmits(['details'])
const cliclPview = (e: any) => {
  emit('details', '监理巡视详情', e.id)
}
</script>

<style scoped lang="scss"></style>
