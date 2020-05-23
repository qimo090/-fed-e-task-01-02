// IO 函子的问题
const fs = require('fs')
const fp = require('lodash/fp')

class IO {
  constructor(fn) {
    this._value = fn
  }
  static of(value) {
    return new IO(function () {
      return value
    })
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (value) {
  return new IO(function () {
    console.log(value)
    return value
  })
}

let cat = fp.flowRight(print, readFile)

let r = cat('package.json')._value()._value()
// IO(IO(x))
console.log(r)
