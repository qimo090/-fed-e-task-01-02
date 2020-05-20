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



### 函数是一等公民

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



### 高阶函数

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

常用告诫函数

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



### 闭包

#### 概念

+ 闭包（Closure）：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
  + 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域
  + 闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员



#### 案例

