<template >
  <div class="empty" >
    <div class="is-empty-wrap" >
      <div class="is-empty-con" >
        <div class="img-box" >
          <div class="img" :class="dataTypeImg" ></div >
        </div >
        <div class="text" >
          <p >{{emptyStr}}</p >
        </div >
      </div >
    </div >
  </div >
</template >

<script type="text/ecmascript-6" >
export default {
  // 别名
  name: 'Empty',
  // 数据
  data () {
    return {
      dataTypeImg: ''
    }
  },
  // 子组件
  components: {},
  // 接受父组件传递数据
  props: {
    emptyStr: {
      type: String,
      default: '暂无数据'
    },
    dataType: {
      type: String,
      default: ''
    }
  },
  // 组件实例创建前
  beforeCreate () {},
  // 组件实例创建后
  created () {
    this.setImg()
  },
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
    setImg () {
      if (this.dataType === '1' || this.dataType === 'cart') {
        this.dataTypeImg = 'empty-cart'
      } else if (this.dataType === '2' || this.dataType === 'search') {
        this.dataTypeImg = 'empty-search'
      } else {
        this.dataTypeImg = 'empty-default'
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
@import 'empty.styl'
</style >
