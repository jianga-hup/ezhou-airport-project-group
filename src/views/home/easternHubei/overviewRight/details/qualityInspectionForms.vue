<!--
* @description 质检表格列表
* @fileName qualityInspectionForms.vue
* @author
* @date 2024/06/04 16:14:06
!-->
<template>
  <div class="qualityInspectionForms">
    <el-form :inline="true" :model="form" class="form-inline" ref="ruleFormRef">
      <el-form-item label="标段：" prop="bdId">
        <el-select
          v-model="form.bdId"
          placeholder="请选择"
          clearable
          popper-class="popperForm"
          @change="getUnit"
          style="width: 130px"
        >
          <el-option v-for="item in bdList" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
        </el-select>
      </el-form-item>
      <el-form-item label="单体工程：" prop="bdpId">
        <el-select v-model="form.bdpId" placeholder="请选择" clearable popper-class="popperForm" style="width: 180px">
          <el-option v-for="item in dtgcList" :key="item.id" :label="item.name" :value="item.treeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="完成时间：" prop="date">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          popper-class="popperForm"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择" clearable popper-class="popperForm" style="width: 110px">
          <el-option v-for="(item, i) in statusList" :key="i" :label="item.dictName" :value="item.dictCode" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="tablebg"
      v-loading="loading"
      max-height="600"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-row-style="{
        background: 'rgba(199,233,253,0.1)',
        'border-radius': '4px',
        'font-family': 'PingFang SC, PingFang SC',
        'font-weight': 400,
        'font-size': '14px',
        color: '#E0F2FE'
      }"
    >
      <el-table-column prop="bdmc" label="标段" align="center" />
      <el-table-column prop="dw_name" label="单体工程" align="center" />
      <el-table-column prop="gcbw" label="工程部位" align="center" />
      <el-table-column prop="bgmc" label="表名" align="center" />
      <el-table-column prop="tbr" label="填报人" align="center" />
      <el-table-column prop="wcsj" label="完成时间" align="center" />
      <el-table-column prop="tx_state" label="状态" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="cliclPview(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  <QualityInspectionDetails v-if="visible" :title="title" :visible="visible" :url="url" @close="visible = false" />
</template>

<script lang="ts" setup>
import { selectByIndexId, queryAllUnitBySectionId, websiteListjson } from '@/api/home'
import type { FormInstance } from 'element-plus'
import QualityInspectionDetails from './qualityInspectionDetails.vue'
import { reactive, onMounted, ref } from 'vue'
import moment from 'moment'
interface changeRowParameter {
  row: any
  rowIndex: number
}
interface BDs {
  groupId: string
  groupName: string
}
interface DTgc {
  id: string
  name: string
  treeId: string
}
interface Table {
  bdmc: string
  dw_name: string
  gcbw: string
  bgmc: string
  tbr: string
  wcsj: string
  tx_state: string
  url: string
}

const ruleFormRef = ref<FormInstance>()
const form = reactive<{
  bdId: string
  bdpId: string
  date: [Date, Date] | [string, string]
  status: string
  treeId: string
}>({
  bdId: '',
  bdpId: '',
  date: ['', ''],
  status: '0,1,2,3,4,5',
  treeId: ''
})
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const loading = ref(true)
const tableData = ref<Table[]>([])
const bdList = ref<BDs[]>([])
const dtgcList = ref<DTgc[]>([])
/** 0-未填 1-已填 2-已报审 3-已审批 4-签章中 5-已章，不传返回全部 */
const statusList = ref<{ dictName: string; dictCode: string }[]>([
  { dictName: '全部', dictCode: '0,1,2,3,4,5' },
  { dictName: '未填', dictCode: '0' },
  { dictName: '已填', dictCode: '1' },
  { dictName: '已报审', dictCode: '2' },
  { dictName: '已审批', dictCode: '3' },
  { dictName: '签章中', dictCode: '4' },
  { dictName: '已章', dictCode: '5' }
])
const visible = ref(false)
const url = ref('')
const title = ref('')

const init = async () => {
  loading.value = true
  const obj = {
    page: page.pageNum,
    rows: page.pageSize,
    TX_RI1: form.date ? (form.date[0] as string) : '',
    TX_RI2: form.date ? (form.date[1] as string) : '',
    treeid_like: form.bdpId || '101|',
    TX_STATE: form.status
  }
  const res = await websiteListjson(obj)
  loading.value = false
  if (res.rows && res.rows.length) {
    tableData.value = res.rows
    page.total = res.total ?? 0
  } else {
    tableData.value = []
    page.total = 0
  }
}
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
/** 查看 */
const cliclPview = (val: Table) => {
  visible.value = true
  url.value = val.url
  title.value = val.bgmc
}
const tableRowClassName = ({ rowIndex }: changeRowParameter) => {
  if (rowIndex % 2 == 0) {
    return ''
  } else {
    return 'statistics-warning-row'
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
/** 获取标段 */
const getSection = async () => {
  const { code, data = [] } = await selectByIndexId({ indexId: '-1' })
  if (code == 200 && data.length) {
    const arr: BDs[] = []
    data.map((item: { oldId: string; oldName: string; treeId: string }) => {
      arr.push({
        groupId: item.oldId,
        groupName: item.oldName
      })
    })
    bdList.value = arr
    form.treeId = data[0].treeId
  }
}

onMounted(() => {
  form.date = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
  getSection()
  init()
})

/** 获取单位 */
const getUnit = async (id: string) => {
  const { code, data = [] } = await queryAllUnitBySectionId({ sectionId: id })
  if (code == 200 && data.length) {
    form.bdpId = data[0].treeId
    dtgcList.value = data
  }
}
</script>

<style scoped lang="scss">
.qualityInspectionForms {
  padding: 45px 38px 0px 36px;
}
</style>
