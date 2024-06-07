<!--
* @description 质量检测-压力机
* @fileName pressTable.vue
* @author
* @date 2024/02/29 19:34:21
!-->
<template>
  <el-form :model="form" class="form-inline" ref="ruleFormRef">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-form-item label="标段：" prop="departmentId">
          <el-select
            v-model="form.departmentId"
            placeholder="请选择"
            clearable
            popper-class="popperForm"
            style="width: 100%"
            @change="hdanleDevice"
          >
            <el-option v-for="item in section" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="压力机名称：" prop="deviceCode">
          <el-select
            v-model="form.deviceCode"
            placeholder="请选择"
            clearable
            popper-class="popperForm"
            style="width: 100%"
          >
            <el-option v-for="item in device" :key="item.deviceId" :label="item.name" :value="item.deviceId" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="评定结果：" prop="result">
          <el-select v-model="form.result" placeholder="请选择" clearable popper-class="popperForm" style="width: 100%">
            <el-option v-for="(item, i) in results" :key="i" :label="item.value" :value="item.value" />
          </el-select> </el-form-item
      ></el-col>
      <el-col :span="8">
        <el-form-item label="试验日期：" prop="time">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            popper-class="popperForm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          /> </el-form-item
      ></el-col>
      <el-col :span="5">
        <el-form-item label="状态：" prop="wfStatus">
          <el-select
            v-model="form.wfStatus"
            placeholder="请选择"
            clearable
            popper-class="popperForm"
            style="width: 100%"
          >
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="19">
        <div class="text-right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
  <DetailsTable :columns="columns" :tableData="tableData" :loading="loading" :height="550" />
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
import DetailsTable from '../../../content/detailsTable.vue'
import { getDeviceStatus, getWNJList } from '@/api/home'
import type { FormInstance } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
interface arbitrarily {
  [key: string]: any
}
interface Device extends arbitrarily {
  name: string
  deviceId: string
}
interface Tree extends arbitrarily {
  groupId: string
  groupName: string
}
interface Props {
  section: Tree[]
}
interface columnss {
  title: string
  key: string
  fixed?: string
  width?: number
}
const ruleFormRef = ref<FormInstance>()
withDefaults(defineProps<Props>(), {})
const form = reactive({
  departmentId: '',
  deviceCode: '',
  time: '',
  result: '',
  wfStatus: ''
})
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const device = ref<Device[]>([])
const results: { value: string }[] = [{ value: '合格' }, { value: '不合格' }]
const statusList: { value: string; label: string }[] = [
  {
    value: '0',
    label: '未上报'
  },
  {
    value: '1',
    label: '处理中'
  },
  {
    value: '2',
    label: '已处理'
  }
]
const loading = ref(true)
const columns = ref<columnss[]>([
  { title: '压力机名称', key: 'deviceName', width: 200 },
  { title: '试验类型', key: 'testName', width: 200 },
  { title: '施工部位', key: 'address', width: 200 },
  { title: '制件日期', key: 'zzrq', width: 200 },
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
  { title: '强度代表值', key: 'qddbz', width: 200 },
  { title: '评定结果', key: 'result', width: 200 },
  { title: '处理状态', key: 'wfStatusCh', width: 200 },
  { title: '备注', key: 'remark', width: 200 }
  // { title: '操作', key: '' }
])
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
const init = async () => {
  loading.value = true
  const { code, data } = await getWNJList({
    type: 3,
    result: form.result,
    wfStatus: form.wfStatus,
    departmentId: form.departmentId,
    deviceCode: form.deviceCode,
    startTime: form.time.length ? form.time[0] : '',
    endTime: form.time.length ? form.time[1] : '',
    pageSize: page.pageSize,
    pageNum: page.pageNum
  })
  loading.value = false
  if (code === 200) {
    tableData.value = data.list.map((item: any) => {
      item.zzrq = item.detail[0].zzrq
      item.syrq = item.detail[0].syrq
      item.sjbh = item.detail[0].sjbh
      item.lq = item.detail[0].lq
      item.sjqd = item.detail[0].sjqd
      item.remark = item.detail[0].remark
      item.qddbz = item.detail[0].qddbz
      item.kylz = item.detail.map((e: { kylz: '' }) => e.kylz).join(' ')
      item.kyqd = item.detail.map((e: { kyqd: '' }) => e.kyqd).join(' ')
      item.wfStatusCh = item.wfStatus == 0 ? '未上报' : item.wfStatus == 1 ? '处理中' : '已处理'
      return { ...item }
    })
    page.total = data.total
  } else {
    tableData.value = []
    page.total = 0
  }
}
/** 点击标段 */
const hdanleDevice = () => {
  form.deviceCode = ''
  device.value = []
  getDevice()
}
const getDevice = async () => {
  const { code, data } = await getDeviceStatus({
    departmentId: form.departmentId,
    type: 3
  })
  if (code === 200) {
    device.value = data.list
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
onMounted(() => {
  init()
})
</script>

<style scoped lang="scss"></style>
