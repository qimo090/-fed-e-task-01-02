// 高阶函数 - 函数作为参数

// forEach
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i])
  }
}

// 测试
// let arr = [1, 3, 434, 5, 123]

// forEach(arr, item => {
//   console.log(item)
// })

// filter
function filter(array, fn) {
  let results = []
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      results.push(array[i])
    }
  }
  return results
}

let arr = [1, 2, 3, 4, 5, 6, 7]

const result = filter(arr, item => item % 2)
console.log(result)
