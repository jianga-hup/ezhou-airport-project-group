<!--
* @description 首页
* @fileName index.vue 首页可能有航飞对比，最好不要在当前页面写逻辑
* @author
* @date 2024/01/29 10:47:16
!-->
<template>
  <div class="home">
    <BlackHole @clicLoad="clicLoad" />
    <ProjectGroup v-if="loading && active === 'edgs'" />
    <ProjectOverview v-if="loading && active === 'ezjceq'" />
    <WuhuangExpressway v-if="loading && active === 'whgkj'" />
  </div>
</template>

<script lang="ts" setup>
import ProjectOverview from './easternHubei/projectOverview.vue' // 鄂东高速
import WuhuangExpressway from './wuhuangExpressway/index.vue' // 武黄高速
import ProjectGroup from './projectGroup.vue' // 项目群首页
import BlackHole from '@/components/BlackHole.vue' // 黑洞场景
import { isLoadCAD } from '@/hooks/useProject' // 一些交互操作
import { interactiveStore } from '@/store/modules/interactive'
import { inject, onBeforeUnmount, ref, watch } from 'vue'
/** 获取全局对象 */
const global: any = inject('global')
const interactive = interactiveStore()
const loading = ref(false)
const active = ref('edgs')

const clicLoad = () => {
  loading.value = true
  /** 加载CAD */
  isLoadCAD(global)
}
watch(
  () => interactive.state.active,
  () => {
    active.value = interactive.state.active
  }
)
onBeforeUnmount(() => {
  copyCanvas()
})
/** 隐藏canvas */
const copyCanvas = () => {
  const canvasBox = document.getElementById('canvas')
  if (canvasBox) {
    const body = document.querySelector('body') as HTMLBodyElement
    body.append(canvasBox)
    canvasBox.style.display = 'none'
  }
}
</script>

<style scoped lang="scss"></style>
