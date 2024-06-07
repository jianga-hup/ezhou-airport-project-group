<!--
* @description 质量-拌合站-表格
* @fileName mixingPlantTable.vue
* @author
* @date 2024/02/29 16:49:12
!-->
<template>
  <el-form :inline="true" :model="form" class="form-inline" ref="ruleFormRef">
    <el-form-item label="标段：" prop="sectionId">
      <el-select
        v-model="form.sectionId"
        placeholder="请选择"
        clearable
        popper-class="popperForm"
        style="width: 180px"
        @change="hdanleDevice"
      >
        <el-option v-for="item in section" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
      </el-select>
    </el-form-item>
    <el-form-item label="拌合站名称：" prop="deviceCode">
      <el-select
        v-model="form.deviceCode"
        placeholder="请选择"
        clearable
        popper-class="popperForm"
        style="width: 180px"
      >
        <el-option v-for="item in device" :key="item.shebeibianhao" :label="item.name" :value="item.shebeibianhao" />
      </el-select>
    </el-form-item>
    <el-form-item label="出料时间：" prop="time">
      <el-date-picker
        v-model="form.time"
        type="daterange"
        popper-class="popperForm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
      />
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
    :TitleData="TitleData"
    :border="true"
    :operation="false"
    :height="580"
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
</template>

<script lang="ts" setup>
import DetailsTable from '../../../content/detailsTable.vue'
import { getDeviceStatus, getBHZSCList } from '@/api/home'
import type { FormInstance } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
interface arbitrarily {
  [key: string]: any
}
interface Device extends arbitrarily {
  name: string
  shebeibianhao: string
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
  sectionId: '',
  deviceCode: '',
  time: ''
})
const device = ref<Device[]>([])
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const loading = ref(true)
const columns = ref<columnss[]>([])
const tableData = ref<any[]>([])
const TitleData = ref<any[]>([])

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
/** 点击标段 */
const hdanleDevice = () => {
  form.deviceCode = ''
  device.value = []
  getDevice()
}
const getDevice = async () => {
  const { code, data } = await getDeviceStatus({
    departmentId: form.sectionId,
    type: 1
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
const init = async () => {
  loading.value = true
  const { code, data } = await getBHZSCList({
    sectionId: form.sectionId,
    deviceCode: form.deviceCode,
    startTime: form.time.length ? form.time[0] : '',
    endTime: form.time.length ? form.time[1] : '',
    pageNum: page.pageNum,
    pageSize: page.pageSize
  })
  loading.value = false
  if (code === 200 && data.list.length) {
    // console.log(data)
    TitleData.value = data.list[0].list
    tableData.value = data.list
    columns.value = [
      { title: '拌合站名称', key: 'deviceName', width: 200 },
      { title: '保存时间', key: 'baocunshijian', width: 200 },
      { title: '拌和时间', key: 'jiaobanshijian', width: 200 },
      { title: '盘方量（m3)', key: 'gujifangshu', width: 200 },
      {
        title: '工程名称',
        key: 'gongchengmingcheng',
        width: 200
      },
      { title: '浇筑部位', key: 'jiaozuobuwei', width: 200 },
      { title: '出料时间', key: 'chuliaoshijian', width: 200 },
      { title: '强度等级', key: 'qiangdudengji', width: 200 },
      {
        title: '水泥品种（42.5或52.5）',
        key: 'shuinipingzhong',
        width: 200
      },
      {
        title: '粉煤灰品种（Ⅰ级或Ⅱ级）',
        key: 'waijiajipingzhong',
        width: 220
      }
    ]
    page.total = data.total
  } else {
    tableData.value = []
    page.total = 0
  }
}
onMounted(() => {
  init()
})

// const emit = defineEmits(['details'])
// const cliclPview = (e: any) => {
//   emit('details', '质量监测详情', e.bianhao, '0')
// }
</script>

<style scoped lang="scss"></style>
