<template >
  <div class="home" >
    <div class="top-bar" >
      <form class="search-form" action="#" >
        <input class="search-input"
               readonly
               placeholder="请输入要搜索的内容"
               type="text"
               @focus.prevent="_focus()">
        <div class="search-icon"></div>
      </form >
      <div class="msg-btn">
        <img src="./img/xiaoxi@2x.png" />
        <p >消息</p >
      </div >
    </div >
    <div class="scroll" >
      <cube-scroll
        ref="scroll"
        :data="homeSecond"
        :options="options">
        <div>
          <cube-slide
           class="cube-slider"
           v-if="slide.length"
           ref="slide"
           :data="slide">
            <cube-slide-item
              v-for="(item, index) in slide"
              :key="index">
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
                </div >
                <div class="list-box" >
                  <div v-for="(goods, index) in list._List" :key="index" class="goods-box" >
                    <div class="goods-content" @click="gotoDetail(goods.ID)" >
                      <div class="goods-img-box" >
                        <img class="goods-img" v-lazy="getImg(goods.SrcDetail)" alt="" >
                      </div >
                      <div class="goods-title" >
                        <h2 >{{goods.Name}}</h2 >
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div>

      </cube-scroll >
    </div >
    <loading v-show="!homeSecond.length" title="正在载入..." ></loading >
  </div >
</template >

<script type="text/ecmascript-6" >
import { getHomeFirst, getHomeSecond } from 'api/homeData'
import { LOCAL_HOST } from 'api/config'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      homeFrist: [],
      homeSecond: [],
      slide: [],
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      }
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
      return LOCAL_HOST + img
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/goods-detail',
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
