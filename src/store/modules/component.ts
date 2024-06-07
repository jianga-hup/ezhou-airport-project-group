import { reactive } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'
export const componentStore = defineStore('component', () => {
  // 构件信息
  const state = reactive<{ gild: string; axis: number[] }>({
    gild: '',
    axis: []
  })
  return { state }
})

/** 在 setup 外使用 */
export function componentStoreHook() {
  return componentStore(store)
}
