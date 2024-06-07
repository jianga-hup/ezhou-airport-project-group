<!--
* @description 作业人员统计
* @fileName satetyHomework.vue
* @author
* @date 2024/04/25 15:37:35
!-->
<template>
  <CardTitle :show="true" title="作业人员统计" class="mt20px" />
  <CardLine class="mt12px" :width="410" :height="112">
    <div class="box-item uno-flex-between-center">
      <div class="uno-flex-y-center">
        <img src="@/assets/images/xmq/aq-yg.png" class="wihi-72" />
        <div class="ml12px">
          <div class="t1">当前在场总人数</div>
          <div class="c1 mt12px">劳务人员：{{ personnelList?.presence?.bindType1?.total || 0 }}人</div>
          <div class="c2 mt12px">管理人员：{{ personnelList?.presence?.bindType3?.total || 0 }}人</div>
        </div>
      </div>
      <div>
        <span class="count" @click="visible = true">{{ personnelList?.overall?.total || 0 }}</span>
        <span class="c2">人</span>
      </div>
    </div>
  </CardLine>
  <div class="w-410px">
    <StackingDiagramEchart :currentTenantId="props?.currentTenantId" />
  </div>
  <PersonnelPopFrame
    v-if="visible"
    :visible="visible"
    :personnelList="personnelList"
    :currentTenantId="props?.currentTenantId"
    title="人员类型"
    @close="visible = false"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch } from 'vue'
import CardLine from '../components/cardLine.vue'
import StackingDiagramEchart from '../components/stackingDiagramEchart.vue'
import PersonnelPopFrame from './popFrame/personnelPopFrame.vue' // 人员类型弹框
import { staffList } from '@/api/home'

const props = defineProps({
  currentTenantId: {
    type: String,
    default: 'edgs'
  }
})
const visible = ref(false)
const personnelList = ref<any>({})

// 获取人员列表
const getRYList = async () => {
  const res = await staffList({
    tenantId: props?.currentTenantId,
    perName: ''
  })
  if (res.code === 200) {
    personnelList.value = res.data
  }
}
watch(
  () => props.currentTenantId,
  () => {
    getRYList()
  }
)
onMounted(() => {
  getRYList()
})
</script>

<style scoped lang="scss">
.box-item {
  padding: 14px 16px;
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    line-height: 21px;
  }
  .count {
    font-family: DINCond-Black, DINCond-Black;
    font-weight: 600;
    font-size: 32px;
    color: #2d9bfc;
    line-height: 38px;
    text-decoration-line: underline;
    cursor: pointer;
  }
}
.c1,
.c2 {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}
.c1 {
  color: #43e7b6;
}
.c2 {
  color: #2d9bfc;
}
</style>
