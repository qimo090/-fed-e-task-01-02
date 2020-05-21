> Part 1- JavaScript 深度剖析
>
> Mod 2 - 函数式编程与 JavaScript 性能优化
>
> 本模块带你学习时下前端最主流的函数式编程范式，彻底解决代码重用，以及一些常见的函数式编程库的使用和原理；同时我们还会学习 JavaScript 性能优化的常用方案，深入学习 JavaScript 垃圾回收的机制，以及 Chrome 中的性能调试工具 Performance 的使用。



# Task 1 - 函数式编程

## 课程介绍

+ 为什么要学习函数式编程以及什么是函数式编程
+ 函数式编程的特性（纯函数、柯里化、函数组合等）
+ 函数式编程的应用场景
+ 函数式编程库 Lodash



## 为什么要学习函数式编程

**函数式编程** 是非常古老的一个概念，早于第一台计算机的诞生，[函数式编程的历史]()

那我们为什么现在还要学函数式编程？

+ 函数式编程是随着 React 的流行受到越来越多的关注
+ Vue 3 也开始拥抱函数式编程
+ 函数式编程可以抛弃 this
+ 打包过程中可以更好的利用 tree shaking 过滤无用代码
+ 方便测试，方便并行处理
+ 有很多库可以帮助我们进行函数式开发：Lodash, Underscore, Ramda



## 函数式编程概念

### 什么是函数式编程

