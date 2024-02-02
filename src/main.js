import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { store } from './store/index'

const router = createRouter({
    history: createWebHistory (),
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
})

document.documentElement.style.overflow = 'auto';

await store.dispatch('product/getProductData')

createApp(App).use(router).use(store).mount('#app')
