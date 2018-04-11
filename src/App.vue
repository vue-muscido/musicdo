<template >
  <div id="app" >
    <transition name="" >
      <keep-alive >
        <router-view class="router-view" ></router-view >
      </keep-alive >
    </transition >
    <tab ></tab >
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
import {rem} from 'common/js/rem'
export default {
  name: 'app',
  data () {
    return {
      rfontSiz: 0 || document.getElementsByTagName('html')[0].style.fontSize
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
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import "~common/stylus/index.styl"
#app
  position: relative;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  max-width: $g-page-max-width;
  overflow-x hidden
  background-color $l-bgc-app
</style >
