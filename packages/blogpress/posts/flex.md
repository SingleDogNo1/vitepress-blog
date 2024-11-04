---
description: CSS Flex 语法总结
tags:
  - css
categories:
  - css
---

# CSS Flex布局

## 写在前面

::: danger 阅前声明

全文几乎全抄某技术大佬文章，一来手写一遍加深记忆，二来痛恨其检测adblock的行为，备份下来以后不去刷浏览量

:::

::: tip 注意

部分样式并未放在代码示例中，这样可以更关注于重点讲解的样式

:::

## Flex 布局是什么？

Flex 是 `Flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 `Flex` 布局。

```css
.box {
  display: flex;
}

/* 行内元素可以使用 inline-flex */
.box2 {
  display: inline-flex;
}
```

::: warning 注意

设为 `Flex` 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

:::

## 基本概念

设置了 `Flex` 布局的元素，称为 Flex 容器(`flex container`, 以下简称"容器")。它的所有直接子元素自动成为容器成员，称为 Flex 项目(`flex item`, 以下简称"项目")。容器默认存在两根轴: `主轴`(项目排列的方向，默认为水平方向)和与之垂直的`交叉轴`。主轴的开始位置叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。 单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。

![vue-vite-template-img-1](/flex-1.png)

## 容器的属性

以下6个为容器的属性。

- flex-direction: 设置主轴的方向(即项目的排列方向)
- flex-wrap: 设置项目如何换行
- flex-flow: 复合属性，是`flex-direction`和`flex-wrap`的简写
- justify-content: 设置项目在主轴上的对齐方式
- align-items: 设置项目在交叉轴上如何对齐
- align-content: 设置多根轴线的对齐方式

### flex-direction

`flex-direction`属性决定主轴的方向（即项目的排列方向）。可选有四个值。

|      选项      |                说明                |
| :------------: | :--------------------------------: |
|      row       | 主轴为水平方向，起点在左端(默认值) |
|  row-reverse   |     主轴为水平方向，起点在右端     |
|     column     |     主轴为垂直方向，起点在上沿     |
| column-reverse |     主轴为垂直方向，起点在下沿     |

```vue preview
<template>
<div class="flex-demo-wrapper row">
  <div class="flex-demo-item">1</div>
  <div class="flex-demo-item">2</div>
  <div class="flex-demo-item">3</div>
</div>
<div class="flex-demo-wrapper row-reverse">
  <div class="flex-demo-item">1</div>
  <div class="flex-demo-item">2</div>
  <div class="flex-demo-item">3</div>
</div>
<div class="flex-demo-wrapper column">
  <div class="flex-demo-item">1</div>
  <div class="flex-demo-item">2</div>
  <div class="flex-demo-item">3</div>
</div>
<div class="flex-demo-wrapper column-reverse">
  <div class="flex-demo-item">1</div>
  <div class="flex-demo-item">2</div>
  <div class="flex-demo-item">3</div>
</div>
</template>

<style scoped>
.row {
  flex-direction: row;
}

.row-reverse {
  flex-direction: row-reverse;
}

.column {
  flex-direction: column;
}

.column-reverse {
  flex-direction: column-reverse;
}
</style>
```

### flex-wrap

flex-wrap属性定义如果一条轴线排不下，如何换行。默认情况下，即使项目超出了容器的尺寸也会强制排在一条轴线上。可选有三个值。

|     选项     |        说明        |
| :----------: | :----------------: |
|    nowrap    |   不换行(默认值)   |
|     wrap     | 换行，第一行在上方 |
| wrap-reverse | 换行，第一行在下方 |

```vue preview
<template>
<div class="flex-demo-wrapper nowrap">
  <div v-for="i in 5" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper wrap">
  <div v-for="i in 5" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper wrap-reverse">
  <div v-for="i in 5" :key="i" class="flex-demo-item">{{ i }}</div>
</div>
</template>

<style scoped>
.flex-demo-wrapper {
  width: 200px;

}

.nowrap {
  flex-wrap: nowrap;
}

.wrap {
  flex-wrap: wrap;
}

.wrap-reverse {
  flex-wrap: wrap-reverse;
}

</style>
```

### flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### justify-content

`justify-content`属性定义了项目在主轴上的对齐方式。可选有五个值。

|     选项      |                             说明                             |
| :-----------: | :----------------------------------------------------------: |
|  flex-start   |                    对齐容器的开头(默认值)                    |
|   flex-end    |                        对齐容器的结尾                        |
|    center     |                        在容器中间对齐                        |
| space-between |                         项目两端对齐                         |
| space-around  | 每个项目两侧间隔相等，项目之间的间隔比项目与边框的间隔大一倍 |

```vue preview
<template>
<div class="flex-demo-wrapper start">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper end">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper center">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper between">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper around">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>
</template>

