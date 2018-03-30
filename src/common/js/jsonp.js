import originJsonp from 'jsonp' // 引入jsonp 依赖

export default function jsonp (url, data, option) {
  // 检索 url ，如果 url 中没有'?'(<0即没有)就添加'?'和data值，
  //           如果 url 中有'?'，则表示url原来是有带参数的，那么直接调用封装好的param 添加'&'和data值即可
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  /*
  * Promise对象代表一个异步操作，
  * 有三种状态： Pending（进行中）、
  *            Resolved（已完成，又称 Fulfilled）、
  *            Rejected（已失败）。
  * 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
  * Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
  * 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
  * 就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
  * 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
  * 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
  * 此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
  */
  return new Promise((resolve, reject) => {
    /*
    * jsonp 参数
    * jsonp（url，opts，fn）
    *
    * url（String）url来获取
    *
    * opts（Object），可选
    *   param（String）查询字符串参数的名称以指定回调（默认为callback）
    *   timeout（Number）发出超时错误后多久。0禁用（默认60000）
    *   prefix（String）前缀用于处理jsonp响应的全局回调函数（默认为 __jp）
    *   name（String）处理jsonp响应的全局回调函数的名称（默认为 prefix + incremented counter）
    *
    * fn 回调函数
    * 该回调是通过err, data参数调用的。
    * 如果超时，err将是一个Error对象，它message是 Timeout。
    * 返回一个函数，该函数在被调用时将取消正在进行的jsonp请求（fn不会被调用）。
    */

    // 调用 originJsonp ，可参考 https://www.npmjs.com/package/jsonp
    originJsonp(url, option, (err, data) => {
      if (!err) { // 非err
        // resolve(value)是在Promise在已经异步完成成功(Resolved)之后执行的
        resolve(data) // 已完成
      } else { // err
        // reject(value)是在Promise在异步失败之后(Rejected)执行。
        reject(err) // 已失败
      }
    })
  })
}

// 参数封装
export function param (data) {
  let url = ''
  for (var k in data) {
    // 值为 undefined 时 转为空字符串， 以防传出 undefined
    let value = data[k] !== undefined ? data[k] : ''
    // 把data的每一项拼接添加到url，encodeURIComponent作用：可把字符串作为URI 组件进行编码。
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  // str.substring作用：返回一个新的字符串，它是此字符串的一个子字符串。该子字符串始于指定索引处的字符，一直到此字符串末尾。
  // 以下即去掉开头的 &
  return url ? url.substring(1) : ''
}
