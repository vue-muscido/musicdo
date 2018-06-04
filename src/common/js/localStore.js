export function localSave (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
export function localTake (key) {
  if (JSON.parse(localStorage.getItem(key)) === null) {
    return ''
  } else {
    console.log('返回：', JSON.parse(localStorage.getItem(key)))
    return localStorage.getItem(key)
  }
}
export function localremove (key) {
  localStorage.removeItem(key)
}
