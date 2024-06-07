<!--
* @description 详情-指令-表格
* @fileName instructionsTable.vue
* @author
* @date 2024/02/29 14:39:02
!-->
<template>
  <el-form :model="form" class="form-inline" ref="ruleFormRef">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="要求回复日期：" prop="inspectTime">
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
      </el-col>
      <el-col :span="8">
        <el-form-item label="合同段：" prop="contractSectionList">
          <el-cascader
            v-model="form.contractSectionList"
            class="darkcader w-100%"
            popper-class="dark-them"
            :props="propss"
            :options="options"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="关键字：" prop="keyWord">
          <el-input
            v-model="form.keyWord"
            placeholder="请输入指令编号、施工单位、起草人、签发人、复查人"
          /> </el-form-item
      ></el-col>
      <el-col :span="8">
        <el-form-item label="状态：" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            clearable
            popper-class="popperForm"
            style="width: 160px"
          >
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <div class="text-right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
  <DetailsTable :columns="columns" :tableData="tableData" :loading="loading" @cliclPview="cliclPview" />
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
import { getJLZLList } from '@/api/home'
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
  keyWord: '',
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
  { title: '指令编号', key: 'instructionNumber' },
  { title: '填报日期', key: 'createTime' },
  { title: '要求回复日期', key: 'requestReplyDate' },
  { title: '合同段', key: 'contractSection' },
  { title: '施工单位', key: 'constructionUnit' },
  { title: '起草人', key: 'createBy' },
  { title: '起草人部门', key: 'createDepart' },
  { title: '起草人岗位', key: 'job' },
  { title: '状态', key: 'flowStatusStr' },
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
  const { code, data } = await getJLZLList({
    startReplyDate: form.inspectTime.length ? form.inspectTime[0] : '',
    endReplyDate: form.inspectTime.length ? form.inspectTime[1] : '',
    contractSection: form.contractSectionList,
    keyWord: form.keyWord,
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
  emit('details', '监理指令详情', e.id)
}
</script>

<style scoped lang="scss"></style>
