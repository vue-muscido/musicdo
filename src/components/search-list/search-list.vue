<template >
  <div class="search-list" >
    <div class="inner" >
      <dl >

        <dt class="screen-tab" >
          <!--筛选分类导航 -begin-->
          <div class="screen-title" >
            <ul >
              <li class="comprehensive" @click="isAct(0)" >
                <span class="tit"
                      :class="screenActIndex == 0?'act':''"
                >综合</span >
                <i >
                  <img src="" />
                </i >
                <i class="on-v" >
                  <img src="" />
                </i >

                <div class="dropdown-list" >
                  <ol >
                    <li class="act" >综合</li >
                    <li >最新上架</li >
                    <li >xxx</li >
                    <li >yyy</li >
                  </ol >
                </div >
                <div class="sup-tc" ></div >
              </li >

              <li class="sales-volume" :class="isSalesVolumeUp?'up':'donw'" @click="isAct(1)" >
                <span class="tit"
                      :class="screenActIndex == 1?'act':''"
                >销量</span >
                <i class="donw" >
                  <img src="./img/gao@2x.png" />
                </i >
                <i class="up" >
                  <img src="./img/di@2x.png" />
                </i >
              </li >

              <li class="price" :class="isPriceUp?'up':'donw'" @click="isAct(2)" >
                <span class="tit"
                      :class="screenActIndex == 2?'act':''"
                >价格</span >
                <i class="donw" >
                  <img src="./img/gao@2x.png" />
                </i >
                <i class="up" >
                  <img src="./img/di@2x.png" />
                </i >
              </li >

              <li class="screen" @click="isAct(3)" >
                <span class="tit"
                      :class="screenActIndex == 3?'act':''"
                >筛选</span >
              </li >

            </ul >
          </div >
          <!--筛选分类导航 -end-->
        </dt >

        <dd class="products" >

          <cube-scroll
            ref="scroll"
            :data="searchData"
            :options="options" >

            <!--<ul class="search-products list-mode">-->
            <ul class="search-products"
                :class="listMode == true?'list-mode':'bigpic-mode'" >
              <li v-for="(item,index) in retSearchData" :key="index" @click="gotoDetail(item.ID)" >
                <div class="item-inner" >

                  <div class="imgbox" ref="imgbox" >
                    <a >
                      <img v-lazy="getImg (item.SrcDetail)" ref="img" />
                    </a >
                  </div >

                  <div class="infobox" >
                    <p class="title" >
                      <a >{{item.Name}}</a >
                    </p >
                    <div class="price" >
                      <span >￥</span ><span class="int-num" >{{item.MemberPrice}}.</span ><span
                      class="fl-num" >00</span >
                    </div >
                    <div class="sales" >
                      <span >月销售<span class="sales-num" >{{item.Score}}</span ></span >
                    </div >
                  </div >

                </div >
              </li >
            </ul >

          </cube-scroll >

        </dd >

      </dl >

    </div >
    
    <transition name="fade">
      <div class="mask" v-show="screening" @click="_screening(false)" ></div >
    </transition>
    
    
    <transition name="slide">
      <div class="fix-screen-list" v-show="screening" >
        <div class="container" >
          <div class="row" >
            <dl class="price-range" >
              <dt ><h3 >价位</h3 ></dt >
              <dd >
                <div class="" >价格区间(元)</div >
                <div class="input-box" >
                  <input type="number" placeholder="最低价" />
                </div >
                <span >-</span >
  
                <div class="input-box" >
                  <input type="number" placeholder="最高价" />
                </div >
              </dd >
            </dl >
  
            <dl class="sort-item" >
              <dt ><h3 >品牌</h3 ><div class="obtn" ></div ></dt >
              <dd >
                <ul class="" >
                  <li class="act" >
                    <a >博兰斯勒勒勒勒勒勒勒勒勒勒勒勒勒勒</a >
                  </li >
                  <li >
                    <a >雅马哈哈哈哈哈哈哈哈</a >
                  </li >
                  <li >
                    <a >欧米勒勒勒勒</a >
                  </li >
                  <li >
                    <a >博兰斯勒</a >
                  </li >
                  <li >
                    <a >雅马哈</a >
                  </li >
                  <li >
                    <a >欧米勒</a >
                  </li >
                </ul >
              </dd >
            </dl >
            <!--<dl class="sort-item">-->
            <!--<dt><h3>款式</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>立式</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>三角式</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>便携式</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>键数</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>88键</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>108键</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>128键</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>高度</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>1m</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>1.2m</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>1.25m</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>1.5m</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>适用对象</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>初学者</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>家庭教学</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>专业演奏</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>折扣服务</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>包邮</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>积分</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>折扣服务</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>包邮</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>积分</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
            <!--<dl class="sort-item">-->
            <!--<dt><h3>折扣服务</h3><div class="obtn"></div></dt>-->
            <!--<dd>-->
            <!--<ul class="">-->
            <!--<li>-->
            <!--<a>包邮</a>-->
            <!--</li>-->
            <!--<li>-->
            <!--<a>积分</a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</dd>-->
            <!--</dl>-->
  
            <dl class="sort-item" >
              <dt ><h3 >发货地</h3 ><div class="obtn" ></div ></dt >
              <dd class="sort-item-address" >
                <ul class="" >
                  <li >
                    <a >广州</a ><span ></span ></li >
                </ul >
                <span class="reset-address" ></span >
              </dd >
            </dl >
  
          </div >
        </div >
        <div class="btnbox" >
          <div class="cancel-btn" >取消</div >
          <div class="ok-btn" >确定</div >
        </div >
      </div >
    </transition>
    
    <loading v-show="isLoading" title="正在载入..." ></loading >
  </div >
