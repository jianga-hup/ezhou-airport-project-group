import { reactive } from 'vue'
import store from '@/store'
import { defineStore } from 'pinia'

export const useCardInfoStore = defineStore('cradInfo', () => {
  const jlinfo = reactive({
    data1: null, // 接口返回的信息暂且不做处理
    data2: null, // 接口返回的信息暂且不做处理
    info: {
      total: 0,
      day: 0
    },
    list: []
  })
  // 工序报验统计
  const gxinfo = reactive<any>({
    data1: null, // 接口返回的信息暂且不做处理
    list: [],
    info: {
      total: 0,
      day: 0
    },
    type: {
      clz: 0,
      total: 0,
      ycl: 0
    }
  })
  // 质量监测
  const zlinfo = reactive<any>({
    day: {
      bhz: 0,
      wnj: 0,
      ylj: 0
    },
    tabs: [
      { rate: 0, total: 0, ycl: 0 },
      { rate: 0, total: 0, ycl: 0 },
      { rate: 0, total: 0, ycl: 0 }
    ],
    list: []
  })
  // 质检表格
  const zjinfo = reactive<any>({
    total: 0,
    day: 0,
    list: [],
    type: {
      sg_filled: 0,
      sg_apply: 0,
      sg_approved: 0
    }
  })
  const setJlInfo = (data: any) => {
    jlinfo.data1 = data.data1
    jlinfo.data2 = data.data2
    jlinfo.info.total = data.total
    jlinfo.info.day = data.day
    jlinfo.list = data.list
  }
  const setgxinfo = (data: any) => {
    gxinfo.data1 = data.data1
    gxinfo.type = data.type
    gxinfo.info.total = data.total
    gxinfo.info.day = data.day
    gxinfo.list = data.list
  }
  const setzlinfo = (data: any) => {
    zlinfo.tabs = data.tabs
    zlinfo.day = data.day
  }
  const setzllist = (data: any) => {
    zlinfo.list = data.list
  }
  const setzjinfo = (data: any) => {
    zjinfo.total = data.total
    zjinfo.day = data.day
    zjinfo.type = data.type
    zjinfo.list = data.list
  }
  return { jlinfo, gxinfo, zlinfo, zjinfo, setJlInfo, setgxinfo, setzlinfo, setzllist, setzjinfo }
})

/** 在 setup 外使用 */
export function useCardInfoStoreHook() {
  return useCardInfoStore(store)
}
