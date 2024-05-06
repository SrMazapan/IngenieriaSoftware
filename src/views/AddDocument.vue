<template>
    
    <div>
        <form @submit.prevent="handleSubmit"> 
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useDataBaseStore } from '../stores/dataBase';

    const dataBaseStore = useDataBaseStore();
    const url = ref('');

    const handleSubmit = () => {
        dataBaseStore.addUrl(url.value)
    }
</script>