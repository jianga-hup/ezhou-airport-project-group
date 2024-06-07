<!--
* @description 构件信息-基本信息-工序报验-工程量清单
* @fileName information.vue
* @author
* @date 2024/03/21 15:22:51
!-->
<template>
  <div class="information flex">
    <div class="menu w-37px">
      <div
        class="menu-item item uno-flex-y-center"
        v-for="(e, i) in tabs"
        :key="i"
        @click="handleEmut(i)"
        :class="{ mt15px: i > 0, active: active === i }"
      >
        {{ e.name }}
      </div>
    </div>
    <div class="inner">
      <div class="inner-title uno-flex-y-center">
        <img src="@/assets/images/menu/gjback.png" @click="back" class="w-30px h-31px cursor-pointer" />
        <div class="t1 ml5px">{{ info.name }}</div>
      </div>
      <component :is="tabs[active].com" v-if="info.id" :info="info" />
      <div class="uno-flex-center w-100% h-320px" v-else v-loading="loading">
        <img src="@/assets/images/menu/zwsj.png" class="wihi-150" v-if="!loading && !info.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BasicInformation from './basicInformation.vue'
import BillOfQuantities from './billOfQuantities.vue'
import ProcessInspection from './processInspection.vue'
import QualityInspection from './qualityInspection.vue'
import { ref, reactive, watch } from 'vue'
import { componentStore } from '@/store/modules/component'
import { getPrimaryKeyBasedOnModel } from '@/api/home'
// 构件信息
const component = componentStore()
interface Item {
  name: string
  com: any
}
interface Node {
  bimId: string
  fullPath: string
  glid: string
  id: string
  treeId: string
  children: Node[]
  [key: string]: any
}
const active = ref(0)
const loading = ref(true)
const info = reactive<{ id: string; name: string; fullPath: string }>({
  id: '',
  name: '',
  fullPath: ''
})
const tabs = ref<Item[]>([
  { name: '基本信息', com: BasicInformation },
  { name: '质检资料', com: QualityInspection },
  { name: '工序报验', com: ProcessInspection },
  { name: '工程量清单', com: BillOfQuantities }
])
const handleEmut = (i: number) => {
  active.value = i
}

/** 树形结构取值 */
const getTreeId = (node: Node): { node: Node } => {
  if (node.children && node.children.length > 0) {
    return getTreeId(node.children[node.children.length - 1])
  } else {
    return { node }
  }
}

/** 名字 */
const getNmae = (fullPath: string) => {
  if (!fullPath) return ''
  let str = ''
  const arr = fullPath && fullPath.length ? fullPath.split('/') : null
  if (arr) {
    str = arr[2] + arr[arr.length - 1]
  }
  return str
}

/** 初始化 */
const init = async () => {
  Object.assign(info, { id: '', name: '' })
  loading.value = true
  if (component.state.gild) {
    const { code, data } = await getPrimaryKeyBasedOnModel({ bimId: component.state.gild })
    // console.log(code, data)
    if (code === 200 && data.length) {
      const { node } = getTreeId(data[0])
      info.id = node.id
      info.name = getNmae(node.fullPath)
      info.fullPath = node.fullPath
    }
  }
  loading.value = false
}

watch(
  () => component.state.gild,
  () => {
    init()
  },
  { immediate: true, deep: true }
)

/** 返回 */
const back = () => {
  component.state.gild = ''
}
</script>

<style scoped lang="scss">
.information {
  width: 100%;
  height: 100%;
  .menu {
    .menu-item {
      width: 37px;
      height: 123px;
      padding: 0px 6px 0px 14px;
      font-family:
        PingFangSC,
        PingFang SC;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      line-height: 18px;
      text-shadow: 0px 0px 6px #4cafff;
      cursor: pointer;
    }
    .item {
      background: url('@/assets/images/menu/menu.png');
      background-size: 100% 100%;
    }
    .active {
      background: url('@/assets/images/menu/menu-active.png');
      background-size: 100% 100%;
    }
  }
  .inner {
    width: calc(100% - 37px);
    :deep(.el-loading-mask) {
      background-color: transparent;
    }
    .inner-title {
      width: 100%;
      height: 52px;
      background: url('@/assets/images/menu/gjcard-1.png');
      background-size: 100% 100%;
      padding: 0px 0px 0px 20px;
      .t1 {
        font-family: PangMenZhengDao, PangMenZhengDao;
        font-weight: normal;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
