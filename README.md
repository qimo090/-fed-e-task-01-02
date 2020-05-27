# Part 1 | 模块二

## 简答题

1. 描述引用计数的工作原理和优缺点

   - 工作原理
     统计引用类型变量声明后被引用的次数，当次数为 0 时，该变量将被回收
     ```js
     function fn() {
       const c = {} // 引用类型变量 => c 的引用计数为 0
       let d = c // c 被 d 引用 => c 的引用计数为 1
       let e = c // c 被 e 引用 => c 的引用计数为 2
       d = {} // d 不再引用 c => c 的引用计数为 1
       e = null // e 不再引用 c => c 的引用计数为 0 => 将被回收
     }
     ```
   - 优点
     - 发现垃圾时立即回收
     - 最大限度减少程序暂停
   - 缺点

   - 无法回收循环引用的对象

     ```js
     function fn() {
       let f = {}
       let g = {}
       f.prop = g
       g.prop = f
       // 由于 f 和 g 互相引用，计数永远不可能为 0
     }
     ```

   - 时间开销大

2. 描述标记整理算法的工作流程

   - 标记整理可以看作时标记清除的增强
   - 标记阶段的操作和标记清除一致，仍然使用“可达性分析算法”，标记处所有需要回收的对象
   - 清除阶段会先执行整理，移动对象位置，让所有的存活对象向一端移动，然后直接清理掉端边界以外的内存

3. 描述 V8 中新生代存储区垃圾回收的过程

   为了更好的进行垃圾回收，划分新生代内存和老生代内存，并采用不同的回收机制。
   新生代内存被划分为两个空间，from 空间和 to 空间，新建对象都会存储在 from 空间中。进行垃圾回收时，活动状态的对象会被复制到 to 空间中，随后 from 空间被清空，from 空间和 to 空间的关系发生转换。即**使用双倍空间换取时间**。这种 **角色翻转的操作还能让新生代中的这两块区域无限重复使用下去**

4. 描述增量标记算法在何时使用及工作原理

   > 由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做 **全停顿**

   在 V8 新生代的垃圾回收中，因其空间较小，且存活对象较少，所以全停顿的影响不大，但老生代就不一样了。如果执行垃圾回收的过程中，占用主线程时间过久，主线程是不能做其他事情的。比如页面正在执行一个 JavaScript 动画，因为垃圾回收器在工作，就会导致这个动画在垃圾回收过程中无法执行，这将会造成页面的卡顿现象。

   为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为 **增量标记（Incremental Marking）算法**.

   使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行，这样当执行上述动画效果时，就不会让用户因为垃圾回收任务而感受到页面的卡顿了。

## 代码题 1

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

### 练习 1

使用函数组合 `fp.flowRight()` 重新实现下面这个函数

```js
let isLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop('in_stock', last_car)
}
```

**答**

```js
fp.flowRight(fp.prop('in_stock'), fp.last)
```

### 练习 2

使用 `fp.flowRight()` 、`fp.prop()` 和 `fp.first()` 获取第一个 car 的 name

**答**

```js
fp.flowRight(fp.prop('name'), fp.first)
```

### 练习 3

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

**答**

```js
fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
```

### 练习 4

使用 `flowRight` 写一个 `sanitizeNames` 函数，返回一个下划线连接的小写字符串，把数组中的 `name` 转为这种形式：例如：`sanitizeNames(['Hello World']) => ['hello_world']`

```js
let _underscore = fp.replace(/\W+/g, '_')
// === 以上代码无需改动，并在 sanitizeNames 中使用它 ===
```

**答**

```js
function sanitizeNames(names) {
  return fp.map(fp.flowRight(_underscore, fp.toLower), names)
}
```

## 代码题 2

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

### 练习 1

使用 `fp.add(x, y)` 和 `fp.map(f, x)` 创建一个能让 functor 里的值增加的函数 `ex1`

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let maybe = Maybe.of([5, 6, 1])
// let ex1 =  // ... 实现代码
```

### 练习 2

实现一个函数 `ex2` ，能够使用 `fp.first` 获取列表的第一个元素

```js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// let ex2 = //... 实现代码
```

### 练习 3

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

### 练习 4

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
