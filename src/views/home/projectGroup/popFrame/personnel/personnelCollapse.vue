<!--
* @description 人员-折叠面板
* @fileName personnelCollapse.vue
* @author
* @date 2024/05/13 11:33:02
!-->
<template>
  <div class="search mt12px mb12px">
    <el-input v-model="keytext" placeholder="请输入人员姓名" class="input-with-select">
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
  <CardContent class="personnelCollapse h-380px pt6px">
    <div class="relative z-1">
      <div class="collapse-item mb12px" v-for="(e, i) in collapse" :key="i">
        <div class="pl19px pr16px uno-flex-y-center">
          <img
            :src="viteImages(`@/assets/images/xmq/icon_${selectId.includes(e.tenantId) ? 'zk' : 'sq'}.png`)"
            class="wihi-20 mr8px cursor-pointer"
            @click="handleCollapse(e.tenantId, 1, e)"
          />
          <div class="tile1">{{ e.tenantName }}({{ e.total }}人)</div>
        </div>
        <!-- 第二层 -->
        <template v-if="selectId.includes(e.tenantId) && e.list.length">
          <div class="mt12px" v-for="(e1, i1) in e.list" :key="i1">
            <div class="pl37px pr16px uno-flex-y-center">
              <img
                :src="viteImages(`@/assets/images/xmq/icon_${selectId.includes(e1.sectionId) ? 'zk' : 'sq'}.png`)"
                class="wihi-20 mr8px cursor-pointer"
                @click="handleCollapse(e1.sectionId, 2, e1)"
              />
              <div class="tile1">{{ e1.sectionName }}({{ e1.total }}人)</div>
            </div>
            <!-- 第三层 -->
            <template v-if="selectId.includes(e1.sectionId) && e1.list.length">
              <div
                class="mt11px uno-flex-y-center cursor-pointer active-text"
                v-for="(e2, i2) in e1.list"
                :class="{ 'item-active': selectId.includes(e2.personId) }"
                @click="handleCheckDetails(e2.personId)"
                :key="i2"
              >
                <el-image
                  class="wihi-68 mr-12px"
                  :src="viteImages('@/assets/images/common/rectangle.png')"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[viteImages('@/assets/images/common/rectangle.png')]"
                  :initial-index="1"
                  preview-teleported
                  fit="cover"
                />
                <div class="inner-text">
                  <div class="uno-flex-between-center">
                    <div class="uno-flex-y-center">
                      <div class="t1">{{ e2.perName }}</div>
                      <div class="charge ml14px" :class="[e2.isOnline === 0 ? 'charge1' : 'charge2']">
                        <div
                          class="chage-box"
                          :style="`width: ${e2.power}%; background-color: ${color[e2.isOnline - 1]};`"
                        />
                      </div>
                      <div class="ml8px t2" :style="`color: ${color[e2.isOnline]};`">{{ e2.power }}%电量</div>
                    </div>
                    <img
                      :src="viteImages(`@/assets/images/common/ryxx-${e2.isOnline === 0 ? 'zx' : 'lx'}.png`)"
                      width="54"
                      height="28"
                    />
                  </div>
                  <div class="t2 mt6px">工种：{{ e2.workTypeName }}</div>
                  <div class="t2 mt6px">工点位置高度：{{ e2.lastHeight }}m</div>
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
import { ref, defineProps, watch, defineEmits } from 'vue'

interface CollItemPase {
  perName: string
  personId: string
  isOnline: number
  electricity: number
  power: string | null
  workTypeName: string | null
  lastHeight: string | null
}

interface CollItem {
  sectionName: string
  total: number
  sectionId: string
  list: CollItemPase[]
}

interface Coll {
  tenantName: string
  total: number
  tenantId: string
  list: CollItem[]
}
const props = defineProps({
  personnelList: { type: Object, default: () => {} },
  active: { type: Number, default: 0 }
})
const emit = defineEmits(['getCurrentID'])
const collapse = ref<Coll[]>([])
const color = ['#68ffa1', '#ff4d4d']
const keytext = ref('')
const selectId = ref(['1', '1-1', '1-1-1'])
const info = ref({})

const handleCollapse = (id: string, inx: number, item: CollItemPase | Coll | CollItem) => {
  if (!selectId.value.includes(id)) {
    if (inx === 1 && selectId.value.length >= 1) {
      selectId.value[inx - 1] = id
    } else if (inx === 2 && selectId.value.length >= 2) {
      selectId.value[inx - 1] = id
    } else if (inx === 3 && selectId.value.length >= 3) {
      selectId.value[inx - 1] = id
      info.value = item
    } else {
      selectId.value.push(id)
    }
  } else {
    selectId.value[inx - 1] = ''
  }
}

const handleCheckDetails = (id: string) => {
  emit('getCurrentID', id)
}

watch(
  () => [props.personnelList, props.active],
  (newValue: any) => {
    collapse.value = []
    console.log('同时监听很多', newValue)
    if (newValue[1] === 0) {
      if (newValue[0]?.presence?.bindType1?.list != null) {
        collapse.value = collapse.value.concat(newValue[0].presence.bindType1.list)
      }
      if (newValue[0]?.presence?.bindType3?.list != null) {
        collapse.value = collapse.value.concat(newValue[0].presence.bindType3.list)
      }
    } else {
      collapse.value = [...newValue[0].overall.list]
    }
  },
  { immediate: true, deep: true }
)
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
.personnelCollapse {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .collapse-item {
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
}
</style>
