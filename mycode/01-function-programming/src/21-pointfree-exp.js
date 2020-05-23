// 把一个字符串的首字母提取出来并转换为大写，且使用 `. `作为分隔符
// world wide web => W. W. W

const fp = require('lodash/fp')

// const firstLetterToUpper = fp.flowRight(
//   fp.join('. '),
//   fp.map(fp.first),
//   fp.map(fp.toUpper),
//   fp.split(' ')
// )
const firstLetterToUpper = fp.flowRight(
  fp.join('. '),
  fp.map(fp.flowRight(fp.first, fp.toUpper)),
  fp.split(' ')
)

console.log(firstLetterToUpper('world wide web'))
