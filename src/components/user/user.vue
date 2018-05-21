<template >
  <div class="user" >
    <span >我的</span >
    <!-- tab -->
    <tab v-show="true"></tab>
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
export default {
  data () {
    return {
      local: 'http://musicdo.cn'
    }
  },
  components: {
    Tab
  },
  created () {
  },
  methods: {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user.styl'
.user
  color #666
</style >
