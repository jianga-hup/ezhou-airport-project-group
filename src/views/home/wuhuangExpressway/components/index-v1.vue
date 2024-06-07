<!--
 * @Descripttion:
 * @Version:
 * @Date: 2024-05-13 09:59:23
 * @LastEditTime: 2024-05-14 12:02:53
-->
<template>
  <iframe class="iframe" :src="IframeUrl" style="border: 0" allow="autoplay" allowfullscreen />
</template>

<script lang="ts" setup>
import { GetRequest } from '@/utils'
import { onMounted, ref } from 'vue'
const IframeUrl = ref('')
const getUrl = () => {
  const str = GetRequest()
  console.log(str)
  console.log('encodeURI(str.url)', unescape(str.url))
  if (str.url) {
    IframeUrl.value = unescape(str.url)
  }
}

onMounted(() => {
  getUrl()
})
</script>

<style scoped lang="scss">
.iframe {
  width: 100%;
  height: 100vh;
}
</style>
