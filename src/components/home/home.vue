<template >
  <div class="home" >
    <cube-slide
      v-if="slide.length"
      ref="slide"
      :data="slide"
      @change="_changePage" >
      <cube-slide-item
        v-for="(item, index) in slide"
        :key="index"
        @click.native="_clickHandler(item, index)" >
        <a class="link" >
          <img class="img" :src="item.image" >
        </a >
      </cube-slide-item >
    </cube-slide >
  </div >
</template >

<script type="text/ecmascript-6" >
import {getHomeFrist, getHomeSecond} from 'api/homedata'
export default {
  data () {
    return {
      local: 'http://musicdo.cn',
      homeFrist: [],
      homeSecond: [],
      slide: []
    }
  },
  components: {
  },
  created () {
    this._getHomeFrist()
    this._getHomeSecond()
  },
  methods: {
    _getHomeFrist () {
      getHomeFrist().then((res) => {
        this.homeFrist = res.Data
        this.slide = res.Data.AdInfoRun
        for (var i = 0; i < this.slide.length; i++) {
          this.slide[i].url = ''
          this.slide[i].image = this.local + res.Data.AdInfoRun[i].ImgUrl
        }
      })
    },
    _getHomeSecond () {
      getHomeSecond().then((res) => {
        this.homeSecond = res.Data
      })
    },
    _changePage (current) {
      console.log('当前轮播图序号为:' + current)
    },
    _clickHandler (item, index) {
      console.log(item, index)
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'home.styl'
</style >
