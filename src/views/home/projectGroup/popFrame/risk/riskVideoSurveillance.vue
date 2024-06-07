<!--
* @description 视频监控
* @fileName riskVideoSurveillance.vue
* @author
* @date 2024/05/07 11:53:37
!-->
<template>
  <CardTitle :show="true" title="视频监控">
    <div class="select-ritht absolute right-4px top--10px">
      <el-select v-model="value" style="width: 190px" popper-class="selectpopper">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select></div
  ></CardTitle>
  <div class="riskVideoSurveillance mt12px h-151px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
const options = ref([
  {
    value: '0',
    label: '湖北交投鄂州项目群'
  },
  {
    value: '1',
    label: '湖北交投鄂州项目群1'
  },
  {
    value: '2',
    label: '湖北交投鄂州项目群2'
  },
  {
    value: '3',
    label: '湖北交投鄂州项目群3'
  },
  {
    value: '4',
    label: '湖北交投鄂州项目群4'
  }
])
</script>

<style scoped lang="scss">
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
