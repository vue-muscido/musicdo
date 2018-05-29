export function localSave (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
export function localTake (key) {
  console.log('获取本地存储：', key, JSON.parse(localStorage.getItem(key)))
  if (JSON.parse(localStorage.getItem(key)) === null) {
    return {}
  } else {
    return JSON.parse(localStorage.getItem(key))
  }
}
export function localremove (key) {
  localStorage.removeItem(key)
}
