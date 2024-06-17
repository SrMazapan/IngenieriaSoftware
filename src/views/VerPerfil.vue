<template>
    <div class="d-flex justify-content-center">
      <div class="card m-3" style="width: 50rem;">
        <div class="card-body">
          <div class="d-flex justify-content-center" style="left: 500px; top: 50%;">
            <label for="profilePicInput" class="btn btn-outline-secondary rounded-circle btn-custom">
              <i class="bi bi-person-up icon-custom"></i>
            </label>
          </div>
          <h1 class="card-title" style="text-align: center;">Perfil de usuario</h1>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre (s)</label>
            <p>{{ nombre }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label" for="apPat">Apellido Paterno</label>
            <p>{{ appa }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label" for="apMat">Apellido Materno</label>
            <p>{{ apma }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label" for="bornYear">Fecha de nacimiento</label>
            <p>{{ fechanac }}</p>
          </div>
          <div class="mb-3">
            <label class="form-label">Rol</label>
            <p>{{ rol }}</p>
          </div>
          <router-link class="btn btn-primary" to="/editarPerfil">Editar Perfil</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../stores/user';
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../firebaseConfig";
  
  const userStore = useUserStore()
  
  const nombre = ref('')
  const appa = ref('')
  const apma = ref('')
  const fechanac = ref('')
  const rol = ref('')
  
  const fetchUserProfile = async () => {
    try {
      const user = userStore.userData;
      if (user && user.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          nombre.value = data.nombre || '';
          appa.value = data.appa || '';
          apma.value = data.apma || '';
          fechanac.value = data.fechanac || '';
          rol.value = data.rol || '';
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  
  onMounted(() => {
    fetchUserProfile();
  });
  </script>
  
  <style>
  .btn-custom {
    width: 100px; /* Ancho del botón */
    height: 100px; /* Altura del botón */
    padding: 20px; /* Relleno interno del botón */
  }
  
  /* Estilos personalizados para el icono */
  .icon-custom {
    font-size: 2.5rem; /* Tamaño del icono */
  }
  </style>
  