<template >
  <div class="cart">
    <!-- 商品列表容器 -->
    <div class="cartCon">
      <cube-scroll
        ref="scroll"
        :data="cartData"
        :options="options"
        @pulling-down="onPullingDown">
        <div v-if="shop.list.length" v-for="(shop, top) in cartData" :key="shop.shopName" class="shop-con">
          <div class="shop-title">
            <div  @click.stop="chooseShopGoods(top)" class="shop">
              <cube-checkbox class="shop-check" v-model="shop.checked">
              <span>{{shop.shopName}}</span>
            </cube-checkbox>
            </div>
            <div class="btn-shop-edit">
              <span>编辑</span>
            </div>
          </div>
           <cube-swipe>
            <transition-group name="swipe" tag="ul">
               <!-- 商品列表 -->
              <li class="swipe-item-wrapper" v-for="(data, index) in shop.list" :key="data.item.id">
                <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick"
                    @active="onItemActive">
                  <div class="item-inner">
                    <div @click.stop="choose (top, index)" class="choose">
                      <cube-checkbox class="check" v-model="data.checked">
                        <div></div>
                      </cube-checkbox>
                    </div>
                    <div class="icon">
                      <img @click="onItemClick(data.item, index)" :src="data.item.imgurl">
                    </div>
                    <div @click="onItemClick(data.item, index)" class="text">
                      <h2 class="item-name" v-html="data.item.name"></h2>
                      <p class="item-desc" v-html="data.item.desc"></p>
                      <div class="options">
                        <div class="price">
                          <span>¥{{data.item.price*data.item.num}}</span>.00
                        </div>
                        <div class="num">
                          x{{data.item.num}}
                        </div>
                      </div>
                    </div>
                  </div>
                </cube-swipe-item>
              </li>
            </transition-group>
          </cube-swipe>
        </div>
        <div>{{newshopList}}</div>
        <div>{{newcheckList}}</div>
        <!-- 未添加商品提示 -->
        <empty class="cart-empty" v-if="!cartData.length" :emptyStr='notGoodsMsg' :dataType='dataTypeMsg'></empty >
      </cube-scroll>
    </div>
    <!-- 结算栏 -->
    <div class="count">
      <div class="check-all">
        <cube-checkbox >
          <span>全选</span>
        </cube-checkbox>
      </div>
      <div class="count-all">
        <span>合计:</span>
        <span>¥{{payAll}}</span>.00
      </div>
      <div class="btn-count">
        结算<span></span>
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
      shopList: [],
      checkList: [],
      payAll: 0,
      notGoodsMsg: '购物车空空的，先去添加商品吧~',
      dataTypeMsg: '1',
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '数据已更新'
        }
      },
      cartData: [
        {
          shopName: '钢琴旗舰店',
          list: [
            {
              item: {
                id: '3646653877',
                name: '威斯曼WEISMANN 数码钢琴 MET-8G钢琴，优雅大气,最纯粹的音质，最优雅的气质，最自然的音色',
                desc: '官方标配 + 原装进口',
                imgurl: 'http://musicdo.cn/Upload/0/201710237239.jpg',
                price: 18000,
                num: 1
              },
              btns: [
                {
                  action: 'star',
                  text: '移入收藏',
                  color: 'rgba(255,169,4,1)'
                },
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ]
            }
          ]
        },
        {
          shopName: '吉他旗舰店',
          list: [
            {
              item: {
                id: '1789676645',
                name: '罗兰Roland电钢琴PHA-50',
                desc: '官方标配 + 原装进口',
                imgurl: 'http://musicdo.cn/Upload/3134/20180518143141.png',
                price: 2400,
                num: 10000
              },
              btns: [
                {
                  action: 'star',
                  text: '移入收藏',
                  color: 'rgba(255,169,4,1)'
                },
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
                imgurl: 'http://musicdo.cn/Upload/3134/20171212155316.jpg',
                price: 5600,
                num: 1
              },
              btns: [
                {
                  action: 'star',
                  text: '移入收藏',
                  color: 'rgba(255,169,4,1)'
                },
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    newshopList: function () {
      return this.cartData[0]
    },
    newcheckList: function () {
      return this.cartData[1]
    }
  },
  watch: {
  },
  created () {
    this.activeIndex = -1
  },
  methods: {
    tio () {
      console.log('ddd')
    },
    // 每个店铺全选
    chooseShopGoods (top) {
      var cartObj = this.cartData
      var list = this.cartData[top]['list']
      var len = list.length
      if (typeof cartObj[top]['checked'] === 'undefined') {
        this.$set(cartObj[top], 'checked', true)
      } else {
        cartObj[top]['checked'] = !cartObj[top]['checked']
      }
      if (cartObj[top]['checked']) {
        for (var i = 0; i < len; i++) {
          list[i]['checked'] = true
        }
      } else {
        for (var j = 0; j < len; j++) {
          list[j]['checked'] = false
        }
      }
    },
    // 单个选择
    choose (top, index) {
      var list = this.cartData[top]['list']
      if (typeof list[index].checked === 'undefined') {
        this.$set(list[index], 'check', true)
      } else {
        list[index].checked = !list[index].checked
      }
    },
    selectItem () {
      console.log('laal')
    },
    // 下拉刷新
    onPullingDown () {
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
    // 点击商品 查看详情
    onItemClick (item) {
      console.log('click item:', item)
    },
    // 单个商品移入购物车操作
    // 删除单个商品操作
    onBtnClick (btn, index) {
      if (btn.action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: () => {
            this.cartData[1].list.splice(index, 1)
            this.checkList.splice(index, 1)
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

</style >
