import axios from 'axios';

export const enviarCompra = async (clienteDocumento, carrito, total) => {
  const detalles = carrito.map(producto => ({
    producto_codigo: producto.codigo,
    cantidad: producto.cantidad,
    precio_unitario: producto.precio,
    subtotal: producto.cantidad * producto.precio
  }));

  const payload = {
    cliente_documento: parseInt(clienteDocumento), // ✅ Aseguramos que sea número
    total: total,
    detalles: detalles
  };

  console.log("📦 Payload a enviar:", payload);

  try {
    const response = await axios.post(
      'http://localhost:8000/finalizarCompras',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('🔴 Error del servidor:', error.response.data);
    } else {
      console.error('🔴 Error de red o configuración:', error.message);
    }
    throw error;
  }
};
