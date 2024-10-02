<template>
    <section>
        <h1>Productos</h1>
        <ul>
            <li v-for="i in data" :key="i.codigo" class="producto-item">
                <div class="producto-info">
                    <span><strong>Código:</strong> {{ i.codigo }}</span>
                    <span><strong>Nombre:</strong> {{ i.nombre }}</span>
                    <span><strong>Precio:</strong> {{ i.precio }}</span>
                    <span><strong>Cantidad:</strong> {{ i.cantidad }}</span>
                    <span><strong>Descripción:</strong> {{ i.descripcion }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from 'axios';
import {ref, onMounted} from 'vue';
export default{
    setup(){
        const data = ref([])
        const consultaProductos = async ()=>{
            try{
                const respuesta = await axios.get('http://127.0.0.1:8000/consultaproductos');
                    data.value=respuesta.data
            }catch(error){
                console.error('Error  no se pueden cargar los datos', error);
            }
        };
        onMounted(consultaProductos);
        return{data}
    }
}
</script>
<style scoped>
.productos {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #28a745; 
    margin-bottom: 20px;
    font-size: 2em;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.producto-item {
    padding: 15px;
    border-bottom: 1px solid #e8f5e9;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.producto-item:last-child {
    border-bottom: none;
}

.producto-info {
    color: #212529;
}

.producto-info span {
    display: block;
    font-size: 1em;
}

.producto-info strong {
    color: #28a745; 
}
</style>