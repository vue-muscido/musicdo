import { localTake } from 'common/js/localStore'

const IS_NO_LOGIN = false
const IS_LOGIN = true

const state = {
  otest: '测试123123123mm',
  userMsg: localTake('userMsg') === null ? {} : localTake('userMsg'),
  // userMsg: {},
  isLogin: localTake('userMsg') === null || {} ? IS_NO_LOGIN : IS_LOGIN
  // isLogin: false
}
export default state
