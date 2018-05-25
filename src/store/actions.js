import * as types from './mutation-types'
import { localSave, localTake, localremove } from 'common/js/localStore'

export const toTest = function ({commit}) {
  commit(console.log('打印', types.MY_TEST_STR))
}

export const toLocalSave = function ({commit}, key, val) {
  commit(localSave(key, val))
}

export const toLocalTake = function ({commit}, key) {
  commit(localTake(key))
}

export const toLocalremove = function ({commit}, key) {
  commit(localremove(key))
}
