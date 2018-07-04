<template >
  <div class="main-search" >
    <div class="inner" >
      <div class="top-bar" >
        <form class="search-form" action="#" @submit.prevent="_toSearch(mainSearch.value)" >
          <!--@submit.prevent="_toSearch(mainSearch.value)"-->
          <input class="search-input"
                 ref="input"
                 v-model="mainSearch.value"
                 :placeholder="mainSearch.placeholder"
                 :type="mainSearch.type"
                 :maxlength="mainSearch.maxlength"
                 :readonly="mainSearch.readonly"
                 :disabled="mainSearch.disabled"
                 :autofocus="mainSearch.autofocus"
                 :autocomplete="mainSearch.autocomplete"
                 :clearable="mainSearch.clearable"
                 @focus="_focus()"
                 @keyup.13.prevent="_toSearch(mainSearch.value)" >
          <div class="search-icon" ></div >
        </form >
        <div class="search-btn" v-show="!showList" >
          <span @click="_replayceSearch(mainSearch.value)" >搜索</span >
        </div >
        <div class="change-btn"
             :class="listMode == true?'list-mode':'bigpic-mode'"
             @click="_changeMode()"
             v-show="showList" >
          <div class="img" ></div >
        </div >
      </div >

      <div class="quick-search" >
        <!--历史搜索 -begin -->
        <dl v-show="!showList" class="search-log" v-if="historyData.length" >
          <dt class="search-title" >
            <div class="title" >
              <span >历史搜索</span >
            </div >
            <div class="delete" @click="_localremove ('historySearch')" ></div >
          </dt >
          <dd >
            <ul class="reverse-box" >
              <li v-for="(item,index) in historyData" :key="index" >
                <a @click="_replayceSearch (item)" >{{item}}</a >
              </li >
            </ul >
          </dd >
        </dl >
        <!--历史搜索 -end -->
        <!--热门搜索 -begin -->
        <dl v-show="!showList" class="search-hot" v-if="hotSearchData.length" >
          <dt class="search-title" >
            <div class="title" >
              <span >热门搜索</span >
            </div >
          </dt >
          <dd v-if="hotSearchData.length" >
            <ul >
              <li v-for="(item,index) in hotSearchData" :key="index" >
                <a @click="_replayceSearch (item)" >{{item}}</a >
              </li >
            </ul >
          </dd >
        </dl >
        <!--热门搜索 -end -->
      </div >
      <!--搜索列表 插件 -begin-->
      <!--传值到搜索列表子组件（搜索的keyword、要渲染的列表数据this.searchData、大图和列表模式this.listMode）-->
      <search-list
        v-if="showList"
        :searchKeyword="searchKeyword"
        :searchData="searchData"
        :listMode="listMode" ></search-list >
      <!--搜索列表 插件 -end-->

    </div >

  </div >
</template >

<script type="text/ecmascript-6" >
import { searchProduct } from 'api/searchData'
import { ERR_OK } from 'api/config'
import SearchList from 'components/search-list/search-list'
import { localSave, localTake, localremove } from 'common/js/localStore'
export default {
  data () {
    return {
      mainSearch: {
        //         value: this.$route.query.keyword === '' ? '' : this.$route.query.keyword,
        value: '',
        placeholder: '请输入要搜索的内容',
        type: 'text',
        readonly: false,
        maxlength: 100,
        disabled: false,
        autofocus: false,
        autocomplete: true,
        clearable: false
      },
      listMode: false,
      showList: false,
      searchKeyword: '',
      searchData: [],
      historyData: [],
      hotSearchData: ['钢琴', '尤克里里', '吉他', '博兰斯勒', '德国', '鼓', '雅马哈', '欧米勒']
    }
  },
  components: {
    SearchList
  },
  created () {
    this._historyDataInit()
  },
  mounted () {
    this._comeSearch()
  },
  methods: {
    // 初始化历史搜索
    _historyDataInit () {
      // 本地如果无存储，就为空
      this.historyData = this._localTake('historySearch') ? this._localTake('historySearch') : []
    },
    // 历史搜索去空、去重、排序设置
    _historyDataSet (val) {
      if (val.replace(/\s/g, '') !== '') { // 去掉头尾空格不为空
        if (this.historyData.indexOf(val) >= 0) { // 如果有此关键词
          this.historyData.splice(this.historyData.indexOf(val), 1) // 通过索引删除，去重
          this.historyData.unshift(val) // 前面插入(相当于排序)
        } else {
          this.historyData.unshift(val) // 前面插入(相当于排序)
        }
        return this.historyData
      } else {
        return this.historyData
      }
    },
    // 本地储存
    _localSave (key, val) {
      localSave(key, val)
    },
    // 读取本地储存
    _localTake (key) {
      return localTake(key)
    },
    // 清除本地储存
    _localremove (key) {
      localremove(key)
      this.historyData = []
    },
    // 进行搜索
    _toSearch (keyword) { // 传入keyword
      let productData = {} // 定义一个空对象
      productData.keyword = keyword // 定义此对象的 keyword
      searchProduct(productData).then((res) => { // 把对象（keyword）传入
        if (ERR_OK === res.Code) {
          this.searchData = res.ReturnData // 存搜索所得数据
          this.historyData = this._historyDataSet(keyword) // 设置历史搜索
          this._localSave('historySearch', this.historyData) // 保存本地数据
          // 隐藏历史搜索、热门搜索、搜索按钮，显示搜索列表子组件、大图和列表切换按钮
          this.showList = true
          // 传值到搜索列表子组件（搜索的keyword、要渲染的列表数据this.searchData）
          this.searchKeyword = keyword
          this.mainSearch.value = this.searchKeyword
          this.listMode = false
          this.$refs.input.blur()
        }
      })
    },
    _focus () {
      // 显示历史搜索、热门搜索、搜索按钮，隐藏搜索列表子组件、大图和列表切换按钮
      this.showList = false
    },
    _changeMode () { // 大图和列表切换
      this.listMode = !this.listMode
    },
    // 搜索词条跟路由链保持同步
    _replayceSearch (name) {
      this.$router.replace({
        path: '/main-search',
        query: {'keyword': name}
      })
      this._comeSearch(name)
    },
    // 搜索参数接收处理
    _comeSearch () {
      console.log('is this.$route.path::', this.$route.path)
      if (this.$route.path === '/main-search') {
        this.mainSearch.value = this.$route.query.keyword || ''
        this.$refs.input.focus()
        if (this.mainSearch.value === '') {
          this.listMode = false
        } else {
          this._toSearch(this.mainSearch.value)
        }
      }
    }
  },
  destroyed () {},
  watch: {
    '$route' (to, from) {
      const fromDepth = from.path.split('/')
      if (fromDepth[1] !== 'goods-detail') {
        this._comeSearch()
      }
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'main-search.styl'
</style >
