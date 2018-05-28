import { localTake } from 'common/js/localStore'

const state = {
  otest: '测试123123123mm',
  userMsg: localTake('userMsg') ? localTake('userMsg') : null,
  isLogin: false
}
export default state
