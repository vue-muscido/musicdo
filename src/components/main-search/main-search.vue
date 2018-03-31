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
          <span @click="_toSearch(mainSearch.value)" >搜索</span >
        </div >
      </div >
      <!--历史搜索 -begin -->
      <dl class="search-log" v-if="historyData.length" >
        <dt class="search-title" >
          <div class="title" >
            <span >历史搜索</span >
          </div >
          <div class="delete" @click="_localremove ('historySearch')" ></div >
        </dt >
        <dd >
          <ul >
            <li v-for="(item,index) in historyData" :key="index" >
              <a @click="_toSearch (item)" >{{item}}</a >
            </li >
          </ul >
        </dd >
      </dl >
      <!--历史搜索 -end -->
      <!--热门搜索 -begin -->
      <dl class="search-hot" >
        <dt class="search-title" >
          <div class="title" >
            <span >热门搜索</span >
          </div >
        </dt >
        <dd v-if="hotSearchData.length" >
          <ul >
            <li v-for="(item,index) in hotSearchData" :key="index" >
              <a @click="_toSearch (item)" >{{item}}</a >
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
import { localSave, localTake, localremove } from 'common/js/localStore'
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
      historyData: [],
      hotSearchData: ['钢琴', '尤克里里', '吉他', '博兰斯勒', '德国', '鼓', '雅马哈', '欧米勒']
    }
  },
  created () {
    this._historyDataInit()
  },
  methods: {
    // 初始化历史搜索
    _historyDataInit () {
      this.historyData = this._localTake('historySearch') ? this._localTake('historySearch') : []
    },
    // 历史搜索去空去重设置
    _historyDataSet (val) {
      if (val.replace(/\s/g, '') !== '') {
        this.historyData.push(val)
        return Array.from(new Set(this.historyData))
      } else {
        return this.historyData
      }
    },
    // 本地保存
    _localSave (key, val) {
      localSave(key, val)
    },
    // 读取本地保存
    _localTake (key) {
      return localTake(key)
    },
    // 清除本地保存
    _localremove (key) {
      localremove(key)
      this.historyData = []
    },
    // 进行搜索
    _toSearch (val) {
      let productData = {} // 定义一个空对象
      productData.keyword = val // 定义此对象的 keyword
      searchProduct(productData).then((res) => { // 把对象传入
        if (ERR_OK === res.Code) {
          this.searchData = res.ReturnData // 存搜索所得数据
          this.historyData = this._historyDataSet(val) // 设置历史搜索
          this._localSave('historySearch', this.historyData) // 保存本地数据
        }
      })
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'main-search.styl'
</style >
