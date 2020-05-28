var arr = new Array(1, 2, 3, 4, 5)

arr.forEach(function (item) {
  console.log(item)
})

for (var i = arr.length; i; i--) {
  console.log(arr[i])
}

for (var i in arr) {
  console.log(arr[i])
}
