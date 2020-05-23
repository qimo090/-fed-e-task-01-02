// Either 函子
class Left {
  constructor(value) {
    this._value = value
  }
  static of(value) {
    return new Left(value)
  }
  map() {
    return this
  }
}

class Right {
  constructor(value) {
    this._value = value
  }
  static of(value) {
    return new Right(value)
  }
  map(fn) {
    return new Right(fn(this._value))
  }
}

// let r = Right.of(123).map(x => x + 2)
// console.log(r)

function add(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (error) {
    return Left.of({ error: error.message })
  }
}

let r = add('{"a": "a", "b": "b"}')
console.log(r)
