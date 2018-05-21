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
        :options="options"
        @pulling-down="onPullingDown">
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
          <div v-if="slide.length" class="tab-container">
            <div  v-for="(tab, index) in tabList" :key="index" @click="tabClick(tab.name, index)" class="tab-item">
              <div class="tab-img" :class="tab.pic"></div>
              <p class="tab-name">{{tab.name}}</p>
            </div>
          </div>
          <div v-if="brand.length" class="brand-container">
            <div class="brand-more">
              <div class="con">
                <span class="title">品牌</span>
                <span @click="tabClick('品牌')" class="btn-more">更多</span>
              </div>
            </div>
            <ul class="brand-list">
              <li v-for="(brand, index) in brand" :key="index" class="brand">
                <div class="tab-img-con">
                  <img class="tab-img" :src="getImg(brand.Logo)" alt="">
                </div>
              </li>
            </ul>
          </div>
          <div class="goods-container" >
            <div v-for="(list, index) in homeSecond" :key="index" class="goods-item-list" >
              <div class="list-title" >
                <span class="title-tab" :class="titleColor(index)" ></span >
                <h2 class="title-name" >{{list.Name}}</h2 >
                <div @click="tabClick(list.Name, index)" class="title-more" >
                  更多
                </div >
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
                    <div class="goods-action">
                      <div class="goods-price">
                        ¥<span>{{goods.MarketPrice}}</span>.00
                      </div>
                      <div class="goods-buy"></div>
                    </div>
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </cube-scroll >
    </div >
    <!-- tab -->
    <tab v-show="true"></tab>
    <!-- loading -->
    <loading v-show="!homeSecond.length" title="正在载入..." ></loading >
  </div >
</template >

<script type="text/ecmascript-6" >
import { getHomeFirst, getHomeSecond, tabData } from 'api/homeData'
import { LOCAL_HOST } from 'api/config'
import Tab from 'components/tab/tab'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      homeFrist: [],
      homeSecond: [],
      slide: [],
      brand: [],
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        },
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '数据已更新'
        }
      },
      tabList: []
    }
  },
  created () {
    this._getHomeFirst()
    this._getTabData()
  },
  methods: {
    getImg (img) {
      return LOCAL_HOST + img
    },
    titleColor (index) {
      return 'title-color-' + index % 10
    },
    tabClick (name, index) {
      if (name === '品牌') {
        this.$router.push({
          path: '/brands'
        })
        return
      }
      if (name === '分类') {
        this.$router.push({
          path: '/sort'
        })
        return
      }
      this.$router.push({
        path: '/main-search',
        query: {'keyword': name}
      })
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
        this.brand = res.Data.Brand_Top10_Recommend
        this._getHomeSecond()
      })
    },
    _getHomeSecond () {
      getHomeSecond().then((res) => {
        this.homeSecond = []
        this.homeSecond = res.Data
      })
    },
    _getTabData () {
      this.tabList = tabData
    },
    _changePage (current) {
    },
    _clickHandler (item, index) {
      console.log(item, index)
    },
    _focus () { // 聚焦时路由跳转到搜索页
      this.$router.push({
        path: '/main-search',
        query: {'keyword': ''}
      })
    },
    onPullingDown () {
      console.log('下拉刷新')
      // Mock async load.
      setTimeout(() => {
        this._getHomeFirst()
      }, 1000)
    }
  },
  components: {
    loading,
    Tab
  },
  watch: {
    '$route' () {
      if (this.$route.path === '/home') {
        this.$refs.scroll.refresh()
        this.$refs.slide.refresh()
      }
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'home.styl'
</style >
