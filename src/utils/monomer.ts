/**
 * 单体工程数据
 * @param {string} name // 单体工程名称
 * @param {string} src // 图片
 * @param {boolean} show // 二维底图是否展示
 * @param {boolean} isxmq // 项目群是否展示
 * @param {string} imgwz // 图片位置
 * @param {imgwh} imgwh // 图片大小
 * @param {string} click // 图片可点击的范围
 * @param {number[]} position4326 // 4326的经纬度
 * @param {number[]} position3857 // 3857的经纬度
 * @param {camRotate: number[], camDir: number[], camPos: number[]} dw // 备用定位
 * @param {number} montype // 类型 1 互通 2 桥梁 3 服务区 4 隧道
 */
export const monomer = [
  {
    name: '陈桥互通',
    src: 'cqht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:61px;left:51px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:6px;left:0px;width:89px;height:22px;',
    position4326: [114.9069309414906, 30.29475583492829],
    position3857: [12791381.041024584, 3541494.5039650435, 0],
    montype: 1
  },
  {
    name: '樟树岭大桥',
    src: 'zsldq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:48px;left:94px;z-index: 1;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.88402630917479, 30.28246044557512],
    position3857: [12788831.309018383, 3539909.4164491007, 0],
    montype: 2
  },
  {
    name: '李家边大桥',
    src: 'ljbdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:72px;left:152px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.8793878956087, 30.28087607872932],
    position3857: [12788314.963182116, 3539705.178715068, 0],
    montype: 2
  },
  {
    name: '碧石渡互通',
    src: 'bsdht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:32px;left:198px;z-index: 1;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.86956842547593, 30.27792000757918],
    position3857: [12787221.864767076, 3539324.1259890213, 0],
    montype: 1
  },
  {
    name: '高垴村1号大桥',
    src: 'gncdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:18px;left:267px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.8635880562476, 30.27543311780688],
    position3857: [12786556.133109823, 3539003.5620378177, 0],
    dw: {
      camDir: [0.3349924875979059, -0.5637476046202655, -0.7549626954610934],
      camPos: [12785652.236359034, 3539036.0210258625, 739.5479251187201],
      camRotate: [0.09271553675882957, -0.3375240458292941, -0.9032803435881622, 0.24812490527514264]
    },
    montype: 2
  },
  {
    name: '高垴村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.85258784800898, 30.26840831597311],
    position3857: [12785331.59553008, 3538098.098053146, 0],
    montype: 2
  },
  {
    name: '下畈村大桥',
    src: 'xfcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'bottom:-20px;left:225px;z-index:1;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.84686633560834, 30.266257077042344],
    position3857: [12784694.679683072, 3537820.826411117, 0],
    montype: 2
  },
  {
    name: '架虹村大桥',
    src: 'jhcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'bottom:-25px;left:310px;z-index:2;',
    imgwh: 'width:81px;height:76px;',
    click: 'bottom:7px;left:0px;width:81px;height:60px;',
    position4326: [114.84152210252924, 30.26425768244216],
    position3857: [12784099.762378028, 3537563.131322942, 0],
    montype: 2
  },
  {
    name: '还地桥互通',
    src: 'hdqht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:76px;left:322px;z-index:1;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.82918613852364, 30.254766374937912],
    position3857: [12782726.52914648, 3536339.900935896, 0],
    montype: 1
  },
  {
    name: '桂树村1号大桥',
    src: 'gscdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:16px;left:411px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.82496710112277, 30.24383720446598],
    position3857: [12782256.868051376, 3534931.5065813935, 0],
    dw: {
      camPos: [12781671.590682324, 3534920.2408632394, 754.4022300194285],
      camRotate: [0.16974925316076978, -0.2964176153478528, -0.8155838148017625, 0.4670597706892103],
      camDir: [0.5537789738104428, -0.32494072448781885, -0.7666435767257065]
    },
    montype: 2
  },
  {
    name: '桂树村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.8217354398614, 30.23739968295249],
    position3857: [12781897.121165344, 3534102.00466898, 0],
    montype: 2
  },
  {
    name: '塘桥村1号大桥',
    src: 'tqcdq',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'bottom:-6px;left:475px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.81872606896944, 30.233509091497563],
    position3857: [12781562.119530044, 3533600.7118192078, 0],
    dw: {
      camPos: [12781096.154971072, 3533602.2984863226, 620.2950281371437],
      camRotate: [0.10240429268020626, -0.2845230443768156, -0.8968630660571912, 0.3227950414763366],
      camDir: [0.367370511642351, -0.44424522408131, -0.8171199961184306]
    },
    montype: 2
  },
  {
    name: '塘桥村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.81369429265351, 30.228708220623425],
    position3857: [12781001.984752769, 3532982.159115523, 0],
    montype: 2
  },
  {
    name: '临空经济区互通',
    src: 'lkjjqht',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:48px;left:515px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.800388445683, 30.21705403557557],
    position3857: [12779520.784643438, 3531480.738899386, 0],
    montype: 1
  },
  {
    name: '燎原村1号大桥',
    src: 'lycdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:29px;left:583px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.79212075916772, 30.211598280559514],
    position3857: [12778600.429990517, 3530777.929696, 0],
    dw: {
      camPos: [12778029.84394252, 3530961.1191620203, 619.6527795328758],
      camRotate: [0.09271553675882957, -0.3375240458292941, -0.9032803435881622, 0.24812490527514264],
      camDir: [0.3349924875979059, -0.5637476046202655, -0.7549626954610934]
    },
    montype: 2
  },
  {
    name: '燎原村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.78512517196279, 30.20625500972023],
    position3857: [12777821.684785066, 3530089.6484503117, 0],
    montype: 2
  },
  {
    name: '高溪村大桥',
    src: 'gxcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:34px;left:640px;z-index: 1;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.77632498582061, 30.198686151080793],
    position3857: [12776842.052544832, 3529114.7471397077, 0],
    montype: 2
  },
  {
    name: '保安互通',
    src: 'baht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:124px;left:649px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:59px;height:22px;',
    position4326: [114.75955044666334, 30.1925436672267],
    position3857: [12774974.719387554, 3528323.624086038, 0],
    montype: 1
  },
  // {
  //   name: '武阳高速跨线桥',
  //   position4326: [114.75468945063515, 30.189175839846456],
  //   position3857: [12774433.59578495, 3527889.8846926847, 0],
  //   montype: 2
  // },
  {
    name: '塘塆村1号大桥',
    src: 'twcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:54px;left:767px;z-index: 2;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.7477430114362, 30.179250817326604],
    position3857: [12773660.321710493, 3526611.736414457, 0],
    dw: {
      camPos: [12773279.591923706, 3526538.6920186416, 544.3961904223321],
      camRotate: [0.1686098349885128, -0.2813597759902821, -0.8103122225365497, 0.4855939682571459],
      camDir: [0.5465064405242509, -0.2922266931116335, -0.7848147999996895]
    },
    montype: 2
  },
  {
    name: '塘塆村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.74573284729522, 30.174129439305684],
    position3857: [12773436.55126191, 3525952.2537135785, 0],
    montype: 2
  },
  {
    name: '保安服务区',
    src: 'bafwq',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:89px;left:796px;z-index: 3;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.74337300506733, 30.169914569445325],
    position3857: [12773173.854826747, 3525409.5282833083, 0],
    montype: 3
  },
  {
    name: '先锋村1号大桥',
    src: 'xianfcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:126px;left:777px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.7408584711189, 30.16638721609674],
    position3857: [12772893.938188026, 3524955.3483822527, 0],
    dw: {
      camPos: [12772479.160140542, 3524963.437065827, 585.6836294436046],
      camRotate: [0.13745196510113386, -0.2846337500835854, -0.854331260268838, 0.412563550656926],
      camDir: [0.4697180422851204, -0.37292767931411863, -0.8001811712063838]
    },
    montype: 2
  },
  {
    name: '先锋村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.73819281600524, 30.162728880637314],
    position3857: [12772597.198818142, 3524484.320471059, 0],
    montype: 2
  },
  {
    name: '沼山村1号大桥',
    src: 'zscdq',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:111px;left:881px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.73369128754166, 30.15562390997926],
    position3857: [12772096.090961786, 3523569.5719845872, 0],
    dw: {
      camPos: [12771660.138516448, 3523396.1418265705, 565.4345182650976],
      camRotate: [0.15889060955803627, -0.2869605795129897, -0.8264424584044957, 0.4576027348543472],
      camDir: [0.5252557839221298, -0.3288952586429246, -0.7848147999996897]
    },
    montype: 2
  },
  {
    name: '沼山村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.73089448011163, 30.1490268803551],
    position3857: [12771784.751782829, 3522720.278729623, 0],
    montype: 2
  },
  {
    name: '大王山隧道',
    src: 'dwssd',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:27px;left:905px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.7257173298187, 30.133425360456773],
    position3857: [12771208.434048459, 3520711.984728644, 0],
    montype: 4
  },
  {
    name: '向阳村大桥',
    src: 'xycdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:-30px;left:937px;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.7190471975093, 30.11331632678154],
    position3857: [12770465.918316253, 3518123.9325483916, 0],
    montype: 2
  },
  {
    name: '上洪隧道',
    src: 'shsd',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:-17px;left:1025px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:21px;left:0px;width:89px;height:22px;',
    position4326: [114.71720832721002, 30.1069962887021],
    position3857: [12770261.216210902, 3517310.646324176, 0],
    montype: 4
  },
  {
    name: '上洪村大桥',
    src: 'shcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:37px;left:1054px;z-index: 1;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.71531828462346, 30.103765137278465],
    position3857: [12770050.817632588, 3516894.869725665, 0],
    montype: 2
  },
  {
    name: '太和东互通',
    src: 'thdht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:-1px;left:1069px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:6px;left:58px;width:31px;height:22px;',
    position4326: [114.71097815093512, 30.098061941611288],
    position3857: [12769567.676160427, 3516161.0297400435, 0],
    montype: 1
  },
  {
    name: '新屋村1号大桥',
    src: 'xwcdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:32px;left:1147px;z-index: 2;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:20px;left:0px;width:103px;height:65px;',
    position4326: [114.70034304908481, 30.088184954806305],
    position3857: [12768383.782037918, 3514890.2410245864, 0],
    dw: {
      camPos: [12767879.35318734, 3514825.63407975, 497.4713493207827],
      camRotate: [0.11137884361327377, -0.29763454587262056, -0.8880198187705877, 0.3323089402487112],
      camDir: [0.39562648208134793, -0.4545863799968335, -0.7980168605971376]
    },
    montype: 2
  },
  {
    name: '新屋村2号大桥',
    show: false,
    type: 'ez',
    isxmq: false,
    position4326: [114.6945039167662, 30.082806146324636],
    position3857: [12767733.772801533, 3514198.248417487, 0],
    montype: 2
  },
  {
    name: '狮子口大桥',
    src: 'szkdq',
    show: true,
    type: 'ez',
    isxmq: false,
    imgwz: 'top:43px;left:1166px;z-index: 1;',
    imgwh: 'width:104px;height:81px;',
    click: 'bottom:7px;left:0px;width:103px;height:65px;',
    position4326: [114.6832394213991, 30.074110840233793],
    position3857: [12766479.814913224, 3513079.6624908806, 0],
    montype: 2
  },
  {
    name: '太和南互通',
    src: 'thnht',
    show: true,
    type: 'ez',
    isxmq: true,
    imgwz: 'top:65px;left:1246px;',
    imgwh: 'width:90px;height:38px;',
    click: 'bottom:6px;left:32px;width:57px;height:22px;',
    position4326: [114.66404990409414, 30.07134684159138],
    position3857: [12764343.64761827, 3512724.115382941, 0],
    montype: 1
  }
]
