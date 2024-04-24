<template>
    <div style="display: flex; justify-content: center;">
        <div class="btn-group btn-group-sm mt-3" role="group" aria-label="small button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
            <label class="btn btn-outline-primary p-3" for="btnradio1">Busqueda básica</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnBusqueda" autocomplete="off">
            <label class="btn btn-outline-primary p-3" for="btnBusqueda">Busqueda avanzada</label>
        </div>
     </div>
     <div>
        <BusquedaBasica/>
     </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import BusquedaBasica from './BusquedaBasica.vue';

const userStore = useUserStore()

</script>