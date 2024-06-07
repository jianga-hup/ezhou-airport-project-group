<!--
* @description 项目群弹框
* @fileName ProjectGroupPop.vue
* @author
* @date 2024/04/26 11:00:45
!-->
<template>
  <el-dialog
    v-model="visible"
    append-to-body
    align-center
    custom-class="groupPoplPopFrame"
    destroy-on-close
    :width="width"
    :show-close="false"
    :before-close="closec"
  >
    <div class="statistical">
      <div class="statistical-line" />
      <div class="frame-header pt-16px pl-32px">
        <div class="frame-box">{{ title }}</div>
        <el-icon class="frame-close" :class="{ 'close-absolute': close }" :size="40" @click="closec" v-if="close"
          ><CircleClose
        /></el-icon>
      </div>
      <slot />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ visible: boolean; title: string; width: string; close: boolean }>(), {
  visible: false,
  width: '1444',
  close: false
})
const visible = props.visible
const selfEmit = defineEmits(['close'])
const closec = () => {
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
      font-size: 38px;
      line-height: 45px;
      letter-spacing: 1px;
      background: linear-gradient(360deg, #60a9ff 0%, #ffffff 78%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
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
    .close-absolute {
      position: absolute;
      left: 50%;
      top: -53px;
    }
  }
  .statistical-line {
    position: absolute;
    top: 76px;
    right: 76px;
    width: 583px;
    height: 5px;
    background: url('@/assets/images/common/xmqtk-line.png');
    background-size: 100% 100%;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 18px;
      height: 5px;
      background: url('@/assets/images/common/xmqtk-line1.png');
      background-size: 100% 100%;
    }
    &::after {
      left: -14px;
    }
    &::before {
      left: -26px;
    }
  }
}
</style>
