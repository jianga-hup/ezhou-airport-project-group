<!--
* @description 文字加时间选择器
* @fileName textTime.vue
* @author 
* @date 2024/02/26 11:13:57
!-->
<template>
  <div class="textTime flex flex-justify-between flex-items-center">
    <div class="title-inco">{{ title }}</div>
    <el-select
      v-model="value"
      placeholder="请选择"
      @change="hendck"
      style="width: 100px"
      v-if="showTime"
      class="select1"
      popper-class="select-time"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface Props {
  title: string
  showTime: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showTime: false
})
const title = props.title
const value = ref('1')
const options: { label: string; value: string }[] = [
  { label: '近7天', value: '1' },
  { label: '近30天', value: '2' }
]
// 点击返回
const selfEmit = defineEmits(['cliclTitle'])
const hendck = () => {
  selfEmit('cliclTitle', value.value)
}
</script>

<style scoped lang="scss">
.textTime {
}
</style>
