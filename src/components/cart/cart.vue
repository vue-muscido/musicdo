<template >
  <div class="cart">
    <!-- 商品列表容器 -->
    <div class="cartCon">
      <cube-scroll
        ref="scroll"
        :data="cartData"
        :options="options"
        @pulling-down="onPullingDown">
        <div class="edit-all">
          <div class="msg-btn">
            <img src="./img/xiaoxi@2x.png" />
          </div >
          <div class="btn-edit-all">编辑</div>
        </div>
        <div v-if="shop.list.length" v-for="(shop, top) in cartData" :key="shop.shopName" class="shop-con">
          <div class="shop-title">
            <div class="shop">
              <cube-checkbox class="shop-check" v-model="shop.checked">
                <span>{{shop.shopName}}</span>
              </cube-checkbox>
              <div @click="chooseShopGoods(top)" class="btn-shop"></div>
            </div>
            <div class="btn-shop-edit">
              <span>编辑</span>
            </div>
          </div>
           <cube-swipe>
            <transition-group name="swipe" tag="ul">
               <!-- 商品列表 -->
              <li ref="swipeList" @touchstart="topSelect(index,top,$event)" class="swipe-item-wrapper" v-for="(data, index) in shop.list" :key="data.item.id">
                <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick"
                    @active="onItemActive">
                  <div class="item-inner">
                    <div class="choose">
                      <cube-checkbox class="check" v-model="data.checked">
                        <span></span>
                      </cube-checkbox>
                      <div @click="choose(top, index)" class="btn-choose"></div>
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
        <!-- 未添加商品提示 -->
        <empty class="cart-empty" v-if="!cartData.length" :emptyStr='notGoodsMsg' :dataType='dataTypeMsg'></empty >
      </cube-scroll>
    </div>
    <!-- 结算栏 -->
    <div class="count">
      <div class="check-all">
        <cube-checkbox v-model="allChecked">
          <span>全选</span>
        </cube-checkbox>
        <div @click="chooseAllGoods()" class="btn-all"></div>
      </div>
      <div class="count-all">
        合计:
        <span>¥{{payAll}}.00</span>
      </div>
      <div class="btn-count" :class="{isred: payAll > 0}">
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
      allChecked: false,
      checkList: [],
      selectTop: 0,
      selectItem: 0,
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
                  text: '收藏',
                  color: '#c8c7cd'
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
                  text: '收藏',
                  color: '#c8c7cd'
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
                  text: '收藏',
                  color: '#c8c7cd'
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
    payAll: function () {
      var allNum = 0
      for (var i = 0; i < this.cartData.length; i++) {
        var list = this.cartData[i]['list']
        for (var k = 0; k < list.length; k++) {
          if (list[k]['checked'] === true) {
            allNum += list[k].item.price * list[k].item.num
          }
        }
      }
      return allNum
    }
  },
  watch: {
  },
  created () {
    this.activeIndex = -1
  },
  methods: {
    topSelect (index, top, event) {
      this.selectTop = top
      var isIndex = 0
      for (var i = 0; i < top; i++) {
        isIndex += this.cartData[i]['list'].length
      }
      isIndex += index
      for (var j = 0; j < this.$refs.swipeItem.length; j++) {
        if (j !== isIndex) {
          this.$refs.swipeItem[j].shrink()
        }
      }
    },
    // 全部商品全选
    chooseAllGoods () {
      var flag = true
      if (this.allChecked) {
        flag = false
      }
      for (var i = 0; i < this.cartData.length; i++) {
        this.cartData[i]['checked'] = flag
        var list = this.cartData[i]['list']
        for (var k = 0; k < list.length; k++) {
          this.$set(list[k], 'checked', flag)
        }
      }
      this.allChecked = !this.allChecked
    },
    // 每个店铺全选方法
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
          this.$set(list[i], 'checked', true)
        }
      } else {
        for (var j = 0; j < len; j++) {
          this.$set(list[j], 'checked', false)
        }
      }
      // 判断是否选择所有商品的全选功能
      this.isChooseAll()
    },
    // 单个选择方法
    choose (top, index) {
      var cartObj = this.cartData
      var list = this.cartData[top]['list']
      var len = list.length
      if (list[index]['checked']) {
        this.allChecked = false
        this.$set(cartObj[top], 'checked', false)
        this.$set(list[index], 'checked', false)
      } else {
        this.$set(list[index], 'checked', true)

        // 判断是否选择当前店铺的全选
        var flag = true
        for (var i = 0; i < len; i++) {
          if (!list[i]['checked']) {
            flag = false
            break
          }
        }
        flag === true ? this.cartData[top]['checked'] = true : this.cartData[top]['checked'] = false
      }
      // 判断是否选择所有商品的全选功能
      this.isChooseAll()
    },
    //  判断是否选择所有商品的方法
    isChooseAll () {
      var flag1 = true
      for (var i = 0; i < this.cartData.length; i++) {
        if (!this.cartData[i]['checked'] === true) {
          flag1 = false
          break
        }
      }
      flag1 === true ? this.allChecked = true : this.allChecked = false
    },
    // 下拉刷新
    onPullingDown () {
      // Mock async load.
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // If have new data, just update the data property.
          console.log('已是最新数据')
          this.$refs.scroll.forceUpdate()
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
            this.cartData[this.selectTop].list.splice(index, 1)
            if (this.cartData[this.selectTop].list.length === 0) {
              this.cartData.splice(this.selectTop, 1)
            }
          },
          onCancel: () => {
            for (var i = 0; i < this.$refs.swipeItem.length; i++) {
              this.$refs.swipeItem[i].shrink()
            }
          }
        }).show()
      } else {
        for (var i = 0; i < this.$refs.swipeItem.length; i++) {
          this.$refs.swipeItem[i].shrink()
        }
      }
    },
    onItemActive (index) {
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
