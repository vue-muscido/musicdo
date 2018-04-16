import axios from 'axios'
import { commonParams } from './config' // 引入通用参数

export function getProductDetail (goodsId, userId) {
  const url = '/api/Product/GetProductDetail'
  const data = Object.assign({}, commonParams, {
    ID: goodsId || '',
    UserID: userId || 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
