<script setup>
import { ref } from "vue"
import { useUserStore } from "../stores/user"

const userStore = useUserStore()

const email = ref("")
const password = ref("")
const errorMessage = ref("")
const showAlert = ref(false)

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    errorMessage.value = "Todos los campos son obligatorios."
    setTimeout(() => {errorMessage.value = ''}, 2000)
    return
  }
  
  const error = await userStore.loginUser(email.value, password.value)
  if (error === 'auth/invalid-login-credentials') {
    errorMessage.value = 'Correo o contraseña incorrectos.';
    setTimeout(() => {errorMessage.value = ''}, 2000)
  }
}
</script>

<template>

  <div class="d-flex justify-content-center">
        <div class="card mt-5" style="width: 33.5rem;">
            <div class="card-body">
                <h1 class="card-title" style="text-align: center;">Inicio de Sesión</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Correo</label>
                        <input type="email" class="form-control input-reducido" id="loginEmail" placeholder="Ingresar correo" v-model.trim="email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Contraseña</label>
                        <input type="password" class="form-control input-reducido" placeholder="Ingrese contraseña" v-model.trim="password">
                    </div>
                    <div class="nav justify-content-left mb-2">
                      <div class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/restorePassword">¿Olvidaste tu contraseña?</router-link>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">Acceso</button>
                </form>
            </div>
        </div>
        <div v-if="errorMessage" class="custom-error-message">
          {{ errorMessage }}
        </div>
    </div>
</template>

<style scoped>



</style>
