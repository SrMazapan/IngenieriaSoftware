<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="!userStore.loadingSession">
        <div class="container-fluid">
            <a class="navbar-brand">AENETA</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarScroll">
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
                        <button @click="userStore.logoutUser" class="nav-link active btn btn-danger m-2" style="width: auto;">Logout</button>
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
  /* .btn-custom{
    background-color: #E3E3E3;
  }
  .bg-custom {
    background-color: #E7E7E7;
  } */
  
</style>