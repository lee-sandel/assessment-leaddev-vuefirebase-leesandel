import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/settings/rooms',
    name: 'rooms',
    component: () => import('@/views/settings/RoomsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
