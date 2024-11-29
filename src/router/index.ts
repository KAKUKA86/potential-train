import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import SearchView from "../components/SearchView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: SearchView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router