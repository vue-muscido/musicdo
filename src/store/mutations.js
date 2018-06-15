import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_MSG] (state, msg) {
    state.userMsg = msg
  },
  [types.SET_TAB_FLAG] (state, tabFlag) {
    state.tabFlag = tabFlag
  }
}
export default mutations
