/** 获取地址上嵌套的token */
export const getAtToken = (at: string) => {
  // console.log('window.location', window.location)
  const hash: string = window.location.search || window.location.hash
  let params: string[] = []
  if (hash) {
    const l = hash.split('?')[1]
    if (l) {
      params = l.split('&')
    }
  }
  let str: string = ''
  for (let index = 0; index < params.length; index++) {
    const element: string = params[index]
    const arr: string[] = element.split('=')
    if (arr[0] === at) {
      str = arr[1]
    }
  }
  return str
}

/** 图片路径 */
export const viteImages = (imgPath: string) => {
  const path = imgPath.replace('@', '..')
  const modules = import.meta.glob('../assets/images/**/*.png', { eager: true })
  return (modules[path] as { default: string }).default
  // try {
  //   const handlePath = imgPath.replace('@', '..')
  //   return new URL(handlePath, import.meta.url).href
  // } catch (error) {
  //   console.warn(error)
  // }
}

/** xy坐标转换 - 4326 */
export const Coordinate = (arr: number[]) => {
  const _window = window as any
  const srcCRS = `PROJCS["CGCS2000_3_Degree_GK_CM_115E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",114.750000],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]`
  const destCRS = 'EPSG:4326'
  const coordList = [[arr[1], arr[0], 0, 0]]
  const trans02 = _window.BlackHole3D.Coordinate.getTransGeoCoords(srcCRS, destCRS, coordList)
  console.log('trans2trans92', trans02)
}

/**
 * [获取URL中的参数名及参数值的集合]
 * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */
export const GetRequest = (urlStr?: string | undefined) => {
  let url = ''
  let str = ''
  let strs: string | string[] = ''
  if (typeof urlStr == 'undefined') {
    url = decodeURI(location.search) || decodeURI(location.hash) // 获取url中'?'符后的字符串
  } else {
    url = '?' + urlStr.split('?')[1]
  }
  const theRequest: any = new Object()
  if (url.indexOf('?') != -1) {
    str = url.substr(1)
    strs = str.split('?')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}
