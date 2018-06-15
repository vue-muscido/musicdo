import * as types from './mutation-types'
import { localSave, localTake, localremove } from 'common/js/localStore'
// import { tabFlag } from './getters'

export const xSetUserMsg = function ({commit}, msg) {
  localSave('userMsg', msg)
  commit(types.SET_USER_MSG, localTake('userMsg'))
}

export const xRrmoveUserMsg = function ({commit}) {
  localremove('userMsg')
  commit(types.SET_USER_MSG, '')
}

export const xSetTabFlag = function ({commit}, tabFlag) {
  commit(types.SET_TAB_FLAG, tabFlag)
}
