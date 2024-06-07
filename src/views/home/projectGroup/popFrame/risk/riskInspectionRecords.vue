<!--
* @description 报验巡检记录
* @fileName riskInspectionRecords.vue
* @author
* @date 2024/05/07 10:54:48
!-->
<template>
  <CardTitle :show="true" title="报验巡检记录" class="mt34px">
    <div class="tabs uno-flex-y-center">
      <div
        class="tab-item"
        :class="{ active: active === item.key }"
        @click="handleChangeTab(item)"
        v-for="(item, index) in tabs"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
  </CardTitle>
  <div class="riskInspectionRecords mt12px h-179px">
    <vue-auto-scroll :steep="0.45" :list="state.list">
      <div class="item-box uno-flex-y-center mt7px" v-for="(e, i) in state.list" :key="i">
        <el-image
          class="wihi-84 mr8px"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :initial-index="1"
          preview-teleported
          fit="cover"
          :src="viteImages('@/assets/images/common/rectangle.png')"
          :preview-src-list="[viteImages('@/assets/images/common/rectangle.png')]"
        />
        <div class="item-right">
          <div class="uno-flex-y-center">
            <div class="t1 ell w-260px">{{ e.fullPath }}</div>
            <div class="stuts ml10px">
              <span v-if="e.wfStatus == 0">待上报</span>
              <span v-if="e.wfStatus == 1">验收中</span>
              <span v-if="e.wfStatus == 2">已验收</span>
            </div>
          </div>
          <div class="mt8px t2 ell">上报时间: {{ e.creationTime }}</div>
          <div class="mt8px t2 ell">上报内容: {{ e.content }}</div>
        </div>
      </div>
    </vue-auto-scroll>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { ref, reactive, defineProps, watch, onMounted } from 'vue'
import { getRiskGxby, selectCurrent2DataBySubProjectId } from '@/api/home'
interface ListItem {
  fullPath: string
  wfStatus: number
  creationTime: string
  content: string
}
const props = defineProps({
  currentTenantId: {
    type: String,
    default: ''
  },
  riskId: {
    type: String,
    default: ''
  },
  treeId: {
    type: String,
    default: ''
  }
})
const tabs = [
  { name: '监理巡视', key: 0 },
  { name: '工序报验', key: 1 }
]
const active = ref(0)
const state = reactive<{ list: ListItem[] }>({
  list: []
})

const handleChangeTab = (item: { name: string; key: number }) => {
  active.value = item.key
  if (item.key === 1) {
    getRiskGxbyList()
  } else {
    getJLList()
  }
}
const getRiskGxbyList = () => {
  getRiskGxby({ tenantId: props?.currentTenantId || 'edgs', riskId: props?.riskId }).then((res) => {
    if (res.code === 200 && res.data.length) {
      state.list = res.data.list
    }
  })
}

const getJLList = () => {
  selectCurrent2DataBySubProjectId({ treeId: props?.treeId }).then((res) => {
    if (res.code === 200 && res.data.length) {
      state.list = res.data.list
    }
  })
}

watch(
  () => props.riskId,
  () => {
    getRiskGxbyList()
  }
)
watch(
  () => props.treeId,
  () => {
    getJLList()
  }
)
onMounted(() => {
  getJLList()
})
</script>

<style scoped lang="scss">
.tabs {
  position: absolute;
  right: 0px;
  top: -6px;
  .tab-item {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #c7e9fd;
    line-height: 19px;
    margin: 0px 16px;
    cursor: pointer;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      right: -16px;
      width: 2px;
      height: 18px;
      background: #c7e9fd;
    }
  }
  .tab-item:last-child {
    margin-right: 0px;
    &::after {
      display: none;
    }
  }
  .active {
    color: #1f93ff;
  }
}
.item-box {
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #e0f2fe;
    line-height: 23px;
  }
  .stuts {
    padding: 4px 10px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 300;
    font-size: 16px;
    color: #d8f0ff;
    line-height: 24px;
    letter-spacing: 2px;
    text-shadow: 0px 0px 4px #0091ff;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(to bottom, rgba(15, 74, 159, 0), rgba(17, 75, 160, 0.95));
    border-radius: 2px;
  }
  .t2 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #e0f2fe;
    line-height: 19px;
  }
  .item-right {
    width: calc(100% - 84px - 8px);
  }
}
</style>
