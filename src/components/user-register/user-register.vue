<template >
  <div class="user-register" >
    
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
          <span >获取验证码</span >
          <span ></span >
        </div >
      </div >
    </div >
    
    <div class="btn-bar" >
      <div class="next-btn" :class="btnDisable?'disable':''" @click="checkCode()" >
        下一步
      </div >
    </div >
    
  </div >
</template >

<script >
  export default {
    // 别名
    name: 'user-register',
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
          maxlength: 16,
          disabled: true,
          autofocus: false,
          autocomplete: false,
          clearable: true
        },
        getCodeDisable: true,
        btnDisable: true,
        retCode: '2222' // 模拟返回的正确验证码
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
        this.isBtnDisable()
      },
      isBtnDisable () {
        console.log('验证码输入中，判断两个输入框是否有值，有值就开启下一步按钮，没值就禁用下一步按钮')
        if (this.phoneCode.value !== '' && this.phoneNum.value !== '') {
          this.btnDisable = false
        } else {
          this.btnDisable = true
        }
      },
      checkCode () {
        if (this.phoneCode.value === this.retCode) {
          console.log('模拟验证码正确跳转')
          this.$router.push({
            path: '/user-register-set-password'
          })
        } else {
          console.log('模拟验证码错误弹提示')
          this.codeError()
        }
      },
      codeError () {
        this.$createDialog({
          type: 'confirm',
          //          icon: 'cubeic-alert',
          title: '验证码错误',
          content: '请重新输入验证码',
          confirmBtn: {
            text: '重新注册',
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
          },
          onCancel: () => {
            console.log('点击了取消按钮，这里返回false即可')
            return false
          }
        }).show()
      }
    },
    // 实时计算数据（一个数据受多个数据影响）
    computed: {},
    // 实时计算数据（一个数据影响多个数据）
    watch: {}
  }
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import 'user-register.styl'
</style >
