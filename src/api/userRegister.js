import axios from 'axios'
import { objConversStr } from './config'
export function register (oParams) {
  const url = '/api/Foundation/Register'
  const data = Object.assign({}, {}, {
    phoneNumber: oParams.phoneNumber,
    pwd: oParams.pwd,
    token: oParams.token
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
