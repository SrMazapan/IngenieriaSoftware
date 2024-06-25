<template>
    <div class="d-flex justify-content-center">
        <div class="card mt-5" style="width: 33.5rem;">
            <div class="card-body">
                <h1 class="card-title" style="text-align: center;">Registro</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control input-reducido" id="nombre" v-model="nombre">
                    </div>
                    <div class="mb-3">
                        <label for="appa" class="form-label">Apellido Paterno</label>
                        <input type="text" class="form-control input-reducido" id="appa" v-model="appa">
                    </div>
                    <div class="mb-3">
                        <label for="apma" class="form-label">Apellido Materno</label>
                        <input type="text" class="form-control input-reducido" id="apma" v-model="apma">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="fechanac">Fecha de nacimiento</label>
                        <input type="date" class="form-control input-reducido" id="fechanac" v-model="fechanac">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rol</label>
                        <div>
                            <input type="radio" id="estudiante" value="Estudiante" v-model="rol">
                            <label for="estudiante">Estudiante</label>
                        </div>
                        <div>
                            <input type="radio" id="profesional" value="Profesional" v-model="rol">
                            <label for="profesional">Profesional</label>
                        </div>
                    </div>
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
import {useUserStore} from '../stores/user';

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const nombre = ref('')
const appa = ref('')
const apma = ref('')
const fechanac = ref('')
const rol = ref('')
const errorMessage = ref("")
const showAlert = ref(false)

const handleSubmit = async() => {
    if(!email.value||!nombre.value||!appa.value||!apma.value||!fechanac||!rol){
        errorMessage.value = 'Todos los campos son obligatorios.';
        setTimeout(() => {errorMessage.value = ''}, 2000)
        return;
    }else if( password.value.length < 6){
        errorMessage.value = 'La contraseña debe tener mínimo 6 caracteres.';
        setTimeout(() => {errorMessage.value = ''}, 2000)
        return;
    }
    
    const error = await userStore.registerUser(email.value, password.value, nombre.value, appa.value, apma.value,fechanac.value,rol.value);
    if (error === 'auth/email-already-in-use') {
    errorMessage.value = 'El correo ya está asociado a una cuenta.';
    setTimeout(() => {errorMessage.value = ''}, 2000)
    }
}

</script>