</template >

<script type="text/ecmascript-6" >
import { searchProduct, GetBrandAndCategoryByKeyword } from 'api/searchData'
import { LOCAL_HOST, ERR_OK } from 'api/config'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      },
      screenActIndex: 0,
      isSalesVolumeUp: false,
      isPriceUp: false,
      screening: false,
      retSearchData: this.searchData,
      isLoading: false
    }
  },
  // 接收父组件传入的值
  props: {
    searchKeyword: {
      type: String,
      default: ''
    },
    searchData: {
      type: Array,
      default: []
    },
    listMode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    loading
  },
  created () {
    //    console.log(this.searchData)
    //    this._toSearch('')
    console.log(this.searchKeyword)
    console.log(this.searchData)
    console.log(this.listMode)
    this.setImgHeight()
  },
  updated () {},
  mounted () {},
  methods: {
    _toSearch (productData) { // 传入参数
      this.isLoading = true
      productData.keyword = this.searchKeyword
      searchProduct(productData).then((res) => { // 传入参数
        if (ERR_OK === res.Code) {
          this.retSearchData = res.ReturnData // 存搜索所得数据
          this.showList = true
          this.isLoading = false
        }
      })
    },
    _GetBrandAndCategoryByKeyword () {
      let params = {
        type: 2,
        content: this.searchKeyword
      }
      GetBrandAndCategoryByKeyword(params).then((res) => {
        if (ERR_OK === res.Code) {
          console.log(res)
        }
      })
    },
    getImg (img) {
      return LOCAL_HOST + img
    },
    setImgHeight () {
      this.$nextTick(function () {
        console.log(this.$refs.imgbox)
        this.$refs.imgbox.forEach(function (v, k) {
          // TODO - 设置图片宽高相等
          //          console.log(v.clientWidth)
          //          console.log(v.clientHeight)
          //          console.log(k)
        })
      })
    },
    isAct (index) { // 选中状态
      this.screenActIndex = index
      if (this.screenActIndex === 1) { // 销量
        this._isSalesVolumeUp(this.isSalesVolumeUp)
      } else if (this.screenActIndex === 2) { // 价格
        this._isPriceUp(this.isPriceUp)
      } else if (this.screenActIndex === 3) { // 开启悬浮筛选框
        this._screening(true)
      } else { // 综合
        this._toSearch({})
      }
    },
    _isSalesVolumeUp (flag) { // 销量排序
      if (flag) {
        this._toSearch({sort: 4})
        console.log('down')
      } else {
        this._toSearch({sort: 3})
        console.log('up')
      }
      this.isSalesVolumeUp = !flag
      this.isPriceUp = false
    },
    _isPriceUp (flag) { // 价格排序
      if (flag) {
        this._toSearch({sort: 2})
        console.log('down')
      } else {
        this._toSearch({sort: 1})
        console.log('up')
      }
      this.isPriceUp = !flag
      this.isSalesVolumeUp = false
    },
    _screening (flag) { // TODO 筛选框
      console.log(this.searchData)
      console.log(2222222222222)
      this._GetBrandAndCategoryByKeyword()
      if (flag) {
        this.screening = true
      } else {
        this.screening = false
      }
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/goods-detail',
        query: {'goodsId': id}
      })
    }
  },
  watch: {
    retSearchData (val) {
      this.retSearchData = val
      console.log(this.retSearchData)
      console.log('searchData is change')
    }
  },
  computed: {},
  destroyed () {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'search-list.styl'

</style >
