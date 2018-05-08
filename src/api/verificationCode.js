import axios from 'axios'
// import Qs from 'qs'
import { objConversStr } from './config'
// 获取验证码
export function getVerificationCode (oParams) {
  const url = '/api/Foundation/GetVerificationCode'

  // actionType---操作分类
  // -register(注册)、
  // -findPwd(找回密码)、
  // -binding(注册绑定)、
  // -reset(修改密码)、
  // -login(短信登录验证码)

  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber || '',
    actionType: oParams.actionType || ''
  })

  console.log('data', data)

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return axios({
    method: 'get',
    url: url,
    params: data
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

// 检测验证码 post
export function checkVerificationCode (oParams) {
  const url = '/api/Foundation/CheckCode'
  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber,
    code: oParams.code,
    actionType: oParams.actionType
  })

  return axios({
    method: 'post',
    url: url,
    data: objConversStr(data) // 把传入的obj转为 ‘=’号链接键值
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

// 检测验证码和手机号码已存在(注册页面) post
export function checkCodeAndPhoneNumber (oParams) {
  const url = '/api/Foundation/CheckCodeAndPhoneNumber'
  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber,
    code: oParams.code,
    actionType: oParams.actionType
  })

  // console.log('checkCodeAndPhoneNumber-data', data)
  //
  // return axios.post(url, {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  //   },
  //   params: Qs.stringify(data)
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return axios({
    method: 'post',
    url: url,
    data: objConversStr(data) // 把传入的obj转为 ‘=’号链接键值
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

// buyNow留着测试，下个完善版本删除
export function buyNow (oparams) {
  // var params = new URLSearchParams()
  // params.append('ProductID', 27760)
  // params.append('Param', '2833')
  // params.append('Count', 1)
  // let params = 'ProductID=27760&Param="2833"&Count=1'
  // console.log(objConversStr(oparams))
  return axios({
    method: 'post',
    url: '/api/Member/BuyNow',
    data: objConversStr(oparams)
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}

// export function buyNow2 () {
//   var params = new URLSearchParams()
//   params.append('ProductID', 27760)
//   params.append('Param', '2833')
//   params.append('Count', 1)
//   return axios({
//     method: 'post',
//     url: '/api/Member/BuyNow',
//     data: params
//   }).then(function (response) {
//     console.log(response)
//   }).catch(function (error) {
//     console.log(error)
//   })
// }
