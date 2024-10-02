<template>
    <header class="header">
      <div class="header-pagina">
        <div class="logo-pagina">
          <img src="../assets/Logo_InvenTeam+.png" alt="Logo" class="logo" />
        </div>
        <nav class="navegacion">
          <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/tiendas">Tiendas</router-link></li>
            <li><router-link to="/registrarClientes">Registrar Clientes</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
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
  }
  
  .navegacion a:hover {
    color: #218838;
  }
  </style>