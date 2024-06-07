<!--
* @description 风险弹框
* @fileName riskPopFrame.vue
* @author
* @date 2024/04/26 11:06:36
!-->
<template>
  <ProjectGroupPop :visible="visible" width="1443" :title="title" @close="close" close>
    <div class="risk-box flex">
      <div class="w-410px">
        <CardTitle :show="true" title="工程风险数量" />
        <CardContent class="mt16px">
          <div class="uno-flex-around-center item-box">
            <div class="uno-flex-y-center">
              <img src="@/assets/images/xmq/fx3.png" class="wihi-58" />
              <div class="ml12px">
                <span class="t1">{{ props?.riskLevelInfo?.riskLevel3 }}</span>
                <span class="t2">个</span>
              </div>
            </div>
            <div class="uno-flex-y-center">
              <img src="@/assets/images/xmq/fx4.png" class="wihi-58" />
              <div class="ml12px">
                <span class="t1">{{ props?.riskLevelInfo?.riskLevel4 }}</span>
                <span class="t2">个</span>
              </div>
            </div>
          </div>
        </CardContent>
        <RiskCollapse :currentTenantId="props?.currentTenantId" @getDetails="getDetails" />
      </div>
      <div class="ml32px inner">
        <div class="flex">
          <img :src="rightInfo.img" class="wihi-113 mr12px" />
          <!-- <img src="@/assets/images/common/image12.png" class="wihi-113 mr12px" /> -->
          <div class="code">
            <div class="t1 mt4px">{{ rightInfo.riskName }}</div>
            <div class="risklevel">{{ rightInfo.riskLevel }} 级风险</div>
            <div class="t2 mt10px flex">
              <div class="w-50%">中心桩号：{{ rightInfo.pileNo }}</div>
              <div class="w-50%">风险估值：{{ rightInfo.evaluationValue }}</div>
            </div>
            <div class="t3 mt10px w-100%">
              <div class="ell">主要风险因素：{{ rightInfo.mainRisks }}</div>
              <div class="ell mt4px">专项评估要点：{{ rightInfo.specialEvaluation }}</div>
            </div>
          </div>
        </div>
        <div class="flex mt36px">
          <div class="w-457px">
            <RiskPersonnelPresent :rightInfo="rightInfo" />
            <RiskInspectionRecords
              :currentTenantId="currentTenantId"
              :riskId="rightInfo?.riskId"
              :treeId="rightInfo?.treeId"
            />
          </div>
          <div class="ml23px w-457px">
            <RiskVideoSurveillance />
            <RiskSpecialEquipment :currentTenantId="currentTenantId" :riskId="rightInfo?.riskId" />
          </div>
        </div>
      </div>
    </div>
  </ProjectGroupPop>
</template>

<script lang="ts" setup>
import ProjectGroupPop from '@/components/ProjectGroupPop.vue'
import CardContent from '../../components/cardContent.vue'
import RiskCollapse from './risk/riskCollapse.vue'
import RiskPersonnelPresent from './risk/riskPersonnelPresent.vue'
import RiskInspectionRecords from './risk/riskInspectionRecords.vue'
import RiskVideoSurveillance from './risk/riskVideoSurveillance.vue'
import RiskSpecialEquipment from './risk/riskSpecialEquipment.vue'
import { ref } from 'vue'
import { queryFileListByBizIds } from '@/api/home'

const props = withDefaults(
  defineProps<{ visible: boolean; title: string; riskLevelInfo: any; currentTenantId: string }>(),
  {
    visible: false,
    riskLevelInfo: {},
    currentTenantId: 'edgs'
  }
)
const visible = props.visible
const rightInfo = ref<any>({})

const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
const getDetails = (val: any) => {
  rightInfo.value = { ...val }
  rightInfo.value.img = getImg(rightInfo.value.riskId)
}
const getImg = (id: string): string | void => {
  queryFileListByBizIds([id]).then((res) => {
    if (res?.code == 200 && res?.data.length) {
      return res?.data[0]?.fullPath
    } else {
      return undefined || ''
    }
  })
}
</script>

<style scoped lang="scss">
.risk-box {
  padding: 40px 32px 32px 32px;
  .item-box {
    padding: 11px 0px;
    .t1 {
      font-family: DINCond-Black, DINCond-Black;
      font-weight: 400;
      font-size: 36px;
      color: #c7e9fd;
      line-height: 42px;
    }
    .t2 {
      font-family: DINCond-Black, DINCond-Black;
      font-weight: 400;
      font-size: 16px;
      color: #c7e9fd;
      line-height: 28px;
    }
  }
  .inner {
    width: calc(100% - 442px);
    .code {
      width: calc(100% - 113px - 12px);
      position: relative;
      .risklevel {
        position: absolute;
        top: 0px;
        right: 0px;
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #ff0000;
        line-height: 23px;
        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0px;
          width: 79px;
          height: 5px;
          background: linear-gradient(83deg, #ff0000 0%, rgba(255, 0, 0, 0) 100%);
        }
      }
      .t1,
      .t2,
      .t3 {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 600;
        font-size: 20px;
        color: #c7e9fd;
        line-height: 23px;
      }
      .t2 {
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
      }
      .t3 {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
}
</style>
