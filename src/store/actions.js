import * as types from './mutation-types'

export const toTest = function ({commit}) {
  commit(types.MY_TEST_STR)
}

export const setLoginFlag = function ({commit, state}, flag) {
  commit(types.SET_LOGIN_FLAG, flag)
  console.log(state.isLogin)
}

export const toGetUserMsg = function ({commit}) {
  commit(types.GET_USER_MSG)
}
