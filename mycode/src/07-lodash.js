// 演示 lodash
// first / last / toUpper / reverse / each / includes / find / findIndex
const _ = require('lodash')

const arr = ['jack', 'tom', 'lucy', 'kate']

console.log(_.first(arr))
console.log(_.last(arr))

console.log(_.toUpper(_.first(arr)))

console.log(_.reverse(arr))

const r = _.each(arr, (item, index) => {
  console.log(item, index)
})

console.log(r)
