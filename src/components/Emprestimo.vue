<template>
  <div class="cliente">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Valor do empréstimo</label>
          <div class="control">
            <input v-model="emprestimoRequest.valor" class="input" type="text" placeholder="Valor do empréstimo">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Prestações</label>
          <div class="control">
            <input v-model="emprestimoRequest.prestacoes" class="input" type="text" placeholder="Prestações">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="simularEmprestimo" class="button is-link">Simular empréstimo</button>
      </div>
    </div>

    <div v-if="emprestimoResponse != null">
      <h2>Resultado da simulação</h2>
      <table class="table is-fullwidth">
        <thead>
        <th>Parcelas</th>
        <th>Valor parcela</th>
        <th>Total</th>
        <th>Taxa de juros</th>
        <th>Valor sacado</th>
        </thead>
        <tbody>
        <tr>
          <td>{{emprestimoResponse.parcelas}}</td>
          <td>{{emprestimoResponse.valorParcela}}</td>
          <td>{{emprestimoResponse.valorTotal}}</td>
          <td>{{emprestimoResponse.taxaDeJuros}}</td>
          <td>{{emprestimoResponse.valorOriginal}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Emprestimo',
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        emprestimoRequest: {
          cliente: this.id,
          valor: null,
          prestacoes: null
        },
        emprestimoResponse: null
      }
    },
    methods: {
      simularEmprestimo: function (event) {
        axios({
          method: 'post',
          url: 'http://localhost:8081/emprestimo/simulacao',
          data: this.emprestimoRequest
        }).then(response => {
          console.log(response.data);
          this.emprestimoResponse = response.data;
        }).catch(e => {
          console.log(e);
        });
      }
    }
  }
</script>
