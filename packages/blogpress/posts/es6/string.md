---
hidden: true
tags: ['ES6', 'javascript']
---

[[toc]]

## at -- 查询指定位置 {#at}

`at()` 方法接受一个整数值，并返回一个新的 String，该字符串由位于指定偏移量处的单个 UTF-16 码元组成。该方法允许正整数和负整数。负整数从字符串中的最后一个字符开始倒数。
<HighlightText msg="实现查找字符串功能的方法有很多，但都不具备 at() 方法的简洁性和可读性。" />

```js
// 返回给定字符串的最后一个字符的函数
function returnLast(arr) {
  return arr.at(-1);
}

let invoiceRef = "myinvoice01";
console.log(returnLast(invoiceRef)); // '1'

invoiceRef = "myinvoice02";
console.log(returnLast(invoiceRef)); // '2'
```

## includes -- 查找字符串 {#includes}

`includes()` 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。方法包含两个参数：

+ string -- 要搜索的字符串
+ index --可选。开始搜索的位置，默认为 0

```js
const str = "To be, or not to be, that is the question.";

console.log(str.includes("To be")); // true
console.log(str.includes("question")); // true
console.log(str.includes("nonexistent")); // false
console.log(str.includes("To be", 1)); // false
console.log(str.includes("TO BE")); // false
console.log(str.includes("")); // true
```

## indexOf & lastIndexOf -- 查找字符串位置 {#indexOf}

返回字符串中第一次 / 最后一次出现的指定值的索引。如果没有查找到，返回-1。有两个参数：

+ string -- 要查找的值
+ index -- 可选。开始搜索的位置，默认为 0

```js
'hello world hello'.indexOf('o') // 4 
'hello world hello'.indexOf('world', 12) // -1 从第12位索引开始查找，查无此值

"canal".lastIndexOf("a"); // 3
"canal".lastIndexOf("a", 2); // 1
"canal".lastIndexOf("a", 0); // -1

const anyString = "Brave, Brave New World";
console.log(anyString.indexOf("Brave")); // 0
console.log(anyString.lastIndexOf("Brave")); // 7
```

## padStart & padEnd -- 填充字符串 {#padStart}

给当前字符串从开始 / 末尾填充给定的字符串（如果需要会重复填充），直到达到给定的长度。有两个参数：

+ targetLength -- 目标长度
+ padString -- 可选。填充字符串，默认为空格

```js
"abc".padStart(8); // "     abc"
"abc".padStart(8, "0"); // "00000abc"
"abc".padStart(10, "foo"); // "foofoofabc"
"abc".padStart(6, "123465"); // "123abc"

"abc".padEnd(10); // "abc       "
"abc".padEnd(10, "foo"); // "abcfoofoof"
"abc".padEnd(6, "123456"); // "abc123"
"abc".padEnd(1); // "abc"
```

## repeat -- 重复字符串 {#repeat}

返回一个新字符串，其中包含指定数量的当前字符串的副本。

```js
"abc".repeat(0); // ''
"abc".repeat(1); // 'abc'
"abc".repeat(2); // 'abcabc'
```

## startsWidth & endsWidth -- 查找字符串 {#startsWidth}

判断当前字符串是否以另外一个给定的子字符串开头 / 结尾，根据情况返回 true 或 false。有两个参数：

+ searchString -- 要搜索的字符串
+ position -- 可选。开始搜索的位置，默认为 0

```js
const str = "To be, or not to be, that is the question.";

console.log(str.startsWith("To be")); // true
console.log(str.startsWith("not to be")); // false
console.log(str.startsWith("not to be", 10)); // true

const str = "生存还是毁灭，这是一个问题。";

console.log(str.endsWith("问题。")); // true
console.log(str.endsWith("毁灭")); // false
console.log(str.endsWith("毁灭", 6)); // true
```

## trimStart & trimEnd -- 去除字符串空格 {#trim}

去除字符串开头 / 结尾的空格。

```js
const greeting = "   Hello world!   ";
console.log(greeting); // "   Hello world!   "
console.log(greeting.trimStart()); // "Hello world!   "
console.log(greeting.trimEnd()); // "   Hello world!"
```

## isWellFormed -- 校验合法（不常用） {#isWellFormed}

`isWellFormed()` 方法用于检查字符串是否合法，根据情况返回 true 或 false。

```js
// 如果传递的字符串格式不正确， encodeURI 会抛出错误。
// 可以通过 isWellFormed 测试字符串避免异常报错
const illFormed = "https://example.com/search?q=\uD800";

encodeURI(illFormed); // URIError: URI malformed

if (illFormed.isWellFormed()) {
  console.log(encodeURI(illFormed));
} else {
  console.warn("Ill-formed strings encountered.");
}
```

## toWellFormed -- 转换合法（不常用） {#toWellFormed}

`toWellFormed()` 方法用于将字符串转换为合法的格式。

```js
const illFormed = "https://example.com/search?q=\uD800";

encodeURI(illFormed); // URIError: URI malformed

console.log(encodeURI(illFormed.toWellFormed()));
// "https://example.com/search?q=%EF%BF%BD"
```
