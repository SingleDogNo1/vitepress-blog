---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## 指数运算符 {#exponentiation}

```js
2 ** 3 // => Math.pow(2, 3)
```

需要注意的是，链式计算时，计算规则不是从左到右儿是从右到左

```js
2 ** 2 ** 3 // => 2**(2**3) => 2**8 => 256
```

指数运算符与等号结合，组成新的赋值运算符

```js
let a = 2;
a **= 3 // a = a * a * a => 8
```

## 链式运算符 {#chaining}

在业务逻辑中常出现需要链式判断的情况，书写起来特别麻烦，因此 `ES6` 引入了简写`?.`

```js
const role = data && data.user && data.user.roles
// =>
const role = data?.user?.roles
```

同样的，`?.` 也可以用于方法调用

```js
fn.callback?.()
```

## Null 判断运算符 {#nullish-coalescing}

读取对象属性的时候，如果某个属性的值是 `null` 或 `undefined`，通常需要为它们指定默认值。

```js
const role = data && data.user && data.user.roles || 'visitor'
// =>
const role = data?.user?.roles ?? 'visitor'
```

## 逻辑赋值运算符 {#logical-assignment}

`ES6` 引入了三个新的逻辑赋值运算符`||=`、`&&=`、`??=`，将逻辑运算符与赋值运算符进行结合。相当于先进行逻辑运算，然后根据运算结果，再视情况进行赋值运算。常用于给变量或属性添加默认值。

```js
x ||= y  /* 等同于 */   x || (x = y)
x &&= y  /* 等同于 */   x && (x = y)
x ??= y  /* 等同于 */   x ?? (x = y)
```

```js
// old
user.id = user.id || 1;
// new
user.id ||= 1;

// old
user.name = user.name ?? 'username';
user.age ?? (user.age = 18);
// new
user.name ??= 'username';
user.age ??= 18;
```
