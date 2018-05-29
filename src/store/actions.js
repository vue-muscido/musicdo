import * as types from './mutation-types'

export const toTest = function ({commit}) {
  commit(types.MY_TEST_STR)
}

export const xSetLoginFlag = function ({commit, state}, userMsg) {
  commit(types.SET_LOGIN_FLAG, userMsg)
  console.log('state.isLogin flag', userMsg)
  console.log('state.isLogin', state.isLogin)
}

export const xToGetUserMsg = function ({commit}) {
  commit(types.GET_USER_MSG)
}

export const xToLogin = function ({commit, state}, userMsg) {
  commit(types.SET_LOGIN_FLAG, userMsg)
  console.log('state.isLogin flag', userMsg)
  console.log('state.isLogin', state.isLogin)
}

export const xExitLogin = function ({commit}) {
  commit(types.REMOVE_USER_MSG)
}

export const xCheckLogin = function ({commit}) {
  if (types.REMOVE_USER_MSG) {
    console.log(0)
  }
  commit(types.REMOVE_USER_MSG)
}
