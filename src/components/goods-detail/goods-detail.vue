<template >
	<transition name="" >
		<div class="goods-detail">
      <!-- 头部 -->
      <div class="top-bar-select" >
        <div @click="back" class="select-left" >
          <span class="icon-goback" ></span >
        </div >
        <ul class="select-middle" >
          <li @click="itemSelect(index)" v-for="(item, index) in selectBar" :key="index" class="select-item"
          :class="{active:selectIndex === index}" >
          {{item}}
          </li >
        </ul >
        <div class="select-right" >
          <span class="icon-cart" ></span >
        </div >
      </div >
      <!-- 商品介绍滚动部分-->
      <transition :name="transitionName">
        <div v-if="slide.length" class="scroll">
          <cube-scroll
            ref="scroll"
            :data="slide"
            :options="options"
            @scroll="isscroll">
            <!-- 商品基本展示 -->
            <div ref="base" class="base">
              <!-- 商品图片 -->
              <div class="goods-img-container" >
                <cube-slide
                  :loop="loopFlag"
                  class="cube-slider"
                  ref="slide"
                  :data="slide" >
                  <cube-slide-item
                    v-for="(item, index) in slide"
                    :key="index">
                    <a class="link slider-img-con" >
                      <img class="slider-img" :src="getImg(item)" >
                    </a >
                  </cube-slide-item >
                </cube-slide >
              </div >
              <!-- 商品名称 -->
              <div class="goods-title" >
                <div class="goods-name" >{{goodsData.Name}}</div >
                <div class="goods-share" >
                  <span class="icon-share" ></span >
                  <p >分享</p >
                </div >
              </div >
              <!-- 商品价格 -->
              <div class="goods-price" >
                <span class="price-now" >¥<span >{{goodsData.MarketPrice}}.</span >00</span >
                <span class="price-old" >¥{{goodsData.MemberPrice}}</span >
              </div >
              <!-- 商品运费 -->
              <div class="goods-about" >
                <div class="about-item goods-freight" >快递:免运费</div >
                <div class="about-item goods-count" >月销:{{goodsData.SaleCount}}</div >
                <div v-show="goodsData.ProducingArea" class="about-item goods-area" >{{goodsData.ProducingArea}}</div >
              </div >
              <!-- 选择分类 -->
              <div class="classify">
                <div class="con">
                  参数
                  <span>选择规格</span>
                </div>
              </div>
              <!-- 选择参数 -->
              <div class="parameter">
                <div class="con">
                  送至
                  <span>广州天河区豪景花园2213</span>
                </div>
              </div>
              <!-- 商品评价 -->
              <div ref="comment" class="comment">
                <div class="comment-header">
                  <div class="title">商品评价
                    <span v-if="!commentData.UserName">(暂无评论)</span>
                  </div>
                  <div v-if="commentData.UserName" class="good-percent">98.99%好评率</div>
                </div>
                <!-- 评价内容 -->
                <div v-if="commentData.UserName" class="comment-item">
                  <div class="title">
                    <div class="con">
                      <img class="user-img" :src="commentData.Ico" alt="">
                      <span class="name">{{commentData.UserName}}</span>
                    </div>
                    <div class="start">
                      <cube-rate v-model="commentData.StarNum"></cube-rate>
                    </div>
                  </div>
                  <div class="dec">{{commentData.Content}}</div>
                  <div v-if="commentData.ImgList" class="img-list">
                    <div v-for="(item, index) in commentData.ImgList" :key="index"class="img-con">
                      <img class="user-img" :src="getImg(item)" alt="">
                    </div>
                  </div>
                </div>
                <div v-if="commentData.UserName" class="show-all">
                  <div @click="commentSwitch" class="btn-show-all">
                    查看全部评论
                  </div>
                </div>
              </div>
              <!-- 店铺展示 -->
              <div class="shop">
                <div class="shop-title">
                  <div class="con">
                    <div class="img-con">
                      <img class="shop-img" :src="getImg(goodsData.ShopIco)" alt="">
                    </div>
                    <div class="shop-name">{{goodsData.ShopName}}</div>
                  </div>
                  <div class="btn-into">进店逛逛</div>
                </div>
                <div class="shop-show">
                  <div class="shop-item">
                    <div class="item-num">1888</div>
                    <div class="item-name">全部宝贝</div>
                  </div>
                  <div class="shop-item">
                    <div class="item-num">1888</div>
                    <div class="item-name">上新宝贝</div>
                  </div>
                  <div class="shop-item">
                    <div class="item-num">1888</div>
                    <div class="item-name">关注人数</div>
                  </div>
                  <div class="shop-item">
                    <div class="shop-dec">宝贝描述
                      <span>4.8</span>
                    </div>
                    <div class="shop-dec">卖家服务
                      <span>4.8</span>
                    </div>
                    <div class="shop-dec">物流服务
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 商品详情展示 -->
            <div ref="detail" class="detail">
              <h2>—— 宝贝详情 ——</h2>
              <div
                v-for="(item, index) in slide"
                :key="index">
                <img class="detail-img" :src="getImg(item)" >
              </div >
            </div>
          </cube-scroll>
        </div>
      </transition >
      <!-- 评论区滚动部分 -->
      <div v-if="commentFlag" class="comment-container">
        <div class="top-bar">
          <div @click="commentSwitch" class="btn-back">
          </div>
          <div class="title">
            评论区
          </div>
          <div class="btn-back">
          </div>
        </div>
        <ul class="comment-list">
          <li class="comment-item">
            这是一条评论
          </li>
          <li class="comment-item">
            这是一条评论
          </li>
          <li class="comment-item">
            这是一条评论
          </li>
        </ul>
      </div>
      <!-- 底部操作按钮 -->
      <div class="bottom-bar-action" >
        <div class="action-left" >
          <div class="btn-action" >
            <span class="icon icon-custom" ></span >
            <p >客服</p >
          </div >
          <div class="btn-action" >
            <span class="icon icon-shop" ></span >
            <p >店铺</p >
          </div >
          <div class="btn-action" >
            <span class="icon icon-start" ></span >
            <p >收藏</p >
          </div >
        </div >
        <div class="action-right" >
          <div class="btn-action btn-add-cart" >加入购物车</div >
          <div class="btn-action btn-buy" >立即购买</div >
        </div >
      </div>
      <!-- loading -->
      <loading v-show="!slide.length" title="正在载入..." ></loading >
		</div>
	</transition >
