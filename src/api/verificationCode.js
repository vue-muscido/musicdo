import axios from 'axios'
import Qs from 'qs'

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

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 检测验证码 post
export function checkVerificationCode (oParams) {
  const url = '/api/Foundation/CheckCode'

  console.log('checkVerificationCode-oParams', oParams)

  const data = Object.assign({}, {}, {
    phoneNumber: '',
    code: '',
    actionType: oParams.actionType
  })

  console.log('checkVerificationCode-data', data)

  return axios.post(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: Qs.stringify(data) // --/////////////////////////-- //
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 检测验证码和手机号码已存在(注册页面) post
export function checkCodeAndPhoneNumber (oParams) {
  const url = '/api/Foundation/CheckCodeAndPhoneNumber'

  console.log('checkCodeAndPhoneNumber-oParams', oParams)

  const data = Object.assign({}, {}, {
    phoneNumber: '',
    code: '',
    actionType: oParams.actionType
  })

  console.log('checkCodeAndPhoneNumber-data', data)

  return axios.post(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    params: Qs.stringify(data)
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function buyNow (oParams) {
  const url = '/api/Member/BuyNow'

  console.log('Member/BuyNow-oParams', oParams)

  const data = Object.assign({}, {}, {
    ProductID: oParams.ProductID,
    Param: oParams.Param,
    Count: oParams.Count
  })

  console.log('Member/BuyNow-data', data)

  return axios.post(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    params: Qs.stringify(data),
    data: Qs.stringify(data)
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function buyNow2 () {
  var params = new URLSearchParams()
  params.append('ProductID', 27760)
  params.append('Param', '2833')
  params.append('Count', 1)
  this.$ajax({
    method: 'post',
    url: '/api/Member/BuyNow',
    data: params
    //          data: {id: '3', name: 'abc'}
  }).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error)
  })
}
