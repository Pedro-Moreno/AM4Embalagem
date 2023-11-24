<template>
  <div class="shared-container">
    <div class="header-container">
      <h1 class="centered-h1">Lista de Racks</h1>
    </div>
    <ul>
      <li v-for="rack in racks" :key="rack.rack_id" @click="navigateToPedidos(rack.rack_id)">
        <div class="container-item">
          <div class="container-id">{{ rack.rack_id }}</div>
          <div class="container-details">
            <div>Pedidos: {{ rack.quantidade_pedidos }}</div>
            <div>Peças Produzidas: {{ rack.pecas_produzida_total }}</div>
            <div>Saldo a Embalar: {{ rack.saldo_a_embalar }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      racks: [],
    };
  },
  mounted() {
    this.fetchRacks();
  },
  methods: {
    async fetchRacks() {
      try {
        const response = await axios.get('http://localhost:3001/racks/');
        this.racks = await Promise.all(response.data.map(async rack => {
          const pedidosResponse = await axios.get(`http://localhost:3001/pedidos/${rack.rack_id}`);
          rack.quantidade_pedidos = pedidosResponse.data.length;
          return rack;
        }));
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    },
    navigateToPedidos(rackId) {
      this.$router.push({ name: 'pedidos', params: { rackId } });
    },
  },
};
</script>

<style scoped>
@import '../assets/main.css';
</style>
