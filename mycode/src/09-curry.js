// 柯里化
// function checkAge(age) {
//   let min = 18
//   return age >= mini
// }

// function checkAge(min, age) {
//   return age >= min
// }

// function checkAge(min) {
//   return function (age) {
//     return age >= min
//   }
// }

const checkAge = min => age => age >= min

let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)

console.log(checkAge18(20))
console.log(checkAge18(24))
console.log(checkAge20(24))
