import './assets/main.css'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import store from './store/store'

const app = createApp(App);
app.use(store);
app.use(PrimeVue)
app.use(router)
app.mount('#app');
