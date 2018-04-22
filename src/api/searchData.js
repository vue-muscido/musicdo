import axios from 'axios'

export function searchProduct (oParams) {
  const url = '/api/Product/searchProduct'
  const commonParams = {}
  const searchParams = oParams || {}
  const data = Object.assign({}, commonParams, {
    keyword: searchParams.keyword || '',
    categoryID: searchParams.categoryID || '',
    price_min: searchParams.price_min || '',
    price_max: searchParams.price_max || '',
    brandID: searchParams.brandID || '',
    sort: searchParams.sort || 2,
    pageIndex: searchParams.pageIndex || 1,
    pageSize: searchParams.pageSize || 20
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetBrandAndCategoryByKeyword (oParams) {
  const url = '/api/Product/GetBrandAndCategoryByKeyword'
  const commonParams = {}
  const searchParams = oParams || {}
  const data = Object.assign({}, commonParams, {
    type: searchParams.type || 1,
    content: searchParams.content || ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
