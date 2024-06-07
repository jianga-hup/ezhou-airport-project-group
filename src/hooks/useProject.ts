// 项目群CAD等交互显隐
import mapuser from '@/config/user-map'

const dataadShp = [
  'wh1_S1-6',
  'wh1_S1-6_02',
  'wh2_01',
  'wh2_02',
  'wh2_03',
  'wh2_04',
  'wh2_05',
  'wh2_06',
  'wh2_07',
  'wh2_08',
  'wh2_09'
  // 'wh2_A.S1.5'
]

const dataSetCadShp = {
  dataSetId: 'res_ed0308',
  resourcesAddress:
    'https://engine3.bjblackhole.com/engineweb/api/autoconvert/EngineRes/RequestEngineRes?dir=url_res04&path=res_ed0308',
  useTransInfo: true,
  transInfo: [
    [1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 45.5]
  ]
}

/** 项目群加载CAD */
const isLoadCAD = (global: any, names?: string[]) => {
  if (names?.length) {
    if (names?.includes('edgs')) {
      /** 鄂东CAD */
      global.$BlackHole3D.CAD.loadCadShp(dataSetCadShp, false)
    }
    if (names?.includes('whgs')) {
      /** 武黄 */
      isWHLoadCAD(global)
    }
  } else {
    /** 鄂东CAD */
    // global.$BlackHole3D.CAD.loadCadShp(dataSetCadShp, false)
    /** 武黄 */
    isWHLoadCAD(global)
  }
}

/** 隐藏全部CAD */
const hideCAD = (global: any, val: number = 0) => {
  if (val === 0) {
    global.$BlackHole3D.Model.unloadDataSet('res_ed0308')
    dataadShp.map((e) => {
      global.$BlackHole3D.Model.unloadDataSet(e)
    })
  } else if (val === 1) {
    global.$BlackHole3D.Model.unloadDataSet('res_ed0308')
  } else if (val === 2) {
    dataadShp.map((e) => {
      global.$BlackHole3D.Model.unloadDataSet(e)
    })
  }
}

/** 隐藏鄂东的航飞和CAD */
const hideEDCAD = (global: any) => {
  /** 关闭鄂东CAD */
  global.$BlackHole3D.Model.unloadDataSet('res_ed0308')
  /** 关闭鄂东航飞 */
  global.$BlackHole3D.BIM.setElemAlpha(mapuser.qxid, [], 0)
  global.$BlackHole3D.BIM.setElemAlpha(mapuser.bimid, [], 0)
}

/** 打开武黄CAD */
const isWHLoadCAD = (global: any) => {
  dataadShp.map((e) => {
    const dataSetCadShp2 = {
      dataSetId: e,
      resourcesAddress:
        'https://engine3.bjblackhole.com/engineweb/api/autoconvert/EngineRes/RequestEngineRes?dir=url_res04&path=' + e,
      useTransInfo: true,
      transInfo: [
        [1, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 45.5]
      ]
    }
    global.$BlackHole3D.CAD.loadCadShp(dataSetCadShp2, false)
  })
}

export { isLoadCAD, hideCAD, hideEDCAD, isWHLoadCAD }
