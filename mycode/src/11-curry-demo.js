// 柯里化案例
// ''.match(/\s+/g)
// ''.match(/\d+/g)

const _ = require('lodash')

// function match(reg, str) {
//   return str.match(reg)
// }

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const hasSpace = match(/\s+/g)
const hasNumber = match(/\d+/g)
// console.log(hasSpace('hello world'))
// console.log(hasNumber('123adc'))

const filter = _.curry((func, array) => array.filter(func))

console.log(filter(hasSpace, ['John Connor', 'John_Donne']))

const findSpace = filter(hasSpace)
console.log(findSpace(['John Connor', 'John_Donne']))
