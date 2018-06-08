<template >
	<transition name="" >
		<div class="goods-detail">
      <!-- 头部 -->
      <div class="top-bar-select" >
        <div @click="back" class="select-left" >
          <span class="icon-goback" ></span >
        </div >
        <div class="select-middle" >
          <span class="select-item active" >商品</span >
          <span class="select-item" >详情</span >
          <span class="select-item" >评价</span >
        </div >
        <div class="select-right" >
          <span class="icon-cart" ></span >
        </div >
      </div >
      <!-- 滚动部分-->
      <transition :name="transitionName">
        <div v-if="slide.length" class="scroll">
          <cube-scroll
            ref="scroll"
            :data="slide"
            :options="options">
            <!-- 商品基本展示 -->
            <div class="base">
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
              <div class="comment">
                <div class="comment-header">
                  <div class="title">商品评价(暂无评论)</div>
                  <div class="good-percent">98.99%好评率</div>
                </div>
                <div class="comment-item">
                  用户评论~
                </div>
                <div class="show-all">
                  <div class="btn-show-all">
                    查看全部评论
                  </div>
                </div>
              </div>
              <!-- 店铺展示 -->
              <div class="shop">
                店铺展示~
              </div>
            </div>
            <!-- 商品详情展示 -->
            <div class="detail">
              商品详情···
            </div>
          </cube-scroll>
        </div>
      </transition >
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
      slide: [],
      loopFlag: true,
      transitionName: 'fade',
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      }
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this._getProductDetail(this.goodsId)
  },
  methods: {
    getImg (img) {
      return LOCAL_HOST + img
    },
    back () {
      this.$router.back()
    },
    _getProductDetail (goodsId) {
      getProductDetail(goodsId).then((res) => {
        if (res.Flag === true) {
          this.goodsData = res.ReturnData
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
