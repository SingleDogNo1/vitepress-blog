---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## Symbol

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
