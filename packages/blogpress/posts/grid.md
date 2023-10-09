---
description: CSS Grid 语法总结
tags:
  - css
categories:
  - css
---
# CSS Grid布局

## 写在前面

::: danger 阅前声明

全文几乎全抄某技术大佬文章，一来手写一遍加深记忆，二来痛恨其检测adblock的行为，备份下来以后不去刷浏览量

:::

Grid布局是目前css最强大的布局方案，它的原理是将网页划分为一个个网格，使用网格系统来呈现各种各样的布局效果。因此，使用它可以实现所有形式的布局，尤其在做一些不规则的布局时，grid 的强大更显得尤为出众。

::: info 为什么 grid 布局不如 flex 使用广泛？

`flex`布局本质为轴线布局，只需要指定布局的方向（水平/垂直）即可划分网页的区块，可以看做一维布局。而`grid`布局则是将容器划分成"行"和"列"，产生单元格，然后操作划分出的单元格，可以看作是二维布局。因此`flex`布局语法本身要较`grid`简单清晰。并且大部分布局需求本身都有规整的结构，使用 flex 就可以轻松实现。

:::

grid 布局于 flex 布局有一定的相似性，下面的教程会对照写法，加深印象

::: tip

部分样式并未放在代码示例中，这样可以更关注于重点讲解的样式

:::

## 基本概念

### 项目和容器

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的直接子元素，称为"项目"（item）。

```html
<div id="container" style="display: grid"> // [!code error]
  <div class="item"><p>1</p></div> // [!code warning]
  <div class="item"><p>2</p></div> // [!code warning]
  <div class="item"><p>3</p></div> // [!code warning]
</div> // [!code error]
```

上面代码中，`.container`为容器，3 个`.item`为项目。

::: warning 注意

项目是容器的直接子元素，比如上面代码的`<p>`就不是项目。Grid 布局只对`.item`生效。

:::

### 行、列、单元格

容器中水平的区域为行（row），垂直的区域为列（column），行和列交叉产生的区域称为单元格（cell）。
正常情况下，`m`行`n`列会产生`m * n`个单元格。

## css 属性

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。

### 容器属性

#### display

使用`display: grid`可以指定一个容器采用网格布局。

```css
div {
  display: grid;
}
```

也可以使用`display: inline-grid`，设置为行内元素，效果类似于`inline-flex`。

::: warning

和flex相同，设置为网格布局后，项目的`float`、`display: inline-block`等属性均失效

:::
>

#### grid-template-columns / grid-template-rows

指定了网格布局后，就开始划分行和列。 `grid-template-columns` 用来定义每一列， `grid-template-rows`用来定义每一行。

<!-- <preview path="./vue-template/grid/1.vue" /> -->

```vue preview
<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)
function add() {
  count.value++
}
function del() {
  count.value--
}
</script>

<template>
  <h1>{{count}}</h1>
  <button @click="add">add</button>
  <button @click="del">del</button>
</template>
```

上面代码指定了一个三行三列的网格，宽高均为`100px`。为了方便理解，这个例子中没有插入子元素，你可以打开控制台查看当前状态。

也可以使用百分比

<preview path="./vue-template/grid/2.vue" />

上面代码指定了一个三行四列的容器，每个项目宽为25%、高为33.33%。因为例子中只填充了10个项目，因此最后留出了两个项目的位置，你可以打开控制台查看当前状态

##### repeat()

相信我们都发现了，当网格系统足够复杂时，需要我们写很多重复的值。这时可以使用`repeat()`函数简化重复的值，简化代码如下

<preview path="./vue-template/grid/3.vue" />

`repeat()`接受两个参数，第一个是重复的次数，第二个是需要重复的值。<HighlightText msg="而且这里的值不必非得是固定的值，我们可以给定一组值，同样可以重复执行。" />

<preview path="./vue-template/grid/4.vue" />

上面代码表示每列按照`100px 80px 60px`的规则，重复两次。因此共得到了 6 列，表现为第一列和第四列的宽度为100px，第二列和第五列为80px，第三列和第六列为60px。又定义了 3 行，每行高度固定为`100px`

##### auto-fill

有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

<preview path="./vue-template/grid/5.vue" />

上面代码会按照每列宽度`100px`自动填充，直到当前行无法容纳才会折行。尝试改变浏览器宽度查看现象。

##### fr

网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。类似于 flex 中的项目的`flex-grow`属性。

<preview path="./vue-template/grid/6.vue" />

