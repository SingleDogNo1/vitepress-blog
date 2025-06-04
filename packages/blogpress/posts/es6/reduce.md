---
description: reduce 方法详解 && 示例
hidden: true
tags: ['ES6', 'javascript']
---

## 概念

众所周知，reduce 方法是 js 数组中比较高级的用法之一。使用他可以更方便的对数组进行操作。
首先来看看 reduce 的官方解释

::: tip 官方释义
  reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
:::

这个解释很精准，但却比较晦涩，你可能看不懂他要表达什么，但我依然把它写在了开头，希望看完整篇文章后，回头再看这个解释，你能读懂它的含义。

## 语法详解

同样的，我们首先引用官方文档

```js
/*
  callback: 执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数
  accumulator: 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值
  currentValue: 数组中正在处理的元素
  index: 数组中正在处理的当前元素的索引(可选)。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
  array: 调用reduce()的数组（可选）
  initialValue: 可选。作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
*/
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

对应上面的定义，抛去可选参数，一个简单地使用方式就是这样的

```js
const arr = [1,2,3,4];
arr.reduce(function(sum, current) {
  return sum + current
})
// 10
```

上面例子的结果会返回10。我们来看看发生了什么。reduce 函数会将整个操作分步骤来执行。你可以理解为 for 循环。<HighlightText msg="他会把每一个步骤拆解开来去运算，把每一步的结果 return，作为下一步操作的初始值。" />上面例子在第一步操作时，首先返回了`arr`中的第一个值（你可以理解为 for 循环的第一步），也就是1。之后，函数将第一步 return 的值累计到初始值中，作为下一步操作的初始值，这是，`sum`的值已经变成了 1，而 current 的值也变成了循环中的下一个，也就是 2。在这一步骤中，函数执行了加法处理，返回了`1 + 2`，这个值又变成了下一个步骤中的 sum，而 current 也变成了 arr[3]，之后又会执行上述的操作。没错，说了这么多，上面的例子只是 `1+2+3+4`而已。

```js
// step1: sum = 0, current = 1
return sum + current  // 1
// step2: sum = 1, current = 2
return sum + current // 1 + 2
// step3: sum = 1 + 2, current = 3
return sum + current // 1 + 2 + 3
// step4: sum = 1 + 2 + 3, current = 4
return sum + current // 1 + 2 + 3 + 4
```

就是这样。
而`initialValue`则表示运算的初始值。假如上面的例子加上一个初始值

```js
arr.reduce((sum, current) => sum + current, 10)
// 10 + 1 + 2 + 3 + 4 = 20
```

这就是初始值的用法。reduce 的用法其实就已经说完了。你可以滑到最开始定义的地方，重新去看一下定义，是不是有点理解了？

## 难点

reduce 当然不止可以处理加法运算，本质上它处理的只是数组的循环迭代，想要做什么操作取决于你迭代的方法。事实上只要是需要用到数组循环处理的情况，都可以通过`reduce`解决。在面对更加复杂的场景时，新手通常容易理解错误的点在于，首先：<HighlightText msg="reduce函数必须要有返回值，因为需要返回值作为下一次循环的初始值。" />其次，<HighlightText msg="accumulator的值是上一次的初始值，currentValue才是被迭代数组的每一项。" />
新手常会和 js 中循环的概念混淆。这里回调函数中的两个参数并不是都是操作的数组中的值。这也是后续在复杂场景中使用 reduce 唯一需要注意的地方，再举一个例子

```js
// 假设有一张人员表，你需要把所有女性保存出来（sex: 0 => 女; 1 => 男）
const person = [
  { name: '张三', sex: 0 },
  { name: '李四', sex: 1 },
  { name: '王五', sex: 0 },
  { name: '赵六', sex: 0 },
  { name: '马七', sex: 1 }
]
person.reduce((res, current) => {
  if (current.sex === 0) {
    res.push(current.name)
  }
  return res
}, [])
// output ['张三', '王五', '赵六']
```

上面例子中，需要注意的是，回调函数中的`current`指的是`person`中被迭代的每一项，而 `res`指的是被赋予的初始值`[]`，这样你能理解了吗？

## 几个例子，加固理解

正如我上面所说，reduce的用法异常广泛，几乎任何场景都可以使用。所以我没有办法对应应用场景作解释，只能附加几个比较复杂的场景供你参考和巩固，希望对你有些许帮助。

### 还是上面人名的例子，比如现在有一张单独的成绩单，我们需要将两个数组整合为一个数组

```js
const person = [
  { name: 'aa', sex: 0 },
  { name: 'bb', sex: 1 },
  { name: 'cc', sex: 0 },
  { name: 'dd', sex: 0 },
  { name: 'ee', sex: 1 },
  { name: 'ff', sex: 0 }
]
const score = {
  aa: 60,
  bb: 70,
  cc: 80,
  dd: 90,
  ee: 100
}

person.reduce((res, current) => {
  const key = current.name
  // 如果 score 中有对应人名的分数，添加到 score 字段上，否则 score = 0
  current.score = score[key] || 0
  res.push(current)
  return res
}, [])

console.log(person)
/*
[
  {"name":"aa","sex":0,"score":60},
  {"name":"bb","sex":1,"score":70},
  {"name":"cc","sex":0,"score":80},
  {"name":"dd","sex":0,"score":90},
  {"name":"ee","sex":1,"score":100},
  {"name":"ff","sex":0,"score":0}
]
*/
```

### 使用 reduce 实现 groupBy方法

lodash 有一个方法叫做 groupBy

```js
var numbers = [6.1, 4.2, 6.3];
_.groupBy(numbers, Math.floor);
// 返回 {'4': [4.2], '6': [6.1, 6.3]}

var words = ['one', 'two', 'three'];

_.groupBy(words, 'length');
// 返回 {'3': ['one', 'two'], '5': ['three']}
```

使用 reduce 实现同样的效果

```js
function groupBy (arr, current) {
  return arr.reduce((obj, item) => {
    // 判断current是函数还是属性名
    var key = typeof current === 'function' ? current(item) : item[current]
    // 如果属性不存在，则创建一个
    if (!obj.hasOwnProperty(key)) {
      obj[key] = []
    }
    // 将元素加入数组
    obj[key].push(item)
    // 返回这个对象
    return obj
  }, {});
};
```
