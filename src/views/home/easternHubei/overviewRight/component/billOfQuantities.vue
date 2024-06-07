<!--
* @description 工程量清单
* @fileName billOfQuantities.vue
* @author
* @date 2024/03/21 16:58:26
!-->
<template>
  <CardTitle title="工程量清单" style="width: 415px" />
  <div class="billOfQuantities pl10px pt10px">
    <vue-auto-scroll class="h-100%" :steep="0.45" :list="list" v-if="list.length">
      <CardBoder v-for="(e, i) in list" :key="i">
        <div class="milset-content">
          <div>
            <span class="rowbig">清单编号 </span>
            <span class="rowbig">{{ e.qdfbCode }}</span>
          </div>
          <div class="mt10px">
            <span class="rowtext">清单名称：</span>
            <span class="rowtext1">{{ e.xmmc }}</span>
          </div>
          <div class="mt10px">
            <span class="rowtext">计量单位：</span>
            <span class="rowtext1">{{ e.jldwCode }}</span>
          </div>
          <div class="mt10px">
            <span class="rowtext">合同数量：</span>
            <span class="rowtext1">{{ e.sl }}</span>
          </div>
          <div class="mt10px">
            <span class="rowtext">已申报/总量：</span>
            <span class="rowtext1">{{ e.sbSl }}/{{ e.bgSl }}</span>
          </div>
        </div>
      </CardBoder>
    </vue-auto-scroll>
    <div class="uno-flex-center w-100% h-60%" v-else>
      <img src="@/assets/images/menu/zwsj.png" class="wihi-150" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getQdListById } from '@/api/home'
interface Item {
  qdfbCode: string
  xmmc: string
  jldwCode: string
  sbSl: string
  bgSl: string
  sl: string
}
interface Info {
  name: string // 名称
  id: string // 唯一id
  fullPath?: string // 路径
}
const props = withDefaults(defineProps<{ info: Info }>(), {})
const list = ref<Item[]>([])

const init = async () => {
  const { code, data } = await getQdListById({ id: props.info.id })
  if (code == 200 && data.length) {
    list.value = data
  }
}

watch(
  () => props.info,
  () => {
    init()
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.billOfQuantities {
  height: 800px;
  width: 415px;
  .milset-content {
    position: relative;
    background: rgba(45, 63, 75, 0.22);
    padding: 6px;
    margin-bottom: 13px;
    .rowbig {
      font-size: 18px;
      font-family:
        PingFangSC-Medium,
        PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 27px;
      letter-spacing: 1px;
    }
    .rowtext {
      font-size: 16px;
      font-family:
        PingFangSC-Regular,
        PingFang SC;
      font-weight: 400;
      color: rgba(150, 212, 255, 0.7);
      line-height: 22x;
      letter-spacing: 1px;
    }
    .rowtext1 {
      font-size: 16px;
      color: #96d4ff;
    }
  }
}
</style>
