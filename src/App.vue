<template>
  <div id="app">
    <headerPagina />
    <router-view></router-view>
  </div>
</template>

<script setup>
import ConsultaProductos from './components/consultaProductos.vue';
import headerPagina from './components/headerPagina.vue';
import reegistrarClientes from './components/reegistrarClientes.vue';
import registrarProducto from './components/registrarProducto.vue';
</script>