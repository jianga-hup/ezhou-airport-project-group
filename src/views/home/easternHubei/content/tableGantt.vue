<!--
* @description 表格甘特图（目前只为进度统计做处理）
* @fileName tableGantt.vue
* @author 
* @date 2024/03/01 11:01:15
!-->
<template>
  <el-table
    class="vui-dark-table"
    header-row-class-name="dark-table-head"
    row-class-name="dark-table-row"
    :data="tableData"
    max-height="700"
    v-loading="loading"
    :expand-row-keys="keys"
    row-key="id"
    :load="load"
    lazy
    border
    :tree-props="{ children: 'list', hasChildren: 'hasChildren' }"
  >
    <el-table-column fixed prop="name" label="工程内容" width="320" />
    <el-table-column fixed align="center" prop="unit" label="单位" width="100" />
    <el-table-column fixed align="center" prop="jhsl" label="计划数量" width="150" />
    <el-table-column fixed align="center" prop="jdsl" label="完成数量" width="100" />
    <el-table-column fixed align="center" prop="jhje" label="计划产值（万）" width="150" />
    <el-table-column fixed align="center" prop="jdje" label="完成产值（万）" width="150" />
    <el-table-column fixed align="center" prop="slRate" label="完成比例（%）" width="150" />
    <!-- 渲染时间(年|月) -->
    <el-table-column
      v-for="(item, index) in showMonths"
      :label="item.year"
      prop="showMonths"
      align="center"
      :key="index"
    >
      <el-table-column
        v-for="(it, index1) in item.months"
        :label="it"
        prop="str"
        min-width="100"
        style="padding: 0; margin: 0"
        align="center"
        :key="index1"
      >
        <template #default="scope">
          <div>
            <div
              class="progressUpon"
              :style="{
                width: optimizeCalcWidth(scope.row, item.year + '年' + '-' + it),
                left: optimizeCalcLeft(scope.row, item.year + '年' + '-' + it)
              }"
            />
          </div>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import moment from 'moment'
interface Props {
  tableData: any[]
  loading: boolean
  keys: string[]
  dateCopy: any[]
}
interface yearArr {
  year: string
  months: string[]
}
interface Tree {
  name: string
  code: string
  id: string
  endTime: string
  startTime: string
  list: Tree[]
  [key: string]: string | number | Tree[] | boolean
}
const props = withDefaults(defineProps<Props>(), {})

const showMonths = ref<yearArr[]>([]) // 年份 + 月份
const minDay = ref<null | string>(null)
const maxDay = ref<null | string>(null)

