---
description: 数组新增方法
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## at -- 查询数组元素 {#at}

`at()` 方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

```js
const cart = ["apple", "banana", "pear", "orange", "grape"];

const first_one = cart.at(0); // apple
const first_two = cart.at(1); // banana
const last_one = cart.at(-1); // grape
const last_two = cart.at(-2); // orange
```

## copyWithin -- 数组复制 {#copyWithin}

`copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

方法包含三个参数

|  参数  |                类型                 |                                说明                                 |
| :----: | :---------------------------------: | :-----------------------------------------------------------------: |
| target |               Number                | 复制到指定目标索引位置。<br><HighlightText color="warning" msg="如果是负数，表示从数组最后一个元素开始倒数；" /><br><HighlightText color="warning" msg="如果小于整个数组的长度，则视作0；" /><br><HighlightText color="warning" msg="如果大于整个数组长度，则视作无效，不拷贝任何内容。" /> |
| start  | Number <HighlightText color="warning" msg="可选" /> |                         元素复制的起始位置。<br><HighlightText color="warning" msg="如果是负数，表示从数组最后一个元素开始倒数；" /><br><HighlightText color="warning" msg="如果小于整个数组的长度，则视作0；" /><br><HighlightText color="warning" msg="如果大于整个数组长度，则视作无效，不拷贝任何内容。" />                          |
|  end   | Number <HighlightText color="warning" msg="可选" /> |                         元素复制的结束位置。<br><HighlightText color="warning" msg="如果是负数，表示从数组最后一个元素开始倒数；" /><br><HighlightText color="warning" msg="如果小于整个数组的长度 * -1，则视作0；" /><br><HighlightText color="warning" msg="如果大于整个数组长度，则视作整个数组都会被复制。" />                          |

```js
console.log([1, 2, 3, 4, 5].copyWithin(-2));
// [1, 2, 3, 1, 2]

console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
// [4, 5, 3, 4, 5]

console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
// [4, 2, 3, 4, 5]

console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1));
// [1, 2, 3, 3, 4]
```

## every -- 数组元素是否满足条件 {#every}

`every()` 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。方法包含两个参数

+ 第一个参数是一个回调函数，返回布尔值表示方法在循环中单次执行的结果。函数有两个参数：
  + element -- 当前元素
  + index -- 当前元素的索引
  + array -- 调用 every 的数组
+ 第二个参数是可选的，用于指定回调函数中 this 的值。

```js
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

## some -- 数组元素是否满足条件 {#some}

`some()` 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。返回布尔值。方法包含两个参数

+ 第一个参数是一个回调函数，返回布尔值表示方法在循环中单次执行的结果。函数有两个参数：
  + element -- 当前元素
  + index -- 当前元素的索引
  + array -- 调用 every 的数组
+ 第二个参数是可选的，用于指定回调函数中 this 的值。

```js
[2, 5, 8, 1, 4].some((x) => x > 10); // false
[12, 5, 8, 1, 4].some((x) => x > 10); // true
```

## reduce & reduceRight {#reduce}

之前写过一篇[详细教程](./reduce.md)。值得注意的是，原生支持`reduceRight`方法，与`reduce`方法使用方法完全相同，除了`reduceRight`方法从数组的末尾开始执行。

## Array.flat -- 降维数组 {#flat}

降维数组，参数为降低的维度，默认为1。如果需要强制降成一维数组，使用`Infinity`

```js
const arr = [1, [2, [3, [4, [5, [6]]]]]]

console.log(arr.flat()) // [1, 2, [3, [4, [5, [6]]]]]
console.log(arr.flat(2)) // [1, 2, 3, [4, [5, [6]]]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6]
```

## with -- 修改数组元素 {#with}

`with()`方法是使用方括号表示法修改指定索引值的复制方法版本。它会返回一个新数组，其指定索引处的值会被新值替换。有两个参数：

+ index -- 要修改的位置索引
+ value -- 要修改的值
  
```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]  不修改原数组
```

## toReversed & toSorted & toSpliced {#toReversed}

这三个方法分别对应`reserve`、`sort`、`splice`方法，使用方法也完全一致，唯一的区别在于对应的方法会改变原数组，而它们不会修改原数组，而是返回一个新数组。

```js
const items = [1, 2, 3];
const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]

const months = ["Jan", "Mar", "Apr", "May"];
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
console.log(months4); // ["Jan", "Feb", "Mar", "May"]

console.log(months); // ["Jan", "Mar", "Apr", "May"]
```
