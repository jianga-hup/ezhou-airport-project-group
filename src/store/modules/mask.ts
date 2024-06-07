import { reactive, ref } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

interface Move {
  ml: number
  inx: number
  show: boolean
}

export const masktStore = defineStore('mask', () => {
  // 构件信息
  const state = reactive<Move>({
    ml: 0,
    inx: 0,
    show: false
  })
  const bgshow = ref(true)
  return { state, bgshow }
})

/** 在 setup 外使用 */
export function maskStoreHook() {
  return masktStore(store)
}