watch(
  () => props.tableData,
  (val) => {
    if (val.length) {
      nextTick(() => {
        getChartTitle() // 渲染的信息
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 渲染表格头，首先是年月，如2018年11月
const getChartTitle = () => {
  const chartTable = props.tableData
  // 准备日期，为了防止多次赋值属性，导致计算属性重新计算，决定只赋值一次
  let maxDayParams = '',
    minDayParams = ''

  for (let i = 0; i < chartTable.length; i++) {
    const StartDate = chartTable[i].startTime ?? ''
    const EndDate = chartTable[i].endTime ?? ''
    if (StartDate && EndDate) {
      if (!minDayParams || new Date(StartDate).getTime() < new Date(minDayParams).getTime()) {
        minDayParams = StartDate
      }
      if (!maxDayParams || new Date(EndDate).getTime() > new Date(maxDayParams).getTime()) {
        maxDayParams = EndDate
      }
    }
  }
  minDay.value = minDayParams ? minDayParams : '2023-01-01'
  maxDay.value = maxDayParams ? maxDayParams : '2023-01-01'
  console.log('小：' + minDay.value)
  console.log('大：' + maxDay.value)

  getYearArr()
}
const getYearArr = () => {
  // 获取需要格式的年月信息
  const yearArr: yearArr[] = [] // 存年

  const minYear = new Date(minDay.value as string).getFullYear()
  const maxYear = new Date(maxDay.value as string).getFullYear()
  // 保存年
  if (minYear === maxYear) {
    yearArr.push({
      year: minYear + '',
      months: [] // 放月的数组
    })
  } else {
    for (let i = minYear; i <= maxYear; i++) {
      yearArr.push({
        year: i + '',
        months: [] // 放月的数组
      })
    }
  }
  // 保存月
  for (let i = 0; i < yearArr.length; i++) {
    for (let m = 0; m < 12; m++) {
      const minMonth: string = m + 1 + '月'
      yearArr[i].months.push(minMonth)
    }
  }
  showMonths.value = yearArr
}
// 宽度
const optimizeCalcWidth = (e: any, day: string) => {
  // console.log(e, day)
  if (e.startTime && e.endTime) {
    // 先判断是不是当前年份的
    const year = Number(day.split('年')[0]) // 拿到年份
    const month = Number(day.split('-')[1].split('月')[0]) // 拿到月份
    const ym = year + '-' + month // 年份-月份
    const date = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() // 拿到当前月份的天数
    // 获取最小的年-月
    const daymin = e.startTime.split('-')[0] + '-' + Number(e.startTime.split('-')[1])
    // 获取最大的年-月
    const daymax = e.endTime.split('-')[0] + '-' + Number(e.endTime.split('-')[1])
    // 获取最大的天数
    const daysmax = e.endTime.split('-')[2]

    let days = 0
    // 先判断开始和结束日期是否等于当前月份
    if (daymin === ym && daymax === ym) {
      // 先判断最大的日期是否不等于最小的日期
      days = 1
      if (e.endTime !== e.startTime) {
        days = moment(e.endTime).diff(moment(e.startTime), 'days')
      }
      // 判断最小日期是否等于当前月份 并且最大日期不等于当前月份
    } else if (daymin === ym && daymax !== ym) {
      days = moment(`${year}-${month}-${date}`).diff(moment(e.startTime), 'days')
      // 判断最小日期是否不等于当前月份 并且最大日期等于当前月份
    } else if (daymin !== ym && daymax === ym) {
      days = daysmax
      // 是否小于当前日期 后面是否大于前面
    } else if (
      moment(e.startTime).isBefore(`${year}-${month}-${date}`) &&
      moment(`${year}-${month}-${date}`).isBefore(e.endTime)
    ) {
      days = date
    }
    if (days === 0) {
      return '0%'
    }
    const r = Number((days / date).toFixed(2)) * 100
    const rate = r >= 100 ? 100 : r
    return rate + '%'
  }
}
// 偏移量
const optimizeCalcLeft = (e: any, day: string) => {
  if (e.startTime && e.endTime) {
    // 先判断是不是当前年份的
    const year = Number(day.split('年')[0]) // 拿到年份
    const month = Number(day.split('-')[1].split('月')[0]) // 拿到月份
    const ym = year + '-' + month // 年份-月份
    const date = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() // 拿到当前月份的天数
    // 获取最小的年-月
    const daymin = e.startTime.split('-')[0] + '-' + Number(e.startTime.split('-')[1])
    // 获取最大的年-月
    const daymax = e.endTime.split('-')[0] + '-' + Number(e.endTime.split('-')[1])
    // 获取最大的天数
    const daysmax = e.endTime.split('-')[2]

    let days = 0
    if (daymin === ym && daymax === ym) {
      days = daysmax
      if (e.endTime !== e.startTime) {
        days = moment(`${year}-${month}-${date}`).diff(moment(e.startTime), 'days')
      }
    } else if (daymin === ym && daymax !== ym) {
      days = moment(`${year}-${month}-${date}`).diff(moment(e.startTime), 'days')
      days = date - days
    }
    if (days === 0) {
      return '0%'
    }
    const r = Number((days / date).toFixed(2)) * 100
    const rate = r >= 100 ? 100 : r
    return rate + '%'
  }
}
// 加载
const load = (tree: Tree, treeNode: unknown, resolve: (date: Tree[]) => void) => {
  // console.log(tree, treeNode, 'tree, treeNode', this.dateCopy)
  const arr = findsetTreeId(props.dateCopy, tree.id)
  setTimeout(() => {
    resolve(arr)
  }, 500)
}
const findsetTreeId = (arr: Tree[], id: string) => {
  for (let i = 0; i < arr.length; i++) {
    const v = JSON.parse(JSON.stringify(arr[i]))
    if (v.id === id) {
      if (v.list && v.list.length) {
        v.list = v.list.map((c: Tree) => {
          if (c.list && c.list.length) {
            c.hasChildren = true
            c.list = []
          }
          return c
        })
      }
      return v.list || []
    } else if (v.list && Array.isArray(v.list)) {
      const relust: Tree = findsetTreeId(v.list, id)
      if (relust) {
        return relust
      }
    }
  }
}
</script>

<style scoped lang="scss">
.progressUpon {
  background: #4cafff;
  height: 3px;
  /* width: calc(100% + 2px); // +2是因为边框线为2px*/
  z-index: 2;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
}
</style>
