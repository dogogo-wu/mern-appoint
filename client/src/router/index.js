import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import ProdCreate from '../views/ProdCreate.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import AppointCreate from '../views/AppointCreate.vue'
import AppointShow from '../views/AppointShow.vue'

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
    path: '/myappoint',
    component: AppointShow,
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
