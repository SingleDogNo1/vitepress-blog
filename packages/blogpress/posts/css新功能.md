---
description: 盘点一下css中没怎么使用过但确实实用的新功能
sticky: 5
tags: ['css']
---
# css新功能

我是一个偏向业务开发的前端开发工程师，日常以满足工作需求为主，已经很久没有关注过css方便的新功能了。最近忙里偷闲，记录一下一些新的css功能，补充一下自己的知识储备。

::: tip 提示
  由于工作的原因，并不保证有充足的时间完善文档。本文更多作为个人记录，简单的功能会附带简介和示例，复杂的功能会附带个人觉得不错的文档或者官方文档链接。详细功能请以官方文档为主。如发现文章本身错误，欢迎指正，谢谢。
:::

## css嵌套

详细可以看[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_nesting/Using_CSS_nesting)。实际使用起来和`sass/less`语法的嵌套规则区别不大<HighlightText msg="（除了不支持字符串拼接功能）" color="danger" />，但原生css支持还是令人激动。

## 垂直对齐

以往要想让元素垂直居中，使用`flex`布局是最方便的。但现在有了`align-content`可以直接实现垂直方向对齐。

::: playground

```vue
<template>
  <div class="box" :style="style">
    <div class="a"></div>
  </div>
  <div>
    <button
      v-for="v in ['start', 'center', 'end']"
      :key="v"
      @click="alignContent = v"
    > {{ v }} </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const alignContent = ref('center')

const style = computed(()=> {
  return {
    alignContent: alignContent.value
  }
})
</script>

<style scoped>
.box {
  width: 150px;
  height: 150px;
  background-color: #adc;

  .a {
    width: 100px;
    height: 100px;
    background-color: #ace;
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

现已支持[主流浏览器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。但是如果需要更高级的控制，需要结合`flex / grid`布局使用，详细参考官方文档。

## 高清晰度的颜色

使用[`oklch`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/oklch)和[`oklab`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/oklab)创建更高清晰度的颜色。`oklch`和`oklab`都基于人类感知，尽力模仿人眼感知颜色的方式。其中`oklab`最适合丰富的渐变，`oklch`最适合设计系统中的调色板。令人兴奋的是，二者在各主流浏览器都得到完全支持。详见[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value/oklch#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。

::: playground

```vue
<template>
  <div class="box-wrapper">
    <div class="a"></div>
    <div class="b"></div>
  </div>
</template>

