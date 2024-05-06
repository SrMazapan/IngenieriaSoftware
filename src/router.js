import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import RestorePass from '../src/views/RestorePass.vue'
import VerifyEmail from './views/VerifyEmail.vue'
import BusquedaBasica from "./views/BusquedaBasica.vue";
import BusquedaAvanzada from "./views/BusquedaAvanzada.vue";
import EditarPerfil from "./views/EditarPerfil.vue";
import AddDocument from "./views/AddDocument.vue";

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
    { path: "/busquedaBasica", component: BusquedaBasica },
    { path: "/busquedaAvanzada", component: BusquedaAvanzada },
    { path: "/editarPerfil", component: EditarPerfil, beforeEnter: requireAuth },
    { path: "/addDocument", component: AddDocument },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
