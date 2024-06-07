export interface getListscreen extends page {
  /** 类型 */
  query: string
}

export interface page {
  /** 页码 */
  pageSize: number
  /** 当前页 */
  pageNum: number
}

/** 巡视次数分布折线图 */
export interface butionDat {
  /** 类型 */
  timeType: string
}

/** 时间参数 */
export interface time {
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
}

/** 时间参数 */
export interface date {
  /** 开始时间 */
  startDate: string
  /** 结束时间 */
  endDate: string
}

export interface gxList extends page {
  /** 状态 */
  dataStatus: string
}

export interface machine extends page {
  /** 类型 */
  type: string
}

export interface progressS extends time {
  /** 类型 */
  type: string
}

/** 监理巡视列表参数 */
export interface Patrol extends page {
  /** 开始时间 */
  inspectBeginTime: string
  /** 结束时间 */
  inspectEndTime: string
  /** 合同段 */
  contractSectionList: string[]
  /** 巡视人 */
  inspector: string
  /** 状态 */
  status: string
  /** 类型 */
  searchType: string
}

/** 监理指令列表参数 */
export interface Instruction extends page {
  /** 开始时间 */
  startReplyDate: string
  /** 结束时间 */
  endReplyDate: string
  /** 合同段 */
  contractSection: string[]
  /** 关键字 */
  keyWord: string
  /** 状态 */
  status: string
  /** 类型 */
  searchType: string
}

/** 监理指令列表参数 */
export interface Bystander extends page {
  /** 开始时间 */
  besideBeginTime: string
  /** 结束时间 */
  besideEndTime: string
  /** 合同段 */
  contractSectionList: string[]
  /** 关键字 */
  keyWord: string
  /** 状态 */
  status: string
  /** 类型 */
  searchType: string
  /** 旁站人 */
  bystander: string
}

export interface hcsWbsGxsb extends page {
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
  /** 状态 */
  dataStatus: number
  /** 关键字 */
  keyWord: string
  /** 标段信息 */
  sgSectionId: string
}

export interface Device {
  /** 标段信息 */
  departmentId: string
  /** 类型 */
  type: number
}

export interface bhz extends page {
  /** 标段信息 */
  sectionId: string
  /** 设备信息 */
  deviceCode: string
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
}

export interface wylj extends page {
  /** 标段信息 */
  departmentId: string
  /** 设备信息 */
  deviceCode: string
  /** 开始时间 */
  startTime: string
  /** 结束时间 */
  endTime: string
  /** 类型 */
  type: number
  /** 评定结果 */
  result: string
  /** 状态 */
  wfStatus: string
}
