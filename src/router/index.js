import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Index = () => import('@/views/index')
const Home = () => import('@/views/home')
const Detail = () => import('@/views/detail')
const Car = () => import('@/views/car')
const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/Home',
    children: [
      {
        path: 'Home',
        component: Home
      },
      {
        path: 'Detail',
        component: Detail
      },
      {
        path: 'Car',
        component: Car
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
