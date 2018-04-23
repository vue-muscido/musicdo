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
                >综合{{retSearchData.length > 0 ? '(' + retSearchData.length + ')' : '(' + 0 + ')'}}</span >
                <i >
                  <img src="" />
                </i >
                <i class="on-v" >
                  <img src="" />
                </i >

                <!--<div class="dropdown-list" >-->
                  <!--<ol >-->
                    <!--<li class="act" >综合</li >-->
                    <!--<li >最新上架</li >-->
                    <!--<li >xxx</li >-->
                    <!--<li >yyy</li >-->
                  <!--</ol >-->
                <!--</div >-->
                <!--<div class="sup-tc" ></div >-->
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
            :options="options"
            @pulling-up="onPullingUp" >

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
                      <span >￥</span ><span class="int-num" >{{item.MemberPrice.toFixed(2)}}</span >
                      <!--<span class="fl-num" >00</span >-->
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

    <transition name="fade" >
      <div class="mask" v-show="screening" @click="_screening(false)" ></div >
    </transition >


    <transition name="slide" >
      <div class="fix-screen-list" v-show="screening" >
        <div class="container" >
          <div class="row" >
            <dl class="price-range" >
              <dt ><h3 >价位</h3 ></dt >
              <dd >
                <div class="" >价格区间(元)</div >
                <div class="input-box" >
                  <input type="number" placeholder="最低价" v-model="screenData.price_min" />
                </div >
                <span >-</span >

                <div class="input-box" >
                  <input type="number" placeholder="最高价" v-model="screenData.price_max" />
                </div >
              </dd >
            </dl >

            <dl class="sort-item" v-if="screenBrandsData.length" >
              <dt ><h3 >品牌</h3 ><div class="obtn" ></div ></dt >
              <dd >
                <ul class="" >
                  <li
                    :class="screenBrandActIndex === index?'act':''"
                    v-for="(item,index) in screenBrandsData"
                    :key="index"
                    @click="isBrandAct(index,item.ID)" >
                    <a >{{item.Name}}</a >
                  </li >
                </ul >
              </dd >
            </dl >

            <dl class="sort-item" v-if="screenCategoryData.length" >
              <dt ><h3 >类别</h3 ><div class="obtn" ></div ></dt >
              <dd >
                <ul class="" >
                  <li
                    :class="screenCategoryActIndex === index?'act':''"
                    v-for="(item,index) in screenCategoryData"
                    :key="index"
                    @click="isCategoryAct(index,item.ID)" >
                    <a >{{item.Name}}</a >
                  </li >
                </ul >
              </dd >
            </dl >

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
          <div class="cancel-btn" @click="confirmScreen(false)" >取消</div >
          <div class="ok-btn" @click="confirmScreen(true)" >确定</div >
        </div >
      </div >
    </transition >

    <loading v-show="isLoading" title="正在载入..." ></loading >
    <!--<cube-popup type="my-popup" :center="false" ref="tipsPopup" >-->
    <!--{{popupText}}-->
    <!--</cube-popup >-->
    <!--<cube-button @click="showToastType">Toast - type</cube-button>-->
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
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '',
            noMore: '加载完成'
          }
        }
      },
      screenActIndex: 0,
      screenBrandActIndex: '',
      screenCategoryActIndex: '',
      isSalesVolumeUp: false,
      isPriceUp: false,
      screening: false,
      isScroll: false,
      retSearchData: this.searchData,
      sortType: 2,
      screenData: {
        keyword: this.searchKeyword || '',
        // categoryID: '',
        // price_min: '',
        // price_max: '',
        // brandID: '',
        sort: this.sortType || ''
        // pageIndex: 1,
        // pageSize: 20
      },
      screenBrandsData: {},
      screenCategoryData: {},
      isLoading: false,
      popupText: '已无更多',
      ImgSize: 88
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
    this.getImgSize()
    this.setImgSize()
    this.watchAPPresize()
  },
  updated () {},
  mounted () {},
  methods: {
    _toSearch (productData) { // 搜索
      this.options.pullUpLoad.txt.noMore = '正在加载'
      this.isLoading = true
      // productData.keyword = this.searchKeyword
      // this.screenData = Object.assign({}, {}, productData)
      let oParams = Object.assign({}, this.screenData, productData)
      this.screenData = oParams
      console.log('oParams', oParams)
      console.log('this.screenData', this.screenData)
      searchProduct(oParams).then((res) => { // 传入参数
        if (ERR_OK === res.Code) {
          if (res.ReturnData.length > 0) {
            console.log('res.ReturnData.length', res.ReturnData.length)
            this.retSearchData = res.ReturnData // 存搜索所得数据
            // this.showList = true
            this.options.pullUpLoad.txt.noMore = '加载更多'
            this.isLoading = false
            console.log(this.retSearchData)
          } else {
            console.log('暂无数据，请进行其他搜索')
            console.log('res.ReturnData.length', res.ReturnData.length)
            this.retSearchData = {}
            // this.showList = false
            this.options.pullUpLoad.txt.noMore = '已无更多'
            this.isLoading = false
            this.showToast('暂无数据，请进行其他搜索', 3000)
          }
        }
      })
    },
    _GetBrandAndCategoryByKeyword () { // TODO 筛选项目
      let params = {
        type: 1,
        content: this.searchKeyword
      }
      GetBrandAndCategoryByKeyword(params).then((res) => {
        if (ERR_OK === res.Code) {
          this.screenBrandsData = res.ReturnData.Brand
          this.screenCategoryData = res.ReturnData.Category
        }
      })
    },
    getImg (img) { // 请求的图片路径补全
      return LOCAL_HOST + img
    },
    getImgSize () {
      this.$nextTick(function () {
        if (this.retSearchData.length > 0) {
          if (this.listMode) {
            this.ImgSize = this.$refs.img[0].clientWidth
            console.log(this.ImgSize)
            //            return this.ImgSize
          } else {
            this.ImgSize = this.$refs.img[0].clientWidth
            console.log(this.ImgSize)
            //            return this.ImgSize
          }
        } else {
          console.log('无数据，不进行渲染')
          //          this.showToast('暂无数据，请搜索其他商品')
        }
      })
    },
    setImgSize () { // 设置图片宽高
      this.$nextTick(function () {
        let that = this.$refs.img
        if (this.listMode) {
          //          let setSize = this.getImgSize()
          let setSize = this.ImgSize
          console.log('setSize', setSize)
          this.$refs.img.forEach(function (v, k) {
            that[k].style.height = setSize + 'px'
            // that[k].style.width = '100%'
            that[k].style.width = ''
          })
        } else {
          //          let setSize = this.getImgSize()
          let setSize = this.ImgSize
          console.log('setSize', setSize)
          this.$refs.img.forEach(function (v, k) {
            that[k].style.height = setSize + 'px'
            that[k].style.width = '100%'
          })
        }
      })
    },
    isAct (index) { // 选中状态（点击综合，价格，销量，筛选等按钮的选中状态）
      this.screenActIndex = index
      if (this.screenActIndex === 1) { // 销量
        this.isScroll = false
        this._isSalesVolumeUp(this.isSalesVolumeUp)
      } else if (this.screenActIndex === 2) { // 价格
        this.isScroll = false
        this._isPriceUp(this.isPriceUp)
      } else if (this.screenActIndex === 3) { // 开启悬浮筛选框
        this.isScroll = false
        this._screening(true)
      } else { // 综合
        this.isScroll = false
        this._toSearch({
          sort: 2,
          pageSize: this.retSearchData.length
        })
      }
    },
    _isSalesVolumeUp (flag) { // 销量排序（传入true-排序为4，传入false-排序为3）
      //        销量升序 = 3,
      //        销量降序 = 4
      if (flag) {
        this._toSearch({
          sort: 4,
          pageSize: this.retSearchData.length
        })
        this.sortType = 4
        console.log('down')
      } else {
        this._toSearch({
          sort: 3,
          pageSize: this.retSearchData.length
        })
        this.sortType = 3
        console.log('up')
      }
      this.isSalesVolumeUp = !flag
      this.isPriceUp = false
    },
    _isPriceUp (flag) { // 价格排序（传入true-排序为2，传入false-排序为1）
      //        价格升序 = 1,
      //        价格降序 = 2,
      if (flag) {
        this._toSearch({
          sort: 2,
          pageSize: this.retSearchData.length
        })
        this.sortType = 2
        console.log('down')
      } else {
        this._toSearch({
          sort: 1,
          pageSize: this.retSearchData.length
        })
        this.sortType = 1
        console.log('up')
      }
      this.isPriceUp = !flag
      this.isSalesVolumeUp = false
    },
    _screening (flag) { // TODO （传入true-显示，传入false-隐藏）
      if (flag) {
        this._GetBrandAndCategoryByKeyword()
        this.screening = true
      } else {
        this.screenBrandActIndex = ''
        this.screenCategoryActIndex = ''
        this.screening = false
      }
    },
    isBrandAct (index, brandID) {
      this.screenData.brandID = brandID
      this.screenBrandActIndex = index
    },
    isCategoryAct (index, categoryID) {
      this.screenData.categoryID = categoryID
      this.screenCategoryActIndex = index
    },
    confirmScreen (flag) { // 筛选确认按钮（传入true-确定，传入false-取消）
      if (flag) {
        // this.screenData = {
        this.screenData.brandID = this.screenData.brandID || ''
        this.screenData.categoryID = this.screenData.categoryID || ''
        this.screenData.pageSize = 20
        this._toSearch(this.screenData)
        this.getImgSize()
        this.setImgSize()
      } else {
        this.screenData = {
          keyword: this.searchKeyword || '',
          brandID: this.screenData.brandID || '',
          categoryID: this.screenData.categoryID || '',
          price_min: this.screenData.price_min || '',
          price_max: this.screenData.price_max || '',
          sort: this.sortType || ''
          // pageIndex: 1,
          // pageSize: 20
        }
        this.getImgSize()
        this.setImgSize()
        //        this.screenData.brandID = ''
        //        this.screenData.categoryID = ''
        //        this.screenData.price_min = ''
        //        this.screenData.price_max = ''
        //        this.screenData.pageSize = this.retSearchData.length || 20
      }
      this.screening = false
    },
    gotoDetail (id) { // 跳转详情页
      this.$router.push({
        path: '/goods-detail',
        query: {'goodsId': id}
      })
    },
    onPullingUp () { // 上拉加载
      this.isScroll = true
      this._toSearch({
        sort: this.sortType,
        pageSize: this.addItemLen(10)
      })
      setTimeout(() => {
        console.log(this.retSearchData)
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    addItemLen (n) { // 添加上拉加载个数（传入n-每次额外添加的个数）
      let len = this.retSearchData.length
      let addLen = len + n
      return addLen
    },
    showToast (tipsTxt, time = 1000) { // 提示
      const toast = this.$createToast({
        txt: tipsTxt,
        type: 'correct',
        time: time
      })
      toast.show()
    },
    //    _senListMode () {
    //      this.$emit()
    //    },
    watchAPPresize () {
      window.addEventListener('resize', () => {
        this.getImgSize()
        this.setImgSize()
      })
    }
  },
  watch: {
    retSearchData (newVal, oldVal) {
      if (newVal.length === oldVal.length && this.isScroll) {
        this.showToast('全部加载完成')
        this.options.pullUpLoad.txt.noMore = '已无更多'
      } else {
        this.retSearchData = newVal
        // this.options.pullUpLoad.txt.noMore = '上拉加载'
      }
      this.getImgSize()
      this.setImgSize()
    },
    listMode (val) {
      console.log(this.listMode)
      console.log(val)
      this.getImgSize()
      this.setImgSize()
    }
  },
  computed: {},
  destroyed () {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'search-list.styl'

</style >
