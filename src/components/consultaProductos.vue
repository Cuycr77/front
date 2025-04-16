<template>
  <section class="productos">
    <h1>Productos</h1>
    <ul class="productos-lista">
      <li v-for="i in data" :key="i.codigo" class="producto-item">
        <div class="producto-info">
          <span><strong>Código:</strong> {{ i.codigo }}</span>
          <span><strong>Nombre:</strong> {{ i.nombre }}</span>
          <span><strong>Precio:</strong> ${{ i.precio.toFixed(2) }}</span>
          <span><strong>Cantidad:</strong> {{ i.cantidad }}</span>
          <span><strong>Descripción:</strong> {{ i.descripcion }}</span>
        </div>
        <div class="producto-actions">
          <button @click="mostrarFormularioEditar(i)" class="edit-btn">Editar</button>
          <button @click="confirmarEliminar(i.codigo)" class="delete-btn">Eliminar</button>
        </div>
      </li>
    </ul>

    <p v-if="loading">Cargando productos...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Modal para el formulario de edición -->
    <div v-if="formularioEditar" class="modal">
      <div class="modal-content">
        <h2 class="title">Editar Producto</h2>
        <form @submit.prevent="editarProducto">
          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="productoSeleccionado.nombre" type="text" required class="input" />
          </div>

          <div class="form-group">
            <label>Precio:</label>
            <input v-model="productoSeleccionado.precio" type="number" required class="input" />
          </div>

          <div class="form-group">
            <label>Cantidad:</label>
            <input v-model="productoSeleccionado.cantidad" type="number" required class="input" />
          </div>

          <div class="form-group">
            <label>Descripción:</label>
            <input v-model="productoSeleccionado.descripcion" type="text" required class="input" />
          </div>

          <div class="buttons-container">
            <button type="submit" class="submit">Guardar Cambios</button>
            <button @click="cancelarEdicion" class="delete-btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para confirmación de eliminación -->
    <div v-if="formularioEliminar" class="modal">
      <div class="modal-content">
        <h2>¿Estás seguro de que quieres eliminar este producto?</h2>
        <p><strong>Código:</strong> {{ productoSeleccionado.codigo }}</p>
        <p><strong>Nombre:</strong> {{ productoSeleccionado.nombre }}</p>
        <button @click="eliminarProductoConfirmado" class="delete-btn">Sí, eliminar</button>
        <button @click="cancelarEliminar" class="edit-btn">Cancelar</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const data = ref([]);
    const loading = ref(false);
    const errorMessage = ref('');
    const productoSeleccionado = ref(null);
    const formularioEditar = ref(false);
    const formularioEliminar = ref(false);

    const consultaProductos = async () => {
      loading.value = true;
      try {
        const respuesta = await axios.get('http://127.0.0.1:8000/consultaproductos');
        data.value = respuesta.data;
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        errorMessage.value = 'No se pudieron cargar los productos.';
      } finally {
        loading.value = false;
      }
    };

    // Mostrar el formulario de edición
    const mostrarFormularioEditar = (producto) => {
      productoSeleccionado.value = { ...producto };
      formularioEditar.value = true;
      formularioEliminar.value = false;
    };

    // Editar el producto seleccionado
    const editarProducto = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/actualizarProducto/${productoSeleccionado.value.codigo}`, productoSeleccionado.value);
        console.log("Producto actualizado", response.data);
        formularioEditar.value = false;
        productoSeleccionado.value = null;
        consultaProductos(); // Refrescar la lista de productos
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
        errorMessage.value = 'No se pudo actualizar el producto.';
      }
    };

    // Cancelar la edición
    const cancelarEdicion = () => {
      formularioEditar.value = false;
      productoSeleccionado.value = null;
    };

    // Confirmar la eliminación del producto
    const confirmarEliminar = (codigo) => {
      productoSeleccionado.value = data.value.find(p => p.codigo === codigo);
      formularioEliminar.value = true;
      formularioEditar.value = false;
    };

    // Eliminar el producto
    const eliminarProductoConfirmado = async () => {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/eliminarProducto/${productoSeleccionado.value.codigo}`);
        console.log("Producto eliminado", response.data);
        formularioEliminar.value = false;
        productoSeleccionado.value = null;
        consultaProductos(); // Refrescar la lista de productos
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        errorMessage.value = 'No se pudo eliminar el producto.';
      }
    };

    // Cancelar la eliminación
    const cancelarEliminar = () => {
      formularioEliminar.value = false;
      productoSeleccionado.value = null;
    };

    onMounted(consultaProductos);

    return {
      data,
      loading,
      errorMessage,
      productoSeleccionado,
      formularioEditar,
      formularioEliminar,
      mostrarFormularioEditar,
      editarProducto,
      cancelarEdicion,
      confirmarEliminar,
      eliminarProductoConfirmado,
      cancelarEliminar
    };
  }
}
</script>

