<template >
  <div id="app" >
    <transition :name="transitionName" >
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive" class="router-view" ></router-view >
      </keep-alive >
    </transition >
    <transition :name="transitionName" >
      <router-view v-if="!$route.meta.keepAlive" class="router-view" ></router-view >
    </transition >
    <transition :name="transitionName" >
      <user-login v-if="false" ></user-login >
    </transition >
    <tab v-show="tabFlag"></tab>
  </div >
</template >

<script type="text/ecmascript-6" >
import { rem } from 'common/js/rem'
import UserLogin from 'components/user-login/user-login'
import { localTake } from 'common/js/localStore'
import { mapGetters, mapActions } from 'vuex'
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'fade'
    }
  },
  created () {
    this._rem()
    this._watchRem()
  },
  mounted () {
    if (localTake('userMsg')) {
      console.log('check userMsg::', localTake('userMsg'))
      console.log('type userMsg::', typeof localTake('userMsg'))
      let isLogin = localTake('userMsg')
      this.xSetUserMsg(isLogin)
    }
  },
  computed: {
    ...mapGetters([
      'userMsg',
      'tabFlag'
    ])
  },
  methods: {
    _rem () {
      rem()
    },
    _watchRem () {
      window.addEventListener('resize', () => {
        this._rem()
      })
    },
    ...mapActions([
      'xSetUserMsg',
      'xRrmoveUserMsg'
    ])
  },
  components: {
    Tab,
    UserLogin
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')
      const fromDepth = from.path.split('/')
      this.transitionName = toDepth[1] === 'goods-detail' ? 'slide' : 'fade'
      //      if (toDepth[1] === 'user') {
      //        this.loginFlag = true
      //      } else {
      //        this.loginFlag = false
      //      }
      if (toDepth[1] === 'goods-detail' || toDepth[1] === 'user-about') {
        this.transitionName = 'slideIn'
        return
      }
      if (fromDepth[1] === 'goods-detail' || fromDepth[1] === 'user-about') {
        this.transitionName = 'slideOut'
        return
      }
      if (toDepth[1] === 'user-login') {
        this.transitionName = 'slideUp'
        return
      }
      if (fromDepth[1] === 'user-login') {
        this.transitionName = 'slideUp'
        return
      }
      this.transitionName = 'fade'
    }
  }
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import "~common/stylus/index.styl"
#app
  margin: 0 auto;
  width: 100vw;
  max-width: $g-page-max-width;
  overflow-x hidden
  background-color $l-bgc-app

#app:after
  z-index $g-zindex-bot
  position fixed
  width 100%
  top 0
  left 0
  bottom 0
  background-color $l-bgc-wx
  font-size $g-fs-normal
  color $g-col-gray-w
  line-height 12rem
  text-align center
  content ""

/* 文案 */

</style >
