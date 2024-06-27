<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="!userStore.loadingSession">
    <div class="container-fluid">
      <a class="navbar-brand">AENETA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item" v-if="userStore.userData">
            <router-link class="nav-link active btn btn-success m-2" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="!userStore.userData">
            <router-link class="nav-link active btn btn-success m-2" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!userStore.userData">
            <router-link class="nav-link active btn btn-primary m-2" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-if="userStore.userData">
            <router-link class="nav-link active btn btn-success m-2" to="/addDocument">Agregar Tesis</router-link>
          </li>
          <li class="nav-item" v-if="userStore.userData">
            <router-link class="nav-link active btn btn-success m-2" to="/faq">FAQ</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown" v-if="userStore.userData">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <fieldset class="btn btn-outline-secondary rounded-circle btn-custom">
                <template v-if="profilePicUrl">
                  <img :src="profilePicUrl" alt="Foto de perfil" class="img-profile-navbar">
                </template>
                <template v-else>
                  <i id="Profile" class="bi bi-person-up icon-custom"></i>
                </template>             
              </fieldset>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/VerPerfil">Perfil</router-link></li>
              <li><router-link class="dropdown-item" to="/VerFAQ">FAQ´s</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button @click="userStore.logoutUser" class="dropdown-item">Logout</button></li>
              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div v-else>
    loading user...
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


const userStore = useUserStore();
const profilePicUrl = ref('');

const fetchUserProfile = async () => {
  try {
    const user = userStore.userData;
    if (user && user.uid) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        profilePicUrl.value = data.profilePicUrl || '';
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

onMounted(() => {
  userStore.currentUser();
  fetchUserProfile();
});

watch(
  () => userStore.userData,
  () => {
    fetchUserProfile();
  },
  { immediate: true }
);
</script>

<style>
  .navbar-nav .nav-item .btn {
    margin: 0.5rem;
  }
  
  .img-profile-navbar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  left: -13px; /* Ajusta este valor según sea necesario */
  top: -9px; /* Ajusta este valor según sea necesario */
  }
</style>
