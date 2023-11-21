<template>
  <div>
    <h1>Lista de Racks</h1>
    <ul>
      <li v-for="rack in racks" :key="rack.rack_id">{{ rack.rack_id }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      racks: []
    }
  },
  mounted() {
    this.fetchRacks()
  },
  methods: {
    async fetchRacks() {
      try {
        const response = await axios.get('http://localhost:3001/racks/')

        this.racks = response.data
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
      }
    }
  }
}
</script>
