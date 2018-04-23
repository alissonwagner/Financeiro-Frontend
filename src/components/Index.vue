<template>
  <div class="hello">
    <table class="table is-fullwidth">
      <thead>
      <th>Nome</th>
      <th>Rendimento mensal</th>
      <th></th>
      <th></th>
      </thead>
      <tbody>
      <tr v-for="(cliente, index) in clientes">
        <td>{{cliente.nome}}</td>
        <td>{{cliente.rendimentoMensal}}</td>
        <td>
          <router-link class="button" :to="{name: 'Cliente', params: {id: cliente.id}}" tag="button">Editar
          </router-link>
        </td>
        <td><a class="delete" v-on:click="removeCliente(index, cliente.id)">Excluir</a></td>
      </tr>
      </tbody>
    </table>
    <router-link class="button is-link is-large" :to="{name: 'ClienteNovo'}" tag="button">Incluir Cliente</router-link>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Index',
    data() {
      return {
        clientes: []
      }
    },
    created() {
      axios.get('http://localhost:8081/cliente/list')
        .then(response => {
          // JSON responses are automatically parsed.
          this.clientes = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      removeCliente: function (index, id) {
        var confirmacao = confirm("Deseja realmente excluir o registro?");
        if (confirmacao) {
          axios.delete('http://localhost:8081/cliente/' + id)
            .then(response => {
              this.clientes.splice(index, 1);
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
