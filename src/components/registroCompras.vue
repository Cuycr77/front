<template>
    <div class="tabla-container">
      <h2>Listado de Compras</h2>
      <table v-if="compras.length" class="tabla">
        <thead>
          <tr>
            <th>Documento Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="compra in compras" :key="compra.id">
            <td>{{ compra.cliente_documento }}</td>
            <td>{{ formatearFecha(compra.fecha_compra) }}</td>
            <td>{{ compra.total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay compras registradas.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        compras: [],
      };
    },
    methods: {
      formatearFecha(fecha) {
        if (!fecha) return 'Fecha no disponible';
        const d = new Date(fecha);
        return isNaN(d.getTime()) ? 'Fecha inválida' : d.toLocaleString();
      },
    },
    mounted() {
      fetch("http://localhost:8000/compras")
        .then(res => res.json())
        .then(data => {
          this.compras = data;
        })
        .catch(err => {
          console.error("Error al obtener compras:", err);
        });
    },
  };
  </script>
  
  <style scoped>
  .tabla-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0fff4;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #2e7d32;
    margin-bottom: 20px;
  }
  
  .tabla {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }
  
  th {
    background-color: #a5d6a7;
    color: #1b5e20;
    padding: 10px;
    font-weight: bold;
  }
  
  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #c8e6c9;
  }
  
  tr:hover {
    background-color: #e8f5e9;
  }
  
  p {
    text-align: center;
    margin-top: 20px;
    color: #555;
  }
  </style>
  