函数式编程 (Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程编程、面向对象编程

+ 面向对象编程的方式：把现实世界的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物事件的联系
+ 函数式编程的思维方式：把现实世界的事物和事物之间的 **联系** 抽象到程序世界（对运算过程进行抽象）
  + 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数
  + x -> f(联系、映射) -> y，y = f(x)
  + **函数式编程中的函数指的不是程序中的函数（方法）**，而是数学中的函数即映射关系，例如：**y = sin(x)**，x 和 y 的关系
  + **相同的输入始终要得到相同的输出**（纯函数）
  + 函数式编程用来描述数据（函数）之间的映射

```js
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2
console.log(sum)

// 函数式
function add (n1, n2) {
  return n1 + n2
}
let sum = add(2, 3)
console.log(sum)
```



## 前置知识

+ 函数是一等公民
+ 高阶函数
+ 闭包



## 函数是一等公民

[MDN First-class Function](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)

+ 函数可以存储在变量中
+ 函数可以作为参数
+ 函数可以作为返回值

在 JavaScript 中 **函数就是一个普通的对象** （可以通过 `new Function()`），我们可以把函数存储到变量/数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过 `new Function('aset(1)')` 来构造一个新的函数

+ 把函数赋值给变量

  ```js
  // 把函数赋值给变量
  let fn = function () {
    console.log('Hello First-class Function')
  }
  fn()
  
  // 一个示例
  const BlogController = {
    index (posts) { return Views.index(posts) },
    show (post) { return Views.show(post) },
    create (attrs) { return Db.create(attrs) },
    update (post, attrs) { return Db.update(post, attrs) },
    destroy (post) { return Db.destroy(post) }
  }
  // 优化
  const BlogController = {
    index: Views.index,
    show: Views.show,
    create: Db.create,
    update: Db.update,
    destroy: Db.destroy
  }
  ```

+ 函数是一等公民是我们后面要学习的高阶函数、柯里化等的基础



## 高阶函数

#### 什么是高阶函数

+ 高阶函数（Higher-order Function）

  + 可以把函数作为参数传递给另一个函数
  + 可以把函数作为另一个函数的返回结果

+ 函数作为参数

  ```js
  // forEach
  function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i])
    }
  }
  
  // filter
  function filter (array, fn) {
    let results = []
    for (let i = 0; i < array.length; i++) {
      if (fn(array[i])) {
        results.push(array[i])
      }
    }
    return results
  }
  ```

+ 函数作为返回值

  ```js
  // 高阶函数 - 函数作为返回值
  
  function makeFn() {
    let msg = 'Hello Function'
    return function () {
      console.log(msg)
    }
  }
  
  // const fn = makeFn()
  // fn()
  
  makeFn()()
  
  // once
  function once(fn) {
    let done = false
    return function (...args) {
      if (!done) {
        done = true
        return fn.apply(this, args)
      }
    }
  }
  
  let pay = once(money => console.log(`支付 $${money}`))
  
  pay(5)
  pay(5)
  pay(5)
  pay(5)
  pay(5)
  ```



#### 使用高阶函数的意义

+ 抽象可以帮助我们屏蔽细节，只需要关注于我们的目标
+ 高阶函数是用来抽象通用的问题

```js
// 面向对象的方式
let array = [1, 2, 3, 4]
for (let i = 0; i < array.length; i++) {
  console.log(array[i])
}

// 高阶函数
let array = [1, 2, 3, 4]
forEach(array, item => console.log(item))
let r = filter(array, item => item % 2)
```



#### 常用的高阶函数

常用高阶函数

+ forEach
+ map
+ filter
+ every
+ some
+ find/findIndex
+ reduce
+ sort
+ ...

```js
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
```



## 闭包

#### 概念

+ 闭包（Closure）：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
  + 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域
  + 闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员



#### 案例



## 纯函数

### 概念

+ **纯函数：相同的输入永远会得到相同的输出**，而且没有任何可观察的副作用

  + 纯函数就类似于数学中的函数（用来描述输入和输出之间的关系），y = f(x)

+ [lodash](https://www.lodashjs.com/) 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法

+ 数组的 `slice` 和 `splice` 分别是 纯函数 和 不纯的函数

  + `slice` 返回数组中的指定部分，不会改变原数组
  + `splice` 对数组进行操作返回该数组，会改变原数组

  ```js
  let array = [1, 2, 3, 4, 5]
  
  // 纯函数
  console.log(array.slice(0, 3))
  // => [ 1, 2, 3 ]
  console.log(array.slice(0, 3))
  // => [ 1, 2, 3 ]
  console.log(array.slice(0, 3))
  // => [ 1, 2, 3 ]
  
  // 不纯的函数
  console.log(array.splice(0, 3))
  // => [ 1, 2, 3 ]
  console.log(array.splice(0, 3))
  // => [ 4, 5 ]
  console.log(array.splice(0, 3))
  // => []
  ```

+ 函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）

+ 我们可以把一个函数的执行结果交给另一个函数去处理



### Lodash

> 纯函数的代表



### 纯函数的优势

+ 可缓存

  + 因为纯函数对相同输入始终有相同的结果，所以可以把纯函数的结果缓存起来

    ```js
    const _ = require('lodash')
    
    function getArea(r) {
      console.log(r)
      return Math.PI * r * r
    }
    let getAreawithMemory = _.memoize(getArea)
    console.log(getAreawithMemory(4))
    console.log(getAreawithMemory(4))
    console.log(getAreawithMemory(4))
    ```

  + 自己模拟一个 memoize 函数

    ```js
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
    ```

+ 可测试

  + 纯函数让测试更方便

+ 并行处理

  + 在多线程环境下并行操作共享的内存数据很可能出现意外情况
  + 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Workder）



### 副作用

> 纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的 **副作用**

```js
// 不纯的
let mini = 18
function checkAge (age) {
  return age >= mini
}

// 纯的（有硬编码，后续可以通过柯里化解决）
function checkAge(age) {
  let mini = 18
  return age >= mini
}
```

副作用让一个函数变得不纯，纯函数根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用

副作用来源：

+ 配置文件
+ 数据库
+ 获取用户的输入
+ ......

所有的外部交互都有可能带来副作用，副作用也使得方法通用性下降不适合扩展和课重用性，同时副作用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控范围内发生。



## 柯里化

> Haskell Brooks Curry

+ 使用柯里化解决上一个案例中硬编码的问题

  ```js
  function checkAge(age) {
    let min = 18
    return age >= mini
  }
  
  // 普通纯函数
  function checkAge(min, age) {
    return age >= min
  }
  
  // 柯里化
  function checkAge(min) {
    return function (age) {
      return age >= min
    }
  }
  
  // es6 简写
  const checkAge = min => age => age >= min
  
  let checkAge18 = checkAge(18)
  let checkAge20 = checkAge(20)
  
  console.log(checkAge18(20))
  console.log(checkAge18(24))
  console.log(checkAge20(24))
  ```

+ **柯里化(Currying)**

  + 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
  + 然后返回一个新的函数接受剩余的参数，返回结果



### Lodash 中的柯里化

+ `_.curry(func)`

  + 功能：创建一个函数，该函数接受一个或多个 `func` 参数，如果 `func` 所需要的参数都被提供则执行 `func` 并返回执行的结果，否则继续返回该函数并等待接受剩余的参数
  + 参数：需要柯里化的函数
  + 返回值：柯里化后的函数

  ```js
  const { curry } = require('lodash')
  
  function getSum(a, b, c) {
    return a + b + c
  }
  
  const curried = curry(getSum)
  
  console.log(curried(1, 2, 3))
  console.log(curried(1, 2)(3))
  console.log(curried(1)(2)(3))
  ```
  
  ```js
  // 模拟实现 curry
  function curry(func) {
    return function curriedFn(...args) {
      // 判断实参和形参的个数
      if (args.length < func.length) {
        return function (...rest) {
          return curriedFn(...args.concat(rest))
        }
      }
      return func(...args)
    }
  }
  ```
  
  

### 总结

+ 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
+ 这是一种对函数参数的 **缓存**
+ 让函数变得更灵活、颗粒度更小
+ 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能



## 函数组合

> 函数组合 Compose

+ 纯函数和柯里化很容易写出洋葱代码 `h(g(f(x)))`
  + 获取数组最后一个元素在转换成大写字母，`_toUpper(_.first(_.reverse(array)))`
  + 函数组合可以让我们把细粒度的函数重新组合生成一个新的函数



### 管道

下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b，可以想象成 a 数据通过一个管道得到一个 b 数据

![grdk01](https://tva1.sinaimg.cn/large/007S8ZIlgy1gezt4aaakjj310004cjs1.jpg)

当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分成多个小函数，此时多个中间运算过程产生的 m 和 n

下面这张图中可以想象成把 fn 这个管道拆分成了 3 个管道 f1，f2，f3，数据 a 通过管道 f3 得到结果 m，m 再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b

![grdk02](https://tva1.sinaimg.cn/large/007S8ZIlgy1gezt4v037wj310808iq4p.jpg)

```js
fn = compose(f1, f2, f3)
b = fn(a)
```



### 函数组合

+ 函数组合（Compose）：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数

  + 函数就像数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
  + **函数组合默认是从右到左执行**

+ Lodash 中的组合函数

  + lodash 中组合函数 `flow()` 或者 `flowRight()`，它们都可以组合多个函数
  + `flow()` 是从左到右运行
  + **`flowRight()`** 是从右到左运行，使用的更多一些 

+ 模拟实现

  ```js
  const compose = (...funcs) => {
    return function (value) {
      return funcs.reverse().reduce((left, right) => {
        return right(left)
      }, value)
    }
  }
  const compose = (...funcs) => value =>
    funcs.reverse().reduce((acc, fn) => fn(acc), value)
  ```

+ 函数的组合要满足 **组合律** (associativity)

  + 我们既可以把 g 和 h 组合，还可以把 f 和 g 组合，结果都是一样的

  ```js
  // 组合律
  let f = compose(f, g, h)
  let associative = compose(compose(f, g), h) == compose(f, compose(g, h))
  // true
  ```

  