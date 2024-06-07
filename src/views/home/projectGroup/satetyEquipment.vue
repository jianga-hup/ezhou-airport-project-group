<!--
* @description 特种设备统计
* @fileName satetyEquipment.vue
* @author
* @date 2024/04/25 16:48:59
!-->
<template>
  <CardTitle :show="true" title="特种设备统计" class="mt10px" />
  <div class="view mt12px">
    <CardLine :width="410" :height="112">
      <div class="box-item uno-flex-between-center">
        <div class="uno-flex-y-center">
          <img src="@/assets/images/xmq/aq-tz.png" class="wihi-72" />
          <div class="ml12px">
            <div class="t1">特种设备数量</div>
            <div class="mt12px uno-flex-x-between w-100%">
              <div class="c1">在线：{{ devInfo?.onLineStatus?.onLine || 0 }}台</div>
              <div class="c2 ml10px">离线：{{ devInfo?.onLineStatus?.noOnLine || 0 }}台</div>
            </div>
          </div>
        </div>
        <div>
          <span class="count" @click="visible = true">{{ devInfo?.onLineStatus?.total || 0 }}</span>
          <span class="c1">个</span>
        </div>
      </div>
    </CardLine>
    <div class="w-100% mt11px content-view">
      <CardContent>
        <div class="content-item">
          <div class="uno-flex-around-center">
            <div class="text-center">
              <div class="co1">{{ devInfo?.earlyWarning?.total || 0 }}</div>
              <div class="t1 mt2px">检验预警</div>
            </div>
            <div class="text-center">
              <div class="co2">{{ devInfo?.earlyWarning?.level_3 || 0 }}</div>
              <div class="t1 mt2px">已逾期</div>
            </div>
            <div class="text-center">
              <div class="co3">{{ devInfo?.earlyWarning?.level_2 || 0 }}</div>
              <div class="t1 mt2px">0-30天</div>
            </div>
            <div class="text-center">
              <div class="co4">{{ devInfo?.earlyWarning?.level_1 || 0 }}</div>
              <div class="t1 mt2px">30-50天</div>
            </div>
          </div>
          <div class="mt10px uno-flex-between-center">
            <div class="unit-title2">设备检验到期提醒</div>
            <div class="btn">{{ devInfo?.earlyWarning?.list?.dayNum || 0 }}台</div>
          </div>
          <el-row class="mt9px">
            <el-col :span="2" class="co3">01</el-col>
            <el-col :span="22" class="t2">{{ devInfo?.earlyWarning?.list?.title }}</el-col>
          </el-row>
        </div>
      </CardContent>
    </div>
  </div>
  <SatetyPopFrame
    v-if="visible"
    :visible="visible"
    :onlineDev="devInfo?.onLineStatus?.onLine"
    :currentTenantId="props.currentTenantId"
    title="特种设备"
    @close="visible = false"
  />
</template>

<script lang="ts" setup>
import CardLine from '../components/cardLine.vue'
import CardContent from '../components/cardContent.vue'
import SatetyPopFrame from './popFrame/satetyPopFrame.vue' // 特种设备弹框
import { ref, onMounted, defineProps, watch } from 'vue'
import { deviceOnLineStatus } from '@/api/home'

const props = defineProps({
  currentTenantId: {
    //滚动速度
    type: String,
    default: 'edgs'
  }
})
const visible = ref(false)
const devInfo = ref<any>({})

// 获取设备列表
const getDevList = async () => {
  const res = await deviceOnLineStatus({
    tenantId: props?.currentTenantId || 'edgs'
  })
  if (res.code === 200) {
    devInfo.value = { ...res.data }
  }
}
watch(
  () => props.currentTenantId,
  () => {
    getDevList()
  }
)
onMounted(() => {
  getDevList()
})
</script>

<style scoped lang="scss">
.view {
  height: 252px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
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
    color: #43e7b6;
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
  color: #e33a3a;
}
.content-view {
  .content-item {
    padding: 11px 16px;
    .co1,
    .co2,
    .co3,
    .co4 {
      font-family: DINCond-Black, DINCond-Black;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
    }
    .co1 {
      color: #fc9d2d;
    }
    .co2 {
      color: #e33a3a;
    }
    .co3 {
      color: #2d9bfc;
    }
    .co4 {
      color: #43e7b6;
    }
    .t1,
    .t2 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      line-height: 19px;
    }
    .t2 {
      font-weight: 400;
    }
    .btn {
      padding: 2px 6px;
      background: linear-gradient(180deg, rgba(0, 113, 198, 0) 0%, rgba(0, 113, 198, 0.7) 100%);
      border-radius: 1px 1px 1px 1px;
      border: 1px solid rgba(0, 113, 198, 0.8);
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #e0f2fe;
      line-height: 19px;
    }
  }
}
</style>
