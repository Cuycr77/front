import { createRouter, createWebHistory } from 'vue-router';
import consultaProductos from '@/components/consultaProductos.vue';
import registrarProducto from '@/components/registrarProducto.vue';
import login from '@/components/login.vue';
import tiendas from '@/components/tiendas.vue';
import home from '@/components/home.vue';
import reegistrarClientes from '@/components/reegistrarClientes.vue';

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
        component: registrarProducto
    },
    {
        path: '/registrarClientes',
        name: 'registrarClientes',
        component: reegistrarClientes
    },
    {
        path: '/consultaProducto',
        name: 'consultaProducto',
        component: consultaProductos
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
