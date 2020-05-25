# Part 1 | 模块二


## 简答题

1. 描述引用计数的工作原理和优缺点
2. 描述标记整理算法的工作流程
3. 描述 V8 中新生代存储区垃圾回收的过程
4. 描述增量标记算法在何时使用及工作原理



## 代码题1

基于以下代码，完成下面的四个练习

```js
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
```

### 练习1

使用函数组合 `fp.flowRight()` 重新实现下面这个函数

```js
let isLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop('in_stock', last_car)
}
```

### 练习2

使用 `fp.flowRight()` 、`fp.prop()` 和 `fp.first()` 获取第一个 car 的 name

### 练习3

使用帮助函数 `_average` 重构 `averageDollarValue` ，使用函数组合的方式实现

```js
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
// === 以上代码无须改动 ===
let averageDollarValue = function (cars) {
  let dollar_values = fp.map(function (car) {
    return car.dollar_value
  }, cars)
  return _average(dollar_values)
}
```

### 练习4

使用 `flowRight` 写一个 `sanitizeNames` 函数，返回一个下划线连接的小写字符串，把数组中的 `name` 转为这种形式：例如：`sanitizeNames(['Hello World']) => ['hello_world']`

```js
let _underscore = fp.replace(/\W+/g, '_')
// === 以上代码无需改动，并在 sanitizeNames 中使用它 ===
```



## 代码题2

基于以下代码，完成下面的四个练习

```js
// support.js
class Container {
  constructor(value) {
    this._value = value
  }
  static of(value) {
    return new Container(value)
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  constructor(x) {
    this._value = x
  }
  static of(x) {
    return new Maybe(x)
  }
  isNothing() {
    return this._value === null || this._value === undefined
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container,
}
```

### 练习1

使用 `fp.add(x, y)` 和 `fp.map(f, x)` 创建一个能让 functor 里的值增加的函数 `ex1`

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let maybe = Maybe.of([5, 6, 1])
// let ex1 =  // ... 实现代码
```

### 练习2

实现一个函数 `ex2` ，能够使用 `fp.first` 获取列表的第一个元素

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// let ex2 = //... 实现代码
```

### 练习3

实现一个函数 `ex3` ，使用 `safeProp` 和 `fp.first` 找到 user 的名字的首字母

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let safeProp = fp.cuury(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
// let ex3 = //... 代码实现
```

### 练习4

使用 `Maybe` 重写 `ex4` ，不要有 `if` 语句

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let ex4 = function (n) {
  if (n) {
    return parseInt(n)
  }
}
```

