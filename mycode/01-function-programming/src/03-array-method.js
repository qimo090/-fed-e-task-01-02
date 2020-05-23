// 模拟常用高阶函数：map、every、some

// map
const map = (array, fn) => {
  let results = []
  for (const item of array) {
    results.push(fn(item))
  }
  return results
}

// 测试
// let arr = [1, 2, 3, 4]
// let result = map(arr, item => item * item)

// console.log(result)

// every
const every = (array, fn) => {
  let result = true
  for (const item of array) {
    if (!(result = fn(item))) {
      break
    }
  }
  return result
}

// 测试
// let arr = [1, 2, 3, 4]
// let bool = every(arr, item => item < 10)
// console.log(bool)

// some
const some = (array, fn) => {
  let result = false
  for (const item of array) {
    if ((result = fn(item))) {
      break
    }
  }
  return result
}

let arr = [1, 2, 3, 4]
let result = some(arr, item => item % 2 === 0)
console.log(result)
