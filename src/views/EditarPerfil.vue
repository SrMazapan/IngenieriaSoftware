<template>
    <div class="d-flex justify-content-center">
        <div class="card m-3" style="width: 50rem;">
            <div class="card-body">
                <div class="d-flex justify-content-center" style="left: 500px; top: 50%;" >
                    <label for="profilePicInput" class="btn btn-outline-secondary rounded-circle btn-custom">
                        <i class="bi bi-person-up icon-custom"></i>
                    </label>
                    <!--<input id="profilePicInput" type="file" style="display: none;" @change="handleProfilePicChange">-->
                </div>
                <h1 class="card-title" style="text-align: center;">Perfil de usuario</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre (s)</label>
                        <input type="text" class="form-control input-reducido" id="name" v-model="nombre">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="apPat">Apellido Paterno</label>
                        <input type="text" class="form-control input-reducido" id="apPat" v-model="appa">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="apMat">Apellido Materno</label>
                        <input type="text" class="form-control input-reducido" id="apMat" v-model="apma">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="bornYear">Fecha de nacimiento</label>
                        <input type="date" class="form-control input-reducido" id="bornYear" v-model="fechanac">
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
                    <button type="submit" class="btn btn-primary">Actualizar perfil</button>
                </form>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

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

const handleSubmit = async () => {
    // Aquí podrías añadir la lógica para actualizar el perfil del usuario en Firestore
    try {
        const user = userStore.userData;
        if (user && user.uid) {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                nombre: nombre.value,
                appa: appa.value,
                apma: apma.value,
                fechanac: fechanac.value,
                rol: rol.value,
            });
            console.log("Perfil actualizado correctamente");
            // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
            router.push("/verPerfil");
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
};
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

<!--
Falta colocar validaciones en editar perfil, que no sean campos vacios y que sean campos correctos
Que despues de apretar el boton de actualizar perfil, envie a una nueva pantalla para decir que ya fueron modificados
Hacer que el usuario pueda cargar una imagen de perfil
Subir archivo y guardarlo en alguna parte
-->