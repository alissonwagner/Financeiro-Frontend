import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cliente from '@/components/Cliente'
import Emprestimo from '@/components/Emprestimo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/cliente/:id',
      name: 'Cliente',
      component: Cliente,
      props: true
    },
    {
      path: '/cliente',
      name: 'ClienteNovo',
      component: Cliente
    },
    {
      path: '/emprestimo/:id',
      name: 'Emprestimo',
      component: Emprestimo,
      props: true
    }
  ]
})
