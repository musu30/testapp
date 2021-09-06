import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../src/assets/bootstrap/css/bootstrap.css'

const app = createApp(App).use(store)
app.config.devtools = true;
app.use(VueAxios, axios)
app.use(router).mount('#app')
