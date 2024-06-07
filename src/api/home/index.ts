import http from '@/utils/request'
import { interactiveStore } from '@/store/modules/interactive'
import type * as Home from './types/home'
const interactive = interactiveStore()

const API_PATH = 'http://59.173.239.197:1020'

/** 项目大事记 */
export function getListscreen(params: Home.getListscreen) {
  return http.get(`${API_PATH}/simpproserver/screenPhoto/info/getList`, params)
}

/** 图片获取 */
export function queryFileListByBizIds(data: string[]) {
  return http.post(`${API_PATH}/filemanage/upload/sysFileinfo/queryFileListByBizIds`, data)
}

/** 进度统计 */
export function progressStatistics() {
  return http.get(`${API_PATH}/simpproserver/dzsp/slqJd/progressStatistics`)
}

// 监理云
/** 质量监理-监理指令处理率统计 */
export function supervisionInstructionDealRate() {
  return http.get(`${API_PATH}/superviseCloud/common/supervisionInstructionDealRate`)
}

/** 质量监理-实时监理信息 */
export function currentDaySupervisionInfo(params: Home.page) {
  return http.get(`${API_PATH}/superviseCloud/common/currentDaySupervisionInfo`, params)
}

/** 监理统计-累计巡视次数和巡视状态分布数据 */
export function selectSupervisionPatrolCountAndStatusData() {
  return http.get(`${API_PATH}/superviseCloud/supervisionPatrol/selectSupervisionPatrolCountAndStatusData`)
}

/** 监理统计-巡视次数分布折线图 */
export function selectSupervisionPatrolCountDistributionData(params: Home.butionDat) {
  return http.get(`${API_PATH}/superviseCloud/supervisionPatrol/selectSupervisionPatrolCountDistributionData`, params)
}

/** 监理统计-累计旁站登记次数和旁站记录状态分布数据 */
export function selectSupervisionBesideCountAndStatusData() {
  return http.get(`${API_PATH}/superviseCloud/supervisionBeside/selectSupervisionBesideCountAndStatusData`)
}

/** 监理统计-旁站项目登记情况 */
export function selectBesideProjectCountDistributionData() {
  return http.get(`${API_PATH}/superviseCloud/supervisionBeside/selectBesideProjectCountDistributionData`)
}

/** 监理统计-监理指令下发次数 */
export function countNum() {
  return http.get(`${API_PATH}/superviseCloud/supervisionInstruction/countNum`)
}

/** 监理统计-监理指令状态分布 */
export function statusDistribute() {
  return http.get(`${API_PATH}/superviseCloud/supervisionInstruction/statusDistribute`)
}

/** 监理统计-监理指令状态分布 */
export function countNumByDate(params: { timeFlag: number }) {
  return http.get(`${API_PATH}/superviseCloud/supervisionInstruction/countNumByDate`, params)
}

/** 工序报验统计-获取所有统计 */
export function getAllSizeStat() {
  return http.get(`${API_PATH}/simpproserver/dzsp/wbs/hcsWbsGxsb/getAllSizeStat`)
}

/** 工序报验统计-工序报验状态分布 */
export function getWfStatusStat() {
  return http.get(`${API_PATH}/simpproserver/dzsp/wbs/hcsWbsGxsb/getWfStatusStat`)
}

/** 工序报验统计-各标段工序报验排行 */
export function getSectionStat() {
  return http.get(`${API_PATH}/simpproserver/dzsp/wbs/hcsWbsGxsb/getSectionStat`)
}

/** 工序报验统计-各月工序报验分析 */
export function getGroupByMonthStat(params: Home.time) {
  return http.get(`${API_PATH}/simpproserver/dzsp/wbs/hcsWbsGxsb/getGroupByMonthStat`, params)
}

/** 工序报验统计-列表 */
export function getGroupList(params: Home.gxList) {
  return http.get(`${API_PATH}/simpproserver/wbs/hcsWbsGxsb/getList`, params)
}

/** 质量监测统计-水泥拌合站-生产统计 */
export function bhzProductionStatistics() {
  return http.get(`${API_PATH}/dataSwitchTw/kafka/lbBanhezhanDetail/bhzProductionStatistics`)
}

/** 质量监测统计-水泥拌合站-产能分析 */
export function bhzCapacityAnalysis() {
  return http.get(`${API_PATH}/dataSwitchTw/kafka/lbBanhezhanDetail/bhzCapacityAnalysis`)
}

/** 质量监测统计-万能机压力机-产能分析 */
export function getTestDataStatic() {
  return http.get(`${API_PATH}/dataSwitchTw/dp/getTestDataStatic`)
}

/** 质量监测统计-万能机压力机-试验机按月统计 */
export function getTestDataByMonth(params: Home.date) {
  return http.get(`${API_PATH}/dataSwitchTw/dp/getTestDataByMonth`, params)
}

