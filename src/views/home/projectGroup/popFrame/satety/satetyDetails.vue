<!--
* @description 特种设备详情-详情信息
* @fileName satetyDetails.vue
* @author
* @date 2024/05/30 15:13:11
!-->
<template>
  <CardTitle :show="true" title="特种设备详情" class="mt26px" :width="'100%'" />
  <div class="satetyDetails mt17px">
    <div class="uno-flex-y-center">
      <el-image
        class="wihi-88 mr-12px"
        :src="viteImages('@/assets/images/common/tzsb_type.png')"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[viteImages('@/assets/images/common/tzsb_type.png')]"
        :initial-index="1"
        preview-teleported
        fit="cover"
      />
      <div class="text">
        <div class="t1">{{ deviceInfo?.deviceName }}</div>
        <el-row class="mt8px">
          <el-col :span="12">
            <span class="t2">设备位置：</span>
            <span class="t2 font-500">{{ deviceInfo?.workPointsName }}</span>
          </el-col>
          <el-col :span="12">
            <span class="t2">运行时长：</span>
            <span class="t2 font-500">{{ deviceInfo?.workTime }}</span>
          </el-col>
        </el-row>
        <el-row class="mt8px">
          <el-col :span="12">
            <span class="t2">操作人员：</span>
            <span class="t2 font-500">{{ deviceInfo?.userName }}</span>
          </el-col>
          <el-col :span="12">
            <span class="t2">最近一次检修：</span>
            <span class="t2 font-500">{{ deviceInfo?.testDate }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="mt20px jbxx">
      <div class="unit-title2">基本信息</div>
      <el-row class="mt10px">
        <el-col :span="12"
          ><span class="t2">设备编号：</span> <span class="t2 font-500">{{ deviceInfo?.deviceCode }}</span></el-col
        >
        <el-col :span="12"
          ><span class="t2">最近一次检修：</span> <span class="t2 font-500">{{ deviceInfo?.testDate }}</span></el-col
        >
      </el-row>
      <el-row class="mt16px">
        <el-col :span="12"
          ><span class="t2">操作人员：</span> <span class="t2 font-500">{{ deviceInfo?.userName }}</span></el-col
        >
        <el-col :span="12"
          ><span class="t2">进场日期： </span> <span class="t2 font-500">{{ deviceInfo?.enterDate }}</span></el-col
        >
      </el-row>
      <el-row class="mt16px">
        <el-col :span="12"
          ><span class="t2">运行状态：</span>
          <span class="t2 font-500">
            <span v-if="deviceInfo?.deviceStatus == '0'">空闲</span>
            <span v-if="deviceInfo?.deviceStatus == '1'">运行</span>
            <span v-if="deviceInfo?.deviceStatus == '2'">故障</span>
            <span v-else>未知状态</span>
            /{{ deviceInfo?.deviceStatus }}</span
          ></el-col
        >
        <el-col :span="12"
          ><span class="t2">退场日期： </span> <span class="t2 font-500">{{ deviceInfo.retreatDate }}</span></el-col
        >
      </el-row>
      <el-row class="mt16px">
        <el-col :span="12"
          ><span class="t2">运行时长：</span> <span class="t2 font-500">{{ deviceInfo?.workTime }}</span></el-col
        >
        <el-col :span="12"
          ><span class="t2">下次检验日期： </span>
          <span class="t2 font-500">{{ deviceInfo?.nextTimeTestDate }}</span></el-col
        >
      </el-row>
      <div class="unit-title2 mt32px">特种设备操作人员</div>
      <el-row class="mt12px">
        <el-col :span="12">
          <div class="flex">
            <div class="w-68px">
              <img src="@/assets/images/common/czry.png" class="wihi-68" />
              <div class="text-center t3">操作人员</div>
            </div>
          </div>
        </el-col>
        <el-col :span="12"
          ><div class="flex">
            <div class="w-68px">
              <img src="@/assets/images/common/czzs.png" class="wihi-68" />
              <div class="text-center t3">操作证书</div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch, ref } from 'vue'
import { viteImages } from '@/utils'
import { getDeviceInfo } from '@/api/home'

interface List {
  deviceName: string
  workPointsName: string
  workTime: string
  userName: string
  testDate: string
  deviceCode: string
  enterDate: string
  deviceStatus: string
  retreatDate: string
  nextTimeTestDate: string
}

const props = defineProps({
  currentTenantId: {
    type: String,
    default: ''
  },
  currentDevId: {
    type: String,
    default: ''
  }
})

const deviceInfo = ref<List>({
  deviceName: '',
  workPointsName: '',
  workTime: '',
  userName: '',
  testDate: '',
  deviceCode: '',
  enterDate: '',
  deviceStatus: '',
  retreatDate: '',
  nextTimeTestDate: ''
})

const getList = () => {
  getDeviceInfo({
    tenantId: props.currentTenantId,
    deviceId: props.currentDevId
  }).then((res) => {
    console.log(res)
  })
}

watch(
  () => props.currentDevId,
  () => {
    getList()
  }
)
</script>

<style scoped lang="scss">
.satetyDetails {
  .text {
    width: calc(100% - 12px - 88px);
  }
  .t1,
  .t2 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #e0f2fe;
    line-height: 23px;
  }
  .t2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
  .t3 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #e0f2fe;
    line-height: 19px;
  }
}
</style>
