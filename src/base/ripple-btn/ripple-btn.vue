<template>
  <button @click="reppleClick" class="__cov-button-ripple" :class="{active: repple_button.toggle}">
    <slot></slot>
    <span class="__cov-ripple" :class="{'animate': repple_button.animate}"></span>
  </button>
</template>

<script type="text/ecmascript-6">
export default {
  // 别名
  name: 'CovButton',
  // 数据
  data () {
    return {
      repple_button: {
        animate: false,
        toggle: false
      }
    }
  },
  // 子组件
  components: {},
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
    reppleClick (e) {
      this.repple_button.animate = true
      let button = e.target
      let ripple = button.querySelector('.__cov-ripple')
      if (ripple) {
        let d = Math.max(button.offsetHeight, button.offsetWidth)
        let x = e.layerX - ripple.offsetWidth / 2
        let y = e.layerY - ripple.offsetHeight / 2
        ripple.setAttribute('style', 'height: ' + d + 'px; width: ' + d + 'px; top: ' + y + 'px; left: ' + x + 'px;')
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.repple_button.animate = false
        }, 660)
      })
    }
  },
  // 实时计算数据（一个数据受多个数据影响）
  computed: {},
  // 实时计算数据（一个数据影响多个数据）
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.__cov-button-ripple {
  background: transparent;
  border: none;
  //border-radius: 2px;
  //color: #000;
  position: relative;
  //height: 36px;
  //min-width: 64px;
  //padding: 0 16px;
  display: inline-block;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  //text-transform: uppercase;
  //line-height: 1;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow, transform;
  -webkit-transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
  transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  //line-height: 36px;
  vertical-align: middle;
  //min-width: 96px;
}

.__cov-button-ripple:hover {
  background-color: hsla(0, 0%, 62%, .2);
}

.__cov-ripple {
  display: block;
  position: absolute;
  z-index -1
  background: hsla(0, 0%, 65%, 0.66);
  border-radius: 100%;
  transform: scale(0);
}

.__cov-ripple.animate {
  animation: ripple 0.65s cubic-bezier(0.6, 0.7, 0.8, 0.9);
}

@keyframes ripple {
  100% {
    opacity: 0;
    transform: scale(3.5);
  }
}
</style>