<style scoped>
  .a {
    width: 100px;
  }

  .b {
    width: 50px;
  }

  .c {
    width: 150px;
  }

  .start {
    justify-content: flex-start;
  }

  .end {
    justify-content: flex-end;
  }

  .center {
    justify-content: center;
  }
  
  .between {
    justify-content: space-between;
  }

  .around {
    justify-content: space-around;
  }
</style>
```

### align-items {#align-items}

`align-items`属性定义项目在交叉轴上如何对齐。可选有五个值。

|      选项       |                        说明                        |
| :-------------: | :------------------------------------------------: |
|   flex-start    |              交叉轴的开头对齐(默认值)              |
|    flex-end     |                  交叉轴的结尾对齐                  |
|     center      |                  交叉轴的中点对齐                  |
|    baseline     |             项目的第一行文字的基线对齐             |
| stretch（默认） | 如果项目未设置高度或设为auto，将占满整个容器的高度 |

```vue preview
<template>
<div class="flex-demo-wrapper start">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper end">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper center">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper stretch">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>

<div class="flex-demo-wrapper baseline">
  <div class="flex-demo-item a">1</div>
  <div class="flex-demo-item b">2</div>
  <div class="flex-demo-item c">3</div>
</div>
</template>

<style scoped>
.a {
  height: 50px;
  line-height: 50px;
}
.b {
  height: 100px;
}
.c {
  height: 150px;
}

.start {
  align-items: flex-start;
}

.end {
  align-items: flex-end;
}

.center {
  align-items: center;
}

.stretch {
  align-items: stretch;
}
/** 如果要 align-items: stretch 生效，项目不可以设置高度。但是line-height: 100px，因此高度最终定为了100px */
.stretch div {
  height: auto;
}

.baseline {
  align-items: baseline;
}
</style>
```

### align-content

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。可选有六个值。

|     选项      |                                   说明                                   |
| :-----------: | :----------------------------------------------------------------------: |
|  flex-start   |                             交叉轴的开头对齐                             |
|   flex-end    |                             交叉轴的结尾对齐                             |
|    center     |                             交叉轴的中点对齐                             |
| space-between |              项目在交叉轴上两端对齐，轴线之间的间隔平均分布              |
| space-around  | 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 |
|    stretch    |                        轴线占满整个交叉轴(默认值)                        |

```vue preview
<template>
<div class="flex-demo-wrapper start">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper end">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper center">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper stretch">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper between">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>

<div class="flex-demo-wrapper around">
  <div v-for="i in 10" :key="i" class="flex-demo-item">{{ i }}</div>
</div>
</template>

<style scoped>
.flex-demo-wrapper {
  width: 400px;
  height: 300px;
  flex-wrap: wrap;
}

.flex-demo-item:nth-child(even) {
  width: 100px;
}

.start {
  align-content: flex-start;
}

.end {
  align-content: flex-end;
}

.center {
  align-content: center;
}

.stretch {
  align-content: stretch;
}
/** 如果要 align-items: stretch 生效，项目不可以设置高度。但是line-height: 100px，因此高度最终定为了100px */
.stretch div {
  height: auto;
}

.between {
  align-content: space-between;
}

.around {
  align-content: space-around;
}
</style>
```

## 项目的属性

以下6个为项目的属性。

- order: 定义项目的排列顺序
- flex-grow: 定义项目的放大比例
- flex-shrink: 定义项目的缩小比例
- fles-basis: 定义了在分配多余空间之前，项目占据的主轴空间
- flex: 复合属性，`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`
- aign-self: 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性

### order

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```vue preview
<template>
  <div class="flex-demo-wrapper">
    <div v-for="i in 4" :key="i" class="flex-demo-item" :style="{order: 4-i}">{{ i }}</div>
  </div>
</template>
```

### flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。设置了`flex-grow: 1;`，`width`属性将失效并按照规则划分空间。

如果所有项目的flex-grow属性都相同，则它们将等分剩余空间。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

```vue preview
<template>
  <div class="flex-demo-wrapper">
    <div v-for="i in 4" :key="i" :class="['flex-demo-item']">{{ i }}</div>
  </div>

  <div class="flex-demo-wrapper">
    <div v-for="i in 4" :key="i" :class="['flex-demo-item', {grow2: i === 2}]">{{ i }}</div>
  </div>
</template>

<style scoped>
  .flex-demo-wrapper {
    width: 400px;
  }

  .flex-demo-item {
    flex-grow: 1;
  }
  .grow2 {
    flex-grow: 2;
  }
</style>
```

### flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。负数的`flex-shrink`不生效。具体表现类似`flex-grow`, 如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

### flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

### flex

`flex`属性是`flex-grow`,`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖容器的`align-items`属性。默认值为`auto`，表示继承容器的`align-items`属性，如果没有父元素，则等同于stretch。可选项有六个值。表现与[`align-items`](#align-items)一致,不再赘述。
