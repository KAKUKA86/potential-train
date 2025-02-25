import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import SearchView from "../components/SearchView.vue";
import {useAuthStore} from "../store/auth.ts";
import {storeToRefs} from "pinia";
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
    },{
        name: 'add_list',
        path: '/add_list',
        component: () => import('../components/AddList.vue')
    }, {
        name: 'account',
        path: '/account',
        component: () => import('../components/Account.vue'),
        meta: {
            requiresAuth: true,
        }
    },{
        name: 'login',
        path: '/login',
        component: () => import('../components/GlobalLogin.vue'),
    }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const {showLoginModal} = storeToRefs(authStore)
    try {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const token = sessionStorage.getItem('token');

        if (requiresAuth && !token) {
            showLoginModal.value = true
            next(false);
        } else {
            showLoginModal.value = false
            next();
        }
    } catch (error) {
        console.error("Error in route guard:", error);
        next();
    }
})

export default router;