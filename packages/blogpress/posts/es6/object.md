---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## entries

`Object.entries()` 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对。

```js
const obj = { foo: "bar", baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
```

## fromEntries

`Object.fromEntries()` 静态方法返回一个由键值对组成的对象。

```js
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }

const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

## groupBy

::: warning 实验性

这是一项实验性技术。在将其用于生产之前，请仔细检查浏览器兼容性表格。

:::

根据提供的回调函数返回的字符串值对给定可迭代对象中的元素进行分组。返回的对象具有每个组的单独属性，其中包含组中的元素的数组。方法包含两个参数：

+ iterable -- 一个将进行元素分组的可迭代对象（Array / Map...）。
+ callback -- 对可迭代对象中的每个元素执行的函数。它应该返回一个值，可以被强制转换成属性键（字符串或 symbol），用于指示当前元素所属的分组。该函数被调用时将传入以下参数：
  + element -- 当前正在处理的元素。
  + index -- 当前正在处理的元素的索引。

```js
const inventory = [
  { name: "芦笋", type: "蔬菜", quantity: 5 },
  { name: "香蕉", type: "水果", quantity: 0 },
  { name: "山羊", type: "肉", quantity: 23 },
  { name: "樱桃", type: "水果", quantity: 5 },
  { name: "鱼", type: "肉", quantity: 22 },
];

const result = Object.groupBy(inventory, ({ type }) => type);

/* ==>
{
  蔬菜: [
    { name: "芦笋", type: "蔬菜", quantity: 5 },
  ],
  水果: [
    { name: "香蕉", type: "水果", quantity: 0 },
    { name: "樱桃", type: "水果", quantity: 5 }
  ],
  肉: [
    { name: "山羊", type: "肉", quantity: 23 },
    { name: "鱼", type: "肉", quantity: 22 }
  ]
}
*/
```
