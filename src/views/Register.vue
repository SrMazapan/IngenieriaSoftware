<template>
    <div class="d-flex justify-content-center">
        <div class="card mt-5" style="width: 33.5rem;">
            <div class="card-body">
                <h1 class="card-title" style="text-align: center;">Registro</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Ingresa un Correo</label>
                        <input type="email" class="form-control input-reducido" id="inputEmail" placeholder="example@correo.com" v-model.trim="email">
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Crea una contraseña</label>
                        <input type="password" class="form-control input-reducido" id="inputPassword" v-model.trim="password">
                        <div id="emailHelp" class="form-text">Debe contener al menos 6 caracteres.</div>
                    </div>
                    <button class="btn btn-primary" type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
                </form>
            </div>
        </div>
        <div v-if="errorMessage" class="custom-error-message">
          {{ errorMessage }}
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import {useUserStore} from '../stores/user'

    const userStore = useUserStore()

    const email = ref('')
    const password = ref('')
    const errorMessage = ref("")
    const showAlert = ref(false)

    const handleSubmit = async() => {
        if(!email.value){
            errorMessage.value = 'Todos los campos son obligatorios.'
            setTimeout(() => {errorMessage.value = ''}, 2000)
            return
        }else if( password.value.length < 6){
            errorMessage.value = 'La contraseña debe tener mínimo 6 caracteres.'
            setTimeout(() => {errorMessage.value = ''}, 2000)
            return
        }
        const error = await userStore.registerUser(email.value, password.value)
        if (error === 'auth/email-already-in-use') {
        errorMessage.value = 'El correo ya está asociado a una cuenta.';
        setTimeout(() => {errorMessage.value = ''}, 2000)
  }
    }

</script>