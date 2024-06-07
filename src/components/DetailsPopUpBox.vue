<!--
* @description 详情弹框组件
* @fileName DetailsPopUpBox.vue
* @author 
* @date 2024/03/01 10:46:27
!-->
<template>
  <el-dialog
    v-model="visible"
    append-to-body
    align-center
    custom-class="statisticalPopFrame"
    destroy-on-close
    :width="width"
    :show-close="false"
    :before-close="close"
  >
    <div class="statistical">
      <div class="frame-header pt-23px pl-37px">
        <div class="frame-box">{{ title }}</div>
        <el-icon class="frame-close" @click="close"><CircleClose /></el-icon>
      </div>
      <slot />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ visible: boolean; title: string; width: string }>(), {
  visible: false,
  width: '1444'
})
const visible = props.visible
const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
</script>

<style scoped lang="scss">
.statistical {
  .frame-header {
    position: relative;
    .frame-box {
      position: relative;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 36px;
      line-height: 42px;
      letter-spacing: 4px;
      background: linear-gradient(90deg, #ffffff 0%, #a3c3ff 100%);
      background: linear-gradient(180deg, #ffffff 0%, #a3c3ff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      &::after {
        content: '';
        position: absolute;
        left: 0px;
        bottom: -9px;
        width: 123px;
        height: 7px;
        background: url('@/assets/images/common/statisticalPopFrame-line.png');
        background-size: 100% 100%;
      }
    }
    .frame-close {
      position: absolute;
      font-size: 30px;
      top: 30px;
      right: 20px;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
