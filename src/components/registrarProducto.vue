<template>
  <div class="aut_container">
    <h1 class="title">Registrar Producto</h1>
    <form @submit.prevent="insertarProducto" class="form" enctype="multipart/form-data">
      <div class="form-group">
        <label for="codigo">Código:</label>
        <input id="codigo" v-model="producto.codigo" class="input" type="number" placeholder="Código" required />
        <span>Código del producto</span>
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input id="nombre" v-model="producto.nombre" class="input" type="text" placeholder="Nombre" required />
        <span>Nombre del producto</span>
      </div>
      <div class="form-group">
        <label for="precio">Precio:</label>
        <input id="precio" v-model="producto.precio" class="input" type="number" placeholder="Precio" required />
        <span>Precio del producto</span>
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input id="cantidad" v-model="producto.cantidad" class="input" type="number" placeholder="Cantidad" required />
        <span>Cantidad disponible</span>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input id="descripcion" v-model="producto.descripcion" class="input" type="text" placeholder="Descripción" required />
        <span>Descripción del producto</span>
      </div>
      <div class="form-group">
        <label for="file">Imagen:</label>
        <input id="file" type="file" @change="handleFileUpload" class="input" />
        <span>Sube una imagen del producto</span>
      </div>
      <div class="buttons-container">
        <button type="submit" class="submit">Registrar Producto</button>
      </div>
    </form>

    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

// Producto inicializado
const producto = ref({
  codigo: 0,
  nombre: "",
  precio: 0,
  cantidad: 0,
  descripcion: "",
  imagen: null,
});

// Mensajes de estado
const message = ref('');
const messageType = ref('');

// Manejar subida de archivo
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validar el tipo de archivo
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    message.value = "Formato de archivo no soportado. Solo se permiten JPEG y PNG.";
    messageType.value = "error";
    return;
  }

  producto.value.imagen = file; // Asignamos el archivo seleccionado
  message.value = "";
};

// Registrar producto
const insertarProducto = async () => {
  // Crear el objeto FormData
  const formData = new FormData();
  formData.append("codigo", producto.value.codigo);
  formData.append("nombre", producto.value.nombre);
  formData.append("precio", producto.value.precio);
  formData.append("cantidad", producto.value.cantidad);
  formData.append("descripcion", producto.value.descripcion);

  if (producto.value.imagen) {
    formData.append("file", producto.value.imagen);
  }

  try {
    const respuesta = await axios.post('http://127.0.0.1:8000/insertar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Éxito
    message.value = 'Producto agregado correctamente';
    messageType.value = 'success';

    // Limpia el formulario
    producto.value = {
      codigo: 0,
      nombre: "",
      precio: 0,
      cantidad: 0,
      descripcion: "",
      imagen: null,
    };
    console.log('Respuesta del servidor:', respuesta.data);
  } catch (error) {
    console.error("Error al ingresar producto:", error.response?.data || error.message);
    message.value = 'Error al ingresar producto';
    messageType.value = 'error';
  }
};
</script>
<style scoped>
.aut_container {
  max-width: 280px; /* Reducir el tamaño máximo del contenedor */
  margin-left: 20px; /* Alinear a la izquierda */
  padding: 10px;
  background-color: #fff;
  border-radius: 10px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box; /* Asegurarse de que padding y borde se incluyan en el ancho */
}

.input {
  width: 100%; /* Asegurarse de que los inputs ocupen el ancho del contenedor */
  padding: 8px 8px 16px 8px;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 8px; 
  outline: none;
  font-family: 'Verdana', sans-serif;
  box-sizing: border-box; /* Para evitar que el padding desborde el input */
}

.submit {
  width: 100%; /* Asegurarse de que el botón ocupe todo el ancho disponible */
  background-color: #28a745;
  padding: 10px;
  border-radius: 8px; 
  color: white;
  font-size: 14px;
  box-sizing: border-box;
}

.title {
  font-size: 24px; /* Reducir el tamaño del título */
  color: #28a745;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  padding-left: 30px;
  font-family: 'Arial', sans-serif;
}

.title::before,
.title::after {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: #28a745;
}

.title::before {
  width: 18px;
  height: 18px;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.form-group {
  margin-bottom: 10px; /* Reducir el margen inferior */
}

label {
  font-family: 'Verdana', sans-serif;
  font-size: 13px; /* Reducir el tamaño de las etiquetas */
}

.input {
  width: 100%;
  padding: 8px 8px 16px 8px; /* Reducir el tamaño de padding */
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 8px; /* Reducir el radio del borde */
  outline: none;
  font-family: 'Verdana', sans-serif;
}

.input + span {
  font-size: 0.9em; /* Reducir el tamaño del texto de ayuda */
}

.input:focus + span,
.input:valid + span {
  font-size: 0.75em; /* Reducir tamaño al enfocar */
  color: #28a745;
}

.submit {
  background-color: #28a745;
  padding: 10px; /* Reducir el padding del botón */
  border-radius: 8px; /* Reducir el radio del borde */
  color: white;
  font-size: 14px; /* Reducir el tamaño de fuente */
}

.submit:hover {
  background-color: #136226;
}

.buttons-container {
  display: flex;
  justify-content: flex-start; /* Alinear el botón a la izquierda */
}

.message.error {
  color: #dc3545;
  font-size: 14px;
  text-align: center;
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
