<!--
* @description 详情-表格-组件
* @fileName detailsTable.vue
* @author
* @date 2024/02/29 10:57:45
!-->
<template>
  <el-table
    :data="tableData"
    v-loading="loading"
    style="width: 100%"
    class="tablebg"
    :border="border"
    :max-height="height"
    :header-row-style="{
      background: 'rgba(199,233,253,0.1)',
      'border-radius': '4px',
      'font-family': 'PingFang SC, PingFang SC',
      'font-weight': 400,
      'font-size': '14px',
      color: '#E0F2FE'
    }"
    :row-class-name="tableRowClassName"
  >
    <el-table-column v-for="(e, i) in columns" :key="i" :prop="e.key" :label="e.title" align="center" :width="e.width">
      <template v-if="e.title === '操作'" #default="scope">
        <el-button type="primary" link @click="cliclPview(scope.row)">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column v-for="(e, i) in TitleData" :key="i + 'i'" :label="`材料${i + 1}`" align="center">
      <el-table-column align="center" label="名称" width="140">
        <template #default="scope">
          <span>{{ scope.row.list[i].name }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" label="施工配合比" width="200">
        <template #default="scope">
          <span>{{ scope.row.list[i].theory || 0 }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" label="实际值" width="200">
        <template #default="scope">
          <span>{{ scope.row.list[i].actual || 0 }}</span>
        </template></el-table-column
      >
      <el-table-column align="center" label="百分比" width="200">
        <template #default="scope">
          <span>{{ scope.row.list[i].rate || 0 }}</span>
        </template></el-table-column
      >
    </el-table-column>
    <el-table-column v-if="TitleData.length && operation" label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" link @click="cliclPview(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
interface columnss {
  title: string
  key: string
  fixed?: string
  width?: number
}
interface Props {
  tableData: any[]
  columns: columnss[]
  loading: boolean
  height: number
  TitleData?: any[]
  border: boolean
  operation: boolean
}
withDefaults(defineProps<Props>(), {
  loading: false,
  height: 540,
  TitleData: () => [],
  columns: () => [],
  border: false,
  operation: true
})

const tableRowClassName = ({ rowIndex }: { row: any; rowIndex: number }) => {
  if (rowIndex % 2 == 0) {
    return ''
  } else {
    return 'warning-row'
  }
}

const selfEmit = defineEmits(['cliclPview'])
const cliclPview = (item: any) => {
  selfEmit('cliclPview', item)
}
</script>

<style scoped lang="scss"></style>
