<template >
  <div class="cart">
    <span>购物车</span>
    <!-- tab -->
    <tab v-show="true"></tab>
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
export default {
  data () {
    return {
      cart: []
    }
  },
  components: {
    Tab
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'cart.styl'

</style >
