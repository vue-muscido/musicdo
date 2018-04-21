<template >
  <div class="tab" >
    <ul >
      <li >
        <router-link tag="div" class="tab-item" to="/home" >
          <div class="tab-img" ></div >
          <span class="tab-txt" >主页</span >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/brands" >
          <div class="tab-img" ></div >
          <span class="tab-txt" >品牌</span >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/sort" >
          <div class="tab-img" ></div >
          <span class="tab-txt" >分类</span >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/cart" >
          <div class="tab-img" ></div >
          <span class="tab-txt" >购物车</span >
        </router-link >
      </li >
      <li >
        <router-link tag="div" class="tab-item" to="/user-sign-in" >
          <div class="tab-img" ></div >
          <span class="tab-txt" >我</span >
        </router-link >
      </li >
    </ul >
  </div >
</template >

<script type="text/ecmascript-6" >
export default {}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'tab.styl'
</style >