<style scoped>
  .modal {
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    z-index: 1000; 
  }

  .modal-content {
    background-color: #fff; 
    padding: 20px; 
    border-radius: 10px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
    max-width: 400px; 
    width: 90%; 
  }

  .productos {
    max-width: 900px; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 20px auto; 
    padding: 20px; 
    background-color: #ffffff; 
    border-radius: 12px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  }

  h1 {
    color: #28a745; 
    margin-bottom: 20px; 
    font-size: 2.2em; 
    text-align: center; 
    font-family: 'Arial', sans-serif; 
  }

  .productos-lista {
    list-style: none; 
    margin: 0; 
    padding: 0; 
  }

  .producto-item {
    padding: 20px; 
    border: 1px solid #e0e0e0; 
    border-radius: 8px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 15px; 
    transition: background 0.2s, transform 0.2s; 
  }

  .producto-item:hover {
    background-color: #f9f9f9; 
    transform: scale(1.02); 
  }

  .producto-info {
    color: #333; 
    display: flex; 
    gap: 30px; 
    flex-wrap: wrap; 
  }

  .producto-info span {
    font-size: 1em; 
    line-height: 1.5; 
  }

  .producto-info strong {
    color: #28a745; 
  }

  .producto-actions {
    display: flex; 
    gap: 10px; 
  }

  .edit-btn, .delete-btn {
    padding: 12px 16px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.3s, transform 0.3s; 
    font-weight: bold; 
  }

  .edit-btn {
    background-color: #28a745; 
    color: white; 
  }

  .edit-btn:hover {
    background-color: #28a745; 
    transform: scale(1.05); 
  }

  .delete-btn {
    background-color: #dc3545; 
    color: white; 
  }

  .delete-btn:hover {
    background-color: #c82333; 
    transform: scale(1.05); 
  }

  .error {
    color: #dc3545; 
    text-align: center; 
    margin-top: 20px; 
  }

  .aut_container {
    max-width: 280px; 
    margin-left: 20px; 
    padding: 10px;
    background-color: #fff;
    border-radius: 10px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-sizing: border-box; 
  }

  .input {
    width: 100%; 
    padding: 8px 8px 16px 8px;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 8px; 
    outline: none;
    font-family: 'Verdana', sans-serif;
    box-sizing: border-box; 
  }

  .submit {
    width: 100%; 
    background-color: #28a745;
    padding: 10px;
    border-radius: 8px; 
    color: white;
    font-size: 14px;
    box-sizing: border-box;
  }

  .title {
    font-size: 24px; 
    color: #28a745;
    font-weight: 600;
    letter-spacing: -1px;
  }

  /* Media Queries para hacerlo responsivo */
  @media screen and (max-width: 768px) {
    .producto-item {
      flex-direction: column;
      align-items: flex-start;
      padding: 15px;
    }

    .producto-info {
      gap: 10px;
    }

    .producto-actions {
      flex-direction: column;
      gap: 10px;
    }

    .modal-content {
      width: 90%;
      padding: 15px;
    }

    h1 {
      font-size: 1.8em;
    }
  }

  @media screen and (max-width: 480px) {
    .productos {
      padding: 15px;
    }

    .producto-item {
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
    }

    .producto-info {
      gap: 5px;
    }

    .producto-actions {
      flex-direction: column;
      gap: 8px;
    }

    h1 {
      font-size: 1.6em;
    }

    .edit-btn, .delete-btn {
      padding: 10px 14px;
    }

    .aut_container {
      max-width: 100%;
      margin-left: 0;
    }

    .input, .submit {
      padding: 8px;
    }

    .submit {
      font-size: 12px;
    }
  }
</style>

