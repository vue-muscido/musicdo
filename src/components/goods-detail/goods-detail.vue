<template >
	<transition name="" >
		<div class="goods-detail" >
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
      <transition :name="transitionName" >
        <div ref="wrap" v-if="slide.length" class="scroll" >
          <cube-scroll
            ref="scroll"
            :data="slide"
            :options="options"
            :listenScroll="listenScroll"
            @scroll="isscroll" >
            <!-- 商品基本展示 -->
            <div ref="base" class="base" >
              <!-- 商品图片 -->
              <div class="goods-img-container" >
                <cube-slide
                  :loop="loopFlag"
                  class="cube-slider"
                  ref="slide"
                  :data="slide" >
                  <cube-slide-item
                    v-for="(item, index) in slide"
                    :key="index" >
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
              <div class="classify" >
                <div class="con" >
                  参数
                  <span >选择规格</span >
                </div >
              </div >
              <!-- 选择参数 -->
              <div class="parameter" >
                <div class="con" >
                  送至
                  <span >广州天河区豪景花园2213</span >
                </div >
              </div >
              <!-- 商品评价 -->
              <div ref="comment" class="comment" >
                <div class="comment-header" >
                  <div class="title" >商品评价
                    <span v-if="!commentData.UserName" >(暂无评论)</span >
                  </div >
                  <div v-if="commentData.UserName" class="good-percent" >98.99%好评率</div >
                </div >
                <!-- 评价内容 -->
                <div v-if="commentData.UserName" class="comment-item" >
                  <div class="title" >
                    <div class="con" >
                      <img class="user-img" :src="commentData.Ico" alt="" >
                      <span class="name" >{{commentData.UserName}}</span >
                    </div >
                    <div class="start" >
                      <cube-rate v-model="commentData.StarNum" ></cube-rate >
                    </div >
                  </div >
                  <div class="dec" >{{commentData.Content}}</div >
                  <div v-if="commentData.ImgList" class="img-list" >
                    <div v-for="(item, index) in commentData.ImgList" :key="index" class="img-con" >
                      <img class="user-img" :src="getImg(item)" alt="" >
                    </div >
                  </div >
                </div >
                <div v-if="commentData.UserName" class="show-all" >
                  <div @click="commentSwitch" class="btn-show-all" >
                    查看全部评论
                  </div >
                </div >
              </div >
              <!-- 店铺展示 -->
              <div class="shop"  >
                <div class="shop-title" >
                  <div class="con" >
                    <div class="img-con" >
                      <img class="shop-img" :src="getImg(shopInfo.ShopIco)" alt="" >
                    </div >
                    <div class="shop-name" >{{shopInfo.ShopName}}</div >
                  </div >
                  <div class="btn-into" >进店逛逛</div >
                </div >
                <div class="shop-show" >
                  <div class="shop-item" >
                    <div class="item-num" >{{shopInfo.ProductCount}}</div >
                    <div class="item-name" >全部宝贝</div >
                  </div >
                  <div class="shop-item" >
                    <div class="item-num" >{{shopInfo.ProductNewCount}}</div >
                    <div class="item-name" >上新宝贝</div >
                  </div >
                  <div class="shop-item" >
                    <div class="item-num" >{{shopInfo.ShopCollectCount}}</div >
                    <div class="item-name" >关注人数</div >
                  </div >
                  <div class="shop-item" >
                    <div class="shop-dec" >宝贝描述
                      <span >{{shopInfo.ProDes}}</span >
                    </div >
                    <div class="shop-dec" >卖家服务
                      <span >{{shopInfo.Service}}</span >
                    </div >
                    <div class="shop-dec" >物流服务
                      <span >{{shopInfo.Logistics}}</span >
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <!-- 商品详情展示 -->
            <div ref="detail" class="detail" >
              <h2 >—— 宝贝详情 ——</h2 >
              <div class="detail-con" v-if="detailImg!=''" v-html="detailImg" ></div >
            </div >
          </cube-scroll >
        </div >
      </transition >
      <!-- 评论区滚动部分 -->
      <div v-if="commentFlag" class="comment-container" >
        <div class="top-bar" >
          <div @click="commentSwitch" class="btn-back" >
          </div >
          <div class="title" >
            评论区
          </div >
          <div class="btn-back" >
          </div >
        </div >
        <ul class="comment-list" >
          <li class="comment-item" >
            这是一条评论
          </li >
          <li class="comment-item" >
            这是一条评论
          </li >
          <li class="comment-item" >
            这是一条评论
          </li >
        </ul >
      </div >
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
      </div >
      <!-- loading -->
      <loading v-show="!slide.length" title="正在载入..." ></loading >
		</div >
	</transition >
</template >

