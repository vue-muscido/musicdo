<template >
  <div class="home" >
    <div class="header-container">
      <h1>乐都城musicdo...</h1>
    </div>
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
    <div class="goods-list-container">
      <ul v-for="(item, index) in homeSecond" :key = 'index'>
        <div class="goods-title">{{item.Name}}</div>
        <li class="goods-box" v-for="(goods, index) in item._List" :key='goods'>
          {{goods.Name}}
          <img class="goods-img" :src="getImg(goods.SrcDetail)" alt="">
        </li>
      </ul>
    </div>
  </div >
</template >

<script type="text/ecmascript-6" >
import {getHomeFrist, getHomeSecond} from 'api/homedata'
import {baseImgUrl} from 'api/config'
import MainSearch from 'components/main-search/main-search'
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
  },
  methods: {
   getImg(img) {
      return baseImgUrl + img
    },
    _getHomeFrist () {
      getHomeFrist().then((res) => {
        this.homeFrist = res.Data
        this.slide = res.Data.AdInfoRun
        for (var i = 0; i < this.slide.length; i++) {
          this.slide[i].url = ''
          this.slide[i].image = this.local + res.Data.AdInfoRun[i].ImgUrl
        }
        this._getHomeSecond()
      })
    },
    _getHomeSecond () {
      getHomeSecond().then((res) => {
        this.homeSecond = res.Data
        console.log('第二部分请求成功')
        console.log(res.Data)
      })
    },
    _changePage (current) {
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
