import { type App } from 'vue'
import CardTitle from './index.vue' //

export function loadCardTitle(app: App) {
  app.component('CardTitle', CardTitle)
}
