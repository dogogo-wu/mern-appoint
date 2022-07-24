import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import CreateView from '../views/CreateView.vue'
import LoginView from '../views/LoginView.vue'
import AppointView from '../views/AppointView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView
  },
  {
    path: '/appoint/:id',
    component: AppointView,
    props: true
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
