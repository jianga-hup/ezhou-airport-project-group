<!--
* @description 风险-折叠面板
* @fileName riskCollapse.vue
* @author
* @date 2024/04/26 11:51:03
!-->
<template>
  <div class="search mt12px mb12px">
    <el-input v-model="keytext" placeholder="请输入风险等级" class="input-with-select">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
  <CardContent class="riskaccordion h-380px">
    <div class="relative z-1">
      <div v-for="(e, i) in collapse" :key="i">
        <div class="uno-flex-y-center pl16px pr16px">
          <img
            :src="viteImages(`@/assets/images/xmq/icon_${active.includes(e.id) ? 'sq' : 'zk'}.png`)"
            class="wihi-20 mr8px cursor-pointer"
            @click="handleCollapse(e, 0)"
          />
          <div class="tile1">{{ e.tenantName }}</div>
        </div>
        <div class="pt14px" v-if="active.includes(e.id)">
          <div v-for="(c1, i1) in e.list" :key="i1" :class="{ mt12px: i1 > 0 }">
            <div class="uno-flex-y-center pl32px pr16px">
              <img
                :src="viteImages(`@/assets/images/xmq/icon_${active.includes(c1.id) ? 'sq' : 'zk'}.png`)"
                class="wihi-20 mr8px cursor-pointer"
                @click="handleCollapse(c1, 1)"
              />
              <div class="tile1">{{ c1.riskLevel }}级({{ c1.total }}个)</div>
            </div>
            <template v-if="active.includes(c1.id)">
              <div
                class="mt20px childview cursor-pointer"
                :class="{ active: active.includes(c2.id) }"
                v-for="(c2, i2) in c1.list"
                @click="handleOpenRight(c2)"
                :key="i2"
              >
                <div class="t2 ell">{{ c2.riskName }}</div>
                <div class="uno-flex-between-center mt4px">
                  <div class="tile1">标段：{{ c2.sectionName }}</div>
                  <div class="uno-flex-y-center">
                    <span class="tile1">风险评估分值：</span><span class="count">{{ c2.evaluationValue }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { viteImages } from '@/utils'
import CardContent from '../../../components/cardContent.vue'
import { getRiskList } from '@/api/home'
import { ref, onMounted, watch, defineEmits } from 'vue'
interface coll {
  name: string
  id: string
}
interface Apse {
  name: string
  id: string
  child: coll[]
}
interface CollApse {
  name: string
  id: string
  child: Apse
}

const props = defineProps({
  currentTenantId: {
    type: String,
    default: 'edgs'
  }
})
const emit = defineEmits(['getDetails'])
const collapse = ref<any>([
  // {
  //   tenantName: '湖北交投鄂州项目群1',
  //   tenantId: '1',
  //   child: [
  //     { name: '3级(4个)', id: '1-1', child: [{ name: '宝龙互通B匝道桥', id: '1-1-1' }] },
  //     { name: '4级(4个)', id: '1-2', child: [{ name: '宝龙互通B匝道桥', id: '1-2-1' }] }
  //   ]
  // }
])
const active = ref<string[]>(['', '', ''])
const keytext = ref('')

const handleCollapse = (item: CollApse | Apse | coll, index: number) => {
  if (active.value.includes(item.id)) {
    active.value.splice(active.value.indexOf(item.id), 3 - index)
  } else {
    if (active.value.length >= index) {
      active.value[index] = item.id
    } else {
      active.value.push(item.id)
    }
  }
}
const handleOpenRight = (item: CollApse | Apse | coll) => {
  console.log('item', item)
  emit('getDetails', item)
}
const getTreeList = () => {
  collapse.value = []
  getRiskList({ tenantId: props.currentTenantId || 'edgs', appointRiskLevel: keytext.value }).then((res) => {
    console.log('res', res)
    if (res.code === 200) {
      collapse.value = res.data.list
    }
  })
}
onMounted(() => {
  getTreeList()
})
watch(
  () => props.currentTenantId,
  () => {
    getTreeList()
  }
)
</script>

<style scoped lang="scss">
.riskaccordion {
  padding: 19px 0px;
  .tile1 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #e0f2fe;
    line-height: 19px;
  }
  .t2 {
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #e0f2fe;
    line-height: 21px;
  }
  .count {
    font-family: DINCond-Black, DINCond-Black;
    font-weight: 400;
    font-size: 24px;
    color: #ff2c2b;
    line-height: 28px;
  }
  .active {
    background: rgba(0, 44, 80, 0.4);
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      left: 0;
      top: 0;
      background: #26adff;
    }
  }
  .childview {
    padding: 8px 16px 8px 16px;
  }
}
.search {
  :deep(.el-input-group) {
    width: 100%;
    height: 44px;
    background: rgba(0, 32, 68, 0.3);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid;
    border-image: linear-gradient(90deg, rgba(0, 125, 255, 1), rgba(0, 125, 255, 0)) 1 1;
    .el-input__wrapper {
      box-shadow: none;
      background-color: transparent;
      .el-input__inner {
        font-family:
          PingFang SC,
          PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #e0f2fe;
      }
    }
    .el-input-group__append {
      box-shadow: none;
      background-color: transparent;
      color: #e0f2fe;
      font-size: 16px;
    }
  }
}
</style>
