<template>
  <ButtonSearch/>
  <div class="d-flex justify-content-center">
  <div class="card m-3" style="width: 100%; max-width: 600px;">
      <div class="card-body">
          <form @submit.prevent="handleSubmit">
              <fieldset>
                  <legend class="card-title" style="text-align: center;">Busqueda Avanzada</legend>
                  <div class="mb-3">
                    <label for="TextTitle" class="form-label" >Título exacto</label>
                    <input type="text" id="TextTitle" class="form-control" placeholder="Título o tema" v-model="title">
                  </div>
                  <div class="mb-3">
                    <label for="TextAutor" class="form-label" >Autor</label>
                    <input type="text" id="TextAutor" class="form-control" placeholder="Autor de la tesis" v-model="autor">
                  </div>
                  <div class="mb-3">
                    <label for="TextMateria" class="form-label" >Sinodal o tutor</label>
                    <input type="text" id="TextMateria" class="form-control" placeholder="Materia a la que pertenece" v-model="tutor">
                  </div>
                  <div class="mb-3">
                    <label for="startYear" class="form-label">Desde el año: </label>
                    <input type="number" id="startYear" class="form-control" placeholder="(aaaa)" v-model="startYear">
                  </div>
                  <div class="mb-3">
                    <label for="endYear" class="form-label">Hasta el año: </label>
                    <input type="number" id="endYear" class="form-control" placeholder="(aaaa)" v-model="endYear">
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
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
  import { ref, defineEmits } from "vue"
  import ButtonSearch from "../components/ButtonSearch.vue";

const title = ref("")
const autor = ref("")
const tutor = ref("")
const startYear = ref("")
const endYear = ref("")
const errorMessage = ref("")
const emit = defineEmits(['buscar-avanzada']);

const handleSubmit = async () => {

  if (!title.value || !autor.value || !tutor.value) {
    errorMessage.value = "Todos los campos son obligatorios."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }

  if (startYear.value === "") {
    errorMessage.value = "Por favor, ingresa un año de inicio."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }

  if (endYear.value === "") {
    errorMessage.value = "Por favor, ingresa un año de fin."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }

  if (endYear.value < startYear.value) {
    errorMessage.value = "Indica un periodo de tiempo válido."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }
  const criterios = {
    title: title.value,
    autor: autor.value,
    tutor: tutor.value,
    startYear: startYear.value,
    endYear: endYear.value
  };
  emit('buscar-avanzada', criterios);
}

</script>
