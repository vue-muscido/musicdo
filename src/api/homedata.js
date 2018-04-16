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
