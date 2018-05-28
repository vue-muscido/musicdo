import * as types from './mutation-types'
import { localSave, localTake, localremove } from 'common/js/localStore'

const matutaions = {
  [types.MY_TEST_STR] (state) {
    console.log('matutaions测试', state.otest)
  },
  [types.SET_LOGIN_FLAG] (state, flag) {
    state.isLogin = flag
  },
  [types.SET_USER_MSG] (state, userMsg) {
    localSave('userMsg', userMsg)
    console.log('state', state)
    console.log('save userMsg', userMsg)
  },
  [types.GET_USER_MSG] (state) {
    state.userMsg = localTake('userMsg')
    console.log('state.userMsg', state.userMsg)
  },
  [types.REMOVE_USER_MSG] (state) {
    localremove('userMsg')
    state.userMsg = null
    console.log(localTake('userMsg'))
    console.log('state.userMsg', state.userMsg)
  }
}
export default matutaions
