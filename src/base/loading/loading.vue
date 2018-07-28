<template >
  <div class="loading-mask" >
    <div class="loading" @touchmove.prevent >
      <img width="24" height="24" src="./loading.gif" >
      <p class="desc" >{{title}}</p >
    </div >
  </div >
</template >
<script type="text/ecmascript-6" >
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script >
<style scoped lang="stylus" rel="stylesheet/stylus" >
  @import "~common/stylus/variable"

  .loading-mask
    position fixed
    top 0
    z-index 99999
    height 100vh
    width 100vw
    .loading
      margin 0 auto
      position fixed
      z-index $g-zindex-mask
      top 50%
      left 50%
      transform: translate(-50%, -50%)
      text-align center
      .desc
        height $g-fs-tit-sm
        line-height $g-fs-tit-sm
        font-size $g-fs-md
        color $g-fc-gray-l
</style >
