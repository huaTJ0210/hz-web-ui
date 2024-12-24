import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import webUI from '@htj24/web-ui'
import '@htj24/web-ui/dist/lib/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(webUI)

app.mount('#app')
