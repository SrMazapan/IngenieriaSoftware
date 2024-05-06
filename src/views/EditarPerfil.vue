<template>
    
    <div class="d-flex justify-content-center">
        <div class="card m-3" style="width: 33rem;">
            <div class="card-body">
                <h1 class="card-title" style="text-align: center;">Editar Perfil</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Nombre (s)</label>
                        <input type="text" class="form-control input-reducido" id="loginEmail" placeholder="Ingresar nombre (s)" v-model.trim="email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Paterno</label>
                        <input type="text" class="form-control input-reducido" placeholder="Ingrese apellido paterno" v-model.trim="password">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Apellido Materno</label>
                        <input type="text" class="form-control input-reducido" placeholder="Ingrese contraseña" v-model.trim="password">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control input-reducido" v-model.trim="password">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Rol</label>
                        <div>
                            <input type="radio" id="estudiante" value="Estudiante" v-model="picked" />
                            <label for="estudiante">Estudiante</label>
                        </div>
                        <div>
                            <input type="radio" id="profesional" value="Profesional" v-model="picked" />
                            <label for="profesional">Profesional</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Actualizar perfil</button>
                </form>
            </div>
        </div>
    </div>
    <div class="position-fixed" style="left: 200px; top: 50%;">
        <label for="profilePicInput" class="btn btn-outline-secondary rounded-circle btn-xxl">
            <i class="bi bi-person-up"></i>
        </label>
        <!--<input id="profilePicInput" type="file" style="display: none;" @change="handleProfilePicChange">-->
    </div>
</template>

<script setup>
    
</script>