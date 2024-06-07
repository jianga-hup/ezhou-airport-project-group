declare interface GXINFO {
  byprojectName: string //
  code?: string
  creationTime: string //
  creatorId?: string
  creatorName: string //
  divisionalWorkName?: string
  fullPathName?: string
  id: string
  inspectTime?: string
  jlId?: string
  jlName?: string
  jlSectionName?: string
  positionId?: string
  positionName?: string
  receiver?: null | string
  sgSectionName?: string
  subitemWorkName?: string
  unitWorkName: string //
  wfStatus?: number
  wfTaskName?: string
  isshow?: boolean
  position3857?: number[]
}

declare interface ZJINFO {
  bdmc: string
  bgmc: string
  dw_name?: string
  gcbw: string
  gx?: string
  old_id?: string
  row_number?: number
  startIndex?: numer
  table_type?: string
  tbr?: string
  tenantid?: string
  tx_state?: string
  tx_type?: number
  url: string
  wcsj: string
  isshow?: boolean
  position3857?: number[]
}
