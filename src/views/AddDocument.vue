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
                <label for="file" class="form-label">Archivo PDF</label>
                <input type="file" id="file" class="form-control" @change="handleFileUpload">
              </div>
              <div class="mb-3">
                <label for="TitleDocument" class="form-label">Título exacto de su documento</label>
                <input type="text" id="TitleDocument" class="form-control" placeholder="Ingrese el título exacto" v-model="title">
              </div>
              <div class="mb-3">
                <label for="AutorDocument" class="form-label">Autor(es) </label>
                <input type="text" id="AutorDocument" class="form-control" placeholder="Ingrese el nombre del autor o autores" v-model="autor">
              </div>
              <div class="mb-3">
                <label for="TutorDocument" class="form-label">Tutor(es) o Sinodal(es)</label>
                <input type="text" id="TutorDocument" class="form-control" placeholder="Ingrese el nombre del tutor o sinodal encargado" v-model="tutor">
              </div>
              <div class="mb-3">
                <label for="YearDocument" class="form-label">Año de realización</label>
                <input type="number" id="YearDocument" class="form-control" placeholder="Ingrese el año de realización" v-model="year">
              </div>
              <div class="mb-3">
                <label for="Coment" class="form-label">Descripción breve</label>
                <textarea id="Coment" class="form-control" rows="4" v-model="coment"></textarea>
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
    <div v-if="successMessage" class="custom-success-message">
      {{ successMessage }}
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useDataBaseStore } from '../stores/dataBase';
  import { storage } from "../firebaseConfig";
  import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  const dataBaseStore = useDataBaseStore();
  const file = ref(null);
  const title = ref('');
  const autor = ref('');
  const tutor = ref('');
  const year = ref('');
  const coment = ref('');
  const errorMessage = ref('');
  const successMessage = ref('');

  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const handleSubmit = async () => {
    if (!file.value || !title.value || !autor.value || !tutor.value || !year.value || !coment.value) {
      errorMessage.value = "Todos los campos son obligatorios.";
      setTimeout(() => { errorMessage.value = ''; }, 2000);
      return;
    }
  
    try {

      //Subir archivo a firebase storage
      const fileRef = storageRef(storage, `theses/${file.value.name}`);
      await uploadBytes(fileRef, file.value);
      const fileURL = await getDownloadURL(fileRef);

      const documentData = {
      url: fileURL,
      title: title.value,
      autor: autor.value,
      tutor: tutor.value,
      year: parseInt(year.value, 10),
      coment: coment.value,
    };

    //Agregar datos del documento a firestore
      await dataBaseStore.addUrl(documentData);
      successMessage.value = "Documento agregado exitosamente.";
      setTimeout(() => { successMessage.value = ''; }, 2000);
      // Clear the form

      file.value = null;
      title.value = '';
      autor.value = '';
      tutor.value = '';
      year.value = '';
      coment.value='';
    } catch (error) {
      errorMessage.value = "Ocurrió un error al agregar el documento.";
      setTimeout(() => { errorMessage.value = ''; }, 2000);
      console.log(error);
    }
  };
  </script>
  
  <!--
  Poner un boton en name donde este mismo sea un "Ver" y al presionar se muestre el documento, este tenemos que hacer un hipervinculo.
  Al mostrar los resultados de busqueda, solo muestre el titulo de la tesis y un boton donde diga "ver".
  -->