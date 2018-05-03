export function toArr (str) {
  let ret = []
  if (!str) {
    return ''
  }
  for (var key in str) {
    ret.push(str[key])
  }
  console.log(ret)
  return ret
}
