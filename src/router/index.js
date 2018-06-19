import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Order from '@/components/Order'
import Products from '@/components/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Order',
      component: Order
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
