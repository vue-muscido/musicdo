<template >
  <div class="user-login" >
    <div class="logo-bar" >
      <div class="logo" ></div >
    </div >

    <div class="input-bar" >

      <div class="account-box" >
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
      </div >

      <div class="password-box" v-if="isLoginByCode" >
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
          @input="passwordInput()"
        ></cube-input >
      </div >
      
      <div class="vcode-box" v-else="isLoginByCode">
        <cube-input
          class="input-vcode"
          v-model="userVcode.value"
          :placeholder="userVcode.placeholder"
          :type="userVcode.type"
          :maxlength="userVcode.maxlength"
          :readonly="userVcode.readonly"
          :disabled="userVcode.disabled"
          :autofocus="userVcode.autofocus"
          :autocomplete="userVcode.autocomplete"
          :clearable="userVcode.clearable"
          :eye="userVcode.eye"
          @input="codeInput()"
        ></cube-input >
      </div >

    </div >

    <div class="quick-bar" >
      <div >
        短信快速登录
      </div >
      <div >
        忘记密码?
      </div >
    </div >

    <div class="btn-bar" >
      <ripple-btn class="login-btn" :class="loginBtnDisable?'disable':''" @click="_login()" >
        登录
      </ripple-btn >
    </div >

    <div class="new-account-bar" >
      <span class="new-account-btn" >
        注册新账号
      </span >
    </div >

    <div class="other-way-bar" >
      <h3 ><span >其他账号登录</span ></h3 >
      <div class="other-way" >
        <div class="wx" ></div >
        <div class="qq" ></div >
      </div >
    </div >

  </div >
</template >

<script type="text/ecmascript-6" >
import { login, loginByCode } from 'api/userLogin'
import RippleBtn from 'base/ripple-btn/ripple-btn'
export default {
  // 别名
  name: 'UserLogIn',
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
        eye: {open: false}
      },
      userVcode: {
        value: '',
        placeholder: '请输入验证码',
        type: 'number',
        readonly: false,
        maxlength: 16,
        disabled: true,
        autofocus: false,
        autocomplete: false,
        clearable: false,
        eye: false
      },
      isLoginByCode: false, // 是否验证码登录
      loginBtnDisable: true
    }
  },
  // 子组件
  components: {
    RippleBtn
  },
  // 接受父组件传递数据
  props: {},
  // 组件实例创建前
  beforeCreate () {
  },
  // 组件实例创建后
  created () {
  },
  // 模板编译/挂载前
  beforeMount () {
  },
  // 模板编译/挂载后
  mounted () {
  },
  // 组件更新前
  beforeUpdate () {
  },
  // 组件更新后
  updated () {
  },
  // 组件销毁前
  beforeDestroy () {
  },
  // 组件销毁后
  destroyed () {
  },
  // 方法集合
  methods: {
    accountInput () {
      if (this.userAccount.value !== '') {
        this.userPassword.disabled = false
      } else {
        this.userPassword.disabled = true
      }
    },
    passwordInput () {
      if (this.userAccount.value !== '' && this.userPassword.value !== '') {
        this.loginBtnDisable = false
      } else {
        this.loginBtnDisable = true
      }
    },
    _login () {
      if (this.isLoginByCode) {
        loginByCode().then((res) => {
          console.log(res)
        })
      } else {
        login().then((res) => {
          console.log(res)
        })
      }
      console.log('点击登录')
    }
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {},
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
  @import 'user-login.styl'
</style >
