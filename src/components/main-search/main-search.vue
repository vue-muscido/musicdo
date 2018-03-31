<template >
  <div class="main-search" >
    <div class="inner" >
      <div class="top-bar" >
        <form class="search-form" action="#" >
          <input id="main-search-input"
                 class="search-input"
                 v-model="mainSearch.value"
                 :placeholder="mainSearch.placeholder"
                 :type="mainSearch.type"
                 :maxlength="mainSearch.maxlength"
                 :readonly="mainSearch.readonly"
                 :disabled="mainSearch.disabled"
                 :autofocus="mainSearch.autofocus"
                 :autocomplete="mainSearch.autocomplete"
                 :clearable="mainSearch.clearable"
          >
        </form >
        <!--<div class="msg-btn">-->
        <!--<img src="./img/xiaoxi@2x.png" />-->
        <!--<p >消息</p >-->
        <!--</div >-->
        <div class="search-btn" >
          <span @click="_toSearch">搜索</span >
        </div >
      </div >
      <!--历史搜索 -begin -->
      <dl class="search-log" >
        <dt class="search-title" >
          <div class="title" >
            <span >历史搜索</span >
          </div >
          <div class="delete" ></div >
        </dt >
        <dd >
          <ul >
            <li >
              <a >吉他</a >
            </li >
          </ul >
        </dd >
      </dl >
      <!--历史搜索 -end -->
      <!--热门搜索 -begin -->
      <dl class="search-hot" v-if="this.hotSearchData.length">
        <dt class="search-title" >
          <div class="title" >
            <span >热门搜索</span >
          </div >
        </dt >
        <dd >
          <ul >
            <li v-for="(item,index) in this.hotSearchData" :key="index">
              <a >{{item.ShortName}}</a >
            </li >
          </ul >
        </dd >
      </dl >
      <!--热门搜索 -end -->
    </div >
  </div >
</template >

<script type="text/ecmascript-6" >
import { searchProduct } from 'api/searchData'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      mainSearch: {
        value: '',
        placeholder: '请输入要搜索的内容',
        type: 'search',
        readonly: false,
        maxlength: 100,
        disabled: false,
        autofocus: true,
        autocomplete: true,
        clearable: false
      },
      hotSearchData: []
    }
  },
  created () {
    this._hotSearch()
  },
  methods: {
    _hotSearch () {
      var oj = {}
      oj.keyword = '雅马哈'
      searchProduct(oj).then((res) => {
        if (ERR_OK === res.Code) {
          this.hotSearchData = res.ReturnData
          console.log(this.hotSearchData)
        }
      })
    },
    _toSearch () {
      var ooo = {}
      ooo.keyword = this.mainSearch.value
      searchProduct(ooo).then((res) => {
        if (ERR_OK === res.Code) {
          this.searchData = res.ReturnData
          console.log(this.searchData)
        }
      })
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'main-search.styl'
</style >
