import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import 'virtual:uno.css'
import '@material-design-icons/font/filled.css'
import '@material-design-icons/font/outlined.css'
import '@material-design-icons/font/sharp.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  return {
    app,
  }
}
