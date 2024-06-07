import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/router/permission'

// load
import { loadSvg } from '@/icons'
import { loadEchart } from '@/components/EchartCanvas'
import { loadCardTitle } from '@/components/CardTitle'
import { loadVueAutoScroll } from '@/components/ScrollView'
import { loadPlugins } from '@/plugins'

import moment from 'moment' // 导入时间过滤器

// css
import 'uno.css'
import 'normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'
import '@/styles/index.scss'

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载全局 Echart */
loadEchart(app)
/** 加载全局 CardTitle */
loadCardTitle(app)
/** 加载全局 VueAutoScroll */
loadVueAutoScroll(app)

moment.locale('zh-cn')
app.config.globalProperties.$moment = moment

/** 配置全局变量 页面中使用 inject 接收 */
app.provide('global', {
  $BlackHole3D: undefined
})

app.use(store).use(router)
router.isReady().then(() => {
  app.mount('#app')
})
