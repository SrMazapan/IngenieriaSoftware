<template>
  <ButtonSearch/>
  
  <div class="d-flex justify-content-center">
  <div class="card m-3" style="width: 100%; max-width: 600px;">
      <div class="card-body">
          <form @submit.prevent="handleSubmit">
              <fieldset>
                  <legend class="card-title" style="text-align: center;">Busqueda básica</legend>
                  <div class="mb-3">
                  <label for="TextInput" class="form-label" >Escribe una palabra o frase relacionada con tu busqueda.</label>
                  <input type="text" id="TextInput" class="form-control" placeholder="Tesis, Autores, materias." v-model="word">
                  </div>

                  <button type="submit" class="btn btn-primary">Buscar</button>
              </fieldset>
          </form>
      </div>
  </div>  
  </div>
  <div v-if="errorMessage" class="custom-error-message">
        {{ errorMessage }}
  </div>

</template>

<script setup>
import { ref } from "vue"
import ButtonSearch from "../components/ButtonSearch.vue";
import { useDataBaseStore } from "../stores/dataBase";
import router from "../router";

const word = ref("")
const errorMessage = ref("")
const dataBaseStore =   useDataBaseStore();

const handleSubmit = async () => {

if (!word.value) {
  errorMessage.value = "Por favor, ingresa una palabra o frase."
  setTimeout(() => {errorMessage.value = ''}, 2000)
  return
}
await dataBaseStore.searchBasic(word.value);
router.push('/vistaDocs');
}


</script>
