// 基于以下代码，完成下面的四个练习

const fp = require('lodash/fp')
// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true,
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
]

// ==================================================
// 练习 1
// 使用函数组合 fp.flowRight() 重新实现下面这个函数
// ==================================================

// let isLastInStock = function (cars) {
//   // 获取最后一条数据
//   let last_car = fp.last(cars)
//   // 获取最后一条数据的 in_stock 属性值
//   return fp.prop('in_stock', last_car)
// }

// console.log('1-isLastInStock', isLastInStock(cars))
const isLastInStockFP = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('1-isLastInStockFP', isLastInStockFP(cars))

// ==================================================
// 练习 2
// 使用 fp.flowRight() 、fp.prop() 和 fp.first() 获取第一个 car 的 name
// ==================================================
const getFirstCarNameFP = fp.flowRight(fp.prop('name'), fp.first)
console.log('2-getFirstCarNameFP', getFirstCarNameFP(cars))

// ==================================================
// 练习 3
// 使用帮助函数 _average 重构 averageDollarValue ，使用函数组合的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
// === 以上代码无须改动 ===
// let averageDollarValue = function (cars) {
//   let dollar_values = fp.map(function (car) {
//     return car.dollar_value
//   }, cars)
//   return _average(dollar_values)
// }
// console.log('averageDollarValue', averageDollarValue(cars))
// ==================================================
const averageDollarValueFP = fp.flowRight(
  _average,
  fp.map(fp.prop('dollar_value'))
)
console.log('3-averageDollarValueFP', averageDollarValueFP(cars))

// ==================================================
// 练习 4
// 使用 flowRight 写一个 sanitizeNames 函数，返回一个下划线连接的小写字符串，把数组中的 name 转为这种形式：
// 例如：sanitizeNames(['Hello World']) => ['hello_world']
// ==================================================

let _underscore = fp.replace(/\W+/g, '_')
// === 以上代码无需改动，并在 sanitizeNames 中使用它 ===
function sanitizeNames(names) {
  return fp.map(fp.flowRight(_underscore, fp.toLower), names)
}
console.log('4-sanitizeNames', sanitizeNames(fp.map(fp.prop('name'), cars)))
