<template>
    <div class="page-container">
        <div class="volumes-container">
            <button class="back-btn" @click="goBack">Voltar</button>
            <h1>Volumes do Pedido {{ pedidoId }}</h1>
            <div class="volume-input">
                <label for="quantidade">Quantidade de Peças:</label>
                <input type="number" id="quantidade" v-model="quantidade" />
                <button @click="submitVolume">Adicionar Volume</button>
            </div>
        </div>
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
    props: ['pedidoId'],
    data() {
        return {
            quantidade: 0,
        };
    },
    methods: {
        async submitVolume() {
            try {
                const saldoDisponivel = await this.verificarSaldoDisponivel();

                if (saldoDisponivel < this.quantidade) {
                    this.toast.error('Quantidade de peças embaladas ultrapassa o saldo disponível');
                    return;
                }

                const response = await axios.post(`http://localhost:3001/volumes/`, {
                    pedido_id: this.pedidoId,
                    pecas_embaladas: this.quantidade,
                });

                console.log('Volume enviado com sucesso!');
                this.toast.success('Volume enviado com sucesso!');
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.error('Erro ao enviar volume:', error);
                this.toast.error('Erro ao enviar volume');
            }
        },
        async verificarSaldoDisponivel() {
            try {
                // Faz uma requisição para obter o saldo disponível do pedido
                const response = await axios.get(`http://localhost:3001/pedidos/pk/${this.pedidoId}`);
                const saldoDisponivel = response.data.saldo_a_embalar;

                return saldoDisponivel;
            } catch (error) {
                console.error('Erro ao verificar saldo disponível:', error);
                return 0; // Em caso de erro, retorna 0
            }
        },
        goBack() {
            this.$router.go(-1); // Voltar uma página
        },
    },
};
</script>
  
<style scoped>
.page-container {
    margin: 20px;
    margin-top: 120px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 400px;
}

.volumes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.back-btn {
    margin-bottom: 10px;
    padding: 8px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.back-btn:hover {
    background-color: #0056b3;
}

.volumes-container h1 {
    margin-bottom: 20px;
}

.volume-input {
    text-align: center;
}

label {
    display: block;
    margin-bottom: 8px;
}

input {
    padding: 8px;
    margin-bottom: 12px;
}

button {
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
  