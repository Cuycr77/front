<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup() {
        const cliente = ref({
            documento: 0,
            nombre: "",
            apellido: "",
            correo: "",
            celular: "",
            nombre_tienda: ""
        });
        const message = ref('');
        const messageType = ref('');

        const insertarCliente = async () => {
            try {
                const respuesta = await axios.post('http://127.0.0.1:8000/registrarCliente', cliente.value);
                message.value = 'Cliente agregado correctamente';
                messageType.value = 'success';
            } catch (error) {
                console.error("Error al registrar datos", error);
                message.value = "Error al registrar datos";
                messageType.value = 'error';
            }
        };

        return {
            cliente,
            insertarCliente,
            message,
            messageType
        };
    }
};
</script>

<template>
  <div class="registrarClientes">
    <h1>Registrar Cliente</h1>
    <form @submit.prevent="insertarCliente">
      <div class="form-group">
        <label for="documento">Documento:</label>
        <input id="documento" v-model="cliente.documento" type="text" placeholder="Documento" required />
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input id="nombre" v-model="cliente.nombre" type="text" placeholder="Nombre" />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input id="apellido" v-model="cliente.apellido" type="text" placeholder="Apellido" />
      </div>
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input id="correo" v-model="cliente.correo" type="email" placeholder="Correo" />
      </div>
      <div class="form-group">
        <label for="celular">Celular:</label>
        <input id="celular" v-model="cliente.celular" type="text" placeholder="Celular" />
      </div>
      <div class="form-group">
        <label for="nombre_tienda">Nombre Tienda:</label>
        <input id="nombre_tienda" v-model="cliente.nombre_tienda" type="text" placeholder="Nombre Tienda" />
      </div>
      <button type="submit">Registrar Cliente</button>
    </form>
    
    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>

<style scoped>
.registrarClientes {
  max-width: 600px;
  margin: 120px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #28a745;
  margin-bottom: 20px;
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
  color: #28a745;
}

.message.error {
  color: #dc3545;
}
</style>
