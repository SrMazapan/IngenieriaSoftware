<template>
  <div>
    <h1 class="text-center mt-3 text-secondary" v-if="dataBaseStore.searchPerformed && dataBaseStore.documents.length > 0">
      Resultados acordes a tu búsqueda
    </h1>
    <div class="container mt-3 text-center" v-if="dataBaseStore.searchPerformed && dataBaseStore.documents.length > 0">
      <div class="row justify-content-center">
        <div class="col-8 mb-3" v-for="item of dataBaseStore.documents" :key="item.id">
          <div class="border p-2 d-flex flex-column align-items-center">
            <h6>Título:</h6>
            <div>{{ item.title }}</div>
            <h6>Autor:</h6>
            <div>{{ item.autor }}</div>
            <h6>Link de descarga:</h6>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <router-link class="btn btn-outline-primary p-3 m-4" to="/">Volver a la búsqueda</router-link>
      </div>
    </div>
    <div class="text-center mt-5" v-if="dataBaseStore.searchPerformed && dataBaseStore.documents.length === 0">
      <h2>No se encontraron resultados acordes a tu búsqueda</h2>
      <img src="/src/Logo/notFound.png" alt="No se encontraron resultados" style="justify-content:center; width: 300px; height: auto; margin-block: 1cm;">
      <br>
      <router-link class="btn btn-outline-primary p-3 m-4" to="/">Volver a la búsqueda</router-link>
    </div>
  </div>
</template>

<script setup>
import { useDataBaseStore } from '../stores/dataBase';

const dataBaseStore = useDataBaseStore();
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
