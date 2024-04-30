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
                  <!-- <div class="mb-3">
                      <label for="disabledSelect" class="form-label">Campo de búsqueda</label>
                      <select id="disabledSelect" class="form-select" v-model="searchField">
                          <option>Todos los campos</option>
                          <option>Título exacto</option>
                          <option>Título</option>
                          <option>Autor</option>
                          <option>Materia</option>
                      </select>
                  </div> -->
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
import buttonSearch from "../components/buttonSearch.vue";
import ButtonSearch from "../components/buttonSearch.vue";
// import { useUserStore } from "../stores/user";
// const userStore = useUserStore();

const word = ref("")
const errorMessage = ref("")

const handleSubmit = async () => {

if (!word.value) {
  errorMessage.value = "Por favor, ingresa una palabra o frase."
  setTimeout(() => {errorMessage.value = ''}, 2000)
  return
}

}

</script>
