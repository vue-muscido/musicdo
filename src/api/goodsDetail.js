import axios from 'axios'
import { commonParams } from './config' // 引入通用参数

// 商品基本页面信息
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

// 获取商品规格
export function getSpec (ProductID) {
  const url = '/api/Product/GetSpec'
  const data = Object.assign({}, commonParams, {
    ProductID: ProductID || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取商品参数
export function getProParameters (ProductID) {
  const url = '/api/Product/GetProParameters'
  const data = Object.assign({}, commonParams, {
    ProductID: ProductID || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 商品规格都选择后，获取商品的真实数据信息
// 备注：通过商品的所有规格来获取其商品的真正价格，
// 库存等参数信息(例如：选择了颜色和大小后，把他们的参数以逗号隔开拼接成参数传递)
export function getProductTrueSpec (ProductID, Param) {
  const url = '/api/Product/GetProductTrueSpec'
  const data = Object.assign({}, commonParams, {
    ProductID: ProductID || '',
    Param: Param || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 商品详情页
export function showProductContent (ProductID) {
  const url = '/api/Product/ShowProductContent'
  const data = Object.assign({}, commonParams, {
    ProductID: ProductID || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取商品评论统计数量
export function getProCommentCount (ProductID) {
  const url = '/api/Product/GetProCommentCount'
  const data = Object.assign({}, commonParams, {
    ProductID: ProductID || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 商品评论列表
export function getProductCommentList (Params) {
  const url = '/api/Product/GetProductCommentList'
  const data = Object.assign({}, commonParams, {
    ProductID: Params.ProductID || '',
    ShopID: Params.ShopID || '',
    Type: Params.Type || '', // 0全部 1追加 2好评 3中评 4差评 5有图
    PageIndex: Params.PageIndex || 1, // 默认为 1
    PageSize: Params.PageSize || 20 // 默认为 20
  })

  return axios.get(url, {
    // 返回
    // CommentData：评论信息
    // CommentLevel:1好评 2：中评 3：差评
    // IsAdditional：0为第一次评论 1为追评
    // Contents评论内容
    // Date评价时间
    // CommentImg:评论图片集合
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 店铺基本统计信息
export function getShopProductCount (ShopID) {
  const url = '/api/Product/GetShop_ProductCount'
  const data = Object.assign({}, commonParams, {
    ID: ShopID || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 宝贝收藏 POST
export function collectProduct (Params) {
  const url = '/api/Product/CollectProduct'
  const data = Object.assign({}, commonParams, {
    ProductID: Params.ProductID || '',
    UserID: Params.UserID || ''
  })

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 宝贝收藏列表 POST
export function getProductCollectList (Params) {
  const url = '/api/Product/GetProductCollectList'
  const data = Object.assign({}, commonParams, {
    UserID: Params.UserID || ''
  })

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 宝贝收藏删除(收藏列表中删除) POST
export function deleteCollectProduct (Params) {
  const url = '/api/Product/DeleteCollectProduct'
  const data = Object.assign({}, commonParams, {
    IDs: Params.IDs || '', // 字符串类型，收藏商品表中的ID集合，以逗号隔开
    UserID: Params.UserID || ''
  })

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 宝贝收藏删除(商品详情中删除) POST
export function deleteCollectFromProDetail (Params) {
  const url = '/api/Product/DeleteCollectFromProDetail'
  const data = Object.assign({}, commonParams, {
    ID: Params.ID || '', // 数字类型,商品ID
    UserID: Params.UserID || ''
  })

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
