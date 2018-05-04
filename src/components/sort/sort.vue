<template >
  <div class="sort" >
    <!-- 固定定位容器 -->
    <div class="sortContainer">
    <!-- 选择栏 -->
      <div class="select-bar">
        <cube-scroll
        ref="scroll"
        :data="selectList">
          <ul class="select-con">
              <li  @click="itemSelect(item, index)" v-for="(item, index) in selectList" class="select-item"  :class="{active:selectIndex === index}">
                <span>{{item.Name}}</span>
              </li>
          </ul>
        </cube-scroll>
      </div>
      <!-- 展示栏 -->
      <div class="select-show">
        <cube-scroll
        ref="scroll"
        :data="sortList"
        :options="options">
          <div class="classify-title">
            <span>{{sortTitle}}</span>
          </div>
          <transition :name="transitionName">
            <ul v-show="sortList.length" class="classify-con">
              <li v-for="(item, index) in sortList" class="classify-item">
                <div class="img-con">
                   <img class="isimg" :src="getImg(item.SrcDetail)" alt="">
                </div>
                <p>{{item.Name}}</p>
              </li>
            </ul>
          </transition >
        </cube-scroll>
      </div>
    </div>
    <!-- tab -->
    <tab v-show="true"></tab>
    <!-- loading -->
    <loading v-show="!sortList.length" title="正在载入..." ></loading >
  </div >
</template >

<script type="text/ecmascript-6" >
import { getProductCategoryLevel, getProductCategory } from 'api/sortData'
import Tab from 'components/tab/tab'
import loading from 'base/loading/loading'
import { LOCAL_HOST } from 'api/config'
export default {
  data () {
    return {
      selectIndex: 0,
      selectList: [],
      sortList: [],
      sortTitle: '',
      transitionName: 'fade',
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      }
    }
  },
  created () {
    this._getProductCategoryLevel()
  },
  methods: {
    itemSelect (item, index) {
      this.selectIndex = index
      this.sortTitle = item.Name
      this.sortList = []
      setTimeout(() => {
        this._getProductCategory(item.ID)
      }, 100)
    },
    _getProductCategoryLevel () {
      getProductCategoryLevel().then((res) => {
        if (res.Flag === true) {
          this.selectList = res.Data
          this.itemSelect(this.selectList[0], this.selectIndex)
        }
      })
    },
    _getProductCategory (id) {
      getProductCategory(id).then((res) => {
        if (res.Flag === true) {
          this.sortList = res.Data
        }
      })
    },
    getImg (img) {
      return LOCAL_HOST + img
    }
  },
  components: {
    loading,
    Tab
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'sort.styl'
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.sort
  .sortContainer
    display flex
    position fixed
    top 0
    bottom $g-bot-bar-height
    width 100%
    max-width $g-page-max-width
    .select-bar
      flex 9rem 0 0
      height 100%
      background-color $l-bgc-app
      .select-item
        padding 1rem 0
        border-bottom 1px solid $g-bgc-con
        span
          display inline-block
          width 100%
          height 3rem
          line-height 3rem
          text-align center
          font-size 1.3rem
          color $g-fc-normal
        &.active
          background-color $g-bgc-con
          span
            color $g-fc-black
            border-left 0.3rem solid red
    .select-show
      flex 1
      height 100%
      background-color $g-bgc-con
      .classify-title
        width 100%
        padding 1.9rem 0
        span
          display inline-block
          padding 0 1.5rem
          height 1.2rem
          line-height 1.3rem
          font-size 1.3rem
          color $g-fc-normal
          bg-image("img/jiantou", 0.6rem)
          background-position center right
      .classify-con
        display flex
        flex-wrap wrap
        .classify-item
          padding 0 1.8rem 0.5rem
          text-align center
          width 33.33%
          .img-con
            position relative
            padding-top 100%
            width 100%
            text-align: center
            overflow hidden
            border 1px solid $g-brc-default
          .isimg
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 100%
            height auto
          p
            padding 0.6rem 0 1rem
            line-height 1.1rem
            font-size 1.1rem
            color $g-fc-gray-b
            no-wrap()


</style >
