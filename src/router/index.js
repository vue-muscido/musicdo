import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

import Home from 'components/home/home' // 主页组件
import Brands from 'components/brands/brands' // 品牌页组件
import Sort from 'components/sort/sort' // 分类页组件
import Cart from 'components/cart/cart' // 购物车组件
import User from 'components/user/user' // 用户中心组件

import UserLogIn from 'components/user-login/user-login' // 用户登录组件
import UserRegister from 'components/user-register/user-register' // 用户注册组件
import UserRegisterSetPassword from 'components/user-register-set-password/user-register-set-password' // 用户注册设置密码

import MainSearch from 'components/main-search/main-search' // 搜索页
import SearchList from 'components/search-list/search-list' // 搜索列表

import GoodsDetail from 'components/goods-detail/goods-detail' // 商品详情页

Vue.use(Router)

const router = new Router({
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
      path: '/user-login',
      component: UserLogIn,
      name: 'UserLogIn',
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

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log('navigation-guards')

  // console.log('this.$store.state.isLogin', router.app.$options.store.isLogin)
  // console.log(store.state.isLogin)
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由

  const nextRoute = ['Todo', 'User', 'Cart', 'GoodsDetail'] // 需要登录的页面
  let isLogin = store.state.isLogin  // 是否登录
  // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
  if (nextRoute.indexOf(to.name) >= 0) {
    if (isLogin === false) {
      console.log('what the fuck')
      router.push({name: 'UserLogIn'})
    }
  }

  console.log('to.name', to.name)
  // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
  if (to.name === 'UserLogIn') {
    console.log('isLogin:', isLogin)
    if (isLogin === true) {
      router.push({name: 'Home'})
    }
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router
