<template>
    <BusquedaBasica @buscar-basica="realizarBusquedaBasica" />
    <BusquedaAvanzada @buscar-avanzada="realizarBusquedaAvanzada" />
    <h1 class="text-center mt-3 text-secondary" v-if="dataBaseStore.searchPerformed">Resultados acordes a tu búsqueda</h1>
    <div class="container mt-3 text-center" v-if="dataBaseStore.searchPerformed">
    <div class="row justify-content-center">
        <div class="col-8" v-for="item of dataBaseStore.documents" :key="item.id">
            <div class="border mt-3 p-2 d-flex flex-column align-items-center">
                <h6>Título:</h6>
                <div>{{ item.title }}</div>
                <h6>Nombre del autor:</h6>
                <div>{{ item.autor }}</div>
                <h6>Tutor o sinodal encargado:</h6>
                <div>{{ item.tutor }}</div>
                <h6>Año de publicación:</h6>
                <div>{{ item.year }}</div>
                <h6>Link de descarga:</h6>
                <div>{{ item.name }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useDataBaseStore } from '../stores/dataBase';
import BusquedaBasica from './BusquedaBasica.vue';
import BusquedaAvanzada from './BusquedaAvanzada.vue';
import { onMounted } from 'vue';


const dataBaseStore = useDataBaseStore();

const realizarBusquedaBasica = async (queryText) => {
  await dataBaseStore.searchBasic(queryText);
};

const realizarBusquedaAvanzada = async (criterios) => {
  await dataBaseStore.searchAdvanced(criterios);
};
onMounted(() => {
  dataBaseStore.getUrls();
});
</script>

<style>
.container {
    max-width: 600px;
    margin: 0 auto;
}

.border {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 100%;
}

.mb-3 {
    margin-bottom: 1rem;
}

.p-2 {
    padding: 1rem;
}

</style>