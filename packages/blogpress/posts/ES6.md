---
description: ES6语法总结
tags:
  - javascript
categories:
  - javascript
---
# ES6语法汇总

ES6语法记录（不定时更新，遇到就添加）

::: danger 叠护甲

我个人喜欢把所有新的特性都统称为 ES6，因为发布的实在太快的，我也不想了解每个特性具体是哪个版本加上去的，是新功能用就完事了

:::

::: tip 提示

本文更多作为协助作者本人理解新概念和记录常用语法使用，不完全作为ES6语法指南，如果需要背面试题请查找更全面的教程。主要分**不常用但需要时很好用、常用且高效**两部分记录

:::

## 常用语法

### Promise

这里不做解释，详见 [promise 详解](./promise.md)

### Async & Await

TODO: 待补充

### 指数运算符

```js
2 ** 3 // 8 Math.pow(2, 3)
```

需要注意的是，链式计算时，计算规则不是从左到右儿是从右到左

```js
2 ** 2 ** 3 // 256
```

指数运算符与等号结合，组成新的赋值运算符

```js
let a = 2;
a **= 3 // a = a * a * a
```

### 链式运算符

在业务逻辑中常出现需要链式判断的情况，书写起来特别麻烦，因此 `ES6` 引入了简写

```js
// ES5
ajax().then(res => {
  const role = res && res.data && res.data.user && res.data.user.roles || 'visiter'
})

// ES6
ajax().then(res => {
  const role = res?.data?.user?.roles || 'visiter'
})
```

### Null 判断运算符

读取对象属性的时候，如果某个属性的值是 `null` 或 `undefined`，通常需要为它们指定默认值。

```js
// ES5
ajax().then(res => {
  const role = res && res.data && res.data.user && res.data.user.avatar || 'avatar'
})

// ES6
ajax().then(res => {
  const role = res?.data?.user?.avatar ?? 'avatar'
})
```

### 模板字符串

```js
const name = 'singleDogNo.1'
const age = 18
const sex = 'man'
const str = `我叫${name}, 今年${age}岁，性别${sex == 'man' ? '男': '女'}`
```

### String.includes & String.startsWidth & String.endsWidth

+ `includes()`：返回布尔值，表示是否找到了参数字符串。
+ `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
+ `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
const str = 'hello, world'
str.includes('llo') // true
str.startsWidth('hell') // true
str.endsWidth('ld') // true
```

### String.trimStart & String.trimEnd

`ES6`对字符串实例新增了 `trimStart()` 和 `trimEnd()` 这两个方法。`trimStart()`消除字符串头部的空格，`trimEnd()` 消除尾部的空格。返回新字符串

```js
const s = '  abc  '

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```

### String.matchAll() & String.replaceAll()

`matchAll()` 方法返回一个正则表达式在当前字符串的所有匹配；`replaceAll` 可以替换字符串中匹配到的所有字符

### 扩展运算符

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [7, 8, 9]
const res = [...arr1, ...arr2, ...arr3] // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const user = {name: 'singleDogNo.1', age: 18, sex: 'man'}
const {name, ...other} = user // name: singleDogNo.1 other: {age: 18, sex: 'man'}
```

### Array.map

三个参数表示：遍历当前项，下标，遍历的数组本身，**与`forEach`不同的是，`map`方法返回一个处理过后的新数组**

```js
const arr = [1, 2, 3, 4, 5]

const arr2 = arr.map((item) => item * 2)
// [ 2, 4, 6, 8, 10 ]
```

### Array.filter

三个参数表示：遍历当前项，下标，遍历的数组本身，常用于遍历并过滤期望值

```js
const arr = [1, 2, 3, 4, 5]

const arr2 = arr.filter((num) => num > 3)
// [ 4, 5 ]
```

### Array.some

三个参数表示：遍历当前项，下标，遍历的数组本身，就是只有一个是真，就返回真

```js
const arr = [false, true, false, false, false]

const arr2 = arr.some((item) => item)
// true
```

### Array.every

三个参数表示：遍历当前项，下标，遍历的数组本身，必须所有都是真，才返回真

```js
const arr = [true, true, true, false, true]

const arr2 = arr.every((item) => item)
// false
```

### Array.reduce

这里不做解释，参考[详解 reduce](./reduce.md)

### Array.flat

降维数组，参数为降低的维度，默认为1。如果需要强制降成一维数组，使用`Infinity`

