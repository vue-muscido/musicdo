<template >
  <div class="tab" >
    <ul >
      <li >
        <router-link tag="div" class="tab-item" to="/home" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >主页</span >
          </ripple-btn >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/brands" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >品牌</span >
          </ripple-btn >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/sort" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >分类</span >
          </ripple-btn >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/cart" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >购物车</span >
          </ripple-btn >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/user" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >我</span >
          </ripple-btn >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/user-login" >
          <ripple-btn >
            <div class="tab-img" ></div >
            <span class="tab-txt" >测试页</span >
          </ripple-btn >
        </router-link >
      </li >
    </ul >
  </div >
</template >

<script type="text/ecmascript-6" >
import RippleBtn from 'base/ripple-btn/ripple-btn'
export default {
  components: {
    RippleBtn
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'tab.styl'
.ripple-btn
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color $g-bgc-con
  width 100%
  height 100%
</style >
