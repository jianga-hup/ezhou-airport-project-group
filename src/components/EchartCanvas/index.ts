import { type App } from 'vue'
import Echart from './index.vue' // Svg Component

export function loadEchart(app: App) {
  app.component('Echart', Echart)
}
