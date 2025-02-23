import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import SearchView from "../components/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/search'
    },
    {
        name: 'search',
        path: '/search',
        component: SearchView
    }, {
        name: 'add_word',
        path: '/add_word',
        component: () => import('../components/AddWord.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router