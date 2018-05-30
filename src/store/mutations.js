import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_MSG] (state, msg) {
    state.userMsg = msg
  }
}
export default mutations