上面代码创建三个相同宽度的列。

`fr`在与绝对长度的单位结合使用，会产生非常神奇的效果。

<preview path="./vue-template/grid/7.vue" />

上面代码表示，第一列的宽度为150像素，第二列的宽度是第三列的一半。

##### minmax()

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

<preview path="./vue-template/grid/8.vue" />

上面代码中，minmax(100px, 1fr)表示自动计算列宽，保证值不小于100px，且不大于1fr。

::: warning

如果参数中的最大值计算后反而小于最小值，此时对比结果无效，以最大值为结果。可以将上面例子中`100px`改为`1000px`自行查看具体结果

:::

##### auto

`auto`关键字表示由浏览器自己决定长度。

<preview path="./vue-template/grid/9.vue" />

上面代码中，第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了`min-width`，且这个值大于最大宽度。

##### 网格线命名 {#grid-template-name}

`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

<preview path="./vue-template/grid/10.vue" />

上面代码指定网格布局为`3行 x 3列`，因此有`4`根垂直网格线和`4`根水平网格线。方括号里面依次是这八根线的名字。

#### row-gap / column-gap / gap

grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）。

<preview path="./vue-template/grid/11.vue" />

上面代码中，行间距和列间距均为`20px`。

`gap`属性是`column-gap`和`row-gap`的合并简写形式，语法如下。

```css
.container {
  gap: <row-gap> <column-gap>;
}
```

因此，上面一段 CSS 代码等同于下面的代码。

```css
.container {
  gap: 20px 20px;
}
```

::: tip

如果`gap`省略了第二个值，浏览器认为第二个值等于第一个值。

:::

#### grid-template-areas

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域，需要与[grid-area](#grid-area)配合使用。具体示例请看[grid-area](#grid-area)，这里只说明语法。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

上面代码先划分出9个单元格，然后将其定名为`a`到`i`的九个区域，分别对应这九个单元格。

多个单元格合并成一个区域的写法如下。

```css
.container {
  grid-template-areas: 'a a a'
                       'b b b'
                       'c c c';
}
```

上面代码将9个单元格分成`a`、`b`、`c`三个区域。

下面是一个布局实例。

```css
.container {
  grid-template-areas: "header header header"
                       "main main sidebar"
                       "footer footer footer";
}
```

上面代码中，顶部是`header`区域，底部是`footer`区域，中间部分左边为`main`区域，右边为`sidebar`区域。

如果某些区域不需要利用，则使用`.`表示。

```css
.container {
  grid-template-areas: 'a . c'
                       'd . f'
                       'g . i';
}
```

上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。

::: warning

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。

:::

#### grid-auto-flow {#grid-auto-flow}

从上面的例子中不难察觉，设置为`grid`布局后，容器的子元素会默认"先行后列"排序，即先填满第一行，再开始放入第二行，依次执行。我们可以通过`grid-auto-flow`属性可以改变网格的排序，默认为`row`,及“先行后列”，可以设置为`column`，变为“先列后行”。

<preview path="./vue-template/grid/12.vue" />

除了`row`和`column`，还可以设置为`row dense`和`column dense`。这两个值主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

下面的例子提前使用了项目的属性[grid-column-start](#grid-column-start)，目的是让1号项目和2号项目各占据两个单元格，然后在默认的`grid-auto-flow: row`情况下，会产生下面这样的布局。

<preview path="./vue-template/grid/13.vue" />

因为 3 号项目默认跟在 2 号项目之后，而第一行又无法容纳 2 号项目，所以第一行只能出现了空白。如果修改`grid-auto-flow: row dense`，就会在“先行后列”的基础上，尽可能紧密填满，不出现空格。

<preview path="./vue-template/grid/14.vue" />

`column dense`，也是同样的意思，不过会遵循"先列后行"，并且尽量填满空格。

#### grid-auto-columns / grid-auto-rows

参照上面的例子，我们定义了3×3的网格系统，但是因为某些原因导致实际渲染时出现了第四行。这时，虽然浏览器会自动生成多余的网格，以便放置项目。但是自动填充的网格宽高是根据内容自动生成的，想要设置多余网格的样式，可以使用`grid-auto-columns`属性和`grid-auto-rows`属性。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。参照一下示例。

<preview path="./vue-template/grid/15.vue" />

上面的例子里面，指定新增的行高统一为50px（原始的行高为100px）。

#### justify-items / align-items / place-items

`justify-items`属性设置单元格内容的水平位置，`align-items`属性设置单元格内容的垂直位置。

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

这两个属性的写法完全相同，都可以取下面这些值：

+ start：对齐单元格的起始边缘。
+ end：对齐单元格的结束边缘。
+ center：单元格内部居中。
+ stretch：拉伸，占满单元格的整个宽度（默认值）。

`place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

