import axios from 'axios'

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
    phoneNumber: oParams.phoneNumber,
    code: oParams.code,
    actionType: oParams.actionType
  })

  console.log('checkVerificationCode-data', data)

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 检测验证码和手机号码已存在(注册页面) post
export function checkCodeAndPhoneNumber (oParams) {
  const url = '/api/Foundation/CheckCodeAndPhoneNumber'

  console.log('checkCodeAndPhoneNumber-oParams', oParams)

  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber,
    code: oParams.code,
    actionType: oParams.actionType
  })

  console.log('checkCodeAndPhoneNumber-data', data)

  return axios.post(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
