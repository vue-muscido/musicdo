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
          @input=""
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
        ></cube-input >
        <div class="get-code-btn" >
          <span >获取验证码</span >
          <span ></span >
        </div >
      </div >
    </div >
    
    <div class="btn-bar" >
      <div class="next-btn" >
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
          disabled: false,
          autofocus: false,
          autocomplete: false,
          clearable: true
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
    methods: {},
    // 实时计算数据（一个数据受多个数据影响）
    computed: {},
    // 实时计算数据（一个数据影响多个数据）
    watch: {}
  }
</script >

<style lang="stylus" rel="stylesheet/stylus" >
@import 'user-register.styl'
</style >
