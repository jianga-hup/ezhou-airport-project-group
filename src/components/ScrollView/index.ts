import { type App } from 'vue'
import vueAutoScroll from './index.vue' //

export function loadVueAutoScroll(app: App) {
  app.component('VueAutoScroll', vueAutoScroll)
}
