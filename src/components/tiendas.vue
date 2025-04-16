<template>
  <div class="productos">
    <h1>Lista de Productos</h1>

    <!-- Buscador -->
    <div class="search-container">
      <input v-model="filtro" type="text" placeholder="Buscar producto por nombre o categoría" />
    </div>

    <div class="product-list" v-if="productosFiltrados.length > 0">
      <div class="card" v-for="producto in productosFiltrados" :key="producto.codigo">
        <div class="card-img">
          <!-- Mostrar la imagen del producto -->
          <img 
            :src="producto.imagenUrl || 'https://via.placeholder.com/150'" 
            alt="Imagen del producto" 
            class="img"
          />
        </div>
        <div class="card-title">{{ producto.nombre }}</div>
        <div class="card-subtitle">{{ producto.descripcion }}</div>
        <hr class="card-divider" />
        <div class="card-footer">
          <div class="card-price"><span>$</span> {{ producto.precio }}</div>
          <button class="card-btn" @click="agregarAlCarrito(producto)">
            <!-- Ícono del carrito -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M397.78 316H192.65a15 15 0 01-14.65-11.67l-34.54-150.48a15 15 0 0114.62-18.36h274.27a15 15 0 0114.65 18.36l-34.6 150.48A15 15 0 01397.78 316zM204.59 286h181.25l27.67-120.48H177.91z" />
              <path d="M222 450a57.48 57.48 0 1157.48-57.48A57.54 57.54 0 01222 450zm0-84.95a27.48 27.48 0 1027.48 27.47 27.5 27.5 0 00-27.48-27.47z" />
              <path d="M368.42 450a57.48 57.48 0 1157.48-57.48 57.54 57.54 0 01-57.48 57.48zm0-84.95a27.48 27.48 0 1027.48 27.47 27.5 27.5 0 00-27.48-27.47z" />
              <path d="M158.08 165.49a15 15 0 01-14.23-10.26L118.14 78h-47.44a15 15 0 110-30h58.3a15 15 0 0114.23 10.26l29.13 87.49a15 15 0 01-14.23 19.74z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <p v-else>No hay productos registrados.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useCart } from '@/composables/useCart';

const productos = ref([]);
const filtro = ref('');
const { agregarAlCarrito } = useCart();

const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get('http://127.0.0.1:8000/consultaproductos');
    productos.value = respuesta.data.map((producto) => ({
      ...producto,
      imagenUrl: producto.imagenUrl || 'https://via.placeholder.com/150',
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

const productosFiltrados = computed(() => {
  const filtroLower = filtro.value.toLowerCase();
  return productos.value.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(filtroLower) ||
      (producto.categoria && producto.categoria.toLowerCase().includes(filtroLower))
  );
});

onMounted(() => {
  obtenerProductos();
});
</script>

<style scoped>
.img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.productos {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #28a745;
  margin-bottom: 20px;
  text-align: center;
}

.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-container input {
  width: 300px;
  padding: 10px;
  border: 1px solid #28a745;
  border-radius: 5px;
}

.product-list {
  display: grid;
  height: auto;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Tamaño de las columnas */
  grid-gap: 10px; /* Espacio entre las cards (aumentado) */
}

.card {
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  --main-focus: #2d8cf0;
  width: 150px; /* Tamaño de las cards */
  height: 240px; /* Tamaño de las cards */
  background: var(--bg-color);
  border: 1px solid var(--main-color); /* Borde más fino */
  box-shadow: 2px 2px var(--main-color); /* Sombra reducida */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px; /* Padding interno */
  gap: 8px; /* Espacio interno reducido */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-bottom: 20px;
}

.card-img {
  transition: all 0.5s;
  display: flex;
  justify-content: center;
}

.card-img .img {
  width: 80px; /* Tamaño de la imagen */
  height: 80px;
  background-color: #228b22;
  border-radius: 50%;
}

.card-title {
  font-size: 16px; /* Tamaño de la fuente */
  font-weight: 500;
  text-align: center;
  color: var(--font-color);
}

.card-subtitle {
  font-size: 12px; /* Tamaño de la fuente */
  font-weight: 400;
  color: var(--font-color-sub);
  text-align: center;
}

.card-divider {
  width: 100%;
  border: 1px solid var(--main-color);
  border-radius: 50px;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-price {
  font-size: 16px; /* Tamaño del precio */
  font-weight: 500;
  color: var(--font-color);
}

.card-price span {
  font-size: 16px; /* Tamaño del precio */
  font-weight: 500;
  color: var(--font-color-sub);
}

.card-btn {
  height: 30px; /* Tamaño del botón */
  background: var(--bg-color);
  border: 1px solid var(--main-color); /* Borde más fino */
  border-radius: 5px;
  padding: 0 10px; /* Padding del botón */
  transition: all 0.3s;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: -20px;
}

.card-btn svg {
  width: 100%;
  height: 100%;
  fill: var(--main-color);
  transition: all 0.3s;
}

.card-btn:hover svg {
  fill: var(--main-focus);
}
</style>
