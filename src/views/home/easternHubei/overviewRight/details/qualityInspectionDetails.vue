<!--
* @description 质检详情
* @fileName qualityInspectionDetails.vue
* @author
* @date 2024/06/04 17:03:59
!-->
<template>
  <PopUpBox :visible="visible" :title="title" @close="close">
    <div class="content">
      <iframe frameborder="0" :src="url + '&scaleselect=page-width'" style="width: 100%; height: 100%" />
    </div>
  </PopUpBox>
</template>

<script lang="ts" setup>
import PopUpBox from '@/components/DetailsPopUpBox.vue'
interface Props {
  visible: boolean
  url: string
  title: string
}
withDefaults(defineProps<Props>(), {
  visible: false
})
const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
</script>

<style scoped lang="scss">
.content {
  padding: 35px 18px 0px 16px;
  width: 100%;
  height: 760px;
}
</style>
