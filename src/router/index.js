import { createRouter, createWebHistory } from "vue-router";
import City from '../views/City.vue';

const routes = [
    {
        path: '/',
        name: 'City',
        component: City,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;