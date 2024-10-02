<template>
  <div class="registrarProducto">
    <h1>Registrar Producto</h1>
    <form @submit.prevent="insertarProducto">
      <div class="form-group">
        <label for="codigo">Código:</label>
        <input id="codigo" v-model="producto.codigo" type="number" placeholder="Código" />
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input id="nombre" v-model="producto.nombre" type="text" placeholder="Nombre" />
      </div>
      <div class="form-group">
        <label for="precio">Precio:</label>
        <input id="precio" v-model="producto.precio" type="number" placeholder="Precio" />
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input id="cantidad" v-model="producto.cantidad" type="number" placeholder="Cantidad" />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="producto.descripcion" type="text" placeholder="Descripción" />
      </div>
      <button type="submit">Registrar Producto</button>
    </form>
    
    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const producto = ref({
  codigo: 0,
  nombre: "",
  precio: 0,
  cantidad: 0,
  descripcion: ""
});

const message = ref('');
const messageType = ref('');

const insertarProducto = async () => {
  try {
    const respuesta = await axios.post('http://127.0.0.1:8000/insertar', producto.value);
    message.value = 'Producto agregado correctamente';
    messageType.value = 'success';
  } catch (error) {
    console.error("Error al ingresar producto", error);
    message.value = "Error al ingresar producto";
    messageType.value = 'error';
  }
};
</script>

<style scoped>
.registrarProducto {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #28a745;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #212529;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #28a745;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}

.message {
  margin-top: 20px;
  font-size: 1.1em;
}

.message.success {
  color: #28a745; /* Verde para el éxito */
}

.message.error {
  color: #d9534f; /* Rojo para el error */
}
</style>
