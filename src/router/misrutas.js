import { createRouter, createWebHistory } from 'vue-router';
import consultaProductos from '@/components/consultaProductos.vue';
import registrarProducto from '@/components/registrarProducto.vue';
import login from '@/components/login.vue';
import tiendas from '@/components/tiendas.vue';
import home from '@/components/home.vue';
import reegistrarClientes from '@/components/reegistrarClientes.vue';
import compras from '@/components/compras.vue';
import vistaLogin from '@/vistas/vistaMisProductos.vue';
import vistaTienda from '@/vistas/vistaTienda.vue';

const routes = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/tiendas',
        name: 'tiendas',
        component: tiendas
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/registrarProductos',
        name: 'registrarProductos',
        component: registrarProducto,
        meta: { requiresAuth: true }
    },
    {
        path: '/registrarClientes',
        name: 'registrarClientes',
        component: reegistrarClientes,
        meta: { requiresAuth: true }
    },
    {
        path: '/consultaProducto',
        name: 'consultaProducto',
        component: consultaProductos,
        meta: { requiresAuth: true }
    },
    {
        path: '/compras',
        name: 'compras',
        component: compras,
        meta: { requiresAuth: true }
    },
    {
        path: '/vistaLogin',
        name: 'vistaLogin',
        component: vistaLogin,
        meta: { requiresAuth: true }
    },
    {
        path: '/vistaTienda',
        name: 'vistaTienda',
        component: vistaTienda,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Middleware global para proteger rutas
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token');

    if (to.meta.requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
