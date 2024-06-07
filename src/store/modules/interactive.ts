import { reactive } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

export const interactiveStore = defineStore('interactive', () => {
  // 构件信息
  const state = reactive<{ active: string; cads: boolean[]; hfs: boolean[]; tdt: boolean }>({
    cads: [true, true],
    hfs: [true],
    active: 'edgs',
    tdt: true
  })
  return { state }
})

/** 在 setup 外使用 */
export function interactiveStoreHook() {
  return interactiveStore(store)
}
