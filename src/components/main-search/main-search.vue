<template >
  <div class="main-search" >
    <div class="inner">
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
        <div class="search-btn">
          <span>搜索</span>
        </div>
      </div >
      <!--历史搜索 -begin -->
      <dl class="search-log">
        <dt class="search-title">
          <div class="title">
            <span>历史搜索</span>
          </div>
          <div class="delete"></div>
        </dt>
        <dd>
          <ul>
            <li>
              <a>吉他</a>
            </li>
          </ul>
        </dd>
      </dl>
      <!--历史搜索 -end -->
  
      <!--热门搜索 -begin -->
      <dl class="search-hot">
        <dt class="search-title">
          <div class="title">
            <span>热门搜索</span>
          </div>
        </dt>
        <dd>
          <ul>
            <li>
              <a>尤克里里</a>
            </li>
            <li>
              <a>ROLAND罗兰电子鼓11K电鼓TD-11KV架子鼓TD-1</a>
            </li>
            <li>
              <a>演唱会</a>
            </li>
            <li>
              <a>吉他</a>
            </li>
            <li>
              <a>音乐会门票</a>
            </li>
            <li>
              <a>张学友</a>
            </li>
            <li>
              <a>鼓</a>
            </li>
            <li>
              <a>博兰斯勒</a>
            </li>
            <li>
              <a>乐都</a>
            </li>
          </ul>
        </dd>
      </dl>
      <!--热门搜索 -end -->
    </div>
  </div >
</template >

<script type="text/ecmascript-6" >
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
      }
    }
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'main-search.styl'
</style >
