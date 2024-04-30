<template>
    <div style="display: flex; justify-content: center;">
        <div class="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnBB" id="btnBasica" autocomplete="off" checked>
            <router-link class="btn btn-outline-primary p-3" for="btnBasica" to="/busquedaBasica">Busqueda básica</router-link>

            <input type="radio" class="btn-check" name="btnBA" id="btnAvanzada" autocomplete="off">
            <router-link class="btn btn-outline-primary p-3" for="btnAvanzada" to="/busquedaAvanzada">Busqueda avanzada</router-link>
        </div>
     </div>
</template>
<script setup>
    import { useUserStore } from '../stores/user';
    const userStore = useUserStore()

</script>
