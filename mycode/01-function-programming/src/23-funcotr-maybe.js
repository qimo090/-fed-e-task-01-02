// MayBe 函子

class MayBe {
  static of(value) {
    return new MayBe(value)
  }
  constructor(value) {
    this._value = value
  }
  // 如果对空值变形的话直接返回值为 null 的函子
  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }
  isNothing() {
    return this._value === null || this._value === undefined
  }
}

let r = MayBe.of('hello world').map(x => x.toUpperCase())
console.log(r)
let res = MayBe.of(null).map(x => x.toUpperCase())
console.log(res)
