<!--
* @description 图例
* @fileName legend.vue
* @author
* @date 2024/04/25 10:50:15
!-->
<template>
  <div class="legend">
    <div class="legend-title">{{ title }}</div>
    <div class="legend-content">
      <el-checkbox-group v-model="checkList" @change="handleCkeck">
        <div v-for="(e, i) in leng" :key="i">
          <el-checkbox :label="e.key" class="uno-flex-y-center mt8px">
            <div class="uno-flex-y-center">
              <img :src="viteImages(`@/assets/images/common/icon_${e.key}.png`)" class="wihi-22 ml6px mr9px" />
              <div class="t1">{{ e.name }}</div>
              <div class="t1 ml5px">({{ e.count }})</div>
            </div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { viteImages } from '@/utils'
import { ref, watch } from 'vue'
interface Props {
  title: string
  leng: Leng[]
  active: string[]
}
interface Leng {
  name: string
  count: number
  key: string
}
interface Emits {
  (e: 'handleCkeck', value: string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '图例'
})

/** 返回函数 */
const emit = defineEmits<Emits>()
const hendck = (checks: string[]) => {
  emit('handleCkeck', checks)
}
const checkList = ref<string[]>([])

/** 点击多选框 */
const handleCkeck = () => {
  console.log(checkList.value, 'checkList.value')
  hendck(checkList.value)
}

watch(
  () => props.active,
  (val) => {
    checkList.value = val
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
.legend {
  background: rgba(0, 28, 61, 0.4);
  border-radius: 2px 2px 2px 2px;
  border: 2px solid rgba(76, 175, 255, 0.4);
  &-title {
    position: relative;
    padding: 12px 12px 10px 12px;
    font-family:
      PingFang SC,
      PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
    line-height: 19px;
    border-bottom: 2px solid rgba(44, 181, 255, 0.24);
    &::after {
      content: '';
      position: absolute;
      left: 12px;
      bottom: 0px;
      width: 22px;
      height: 4px;
      background: #23adff;
    }
  }
  &-content {
    padding: 8px 12px 12px 12px;
    .img {
      width: 22px;
      height: 22px;
    }
    .t1 {
      font-family:
        PingFang SC,
        PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      line-height: 19px;
    }
  }
}
</style>
