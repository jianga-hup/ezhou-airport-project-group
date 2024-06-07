<!--
* @description 工序报验表格
* @fileName processTbale.vue
* @author
* @date 2024/02/26 16:55:03
!-->
<template>
  <div class="processTable">
    <div class="table-hd flex bg-item">
      <div class="w-20% text-center hd" v-for="(e, i) in columns" :key="i">{{ e.title }}</div>
    </div>
    <div class="table-td">
      <div class="flex td" v-for="(e, i) in list" :key="i">
        <div
          class="w-20% text-center t1"
          :style="{
            color: i >= colorList.length ? '#2D9BFC' : colorList[i]
          }"
        >
          No.{{ i + 1 }}
        </div>
        <div class="t2 w-20% text-center">{{ e.sectionName }}</div>
        <div class="t2 w-20% text-center">{{ e.total }}</div>
        <div class="t2 w-20% text-center" style="color: #2d9bfc; font-weight: 600">{{ e.ycl }}</div>
        <div class="t2 w-20% text-center" style="color: #ef9832">{{ e.clz }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface column {
  title: string
  key: string
}
interface tbale {
  sectionName: string
  total: number
  ycl: string | number
  clz: string | number
  sectionId: string
}
const props = withDefaults(defineProps<{ list: tbale[] }>(), {})
const list = props.list
const columns = ref<column[]>([
  { title: '排名', key: 'index' },
  { title: '标段', key: 'sectionName' },
  { title: '报验次数', key: 'total' },
  { title: '已处理', key: 'ycl' },
  { title: '处理中', key: 'clz' }
])
const colorList: string[] = ['#FF1F00', '#FF9900', '#FF9900']
</script>

<style scoped lang="scss">
.processTable {
  width: 100%;
  height: 200px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .table-hd {
    width: 100%;
    height: 44px;
    .hd {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #e0f2fe;
      line-height: 44px;
    }
  }
  .bg-item {
    background: rgba(199, 208, 253, 0.05);
    border-radius: 4px;
  }
  .table-td {
    .td {
      height: 36px;
    }
    .td:nth-child(2n) {
      background: rgba(199, 208, 253, 0.05);
      border-radius: 4px;
    }
    .t1 {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 16px;
      line-height: 36px;
    }
    .t2 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #e0f2fe;
      line-height: 36px;
    }
  }
}
</style>
