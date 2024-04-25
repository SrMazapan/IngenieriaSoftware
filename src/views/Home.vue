<template>
     <div>
         <ButtonSearch/>
     </div>
</template>

<script setup>
import ButtonSearch from '../components/buttonSearch.vue';
import { useUserStore } from '../stores/user';
// import BusquedaBasica from './BusquedaBasica.vue';
const userStore = useUserStore()

</script>