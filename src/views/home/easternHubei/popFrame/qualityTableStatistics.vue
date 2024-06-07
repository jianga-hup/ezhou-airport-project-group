<!--
* @description 质量表格统计(该页面用的第三方接口可能后续不用、目前只用静态数据展示)
* @fileName qualityTableStatistics.vue
* @author
* @date 2024/02/27 17:36:17
!-->
<template>
  <div class="qualityTableStatistics">
    <div class="uno-flex-x-between">
      <div class="box flex" v-for="(e, i) in state.box" :key="i">
        <img :src="viteImages(e.img)" class="wihi-60 mr-12px" />
        <div class="text">
          <div class="count" @click="detailsall">{{ e.count }}</div>
          <div class="t1 mt-4px">{{ e.text }}</div>
        </div>
      </div>
    </div>
    <div class="mt-24px uno-flex-x-between">
      <div class="w-673px">
        <TopTitle title="标段质检统计" class="mb-16px" />
        <div class="w-637px h-130px" v-loading="load[0]">
          <QualityInspectionEchart
            :n-axis="['工序自检', '分项评定', '工序抽检']"
            :list="state.bar"
            style="width: 673px"
            v-if="state.bar.length > 0"
          />
          <div class="uno-flex-center w-100% h-130px" v-if="!load[0] && state.bar.length === 0">
            <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
          </div>
        </div>
      </div>
      <div class="w-673px">
        <TopTitle title="各月完成情况" class="mb-16px" />
        <div class="w-673px h-130px" v-loading="load[1]">
          <QualityInLineEchart
            :n-axis="['工序自检', '分项评定', '工序抽检']"
            :list="state.line"
            style="width: 673px"
            v-if="state.line.length > 0"
          />
          <div class="uno-flex-center w-100% h-130px" v-if="!load[1] && state.line.length === 0">
            <img src="@/assets/images/menu/zwsj.png" class="wihi-100" />
          </div>
        </div>
      </div>
    </div>
    <TopTitle title="单体工程质检统计" class="mt-24px mb-12px">
      <div class="absolute right-10px top-10px">
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
            <el-select
              v-model="form.bdpId"
              placeholder="请选择"
              clearable
              popper-class="popperForm"
              style="width: 180px"
            >
              <el-option v-for="item in dtgcList" :key="item.id" :label="item.name" :value="item.treeId" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button class="tran" @click="handleReset(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </TopTitle>
    <el-table
      :data="tableData"
      class="tables"
      v-loading="load[2]"
      max-height="280"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-row-style="{ background: 'rgba(199,208,253,0.05)', 'border-radius': '4px' }"
    >
      <el-table-column prop="bd_namee" label="标段" align="center" />
      <el-table-column prop="index_name" label="单体工程" align="center" />
      <el-table-column label="质检" align="center">
        <el-table-column prop="sg_bg" label="表格数" align="center" />
        <el-table-column prop="sg_yt" label="已填写" align="center" />
        <el-table-column prop="sg_ybs" label="已报审" align="center" />
        <el-table-column prop="sg_yqz" label="已签章" align="center" />
      </el-table-column>
      <el-table-column label="抽检" align="center">
        <el-table-column prop="jk_bg" label="表格数" align="center" />
        <el-table-column prop="jl_yt" label="已填写" align="center" />
        <el-table-column prop="jl_qz" label="已签章" align="center" />
      </el-table-column>
    </el-table>
    <div class="text-right flex flex-justify-end mt-20px">
      <el-pagination
        v-model:current-page="page.pageNum"
        v-model:page-size="page.pageSize"
        class="page"
        popper-class="popperForm"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <Details v-if="visibles" :visibles="visibles" :frameCu="frameCu" @close="visibles = false" />
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import Details from '../overviewRight/details/details.vue'
import { selectByIndexId, queryAllUnitBySectionId, getNumberDataset } from '@/api/home'
import { viteImages } from '@/utils'
import TopTitle from './components/topTitle.vue'
import QualityInspectionEchart from './components/qualityInspectionEchart.vue'
import QualityInLineEchart from './components/qualityInLineEchart.vue'
import { reactive, onMounted, ref } from 'vue'
interface box {
  img: string
  count: number
  text: string
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
interface Bar {
  x: string
  c1: number
  c2: number
  c3: number
}
interface Table {
  bd_namee: string
  index_name: string
  sg_bg: number
  sg_yt: number
  sg_ybs: number
  sg_yqz: number
  jk_bg: number
  jl_yt: number
  jl_qz: number
}
const ruleFormRef = ref<FormInstance>()
const form = reactive<{
  bdId: string
  bdpId: string
  treeId: string
}>({
  bdId: '',
  bdpId: '',
  treeId: ''
})
const state = reactive<{ box: box[]; bar: Bar[]; line: Bar[] }>({
  box: [
    {
      img: '@/assets/images/common/gxbysl.png',
      count: 0,
      text: '单位工程数'
    },
    {
      img: '@/assets/images/common/jrgxsl.png',
      count: 0,
      text: '分部工程部'
    },
    {
      img: '@/assets/images/common/zl-fxgcb.png',
      count: 0,
      text: '分项工程数'
    },
    {
      img: '@/assets/images/common/zl-gxzs.png',
      count: 0,
      text: '工序总数'
    },
    {
      img: '@/assets/images/common/zl-bgzs.png',
      count: 0,
      text: '表格总数'
    }
  ],
  bar: [],
  line: []
})
const tableData = ref<Table[]>([])
const page = reactive<{ pageSize: number; pageNum: number; total: number }>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})
const bdList = ref<BDs[]>([])
const dtgcList = ref<DTgc[]>([])
const load = reactive<boolean[]>([true, true, true])
const visibles = ref<boolean>(false)
const frameCu = reactive({
  name: 0
})
const detailsall = () => {
  frameCu.name = 3
  visibles.value = true
}

