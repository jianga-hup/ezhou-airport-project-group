<!--
* @description 人员类型
* @fileName personnelPopFrame.vue
* @author
* @date 2024/05/07 14:00:38
!-->
<template>
  <ProjectGroupPop :visible="visible" width="1443" :title="title" @close="close" close>
    <div class="risk-box flex">
      <div class="w-410px">
        <CardContent class="mt16px uno-flex-between-center pers-box" :showBorder="false">
          <div class="uno-flex-y-center">
            <img src="@/assets/images/xmq/aq-yg.png" class="wihi-58" />
            <div class="t1 ml12px">作业人员</div>
          </div>
          <div class="uno-flex-baseline">
            <span class="count">{{
              props?.personnelList?.presence?.bindType1?.total + props?.personnelList?.presence?.bindType3?.total
            }}</span>
            <span class="unit">人</span>
          </div>
        </CardContent>
        <div class="mt12px uno-flex-between-center">
          <div class="box-view uno-flex-y-center" :class="{ active: active == 0 }" @click="handleClickRY(0)">
            <img src="@/assets/images/xmq/peel_yg.png" width="36" height="28" />
            <div class="t1">
              当前在场人数({{
                props?.personnelList?.presence?.bindType1?.total + props?.personnelList?.presence?.bindType3?.total
              }}人)
            </div>
          </div>
          <div class="box-view uno-flex-y-center" :class="{ active: active == 1 }" @click="handleClickRY(1)">
            <img src="@/assets/images/xmq/peel_yg.png" width="36" height="28" />
            <div class="t1">施工总体人员({{ props?.personnelList?.overall?.total }}人)</div>
          </div>
        </div>
        <PersonnelCollapse :personnelList="props?.personnelList" :active="active" @getCurrentID="getCurrentID" />
      </div>
      <div class="ml32px w-941px">
        <PrsonnelDetails :currentId="currentId" :currentTenantId="props?.currentTenantId" />
      </div>
    </div>
  </ProjectGroupPop>
</template>

<script lang="ts" setup>
import ProjectGroupPop from '@/components/ProjectGroupPop.vue'
import CardContent from '../../components/cardContent.vue'
import PersonnelCollapse from './personnel/personnelCollapse.vue' // 人员折叠面板
import PrsonnelDetails from './personnel/personnelDetails.vue' // 人员详情
import { ref, defineProps } from 'vue'

const active = ref(0)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  currentTenantId: {
    type: String,
    default: 'edgs'
  },
  personnelList: { type: Object, default: () => {} }
})
const visible = props.visible
const currentId = ref('')

const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}

const handleClickRY = (index: number) => {
  active.value = index
}
const getCurrentID = (id: string) => {
  console.log(id)
  currentId.value = id
}
</script>

<style scoped lang="scss">
.risk-box {
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
  .box-view {
    width: 200px;
    height: 52px;
    background: rgba(0, 32, 68, 0.3);
    border-radius: 0px;
    border: 1px solid;
    opacity: 0.2;
    border-image: linear-gradient(315deg, rgba(0, 125, 255, 0), rgba(192, 223, 255, 1), rgba(0, 125, 255, 0)) 1 1;
    padding: 13px 5px 13px 10px;
    cursor: pointer;
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #c7e9fd;
      line-height: 19px;
    }
  }
  .active {
    opacity: 1;
  }
}
</style>
