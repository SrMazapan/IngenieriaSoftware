<template>
    <div class="d-flex justify-content-center">
    <div class="card m-3" style="width: 100%; max-width: 600px;">
        <div class="card-body">
            <form @submit.prevent="">
                <fieldset>
                    <legend class="card-title" style="text-align: center;">Busqueda básica</legend>
                    <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Escriba una palabra o frase</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
                    </div>
                    <div class="mb-3">
                        <label for="disabledSelect" class="form-label">Campo de búsqueda</label>
                        <select id="disabledSelect" class="form-select">
                            <option>Todos los campos</option>
                            <option>Título exacto</option>
                            <option>Título</option>
                            <option>Autor</option>
                            <option>Materia</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="startYear" class="form-label">Desde el año: </label>
                        <input type="number" id="startYear" class="form-control" placeholder="(aaaa)">
                    </div>
                    <div class="mb-3">
                        <label for="endYear" class="form-label">Hasta el año: </label>
                        <input type="number" id="endYear" class="form-control" placeholder="(aaaa)">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        </div>
    </div>
</div>
</template>

<script setup>
    import { useUserStore } from '../stores/user';
    const userStore = useUserStore();
</script>
