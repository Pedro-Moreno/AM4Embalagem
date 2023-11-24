import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Pedidos from '../views/Pedidos.vue';
import Volumes from '../views/Volumes.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/pedidos/:rackId',  // Rota dinâmica com parâmetro rackId
      name: 'pedidos',
      component: Pedidos,
      props: true,  // Permite passar o parâmetro como propriedade para o componente Pedidos
    },
    {
      path: '/volumes/:pedidoId',  // Rota dinâmica com parâmetro rackId
      name: 'volumes',
      component: Volumes,
      props: true,  // Permite passar o parâmetro como propriedade para o componente Pedidos
    },
  ],
});

export default router;
