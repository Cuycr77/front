<template>
  <div id="app">
    <headerPagina />
    <router-view></router-view> <!-- Aquí se cargan las vistas -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import headerPagina from './components/headerPagina.vue';
import { startSessionChecker } from './utils/sessionManager';

const router = useRouter();

onMounted(() => {
  startSessionChecker(router);
});
</script>
