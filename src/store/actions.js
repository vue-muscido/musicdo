import * as types from './mutation-types'
import { localSave, localremove } from 'common/js/localStore'

export const xSetUserMsg = function ({commit}, msg) {
  localSave('userMsg', msg)
  commit(types.SET_USER_MSG, msg)
}

export const xRrmoveUserMsg = function ({commit}, msg) {
  localremove('userMsg')
  commit(types.SET_USER_MSG, {msg})
}
