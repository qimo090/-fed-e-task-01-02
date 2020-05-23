// 记忆函数

const _ = require('lodash')

function getArea(r) {
  console.log(r)
  return Math.PI * r * r
}

// let getAreawithMemory = _.memoize(getArea)

// console.log(getAreawithMemory(4))
// console.log(getAreawithMemory(4))
// console.log(getAreawithMemory(4))

// 模拟 memoize 方法的实现
function memoize(fn) {
  let cache = {}
  return function (...args) {
    let key = JSON.stringify(args)
    cache[key] = cache[key] || fn.apply(null, args)
    return cache[key]
  }
}

let getAreawithMemory = memoize(getArea)
console.log(getAreawithMemory(4))
console.log(getAreawithMemory(4))
console.log(getAreawithMemory(4))
