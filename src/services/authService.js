// src/services/authService.js
import axios from 'axios';

export const iniciarSesion = async (usuario, contraseña) => {
    const res = await axios.post('http://localhost:8000/login', {
      usuario,
      contraseña,
    });
  
    // ✅ Verifica que la respuesta contenga 'documento'
    if (res.data.documento) {
      localStorage.setItem('clienteDocumento', res.data.documento);
    }
  
    return res.data;
  };