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
