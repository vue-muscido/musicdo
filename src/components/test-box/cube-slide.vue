<template >
  <div >
    <p style="position: fixed;top:0;width: 100%;background-color: skyblue;color: red;font-size: 2rem;text-align: center">test-box</p>
    <!--<cube-slide-->
      <!--ref="slide"-->
      <!--:data="slide" >-->
      <!--<cube-slide-item-->
        <!--v-for="(item, index) in slide"-->
        <!--:key="index" >-->
      <!--</cube-slide-item >-->
    <!--</cube-slide >-->
  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  // 别名
  name: 'TestBox',
  // 数据
  data () {
    return {
      slideData: [1, 2, 3]
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

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
</style >
