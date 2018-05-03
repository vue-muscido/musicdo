import axios from 'axios'
import { commonParams } from './config' // 引入通用参数

export function getBrandClassify () {
  const url = '/api/Classify/GetBrandClassify'
  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
