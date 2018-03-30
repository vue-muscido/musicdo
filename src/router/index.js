import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home' // 主页组件
import Brands from 'components/brands/brands' // 品牌页组件
import Sort from 'components/sort/sort' // 分类页组件
import Cart from 'components/cart/cart' // 购物车组件
import User from 'components/user/user' // 用户中心组件

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 默认地址
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/brands',
      component: Brands
    },
    {
      path: '/sort',
      component: Sort
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User
    }
  ]
})
