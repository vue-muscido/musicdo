<template >
  <div class="user" >
    <main-search ></main-search >
    <span >用户</span >
    <!-- tab -->
    <tab v-show="true"></tab>
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
import MainSearch from 'components/main-search/main-search'
export default {
  data () {
    return {
      local: 'http://musicdo.cn'
    }
  },
  components: {
    Tab,
    MainSearch
  },
  created () {
  },
  methods: {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user.styl'
.user
  background lightblue
</style >
