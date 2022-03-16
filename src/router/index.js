import Vue from 'vue'
import VueRouter from 'vue-router'


import Common from '@/components/Common'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home/index'
  },
  {
    path: '/home',
    name: 'Common',
    component: Common,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'registers',
        name: 'Registers',
        component: () => import('@/views/Register.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue')
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/Product.vue')
      },
      {
        path: 'help',
        name: 'Help',
        component: () => import('@/views/Help.vue')
      },
      {
        path: 'aboutus',
        name: 'AboutUs',
        component: () => import('@/views/AboutUs.vue')
      },
      {
        path: 'listDetail',
        name: 'listDetail',
        component: () => import('@/views/listDetail.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
