<template>
  <div class="user-find-pwd">
    <div class="input-bar" >
      <div class="phone-num-box" >
        <cube-input
          class="input-phone-num"
          v-model="phoneNum.value"
          :placeholder="phoneNum.placeholder"
          :type="phoneNum.type"
          :maxlength="phoneNum.maxlength"
          :readonly="phoneNum.readonly"
          :disabled="phoneNum.disabled"
          :autofocus="phoneNum.autofocus"
          :autocomplete="phoneNum.autocomplete"
          :clearable="phoneNum.clearable"
          @input="_inputPhone()"
        ></cube-input >
      </div >
      <div class="phone-code-box" >
        <cube-input
          class="input-phone-code"
          v-model="phoneCode.value"
          :placeholder="phoneCode.placeholder"
          :type="phoneCode.type"
          :maxlength="phoneCode.maxlength"
          :readonly="phoneCode.readonly"
          :disabled="phoneCode.disabled"
          :autofocus="phoneCode.autofocus"
          :autocomplete="phoneCode.autocomplete"
          :clearable="phoneCode.clearable"
          :eye="phoneCode.eye"
          @input="_inputCode()"
        ></cube-input >
        <div class="get-code-btn" :class="getCodeDisable?'disable':''" >
          <span v-show="!isCountDown" @click="getCode()" >获取验证码</span >
          <span v-show="isCountDown" >{{timeLimit - secondNumber}}秒后重新获取</span >
        </div >
      </div >
    </div >

    <div class="btn-bar" >
      <ripple-btn class="next-btn" :class="nextBtnDisable?'disable':''" @click="checkCode()" >
        下一步
      </ripple-btn >
    </div >
  </div>
</template>