/** 质量监测统计-数据统计 */
export function getBhzAndTestData() {
  return http.get(`${API_PATH}/dataSwitchTw/productionData/getBhzAndTestData`)
}

/** 质量监测统计-实验室列表 */
export function getTestingMachineList(params: Home.machine) {
  return http.get(`${API_PATH}/dataSwitchTw/productionData/getTestingMachineList`, params)
}

/** 质量监测统计-拌合站列表 */
export function getList(params: Home.page) {
  return http.get(`${API_PATH}/dataSwitchTw/kafka/lbBanhezhanDetail/getList`, params)
}

// 合同段的接口
/** 合同段-标段列表 */
export function getSectionList() {
  return http.get(`${API_PATH}/system-manager-server/tenant_group/select_by_user_id?userGroupType=section`)
}

/** 根据sectionId获取所有单位工程 */
export function queryAllUnitBySectionId(params: { sectionId: string }) {
  return http.get(`${API_PATH}/centerWBS/bimTree/queryAllUnitBySectionId`, params)
}

/** 合同段-合同段列 */
export function selectSgOrganization() {
  return http.get(`${API_PATH}/exchangeAuthCenter/exchangeSgOrganization/selectSgOrganization`)
}

/** 质量监理-监理巡视列表 */
export function selectDataList(data: Home.Patrol) {
  return http.post(`${API_PATH}/superviseCloud/supervisionPatrol/selectDataList`, data)
}

/** 质量监理-监理指令列表*/
export function getJLZLList(data: Home.Instruction) {
  return http.post(`${API_PATH}/superviseCloud/supervisionInstruction/queryPage`, data)
}

/** 质量监理-监理旁站列表 */
export function getJLPZList(data: Home.Bystander) {
  return http.post(`${API_PATH}/superviseCloud/supervisionBeside/selectDataList`, data)
}

/** 质量监理-工序报验列表 */
export function getGXBYList(params: Home.hcsWbsGxsb) {
  return http.get(`${API_PATH}/simpproserver/wbs/hcsWbsGxsb/getList`, params)
}

/** 质量监理-拌合站列表 */
export function getDeviceStatus(data: Home.Device) {
  return http.post(`${API_PATH}/dataSwitchTw/laboratory/info/getDeviceStatus`, data)
}

/** 质量监理-拌合站生产列表 */
export function getBHZSCList(params: Home.bhz) {
  return http.get(`${API_PATH}/dataSwitchTw/kafka/lbBanhezhanDetail/getDataList`, params)
}

/** 质量监理-万能机-压力机列表 */
export function getWNJList(data: Home.wylj) {
  return http.post(`${API_PATH}/dataSwitchTw/laboratory/info/getAllList`, data)
}

/** 进度统计列表-树形数据 */
export function progressSummaryStatisticsTable(params: Home.progressS) {
  return http.get(`${API_PATH}/simpproserver/schedule/jlJdDetail/progressSummaryStatisticsTable`, params)
}

/** 质量监理-监理巡视详情 */
export function getJLXSDetail(params: { id: string }) {
  return http.get(`${API_PATH}/superviseCloud/supervisionPatrol/getDetail`, params)
}

/** 质量监理-监理指令详情 */
export function getJLZLDetails(params: { id: string }) {
  return http.get(`${API_PATH}/superviseCloud/supervisionInstruction/queryById`, params)
}

/** 质量监理-监理旁站详情 */
export function getJLPZDetails(params: { id: string }) {
  return http.get(`${API_PATH}/superviseCloud/supervisionBeside/getDetail`, params)
}

/** 质量监理-工序报验详情 */
export function getGXBYDetails(params: { id: string }) {
  return http.get(`${API_PATH}/simpproserver/wbs/hcsWbsGxsb/getInfo`, params)
}

/** 质量监理-获取照片 */
export function queryFileList(params: { bizId: string }) {
  return http.get(`${API_PATH}/filemanage/upload/sysFileinfo/queryFileList`, params)
}

/** 质量监理- 拌合站列表-详情 */
export function getBHZDetails(params: { bianhao: string }) {
  return http.get(`${API_PATH}/dataSwitchTw/kafka/lbBanhezhanDetail/getInfo`, params)
}

/** 质量监理- 压力机、万能机详情 */
export function getYLJorWNJDetails(params: { id: string }) {
  return http.get(`${API_PATH}/dataSwitchTw/productionData/getTestingMachineInfo`, params)
}

/** 文件转换 */
export function queryFileByFileId(params: { fileId: string }) {
  return http.get(`${API_PATH}/filemanage/upload/sysFileinfo/queryFileByFileId`, params)
}

/** 获取构建状态 */
export function getStructureStatus(params: { id: string }) {
  return http.get(`${API_PATH}/centerWBS/wbs/dzspBim/getStructureStatus`, params)
}

