<template >
  <div class="brands" >
    <!-- 选择栏 -->
    <ul class="selectBar">
      <li @click="itemSelect(index)" v-for="(item, index) in selectBar" :key="index" class="select-item" :class="{active:selectIndex === index}">
        {{item}}
      </li>
    </ul>
    <!-- 展示栏 -->
    <div class="selectCon">
      <cube-scroll
        ref="scroll"
        :data="brandsData"
        :options="options">
        <transition :name="transitionName">
          <ul v-show="brandList.length" class="brand-list">
            <li class="brand-con" v-for="(item, index) in brandList" :key="index">
              <div class="img-con">
                <img class="isimg" :src="getImg(item.Logo)" alt="" />
              </div>
              <p>{{item.Name}}</p>
            </li>
          </ul>
        </transition >
      </cube-scroll>
    </div>
    <!-- loading -->
    <loading v-show="!brandList.length" title="正在载入..." ></loading >
  </div >
</template >

<script type="text/ecmascript-6" >
import { getBrandClassify } from 'api/brandsData'
import { LOCAL_HOST } from 'api/config'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      selectIndex: 0,
      selectBar: ['推荐品牌', '国际品牌', '国内品牌'],
      brandsData: [],
      brandList: [],
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
    this._getBrandClassify()
  },
  mounted () {
    this.$refs.scroll.refresh()
  },
  methods: {
    getImg (img) {
      return LOCAL_HOST + img
    },
    itemSelect (index) {
      this.selectIndex = index
      this.brandList = []
      setTimeout(() => {
        this.brandList = this.brandsData[index]
      }, 100)
    },
    _getBrandClassify () {
      getBrandClassify().then((res) => {
        if (res.Flag === true) {
          console.log(this.brandsData)
          this.brandsData = this._toArr(res.Data)
          this.itemSelect(this.selectIndex)
        }
      })
    },
    _toArr (str) {
      let ret = []
      if (!str) {
        return ''
      }
      for (var key in str) {
        ret.push(str[key])
      }
      return ret
    }
  },
  components: {
    loading
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.brands
  width 100%
  .selectBar
    position fixed
    top 0
    width 100%
    height $g-fix-bar-height
    max-width $g-page-max-width
    display flex
    padding 0 1rem
    background-color $g-bgc-con
    border-bottom 1px solid $g-brc-default
    .select-item
      extend-click()
      flex 1
      line-height 4rem
      font-size 1.4rem
      color $g-fc-normal
      text-align center
      &.active
        font-size 1.45rem
        color $g-col-red
        border-bottom 0.1rem solid $g-col-red
  .selectCon
    position fixed
    top $g-fix-bar-height
    bottom $g-bot-bar-height
    width 100%
    max-width $g-page-max-width
    background-color $g-bgc-con
    .brand-list
      display flex
      flex-wrap wrap
      padding 0 0.5rem
      .brand-con
        padding 0.75rem 2rem
        flex 33.3% 0 0
        text-align center
        .img-con
          position relative
          padding-top 100%
          width 100%
          text-align: center
          overflow hidden
        .isimg
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          width 100%
          height auto
        p
          height 1.2rem
          line-height 1.2rem
          font-size 1.2rem
          color $g-fc-gray-b
</style >
