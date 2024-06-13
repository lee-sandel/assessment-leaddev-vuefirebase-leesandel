import Vue from 'vue'
import VueRouter from 'vue-router'
import BookingForm from '@/components/BookingForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: BookingForm
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
