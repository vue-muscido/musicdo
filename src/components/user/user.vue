<template >
  <div class="user" >
    <span >我的</span >
    <div
      style="position: fixed;top: 0;z-index: 99999;width: 100%;max-width: 750px;max-height: 50vh;background-color: rgba(0,0,0,.5);color: #fff" >
      <div style="background-color: red;color: #fff;text-align: center" @click="outSign()" >点击退出登录</div >
      <div >test用户信息：{{strUserMsg}}</div >
    </div >
    <!-- tab -->
    <tab v-show="true" ></tab >
  </div >
</template >

<script type="text/ecmascript-6" >
import Tab from 'components/tab/tab'
// import { localTake } from 'common/js/localStore'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      local: 'http://musicdo.cn'
    }
  },
  computed: {
    ...mapGetters([
      'userMsg'
    ]),
    strUserMsg () {
      return JSON.stringify(this.userMsg)
    }
  },
  components: {
    Tab
  },
  mounted () {
  },
  created () {
  },
  methods: {
    // 退出登陆
    outSign () {
      this.xRrmoveUserMsg()
      this.$router.replace('home')
    },
    ...mapActions([
      'xSetUserMsg',
      'xRrmoveUserMsg'
    ])
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user.styl'
.user
  color #666
</style >
