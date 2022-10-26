import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dash from '../views/Dash.vue'
import Editar from '../views/Editar.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dash',
    name: 'Dash',
    component: Dash
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