</template >

<script type="text/ecmascript-6" >
import { getProductDetail } from 'api/goodsDetail'
import { LOCAL_HOST } from 'api/config'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      goodsId: '',
      goodsData: {},
      commentData: {},
      slide: [],
      loopFlag: true,
      transitionName: 'fade',
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        },
        listenScroll: {
          type: Boolean,
          default: true
        }
      },
      selectIndex: 0,
      selectBar: ['商品', '详情', '评价'],
      commentFlag: false
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this._getProductDetail(this.goodsId)
  },
  methods: {
    isscroll () {
      console.log('dd')
    },
    commentSwitch () {
      this.itemSelect(2)
    },
    itemSelect (index) {
      this.selectIndex = index
      if (index === 0) {
        this.commentFlag = false
        this.$refs.scroll.scrollToElement(this.$refs.base, 500, 0, 0, 'easing')
      }
      if (index === 1) {
        this.commentFlag = false
        this.$refs.scroll.scrollToElement(this.$refs.detail, 500, 0, 0, 'easing')
      }
      if (index === 2) {
        this.commentFlag = true
        this.$refs.scroll.scrollToElement(this.$refs.comment, 500, 0, 0, 'easing')
      }
    },
    gotoDetail () {
      this.$refs.scroll.scrollToElement(this.$refs.detail, 500, 0, 0, 'easing')
    },
    getImg (img) {
      return LOCAL_HOST + img
    },
    back () {
      this.commentFlag = false
      this.selectIndex = 0
      this.$router.back()
    },
    _getProductDetail (goodsId) {
      getProductDetail(goodsId).then((res) => {
        if (res.Flag === true) {
          this.goodsData = res.ReturnData
          this.commentData = res.ReturnData.Data
          this.slide = res.ReturnData.ImgUrl.split(',')
          if (this.slide.length === 1) {
            this.loopFlag = false
          } else {
            this.loopFlag = true
          }
        }
      })
    }
  },
  components: {
    loading
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')
      if (toDepth[1] === 'goods-detail') {
        this.goodsData = {}
        this.slide = []
      }
      this.goodsId = this.$route.query.goodsId
      this._getProductDetail(this.goodsId)
    }
  }
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import 'goods-detail.styl'

</style >
