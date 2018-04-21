import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home' // 主页组件
import Brands from 'components/brands/brands' // 品牌页组件
import Sort from 'components/sort/sort' // 分类页组件
import Cart from 'components/cart/cart' // 购物车组件
import User from 'components/user/user' // 用户中心组件

import UserSignIn from 'components/user-sign-in/user-sign-in' // 用户登录组件

import MainSearch from 'components/main-search/main-search' // 搜索页
import SearchList from 'components/search-list/search-list' // 搜索列表Ω

import GoodsDetail from 'components/goods-detail/goods-detail' // 商品详情页

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
    },
    {
      path: '/user-sign-in',
      component: UserSignIn
    },
    {
      path: '/main-search',
      component: MainSearch
    },
    {
      path: '/search-list',
      component: SearchList
    },
    {
      path: '/goods-detail',
      component: GoodsDetail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
