// reference count

const user1 = { age: 11 }
const user2 = { age: 22 }
const user3 = { age: 33 }

const nameList = [user1.age, user2.age, user3.age]

function fn() {
  const num1 = 1
  const num2 = 2
}
fn()
