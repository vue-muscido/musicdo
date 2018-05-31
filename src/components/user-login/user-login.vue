<template >
  <transition name="slideUp" >
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

        <div class="password-box" v-if="!isLoginByCode" >
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

        <div class="vcode-box" v-else="isLoginByCode" >
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
            @input="vCodeInput()"
          ></cube-input >
          <div class="get-code-btn" :class="getCodeDisable?'disable':''" >
            <span v-show="!isCountDown" @click="getCode()" >获取验证码</span >
            <span v-show="isCountDown" >{{timeLimit - secondNumber}}秒后重新获取</span >
          </div >
        </div >

      </div >

      <div class="quick-bar" >
        <div @click="chengeLoginMode()" >
          <!--短信快速登录-->
          {{isLoginByCode ? '密码登录' : '短信快速登录'}}
        </div >
        <div >
          忘记密码?
        </div >
      </div >

      <div class="btn-bar" >
        <ripple-btn class="login-btn" :class="loginBtnDisable?'disable':''" v-on:click.native="toLogin()" >
          登录
        </ripple-btn >
      </div >

      <div class="new-account-bar" >
        <span class="new-account-btn" >
          注册新账号{{$store.state.isLogin}}----{{$store.getters.otest}} <!-- TODO & test-->
        </span >
      </div >

        用户信息:{{userMsg}}

      <div class="other-way-bar" >
        <h3 ><span >其他账号登录</span ></h3 >
        <div class="other-way" >
          <div class="wx" @click="clUserMsg()" ></div >
          <div class="qq" @click="testSSSS()" ></div >
        </div >
      </div >
    </div >
  </transition >
</template >

