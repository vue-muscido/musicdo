import axios from 'axios'
import { objConversStr } from './config'
export function findPwd (oParams) {
  const url = '/api/Foundation/FindPwd'
  // type:
  // findPwd(找回密码) reset(修改密码)
  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber,
    pwd: oParams.pwd,
    token: oParams.token,
    type: oParams.type
  })

  return axios({
    method: 'post',
    url: url,
    data: objConversStr(data)
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}
