<template >
  <div class="user-register-set-password" >
    
    <div class="input-bar" >
      <div class="set-password-box" >
        <cube-input
          class="input-set-password"
          v-model="setPassword.value"
          :placeholder="setPassword.placeholder"
          :type="setPassword.type"
          :maxlength="setPassword.maxlength"
          :readonly="setPassword.readonly"
          :disabled="setPassword.disabled"
          :autofocus="setPassword.autofocus"
          :autocomplete="setPassword.autocomplete"
          :clearable="setPassword.clearable"
          :eye="setPassword.eye"
          @input="_inputPassword()"
        ></cube-input >
      </div >
      <div class="again-password-box" >
        <cube-input
          class="input-again-password"
          v-model="againPassword.value"
          :placeholder="againPassword.placeholder"
          :type="againPassword.type"
          :maxlength="againPassword.maxlength"
          :readonly="againPassword.readonly"
          :disabled="againPassword.disabled"
          :autofocus="againPassword.autofocus"
          :autocomplete="againPassword.autocomplete"
          :clearable="againPassword.clearable"
          :eye="againPassword.eye"
          @input="_inputAgain()"
        ></cube-input >
      </div >
    </div >
    
    <div class="btn-bar" >
      <div class="submit-btn" :class="btnDisable?'disable':''" @click="checkPassword()" >
        提交
      </div >
    </div >
    
  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  // 别名
  name: '',
  // 数据
  data () {
    return {
      setPassword: {
        value: '',
        placeholder: '请输密码',
        type: 'password',
        readonly: false,
        maxlength: 16,
        disabled: false,
        autofocus: true,
        autocomplete: false,
        clearable: false,
        eye: {open: false}
      },
      againPassword: {
        value: '',
        placeholder: '请再次输密码',
        type: 'password',
        readonly: false,
        maxlength: 16,
        disabled: false,
        autofocus: false,
        autocomplete: false,
        clearable: false,
        eye: {open: false}
      },
      btnDisable: true
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
    _inputPassword () {
      console.log('限制密码长度-最长最短限制')
    },
    _inputAgain () {
      this.isBtnDisable()
    },
    checkPassword () {
      if (this.btnDisable === true) {
        console.log('禁用中，怎么按都没用')
        return false
      } else {
        console.log('开启中，这里验证两次输入是否相同、密码长度、正则验证数字英文或符号、没通过提示重新输入、通过就提交后台提示用户跳转页面')
      }
    },
    isBtnDisable () {
      console.log('判断两个输入框是否有值，都有值提交按钮开启，否则提交按钮禁用')
      if (this.setPassword.value !== '' && this.againPassword.value !== '') {
        this.btnDisable = false
      } else {
        this.btnDisable = true
      }
    }
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {},
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import 'user-register-set-password.styl'
</style >
