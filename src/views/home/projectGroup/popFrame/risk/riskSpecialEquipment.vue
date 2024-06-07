<!--
* @description 特种设备
* @fileName riskSpecialEquipment.vue
* @author
* @date 2024/05/07 11:58:58
!-->
<template>
  <CardTitle :show="true" title="特种设备" class="mt34px" />
  <div class="riskSpecialEquipment mt12px h-179px">
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
          :src="viteImages('@/assets/images/common/rectangle1.png')"
          :preview-src-list="[viteImages('@/assets/images/common/rectangle1.png')]"
        />
        <div class="item-right">
          <div class="uno-flex-y-center">
            <div class="t1 ell w-260px">{{ e.deviceName }}</div>
            <div class="stuts ml10px">
              <span v-if="e.deviceStatus == 0">空闲</span>
              <span v-else-if="e.deviceStatus == 1">在线</span>
              <span v-else-if="e.deviceStatus == 2">故障</span>
            </div>
          </div>
          <div class="mt8px uno-flex-y-center">
            <div class="t2">操作人员: {{ e.operator }}</div>
            <div class="t2">运行时长: {{ e.workTime }}</div>
          </div>
          <div class="mt8px t2">最近一次检修：{{ e.testDate }}</div>
        </div>
      </div>
    </vue-auto-scroll>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { reactive, defineProps, watch, onMounted } from 'vue'
import { getRiskDevice } from '@/api/home'

interface ListItem {
  deviceName: string
  deviceStatus: number
  operator: string
  workTime: string
  testDate: string
}
const props = defineProps({
  currentTenantId: {
    type: String,
    default: ''
  },
  riskId: {
    type: String,
    default: ''
  }
})
const state = reactive<{ list: ListItem[] }>({
  list: []
})

const getList = () => {
  getRiskDevice({ tenantId: props?.currentTenantId || 'edgs', riskId: props?.riskId || '' }).then((res) => {
    if (res.code === 200) {
      state.list = res.data
    }
  })
}

watch(
  () => props.riskId,
  () => {
    getList()
  }
)
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
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
