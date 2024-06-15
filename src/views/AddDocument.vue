<template>   
    <div class="d-flex justify-content-center">
      <div class="card m-3" style="width: 100%; max-width: 600px;">
        <div class="card-body">
          <div>
            <h4 style="text-align: center;">Sube tu propia tesis en este espacio.</h4>
          </div>
          <form @submit.prevent="handleSubmit"> 
            <fieldset>
              <div class="m-3">
                <label for="URLDocument" class="form-label">URL</label>
                <input type="text" id="TextUrl" class="form-control" placeholder="Ingrese URL de su documento" v-model="url">

                <!-- <label for="TextTitle" class="form-label" >Título exacto</label>
                    <input type="text" id="TextTitle" class="form-control" placeholder="Título o tema" v-model="title"> -->
              </div>
              <div class="mb-3">
                <label for="TitleDocument" class="form-label">Título exacto de su documento</label>
                <input type="text" id="TextTitle" class="form-control" placeholder="Ingrese el título exacto" v-model="title">
              </div>
              <div class="mb-3">
                <label for="AutorDocument" class="form-label">Autor(es) </label>
                <input type="text" id="TextAutor" class="form-control" placeholder="Ingrese el nombre del autor o autores" v-model="autor">
              </div>
              <div class="mb-3">
                <label for="TutorDocument" class="form-label">Tutor(es) o Sinodal(es)</label>
                <input type="text" id="TextAutor" class="form-control" placeholder="Ingrese el nombre del tutor o sinodal encargado" v-model="tutor">
              </div>
              <div class="mb-3">
                <label for="YearDocument" class="form-label">Año de realización</label>
                <input type="number" id="NumberYear" class="form-control" placeholder="Ingrese el año de realización" v-model="year">
              </div>
              <button type="submit" class="btn btn-primary">Agregar</button>
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
  import { ref } from 'vue';
  import { useDataBaseStore } from '../stores/dataBase';
  
  const dataBaseStore = useDataBaseStore();
  const url = ref('');
  const title = ref('');
  const autor = ref('');
  const tutor = ref('');
  const year = ref('');
  const errorMessage = ref('');
  const successMessage = ref('');
  
  const handleSubmit = async () => {
    if (!url.value || !title.value || !autor.value || !tutor.value || !year.value) {
      errorMessage.value = "Todos los campos son obligatorios.";
      setTimeout(() => { errorMessage.value = ''; }, 2000);
      return;
    }
  
    const documentData = {
      url: url.value,
      title: title.value,
      autor: autor.value,
      tutor: tutor.value,
      year: parseInt(year.value, 10),
    };
  
    try {
      await dataBaseStore.addUrl(documentData);
      successMessage.value = "Documento agregado exitosamente.";
      setTimeout(() => { successMessage.value = ''; }, 2000);
      // Clear the form
      url.value = '';
      title.value = '';
      autor.value = '';
      tutor.value = '';
      year.value = '';
    } catch (error) {
      errorMessage.value = "Ocurrió un error al agregar el documento.";
      setTimeout(() => { errorMessage.value = ''; }, 2000);
      console.log(error);
    }
  }
  </script>
  