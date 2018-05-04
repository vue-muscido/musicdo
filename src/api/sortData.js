import axios from 'axios'
import { commonParams } from './config' // 引入通用参数

// 获取商品分类一级数据
export function getProductCategoryLevel () {
  const url = '/api/Classify/GetProductCategory_Level1'
  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取商品分类二级数据
export function getProductCategory (id) {
  const url = '/api/Classify/GetProductCategory'
  const data = Object.assign({}, commonParams, {CategoryID: id || ''})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
