// Functor 函子
// class Container {
//   constructor(value) {
//     this._value = value
//   }

//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }

// let r = new Container(5).map(x => x + 1).map(x => x * x)

// console.log(r)

class Container {
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }

  static of(value) {
    return new Container(value)
  }
}

let r = Container.of(5)
  .map(x => x + 2)
  .map(x => x * x)

console.log(r)
