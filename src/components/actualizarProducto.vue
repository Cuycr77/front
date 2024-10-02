<template>
    <div class="actualizarProducto">
      <h1>Actualizar Producto</h1>
      <form @submit.prevent="actualizarProducto">
        <div class="form-group">
          <label for="codigo">Código:</label>
          <input id="codigo" v-model="producto.codigo" type="number" placeholder="Código" disabled />
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
        <button type="submit">Actualizar Producto</button>
      </form>
  
      <p v-if="message" :class="['message', messageType]">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const producto = ref({
    codigo: 0,
    nombre: "",
    precio: 0,
    cantidad: 0,
    descripcion: ""
  });
  
  const message = ref('');
  const messageType = ref('');
  
  const obtenerProducto = async () => {
    try {
      const respuesta = await axios.get(`http://127.0.0.1:8000/producto/${route.params.codigo}`);
      producto.value = respuesta.data;
    } catch (error) {
      console.error("Error al obtener el producto", error);
      message.value = "Error al obtener producto";
      messageType.value = "error";
    }
  };
  
  const actualizarProducto = async () => {
    try {
      const respuesta = await axios.put(`http://127.0.0.1:8000/actualizar/${producto.value.codigo}`, producto.value);
      message.value = 'Producto actualizado correctamente';
      messageType.value = 'success';
    } catch (error) {
      console.error("Error al actualizar producto", error);
      message.value = "Error al actualizar producto";
      messageType.value = 'error';
    }
  };
  
  onMounted(() => {
    obtenerProducto();
  });
  </script>
  
  <style scoped>
  .actualizarProducto {
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
    color: #28a745;
  }
  
  .message.error {
    color: #d9534f;
  }
  </style>
  