import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'top100',
    component: () => import('../views/Top100.vue')
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import('../views/Favourites.vue')
  },
  { path: '*', component: () => import('../views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
