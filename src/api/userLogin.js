import axios from 'axios'
import { objConversStr } from './config'
export function login (oParams) {
  const url = '/api/Foundation/Login'
  const data = Object.assign({}, {}, {
    userName: oParams.userName,
    pwd: oParams.pwd
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

export function loginByCode (oParams) {
  const url = '/api/Foundation/LoginByCode'
  const data = Object.assign({}, {}, {
    userName: oParams.userName,
    code: oParams.code
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
