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
          <img :src="userMsg.ImageUrl" alt="">
        </div>
        <div class="text">
          <h2 class="user-name">{{userMsg.NickName}}</h2>
          <p class="user-lever">普通用户</p>
        </div>
      </div>
    </div>
    <!-- 滚动开始 -->
    <div class="scroll" >
      <cube-scroll
        ref="scroll"
        :data="privateList"
        :options="options">
        <!-- 我的订单 -->
        <div class="user-order">
          <div class="bar-order">
            <div class="my-order">我的订单</div>
            <div class="btn-show-all">全部订单</div>
          </div>
          <ul class="order-type">
            <li v-for="(tab, index) in tabList" :key="index" @click="tabClick(tab.name, index)" class="btn-order">
              <div class="icon" :class="tab.pic"></div>
              <div class="text">{{tab.name}}</div>
            </li>
          </ul>
        </div>
        <!-- 用户关于 -->
        <ul class="user-about">
          <li v-for="(about, index) in aboutList" :key="index" @click="aboutClick(about.name, index)" class="btn-about">
            <div class="icon" :class="about.pic"></div>
            <div class="text">{{about.name}}</div>
          </li>
        </ul>
        <!-- 用户私人信息 -->
        <ul class="user-about user-private">
          <li v-for="(about, index) in privateList" :key="index" @click="aboutClick(about.name, index)" class="btn-about">
            <div class="icon" :class="about.pic"></div>
            <div class="text">{{about.name}}</div>
          </li>
        </ul>
      </cube-scroll >
    </div >
    <!-- 滚动结束 -->
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
import { tabData, aboutData, privateData } from 'api/userData'
// import { localTake } from 'common/js/localStore'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      local: 'http://musicdo.cn',
      tabList: [],
      aboutList: [],
      PrivateList: [],
      options: {
        scrollbar: {
          fade: true,
          nteractive: false // 1.8.0 新增
        }
      }
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
  created () {
    this._getTabData()
  },
  components: {
    Tab
  },
  mounted () {
  },
  methods: {
    // 获取订单状态tab列表
    _getTabData () {
      this.tabList = tabData
      this._getAboutData()
    },
    // 获取用于关于列表
    _getAboutData () {
      this.aboutList = aboutData
      this._getPrivateData()
    },
    // 获取用户私人信息
    _getPrivateData () {
      this.privateList = privateData
    },
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
