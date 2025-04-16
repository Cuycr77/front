<template>
  <div class="aut_container">
    <h1 class="title">Registrar Cliente</h1>
    <form @submit.prevent="insertarCliente" class="form">
      <div class="form-group">
        <label for="documento">
          <input id="documento" v-model="cliente.documento" class="input" type="text" placeholder="Documento" required />
          <span>Ingrese el documento</span>
        </label>
      </div>
      <div class="form-group">
        <label for="nombre">
          <input id="nombre" v-model="cliente.nombre" class="input" type="text" placeholder="Nombre" />
          <span>Ingrese el nombre</span>
        </label>
      </div>
      <div class="form-group">
        <label for="apellido">
          <input id="apellido" v-model="cliente.apellido" class="input" type="text" placeholder="Apellido" />
          <span>Ingrese el apellido</span>
        </label>
      </div>
      <div class="form-group">
        <label for="correo">
          <input id="correo" v-model="cliente.correo" class="input" type="email" placeholder="Correo" />
          <span>Ingrese el correo electrónico</span>
        </label>
      </div>
      <div class="form-group">
        <label for="celular">
          <input id="celular" v-model="cliente.celular" class="input" type="text" placeholder="Celular" />
          <span>Ingrese el celular</span>
        </label>
      </div>
      <div class="form-group">
        <label for="nombre_tienda">
          <input id="nombre_tienda" v-model="cliente.nombre_tienda" class="input" type="text" placeholder="Nombre Tienda" />
          <span>Ingrese el nombre de la tienda</span>
        </label>
      </div>
      <div class="buttons-container">
        <button type="submit" class="submit">Registrar Cliente</button>
      </div>
    </form>
    
    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>

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

<style scoped>
.aut_container {
  max-width: 350px;
  margin: 120px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px; /* Espacio entre los campos */
}

.title {
  font-size: 28px;
  color: #28a745;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  padding-left: 30px;
  font-family: 'Arial', sans-serif;
}

.title::before,
.title::after {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #28a745;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.form label {
  position: relative;
  font-family: 'Verdana', sans-serif;
  font-size: 14px;
}

.form label .input {
  width: 100%;
  padding: 12px 10px 22px 10px;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
  outline: none;
  font-family: 'Verdana', sans-serif;
  margin-bottom: 15px; /* Aumenta el espacio entre campos */
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 0.95em;
  color: grey;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.95em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  top: 30px;
  font-size: 0.8em;
  font-weight: 600;
  color: #28a745;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: #28a745;
  padding: 12px;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  transition: 0.3s ease;
  font-family: 'Verdana', sans-serif;
}

.submit:hover {
  background-color: #136226;
}

.message.error {
  color: #dc3545;
  font-size: 14px;
  text-align: center;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
