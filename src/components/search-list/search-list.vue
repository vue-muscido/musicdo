<template >
  <div class="search-list" >
    <div class="inner" >
      <!--顶栏 begin -->
      <!--<div class="top-bar" >-->
      <!--<form class="search-form" action="#" >-->
      <!--<input id="main-search-input"-->
      <!--class="search-input"-->
      <!--v-model="$route.query.keyword"-->
      <!--:placeholder="mainSearch.placeholder"-->
      <!--:type="mainSearch.type"-->
      <!--:maxlength="mainSearch.maxlength"-->
      <!--:readonly="mainSearch.readonly"-->
      <!--:disabled="mainSearch.disabled"-->
      <!--:autofocus="mainSearch.autofocus"-->
      <!--:autocomplete="mainSearch.autocomplete"-->
      <!--:clearable="mainSearch.clearable"-->
      <!--@focus="_focus()"-->
      <!--&gt;-->
      <!--</form >-->
      <!--<div class="change-btn"-->
      <!--:class="listMode == true?'list-mode':'bigpic-mode'"-->
      <!--@click="_changeMode()" >-->
      <!--<div class="img" ></div >-->
      <!--</div >-->
      <!--</div >-->
      <!--顶栏 end -->
      <dl >
        
        <dt class="screen-tab" >
          <!--筛选分类导航 -begin-->
          <div class="screen-title" >
            <ul >
              <li class="comprehensive" >
                <span >综合</span >
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

              <li class="sales-volume" >
                <span >销量</span >
              </li >
              
              <li class="price donw" >
                <span >价格</span >
                <i class="donw" >
                  <img src="./img/gao@2x.png" />
                </i >
                <i class="up" >
                  <img src="./img/di@2x.png" />
                </i >
              </li >
              
              <li class="screen" >
                <span >筛选</span >
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
            @pulling-down="onPullingDown" >
            
            <ul class="search-products bigpic-mode" >
              <!--<ul class="search-products list-mode">-->
              <li v-if="searchData.length" v-for="(item,index) in searchData" :key="index" >
                <div class="item-inner" >
                  <div class="imgbox" >
                    <a href="" >
                      <img :src="getImg (item.SrcDetail)" />
                    </a >
                  </div >
                  <div class="infobox" >
                    <p class="title" >
                      <a href="" >{{item.Name}}</a >
                    </p >
                    <div class="price" >
                      <span >￥</span ><span class="int-num" >{{item.MemberPrice}}.</span ><span
                      class="fl-num" >00</span >
                    </div >
                    <div class="sales" >
                      <span >月销售<span class="sales-num" >{{item.Score}}</span ></span >
                    </div >
                    <!--<div class="address" >-->
                    <!--<span >深圳</span >-->
                    <!--</div >-->
                  </div >
                </div >
              </li >
            </ul >
            
          </cube-scroll >
          
          
          
        </dd >
        
        
        
      </dl >
      
    </div >
  </div >
</template >

<script type="text/ecmascript-6" >
import { searchProduct } from 'api/searchData'
import { ERR_OK, baseImgUrl } from 'api/config'
export default {
  data () {
    return {
      //      mainSearch: {
      //        placeholder: '请输入要搜索的内容',
      //        type: 'search',
      //        readonly: false, // 只读
      //        maxlength: 100, // 字数限制
      //        disabled: false, // 禁用
      //        autofocus: false, // 自动聚焦
      //        autocomplete: false, // 自动补全
      //        clearable: false // 清除按钮
      //      },
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新222222222222222'
        }
      },
      listMode: false,
      searchData: []
    }
  },
  created () {
    console.log(this.searchData)
    this._toSearch('')
  },
  mounted () {},
  methods: {
    getImg (img) {
      return baseImgUrl + img
    },
    _changeMode () {
      this.listMode = !this.listMode
    },
    // 聚焦时路由跳转与传参
    _focus () {
      //      this.$router.push({
      //        path: '/main-search',
      //        query: {'keyword': this.$route.query.keyword}
      //      })
    },
    _toSearch (val) {
      let productData = {} // 定义一个空对象
      productData.keyword = val // 定义此对象的 keyword
      searchProduct(productData).then((res) => { // 把对象（keyword）传入
        if (ERR_OK === res.Code) {
          this.searchData = res.ReturnData // 存搜索所得数据
        }
      })
    },
    onPullingDown () {
      console.log(111111111111111)
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          console.log(this.searchData)
          console.log(2222222222222)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
          console.log(3333333333333)
        }
      }, 1000)
    }
  },
  watch: {
    //    '$route' () {
    //      this._toSearch(this.$route.query.keyword)
    //    }
  },
  computed: {},
  destroyed () {
    //    this.searchData = []
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'search-list.styl'

.cube-scroll-wrapper
  height: 500px
</style >
