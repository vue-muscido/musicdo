<template>
  <div class="loading" @touchmove.prevent>
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    z-index $g-zindex-top-abs
    padding-top 50%
    position absolute
    top 0
    left 0
    bottom 0
    width 100%
    text-align center
    .desc
      height $g-fs-tit-sm
      line-height $g-fs-tit-sm
      font-size $g-fs-md
      color $g-fc-gray-l
</style>