<!-- <script type="text/ecmascript" > -->
<script >
import {
  getProductDetail,
  getSpec,
  getProParameters,
  showProductContent,
  //  getProductCommentList,
  getShopProductCount
} from 'api/goodsDetail'
import { LOCAL_HOST } from 'api/config'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      goodsId: '',
      shopId: '',
      goodsData: {},
      commentData: {},
      slide: [],
      loopFlag: true,
      transitionName: 'fade',
      options: {
        probeType: 3,
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      },
      listenScroll: true,
      pageY: 0,
      scrollEvents: ['scroll'],
      selectIndex: 0,
      selectBar: ['商品', '详情', '评价'],
      commentFlag: false,
      detailImg: '',
      shopInfo: ''
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this._getProductDetail(this.goodsId)
    // -
    // 获取商品数据
    // -
    this._getSpec(this.goodsId)
    this._getProParameters(this.goodsId)
    this._showProductContent(this.goodsId)
    //    this._getProductCommentList(this.goodsId)
    //    this._getShopProductCount(this.shopId)
  },
  methods: {
    cutOutStr (str) {
      let REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/ // body标签正则，用于截取body里面的内容
      let REG_SCRIPT = /<script[\s\S]*?<\/script>/ig // script标签正则，用于剔除body里面的script标签及script标签里面的内容
      let sss = ''
      sss = str.replace(REG_SCRIPT, '') // 先剔除掉body里面的script标签
      let result = REG_BODY.exec(sss) // 再截取body的内容
      if (result && result.length === 2) { // 截取出来的是一个数组
        return result[1] // 数组第二项是我们要的图文
      }
      return str // 如果上面的result找不到或者没有，就返回传进来的未改变的内容
    },
    isscroll (pos) {
      this.pageY = pos.y | 0
      if (this.$refs.base.offsetHeight + this.$refs.detail.offsetHeight + this.pageY <= this.$refs.wrap.offsetHeight || this.pageY + this.$refs.base.offsetHeight <= 0) {
        if (this.selectIndex !== 2) {
          this.selectIndex = 1
        }
      } else {
        if (this.selectIndex !== 2) {
          this.selectIndex = 0
        }
      }
    },
    commentSwitch () {
      this.itemSelect(2)
    },
    itemSelect (index) {
      this.selectIndex = index
      if (index === 0) {
        this.commentFlag = false
        this.$refs.scroll.scrollToElement(this.$refs.base, 280, 0, 0, 'easing')
      }
      if (index === 1) {
        this.commentFlag = false
        this.$refs.scroll.scrollToElement(this.$refs.detail, 280, 0, 0, 'easing')
      }
      if (index === 2) {
        // this.$refs.scroll.stop()
        this.commentFlag = true
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
          console.log('_getProductDetail::', res)
          this.goodsData = res.ReturnData
          this.commentData = res.ReturnData.Data
          this.slide = res.ReturnData.ImgUrl.split(',')
          this.shopId = res.ReturnData.ShopID
          this._getShopProductCount(this.shopId)
          if (this.slide.length === 1) {
            this.loopFlag = false
          } else {
            this.loopFlag = true
          }
        }
      })
    },
    _getSpec (ProductID) {
      getSpec(ProductID).then((res) => {
        //        if (res.Flag === true) {
        console.log('_getSpec:::', res)
        //        }
      })
    },
    _getProParameters (ProductID) {
      getProParameters(ProductID).then((res) => {
        //        if (res.Flag === true) {
        console.log('_getProParameters:;-', res)
        //        }
      })
    },
    _showProductContent (ProductID) {
      // 详情图片接口，返回一个html页面，需要进行整理
      showProductContent(ProductID).then((res) => {
        this.cutOutStr(res) // 进行整理，剪切出body内的图片，并去掉里面的js
        this.detailImg = this.cutOutStr(res)
      })
    },
    //    _getProductCommentList (ProductID) {
    //      getProductCommentList(ProductID).then((res) => {
    //        if (res.Flag === true) {
    //          console.log('_getProductCommentList--::', res)
    //        }
    //      })
    //    },
    _getShopProductCount (ShopID) {
      //  ProductCount - 全部宝贝数
      //  ProductNewCount - 上新宝贝数
      //  ShopCollectCount - 关注人数
      //  ProDes - 宝贝描述
      //  Service - 卖家服务
      //  Logistics - 物流服务
      //  ShopName - 店铺名称
      //  ShopName店铺 - LOGO
      getShopProductCount(ShopID).then((res) => {
        if (res.Flag === true) {
          console.log('_getShopProductCount-::', res)
          this.shopInfo = res.ReturnData
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
      // -
      // 获取商品数据
      // -
      this._getSpec(this.goodsId)
      this._getProParameters(this.goodsId)
      this._showProductContent(this.goodsId)
      //      this._getProductCommentList(this.goodsId)
      //      this._getShopProductCount(this.shopId)
    }
  }
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import 'goods-detail.styl'

</style >
