<template >
  <div id="app" >
    <transition :name="transitionName">
      <keep-alive >
        <router-view class="router-view" ></router-view >
      </keep-alive >
    </transition >
    <tab v-if="true"></tab >
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
import { rem } from 'common/js/rem'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'fade'
      //      rfontSiz: 0 || document.getElementsByTagName('html')[0].style.fontSize
    }
  },
  created () {
    this._rem()
    this._watchRem()
  },
  components: {
    Tab
  },
  methods: {
    _rem () {
      rem()
    },
    _watchRem () {
      window.addEventListener('resize', () => {
        this._rem()
      })
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')
      const fromDepth = from.path.split('/')
      this.transitionName = toDepth[1] === 'goods-detail' ? 'slide' : 'fade'
      if (toDepth[1] === 'goods-detail') {
        this.transitionName = 'slideIn'
        return
      }
      if (fromDepth[1] === 'goods-detail') {
        this.transitionName = 'slideOut'
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
    content ""/* 文案 */

</style >
