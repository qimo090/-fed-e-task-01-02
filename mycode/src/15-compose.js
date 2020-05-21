// 模拟实现 lodash flowRight
const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = str => str.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'tow', 'three']))

// const compose = (...funcs) => {
//   return function (value) {
//     return funcs.reverse().reduce((left, right) => {
//       return right(left)
//     }, value)
//   }
// }
const compose = (...funcs) => value =>
  funcs.reverse().reduce((acc, fn) => fn(acc), value)

const c = compose(toUpper, first, reverse)
console.log(c(['one', 'tow', 'three']))
