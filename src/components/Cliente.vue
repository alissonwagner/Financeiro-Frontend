<template>
  <div class="cliente">
    <div class="columns">
      <div class="column is-three-fifths">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input v-model="cliente.nome" class="input" type="text" placeholder="Nome">
          </div>
        </div>
      </div>
      <div class="column">

        <div class="field">
          <label class="label">Rendimento mensal</label>
          <div class="control">
            <input v-model="cliente.rendimentoMensal" class="input" type="text" placeholder="Rendimento mensal">
          </div>
        </div>
      </div>
      <div class="column">

        <div class="field">
          <label class="label">Risco</label>
          <div class="control">
            <input v-model="cliente.risco" class="input" type="text" placeholder="Risco" disabled>
          </div>
        </div>
      </div>
    </div>

    <h2>Endereço</h2>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">CEP</label>
          <div class="control">
            <input v-model="cliente.endereco.cep" class="input" type="text" placeholder="CEP">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Cidade</label>
          <div class="control">
            <input v-model="cliente.endereco.cidade" class="input" type="text" placeholder="Cidade">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Estado</label>
          <div class="control">
            <input v-model="cliente.endereco.estado" class="input" type="text" placeholder="Estado">
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Logradouro</label>
          <div class="control">
            <input v-model="cliente.endereco.logradouro" class="input" type="text" placeholder="Logradouro">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Número</label>
          <div class="control">
            <input v-model="cliente.endereco.numero" class="input" type="text" placeholder="Número">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Complemento</label>
          <div class="control">
            <input v-model="cliente.endereco.complemento" class="input" type="text" placeholder="Complemento">
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-third">
        <div class="field">
          <label class="label">Referência</label>
          <div class="control">
            <input v-model="cliente.endereco.creferenciaep" class="input" type="text" placeholder="Referência">
          </div>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="salvarCliente" class="button is-link">Salvar</button>
      </div>
      <div v-if="id" class="control">
        <router-link class="button" :to="{name: 'Emprestimo', params: {id: cliente.id}}" tag="button">
          Simular Empréstimo
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Cliente',
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        cliente: {
          id: null,
          nome: null,
          rendimentoMensal: null,
          endereco: {
            id: null,
            logradouro: null,
            numero: null,
            cep: null,
            cidade: null,
            estado: null,
            complemento: null,
            referencia: null
          },
          risco: null
        }
      }
    },
    created() {
      if (this.id) {
        axios.get('http://localhost:8081/cliente/' + this.id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.cliente = response.data
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    methods: {
      salvarCliente: function () {
        if (this.cliente.id) {
          this.updateCliente();
        } else {
          this.salvarNovoCliente();
        }
      },
      updateCliente: function (event) {
        axios({
          method: 'put',
          url: 'http://localhost:8081/cliente/salvar',
          data: this.cliente
        }).then(response => {
          console.log(response.data);
          this.cliente = response.data;
          alert('Cliente salvo');
        }).catch(e => {
          console.log(e);
        });
      },
      salvarNovoCliente: function (event) {
        axios({
          method: 'post',
          url: 'http://localhost:8081/cliente/salvar',
          data: this.cliente
        }).then(response => {
          console.log(response.data);
          this.cliente = response.data;
          this.$router.push({ name: 'Index'})
        }).catch(e => {
          console.log(e);
        });
      }
    }
  }
</script>
