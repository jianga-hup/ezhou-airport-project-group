<!--
* @description 特种设备折叠面板
* @fileName satetyCollapse.vue
* @author
* @date 2024/05/30 10:40:23
!-->
<template>
  <div class="search mt12px mb12px">
    <el-input v-model="keytext" placeholder="请输入特种设备" class="input-with-select">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
  <CardContent class="satetyCollapse h-430px pt6px pl0px pr0px">
    <div class="relative z-1">
      <div class="collapse-content mb12px" v-for="(call, cix) in collapse" :key="cix">
        <div class="pl14px pr16px uno-flex-y-center">
          <img
            :src="viteImages(`@/assets/images/xmq/icon_${active.includes(call.tenantId) ? 'zk' : 'sq'}.png`)"
            class="wihi-20 mr8px cursor-pointer"
            @click="handleCollapse(call.tenantId, 1)"
          />
          <div class="tile1">{{ call.tenantName }}({{ call.total }}台)</div>
        </div>
        <!-- 第二层 -->
        <template v-if="active.includes(call.tenantId) && call.list && call.list.length">
          <div class="mt12px" v-for="(ca, cai) in call.list" :key="cai">
            <div class="pl30px pr16px uno-flex-y-center">
              <img
                :src="viteImages(`@/assets/images/xmq/icon_${active.includes(ca.sectionId) ? 'zk' : 'sq'}.png`)"
                class="wihi-20 mr8px cursor-pointer"
                @click="handleCollapse(ca.sectionId, 2)"
              />
              <div class="tile1">{{ ca.sectionName }}({{ ca.total }}台)</div>
            </div>
            <!-- 第三层 -->
            <template v-if="active.includes(ca.sectionId) && ca.list && ca.list.length">
              <div
                class="mt11px uno-flex-y-center cursor-pointer active-text"
                :class="{ 'item-active': textcheck === e.deviceId }"
                v-for="(e, i) in ca.list"
                @click="handleOpenDetails(e)"
                :key="i"
              >
                <el-image
                  class="wihi-68 mr-12px"
                  :src="viteImages('@/assets/images/common/tzsb_type.png')"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[viteImages('@/assets/images/common/tzsb_type.png')]"
                  :initial-index="1"
                  preview-teleported
                  fit="cover"
                />
                <div class="inner-text">
                  <img
                    :src="viteImages(`@/assets/images/common/tzsb${e.deviceStatus}.png`)"
                    class="w-54px h-28px absolute right-16px top-8px"
                  />
                  <div class="status">
                    <span v-if="e.deviceStatus == 0">空闲</span>
                    <span v-if="e.deviceStatus == 1">在线</span>
                    <span v-if="e.deviceStatus == 2">故障</span>
                    <span v-if="e.level == 3">已逾期</span>
                    <span v-else>{{ e.level }}</span>
                  </div>
                  <div class="t1">{{ e.deviceName }}</div>
                  <div class="mt6px">
                    <span class="t2 font-400">设备类型：</span>
                    <span class="t2">{{ e.deviceType }}</span>
                  </div>
                  <div class="mt6px">
                    <span class="t2 font-400">所属标段：</span>
                    <span class="t2">{{ e.sectionName }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </CardContent>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import CardContent from '../../../components/cardContent.vue'
import { Search } from '@element-plus/icons-vue'
import { ref, defineProps, onMounted, defineEmits } from 'vue'
import { getDeviceList } from '@/api/home'

/** 折叠面板第一层 */
interface Coll {
  tenantName: string
  total: number
  tenantId: string
  list?: CollSecond[]
}
/** 折叠面板第二层 */
interface CollSecond {
  sectionName: string
  total: number
  sectionId: string
  list?: CollThird[] | undefined
}
/** 折叠面板第三层 */
interface CollThird {
  deviceName: string
  deviceId: string
  deviceStatus: number
  level: number
  deviceType: string
  sectionName: string
}
const props = defineProps({
  currentTenantId: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['getDevId'])
const keytext = ref('')
const active = ref<string[]>(['1', '1-3', '1-3-1'])
const textcheck = ref<string>('')
const collapse = ref<Coll[]>([])

/** 点击选中 */
const handleCollapse = (id: string, type: number) => {
  if (!active.value.includes(id)) {
    if (active.value.length >= type) {
      active.value[type - 1] = id
    } else {
      active.value.push(id)
    }
  }
}
const handleOpenDetails = (e: CollThird) => {
  emit('getDevId', e.deviceId)
}
const getList = () => {
  collapse.value = []
  getDeviceList({ tenantId: props?.currentTenantId || 'edgs', deviceName: keytext.value }).then((res) => {
    if (res.code === 200) {
      collapse.value = res.data
    }
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
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
.satetyCollapse {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .collapse-content {
    .tile1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #e0f2fe;
      line-height: 19px;
    }
    .active-text {
      padding: 8px 16px;
      position: relative;
    }
    .inner-text {
      width: calc(100% - 68px - 12px);
      .t1 {
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
        font-weight: 400;
        font-size: 14px;
        color: #e0f2fe;
        line-height: 16px;
      }
    }
    .item-active {
      background: rgba(0, 44, 80, 0.5);
      &::after {
        content: '';
        height: 100%;
        width: 3px;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: #26adff;
      }
    }
  }
  .status {
    position: absolute;
    right: 14px;
    bottom: 8px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #ff0000;
    line-height: 19px;
    &::after {
      content: '';
      position: absolute;
      width: 48px;
      height: 5px;
      background: linear-gradient(83deg, #ff0000 0%, rgba(255, 0, 0, 0) 100%);
      left: 0px;
      bottom: -5px;
    }
  }
}
</style>
