<template>
  <div class="productos">
    <h1>Lista de Productos</h1>
    <div class="product-list" v-if="productos.length > 0">
      <div class="card" v-for="producto in productos" :key="producto.codigo">
        <div class="card-img">
          <!-- Aquí puedes agregar la imagen del producto si está disponible -->
          <div class="img"></div>
        </div>
        <div class="card-title">{{ producto.nombre }}</div>
        <div class="card-subtitle">{{ producto.descripcion }}</div>
        <hr class="card-divider">
        <div class="card-footer">
          <div class="card-price"><span>$</span> {{ producto.precio }}</div>
          <button class="card-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
              <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
              <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
              <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <p v-else>No hay productos registrados.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const productos = ref([]);

const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get('http://127.0.0.1:8000/consultaproductos'); 
    productos.value = respuesta.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

onMounted(() => {
  obtenerProductos();
});
</script>

<style scoped>
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

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  --main-focus: #2d8cf0;
  width: 230px;
  height: 300px;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  gap: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-bottom: 20px;
}

.card:last-child {
  justify-content: flex-end;
}

.card-img {
  transition: all 0.5s;
  display: flex;
  justify-content: center;
}

.card-img .img {
  width: 100px;
  height: 100px;
  background-color: #228b22;
  border-radius: 50%;
}

.card-title {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: var(--font-color);
}

.card-subtitle {
  font-size: 14px;
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
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color);
}

.card-price span {
  font-size: 20px;
  font-weight: 500;
  color: var(--font-color-sub);
}

.card-btn {
  height: 35px;
  background: var(--bg-color);
  border: 2px solid var(--main-color);
  border-radius: 5px;
  padding: 0 15px;
  transition: all 0.3s;
}

.card-btn svg {
  width: 100%;
  height: 100%;
  fill: var(--main-color);
  transition: all 0.3s;
}

.card-img:hover {
  transform: translateY(-3px);
}

.card-btn:hover {
  border: 2px solid var(--main-focus);
}

.card-btn:hover svg {
  fill: var(--main-focus);
}

.card-btn:active {
  transform: translateY(3px);
}
</style>