<script type="text/ecmascript-6" >
import { getVerificationCode } from 'api/verificationCode'
import { login, loginByCode } from 'api/userLogin'
import RippleBtn from 'base/ripple-btn/ripple-btn'
import { localSave, localTake, localremove } from 'common/js/localStore'
import { mapGetters, mapActions } from 'vuex'
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
        maxlength: 6,
        disabled: true,
        autofocus: false,
        autocomplete: false,
        clearable: false,
        eye: false
      },
      getCodeDisable: true, // 初始获取验证码按钮是否禁止
      isLoginByCode: false, // 是否验证码登录
      truePhoneNumber: '', // 获取验证码的手机号
      timeLimit: 10, // 倒计时秒数限制
      secondNumber: 0, // 倒计时时间
      isCountDown: false, // 是否在倒计时
      loginBtnDisable: true,
      errEvent: 'DEFAULT',
      userData: {}
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
    console.log(this.$store)
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
    _getVerificationCode () {
      let oParams = Object.assign({}, {}, {
        phoneNumber: this.userAccount.value,
        actionType: 'login'
      })
      getVerificationCode(oParams).then((res) => {
        console.log('res', res)
        // Code 返回结果 -- 0：失败、1：成功
        if (res.Code === 0) {
          console.log('验证码获取失败')
          this.errEvent = 'GET_CODE_ERR_0'
          let errText = {
            title: '验证码获取失败',
            content: '请检查手机号码是否有误'
          }
          this.codeError(errText)
          this.countDown() // 开始倒计时
        } else if (res.Code === 1) {
          console.log('验证码获取成功')
          this.errEvent = 'DEFAULT'
          this.truePhoneNumber = oParams.phoneNumber
          this.countDown() // 开始倒计时
        } else {
          this.errEvent = 'DEFAULT'
          console.log('Code', res.Code)
          this.countDown() // 开始倒计时
        }
      })
    },
    _loginByPSW () {
      let oParams = Object.assign({}, {}, {
        userName: this.userAccount.value,
        pwd: this.userPassword.value
      })
      login(oParams).then((res) => {
        console.log(res)
        if (res === 'undefined') {
          console.log('获取不到返回值')
        } else {
          if (res.Code === 1) {
            console.log(res.Data)
            console.log('登录成功，本地存储逻辑(done)，设置全局数据(islogin,)，登录页面退出')
            //            this._localremove('userMsg')
            //            this._localSave('userMsg', res.Data)
            //            this.$store.commit('SET_LOGIN_FLAG', true)
            this.loginSuccess(res.Data)
          } else if (res.Code === 0) {
            console.log('账号或密码不正确，弹框提醒，并要求重新填写')
            this.errEvent = 'DEFAULT'
            let errText = {
              title: '账号或密码不正确',
              content: '请检查账号或密码是否有误'
            }
            this.codeError(errText)
          }
        }
      })
    },
    _loginByCode () {
      let oParams = Object.assign({}, {}, {
        phoneNumber: this.userAccount.value,
        code: this.userVcode.value
      })
      console.log('参数', oParams)
      loginByCode(oParams).then((res) => {
        console.log(res)
        if (res === 'undefined') {
          console.log('坑爹接口，错误直接连 res 都没有')
          this.errEvent = 'DEFAULT'
          let errText = {
            title: '验证码登录失败',
            content: '请检查验证码是否有误'
          }
          this.codeError(errText)
        } else {
          if (res.Code === 1) {
            //            this.userData = res
            //            console.log(res)
            //            console.log('登录成功，本地存储逻辑TODO，登录页面退出')
            this.loginSuccess(res.Data)
          }
        }
      })
    },
    accountInput () {
      this.truePhoneNumber = ''
      if (this.userAccount.value !== '') {
        this.getCodeDisable = false
        this.userPassword.disabled = false
        this.userVcode.disabled = false
      } else {
        this.getCodeDisable = true
        this.userPassword.disabled = true
        this.userVcode.disabled = true
      }
    },
    passwordInput () {
      if (this.userAccount.value !== '' && this.userPassword.value !== '') {
        this.loginBtnDisable = false
      } else {
        this.loginBtnDisable = true
      }
    },
    vCodeInput () {
      if (this.userAccount.value !== '' && this.userVcode.value !== '') {
        this.loginBtnDisable = false
      } else {
        this.loginBtnDisable = true
      }
    },
    getCode () {
      if (this.getCodeDisable === false) { // 当获取验证码按钮为非禁用状态时
        this._getVerificationCode() // 获取验证码
      } else {
        return false
      }
    },
    chengeLoginMode () {
      this.isLoginByCode = !this.isLoginByCode
    },
    toLogin () {
      console.log('11111111111111', this.loginBtnDisable)
      if (this.loginBtnDisable) {
        console.log('禁止点击。')
      } else {
        if (this.isLoginByCode) {
          console.log('验证码登录')
          this._loginByCode()
        } else {
          this._loginByPSW()
        }
      }
      console.log('点击登录')
    },
    codeError (config) {
      this.$createDialog({
        type: 'confirm',
        //          icon: 'cubeic-alert',
        title: config.title || '登录失败',
        content: config.content || '账号或密码、验证码有误',
        confirmBtn: {
          text: config.confirmBtnText || '重新登录',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          console.log('点击了重新注册按钮，这里写重新注册逻辑')
          console.log(this.errEvent)
          if (this.errEvent === 'GET_CODE_ERR_0' ||
            this.errEvent === 'CHECK_CODE_ERR_0' ||
            this.errEvent === 'DEFAULT') {
            console.log('获取验证码失败')
          } else {
            console.log('获取验证码失败')
          }
        },
        onCancel: () => {
          console.log('点击了取消按钮，这里返回false即可')
          return false
        }
      }).show()
    },
    countDown () {
      this.secondNumber = 0 // 重置为0再开始
      let countDownTimer = null // 存倒计时定时器
      this.getCodeDisable = true // 重置获取验证码按钮为禁用状态
      this.isCountDown = true // 设置为正在倒计时状态
      clearInterval(countDownTimer) // 先清除一次
      countDownTimer = setInterval(() => {
        this.secondNumber++ // 每秒加1
        if (this.secondNumber === this.timeLimit) { // 当倒数秒数与限制时间相等时
          this.getCodeDisable = false // 获取验证码按钮为启用状态
          this.isCountDown = false // 不在倒计时状态
          clearInterval(countDownTimer) // 清除倒计时
        } else {
          this.getCodeDisable = true // 正在倒计时，获取验证码按钮为禁用状态
          this.isCountDown = true // 正在倒计时
        }
      }, 1000)
    },
    clUserMsg () {
      console.log('is _localremove')
      //      this._localremove('userMsg')
      this.$store.commit('REMOVE_USER_MSG')
    },
    loginSuccess (userMsg) {
      //      this.$store.commit('SET_USER_MSG', userMsg)
      //      this.$store.commit('GET_USER_MSG')
      //      console.log(this.$store.getters.userMsg)
      //      this.xSetLoginFlag(true)
      this.xSetUserMsg(userMsg)
    },
    // 本地储存
    _localSave (key, val) {
      localSave(key, val)
    },
    // 读取本地储存
    _localTake (key) {
      return localTake(key)
    },
    // 清除本地储存
    _localremove (key) {
      localremove(key)
    },
    testSSSS () {
      this.xSetLoginFlag(true)
    },
    ...mapActions([
      'xSetUserMsg',
      'xRrmoveUserMsg'
    ])
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {
    ...mapGetters([
      'userMsg'
    ])
  },
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
  @import 'user-login.styl'
</style >
