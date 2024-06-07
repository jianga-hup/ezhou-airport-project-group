<!--
* @description 用户名称、退出系统
* @fileName user.vue 用户信息
* @author
* @date 2024/01/26 16:01:36
!-->
<template>
  <div class="user uno-flex-y-center p-e-a">
    <span class="userinfo mr10px">{{ username }}</span>
    <img src="@/assets/images/menu/icon_tuichu.png" class="wihi-24 cursor-pointer" @click="handleCommand('a')" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { selectByUserIdOrg } from '@/api/login'
import { useUserStore } from '@/store/modules/user'
import { setItem } from '@/utils/cache/cookies'
const userStore = useUserStore()
const username = ref<string>(userStore.info?.userName || '')
// console.log(userStore)
const handleCommand = (command: string | number | object) => {
  if (command === 'a') {
    userStore.logout()
    location.reload()
  }
}

/** 获取用户信息 */
const init = () => {
  selectByUserIdOrg({ userId: '' }).then((res) => {
    if (res.code === 200) {
      setItem('info', res.data)
      username.value = res.data.userName
    }
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.user {
  position: absolute;
  right: 20px;
  top: 20px;
  .userinfo {
    font-size: 14px;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
