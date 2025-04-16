<template>
  <div class="container">
    <div class="card cart">
      <label class="title">RESUMEN DE LA COMPRA</label>
      <div class="steps">
        <div class="step">
          <div>
            <span>PRODUCTOS EN EL CARRITO</span>
            <div v-if="carrito.length > 0">
              <div v-for="producto in carrito" :key="producto.codigo">
                <p>{{ producto.nombre }} - ${{ producto.precio }} x {{ producto.cantidad }} = ${{ producto.precio * producto.cantidad }}</p>
              </div>
              <p><strong>Total: ${{ totalCompra() }}</strong></p>
            </div>
            <p v-else>Tu carrito está vacío.</p>
          </div>
          <hr />
          <div class="promo">
            <span>TIENES UN CÓDIGO PROMOCIONAL?</span>
            <form class="form" @submit.prevent="applyPromo">
              <input class="input_field" placeholder="Ingresar código" type="text" v-model="promoCode" />
              <button>Aplicar</button>
            </form>
          </div>
          <hr />
          <div class="payments">
            <span>PAGO</span>
            <div class="details">
              <span>Subtotal:</span>
              <span>${{ totalCompra() }}</span>
              <span>Envío:</span>
              <span>$3000.00</span>
              <span>Impuesto:</span>
              <span>$1500.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card checkout">
      <div class="footer">
        <label class="price">${{ totalFinal }}</label>
        <button class="checkout-btn" @click="finalizarCompra">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCart } from '@/composables/useCart';
import { enviarCompra } from '@/services/compraService';

const clienteDocumento = ref(localStorage.getItem('clienteDocumento') || '');
const promoCode = ref('');
const totalFinal = ref(0);

const { carrito, totalCompra, vaciarCarrito } = useCart();

const calcularTotalFinal = () => {
  totalFinal.value = parseFloat(totalCompra()) + 3000 + 1500.00;
};

watch(carrito, calcularTotalFinal, { deep: true });

const applyPromo = () => {
  if (promoCode.value) {
    console.log(`Código promocional aplicado: ${promoCode.value}`);
    promoCode.value = '';
  }
};

const finalizarCompra = async () => {
  if (!clienteDocumento.value) {
    alert('⚠️ No se ha identificado un usuario. Por favor, inicia sesión.');
    return;
  }

  try {
    await enviarCompra(clienteDocumento.value, carrito.value, totalFinal.value);
    alert('✅ ¡Compra finalizada y registrada exitosamente!');
    vaciarCarrito();
  } catch (error) {
    console.error('Error al registrar la compra:', error);
    alert('❌ Hubo un error al finalizar la compra.');
  }
};

calcularTotalFinal();
</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: auto;
  justify-content: center; 
  align-items: center;
  gap: 0px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

hr {
  height: 1px;
  background-color: #E5C7C5;
  border: none;
}

.card {
  width: 400px;
  background: #d4edda;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid#8bba96;
  font-weight: 700;
  font-size: 11px;
  color: #000000;
}

/* Cart */
.cart {
  border-radius: 19px 19px 0px 0px;
}

.cart .steps {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.cart .steps .step {
  display: grid;
  gap: 10px;
}

.cart .steps .step span {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
  display: block;
}

.cart .steps .step p {
  font-size: 11px;
  font-weight: 600;
  color: #000000;
}

/* Promo */
.promo {
  background-color: #d4edda; /* Cambia el color de fondo a verde claro */
  padding: 10px; /* Añadir un poco de espacio interior */
  border-radius: 5px; /* Añadir bordes redondeados */
}

.promo form {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 10px;
  padding: 0px;
}

.input_field {
  width: auto;
  height: 36px;
  padding: 0 0 0 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #B2E0B2; /* Cambia el color del borde a verde */
  background-color: #f8f9fa; /* Cambia el color de fondo a un gris claro */
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #B2E0B2; /* Cambia el color del enfoque a verde */
  background-color: #f8f9fa; /* Mantiene el fondo claro */
}

.promo form button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  gap: 10px;
  width: 100%;
  height: 36px;
  background: #B2E0B2; /* Cambia el color de fondo del botón a verde */
  box-shadow: 0px 0.5px 0.5px #B2E0B2, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 5px;
  border: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #000000; /* Cambia el color del texto del botón */
}

/* Checkout */
.payments .details {
  display: grid;
  grid-template-columns: 10fr 1fr;
  padding: 0px;
  gap: 5px;
}

.payments .details span:nth-child(odd) {
  font-size: 12px;
  font-weight: 600;
  color: #000000;
  margin: auto auto auto 0;
}

.payments .details span:nth-child(even) {
  font-size: 13px;
  font-weight: 600;
  color: #000000;
  margin: auto 0 auto auto;
}

.checkout .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 20px;
  background-color: #d4edda;
}

.price {
  position: relative;
  font-size: 22px;
  color: #2B2B2F;
  font-weight: 900;
}

.checkout .checkout-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 36px;
  background: #B2E0B2;
  box-shadow: 0px 0.5px 0.5px #d4edda, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
  border-radius: 7px;
  border: 1px solid #B2E0B2;
  color: #000000;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}
</style>
