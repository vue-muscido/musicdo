<template >
  <div class="search-list" >
    <div class="mask" v-show="ttttt" @click="_ttttt(false)"></div>
    <div class="inner" >
      <dl >

        <dt class="screen-tab" >
          <!--筛选分类导航 -begin-->
          <div class="screen-title" >
            <ul >
              <li class="comprehensive" @click="isAct(0)">
                <span class="tit"
                      :class="screenActIndex == 0?'act':''"
                      >综合</span >
                <i >
                  <img src="" />
                </i >
                <i class="on-v" >
                  <img src="" />
                </i >

                <div class="dropdown-list" >
                  <ol >
                    <li class="act" >综合</li >
                    <li >最新上架</li >
                    <li >xxx</li >
                    <li >yyy</li >
                  </ol >
                </div >
                <div class="sup-tc" ></div >
              </li >

              <li class="sales-volume" :class="isSalesVolumeUp?'up':'donw'" @click="isAct(1)">
                <span class="tit"
                      :class="screenActIndex == 1?'act':''"
                      >销量</span >
                <i class="donw" >
                  <img src="./img/gao@2x.png" />
                </i >
                <i class="up" >
                  <img src="./img/di@2x.png" />
                </i >
              </li >

              <li class="price" :class="isPriceUp?'up':'donw'" @click="isAct(2)" >
                <span class="tit"
                      :class="screenActIndex == 2?'act':''"
                      >价格</span >
                <i class="donw" >
                  <img src="./img/gao@2x.png" />
                </i >
                <i class="up" >
                  <img src="./img/di@2x.png" />
                </i >
              </li >

              <li class="screen" @click="isAct(3)">
                <span class="tit"
                      :class="screenActIndex == 3?'act':''"
                      >筛选</span >
              </li >

            </ul >
          </div >
          <!--筛选分类导航 -end-->
        </dt >

        <dd class="products" >

          <cube-scroll
            ref="scroll"
            :data="searchData"
            :options="options" >

            <!--<ul class="search-products list-mode">-->
            <ul class="search-products"
                :class="listMode == true?'list-mode':'bigpic-mode'" >
              <li v-for="(item,index) in searchData" :key="index" >
                <div class="item-inner" >

                  <div class="imgbox" ref="imgbox" >
                    <a href="" >
                      <img :src="getImg (item.SrcDetail)" ref="img" />
                    </a >
                  </div >

                  <div class="infobox" >
                    <p class="title" >
                      <a href="" >{{item.Name}}</a >
                    </p >
                    <div class="price" >
                      <span >￥</span ><span class="int-num" >{{item.MemberPrice}}.</span ><span
                      class="fl-num" >00</span >
                    </div >
                    <div class="sales" >
                      <span >月销售<span class="sales-num" >{{item.Score}}</span ></span >
                    </div >
                  </div >

                </div >
              </li >
            </ul >

          </cube-scroll >

        </dd >

      </dl >

    </div >
  </div >
</template >

<script type="text/ecmascript-6" >
import { baseImgUrl } from 'api/config'
export default {
  data () {
    return {
      options: {},
      screenActIndex: 0,
      isSalesVolumeUp: false,
      isPriceUp: false,
      ttttt: false
    }
  },
  // 接收父组件传入的值
  props: {
    searchKeyword: {
      type: String,
      default: ''
    },
    searchData: {
      type: Array,
      default: []
    },
    listMode: {
      type: Boolean,
      default: false
    }
  },
  created () {
    //    console.log(this.searchData)
    //    this._toSearch('')
    console.log(this.searchKeyword)
    console.log(this.searchData)
    console.log(this.listMode)
    this.setImgHeight()
  },
  updated () {
    //    this.$nextTick(function () {
    //      console.log(this.$refs)
    //    })
    //    this.setImgHeight()
  },
  mounted () {},
  methods: {
    getImg (img) {
      return baseImgUrl + img
    },
    setImgHeight () {
      this.$nextTick(function () {
        console.log(this.$refs.imgbox)
        this.$refs.imgbox.forEach(function (v, k) {
          // TODO - 设置图片宽高相等
          console.log(v.clientWidth)
          console.log(v.clientHeight)
          console.log(k)
        })
      })
    },
    isAct (index) { // TODO - 排序
      this.screenActIndex = index
      if (this.screenActIndex === 1) {
        console.log(1)
        this._isSalesVolumeUp(this.isSalesVolumeUp)
      } else if (this.screenActIndex === 2) {
        console.log(2)
        this._isPriceUp(this.isPriceUp)
      } else if (this.screenActIndex === 3) {
        this._ttttt(true)
        console.log(3)
      } else {
        console.log(this.screenActIndex)
      }
    },
    _isSalesVolumeUp (flag) { // TODO - 排序
      if (flag) {
        console.log('down')
      } else {
        console.log('up')
      }
      this.isSalesVolumeUp = !flag
    },
    _isPriceUp (flag) { // TODO - 排序
      if (flag) {
        console.log('down')
      } else {
        console.log('up')
      }
      this.isPriceUp = !flag
    },
    _ttttt (ooo) {
      if (ooo) {
        this.ttttt = true
      } else {
        this.ttttt = false
      }
    }
  },
  watch: {},
  computed: {},
  destroyed () {}
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus" >
@import 'search-list.styl'

</style >
