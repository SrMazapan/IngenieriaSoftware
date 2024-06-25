

<template>
  <div class="d-flex justify-content-center">
    <h2>Preguntas Frecuentes</h2>
    <div class="card-body" v-for="(item, index) in faqs" :key="index">
      <h3>{{ item.question }}</h3>
      <p>{{ item.answer }}</p>
    </div>
  </div>
</template>

<script setup>
import ButtonSearch from '../components/ButtonSearch.vue';
import { useUserStore } from '../stores/user';
import { useDataBaseStore } from '../stores/dataBase';
import { ref } from "vue"
 
const userStore = useUserStore()
const dataBaseStore = useDataBaseStore();

dataBaseStore.getUrls();
</script>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: '¿Cómo puedo subir mi tesis?',
          answer: 'Puedes subir tu tesis en la sección de "Agregar tesis" en la barra de navegación.',
        },
        {
          question: 'Question 2',
          answer: 'Answer 2',
        },
        // Add more FAQs as needed
      ],
    };
  },
};
</script>



<style scoped>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>