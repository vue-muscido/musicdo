<template >
  <div class="cart">
    <!-- 商品列表容器 -->
    <div class="cartCon">
      <cube-scroll
        ref="scroll"
        :data="cartData"
        :options="options"
        @pulling-down="onPullingDown">
        <cube-swipe>
          <transition-group name="swipe" tag="ul">
            <li class="swipe-item-wrapper" v-for="(data,index) in swipeData" :key="data.item.id">
              <cube-swipe-item
                  ref="swipeItem"
                  :btns="data.btns"
                  :index="index"
                  @btn-click="onBtnClick"
                  @active="onItemActive">
                <div @click="onItemClick(data.item, index)" class="item-inner">
                  <div class="icon">
                    <img width="80" height="80" :src="data.item.imgurl">
                  </div>
                  <div class="text">
                    <h2 class="item-name" v-html="data.item.name"></h2>
                    <p class="item-desc" v-html="data.item.desc"></p>
                  </div>
                </div>
              </cube-swipe-item>
            </li>
          </transition-group>
        </cube-swipe>
        <!-- 商品列表 -->
        <ul v-if="false" class="cart-list">
          <li v-for="(item, index) in cartData"  class="item">I am {{item}}</li>
        </ul>
        <!-- 未添加商品提示 -->
        <empty class="cart-empty" v-if="!swipeData.length" :emptyStr='notGoodsMsg' :dataType='dataTypeMsg'></empty >
      </cube-scroll>
    </div>
    <!-- 结算栏 -->
    <div class="count">
      <div class="check-all">
        <cube-checkbox>
          全选
        </cube-checkbox>
      </div>
      <div class="count-all">
        合计
      </div>
      <div class="btn-count">
        结算
      </div>
    </div>
    <!-- tab -->
    <tab v-show="true"></tab>
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
import empty from 'base/empty/empty'
export default {
  data () {
    return {
      checkList: ['1', '4'],
      notGoodsMsg: '购物车空空的，先去添加商品吧~',
      dataTypeMsg: '1',
      cartData: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '数据已更新'
        }
      },
      swipeData: [
        {
          item: {
            id: '3646653877',
            name: '威斯曼WEISMANN 数码钢琴 MET-8G钢琴，优雅大气',
            desc: '官方标配 + 原装进口',
            imgurl: 'http://musicdo.cn/Upload/0/201710237239.jpg'
          },
          btns: [
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        },
        {
          item: {
            id: '1789676645',
            name: '罗兰Roland电钢琴PHA-50',
            desc: '官方标配 + 原装进口',
            imgurl: 'http://musicdo.cn/Upload/3134/20180518143141.png'
          },
          btns: [
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        },
        {
          item: {
            id: '3649034125',
            name: '星海凯旋 立式钢琴 K系列 K-119',
            desc: '官方标配 + 原装进口',
            imgurl: 'http://musicdo.cn/Upload/3134/20171212155316.jpg'
          },
          btns: [
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32'
            }
          ]
        }
      ]
    }
  },
  created () {
    this.activeIndex = -1
  },
  methods: {
    onPullingDown () {
      console.log('下拉刷新')
      // Mock async load.
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // If have new data, just update the data property.
          this.cartData.unshift('I am new data: ' + +new Date())
          console.log(this.cartData)
        } else {
          // If no new data, you need use the method forceUpdate to tell us the load is done.
          this.$refs.scroll.forceUpdate()
          console.log('已是最新数据')
        }
      }, 1000)
    },
    onItemClick (item) {
      console.log('click item:', item)
    },
    onBtnClick (btn, index) {
      if (btn.action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: () => {
            this.swipeData.splice(index, 1)
          }
        }).show()
      } else {
        this.$refs.swipeItem[index].shrink()
      }
    },
    onItemActive (index) {
      if (index === this.activeIndex) {
        return
      }
      if (this.activeIndex !== -1) {
        const activeItem = this.$refs.swipeItem[this.activeIndex]
        activeItem.shrink()
      }
      this.activeIndex = index
    }
  },
  components: {
    Tab,
    empty
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'cart.styl'
.cart
  .cartCon
    position fixed
    top 0
    bottom $g-bot-bar-height*2
    width 100%
    max-width $g-page-max-width
  .cart-empty
    height 100%
  .cart-list
    .item
      margin-top 1px
      width 100%
      height 100px
      background-color $g-bgc-con
  .item-inner
    margin-bottom 1px
    display flex
    padding 1rem 1.5rem
    background-color $g-bgc-con
    .icon
      flex 0 0 80px
      padding-right 1rem
    .text
      flex 1
      h2
        width 80%
        font-size $g-fs-normal
        color $g-fc-black
        no-wrap()
      p
        padding-top 0.75rem
        font-size $g-fs-normal
        color $g-fc-gray
        no-wrap()
  .count
    z-index 300
    position fixed
    bottom $g-bot-bar-height
    display flex
    width 100%
    max-width $g-page-max-width
    height $g-bot-bar-height
    background-color $g-bgc-con
    border-top 1px solid $g-brc-default
    border-bottom 1px solid $g-brc-default
    line-height $g-bot-bar-height
    .check-all
      flex 1
      font-size $g-fs-xl
    .count-all
      flex 1
      font-size $g-fs-xl
      color $g-fc-normal
    .btn-count
     flex 0 0 11rem
     height $g-bot-bar-height
     line-height $g-bot-bar-height
     background-color $g-bgc-btn-red
     text-align center
     font-size $g-fs-xxl
     color $g-fc-white
</style >
