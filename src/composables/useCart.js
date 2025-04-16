import { ref } from 'vue';

const carrito = ref([]);

// Agrega un producto al carrito
const agregarAlCarrito = (producto) => {
  const productoExistente = carrito.value.find(item => item.codigo === producto.codigo);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.value.push({ ...producto, cantidad: 1 });
  }
};

// Total de la compra
const totalCompra = () => {
  return carrito.value.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
};

// Vaciar el carrito
const vaciarCarrito = () => {
  carrito.value = [];
};

export function useCart() {
  return {
    carrito,
    agregarAlCarrito,
    totalCompra,
    vaciarCarrito
  };
}
