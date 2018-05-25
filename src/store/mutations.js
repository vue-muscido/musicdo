import * as types from './mutation-types'

const matutaions = {
  [types.MY_TEST_STR] (state) {
    console.log('matutaions测试', state.otest)
  },
  [types.SET_LOGIN_FLAG] (state, flag) {
    state.isLogin = flag
  }
}
export default matutaions
