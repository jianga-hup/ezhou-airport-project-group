<!--
* @description 滚动组件（简单版）css样式滚动、鼠标滚轮滚动
* @fileName index.vue
* @author
* @date 2024/02/22 15:52:30
!-->
<template>
  <div
    class="custom-list"
    ref="scrollBody"
    @mouseenter="mouseenterFunc"
    @mouseleave="mouseleaveFunc"
    @mousewheel="mousewheelFunc"
  >
    <div class="list-body" ref="listBody" :style="{ transform: getScrollDistance() }">
      <slot />
    </div>
    <div class="list-body" ref="tBody" v-if="isCanScroll" :style="{ transform: getScrollDistance() }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch } from 'vue'
//滚动距离
const scrollDistance = ref(0)
//滚动容器高度
const bodyHeight = ref(0)
//列表高度
const listHeight = ref(0)

const scrollBody = ref<any>(null)
const listBody = ref<any>(null)
const isCanScroll = ref(false)
const animationFrame = ref()
const isStop = ref(false)

const props = defineProps({
  steep: {
    //滚动速度
    type: Number,
    default: 1
  },
  list: Array
})

/** 初始化判断 */
const initData = () => {
  nextTick(() => {
    bodyHeight.value = scrollBody.value?.clientHeight
    listHeight.value = listBody.value?.clientHeight
    // console.log(bodyHeight.value, listHeight.value)
    if (bodyHeight.value && listHeight.value && bodyHeight.value <= listHeight.value) {
      // 判断是否需要开启第二个slot
      isCanScroll.value = true
      start()
    } else {
      isCanScroll.value = false
    }
  })
}

const start = () => {
  //判断是否可以滚动函数
  const isScrollFunc = (bodySize: number, listSize: number) => {
    if (bodySize > listSize || props.steep == 0) {
      scrollDistance.value = 0
      isCanScroll.value = !1
    }
  }
  isStop.value = !1
  //判断是否可以滚动
  isScrollFunc(bodyHeight.value, listHeight.value)
  if (isCanScroll.value) {
    run()
  }
}

const run = () => {
  //清空动画
  clearAnimation()
  animationFrame.value = window.requestAnimationFrame(() => {
    //滚动主逻辑函数
    const main = (listSize: number, bodySize: number) => {
      const tempScrollDistance = Math.abs(scrollDistance.value)
      if (scrollDistance.value < 0) {
        const cc = 2 * listSize - bodySize
        if (tempScrollDistance > cc) {
          scrollDistance.value = -(listSize - bodySize)
        }
      } else {
        scrollDistance.value = -listSize
      }
    }
    main(listHeight.value, bodyHeight.value)
    //判断滚动值
    if (!isStop.value) {
      scrollDistance.value -= props.steep
      // console.log(scrollDistance.value)
      run()
    }
  })
}

const stop = () => {
  isStop.value = !0
  clearAnimation()
}

const getScrollDistance = () => {
  let style = ''
  style = 'translate(0px, ' + scrollDistance.value + 'px)'
  return style
}

const clearAnimation = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
}

const mouseenterFunc = () => {
  stop()
}
const mouseleaveFunc = () => {
  start()
}
const mousewheelFunc = (e: any) => {
  if (!isCanScroll.value) {
    return false
  }
  const dis = e.deltaY
  const main = (listSize: number, bodySize: number) => {
    const tempScrollDistance = Math.abs(scrollDistance.value)
    if (scrollDistance.value < 0) {
      const cc = 2 * listSize - bodySize
      if (tempScrollDistance > cc) {
        scrollDistance.value = -(listSize - bodySize)
      }
    } else {
      scrollDistance.value = -listSize
    }
  }
  main(listHeight.value, bodyHeight.value)
  if (dis > 0) {
    scrollDistance.value -= 20
  } else {
    scrollDistance.value += 20
  }
}

// 监听
watch(
  () => props.list,
  (val) => {
    if (val?.length) {
      //初始化页面数据
      initData()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="scss">
.custom-list {
  // white-space: nowrap;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.list-body {
  overflow: hidden;
  // white-space: nowrap;
  width: 100%;
}
</style>
