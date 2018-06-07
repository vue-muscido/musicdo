<template >
  <div class="user" >
    <!-- 用户信息 -->
    <div class="user-msg">
      <div class="bar-action">
        <div class="btn-edit"></div>
        <div class="btn-msg"></div>
      </div>
      <div class="bar-show">
        <div class="photo">
          <img src="" alt="">
        </div>
        <div class="text">
          <h2 class="user-name">JINGJING028</h2>
          <p class="user-lever">普通用户</p>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="user-order">
      <div class="bar-order">
        <div class="my-order">我的订单</div>
        <div class="btn-show-all">全部订单</div>
      </div>
      <div class="order-type">
        <div class="btn-order">
          <div class="icon"></div>
          <div class="text">待付款</div>
        </div>
        <div class="btn-order">
          <div class="icon"></div>
          <div class="text">待发货</div>
        </div>
        <div class="btn-order">
          <div class="icon"></div>
          <div class="text">待收货</div>
        </div>
        <div class="btn-order">
          <div class="icon"></div>
          <div class="text">待评价</div>
        </div>
        <div class="btn-order">
          <div class="icon"></div>
          <div class="text">退换货</div>
        </div>
      </div>
    </div>
    <!-- 用户关于 -->
    <div class="user-about">
      <div class="btn-about">
        <div class="icon">#</div>
        <div class="text">宝贝收藏</div>
      </div>
    </div>
    <div
      style="display: none;position: fixed;top: 0;z-index: 99999;width: 100%;max-width: 750px;max-height: 50vh;background-color: rgba(0,0,0,.5);color: #fff" >
      <div style="background-color: red;color: #fff;text-align: center" @click="outSign()" >点击退出登录</div >
      <div >用户信息：{{'vuex' + strUserMsg}}</div >
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
      this.xRrmoveUserMsg('')
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
