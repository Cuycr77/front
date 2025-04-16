<template>
  <div class="container">
    <!-- Lado izquierdo -->
    <div class="left-panel">
      <h2>{{ frmlogin ? '¡Bienvenido!' : '¡Regístrate!' }}</h2>
      <p>
        {{ frmlogin
          ? 'Por favor, inicia sesión para continuar.'
          : 'Crea una cuenta para disfrutar de nuestros servicios.' }}
      </p>
    </div>

    <!-- Lado derecho -->
    <div class="right-panel">
      <h1 class="title">{{ frmlogin ? 'Iniciar sesión' : 'Registrarse' }}</h1>
      <form @submit.prevent="loginUsuario">
        <!-- Campo Documento (solo en registro) -->
        <div class="fminput" v-if="!frmlogin">
          <label for="documento">Documento</label>
          <select v-model="documento" id="documento" class="input" required>
            <option value="">Seleccionar documento</option>
            <option v-for="doc in documentos" :key="doc" :value="doc">
              {{ doc }}
            </option>
          </select>
        </div>

        <!-- Campo Nombre Usuario -->
        <div class="fminput">
          <label>
            <input type="text" id="nombreUsuario" v-model="nombre_usuario" class="input" required />
            <span>Nombre Usuario</span>
          </label>
        </div>

        <!-- Campo Contraseña -->
        <div class="fminput">
          <label>
            <input type="password" id="password" v-model="password" class="input" required />
            <span>Password</span>
          </label>
        </div>

        <!-- Campo Confirmar Contraseña (solo en registro) -->
        <div class="fminput" v-if="!frmlogin">
          <label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="input" required />
            <span>Confirmar Password</span>
          </label>
        </div>

        <!-- Botón de Enviar -->
        <button type="submit" class="submit">
          {{ frmlogin ? 'Iniciar sesión' : 'Registrarse' }}
        </button>

        <!-- Mensaje de Error -->
        <div v-if="menError" class="message error">{{ menError }}</div>

        <!-- Botón de Cambiar a Registro/Login -->
        <button type="button" @click="cambioForm" class="create-account">
          {{ frmlogin ? 'Crear una cuenta' : 'Iniciar sesión' }}
        </button>
      </form>
    </div>
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

const validarPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\.).{8,}$/;
  return regex.test(password);
};

const loginUsuario = async () => {
  if (frmlogin.value) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        nombre_usuario: nombre_usuario.value,
        password: password.value,
      });

      console.log('Respuesta login:', response.data);

      // Guardar datos de sesión
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('nombre_usuario', response.data.nombreUsuario);
      localStorage.setItem('clienteDocumento', response.data.clienteDocumento);
      localStorage.setItem('lastActivity', Date.now());

      router.push('/vistaLogin');

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

    if (!validarPassword(password.value)) {
      menError.value = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.';
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/registrousuario/', {
        documento: parseInt(documento.value),
        nombre_usuario: nombre_usuario.value,
        password: password.value,
        confirmar_password: confirmPassword.value
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

// Redirigir si ya hay sesión activa
onMounted(async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    router.push('/vistaLogin');
    return;
  }

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
/* Estilos globales */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5fdf6;
  /* Fondo blanco con un toque de verde */
  color: #2d3436;
  /* Gris oscuro */
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  gap: 40px;
}

/* Panel izquierdo: Mensaje de bienvenida */
.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  /* Degradado verde */
  color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.left-panel h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.left-panel p {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 400px;
}

/* Panel derecho: Formulario */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.right-panel h1 {
  font-size: 2rem;
  color: #27ae60;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

/* Campos de entrada */
.fminput {
  margin-bottom: 20px;
}

.fminput label {
  display: block;
  font-size: 1rem;
  color: #2d3436;
  margin-bottom: 5px;
}

.fminput .input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  background: #f9fff9;
  transition: all 0.3s ease;
}

.fminput .input:focus {
  border-color: #27ae60;
  box-shadow: 0 0 8px rgba(39, 174, 96, 0.3);
  outline: none;
}

/* Botón de enviar */
.submit {
  width: 100%;
  padding: 14px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit:hover {
  background: #2ecc71;
  transform: translateY(-2px);
}

.submit:active {
  transform: translateY(0);
}

/* Botón alternar formulario */
.create-account {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #27ae60;
  border: 2px solid #27ae60;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.create-account:hover {
  background: #27ae60;
  color: white;
}

/* Mensaje de error */
.message.error {
  margin-top: 15px;
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
}

/* Responsividad */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 20px;
  }

  .left-panel {
    margin-bottom: 20px;
    padding: 20px;
  }

  .right-panel {
    padding: 20px;
  }
} 
</style>
