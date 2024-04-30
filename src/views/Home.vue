<template>
    <div>
        <ButtonSearch/>
    </div>
    <div class="container text-center py-5">
        <h1 class="display-4 my-3">¡Bienvenido a nuestro repositorio de tesis!</h1>
        <p class="lead text-muted">El Repositorio escolar es una plataforma digital que proporciona acceso abierto 
            en texto completo a diversos recursos de información académica. En el Repositorio se pueden consultar tesis 
            elaboradas en esta institucion de educación superior. Navega por nuestras secciones y descubre todo lo que 
            tenemos para ofrecerte.</p>
    </div>
    <div class="d-flex flex-column text-center">
        <hr class="my-4">
    </div>
</template>

<script setup>
import ButtonSearch from '../components/buttonSearch.vue';
import { useUserStore } from '../stores/user';
const userStore = useUserStore()

</script>
