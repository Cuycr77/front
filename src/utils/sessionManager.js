// src/utils/sessionManager.js

let interval;

export function startSessionChecker(router) {
  const updateActivity = () => {
    localStorage.setItem('lastActivity', Date.now());
  };

  // Escuchar eventos de usuario
  window.addEventListener('mousemove', updateActivity);
  window.addEventListener('keydown', updateActivity);

  // Verificar inactividad cada 10 segundos
  interval = setInterval(() => {
    const lastActivity = parseInt(localStorage.getItem('lastActivity'), 10);
    const now = Date.now();
    const maxInactiveTime = 5 * 60 * 1000; // 5 minutos

    if (now - lastActivity > maxInactiveTime) {
      localStorage.clear(); // Limpiar toda la sesión
      clearInterval(interval);
      router.push('/login'); // Redirigir al login
    }
  }, 10000);
}

export function stopSessionChecker() {
  clearInterval(interval);
}
