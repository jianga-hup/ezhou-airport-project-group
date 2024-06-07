import { reactive } from 'vue'
import { useCardInfoStore } from '@/store/modules/cardInfo'
import moment from 'moment'
import {
  supervisionInstructionDealRate,
  currentDaySupervisionInfo,
  getAllSizeStat,
  getWfStatusStat,
  getGroupList,
  getBhzAndTestData,
  getList,
  getTestingMachineList,
  websitejson,
  websiteListjson
} from '@/api/home'
const infoStore = useCardInfoStore()
// const timer = ref<any>(null)

interface Rows {
  name: string
  old_id: string
  row_number: number
  sg_apply: number
  sg_approved: number
  sg_filled: number
  sg_no_filled: number
  sg_total: number
  startIndex: number
}

/** 重置数据 */
const resetData = (val: number) => {
  if (val === 0) {
    return {
      data1: null, // 接口返回的信息暂且不做处理
      data2: null, // 接口返回的信息暂且不做处理
      total: 0,
      day: 0,
      list: []
    }
  } else if (val === 1) {
    return {
      data1: null, // 接口返回的信息暂且不做处理
      total: 0,
      day: 0,
      list: [],
      type: {
        clz: 0,
        total: 0,
        ycl: 0
      }
    }
  } else if (val === 2) {
    return {
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
    }
  } else if (val === 3) {
    return {
      data1: null, // 接口返回的信息暂且不做处理
      total: 0,
      day: 0,
      list: [],
      type: {
        sg_filled: 0,
        sg_apply: 0,
        sg_approved: 0
      }
    }
  }
}

// 监理数据
const jlinfo = reactive<any>(resetData(0))

// 工序报验统计
const gxinfo = reactive<any>(resetData(1))

// 质量监测
const zlinfo = reactive<any>(resetData(2))

// 质检表格
const zjinfo = reactive<any>(resetData(3))

const init = () => {
  // 监理数据存储
  getJLdata()
  // 工序报验存储
  getGxData()
  // 质量监测存储
  getZlData()
  // 质检表格存储
  getZjData()
}
/** 监理数据请求 */
const getJLdata = async () => {
  await getDealRate()
  getSupervisionInfo()
}
const getDealRate = async () => {
  const { code, data } = await supervisionInstructionDealRate()
  if (code === 200) {
    jlinfo.data1 = data
    jlinfo.total = data.patrolMap.totalNum + data.besideMap.totalNum
    jlinfo.day = data.patrolMap.currentDayNum + data.besideMap.currentDayNum
  }
}
const getSupervisionInfo = async () => {
  const { code, data } = await currentDaySupervisionInfo({ pageNum: 1, pageSize: 5 })
  if (code === 200) {
    jlinfo.data2 = data
    jlinfo.list = [...data.patrolList, ...data.besideList]
  }
  infoStore.setJlInfo(jlinfo)
}
/** 工序数据请求 */
const getGxData = async () => {
  await getAllSize()
  await getStatus()
  getGroup()
}
const getAllSize = async () => {
  const { code, data } = await getAllSizeStat()
  // console.log(code, data)
  if (code === 200) {
    gxinfo.total = data.total
    gxinfo.day = data.toDay
  }
}
const getStatus = async () => {
  const { code, data } = await getWfStatusStat()
  // console.log(code, data)
  if (code === 200) {
    gxinfo.type = data
  }
}
const getGroup = async () => {
  const { code, data } = await getGroupList({ dataStatus: '2', pageNum: 1, pageSize: 10 })
  // console.log(code, data)
  if (code === 200) {
    gxinfo.list = data.list
  }
  infoStore.setgxinfo(gxinfo)
}
/** 质量监测数据请求 */
const getZlData = async () => {
  getTestData()
  getMachine()
}
const getTestData = async () => {
  const { code, data } = await getBhzAndTestData()
  // console.log(code, data)
  if (code === 200) {
    zlinfo.day.bhz = data.bhz.todayZs
    zlinfo.day.wnj = data.wnj.todayZs
    zlinfo.day.ylj = data.ylj.todayZs
    zlinfo.tabs = [
      { rate: data.bhz.rate, total: data.bhz.zs, ycl: data.bhz.hg },
      { rate: data.wnj.rate, total: data.wnj.zs, ycl: data.wnj.hg },
      { rate: data.ylj.rate, total: data.ylj.zs, ycl: data.ylj.hg }
    ]
  }
  infoStore.setzlinfo(zlinfo)
}
const getMachine = async () => {
  zlinfo.list = []
  await getMachineList('3', '1')
  await getMachineList('4', '2')
  getbhzList()
}
const getMachineList = async (type: string, t: string) => {
  const { code, data } = await getTestingMachineList({ pageNum: 1, pageSize: 5, type })
  if (code === 200) {
    const list = data.list.map((item: any) => {
      item.type = t
      return item
    })
    zlinfo.list = [...zlinfo.list, ...list]
  }
}
const getbhzList = async () => {
  const { code, data } = await getList({ pageNum: 1, pageSize: 5 })
  // console.log(code, data)
  if (code === 200) {
    const list = data.list.map((item: any) => {
      return {
        ...item,
        testName: item.gongchengmingcheng,
        deviceName: item.deviceName,
        address: item.jiaozuobuwei,
        testDate: item.createTime,
        type: '0'
      }
    })
    zlinfo.list = [...zlinfo.list, ...list]
  }
  infoStore.setzllist(zlinfo)
}
/** 质检表格数据请求 */
const getZjData = async () => {
  await getAllwebsite()
  getZjList()
}
const getAllwebsite = async () => {
  const res = await websitejson()
  if (res.rows && res.rows.length) {
    const type = { sg_filled: 0, sg_apply: 0, sg_approved: 0 }
    res.rows.map((item: Rows) => {
      if (item.sg_filled || item.sg_apply || item.sg_approved) {
        type.sg_filled += item.sg_filled || 0
        type.sg_apply += item.sg_apply || 0
        type.sg_approved += item.sg_approved || 0
      }
    })
    zjinfo.type = type
  }
}
const getZjList = async () => {
  const res = await websiteListjson({
    TX_RI1: moment().format('YYYY-MM-DD'),
    TX_RI2: moment().format('YYYY-MM-DD'),
    TX_STATE: '0,1,2,3,4,5',
    treeid_like: '101|'
  })
  if (res.rows && res.rows.length) {
    zjinfo.total = res.total + zjinfo.type.sg_filled
    zjinfo.day = res.total
    zjinfo.list = res.rows
  } else {
    zjinfo.total = zjinfo.type.sg_filled
    zjinfo.day = res.total
    zjinfo.list = res.rows
  }
  // console.log('zjinfo', zjinfo)
  infoStore.setzjinfo(zjinfo)
}

export function useinit() {
  init()
}

export function reset() {
  // 监理数据
  infoStore.setJlInfo(resetData(0))
  // 工序报验统计
  infoStore.setgxinfo(resetData(1))
  // 质量监测
  infoStore.setzllist(resetData(2))
  // 质检表格
  infoStore.setzjinfo(resetData(3))
}
