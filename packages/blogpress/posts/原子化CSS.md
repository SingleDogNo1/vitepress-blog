---
description: 我理解的原子化CSS
title: unocss使用心得
tags: ['css']
---
# 原子化CSS

本文简述一下个人在使用原子化css开发时的一些感触，并简单说说我理解相较于其他CSS架构的优劣。在开始之前先来看看什么是原子化CSS。

## 概念

:::tip 什么是原子化CSS(Atomic CSS)
Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

译: 原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。
:::

实际上就是以下这类CSS的统称

```css
.text-red {
  color: red;
}
.m-0 {
  margin: 0
}
```

结合上面的概念不难看出，原子化CSS核心的概念有两点：

* 语义化，一看就懂想要表达的意思
* 单一性，每个css只定义单一功能的类

以下例子就不算原子化CSS

```css
/* 违反了单一性原则，定义个多个属性 */
.container {
  width: 100%;
  padding: 0 10px;
}
```

## tailwind css VS windicss VS unocss

相信大家也能看出，这样的概念早在很久之前`bootstrap`之类的UI框架中就早有使用，日常开发中我们偶尔也会自己定义类似的类名以供方便。更有`sass/less`之类的预处理器也会接管一部分css生成的工作。

```scss
@for $i from 1 through 10 {
  .m-#{$i} {
    margin: $i / 4rem;
  }
}

/* 编译为 */
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
/* ... */
.m-10 { margin: 2.5rem; }
```

可问题在于，无论如何构建，css代码都是真实存在的。就如上面编译好的css示例，我们未必会使用所有`.m-1 - .m-10`的所有类名，那么多余出来的代码就造成了不必要的代码冗余。随着场景增多，css体积还会继续增加，这不是我们想要看到的。`tailwind css`并没有完美的解决这一问题，它通过[Purgecss](https://purgecss.com/introduction.html)，在打包时会删除未使用过的css来优化体积，但在开发环境中仍然需要编译为动辄超过数MB的源文件，尤其是使用`vite`架构开发时，其他内容的加载速度非常快，导致严重影响了开发体验。

`windicss`在`tailwind css`的基础上，实现了按需生成的方案，预先扫描源码，保证只生成有用的css。并且在文章编辑的节点，`windicss`已经不在积极维护，团队重心转向了[`unocss`](https://windicss.org/posts/sunsetting.html)。[`unocss`](https://unocss.dev/guide/)由`windicss`成员维护，在前作的基础上优化了配置方式，支持自定义原子化规则，配合[VSCode编辑器插件](https://unocss.dev/integrations/vscode)，有更舒适的开发体验。

上面的描述总的来说相对模糊，更具体的对比可以[查看原作者的这篇文章](https://antfu.me/posts/reimagine-atomic-css-zh#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8E%9F%E5%AD%90%E5%8C%96-css)。当然如果你对原子化CSS已经有所了解，知道它如何使用，也可以看我的总结，如下：

* 优势
  * 原子化CSS从根本上解决了CSS在打包时文件过大的问题，因为它采用的是预扫描源码然后编译的原理，保证不产生冗余的样式文件，其中`unocss`当属其中集大成者，编译更快，配置更简洁，且搭配相应的开发插件。
  * 原子化CSS定义了语义化的单一功能类名，使css的编写也可以类似组件的方式去搭建（通过`@apply`的方式）。
  * 支持自定义，包括但不限于自定义各种主题颜色（可用于便捷换肤）、自定义浏览器`@media`宽度（方便响应式）、自定义自己的类名规则等。
  * `unocss`可配置各种[预设](https://unocss.dev/presets/)和插件，更方便的使用`postcss`、`rem`、`css var`等。
* 劣势
  * 尽管已经足够语义化，但初入手时还是会有较大的记忆负担，如果项目有自己定义的类名规则，还会额外增加记忆负担。
  * 很容易写成一长串难以阅读的样式类名，尤其在现代化的`vue/react`开发环境中，`html`和`js`混写已经导致文件文件越来越长，长串的类名会更加剧“面条代码”的情况。但是需要注意的是：<HighlightText msg="长串的类名并不是增加文件的体积。html文件体积增加但随之变化的是css文件大小的锐减。严格意义上，受影响的只有html文件的阅读性。" />我们可以通过以下方式来优化“面条代码”的可阅读性：
    * 通过`eslint / stylelint / prettier`来规范文件换行情况，合理控制可读性
    * 如上优势中提到的，通过`@apply`可以组合部分样式并定义为新的样式类名，减少代码长度。
    * [`Attributify Mode`](https://unocss.dev/presets/attributify#attributify-mode)从一定程度上减少代码量。
    * `unocss`只提供了规范，但并没有约束我们必须完全按照它的规则来。完全可以混用。你可以只在你觉得方便的地方使用它。

      ```html
        <div class="card-wrapper">
          <img class="round border w-10 h-10" />
          <h3 class="card-title text-red-50"></h3>
        </div>

        <style>
          .card-wrapper {/* ... */}
          .card-title {/* ... */}
        </style>
      ```

最后还是要补充一句，本文只阐述我自己使用`unocss`以来的一些心得，只算是抛砖引玉。如果你有不同意见，也欢迎讨论。既然看到了最后，相信你对`unocss`还是有兴趣的，再次附上[作者原文：重新构想原子化CSS](https://antfu.me/posts/reimagine-atomic-css-zh#%E4%BB%80%E4%B9%88%E6%98%AF%E5%8E%9F%E5%AD%90%E5%8C%96-css)。
