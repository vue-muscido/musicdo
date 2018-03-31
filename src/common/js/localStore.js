export function localSave (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
  console.log(JSON.stringify(val))
}
export function localTake (key) {
  return JSON.parse(localStorage.getItem(key))
}
export function localremove (key) {
  localStorage.removeItem(key)
}