/** Wbs-基于模型获取主键 */
export function getPrimaryKeyBasedOnModel(params: { bimId: string | number }) {
  return http.get(`${API_PATH}/centerWBS/wbs/dzspBim/getPrimaryKeyBasedOnModel`, params)
}

/** Wbs-获取模型属性 */
export function getAttribute(params: { id: string }) {
  return http.get(`${API_PATH}/centerWBS/wbs/dzspBim/getAttribute`, params)
}

/** 标段分项获取清单列表 */
export function getQdListById(params: { id: string }) {
  return http.get(`${API_PATH}/centerJTJL/jtjl/pubBdfx/getQdListById`, params)
}

/** 获取租户下面所有的公司 */
export function queryAllTenantIdByLike(params: { tenantId: string }) {
  return http.get(`${API_PATH}/system-manager-server/system/tenant/queryAllTenantIdByLike`, params)
}

/** 根据租户获取token */
export function findTokenByTenant(data: { tenantId: string; userId: string }, flag: boolean = false) {
  if (flag) {
    return http.post(
      `${API_PATH}/oauth2-server/oauth/findTokenByTenant?tenantId=${data.tenantId}&userId=${data.userId}`,
      data
    )
  }
  return http.post(`${API_PATH}/oauth2-server/oauth/findTokenByTenant`, data)
}

/** 获取要用到的租户 */
export function queryAllSonByMain(params: { userName: string; userId: string }) {
  return http.get(`${API_PATH}/system-manager-server/tenant_user/queryAllSonByMain`, params)
}

/** 工序质检-第三方接口 */
/** 获取总数信息 */
export function websitejson() {
  let ip = 20013
  if (interactive.state.active === 'whgkj') {
    ip = 20101
  }
  return http.get(`https://chgdsoft.cn/${ip}/website/ws/dataset/api/json?id=6774d11cb653431baec6e52f415b7f75`)
}

/** 获取列表数据 */
export function websiteListjson(params: {
  TX_RI1: string
  TX_RI2: string
  TX_STATE: string
  treeid_like: string
  page?: number
  rows?: number
}) {
  let ip = 20013
  if (interactive.state.active === 'whgkj') {
    ip = 20101
  }
  return http.get(`https://chgdsoft.cn/${ip}/website/ws/dataset/api/json?id=37a6a34d93a14095991d4f92cda23a07`, params)
}

/** 统计分析_各数量统计 */
export function getNumberDataset(params: { id: string; page?: number; rows?: number; treeid?: string }) {
  let ip = 20013
  if (interactive.state.active === 'whgkj') {
    ip = 20101
  }
  return http.get(`http://14.152.49.130:${ip}/glaf/website/ws/dataset/api/json`, params)
}

export function selectByIndexId(params: { indexId: string }) {
  return http.get(`${API_PATH}/centerWBS/bimTree/selectByIndexId`, params)
}

/* 安全统计接口 */
/** 工程风险统计-按级别分组 */
export function riskGroupByLevel(params: { tenantId: string; geRiskLevel: number }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/riskGroupByLevel`, params)
}

/** 工程风险统计-按类型分组 */
export function riskGroupByType(params: { tenantId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/riskGroupByType`, params)
}

/** 作业人员列表 */
export function staffList(params: { tenantId: string; perName: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/staffList`, params)
}

/** 作业人员列表 */
export function staffInfo(params: { tenantId: string; personId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/staffInfo`, params)
}

/** 作业人员统计列表 */
export function xmqAQWorkers(params: { tenantId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/workers`, params)
}
/** 历史作业记录 */
export function historyLog(params: { personId: string; pageNum: number; pageSize: number }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/historyLog`, params)
}
/**  设备在线状态 */
export function deviceOnLineStatus(params: { tenantId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/deviceOnLineStatus`, params)
}

/**  获取风险列表 */
export function getRiskList(params: { tenantId: string; appointRiskLevel: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/getRiskList`, params)
}

/**  工程风险-工序报验 */
export function getRiskGxby(params: { tenantId: string; riskId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/getRiskGxby`, params)
}

/**  工程风险-工序报验 */
export function selectCurrent2DataBySubProjectId(data: { treeId: string }) {
  return http.post(`${API_PATH}/superviseCloud/supervisionPatrol/selectCurrent2DataBySubProjectId`, data)
}

/**  风险详情-特种设备列表 */
export function getRiskDevice(params: { tenantId: string; riskId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/getRiskDevice`, params)
}

/**  风险详情-特种设备列表 */
export function getDeviceList(params: { tenantId: string; deviceName: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/getDeviceList`, params)
}

/**  特种设备详情 */
export function getDeviceInfo(params: { tenantId: string; deviceId: string }) {
  return http.get(`${API_PATH}/simpproserver/dzsp/xmqAQ/getDeviceInfo`, params)
}
