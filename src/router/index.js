import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Order from '@/components/Order'
import Products from '@/components/Products'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Order
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/product',
      name: 'Products',
      component: Products
    }
  ]
})
