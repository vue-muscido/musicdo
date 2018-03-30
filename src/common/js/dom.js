export function hasClass (el, className) {
  // 正则匹配 className 头尾可以有空格
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // 正则判断 是否有这个className，有就返回true，无就返回false
  return reg.test(el.className)
}

export function addClass (el, className) {
  // 用hasClass 函数判断，如果这个元素有 这个类名，就什么都不做，返回
  if (hasClass(el, className)) {
    return
  }
  // 没有这个 className 就用split 函数把现有的 className（可能有多个）用空格拆开，组成一个名为newClass 的字符串数组
  let newClass = el.className.split(' ')
  console.log(newClass)
  // 把这个 className 插入到 newClass 数组中
  newClass.push(className)
  // 重置这个元素的 className，用join 函数把newClass 数组用空格分开
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
