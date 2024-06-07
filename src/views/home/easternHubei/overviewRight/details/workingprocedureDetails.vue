<!--
* @description 工序报验详情
* @fileName workingprocedureDetails.vue
* @author
* @date 2024/02/29 15:51:51
!-->
<template>
  <div class="workingprocedureDetails">
    <el-form :inline="true" :model="form" class="form-inline" ref="ruleFormRef">
      <el-form-item label="上报时间：" prop="inspectTime">
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
      <el-form-item label="标段：" prop="sgSectionId">
        <el-select
          v-model="form.sgSectionId"
          placeholder="请选择"
          clearable
          popper-class="popperForm"
          style="width: 180px"
        >
          <el-option v-for="item in section" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字：" prop="keyWord">
        <el-input v-model="form.keyWord" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <DetailsTable
      :columns="columns"
      class="mt-20px"
      :tableData="tableData"
      :loading="loading"
      :height="570"
      @cliclPview="cliclPview"
    />
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
  </div>
  <ShowDetails v-if="visible" :visible="visible" :popCu="popCu" @close="visible = false" />
</template>

<script lang="ts" setup>
import DetailsTable from '../../content/detailsTable.vue'
import { getSectionList, getGXBYList } from '@/api/home'
import ShowDetails from './showDetails.vue'
import type { FormInstance } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
interface column {
  title: string
  key: string
  fixed?: string
}
interface sections {
  groupId: string
  groupName: string
  [key: string]: string | number | null | undefined
}
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  inspectTime: '',
  keyWord: '',
  sgSectionId: ''
})
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const columns: column[] = [
  { title: '监理标段', key: 'jlSectionName' },
  { title: '施工标段', key: 'sgSectionName' },
  { title: '单位工程', key: 'unitWorkName' },
  { title: '分部工程', key: 'divisionalWorkName' },
  { title: '分项工程', key: 'subitemWorkName' },
  { title: '工序名称', key: 'byprojectName' },
  { title: '具体部位', key: 'positionName' },
  { title: '报验人', key: 'creatorName' },
  { title: '报验时间', key: 'creationTime' },
  { title: '验收人', key: 'jlName' },
  { title: '状态描述', key: 'wfTaskName' },
  { title: '操作', key: '' }
]
const loading = ref(true)
const section = ref<sections[]>([])
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
const getSection = async () => {
  const { code, data } = await getSectionList()
  if (code === 200) {
    section.value = data
  }
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
  const { code, data } = await getGXBYList({
    dataStatus: 2,
    keyWord: form.keyWord,
    sgSectionId: form.sgSectionId,
    startTime: form.inspectTime.length ? form.inspectTime[0] : '',
    endTime: form.inspectTime.length ? form.inspectTime[1] : '',
    pageSize: page.pageSize,
    pageNum: page.pageNum
  })
  loading.value = false
  if (code === 200) {
    tableData.value = data.list
    page.total = data.total
  }
}
onMounted(() => {
  getSection()
  init()
})

const popCu = reactive({
  title: '',
  id: '',
  type: ''
})
const visible = ref(false)
const cliclPview = (e: any) => {
  popCu.title = '工序报验详情'
  popCu.id = e.id
  visible.value = true
}
</script>

<style scoped lang="scss">
.workingprocedureDetails {
  padding: 45px 38px 0px 36px;
}
</style>