<script>
import {
  getVerificationCode,
  checkVerificationCode,
  checkCodeAndPhoneNumber
} from 'api/verificationCode'
import RippleBtn from 'base/ripple-btn/ripple-btn'
export default {
  // 别名
  name: 'UserFindPwd',
  // 数据
  data () {
    return {
      phoneNum: {
        value: '',
        placeholder: '请输入手机号码',
        type: 'number',
        readonly: false,
        maxlength: 16,
        disabled: false,
        autofocus: true,
        autocomplete: true,
        clearable: true
      },
      phoneCode: {
        value: '',
        placeholder: '请输入验证码',
        type: 'number',
        readonly: false,
        maxlength: 6,
        disabled: true,
        autofocus: false,
        autocomplete: false,
        clearable: true
      },
      getCodeDisable: true, // 初始获取验证码按钮是否禁止
      nextBtnDisable: true, // 初始下一步按钮是否禁止
      truePhoneNumber: '', // 获取验证码的手机号
      timeLimit: 10, // 倒计时秒数限制
      secondNumber: 0, // 倒计时时间
      isCountDown: false, // 是否在倒计时
      errEvent: 'DEFAULT' // 用于判断弹框的确定事件
    }
  },
  // 子组件
  components: {
    RippleBtn
  },
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
    _getVerificationCode (params) {
      console.log('params', params)
      let oParams = Object.assign({}, {
        phoneNumber: this.phoneNum.value,
        actionType: 'register'
      }, params)
      getVerificationCode(oParams).then((res) => {
        console.log('res', res)
        //        console.log('Flag', res.Flag)
        //        console.log('Code', res.Code)
        //        console.log('Message', res.Message)
        // Code 返回结果 -- 0：失败、1：成功
        if (res.Code === 0) {
          console.log('验证码获取失败')
          console.log('Code-0', res.Code)
          this.errEvent = 'GET_CODE_ERR_0'
          let errText = {
            title: '验证码获取失败',
            content: '请检查手机号码是否有误'
          }
          this.codeError(errText)
        } else if (res.Code === 1) {
          console.log('验证码获取成功')
          console.log('Code-1', res.Code)
          this.errEvent = 'DEFAULT'
          this.truePhoneNumber = oParams.phoneNumber
          this.countDown() // 开始倒计时
        } else {
          this.errEvent = 'DEFAULT'
          console.log('Code', res.Code)
        }
      })
    },
    _checkVerificationCode (params) {
      let oParams = Object.assign({}, {
        phoneNumber: this.truePhoneNumber,
        code: this.phoneCode.value,
        actionType: 'register'
      }, params)
      checkVerificationCode(oParams).then((res) => {
        console.log('checkVerificationCode-res', res)
        console.log('checkVerificationCode-Flag', res.Flag)
        console.log('checkVerificationCode-Code', res.Code)
        // Code 返回结果 -- 0：失败、1：成功(未确定)
        console.log('checkVerificationCode-Message', res.Message)
        if (res.Code === 0) {
          console.log('000')
          console.log('验证失败')
          this.errEvent = 'CHECK_CODE_ERR_0'
          let errText = {
            title: '验证失败',
            content: '请检查手机号码是否有误'
          }
          this.codeError(errText)
          return false
        } else if (res.Code === 1) {
          console.log('111')
          console.log('验证成功')
          this.errEvent = 'DEFAULT'
          this._checkCodeAndPhoneNumber(params)
          return true
        } else {
          console.log(res.Code)
          this.errEvent = 'DEFAULT'
          return false
        }
      })
    },
    _checkCodeAndPhoneNumber (params) {
      let oParams = Object.assign({}, {
        phoneNumber: this.truePhoneNumber,
        code: this.phoneCode.value,
        actionType: 'register'
      }, params)
      checkCodeAndPhoneNumber(oParams).then((res) => {
        console.log('checkCodeAndPhoneNumber-res', res)
        console.log('checkCodeAndPhoneNumber-Flag', res.Flag)
        console.log('checkCodeAndPhoneNumber-Code', res.Code)
        // Code 返回结果 -- 0：该手机号码已注册、1：该手机号码可以注册、2、验证码不正确
        console.log('checkCodeAndPhoneNumber-Message', res.Message)
        if (res.Code === 0) {
          console.log('该手机号码已注册')
          this.errEvent = 'CHECK_CODE_AND_PHONE_ERR_0'
          //          let errText = {
          //            title: '该手机号码已注册',
          //            content: '请重新登陆'
          //          }
          this.codeError({
            title: '该手机号码已注册',
            content: '请重新登陆',
            confirmBtnText: '前往登陆'
          })
        } else if (res.Code === 1) {
          console.log('该手机号码可以注册')
          console.log('跳转下一页，进行密码设置')
          this.errEvent = 'DEFAULT'
          this.$router.push({
            path: '/user-register-set-password'
          })
        } else if (res.Code === 2) {
          console.log('验证码不正确')
          this.errEvent = 'CHECK_CODE_AND_PHONE_ERR_2'
          let errText = {
            title: '验证码不正确',
            content: '请输入正确的验证码'
          }
          this.codeError(errText)
        } else {
          this.errEvent = 'DEFAULT'
          console.log(res.Code)
        }
      })
    },
    _inputPhone () {
      if (this.phoneNum.value.length === 11) {
        console.log('长度为11，才开启获取验证码按钮与验证码输入框')
        this.getCodeDisable = false
        this.phoneCode.disabled = false
      } else {
        this.getCodeDisable = true
        this.phoneCode.disabled = true
      }
    },
    _inputCode () {
      this.isNextBtnDisable()
    },
    isNextBtnDisable () {
      console.log('验证码输入中，判断两个输入框是否有值，有值就开启下一步按钮，没值就禁用下一步按钮')
      if (this.phoneCode.value !== '' && this.phoneNum.value !== '') {
        this.nextBtnDisable = false
      } else {
        this.nextBtnDisable = true
      }
    },
    getCode () {
      if (this.getCodeDisable === false) { // 当获取验证码按钮为非禁用状态时
        this._getVerificationCode() // 获取验证码
      } else {
        return false
      }
    },
    checkCode () {
      if (this.nextBtnDisable === false) { // 当下一步按钮为非禁用状态时
        this._checkVerificationCode()
      } else {
        return false
      }
    },
    codeError (config) {
      this.$createDialog({
        type: 'confirm',
        //          icon: 'cubeic-alert',
        title: config.title || '验证码错误',
        content: config.content || '请重新注册',
        confirmBtn: {
          text: config.confirmBtnText || '重新注册',
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
            this.errEvent === 'CHECK_CODE_AND_PHONE_ERR_2' ||
            this.errEvent === 'DEFAULT') {
            console.log('获取验证码失败，请重新注册')
            this.resetInputVal()
          } else if (this.errEvent === 'CHECK_CODE_AND_PHONE_ERR_0') {
            console.log('该手机号码已注册，请重新登录')
            this.$router.push({
              path: '/user-login'
            })
          } else {
            console.log('获取验证码失败，请重新注册')
            this.resetInputVal()
          }
        },
        onCancel: () => {
          console.log('点击了取消按钮，这里返回false即可')
          return false
        }
      }).show()
    },
    resetInputVal () {
      this.phoneNum.value = ''
      this.phoneCode.value = ''
      this.truePhoneNumber = ''
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
    }
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {},
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'user-find-pwd.styl'
</style >
