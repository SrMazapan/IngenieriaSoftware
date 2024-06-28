<template>
  <div class="d-flex justify-content-center">
    <ul>
      <li v-for="tesis in tesisList" :key="tesis.id">
        <div><strong>Título:</strong> {{ tesis.title }}</div>
        <div><strong>Autor:</strong> {{ tesis.autor }}</div>
        <div><strong>Año:</strong> {{ tesis.year }}</div>
        <div><button @click="goToLink(tesis.name)" class="btn btn-primary">ver</button></div>
        <div><button @click="confirmarEliminar(tesis.id)" class="btn btn-danger">Eliminar Tesis</button></div>  
      </li>
    </ul>
    
    <!-- Modal de confirmación -->
    <div v-if="showConfirmModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro de eliminar el documento?</p>
        <div>
          <button @click="eliminarTesis(selectedTesisId)" class="btn btn-primary">Sí</button>
          <button @click="cancelarEliminar" class="btn btn-secondary">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const tesisList = ref([]);
const selectedTesisId = ref(null);
const showConfirmModal = ref(false);

const fetchTesis = async (user) => {
  try {
    const q = query(collection(db, 'urls'), where('user', '==', user.uid));
    const querySnapshot = await getDocs(q);
    tesisList.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching tesis: ", error);
  }
};

const goToLink = (url) => {
  window.open(url, '_blank');
};

const confirmarEliminar = (tesisId) => {
  selectedTesisId.value = tesisId;
  showConfirmModal.value = true;
};

const eliminarTesis = async (tesisId) => {
  try {
    await deleteDoc(doc(db, 'urls', tesisId));
    tesisList.value = tesisList.value.filter(tesis => tesis.id !== tesisId);
    console.log("Documento eliminado correctamente");
    showConfirmModal.value = false; // Cerrar modal después de eliminar
  } catch (error) {
    console.error("Error al eliminar el documento: ", error);
  }
};

const cancelarEliminar = () => {
  selectedTesisId.value = null;
  showConfirmModal.value = false;
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchTesis(user);
    } else {
      console.log("No user is currently signed in.");
    }
  });
});
</script>

<style scoped>
.d-flex {
  display: flex;
}
.justify-content-center {
  justify-content: center;
}
ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}
li {
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
}
li div {
  margin-bottom: 10px;
}
button.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
button.btn-primary:hover {
  background-color: #0056b3;
}
button.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
button.btn-danger:hover {
  background-color: #c82333;
}

/* Estilos del modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
