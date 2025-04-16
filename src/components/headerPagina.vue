<template>
  <header class="header">
    <div class="header-pagina">
      <div class="logo-pagina">
        <img src="../assets/Logo_InvenTeam+.png" alt="Logo" class="logo" />
      </div>
      <nav class="navegacion">
        <ul :class="{ 'active': isMenuOpen }">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/vistaTienda">Tienda</router-link></li>
          <li><router-link to="/registrarClientes">Registrar Clientes</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
        </ul>
        <!-- Botón de hamburguesa -->
        <div class="hamburger" @click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e8f5e9;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header-pagina {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-pagina .logo {
  height: 80px;
}

.navegacion ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navegacion li {
  margin-left: 20px;
}

.navegacion a {
  text-decoration: none;
  color: #28a745;
  font-weight: bold;
  font-family: 'Verdana', sans-serif;
  font-size: 16px;
}

.navegacion a:hover {
  color: #218838;
}

/* Estilos para el botón de hamburguesa */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  cursor: pointer;
}

.bar {
  height: 4px;
  background-color: #28a745;
  border-radius: 2px;
}

/* Media Query para pantallas pequeñas */
@media (max-width: 768px) {
  .navegacion ul {
    display: none;
    flex-direction: column;
    background-color: #ffffff;
    position: absolute;
    top: 80px;
    right: 0;
    width: 200px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  }

  .navegacion ul.active {
    display: flex;
  }

  .navegacion li {
    margin-left: 0;
    margin-bottom: 10px;
  }

  .hamburger {
    display: flex;
  }
}
</style>
