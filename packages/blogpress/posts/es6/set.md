---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## Set

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

## WeakSet

`WeakSet` 与 `Set` 类似，区别在于

+ `WeakSet` 的成员只能是对象，不能是其他类型的值
+ `WeakSet` 的成员都属于弱引用，这意味着如果其他对象都不在引用该对象，垃圾回收机制会自动回收占用的内存
