<!-- <template>
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"  v-if="!userStore.loadingSession">
      <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
          <a class="navbar-brand">AENETA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link type="button" class="btn btn-primary m-2" to="/" v-if="userStore.userData" >Home</router-link> 


          <router-link to="/login" v-if="!userStore.userData" type="button" class="btn btn-primary m-2 justify-content-center">Login</router-link> 
          
          
          <router-link to="/register" v-if="!userStore.userData" type="button" class="btn btn-success m-2">Register</router-link>
          
          <button @click="userStore.logoutUser" type="button" class="btn btn-danger" v-if="userStore.userData">Logout</button>
        </div>
      </div>      
    </nav>

    <div v-else>
      loading user...
    </div>
  
    <router-view></router-view>
</template> -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="!userStore.loadingSession">
      <div class="container-fluid">
          <a class="navbar-brand" href="#">AENETA</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                  <li class="nav-item" v-if="userStore.userData">
                      <router-link class="btn btn-secondary m-2" to="/">Home</router-link>
                  </li>
                  <li class="nav-item" v-if="!userStore.userData">
                      <router-link class="btn btn-success m-2" to="/login">Login</router-link>
                  </li>
                  <li class="nav-item" v-if="!userStore.userData">
                      <router-link class="btn btn-primary m-2" to="/register">Register</router-link>
                  </li>
                  <li class="nav-item" v-if="userStore.userData">
                      <button @click="userStore.logoutUser" class="btn btn-danger m-2" style="width: auto;">Logout</button>
                  </li>
              </ul>
          </div>
      </div>
  </nav>

  <div v-else>
      loading user...
  </div>
  <router-view></router-view>
</template>


<script setup>
import {useUserStore} from './stores/user'
const userStore = useUserStore()
</script>

<style>
  .btn-custom{
    background-color: #E3E3E3;
  }
  .bg-custom {
    background-color: #E7E7E7;
  }
  
</style>