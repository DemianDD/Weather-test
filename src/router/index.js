import { createRouter, createWebHistory } from "vue-router";
import City from '../views/City.vue';
import Trip from '../views/Trip.vue';

const routes = [
    {
        path: '/',
        name: 'City',
        component: City,
    },
    {
        path: '/trip',
        name: 'Trip',
        component: Trip,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;