interface changeRowParameter {
  row: any
  rowIndex: number
}
const tableRowClassName = ({ rowIndex }: changeRowParameter) => {
  if (rowIndex % 2 == 0) {
    return ''
  } else {
    return 'statistics-warning-row'
  }
}
/** 获取单位 */
const getUnit = async (id: string) => {
  const { code, data = [] } = await queryAllUnitBySectionId({ sectionId: id })
  if (code == 200 && data.length) {
    form.bdpId = data[0].treeId
    dtgcList.value = data
  }
}
const getNumbers = async () => {
  const res = await getNumberDataset({ id: '3295e790abd54205a53c083f8fec56a8' })
  if (res.rows && res.rows.length) {
    const names = ['dw', 'fb', 'fx', 'gx', 'table']
    state.box.map((item, index) => {
      item.count = res.rows[0][names[index]]
    })
  }
}
const getMedLeft = async () => {
  load[0] = true
  const res = await getNumberDataset({ id: '5409c360549f4a888014181e72a506e1' })
  load[0] = false
  if (res.rows && res.rows.length) {
    const arr: Bar[] = []
    res.rows.map((item: { bd: string; cj: number; pd: number; row_number: number; startIndex: number; zj: number }) => {
      arr.push({
        x: item.bd,
        c1: item.zj,
        c2: item.pd,
        c3: item.cj
      })
    })
    state.bar = arr
  }
}
const getMedRight = async () => {
  load[1] = true
  const res = await getNumberDataset({ id: '0686301926d94d6db126dc706e28ad5a' })
  load[1] = false
  if (res.rows && res.rows.length) {
    const arr: Bar[] = []
    res.rows.map((item: { cj: number; pd: number; row_number: number; startIndex: number; yf: string; zj: number }) => {
      arr.push({
        x: item.yf,
        c1: item.zj,
        c2: item.pd,
        c3: item.cj
      })
    })
    state.line = arr
  }
}
const getBottom = async () => {
  load[2] = true
  const res = await getNumberDataset({
    id: '3186bd0a02b74ae2be30d048ddee11e6',
    page: page.pageNum,
    rows: page.pageSize,
    treeid: form.bdpId !== '' ? form.bdpId : form.treeId
  })
  load[2] = false
  if (res.rows && res.rows.length) {
    tableData.value = res.rows
    page.total = res.total ?? 0
  } else {
    tableData.value = []
    page.total = 0
  }
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
/** 查询 */
const onSubmit = () => {
  page.pageNum = 1
  getBottom()
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
  getBottom()
}

/** 初始化调用 */
const init = async () => {
  getSection()
  getNumbers()
  getMedLeft()
  getMedRight()
  getBottom()
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.qualityTableStatistics {
  padding: 45px 38px 0px 36px;
  :deep(.el-loading-mask) {
    background-color: #06182f;
  }
  .box {
    position: relative;
    width: 258px;
    height: 84px;
    background: rgba(0, 44, 80, 0.3);
    padding: 12px 0px 12px 24px;
    &::after {
      content: '';
      position: absolute;
      top: -1px;
      left: 0px;
      width: 100%;
      height: 3px;
      background: #26adff;
    }
    .text {
      .count {
        font-family: DIN, DIN;
        font-weight: bold;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        text-decoration-line: underline;
        cursor: pointer;
      }
      .t1 {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        line-height: 19px;
      }
    }
  }
  .tables {
    background-color: transparent;
    --el-table-border-color: none;
    --el-table-row-hover-bg-color: transparent;
    :deep(.el-table__row) {
      background-color: transparent;
      height: 50px;
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #e0f2fe;
    }
    &::before {
      display: none;
    }
    :deep(.statistics-warning-row) {
      background: rgba(199, 208, 253, 0.05);
    }
    :deep(.el-table__inner-wrapper) {
      &::before {
        display: none;
      }
    }
    :deep(.is-group) {
      th.el-table__cell {
        background-color: transparent;
        border-right: 1px solid #2b3f52;
        border-bottom: 1px solid #2b3f52;
      }
    }
  }
}
</style>
