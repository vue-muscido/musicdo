<template >
  <div class="search-list" >
    <div class="inner" >
      <!--顶栏 begin -->
      <div class="top-bar" >
        <form class="search-form" action="#" >
          <input id="main-search-input"
                 class="search-input"
                 v-model="$route.query.keyword"
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
        <div class="change-btn"
             :class="listMode == true?'list-mode':'bigpic-mode'"
             @click="_changeMode()" >
          <div class="img"></div>
        </div >
      </div >
      <!--顶栏 end -->
      <dl>
        
        <dt>
          <!--筛选分类导航 -begin-->
          <div class="screen-title">
            <ul>
              <li class="comprehensive">
                <span>综合</span>
                <i>
                  <img src=""/>
                </i>
                <i class="on-v">
                  <img src=""/>
                </i>

                <div class="dropdown-list">
                  <ol>
                    <li class="act">综合</li>
                    <li>最新上架</li>
                    <li>xxx</li>
                    <li>yyy</li>
                  </ol>
                </div>
                <div class="sup-tc"></div>
              </li>

              <li class="sales-volume">
                <span>销量</span>
              </li>
              
              <li class="price donw">
                <span>价格</span>
                <i class="donw">
                  <img src=""/>
                </i>
                <i class="up">
                  <img src=""/>
                </i>
              </li>
              
              <li class="screen">
                <span>筛选</span>
              </li>
              
            </ul>
          </div>
          <!--筛选分类导航 -end-->
        </dt>
        
      </dl>
      
    </div >
  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  data () {
    return {
      mainSearch: {
        placeholder: '请输入要搜索的内容',
        type: 'search',
        readonly: false,
        maxlength: 100,
        disabled: false,
        autofocus: true,
        autocomplete: true,
        clearable: false
      },
      listMode: false
    }
  },
  created () {
    console.log(this.$route.query.keyword)
  },
  methods: {
    _changeMode () {
      this.listMode = !this.listMode
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'search-list.styl'
</style >
