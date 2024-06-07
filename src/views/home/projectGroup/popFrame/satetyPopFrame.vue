<!--
* @description 特种设备弹框
* @fileName satetyPopFrame.vue
* @author
* @date 2024/05/30 10:28:04
!-->
<template>
  <ProjectGroupPop :visible="visible" width="1443" :title="title" @close="close" close>
    <div class="satety-box flex">
      <div class="w-410px">
        <CardContent class="mt16px uno-flex-between-center pers-box" :showBorder="false">
          <div class="uno-flex-y-center">
            <img src="@/assets/images/xmq/aq-tz.png" class="wihi-58" />
            <div class="t1 ml12px">特种设备</div>
          </div>
          <div class="uno-flex-baseline">
            <span class="count">{{ props?.onlineDev || 0 }}</span>
            <span class="unit">台</span>
          </div>
        </CardContent>
        <SatetyCollapse :currentTenantId="props.currentTenantId" @getDevId="getDevId" />
      </div>
      <div class="ml32px w-941px">
        <SatetyDetails :currentDevId="currentDevId" :currentTenantId="props.currentTenantId" />
      </div>
    </div>
  </ProjectGroupPop>
</template>

<script lang="ts" setup>
import ProjectGroupPop from '@/components/ProjectGroupPop.vue'
import CardContent from '../../components/cardContent.vue'
import SatetyCollapse from './satety/satetyCollapse.vue' // 特种设备折叠面板
import SatetyDetails from './satety/satetyDetails.vue' // 特种设备基本详细信息
import { ref } from 'vue'

const props = withDefaults(defineProps<{ visible: boolean; title: string }>(), {
  visible: false,
  onlineDev: 0,
  currentTenantId: 'edgs'
})
const visible = props.visible
const currentDevId = ref('')

const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
const getDevId = (id: string) => {
  console.log(id)
  currentDevId.value = id
}
</script>

<style scoped lang="scss">
.satety-box {
  padding: 40px 32px 32px 32px;
  .pers-box {
    padding: 10px 28px;
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      line-height: 21px;
    }
    .count,
    .unit {
      font-family: DINCond-Black, DINCond-Black;
      font-weight: 400;
      font-size: 36px;
      color: #c7e9fd;
      line-height: 42px;
    }
    .unit {
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
