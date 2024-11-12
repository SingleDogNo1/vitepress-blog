---
description: 偏门但有奇效的css伪元素用法
tags: ['css']
---
# css 伪元素

::: tip
[原文地址](https://singledogno1.github.io/blog/posts/614e4fa6/)
:::

设想一个简单的组件，如果没有数据，则显示暂无数据的字样。这很简单就可以实现

```vue preview
<template>
<div class="container">
</div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  position: relative;
  width: 200px;
  height: 200px;
  background: deepskyblue;

  &:after {
    content: '暂无数据';
    position: absolute;
    text-align: center;
    line-height: 200px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
```

但随之而来的就产生了问题：如果`content`中的内容不是固定的该怎么解决？包括但不限于：

* 上面例子中，暂无数据字样改为国际化
* 格局再打开些，假设是后端返回的数据需要如此展示，又该如何处理？

抱着学习的心态，查找了css伪元素相关资料，才发现不仅解决了眼下的问题，还发现伪元素有更多偏门但实用的使用方式，在这里做记录，之后遇到适用的场景时，方便实现。

## 插入属性

可以使用`attr`方法直接获取元素的属性，包括自有属性和自定义属性。本文中出现的问题也是通过这个方法解决的。

```vue preview
<template>
  <div text="hello, world"></div>
</template>

<style scoped>
  div {
    box-sizing: border-box;
    position: relative;
    width: 200px;
    height: 200px;
    background: #ace;

    &:after {
      word-break: break-all;
      background: #fff;
      content: attr(text);
      position: absolute;
      text-align: center;
      line-height: 200px;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
</style>
```

上面示例中，使用了`div`的自定义属性`text`，因此显示了`hello，world`，优点在于可以随意修改`text`的值，无论`vue`、`react`绑定的值，还是后端返回结果，只要读取到，属性也会随时变化。<HighlightText msg="修改代码可以实时查看效果。" />

## 插入符号

可以使用`quotes`在字符串两端添加自定义的字符。

```vue preview
<template>
  <h1>一段文字</h1>
  <h2>另一段文字</h2>
  <h3>第三段文字</h3>
</template>

<style scoped>
  h1 {
    quotes: "("")";

    &:before {
      content: open-quote;
    }

    &:after {
      content: close-quote;
    }
  }
  h2 {
    quotes: "\♂""\♀";

    &:before {
      content: open-quote;
    }

    &:after {
      content: close-quote;
    }
  }
  h3 {
    quotes:"\"" "\"";

    &:before {
      content: open-quote;
    }

    &:after {
      content: close-quote;
    }
  }
</style>
```

## 插入图片

很多人大概也不知道，`content`是可以插入图片的。

```vue preview
<template>
<div class="container">
</div>
</template>

<style scoped>
.container {
  width: 200px;
  height: 200px;

  &:after {
    content: url(
https://vitepress.dev/vitepress-logo-mini.svg);
  }
}
</style>
```

## 插入编号

可以使用`counter`属性产生自增的编号，并且可以自定义和生成更复杂的编号。

### 基本用法

```vue preview
<template>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
</template>

<style scoped>
h1 {
  counter-increment: list;

  &:before {
    content:counter(list);
  }
}
</style>
```

### 自定义编号

```vue preview
<template>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
</template>

<style scoped>
h1 {
  counter-increment: list;

  &:before {
    color: deeppink;
    content:'第'counter(list)'章';
  }
}
</style>
```

### 修改编号种类

:::tip
编号种类参考[ul标签的`list-style-type`属性值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)
:::

```vue preview
<template>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
  <h1>这是一个标题</h1>
</template>

<style scoped>
h1 {
  counter-increment: list;

  &:before {
    color: deeppink;
    content:counter(list, upper-alpha);
  }
}
</style>
```

### 多层嵌套示例

> 大标题 + 中标题 + 小标题

```vue preview
<template>
  <h1>大标题</h1>
  <h2>中标题</h2>
  <h3>小标题</h3>
  <h3>小标题</h3>
  <h2>中标题</h2>
  <h3>小标题</h3>
  <h3>小标题</h3>
  <h1>大标题</h1>
  <h2>中标题</h2>
  <h3>小标题</h3>
  <h3>小标题</h3>
  <h2>中标题</h2>
  <h3>小标题</h3>
  <h3>小标题</h3>
</template>

<style scoped>
  h1{
    counter-increment:h1;
    counter-reset:h2;
    &:before{
      content:counter(h1)'.';
    }
  }
  h2{
    counter-increment:h2;
    counter-reset:h3;
    margin-left:40px;
    &:before{
      content:counter(h1) '-' counter(h2)'.';
    }
  }

  h3{
    counter-increment:h3;
    margin-left:80px;
    &:before{
      content:counter(h1) '-' counter(h2) '-' counter(h3)'.';
    }
  }
</style>
```

## 结语

最后附上张鑫旭的一篇文章： [小tip:CSS计数器+伪类实现数值动态计算与呈现](https://www.zhangxinxu.com/wordpress/2014/12/css-counters-pseudo-class-checked-numbers/)
