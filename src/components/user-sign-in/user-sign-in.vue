<template >
  <div class="user-sign-in" >
    <div class="logo-bar" >
      <div class="logo" ></div >
    </div >

    <div class="input-bar">
      <!--<input class="input-account"-->
             <!--v-model="userAccount.value"-->
             <!--:placeholder="userAccount.placeholder"-->
             <!--:type="userAccount.type"-->
             <!--:maxlength="userAccount.maxlength"-->
             <!--:readonly="userAccount.readonly"-->
             <!--:disabled="userAccount.disabled"-->
             <!--:autofocus="userAccount.autofocus"-->
             <!--:autocomplete="userAccount.autocomplete"-->
             <!--:clearable="userAccount.clearable"-->
             <!--@input="accountInput()"/>-->
      
      <div class="account-box">
        <cube-input
          class="input-account"
          v-model="userAccount.value"
          :placeholder="userAccount.placeholder"
          :type="userAccount.type"
          :maxlength="userAccount.maxlength"
          :readonly="userAccount.readonly"
          :disabled="userAccount.disabled"
          :autofocus="userAccount.autofocus"
          :autocomplete="userAccount.autocomplete"
          :clearable="userAccount.clearable"
          @input="accountInput()"
        ></cube-input >
      </div>
      

      <!--<input class="input-passward"-->
             <!--v-model="userPassword.value"-->
             <!--:placeholder="userPassword.placeholder"-->
             <!--:type="userPassword.type"-->
             <!--:maxlength="userPassword.maxlength"-->
             <!--:readonly="userPassword.readonly"-->
             <!--:disabled="userPassword.disabled"-->
             <!--:autofocus="userPassword.autofocus"-->
             <!--:autocomplete="userPassword.autocomplete"-->
             <!--:clearable="userPassword.clearable"-->
             <!--:eye="userPassword.eye"/>-->
      <div class="password-box">
        <cube-input
          class="input-password"
          v-model="userPassword.value"
          :placeholder="userPassword.placeholder"
          :type="userPassword.type"
          :maxlength="userPassword.maxlength"
          :readonly="userPassword.readonly"
          :disabled="userPassword.disabled"
          :autofocus="userPassword.autofocus"
          :autocomplete="userPassword.autocomplete"
          :clearable="userPassword.clearable"
          :eye="userPassword.eye"
        ></cube-input >
      </div>
      
    </div>

    <div class="quick-bar">
      <div>
        短信快速登录
      </div>
      <div>
        忘记密码
      </div>
    </div>

    <div class="btn-bar">
      登录
    </div>

    <div class="new-account-bar">
      注册新账号
    </div>

    <div class="other-way-bar">
      其他登陆
    </div>

  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  // 别名
  name: 'user-sign-in',
  // 数据
  data () {
    return {
      userAccount: {
        value: '',
        placeholder: '手机/用户名/邮箱',
        type: 'text',
        readonly: false,
        maxlength: 16,
        disabled: false,
        autofocus: true,
        autocomplete: true,
        clearable: true
      },
      userPassword: {
        value: '',
        placeholder: '请输入密码',
        type: 'password',
        readonly: false,
        maxlength: 16,
        disabled: true,
        autofocus: false,
        autocomplete: false,
        clearable: false,
        eye: true
      }
    }
  },
  // 子组件
  components: {},
  // 接受父组件传递数据
  props: {},
  // 组件实例创建前
  beforeCreate () {},
  // 组件实例创建后
  created () {},
  // 模板编译/挂载前
  beforeMount () {},
  // 模板编译/挂载后
  mounted () {},
  // 组件更新前
  beforeUpdate () {},
  // 组件更新后
  updated () {},
  // 组件销毁前
  beforeDestroy () {},
  // 组件销毁后
  destroyed () {},
  // 方法集合
  methods: {
    accountInput () {
      if (this.userAccount.value !== '') {
        console.log(this.userPassword.disabled, this.userAccount.value)
        this.userPassword.disabled = false
      } else {
        console.log(this.userPassword.disabled, this.userAccount.value)
        this.userPassword.disabled = true
      }
    }
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {},
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user-sign-in.styl'
</style >

<style lang="stylus" rel="stylesheet/stylus" >

// TODO
.input-bar
  .cube-input
    position: relative
    font-size: 14px
    line-height: 1.429
    //    border-1px($input-border-color)
    input
      width: 100%
      padding: 10px
      box-sizing: border-box
      color: $input-color
      line-height: inherit
      background-color: #fff
      border-radius: 2px
      outline: none
      &::-webkit-input-placeholder
        color: #ccc!important
        text-overflow: ellipsis
    .cube-input_active
      &::after
        /*border-color: $input-focus-border-color*/
        border-color transparent
    .cube-input-clear, .cube-input-eye
      position absolute
      right 1rem
      top 50%
      padding 0
      margin 0
      width auto
      height auto
      line-height 1
      transform translate3d(0,-50%,0)
      color: #ddd
      > i
        display: inline-block
        transform: scale(1.2)
      + input
        padding-right: 2.6em
    .cube-input-eye
      >
      .cubeic-eye-invisible, .cubeic-eye-visible
        transform: scale(1.4)
    .cube-input-clear
      + .cube-input-eye
        right: 2.6em
        + input
          padding-right: 5.2em
</style>
