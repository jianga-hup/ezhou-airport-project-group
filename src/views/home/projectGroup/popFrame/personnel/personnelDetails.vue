<!--
* @description 人员详情
* @fileName personnelDetails.vue
* @author
* @date 2024/05/13 14:13:11
!-->
<template>
  <CardTitle :show="true" title="人员详情" class="mt26px" />
  <div class="personnelDetails mt17px">
    <div class="uno-flex-y-center">
      <el-image
        class="wihi-88 mr-12px"
        :src="viteImages('@/assets/images/common/rectangle.png')"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="[viteImages('@/assets/images/common/rectangle.png')]"
        :initial-index="1"
        preview-teleported
        fit="cover"
      />
      <div class="text">
        <div class="t1">{{ currentInfo.perName }}</div>
        <div class="mt8px t2">工种：{{ currentInfo?.workTypeName }}</div>
        <div class="mt8px uno-flex-y-center">
          <div class="t2">电池电量：</div>
          <div class="charge ml16px charge1">
            <div class="chage-box" :style="`width: 10%; background-color: ${color[0]};`" />
          </div>
          <div class="ml8px t2" :style="`color: ${color[0]};`">{{ currentInfo?.power }}%电量</div>
        </div>
      </div>
    </div>
    <div class="mt20px jbxx">
      <div class="unit-title2">基本信息</div>
      <el-row class="mt10px">
        <el-col :span="12" class="t1"><span class="c1">性别：</span>{{ currentInfo?.sex }}</el-col>
        <el-col :span="12" class="t1"><span class="c1">上线时间：</span>{{ currentInfo?.firstOnTime }}</el-col>
      </el-row>
      <el-row class="mt10px">
        <el-col :span="12" class="t1"><span class="c1">所属标段：</span>{{ currentInfo?.sectionName }}</el-col>
        <el-col :span="12" class="t1"
          ><span class="c1">最近一次上线时间：</span>{{ currentInfo?.lastOnlineTime }}</el-col
        >
      </el-row>
      <el-row class="mt10px">
        <el-col :span="12" class="t1"><span class="c1">所属部门：</span>{{ currentInfo?.departmentName }}</el-col>
        <el-col :span="12" class="t1"><span class="c1">位置高度：</span>{{ currentInfo?.lastHeight }}</el-col>
      </el-row>
      <div class="mt10px t1"><span class="c1">作业工点：</span>{{ currentInfo?.workPointsName }}</div>
    </div>
    <div class="unit-title2 mt20px">历史作业记录</div>
    <div class="callpase">
      <div class="callpase-item mt17px" v-for="(e, i) in list" :key="i">
        <div class="box">
          <div class="flex pt6px">
            <div class="w-30% t1">{{ e.dayValue }}</div>
            <div class="w-35% t2">首次上线：{{ e.minDayValue }}</div>
            <div class="w-35% t2 text-right">末次上线：{{ e.maxDayValue }}</div>
          </div>
          <div class="flex mt12px">
            <div class="w-30% t1">{{ e.workPointsName }}</div>
            <div class="w-35% t2">作业高度：{{ e.height }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { ref, defineProps, watch } from 'vue'
import { staffInfo, historyLog } from '@/api/home'

interface Item {
  dayValue: string
  minDayValue: string
  maxDayValue: string
  workPointsName: string
  height: string
}

interface Info {
  perName: string
  workTypeName: string
  power: string
  sex: string
  firstOnTime: string
  sectionName: string
  lastOnlineTime: string
  departmentName: string
  lastHeight: string
  workPointsName: string
}

const props = defineProps({
  currentId: {
    type: String,
    default: ''
  },
  currentTenantId: {
    type: String,
    default: 'edgs'
  }
})

const color = ['#68ffa1', '#ff4d4d']
const currentInfo = ref<Info>({
  perName: '',
  workTypeName: '',
  power: '',
  sex: '',
  firstOnTime: '',
  sectionName: '',
  lastOnlineTime: '',
  departmentName: '',
  lastHeight: '',
  workPointsName: ''
})
const list = ref<Item[]>([])

const getList = () => {
  staffInfo({ tenantId: props?.currentTenantId || '', personId: props?.currentId || '' }).then((res) => {
    console.log(res)
    if (res.code === 200) {
      currentInfo.value = { ...res.data }
    }
  })
}
const getHistoryList = () => {
  list.value = []
  historyLog({ personId: props?.currentId || '', pageNum: 1, pageSize: 10 }).then((res) => {
    console.log(res)
    if (res.code === 200) {
      list.value = { ...res?.data?.list }
    }
  })
}
watch(
  () => props.currentId,
  () => {
    getList()
    getHistoryList()
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.personnelDetails {
  .text {
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
    .charge {
      // background: #fff;
      width: 21px;
      height: 11px;
      border-radius: 1px 3px 3px 1px;
      padding: 1px;
      position: relative;
      .chage-box {
        height: 100%;
      }
    }
    .charge1,
    .charge2 {
      border: 2px solid #68ffa1;
      &:before {
        content: '';
        position: absolute;
        width: 2px;
        height: 6px;
        border-radius: 0px 3px 3px 0px;
        top: 50%;
        right: -3px;
        transform: translate(0, -50%);
        background-color: #68ffa1;
      }
    }
    .charge2 {
      border: 2px solid #ff4d4d;
      &:before {
        background-color: #ff4d4d;
      }
    }
  }
  .jbxx {
    .t1,
    .c1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #e0f2fe;
      line-height: 19px;
    }
    .c1 {
      color: rgba(224, 242, 254, 0.8);
    }
  }
  .callpase {
    height: 200px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    &-item {
      position: relative;
      height: 80px;
      padding-left: 30px;
      width: 100%;
      .box {
        position: relative;
        height: 100%;
        width: 100%;
        background: rgba(0, 32, 68, 0.3);
        padding: 12px;
        border-radius: 0px;
        border: 1px solid;
        border-image: linear-gradient(350deg, rgba(0, 125, 255, 0), rgba(192, 223, 255, 1), rgba(0, 125, 255, 0)) 1 1;
        &::after {
          content: '';
          position: absolute;
          top: 0px;
          left: -26px;
          width: 12px;
          height: 12px;
          background: #119bff;
          border-radius: 50%;
        }
        &::before {
          content: '';
          position: absolute;
          top: 0px;
          left: -20px;
          width: 1px; /* 虚线宽度 */
          height: calc(100% + 17px);
          background-image: linear-gradient(to bottom, #e0f2fe 0%, #e0f2fe 80%, transparent 50%);
          background-size: 2px 12px; /* 虚线点间隔距离和虚线点长度 */
          background-repeat: repeat-y;
          transform: rotate(0deg); /* 虚线倾斜角度 */
        }
        .w1 {
          width: 30%;
        }
        .w2 {
          width: 35%;
        }
        .w3 {
          width: 35%;
        }
        .t1,
        .t2 {
          font-family:
            PingFang SC,
            PingFang SC;
          font-weight: 500;
          font-size: 16px;
          color: #e0f2fe;
          line-height: 19px;
        }
        .t2 {
          font-weight: 400;
        }
      }
    }
    .callpase-item:last-child {
      .box::before {
        display: none;
      }
    }
  }
}
</style>
