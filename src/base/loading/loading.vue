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
    position fixed
    z-index $g-zindex-mask
    padding-top 50%
    top 0
    left 0
    bottom $g-bot-bar-height
    width 100%
    text-align center
    .desc
      height $g-fs-tit-sm
      line-height $g-fs-tit-sm
      font-size $g-fs-md
      color $g-fc-gray-l
</style>
