<template>
    <div>
      <div ref="chartContainer" style="height: 500px;"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import axios from 'axios'
  
  const chartContainer = ref(null)
  
  onMounted(async () => {
    const response = await axios.get('http://localhost:8000/productos-mas-vendidos')
    const data = response.data
  
    const chartData = data.map(item => ({
      name: item.nombre,
      value: item.total_vendido
    }))
  
    const chart = echarts.init(chartContainer.value)
  
    const options = {
      title: {
        text: 'Productos Más Vendidos',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} unidades ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Productos',
          type: 'pie',
          radius: '60%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  
    chart.setOption(options)
  })
  </script>
  
  <style scoped>
  /* Puedes agregar estilos si deseas */
  </style>
  