import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import RestorePass from '../src/views/RestorePass.vue'
import VerifyEmail from './views/VerifyEmail.vue'

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
        next();
    } else {
        next("/login");
    }
    userStore.loadingSession = false;
};

const routes = [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/restorePassword", component: RestorePass },
    { path: "/verifyEmail", component: VerifyEmail },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
