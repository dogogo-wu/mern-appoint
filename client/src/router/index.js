import { createRouter, createWebHistory } from 'vue-router'
import ProdAll from '../views/product/ProdAll.vue'
import ProdCreate from '../views/product/ProdCreate.vue'
import LoginView from '../views/user/LoginView.vue'
import SignupView from '../views/user/SignupView.vue'
import AppointCreate from '../views/appoint/AppointCreate.vue'
import AppointShowAll from '../views/appoint/AppointShowAll.vue'
import AppointShowMy from '../views/appoint/AppointShowMy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProdAll
  },
  {
    path: '/create',
    name: 'Create',
    component: ProdCreate
  },
  {
    path: '/appoint/:id',
    component: AppointCreate,
    props: true
  },
  {
    path: '/appoint_my',
    component: AppointShowMy,
  },
  {
    path: '/appoint_all',
    component: AppointShowAll,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
