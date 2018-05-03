import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/home' // 主页组件
import Brands from 'components/brands/brands' // 品牌页组件
import Sort from 'components/sort/sort' // 分类页组件
import Cart from 'components/cart/cart' // 购物车组件
import User from 'components/user/user' // 用户中心组件

import UserSignIn from 'components/user-sign-in/user-sign-in' // 用户登录组件
import UserRegister from 'components/user-register/user-register' // 用户注册组件
import UserRegisterSetPassword from 'components/user-register-set-password/user-register-set-password' // 用户注册设置密码

import MainSearch from 'components/main-search/main-search' // 搜索页
import SearchList from 'components/search-list/search-list' // 搜索列表

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
      component: Home,
      name: 'Home',
      meta: {
        title: '乐都城',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/brands',
      component: Brands,
      name: 'Brands',
      meta: {
        title: '品牌',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/sort',
      component: Sort,
      name: 'Sort',
      meta: {
        title: '分类',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/cart',
      component: Cart,
      name: 'Cart',
      meta: {
        title: '购物车',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/user',
      component: User,
      name: 'User',
      meta: {
        title: '我的',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/user-sign-in',
      component: UserSignIn,
      name: 'UserSignIn',
      meta: {
        title: '登陆',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/user-register',
      component: UserRegister,
      name: 'UserRegister',
      meta: {
        title: '注册',
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/user-register-set-password',
      component: UserRegisterSetPassword,
      name: 'UserRegisterSetPassword',
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/main-search',
      component: MainSearch,
      name: 'MainSearch',
      meta: {
        title: '商品搜索',
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: '/search-list',
      component: SearchList,
      name: 'SearchList',
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/goods-detail',
      component: GoodsDetail,
      name: 'GoodsDetail',
      meta: {
        title: '商品详情',
        keepAlive: true // 需要被缓存
      }
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
