---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

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
