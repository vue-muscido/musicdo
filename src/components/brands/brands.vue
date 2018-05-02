<template >
  <div class="brands" >
    <!-- 选择栏 -->
    <ul class="selectBar">
      <li @click="itemSelect(index)" v-for="(item, index) in selectBar" :key="index" class="select-item" :class="{active:selectIndex === index}">
        {{item}}
      </li>
    </ul>
    <!-- 展示栏 -->
    <div class="selectCon"></div>
  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  data () {
    return {
      selectIndex: 0,
      selectBar: ['推荐品牌', '国际品牌', '国内品牌']
    }
  },
  methods: {
    itemSelect (index) {
      this.selectIndex = index
    }
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
    max-width $g-page-max-width
    display flex
    padding 0 1rem
    background-color $g-bgc-con
    .select-item
      flex 1
      padding 1rem 0
      line-height 1.5rem
      font-size 1.5rem
      color $g-fc-black
      text-align center
      &.active
        color $g-col-red
        border-bottom 0.2rem solid $g-col-red
  .selectCon
    position fixed
    top 3.5rem
    bottom $g-bot-bar-height
    width 100%
    max-width $g-page-max-width
    border-top 1px solid $g-brc-default
</style >
