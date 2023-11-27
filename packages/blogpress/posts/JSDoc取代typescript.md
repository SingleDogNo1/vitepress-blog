---
description: 关于 Svelte 声称弃用 Typescript 转为 JSDoc 我的一些看法
tags:
  - typescript
categories:
  - typescript
---
# typescript 被放弃了？

最近，关于 Svelte 声称弃用 Typescript 转而使用 JSDoc 的事情传的热度很高，一时间各大论坛又开始了关于是否该弃用typescript的讨论，各路豪杰发表自己的观点，吵的不可开交。我从自己角度出发谈谈我自己的看法。

## 从源头说起

那么首先，我赶紧去查找了[svelte仓库](https://github.com/sveltejs/svelte)。事实上，不管是仓库`language`标签还是最近还在更新的`package,json`，都依然存在`typescript`的影子。翻看源码，也能在各处找到`.d.ts`文件，只是没有我认知中那么大范围的使用而已。因此我认为：<HighlightText msg="Svelte并不是弃用了typescript，只是没有大量使用typescript的功能。" />这一观点也在查找相关issue时得到了验证。

![svelte-without-ts](/svelte-without-ts.png)

图中红色标注部分表明，开发人员只是需要减少开发时编译的成本，同时在使用`vscode`调试时遇到了麻烦，而使用原生就没有问题。有意思的是下面还有`vscode`的开发者对此进行了回复，感兴趣的可以[自己去看看](https://github.com/sveltejs/svelte/pull/8569)。并且在绿色标注中看出，开发者认为首要的问题是`ts`和`js + JSDoc`哪种写起来更舒服，并没有驳斥`ts`存在什么问题。

::: tip

因此，`svelte`并不是像我们所想象的那样完全弃用了`typescript`，只是因为一些原因使用了`js + JSDoc`的方式来进行开发。并且查看源码可以发现，各处可见`.d.ts`的类型文件，不难得出结论，`svelte`使用的不是原始的`JSDoc`，而是基于`ts`实现的`JSDoc`。

[中文文档](https://ts.nodejs.cn/docs/handbook/jsdoc-supported-types.html#type)

[英文文档](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#type)

:::

简单的来说就是`typescript`支持在`js`文件中，通过`JSDoc`的方式来添加`ts`类型。这样做的优势在于<HighlightText msg="不仅保留了typescript定义类型的功能，又避免了ts文件需要频繁编译导致的麻烦。" />

## 碎碎念

从`typescript`出现的第一天开始，各种言论风波就没有停止过。个人认为，编程的核心说到底还是人的便利。开发人员能写出好读、好改的代码，远远大过浏览器性能、服务器载荷等非人的因素。如果在必要的前提下，牺牲一部分设备性能，能保证开发和维护的便利我相信任何团队和个人都是能接受的。无论如何，`typescript`的出现弥补了原生js语法上的巨大不足，使用`typescript`在极大程度上提高了代码的可维护性，单从这一角度上考量，<HighlightText msg="只要原生JS一天不支持类型定义，typescript就不会死。" />任何技术方案都是双刃剑，无非是在权衡利弊哪个更大而已。`svelte`之所以弃用了大部分`typescript`功能，根本上原因是开发人员技术力极高，即使不依赖`typescript`同样可以写出优秀的代码。这并不意味着我们这样的程序员也可以做到相同的事情。并且就我个人写这篇文章时对`JSDoc`的了解，对于我们业务开发人员来说，它的语法也不尽如想象中那么简洁，

## 总结

总而言之，对于 Svelte 弃用 Typescript 转而使用 JSDoc 这件事，我的看法如下：

* ts 弥补了原生 js 的空白，从这一点来说，ts不会死。
* Svelte 并没有弃用 ts，只是没有使用传统的 `.ts` 文件及语法。
* JSDoc 既提供了 ts 的类型提示和检查的能力，又免去了 ts 需要编译才能使用的麻烦。这才是 Svelte 弃用 Typescript 转而使用 JSDoc 的根本原因。
* 任何技术都有两面性，相比日常的 `ts`，`JSDoc`免去了编译才能运行，但是类型文件的定义和引用语法较`ts`更复杂，看个人和团队如何权衡此间利弊了。
