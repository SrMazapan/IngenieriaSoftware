<template>
    <ButtonSearch/>
    <div class="d-flex justify-content-center">
    <div class="card m-3" style="width: 100%; max-width: 600px;">
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <fieldset>
                    <legend class="card-title" style="text-align: center;">Busqueda Avanzada</legend>
                    <div class="mb-3">
                    <label for="TextInput" class="form-label" >Escriba una palabra o frase</label>
                    <input type="text" id="TextInput" class="form-control" placeholder="Escribe una palabra que se relacione con tu búsqueda" v-model="word">
                    </div>
                    <div class="mb-3">
                        <label for="disabledSelect" class="form-label">Campo de búsqueda</label>
                        <select id="disabledSelect" class="form-select" v-model="searchField">
                            <option>Todos los campos</option>
                            <option>Título exacto</option>
                            <option>Título</option>
                            <option>Autor</option>
                            <option>Materia</option>
                        </select>
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
    import { ref } from "vue"
    import ButtonSearch from "../components/buttonSearch.vue";

const word = ref("")
const searchField = ref("")
const startYear = ref("")
const endYear = ref("")
const errorMessage = ref("")

const handleSubmit = async () => {

  if (!word.value) {
    errorMessage.value = "Por favor, ingresa una palabra o frase."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }

  if (searchField.value === "") {
    errorMessage.value = "Por favor, selecciona un campo de búsqueda."
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
  
  // Aquí va el resto de tu código
}

</script>
