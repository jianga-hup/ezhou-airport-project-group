<!--
* @description 菜单+主容器
* @fileName index.vue 头部菜单+主内容
* @author
* @date 2024/01/26 13:59:17
!-->
<template>
  <div class="main-content">
    <Menu />
    <div class="content">
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <!-- <keep-alive>
            <component :is="Component" :key="route.path" class="app-container-grow" />
          </keep-alive> -->
          <component :is="Component" :key="route.path" class="app-container-grow" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './components/menu.vue'
</script>

<style scoped lang="scss">
.main-content {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
