<template>
    <div class="aut_container">
      <h1>{{ frmlogin ? 'Iniciar sesión' : 'Registrarse' }}</h1>
      <form @submit.prevent="loginUsuario">
        <div class="fminput" v-if="!frmlogin">
          <label for="documento">Documento:</label>
          <select v-model="documento" id="documento">
            <option value="">Seleccionar documento</option>
            <option v-for="doc in documentos" :key="doc" :value="doc">
              {{ doc }}
            </option>
          </select>
        </div>
        <div class="fminput">
          <label for="nombreUsuario">Nombre Usuario:</label>
          <input type="text" id="nombreUsuario" v-model="nombre_usuario" required />
        </div>
        <div class="fminput">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="fminput" v-if="!frmlogin">
          <label for="confirmPassword">Confirmar Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">{{ frmlogin ? 'Iniciar sesión' : 'Registrarse' }}</button>
        <div v-if="menError" class="message error">{{ menError }}</div>
        <button type="button" @click="cambioForm">
          {{ frmlogin ? 'Crear una cuenta' : 'Iniciar sesión' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const nombre_usuario = ref('');
  const password = ref('');
  const confirmPassword = ref(''); 
  const documento = ref('');
  const documentos = ref([]);
  const frmlogin = ref(true);
  const menError = ref('');
  
  const cambioForm = async () => {
    frmlogin.value = !frmlogin.value;
    if (!frmlogin.value) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clientes/documento/');
        documentos.value = response.data;
      } catch (error) {
        console.error('Error en la consulta de documentos ', error);
        menError.value = 'Error al consultar documentos';
      }
    }
  };
  
  const loginUsuario = async () => {
    if (frmlogin.value) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
          nombre_usuario: nombre_usuario.value,
          password: password.value,
        });
        router.push('/registrarProductos');
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido a tu cuenta',
        });
      } catch (error) {
        console.error('Error de inicio de sesión', error);
        menError.value = 'Error de inicio de sesión';
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'No se pudo iniciar sesión. Por favor, inténtelo de nuevo',
        });
      }
    } else {
      if (password.value !== confirmPassword.value) {
        menError.value = 'Las contraseñas no coinciden';
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/registrousuario', {
          nombre_usuario: nombre_usuario.value,
          password: password.value,
          documento: documento.value,
        });
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'Su usuario se registró de manera exitosa',
        });
      } catch (error) {
        console.error('Error al registrar usuario', error);
        menError.value = 'Error en el registro de usuario';
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'No se pudo registrar el usuario. Por favor, inténtelo de nuevo',
        });
      }
    }
  };
  
  onMounted(async () => {
    if (!frmlogin.value) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clientes/documento/');
        documentos.value = response.data;
      } catch (error) {
        console.error('Error en la consulta de documentos', error);
        menError.value = 'Error en la consulta de documentos';
      }
    }
  });
  </script>
  
  <style scoped>
  .aut_container {
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
  
  .fminput {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #212529;
    font-weight: bold;
  }
  
  input,
  select {
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
  
  .message.error {
    color: #dc3545;
  }
  </style>
  