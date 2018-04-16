<template >
  <div class="home" >
    <div class="home-header" >
      <h2 >musicdo</h2 >
    </div >
    <div class="scroll">
      <cube-slide
        class="cube-slider"
        v-if="slide.length"
        ref="slide"
        :data="slide"
        @change="_changePage" >
        <cube-slide-item
          v-for="(item, index) in slide"
          :key="index"
          @click.native="_clickHandler(item, index)" >
          <a class="link" >
            <img class="slider-img" :src="getImg(item.ImgUrl)" >
          </a >
        </cube-slide-item >
      </cube-slide >
      <div class="goods-list-container" >
        <div v-for="(list, index) in homeSecond" :key="index" class="goods-item-list" >
          <div class="list-title" >
            <span class="title-tab" ></span >
            <h2 class="title-name" >{{list.Name}}</h2 >
            <div class="title-more" >
              更多
            </div>
          </div>
          <div class="list-box">
            <div v-for="(goods, index) in list._List" :key= "index" class="goods-box">
              <div class="goods-content" @click="gotoDetail(goods.ID)">
                <div class="goods-img-box">
                  <img class="goods-img" :src="getImg(goods.SrcDetail)" alt="">
                </div>
                <div class="goods-title">
                  <h2>{{goods.Name}}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-show="!homeSecond.length" title="正在载入..."></loading>
  </div >
</template >

<script type="text/ecmascript-6" >
import {getHomeFirst, getHomeSecond} from 'api/homeData'
import {baseImgUrl} from 'api/config'
import loading from 'base/loading/loading'
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
    loading
  },
  created () {
    this._getHomeFirst()
  },
  methods: {
    getImg (img) {
      return baseImgUrl + img
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/goods_detail',
        query: {'goodsId': id}
      })
    },
    _getHomeFirst () {
      getHomeFirst().then((res) => {
        this.homeFrist = res.Data
        this.slide = res.Data.AdInfoRun
        this._getHomeSecond()
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
    },
    _focus () { // 聚焦时路由跳转到搜索页
      this.$router.push({
        path: '/main-search'
      })
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'home.styl'
</style >
