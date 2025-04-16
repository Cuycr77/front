<template>
  <div class="vista-login">
    <div class="header">
      <h2>Administración de Productos</h2>
      <div class="cerrar-sesion-wrapper">
        <cerrar-sesion />
      </div>
    </div>

    <!-- Fila superior: registrar + consulta productos -->
    <div class="contenedor-superior">
      <div class="formulario">
        <registrar-producto />
      </div>

      <div class="consulta">
        <consulta-productos />
      </div>
    </div>

    <!-- Fila inferior: registro compras -->
    <div class="contenedor-inferior">
      <registro-compras />
    </div>

    <div class="contenedor-inferior">
      <productos-mas-vendidos />
    </div>
  </div>
</template>

<script setup>
import registrarProducto from '@/components/registrarProducto.vue';
import consultaProductos from '@/components/consultaProductos.vue';
import registroCompras from '@/components/registroCompras.vue';
import productosMasVendidos from '@/components/productosMasVendidos.vue';
import cerrarSesion from '@/components/cerrarSesion.vue';
</script>

<style scoped>
.vista-login {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cerrar-sesion-wrapper {
  margin-top: 10px;
}

.contenedor-superior {
  display: flex;
  gap: 20px;
}

.formulario {
  flex: 1;
}

.consulta {
  flex: 0 0 1000px;
  max-width: 4000px;
}

.contenedor-inferior {
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* alinea arriba, pero ahora controlamos con margen */
  margin-bottom: 10px;
}

.cerrar-sesion-wrapper {
  margin-top: 100px; /* baja el botón */
}

</style>
