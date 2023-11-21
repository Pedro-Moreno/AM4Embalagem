import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Pedidos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
