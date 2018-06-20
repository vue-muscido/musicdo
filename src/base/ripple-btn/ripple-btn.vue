<template >
  <button @click="reppleClick" class="ripple-btn" :class="{active: reppleButton.toggle}" >
    <span class="ripple-elf" :class="{'animate': reppleButton.animate}" ></span >
    <slot ></slot >
  </button >
</template >

<script type="text/ecmascript-6" >
export default {
  // 别名
  name: 'RippleBtn',
  // 数据
  data () {
    return {
      reppleButton: {
        animate: false,
        toggle: false
      }
    }
  },
  // 子组件
  components: {},
  // 接受父组件传递数据
  props: {
    pos: {
      type: Boolean,
      default: true
    }
  },
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
    reppleClick (e) {
      if (this.reppleButton.animate === false) {
        let button = e.target
        let ripple = button.querySelector('.ripple-elf')
        if (ripple) {
          let d = Math.max(button.offsetHeight, button.offsetWidth)
          let x = e.layerX - ripple.offsetWidth / 2
          let y = e.layerY - ripple.offsetHeight / 2
          console.log(x, y)
          if (this.pos) {
            ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
          } else {
            ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px;')
          }
          this.reppleButton.animate = true
          this.$nextTick(() => {
            setTimeout(() => {
              this.reppleButton.animate = false
            }, 660)
          })
        }
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
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.ripple-btn
  background transparent
  border none
  position relative
  display inline-block
  font-family Roboto, Helvetica, Arial, sans-serif
  font-size 1.4rem
  font-weight 500
  letter-spacing 0
  overflow hidden
  will-change box-shadow, transform
  -webkit-transition box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1)
  transition box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1)
  outline none
  cursor pointer
  text-decoration none
  text-align center
  vertical-align middle
  &::before
    content ''
    position absolute
    background transparent
    top 0
    left 0
    right 0
    bottom 0

.ripple-elf
  display block
  position absolute
  z-index -1
  background-color hsla(6%, 6%, 66%, 0.66)
  border-radius 100%
  transform scale(0)

.ripple-elf.animate
  animation rippleAni 0.66s cubic-bezier(0, 0, .66, 1)

@keyframes rippleAni
  100%
    opacity 0
    transform scale(4)
  

</style >
