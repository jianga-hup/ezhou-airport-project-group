<!--
* @description 安全统计
* @fileName safetyStatistics.vue
* @author
* @date 2024/04/25 15:01:36
!-->
<template>
  <CardTitle :show="true" title="安全统计" :width="'100%'">
    <div class="select-ritht absolute right-4px top--10px">
      <el-select
        v-model="tenantId"
        style="width: 190px"
        popper-class="selectpopper"
        :teleported="true"
        placement="bottom-end"
        @change="handleChangeId"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.tenantId" />
      </el-select>
    </div>
  </CardTitle>
  <CardLine class="mt12px" :width="410" :height="100">
    <div class="box-item uno-flex-between-center">
      <div class="uno-flex-y-center">
        <img src="@/assets/images/xmq/aq-fxdj.png" class="wihi-72" />
        <div class="ml12px">
          <div class="t1">工程风险区域(Ⅲ级以上)</div>
          <div class="mt12px uno-flex-x-between w-100% pr10px">
            <div class="c1">Ⅲ级：{{ riskLevelInfo?.riskLevel3 || 0 }}个</div>
            <div class="c2">Ⅳ级：{{ riskLevelInfo?.riskLevel4 || 0 }}个</div>
          </div>
        </div>
      </div>
      <div>
        <span class="count" @click="visible = true">{{ riskLevelInfo.total }}</span>
        <span class="c2">个</span>
      </div>
    </div>
  </CardLine>
  <div class="w-100% mt8px" style="display: flex; justify-content: space-between">
    <CardContent v-for="item in riskTypeInfo" :key="item.projectTypeDict">
      <div class="content-item">
        <div class="uno-flex-y-center">
          <img src="@/assets/images/xmq/aq_lc.png" class="wihi-54 mr12px" />
          <div class="t1">{{ item.projectType }}</div>
        </div>
        <div class="mt2px uno-flex-x-between w-100%">
          <div class="c1">Ⅲ级：{{ item.riskLevel3 }}{{ item.unit }}</div>
          <div class="c2">Ⅳ级：{{ item.riskLevel4 }}{{ item.unit }}</div>
        </div>
      </div>
    </CardContent>
  </div>
  <RiskPopFrame
    v-if="visible"
    :visible="visible"
    title="风险类型"
    :riskLevelInfo="riskLevelInfo"
    :currentTenantId="props?.currentTenantId"
    @close="visible = false"
    close
  />
</template>

<script lang="ts" setup>
import CardLine from '../components/cardLine.vue'
import CardContent from '../components/cardContent.vue'
import RiskPopFrame from './popFrame/riskPopFrame.vue' // 风险类型弹框

import { queryAllTenantIdByLike, riskGroupByLevel, riskGroupByType } from '@/api/home'
import { ref, onMounted, defineEmits, defineProps } from 'vue'

/** 下拉列表 */
interface Menu {
  name: string
  id: string
  parentId: null | string
  tenantId: string
  treeId: string
}
interface RiskLevelInfo {
  riskLevel3: number | 0
  riskLevel4: number | 0
  total: number | 0
}
interface RiskTypeInfo {
  riskLevel3: number | 0
  riskLevel4: number | 0
  unit: string
  projectType: string
  projectTypeDict: string
}

const props = defineProps({
  currentTenantId: {
    type: String,
    default: 'edgs'
  }
})
const emit = defineEmits(['dropdown'])
const tenantId = ref('')
const visible = ref(false)
const options = ref<Menu[]>([
  // {
  //   value: '0',
  //   label: '湖北交投鄂州项目群'
  // },
  // {
  //   value: '1',
  //   label: '湖北交投鄂州项目群1'
  // },
  // {
  //   value: '2',
  //   label: '湖北交投鄂州项目群2'
  // },
  // {
  //   value: '3',
  //   label: '湖北交投鄂州项目群3'
  // },
  // {
  //   value: '4',
  //   label: '湖北交投鄂州项目群4'
  // }
])
const riskLevelInfo: RiskLevelInfo = {
  riskLevel3: 0,
  riskLevel4: 0,
  total: 0
}
const riskTypeInfo = ref<RiskTypeInfo[]>([])

/**下拉列表 */
const init = async () => {
  const res = await queryAllTenantIdByLike({ tenantId: 'edgs' })
  if (res.code === 200) {
    options.value = res.data
    tenantId.value = res.data[0]?.tenantId
    // projectName.value = res.data[0].name ?? '湖北交投鄂州项目群'
  }
}
// 获取安全统计级别
const getAQTJListByLevel = async () => {
  const res = await riskGroupByLevel({
    tenantId: tenantId.value,
    geRiskLevel: 3
  })
  res.data.length &&
    res.data.map((item: any) => {
      riskLevelInfo.riskLevel3 = item?.riskLevel === 3 ? item.total : 0
      riskLevelInfo.riskLevel4 = item?.riskLevel === 4 ? item.total : 0
    })
  riskLevelInfo.total = riskLevelInfo.riskLevel3 + riskLevelInfo?.riskLevel4
}
const getAQTJListByType = async () => {
  const res = await riskGroupByType({
    tenantId: tenantId.value
  })
  if (res.code === 200) {
    riskTypeInfo.value = [...res.data]
  }
}
const handleChangeId = (val: string) => {
  emit('dropdown', val)
}

onMounted(() => {
  init()
  getAQTJListByLevel()
  getAQTJListByType()
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
    color: #e33a3a;
    line-height: 38px;
    text-decoration-line: underline;
    cursor: pointer;
  }
}
.content-item {
  padding: 6px 12px;
  .t1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 19px;
  }
}
.c1,
.c2 {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}
.c1 {
  color: #fc9d2d;
}
.c2 {
  color: #e33a3a;
}
.select-ritht {
  :deep(.el-select__wrapper) {
    background: linear-gradient(180deg, rgba(0, 113, 198, 0) 0%, rgba(0, 113, 198, 0.7) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(0, 113, 198, 0.8);
    box-shadow: none;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }
  :deep(.el-select__placeholder) {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }
  :deep(.el-select__caret) {
    color: #ffffff;
  }
}
</style>
