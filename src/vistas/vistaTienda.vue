<template>
    <div>
        <tiendas />
        <compras />
    </div>
</template>

<script>
import tiendas from '@/components/tiendas.vue';
import compras from '@/components/compras.vue';

export default {
    components: {
        tiendas,
        compras
    }
}
</script>

<style scoped>
/* Agrega estilos aquí si es necesario */
</style>
