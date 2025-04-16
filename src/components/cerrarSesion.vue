<template>
    <button @click="cerrarSesion" class="btn-cerrar-sesion">
      Cerrar sesión
    </button>
  </template>
  
  <script>
  export default {
    name: 'CerrarSesion',
    methods: {
      cerrarSesion() {
        localStorage.removeItem('access_token'); // Borra el token
        this.$router.push('/login'); // Redirige al login
      }
    }
  }
  </script>
  
  <style scoped>
  .btn-cerrar-sesion {
    padding: 10px 15px;
    background-color: #e63946;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-cerrar-sesion:hover {
    background-color: #d62828;
  }
  </style>
  