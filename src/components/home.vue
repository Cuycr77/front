<template>
  <div class="home-container">
    <div class="container">
      <div class="image-container">
        <img src="../assets/concepto-collage-control-calidad-estandar.jpg" alt="Dashboard de InvenTeam+">
      </div>
      <div class="text-container">
        <h2>Controla tu Inventario y Vende en el Mismo Lugar</h2>
        <p>
          InvenTeam+ es la solución completa para gestionar tu tienda, combinando control de inventarios y ventas en una sola plataforma. 
          Administra existencias en tiempo real, visualiza productos en alto o bajo stock, y genera alertas automáticas para reordenar. Además,
          accede a informes detallados y vende directamente desde la plataforma, mejorando la eficiencia de tu negocio. Con una interfaz 
          intuitiva, InvenTeam+ te permite centrarte en hacer crecer tu tienda.
        </p>
      </div>
    </div>
    <div class="about-section">
      <h2>Quiénes Somos</h2>
      <p>
    Somos una empresa que ofrece una plataforma integral que revoluciona la gestión de inventarios y ventas para comerciantes de cualquier tamaño. 
    Nuestra solución incluye herramientas avanzadas como la facturación electrónica y la creación de catálogos digitales, permitiendo un control preciso del stock y una experiencia de compra moderna para los clientes.
    Además, nuestra plataforma optimiza las operaciones mediante la automatización de procesos clave y proporciona análisis detallados que impulsan el crecimiento comercial. 
    Con un enfoque en la usabilidad y accesibilidad, ayudamos a los comerciantes a digitalizar sus procesos y competir eficazmente en el mercado global, sin importar su tamaño o nivel de experiencia tecnológica.
  </p>
    </div>

    <div class="cards-section">
      <div class="book">
        <div class="cover">
          <h2>Misión</h2>
        </div>
        <p>Facilitar la gestión eficiente de inventarios y ventas, integrando herramientas como facturación electrónica y catálogos digitales.</p>
      </div>

      <div class="book">
        <div class="cover">
          <h2>Visión</h2>
        </div>
        <p>Convertirnos en la plataforma líder en soluciones de administración comercial, ayudando a digitalizar procesos y maximizar la eficiencia.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  margin-top: 150px; 
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #28a745; 
}


.image-container {
  flex: 1;
  padding-right: 20px;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.text-container {
  flex: 1;
  padding-left: 20px;
}

.about-section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 40px auto; 
  background-color: #e8f5e9;
  border-left: 5px solid #28a745;
  border-radius: 8px;
  text-align: center; 
}

.about-section h2 {
  color: #28a745;
  margin-bottom: 20px;
}

.about-section p {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;
}

.cards-section {
  display: flex;
  justify-content: space-around;
  padding: 40px;
}

.book {
  position: relative;
  border-radius: 10px;
  width: 300px;
  height: 400px; 
  background-color: #28a745;
  box-shadow: 1px 1px 12px #000;
  perspective: 2000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin: 0 10px; 
}

.cover {
  top: 0;
  position: absolute;
  background-color: #218838;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;
  transform-origin: 0;
  box-shadow: 1px 1px 12px #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book:hover .cover {
  transform: rotateY(-80deg);
}

.cards-section p {
  font-size: 16px; 
  font-weight: normal;
  padding: 20px;
  text-align: center;
}
</style>
