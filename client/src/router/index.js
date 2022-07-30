import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import ProdCreate from '../views/ProdCreate.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import AppointCreate from '../views/AppointCreate.vue'
import AppointShowAll from '../views/AppointShowAll.vue'
import AppointShowMy from '../views/AppointShowMy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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