<style scoped>
.box-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .a {
    width: 100px;
    height: 100px;
    background-color: red;
  }

  .b {
    width: 100px;
    height: 100px;
    background-color: oklab(50% 130 20);
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

上面示例使用`oklab`填充纯红色背景，作为对比，背景色为`red`的色块显得黯然失色。并且聪明的你应该注意到，示例代码中使用了原生的css嵌套。

## 计算相对颜色(Releative color)

css现在支持通过对色值计算从而得到新的颜色，无需自己手动计算。[详见文档](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)。

::: playground

```vue
<template>
  <div class="wrap">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item primary"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
</template>
<style scoped>
.wrap {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  height: 300px;
  --base-color: #adc;
  
  .item:nth-child(1) {
    background: oklch(from var(--base-color) calc(l - .20) c h);
  }
  .item:nth-child(2) {
    background: oklch(from var(--base-color) calc(l - .10) c h);
  }
  .item:nth-child(3) {
    background: var(--base-color);
  }
  .item:nth-child(4) {
    background: oklch(from var(--base-color) calc(l + .10) c h);
  }
  .item:nth-child(5) {
    background: oklch(from var(--base-color) calc(l + .20) c h);
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

## has 选择器

`has`选择器填补了css选择器无法选中父元素和其他兄弟元素的空白。同样的，[现代浏览器均支持该语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。用法如下：

```css
/* 选中所有包含p标签的父元素 */
:has(p) 

/* 选中所有直接子元素包含p标签的父元素 */
:has(> p)

/* 选中所有直接子元素包含p标签的父元素, 且父元素标签为div的 */
div:has(> p)

/* 选中与p标签相邻的前一个兄弟标签，且只能是div */
div:has(+ p)

/* 选中p标签前面的所有兄弟标签，且只能是div */
div:has(~ p)
```

::: playground

```vue
<template>
  <div class="demo">
    <h1>1级标题</h1>
    <h2>2级标题</h2>
    <h3>3级标题</h3>
    <h4>4级标题</h4>
    <h1>作为定位的1级标题</h1>
    <h5>5级标题</h5>
  </div>
</template>

<style scoped>
.demo {
  h1 + :has(~ h1) {
    color: #ace;
  }
  h5 ~ :has(+ h5) {
    color: #adc;
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

分步拆解上面的示例：

+ `h1 + :has(~ h1)`
  + `:has(~ h1)`表示选中所有`h1`标签之前的标签，及前四个标签
  + `h1 +`表示紧挨着`h1`的下一个兄弟标签。四个标签中只有第二个符合条件
+ `h1 ~ :has(+ h5)`
  + `:has(+ h5)`表示选择相邻的下一个标签是`h5`的标签，只有`作为定位的1级标题`满足条件
  + `h5 ~`表示查找`h5`之后的兄弟标签。但`h5`已经是最后一个标签了，自然不会查找到任何结果，因此这条规则不会生效。<HighlightText msg="聪明的你一定想的到，如果将h5换成h1 — h4中任一个，规则都会成立。修改代码查看结果。" />

### 高级示例

下面是一个实现Mac电脑的dock效果的示例

::: playground

```vue
<template>
  <div class="box">
    <div v-for="v in 8" :key="v" class="son">{{ v }}</div>
  </div>
</template>
<style scoped>
.box{
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .son {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin: 8px;
    border-radius: 8px;
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    transition: all ease 0.2s;
    transform-origin: center bottom;

    &:hover {
      transform: scale(1.4);
      & + .son {
        transform: scale(1.2); 
      }
    }
  }
}

/* 选择存在 后一个相邻的被hover的兄弟元素 的元素 */
.son:has( + .son:hover){
  transform: scale(1.2);
}

/*
  .box:has(.son:hover): 选择box下被hover的son元素
  .son:not(:hover, :has(+ :hover), .son:hover + *): 排除son元素中
    - 正在hover的元素
    - 正在hover的元素的前一个邻接的兄弟元素
    - 正在hover的元素的后一个邻接的兄弟元素；
*/
.box:has(.son:hover) .son:not(:hover, :has(+ :hover), .son:hover + *) {
  transform: scale(0.8);
  opacity: 0.6;
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "vertical",
    "layoutReverse": true
  }
}
```

:::

## @layer

`layer`的出现为css样式优先级的控制提供了更好的思路，并且有效解决了`!important`滥用的情况。同样的，各主流浏览器均已[支持该语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)。

### 基本用法

`@layer`的用法很简单，只需要用`@layer`包裹平时书写的css样式即可。

::: playground

```vue
<template>
  <div class="box"></div>
</template>
<style scoped>
@layer {
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

你会发现和正常的css样式没有区别，生成了一个`100*100`的红色方块。那这样写的意义在哪里呢？答案是这样一来，写在`@layer`中的样式优先级会永远低于普通的css样式。此时再按照正常的css样式书写，就可以覆盖`@layer`中的样式了,即使`@layer`写在普通样式之后。

::: playground

```vue
<template>
  <div class="box"></div>
</template>
<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: blue;  
}

@layer {
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
</style>
```

```json
{
  "editorConfig": {
    "layout": "horizontal",
    "layoutReverse": false
  }
}
```

:::

除了上面的用法，`@layer`还可以指定名称，命名后可以通过名称对其进行更细致的使用，包括

+ 导入css样式

  ```css
  /* a.css */
  @layer button {}

  /* b.css */
  @import './a.css' layer(button);
  ```

+ 同时使用多个名称

  ```css
  /* 样式将按照 b, a, c 的顺序加载 */
  @layer c, a, b {}
  @layer a {}
  @layer b {}
  @layer c {}
  ```

还有更多使用方式，如果你也感兴趣，可以查看其他教程。

+ [ChokCoco 的教程](https://www.cnblogs.com/coco1s/p/16038513.html)
+ [张鑫旭 的教程](https://www.zhangxinxu.com/wordpress/2022/05/css-layer-rule/)
