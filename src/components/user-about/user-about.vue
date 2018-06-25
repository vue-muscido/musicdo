<template >
  <div class="user-about" >
    <!-- 返回 -->
    <div @click="goBack" class="goback">
      <返回
    </div>
    <!-- 用户信息 -->
    <div class="user-msg" >
      <div class="photo" >
        <img :src="userMsg.ImageUrl" alt="" >
      </div >
      <div class="text" >
        <h2 class="user-name" >{{userMsg.NickName}}</h2 >
        <p class="user-lever" >点击更换头像</p >
      </div >
    </div >
    <!-- 滚动开始 -->
    <div class="scroll" >
      <cube-scroll
        ref="scroll"
        :data="PrivateList"
        :options="options" >
        <!-- 我的资料 -->
        <ul class="msg" >
          <li class="phone">昵称：{{userMsg.NickName}}</li>
          <li class="phone">电话：{{userMsg.Phone}}</li>
          <li class="phone">性别：{{getSex(userMsg.Sex)}}</li>
          <li class="phone">地区·：{{userMsg.Address}}</li>
        </ul >
      </cube-scroll >
    </div >
    <!-- 滚动结束 -->
    <div
      style="display: block;position: fixed;bottom: 0;z-index: 99999;width: 100%;max-width: 750px;max-height: 50vh;background-color: rgba(0,0,0,.5);color: #fff" >
      <div >test用户信息：{{strUserMsg}}</div >
      <div style="height:3.0rem;line-height:3.0rem; background-color: red;color: #fff;text-align: center" @click="outSign()" >点击退出登录</div >
    </div >
    <!-- tab -->
    <!--<tab v-show="true" ></tab >-->
  </div >
</template >

<script type="text/ecmascript-6" >
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
  },
  components: {
    //    Tab
  },
  mounted () {
  },
  methods: {
    // 判断性别
    getSex (sex) {
      if (sex === 1) {
        return '男'
      } else {
        return '女'
      }
    },
    // 退出登陆
    outSign () {
      this.xRrmoveUserMsg()
      this.$router.replace('home')
    },
    goBack () {
      this.$router.back()
    },
    ...mapActions([
      'xSetUserMsg',
      'xRrmoveUserMsg'
    ])
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user-about.styl'

</style >