```js
const arr = [1, [2, [3, [4, [5, [6]]]]]]

console.log(arr.flat()) // [1, 2, [3, [4, [5, [6]]]]]
console.log(arr.flat(2)) // [1, 2, 3, [4, [5, [6]]]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6]
```

### Object.entries && Object.fromEntries

获取对象键值对的集合 / 将键值对集合转化为对象

```js
const obj = {
  name: 'singleDogNo.1',
  age: 18,
  sex: 'man'
}
const entries = Object.entries(obj) // [ [ 'name', 'singleDogNo.1' ], [ 'age', 18 ], [ 'sex', 'man' ] ]

const arr = [
  ['name', 'singleDogNo.1'],
  ['age', 18],
  ['sex', 'man']
]
const obj = Object.fromEntries(arr) // { name: 'singleDogNo.1', age: 18, sex: 'man' }
```

## 不常用但实用的语法

### Symbol

`Symbol` 类型用于生成独一无二的值，保证绝不会与其他命名产生冲突。`Symbol` 值通过 `Symbol` 函数生成，接受一个字符串为参数，参数为`Symbol`值的描述。
> **注意: Symbol 函数的参数只表示值得描述，不表示值本身，即使参数相同，值也是不同的**

```js
const a1 = Symbol('a')
const a2 = Symbol('a')
a1 === a2 // false
typeof a1 // symbol
```

`Symbol` 值不可以与其他类型的值进行运算，但可以显式的转换为字符串和布尔值。虽然可以转换为字符串，但还是推荐使用`description`属性获取描述信息。

```js
const a = Symbol('foo')

String(a) // Symbol(foo)
a.description // 'foo'
```

### 逻辑赋值运算符

`ES6` 引入了三个新的逻辑赋值运算符，将逻辑运算符与赋值运算符进行结合。

```js
x ||= y // x || (x = y)
x &&= y // x && (x = y)
x ??= y // x ?? (x = y)
```

### 数字分隔符

数字分隔符可以让你在定义长数字时，更加地一目了然

```js
const num = 1_000_000_000
```

### Set

类似数组结构，但成员的值都是唯一的，不会出现重复的值，通常只作为数组去重的快捷方式。`Set`实例的方法

+ `Set.prototype.size`: 返回 `Set` 实例的长度
+ `Set.prototype.add(value)`: 添加元素，返回添加后的 `Set` 实例
+ `Set.prototype.delete(value)`: 删除元素，返回删除后的 `Set` 实例
+ `Set.prototype.has(value)`: 查询元素，返回一个布尔值，表示该值是否为 `Set` 实例的成员
+ `Set.prototype.clear()`: 清除 `Set` 实例的所有成员

```js
let set = new Set([1, 2, 3])

set.size // 3
set.add(3) // [1, 2, 3]
set.delete(3) // [1, 2]
set.has(2) // true
set.clear()

const arr1 = [1, 1, 2, 2, 3, 4, 5, 6]
const arr2 = [...new Set(arr1)] // [1, 2, 3, 4, 5, 6]
```

### WeakSet

`WeakSet` 与 `Set` 类似，区别在于

+ `WeakSet` 的成员只能是对象，不能是其他类型的值
+ `WeakSet` 的成员都属于弱引用，这意味着如果其他对象都不在引用该对象，垃圾回收机制会自动回收占用的内存

### Map

类似数组结构，但是键不限于字符串，各种类型的值甚至是对象都可以作为键出现。是一种更完善的键值对数据结构。 `Map`实例的方法

+ `Map.prototype.size`: 返回 `Map` 实例的长度
+ `Map.prototype.set(key, value)`: 设置键值对，返回 `Map` 实例
+ `Map.prototype.get(key)`: 通过键，获取对应的值，如果不存在返回 `undefined`
+ `Map.prototype.has(key)`: 查询键，返回一个布尔值，表示该键是否存在 `Map` 实例中
+ `Map.prototype.delete( key)`: 删除键，返回一个布尔值，成功为 `true`，失败为 `false`
+ `Map.prototype.clear()`: 清除 `Map` 实例的所有成员

```js
const map = new Map([
  [name, 'singleDogNo.1'],
  [age, 18]
])

map.set('sex', 'man')
map.size // 3
map.get('name') // singleDogNo.1
map.has('age') // true
map.delete('name') // true
map.clear()
```

### WeakMap

`WeakMap` 与 `Map` 类似，区别在于

+ `WeakMap` 的成员只能是对象，不能是其他类型的值
+ `WeakMap` 的成员都属于弱引用，这意味着如果其他对象都不在引用该对象，垃圾回收机制会自动回收占用的内存
