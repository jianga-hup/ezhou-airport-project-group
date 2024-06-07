<!--
* @description 无人机
* @fileName unmannedAerialVehicle.vue
* @author
* @date 2024/05/14 17:07:00
!-->
<template>
  <ProjectGroupPop :visible="visible" width="1443" :title="title" close @close="close">
    <div class="absolute top-0px left-0px w-100% h-100%">
      <iframe
        :src="url"
        style="border: 0"
        allow="autoplay"
        allowfullscreen
        width="100%"
        height="100%"
        frameborder="0"
      />
    </div>
  </ProjectGroupPop>
</template>

<script lang="ts" setup>
import ProjectGroupPop from '@/components/ProjectGroupPop.vue'

const props = withDefaults(defineProps<{ visible: boolean; title: string; url: string }>(), {
  visible: false
})

const selfEmit = defineEmits(['close'])
const close = () => {
  selfEmit('close')
}
const visible = props.visible
</script>

<style scoped lang="scss"></style>
