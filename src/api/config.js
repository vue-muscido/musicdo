// 设置通用参数
export const commonParams = {
  // g_tk: 5381,
  // inCharset: 'utf-8',
  // outCharset: 'utf-8',
  // notice: 0,
  // format: 'jsonp'
}

export const options = {
  // param: 'jsonpCallback'
}

export const ERR_OK = 1

export const LOCAL_HOST = 'http://musicdo.cn'

// export const baseImgUrl = LOCAL_HOST + ''

export function objConversStr (obj) {
  let str = ''
  for (let k in obj) {
    str += `&${k}=${obj[k]}`
  }
  str = str.substring(1, str.length)
  return str
}
