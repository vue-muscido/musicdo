<template>
	<transition name="">
		<div class="goods-detail">
			<!-- 头部 -->
			<div class="top-bar-select">
				<div @click="back" class="select-left">
					<span class="icon-goback"></span>
				</div>
				<div class="select-middle">
					<span class="select-item active">商品</span>
					<span class="select-item">详情</span>
					<span class="select-item">评价</span>
				</div>
				<div class="select-right">
					<span class="icon-cart"></span>
				</div>
			</div>
			<!-- 商品图片 -->
			<div class="goods-img">
				<cube-slide
          :loop="loopFlag"
	        class="cube-slider"
	        v-if="slide.length"
	        ref="slide"
	        :data="slide">
	        <cube-slide-item
	          v-for="(item, index) in slide"
	          :key="index">
	          <a class="link" >
	            <img class="slider-img" v-lazy="getImg(item)" >
	          </a >
	        </cube-slide-item >
	      </cube-slide >
			</div>
				<!-- 商品名称 -->
			<div class="goods-title">
				<div class="goods-name">{{goodsData.Name}}</div>
				<div class="goods-share">
					<span class="icon-share"></span>
					<p>分享有奖</p>
				</div>
			</div>
			<!-- 商品价格 -->
			<div class="goods-price">
				<span class="price-now">¥<span>{{goodsData.MarketPrice}}.</span>00</span>
				<span class="price-old">¥{{goodsData.MemberPrice}}</span>
			</div>
			<!-- 商品运费 -->
			<div class="goods-about">
				<div class="about-item goods-freight">快递:免运费</div>
				<div class="about-item goods-count">月销:{{goodsData.SaleCount}}</div>
				<div v-show="goodsData.ProducingArea" class="about-item goods-area">{{goodsData.ProducingArea}}</div>
			</div>
			<!-- 底部操作按钮 -->
			<div class="bottom-bar-action">
				<div class="action-left">
					<div class="btn-action">
						<span class="icon icon-custom"></span>
						<p>客服</p>
					</div>
					<div class="btn-action">
						<span class="icon icon-shop"></span>
						<p>店铺</p>
					</div>
					<div class="btn-action">
						<span class="icon icon-start"></span>
						<p>收藏</p>
					</div>
				</div>
				<div class="action-right">
					<div class="btn-action btn-add-cart">加入购物车</div>
					<div class="btn-action btn-buy">立即购买</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import {getProductDetail} from 'api/goodsDetail'
import {baseImgUrl} from 'api/config'
export default {
  data () {
    return {
      goodsId: '',
      goodsData: {},
      slide: [],
      loopFlag: true
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    this._getProductDetail(this.goodsId)
  },
  methods: {
    getImg (img) {
      return baseImgUrl + img
    },
    back () {
      this.$router.back()
    },
    _getProductDetail (goodsId) {
      getProductDetail(goodsId).then((res) => {
        if (res.Flag === true) {
          this.goodsData = res.ReturnData
          this.slide = []
          this.slide = res.ReturnData.ImgUrl.split(',')
          if (this.slide.length === 1) {
            this.loopFlag = false
          } else {
            this.loopFlag = true
          }
          console.log(this.slide)
        }
      })
    }
  },
  beforeDestroy () {
    this.slide = []
  },
  watch: {
    '$route.query.goodsId' () {
      this.slide = []
      this.goodsId = this.$route.query.goodsId
      this._getProductDetail(this.goodsId)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.goods-detail
  overflow-x hidden
  con-bottom()
  min-height 140%
  .top-bar-select
  	max-width $g-page-max-width
  	display flex
  	position fixed
  	z-index $g-zindex-fix
  	top 0
  	padding 0 1.5rem
  	border-bottom 1px solid $g-brc-default
  	width 100%
  	height $g-fix-bar-height
  	background-color $g-bgc-con
  	.select-left
  		flex 2rem 0 0
  		.icon-goback
  			display inline-block
  			margin-top 1rem
  			width 2rem
  			height 2rem
  			bg-image("img/back", 2rem)
  	.select-right
  		flex 2rem 0 0
  		align-item center
  		.icon-cart
  			display inline-block
  			margin-top 1rem
  			width 2rem
  			height 2rem
  			bg-image("img/che", 2rem)
  	.select-middle
  		flex 1
  		text-align center
  	.select-item
  		margin 0 1rem
  		display inline-block
  		padding 1.1rem 0
  		font-size 1.5rem
  		height $g-fix-bar-height
		.active
			border-bottom 0.2rem solid $g-col-red
			color $g-col-red
  .goods-img
  	con-top()
  	border-bottom 1px solid $g-brc-default
	  .cube-slider
	  	width 100%
	  	height 100%
	  	.slider-img
	  		width 100%
  .goods-title
  	display flex
  	padding 1.5rem
  	background-color $g-bgc-con
  	.goods-name
  		flex 1
  		font-size $g-fs-xl
  		color $g-fc-black
		.goods-share
			margin-left 1rem
			text-align center
			p
				font-size $g-fs-min
				color $g-fc-gray
			.icon-share
				display inline-block
				width 1.8rem
				height 1.8rem
				bg-image("img/fenxiang", 1.8rem)
	.goods-price
		padding 0 $g-padding-lg
		background-color $g-bgc-con
		font-size $g-fs-xl
		text-align bottom
		.price-now
			color	$g-col-red
			span
				font-size $g-fs-tit-xs
		.price-old
			padding-left 1rem
			color $g-col-gray-w
			vertical-align bottom
	.goods-about
		display flex
		justify-content space-between
		padding $g-padding-lg
		border-bottom 1px solid $g-brc-default
		background-color $g-bgc-con
		.about-item
			align-item center
			text-align center
			font-size $g-fs-normal
			color $g-fc-gray
	.bottom-bar-action
		max-width $g-page-max-width
		display flex
		position fixed
		z-index $g-zindex-mask
		bottom 0
		width 100%
		height $g-bot-bar-height
		background-color $g-bgc-con
		.action-left
			flex 1
			display flex
			.btn-action
				flex 1
				padding-top 0.5rem
				border-right 1px solid $g-brc-default
				text-align center
				color $g-fc-normal
				font-size $g-fs-normal
			.icon
				display inline-block
				width 2rem
				height 2rem
			.icon-custom
				bg-image("img/kefu", 2rem)
			.icon-shop
				bg-image("img/shop", 2rem)
			.icon-start
				bg-image("img/soucang", 2rem)
		.action-right
			display flex
			flex 22rem 0 0
			font-size 1.6rem
			.btn-action
				flex 1
				line-height $g-bot-bar-height
				text-align center
				color $g-fc-white
			.btn-add-cart
				background-color $g-bgc-btn-yellow
			.btn-buy
				background-color $g-bgc-btn-red

</style >
