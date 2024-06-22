import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import { useDataBaseStore } from "./stores/dataBase";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import RestorePass from '../src/views/RestorePass.vue'
import VerifyEmail from './views/VerifyEmail.vue'
import BusquedaBasica from "./views/BusquedaBasica.vue";
import BusquedaAvanzada from "./views/BusquedaAvanzada.vue";
import EditarPerfil from "./views/EditarPerfil.vue";
import VerPerfil from "./views/VerPerfil.vue";
import AddDocument from "./views/AddDocument.vue";
import VistaDocs from "./views/VistaDocs.vue";
import NavBar from './components/NavBar.vue';

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
// const requireSearchResults = (to, from, next) => {
//     const userStore = useUserStore();
//     const dataBaseStore = useDataBaseStore();
//     if (dataBaseStore.searchPerformed && dataBaseStore.documents.length > 0) {
//         next(); // Permitir el acceso si se han realizado búsquedas y hay resultados
//     } else if (to.path === "/vistaDocs" && !dataBaseStore.searchPerformed){
//         next("/"); // Redirigir al usuario a la página principal u otra página adecuada
//     }else{
//         next();
//     }
// };

const routes = [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/restorePassword", component: RestorePass },
    { path: "/verifyEmail", component: VerifyEmail },
    { path: "/busquedaBasica", component: BusquedaBasica, beforeEnter: requireAuth },
    { path: "/busquedaAvanzada", component: BusquedaAvanzada, beforeEnter: requireAuth },
    { path: "/editarPerfil", component: EditarPerfil, beforeEnter: requireAuth },
    { path: "/verPerfil", component: VerPerfil, beforeEnter: requireAuth },
    { path: "/addDocument", component: AddDocument, beforeEnter: requireAuth },
    { path: "/vistaDocs", component: VistaDocs, beforeEnter: requireAuth },
    
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
