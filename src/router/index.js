import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import WithdrawBalance from '../components/WithdrawBalance.vue'
import DepositBalance from '../components/DepositBalance.vue'
import Transactions from '../components/Transactions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    children: [
      {
        path: '/',
        name: 'Transactions',
        component: Transactions
      },
      {
        path: '/withdraw-balance',
        name: 'WithdrawBalance',
        component: WithdrawBalance
      },
      {
        path: '/deposit-balance',
        name: 'DepositBalance',
        component: DepositBalance
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
