<template>
  <div class="shared-container">
    <div class="header-container">
      <h1>Pedidos do Rack {{ rackId }}</h1>
      <router-link to="/" class="voltar-btn">Voltar</router-link>
    </div>
    <ul>
      <li v-for="pedido in pedidos" :key="pedido.pedido_id" @click="handlePedidoClick(pedido)">
        <div class="container-item">
          <div class="container-id">{{ pedido.pedido_id }}</div>
          <div class="container-details">
            <div>Peças: {{ pedido.pecas_produzida }}</div>
            <div>Saldo a Embalar: {{ pedido.saldo_a_embalar }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast }
  },
  props: ['rackId'],
  data() {
    return {
      pedidos: [],
    };
  },
  mounted() {
    this.fetchPedidos();
  },
  methods: {
    async fetchPedidos() {
      try {
        const response = await axios.get(`http://localhost:3001/pedidos/${this.rackId}`);
        this.pedidos = response.data;
      } catch (error) {
        console.error('Erro ao buscar pedidos da API:', error);
      }
    },
    handlePedidoClick(pedido) {
      if (pedido.saldo_a_embalar > 0) {
        this.$router.push({ name: 'volumes', params: { pedidoId: pedido.pedido_id } });
      } else {
        this.toast.warning('Este pedido não pode ser selecionado, saldo a embalar é zero.');
      }
    },
  },
};
</script>

<style scoped>
@import '../assets/main.css';

.voltar-btn {
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.voltar-btn:hover {
  background-color: #0056b3;
}
</style>
