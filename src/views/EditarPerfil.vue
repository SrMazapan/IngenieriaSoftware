<template>
    
    <div class="d-flex justify-content-center">
        <!-- <div class="card m-3" style="width: 50rem;"></div> -->
        <div class="card m-3" style="width: 50rem;">
            <div class="card-body">
                <div class="d-flex justify-content-center" style="left: 500px; top: 50%;" >
                    <label for="profilePicInput" class="btn btn-outline-secondary rounded-circle btn-custom">
                        <i class="bi bi-person-up icon-custom"></i>
                    </label>
                    <!--<input id="profilePicInput" type="file" style="display: none;" @change="handleProfilePicChange">-->
                </div>
                <h1 class="card-title" style="text-align: center;">Editar Perfil</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Nombre (s)</label>
                        <input type="text" class="form-control input-reducido" id="loginEmail" placeholder="Ingresar nombre (s)" v-model.trim="email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Paterno</label>
                        <input type="text" class="form-control input-reducido" placeholder="Ingrese apellido paterno">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Materno</label>
                        <input type="text" class="form-control input-reducido" placeholder="Ingrese contraseña">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control input-reducido">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rol</label>
                        <div>
                            <input type="radio" id="estudiante" value="Estudiante" />
                            <label for="estudiante">Estudiante</label>
                        </div>
                        <div>
                            <input type="radio" id="profesional" value="Profesional" />
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