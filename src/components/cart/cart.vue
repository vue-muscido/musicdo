<template >
  <div class="cart">
    <!-- 商品列表容器 -->
    <div class="cartCon">
      <div v-if="cartData.length" class="edit-all">
          <div class="msg-btn">
            <img src="./img/xiaoxi@2x.png" />
          </div >
          <div @click="editAll" class="btn-edit-all">{{editText}}</div>
      </div>
      <div class="scroll">
        <cube-scroll
        ref="scroll"
        :data="cartData"
        :options="options"
        @pulling-down="onPullingDown">
        <div v-if="shop.list.length" v-for="(shop, top) in cartData" :key="shop.shopName" class="shop-con">
          <div class="shop-title">
            <div class="shop">
              <cube-checkbox class="shop-check" v-model="shop.checked">
                <span>{{shop.shopName}}</span>
              </cube-checkbox>
              <div @click="chooseShopGoods(top)" class="btn-shop"></div>
            </div>
            <div class="btn-shop-edit">
              <span></span>
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
                    <div v-if="editFlag" class="actions">
                      <div class="action-type">
                        <div class="type-text">官方标配 + 原装进口xcxcxcxcxca</div>
                      </div>
                      <div class="action-num">
                        <span class="reduce" v-on:click="numChange(top, index, -1)" v-bind:class="{ 'disable' : data.item.num==1 }">－</span>
                        <div class="isinput" v-bind:data-realStock="data.item.realStock">
                          {{data.item.num}}
                        </div>
                        <span class="add" v-on:click="numChange(top, index, 1)" v-bind:class="{ 'disable' : data.item.num===data.item.realStock}">＋</span>
                      </div>
                    </div>
                    <div v-if="!editFlag" class="options" @click="onItemClick(data.item, index)">
                      <h2 class="item-name" v-html="data.item.name"></h2>
                      <p class="item-desc" v-html="data.item.desc"></p>
                      <div class="price-box">
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
        <empty v-if="!cartData.length" class="cart-empty" :emptyStr='notGoodsMsg' :dataType='dataTypeMsg'></empty >
        <!-- 购买跳转 -->
        <div v-if="!cartData.length" @click="goBuy()" class="go-buy">
          去添加
        </div>
      </cube-scroll>
      </div>
    </div>
    <!-- 结算栏 -->
    <div v-if="cartData.length" class="count">
      <div class="check-all">
        <cube-checkbox v-model="allChecked">
          <span>全选</span>
        </cube-checkbox>
        <div @click="chooseAllGoods()" class="btn-all"></div>
      </div>
      <div v-if="!editFlag" class="count-all">
        合计:
        <span :class="{fred: payAll > 0}">¥{{payAll}}.00</span>
      </div>
      <div v-if="!editFlag" class="btn-count" :class="{bgred: payAll > 0}">
        结算<span></span>
      </div>
      <div v-if="editFlag" @click="editAction ('start')" class="btn-start" :class="{bgyellow: payAll > 0}">收藏</div>
      <div v-if="editFlag" @click="editAction ('delete')" class="btn-delete" :class="{bgred: payAll > 0}">删除</div>
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
      editFlag: false,
      editText: '编辑',
      notGoodsMsg: '购物车空空的，先去添加商品吧~',
      dataTypeMsg: '1',
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
                realStock: 8,
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
                realStock: 3,
                price: 2400,
                num: 2
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
                realStock: 5,
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
    // 定位选择的店铺
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
    // 更改商品个数
    numChange (top, index, numChange) {
      var list = this.cartData[top]['list']
      var goods = list[index]['item']
      if (numChange === 1) {
        goods.num++
      } else if (numChange === -1) {
        goods.num--
      }
      if (goods.num <= 1) {
        goods.num = 1
      }
      if (goods.num >= goods.realStock) {
        goods.num = goods.realStock
      }
    },
    // 点击商品 查看详情
    onItemClick (item) {
      console.log('click item:', item)
    },
    // 单个商品删除/收藏操作
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
            this.showToastType('删除成功', 'correct')
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
        this.cartData[this.selectTop].list.splice(index, 1)
        this.showToastType('收藏成功', 'correct')
        if (this.cartData[this.selectTop].list.length === 0) {
          this.cartData.splice(this.selectTop, 1)
        }
      }
    },
    //  切换编辑状态
    editAll () {
      this.editFlag = !this.editFlag
      if (this.editFlag) {
        this.editText = '完成'
      } else {
        this.editText = '编辑'
        this.showToastType('编辑成功', 'correct')
      }
    },
    // 编辑状态删除
    deleteSelect () {
      for (var i = this.cartData.length - 1; i >= 0; i--) {
        var list = this.cartData[i]['list']
        for (var k = list.length - 1; k >= 0; k--) {
          if (list[k]['checked'] === true) {
            this.cartData[i].list.splice(k, 1)
          }
        }
        if (this.cartData[i].list.length === 0) {
          this.cartData.splice(i, 1)
        }
      }
      this.showToastType('删除成功', 'correct')
    },
    // 编辑状态收藏
    startSelect () {
      for (var i = this.cartData.length - 1; i >= 0; i--) {
        var list = this.cartData[i]['list']
        for (var k = list.length - 1; k >= 0; k--) {
          if (list[k]['checked'] === true) {
            this.cartData[i].list.splice(k, 1)
          }
        }
        if (this.cartData[i].list.length === 0) {
          this.cartData.splice(i, 1)
        }
      }
      this.showToastType('收藏成功', 'correct')
    },
    // 删除多个商品操作
    editAction (action) {
      if (action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: () => {
            this.deleteSelect()
          },
          onCancel: () => {
            for (var i = 0; i < this.$refs.swipeItem.length; i++) {
              this.$refs.swipeItem[i].shrink()
            }
          }
        }).show()
      } else {
        this.startSelect()
      }
    },
    onItemActive (index) {
      this.activeIndex = index
    },
    // 去购买
    goBuy () {
      this.$router.push({
        path: '/home'
      })
    },
    // 提示框
    showToastType (text, type) {
      const toast = this.$createToast({
        txt: text,
        type: type,
        time: 500
      })
      toast.show()
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
