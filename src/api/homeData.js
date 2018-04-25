// import jsonp from 'common/js/jsonp' // 引入 jsonp
// import { commonParams, options } from './config' // 引入通用参数
import { commonParams } from './config' // 引入通用参数
import axios from 'axios'

export function getHomeFirst () {
  const url = '/api/Home/GetHomeFirst'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getHomeSecond () {
  const url = '/api/Home/GetHomeSecond'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const tabData = [
  {
    pic: 'pinpai',
    name: '品牌',
    index: 0
  },
  {
    pic: 'gangqin',
    name: '钢琴',
    index: 1
  },
  {
    pic: 'jita',
    name: '吉他',
    index: 2
  },
  {
    pic: 'guanyue',
    name: '管乐器',
    index: 3
  },
  {
    pic: 'xianyue',
    name: '弦乐器',
    index: 4
  },
  {
    pic: 'minyue',
    name: '民族乐器',
    index: 5
  },
  {
    pic: 'jianpan',
    name: '键盘乐器',
    index: 6
  },
  {
    pic: 'jiajiyue',
    name: '打击乐器',
    index: 7
  },
  {
    pic: 'peijian',
    name: '配件',
    index: 8
  },
  {
    pic: 'gengduo',
    name: '分类',
    index: 9
  }
]