```css
.container {
  place-items: <align-items> <justify-items>;
}
```

如果省略第二个值，则浏览器认为与第一个值相等。

#### justify-content / align-content / place-content

`justify-content`属性是整个内容区域在容器里面的水平位置，`align-content`属性是整个内容区域的垂直位置。

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

这两个属性的写法完全相同，都可以取下面这些值:

+ start: 对齐容器的起始边框。
+ end: 对齐容器的结束边框。
+ center: 容器内部居中。
+ stretch: 项目大小没有指定时，拉伸占据整个网格容器。
+ space-around: 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
+ space-between: 项目与项目的间隔相等，项目与容器边框之间没有间隔。
+ space-evenly: 项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。

`place-content`属性是`align-content`属性和`justify-content`属性的合并简写形式。

```css
.container {
  place-content: <align-content> <justify-content>
}
```

如果省略第二个值，浏览器就会假定第二个值等于第一个值。

### 项目属性

#### grid-column-start / grid-column-end / grid-row-start / grid-row-end / grid-column / grid-row {#grid-column-start}

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

+ `grid-column-start`表示左边框贴紧的垂直网格线
+ `grid-column-end`表示右边框贴紧的垂直网格线
+ `grid-row-start`表示上边框贴紧的水平网格线
+ `grid-row-end`表示下边框贴紧的水平网格线

<preview path="./vue-template/grid/16.vue" />

上面代码指定，1号项目的左边框是第二根垂直网格线，右边框是第四根垂直网格线。但并没有指定上下边框，所以会采用默认位置。而除了1号项目以外，其他项目都没有指定位置，将由浏览器自动布局，这时它们的位置由容器的`grid-auto-flow`属性决定，参考上面的教程，不再赘述。

<preview path="./vue-template/grid/17.vue" />

下面的例子是指定四个边框位置的效果。

这四个属性的值，除了指定为第几个网格线，还可以指定为[网格线的名字](#grid-template-name)。

```css
.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}
```

这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。参考[上面用到的例子](#grid-auto-flow)，表示1号项目的左边框距离右边框跨越2个网格。

```css
.item-1 {
  grid-column-start: span 2;
}
```

::: tip

使用这四个属性，如果产生了项目的重叠，可以使用z-index属性指定项目的重叠顺序。

:::

`grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

```css
.item {
  grid-column: <grid-column-start> / <grid-column-end>;
  grid-row: <grid-row-start> / <grid-row-end>;
}
```

下面是一个例子。

```css
.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

上面代码中，项目item-1占据第一行，从第一根列线到第三根列线。

这两个属性之中，也可以使用span关键字，表示跨越多少个网格。

```css
.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}
```

上面代码中，项目item-1占据的区域，包括第一行 + 第二行、第一列 + 第二列。
斜杠以及后面的部分可以省略，默认跨越一个网格。

```css
.item-1 {
  grid-column: 1;
  grid-row: 1;
}
```

上面代码中，项目item-1占据左上角第一个网格。

#### grid-area {#grid-area}

`grid-area`属性指定项目放在哪一个区域。

<preview path="./vue-template/grid/18.vue" />

上面代码中，1号项目位于e区域。其他项目没有指定，因此默认按顺序自动排列

grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。

```css
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

下面是一个例子，表示`item1`从第一个行第一列开始，到第三行第三列为止，因此是 2 * 2 个单元格。

<preview path="./vue-template/grid/19.vue" />

#### justify-self / align-self / place-self

`justify-self`属性设置单元格内容的水平位置，跟justify-items属性的用法完全一致，但只作用于单个项目。
`align-self`属性设置单元格内容的垂直位置，跟align-items属性的用法完全一致，也是只作用于单个项目。

这两个属性都可以取下面四个值：

+ start：对齐单元格的起始边缘。
+ end：对齐单元格的结束边缘。
+ center：单元格内部居中。
+ stretch：拉伸，占满单元格的整个宽度（默认值）。

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

`place-self`属性是`align-self`属性和`justify-self`属性的合并简写形式。

```css
.item {
  place-self: <align-self> <justify-self>;
}
```

如果省略第二个值，`place-self`属性会认为这两个值相等。
