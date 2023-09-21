---
description: Sass教程
sticky: 2
cover: https://sass-lang.com/assets/img/styleguide/seal-color.png
tags:
  - sass
categories:
  - nodeJs
---
# 使用Sass

::: warning 警告
  本文迁移自 [使用sass](https://singledogno1.github.io/blog/posts/a0cd7745/)，截至本文迁移时，[`node-sass`已弃用](https://github.com/sass/node-sass#node-sass)。推荐使用Dart Sass。小部分语法与原文不同。因此如果文中有执行报错，应该是作者迁移文章时修改文档疏忽导致，请以官方文档为准。
:::

## Sass简介

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量、嵌套、混合、导入等高级功能，这些拓展令 CSS 更加强大与优雅。

## 语法风格

Sass 有两种写法，一种是靠缩进代替花括号代替选择器，用换行代替分号，是一种简写格式，这种格式的文件以`.sass`结尾。另一种写法类似 css 写法，以`.scss`结尾。

::: code-group

```sass [style.sass]
body
  font-size: 14px
  color: #333
```

```scss [style.scss]
body {
  font-size: 14px;
  color: #333;
}
```

:::

以上俩段编译的结果是同样的结果

```css
body {
  font-size: 14px;
  color: #333;
}
```

::: tip
本文均为 scss 语法格式
:::

## Sass 安装

首先需要安装 [NodeJs](https://nodejs.org/en/)，通过命令行安装：

```shell
npm install -g sass
```

## Sass使用

在命令中运行 sass

```shell
sass input.scss output.css
```

命令行监测单个 sass 文件，每次修改自动保存

```shell
sass -w input.scss output.css
```

监视整个文件夹的变化

```shell
sass --watch app/sass:public/stylesheets
```

更多命令通过`sass --help`查看帮助

## 输出格式

Sass 默认的 CSS 输出格式很美观也能清晰反映文档结构，为满足其他需求 Sass 也提供了两种输出格式，分别为

- expanded -- Expanded 输出更像是手写的样式，选择器、属性等各占用一行，属性根据选择器缩进，而选择器不做任何缩进。
- compressed -- Compressed 输出方式删除所有无意义的空格、空白行、以及注释，力求将文件体积压缩到最小，同时也会做出其他调整，比如会自动替换占用空间最小的颜色表达方式。

输出格式可以通过 `:style option` 选项设定，或者在命令行中使用 `--style` 选项。

```shell
sass -w input.scss output.css --style expanded
```

示例

```scss
#menu {
  background: #fff;
  li {
    border: 1px solid solid;
    span {
      color: #333;
      font-size: 14px;
    }
  }
}
```

编译为

::: code-group

```scss [expanded]
#menu {
  background: #fff;
}
#menu li {
  border: 1px solid solid;
}
#menu li span {
  color: #333;
  font-size: 14px;
}
```

```scss [compressed]
#menu{background:#fff}#menu li{border:1px solid solid}#menu li span{color:#333;font-size:14px}
```

:::

## 注释

Sass 支持标准的 CSS 多行注释 `/* */`，以及单行注释 `//`，前者会 被完整输出到编译后的 CSS 文件中，而后者则不会。

## Sass功能扩展

### 嵌套结构

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器。

::: warning
注意不可以无节制地嵌套，会加大浏览器的负担
:::

```scss
#main {
  width: 97%;

  p, div {
    font-size: 2em;
    a { font-weight: bold; }
  }

  pre { font-size: 3em; }
}
```

编译为

```scss
#main {
  width: 97%;
}
#main p, #main div {
  font-size: 2em;
}
#main p a, #main div a {
  font-weight: bold;
}
#main pre {
  font-size: 3em;
}
```

嵌套功能避免了重复输入父选择器，而且令复杂的 CSS 结构更易于管理

### 父选择器

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 hover 样式时，或者当 body 元素有某个 classname 时，可以用 & 代表嵌套规则外层的父选择器。

```scss
.box {
  color: #333;
  &:hover {
    color: red;
  }
  $.active {
    color: red;
  }
}
```

编译为

```css
.box {
  color: #333;
}
.box:hover {
  color: red;
}
.box.active {
  color: red;
}
```

值得注意的有两点:

- 如果包含多层嵌套关系， &会逐层向下传递
- &在编译时会完全解析为外层的父选择器名称，你可以以任何你需要的方式来操作它

```scss
.menu {
  color: #333;
  li {
    &:hover {
      color: red;
    }
  }
  &-item {
    color: blue;
  }
}
```

编译为

```css
.menu {
  color: #333;
}
.menu li:hover {
  color: red;
}
.menu .menu-item {
  color: green;
}
```

### 属性嵌套

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family`, `font-size`, `font-weight` 都以 `font` 作为属性的命名空间。为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中。

```scss
body {
  font: {
    family: 'iconfont';
    size: 20px;
    weight: bold;
  }
}
```

编译为

```css
body {
  font-family: 'iconfont';
  font-size: 20px;
  font-weight: bold;
}
```

## SassScript

Sass在 css 的基础上提供了一些名为 SassScript 的功能，允许使用变量、运算、函数等额外的功能。这也是 Sass 语言最强大的地方。

### 变量

SassScript 最普遍的用法就是变量，变量以`$`开头，赋值方法与 CSS 属性的写法一样

```scss
$width: 20px;
```

变量可以直接使用

```scss
.box {
  width: $width;
}
```

编译为

```css
.box {
  width: 20px;
}
```

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。

```scss
.menu {
  $width: 100px;
  width: $width;
  .menu-item {
    $width: 20px;
    width: $width;
  }
}
```

编译为

```css
.menu {
  width: 100px;
}
.menu .menu-item {
  width: 20px;
}
```

可以通过添加`!global`将局部变量转换为全局变量

### 数据类型

sassScript支持 7 种主要的数据类型:

- 数字 `1, 2, 3px`
- 字符串，有引号字符串与无引号字符串 `"foo", 'bar', baz`
- 颜色 `blue, #04a3f9, rgba(255,0,0,0.5)`
- 布尔型 `true, false`
- 空值 `null`
- 数组 (list)，用空格或逗号作分隔符 `1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object `(key1: value1, key2: value2)`

SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 !important 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串。

### 插值语句 `#{}`

通过 #{} 插值语句可以在选择器或属性名中使用变量,方式**等同于es6语法中的`${}`**

```scss
$name: foo;
$attr: border;
$color: blue;
p.#{$name} {
  #{$attr}-color: #{$color};
}
```

编译为

```css
p.foo {
  border-color: blue;
}
```

使用插值可以避免 Sass 运行运算表达式，直接编译 CSS。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  $width: 20px;
  font: #{$font-size}/#{$line-height};
  width: calc(100% - #{$width});
}
```

编译为

```css
p {
  font: 12px/30px;
  width: calc(100% - 20px);
}
```

### 定义初始值

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}
```

编译为

```css
#main {
  content: "First content";
  new-content: "First time reference"; }
```

### 运算

所有数据类型均支持相等运算 == 或 !=，此外，每种数据类型也有其各自支持的运算方式。

#### 数字运算

SassScript 支持数字的加减乘除、取整等运算 `(+, -, *, /, %)`，如果必要会在不同单位间转换值。

```scss
p {
  width: 1in + 8pt;
}
```

编译为

```css
p {
  width: 1.111in; }
```

关系运算 <, >, <=, >= 也可用于数字运算，相等运算 ==, != 可用于所有数据类型。

##### 除法运算

`/` 在 CSS 中原本起到分隔数字的用途，SassScript 作为 CSS 语言的拓展在支持原本功能的同时也赋予了 `/` 除法运算的功能。也就是说，在 SassScript 中，`/`可以作为分隔符，也可以作为除法运算符。

以下三种情况 `/` 将被视为除法运算符号：

- 如果值，或值的一部分，是变量或者函数的返回值
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分

```scss
p {
  font: 10px/8px;             // css语法，作为分隔符使用
  $width: 1000px;
  width: $width/2;            // 使用了变量，是除法运算
  width: round(1.5)/2;        // 使用了函数，是除法运算
  height: (500px/2);          // 使用了括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加号，是除法运算
}
```

编译为

```css
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; }
```

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#{}` 插值语句将变量包裹。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译为

```css
p {
  font: 12px/30px; }
```

#### 颜色值运算

颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值

```scss
p {
  color: #010203 + #040506;
}
```

计算 `01 + 04 = 05 02 + 05 = 07 03 + 06 = 09`，然后编译为

```css
p {
  color: #050709; }
```

使用 `color functions` 比计算颜色值更方便一些。

数字与颜色值之间也可以进行算数运算，同样也是分段计算的，比如

```scss
p {
  color: #010203 * 2;
}
```

计算 `01 * 2 = 02 02 * 2 = 04 03 * 2 = 06`，然后编译为

```css
p {
  color: #020406; }
```

需要注意的是，如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值。

```scss
p {
  color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
}
```

编译为

```css
p {
  color: rgba(255, 255, 0, 0.75); }
```

颜色值的 alpha channel 可以通过 opacify 或 transparentize 两个函数进行调整。

```scss
$translucent-red: rgba(255, 0, 0, 0.5);
p {
  color: opacify($translucent-red, 0.3);
  background-color: transparentize($translucent-red, 0.25);
}
```

编译为

```css
p {
  color: rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.25); }
```

#### 字符串运算

`+` 可用于连接字符串

```scss
p {
  cursor: e + -resize;
}
```

编译为

```css
p {
  cursor: e-resize; }
```

注意，如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号。

```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```

编译为

```css
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```

运算表达式与其他值连用时，用空格做连接符：

```scss
p {
  margin: 3px + 4px auto;
}
```

编译为

```css
p {
  margin: 7px auto; }
```

在有引号的文本字符串中使用 `#{}` 插值语句可以添加动态的值：

```scss
p:before {
  content: "I ate #{5 + 10} pies!";
}
```

编译为

```css
p:before {
  content: "I ate 15 pies!"; }
```

#### 圆括号运算

圆括号可以用来影响运算的顺序：

```scss
p {
  width: 1em + (2em * 3);
}
```

编译为

```css
p {
  width: 7em; }
```

#### 函数运算

SassScript 定义了多种函数，有些甚至可以通过普通的 CSS 语句调用
<!-- 把下面的函数直接粘贴上来 -->

## @Rules && 指令

Sass 支持所有的 CSS3 @-Rules，以及 Sass 特有的 “指令”（directives）。这一节会详细解释，更多资料请查看 [控制指令](#controlDirectives) 与 [混合指令](#mixinDirectives) 两个部分。

### @import

Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

Sass 在当前地址，或 Rack, Rails, Merb 的 Sass 文件地址寻找 Sass 文件，如果需要设定其他地址，可以用 `:load_paths` 选项，或者在命令行中输入 `--load-path` 命令。

通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件:

- 文件拓展名是 `.css`
- 文件名以 `http://` 开头
- 文件名是 `url()`
- `@import` 包含 `media queries`

如果不在上述情况内，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 `.scss` 或 `.sass` 的文件并将其导入。

```scss
@import "foo.scss";
```

或

```scss
@import "foo";
```

都会导入文件 `foo.scss`，但是

```scss
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

编译为

```css
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

Sass 允许同时导入多个文件，例如同时导入 `rounded-corners` 与 `text-shadow` 两个文件：

```scss
@import "rounded-corners", "text-shadow";
```

导入文件也可以使用 `#{ }` 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 `url()` 导入方式：

```scss
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=\#{$family}");
```

编译为

```css
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

#### 分音

如果需要导入 SCSS 或者 Sass 文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。

例如，将文件命名为 `_colors.scss`，便不会编译 `_colours.css` 文件。

```scss
@import "colors";
```

上面的例子，导入的其实是 `_colors.scss` 文件

注意，不可以同时存在添加下划线与未添加下划线的同名文件，添加下划线的文件将会被忽略。

#### 嵌套 @import

大多数情况下，一般在文件的最外层（不在嵌套规则内）使用 `@import`，其实，也可以将 `@import` 嵌套进 CSS 样式或者 `@media` 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中。

假设 `example.scss` 文件包含以下样式：

```scss
.example {
  color: red;
}
```

然后导入到 `#main` 样式内

```scss
#main {
  @import "example";
}
```

将会被编译为

```scss
#main .example {
  color: red;
}
```

不可以在混合指令 (mixin) 或控制指令 (control directives) 中嵌套 @import。

### @media

Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
```

编译为

```css
.sidebar {
  width: 300px; }
  @media screen and (orientation: landscape) {
    .sidebar {
      width: 500px; } }
```

`@media` 的 queries 允许互相嵌套使用，编译时，Sass 自动添加 `and`

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
```

编译为

```css
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; } }
```

`@media` 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值：

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

编译为

```css
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px; } }
```

### @extend

在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式。假设现在要设计一个普通错误样式与一个严重错误样式，一般会这样写：

```html
<div class="error seriousError">
  Oh no! You've been hacked!
</div>
```

样式如下

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

麻烦的是，这样做必须时刻记住使用 `.seriousError` 时需要参考 `.error` 的样式，带来了很多不便：比如加重维护负担，导致 bug，或者给 HTML 添加无语意的样式。使用 @extend 可以避免上述情况，告诉 Sass 将一个选择器下的所有样式继承给另一个选择器。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

上面代码的意思是将 `.error` 下的所有样式继承给 `.seriousError，border-width: 3px;` 是单独给 `.seriousError` 设定特殊样式，这样，使用 `.seriousError` 的地方可以不再使用 `.error`。

其他使用到 `.error` 的样式也会同样继承给 `.seriousError`，例如，另一个样式 `.error.intrusion` 使用了 `hacked.png` 做背景，`<div class="seriousError intrusion">` 也同样会使用 hacked.png 背景。

```css
.error.intrusion {
  background-image: url("/image/hacked.png");
}
```

#### How it works

`@extend` 的作用是将重复使用的样式 `(.error)` 延伸 `(extend)` 给需要包含这个样式的特殊样式`（.seriousError）`，刚刚的例子：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

编译为

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```

当合并选择器时，`@extend` 会很聪明地避免无谓的重复，`.seriousError.seriousError` 将编译为 `.seriousError`，不能匹配任何元素的选择器（比如 `#main#footer` ）也会删除。

#### 延伸复杂的选择器

Class 选择器并不是唯一可以被延伸 (extend) 的，Sass 允许延伸任何定义给单个元素的选择器，比如 `.special.cool`，`a:hover` 或者 `a.user[href^="http://"]` 等，例如：

```scss
.hoverlink {
  @extend a:hover;
}
```

同 class 元素一样，`a:hover` 的样式将继承给 `.hoverlink`。

```scss
.hoverlink {
  @extend a:hover;
}
a:hover {
  text-decoration: underline;
}
```

编译为

```css
a:hover, .hoverlink {
  text-decoration: underline; }
```

与上面 `.error.intrusion` 的例子一样，所有 `a:hover` 的样式将继承给 `.hoverlink`，包括其他使用到 `a:hover` 的样式，例如：

```scss
.hoverlink {
  @extend a:hover;
}
.comment a.user:hover {
  font-weight: bold;
}
```

编译为

```css
.comment a.user:hover, .comment .user.hoverlink {
  font-weight: bold; }
```

#### 多重延伸

同一个选择器可以延伸给多个选择器，它所包含的属性将继承给所有被延伸的选择器：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
```

编译为

```css
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; }

.seriousError {
  border-width: 3px; }
```

每个 `.seriousError` 将包含 `.error` 与 `.attention` 下的所有样式，这时，后定义的样式享有优先权：`.seriousError` 的背景颜色是 `#ff0` 而不是 `#fdd`，因为 `.attention` 在 `.error` 之后定义。

多重延伸可以使用逗号分隔选择器名，比如 `@extend .error, .attention;` 与 `@extend .error; @extend.attention` 有相同的效果。

#### 继续延伸

当一个选择器延伸给第二个后，可以继续将第二个选择器延伸给第三个，例如：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
```

现在，每个 `.seriousError` 选择器将包含 `.error` 的样式，而 `.criticalError` 不仅包含 `.seriousError` 的样式也会同时包含 `.error` 的所有样式，上面的代码编译为：

```css
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; }

.seriousError, .criticalError {
  border-width: 3px; }

.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; }
```

#### 选择器列

不可以将选择器列（比如 `.foo .bar` 或 `.foo + .bar`）延伸给其他元素，但是，却可以将其他元素延伸给选择器列：

```scss
#fake-links .link {
  @extend a;
}

a {
  color: blue;
  &:hover {
    text-decoration: underline;
  }
}
```

编译为

```css
a, #fake-links .link {
  color: blue; }
  a:hover, #fake-links .link:hover {
    text-decoration: underline; }
```

##### 合并选择器列

有时会遇到复杂的情况，比如选择器列中的某个元素需要延伸给另一个选择器列，这种情况下，两个选择器列需要合并，比如：

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
```

技术上讲能够生成所有匹配条件的结果，但是这样生成的样式表太复杂了，上面这个简单的例子就可能有 10 种结果。所以，Sass 只会编译输出有用的选择器。

当两个列 (sequence) 合并时，如果没有包含相同的选择器，将生成两个新选择器：第一列出现在第二列之前，或者第二列出现在第一列之前：

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
```

编译为

```css
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold; }
```

如果两个列 (sequence) 包含了相同的选择器，相同部分将会合并在一起，其他部分交替输出。在下面的例子里，两个列都包含 `#admin`，输出结果中它们合并在了一起：

```scss
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
```

编译为

```css
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold; }
```

#### @extend-Only 选择器

有时，需要定义一套样式并不是给某个元素用，而是只通过 `@extend` 指令使用，尤其是在制作 `Sass` 样式库的时候，希望 `Sass` 能够忽略用不到的样式。

如果使用普通的 CSS 规则，最后会编译出很多用不到的样式，也容易与其他样式名冲突，所以，Sass 引入了“占位符选择器” (placeholder selectors)，看起来很像普通的 `id` 或 `class` 选择器，只是 `#` 或 `.` 被替换成了 `%`。可以像 `class` 或者 `id` 选择器那样使用，当它们单独使用时，不会被编译到 CSS 文件中。

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

占位符选择器需要通过延伸指令使用，用法与 `class` 或者 `id` 选择器一样，被延伸后，占位符选择器本身不会被编译。

```scss
.notice {
  @extend %extreme;
}
```

编译为

```css
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em; }
```

#### 在指令之延伸

在指令中使用 `@extend` 时（比如在 @media 中）有一些限制：Sass 不可以将 `@media` 层外的 CSS 规则延伸给指令层内的 CSS，这样会生成大量的无用代码。也就是说，如果在 `@media` （或者其他 CSS 指令）中使用 `@extend`，必须延伸给相同指令层中的选择器。

下面的例子是可行的：

```scss
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}
```

但不可以这样：

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```

希望有一天，浏览器可以原生支持 `@extend` 指令，这样就可以在任何指令中使用延伸功能，不再受限制了。

## 控制指令 {#controlDirectives}

SassScript 提供了一些基础的控制指令，比如在满足一定条件时引用样式，或者设定范围重复输出格式。控制指令是一种高级功能，日常编写过程中并不常用到，主要与混合指令 (mixin) 配合使用。

### @if

当 @if 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
```

编译为

```css
p {
  border: 1px solid; }
```

`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明，例如：

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```

编译为

```css
p {
  color: green; }
```

### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。这个指令包含两种格式：`@for $var from <start> through <end>`，或者 `@for $var from <start> to <end>`，区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。另外，`$var` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

编译为

```css
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

### @each

`@each` 指令的格式是 `$var in <list>`, `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

`@each` 将变量 `$var` 作用于值列表中的每一个项目，然后输出结果，例如：

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

编译为

```css
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

### @while

`@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到。例如：

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

编译为

```css
.item-6 {
  width: 12em; }

.item-4 {
  width: 8em; }

.item-2 {
  width: 4em; }
```

## 混合指令 {#mixinDirectives}

混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 `.float-left`。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

### 定义混合指令 `@mixin`

混合指令的用法是在 `@mixin` 后添加名称与样式，比如名为 `large-text` 的混合通过下面的代码定义

```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
}
```

混合指令也可以包含选择器和属性，甚至可以用 `&` 引用父选择器

```scss
@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}
```

### 引用混合指令 `@include`

使用 `@include` 指令引用混合样式

```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

编译为

```scss
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 4px;
  margin-top: 10px; }
```

> 混合指令类似于 javascript 函数,除非引用，否则不会出现在结果中**

也可以不使用父选择器在最外层直接引用混合样式

```scss
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}
@include silly-links;
```

编译为

```css
a {
  color: blue;
  background-color: red; }
```

混合样式中也可以包含其他混合样式，比如

```scss
@mixin compound {
  @include highlighted-background;
  @include header-text;
}
@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
```

混合样式中应该只定义后代选择器，这样可以安全的导入到文件的任何位置。

### 参数

参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
```

编译为

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }
```

混合指令也可以使用给变量赋值的方法给参数设定默认值，然后，当这个指令被引用的时候，如果没有给参数赋值，则自动使用默认值：

```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }
```

编译为

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }

h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed; }
```

### 关键词参数

混合指令也可以使用关键词参数，上面的例子也可以写成：

```scss
p { @include sexy-border($color: blue); }
h1 { @include sexy-border($color: blue, $width: 2in); }
```

虽然不够简明，但是阅读起来会更方便。关键词参数给函数提供了更灵活的接口，以及容易调用的参数。关键词参数可以打乱顺序使用，如果使用默认值也可以省缺，另外，参数名被视为变量名，下划线、短横线可以互换使用。

### 可变参数

有时，不能确定混合指令需要使用多少个参数，比如一个关于 `box-shadow` 的混合指令不能确定有多少个 'shadow' 会被用到。这时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理

```scss
@mixin box-shadow($shadows...) {
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

编译为

```css
.shadows {
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

有时，我们可以确定混合指令中的部分参数，其余的参数数不确定的

```scss
@mixin test($color, $shadows...) {
  a {
    color: $color;
    box-shadow: $shadows;
  }
}
$color: red;
$shadows: 0px 4px 5px #666, 2px 6px 10px #999;
@include test($color, $shadows)
```

编译为

```css
a {
  color: red;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999; }
```

> **一定要注意，可变参数必须放在最后**

### 向混合样式中导入内容

在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 `@content` 标志的地方：

```scss
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url('/logo.gif');
  }
}
```

编译为

```css
* html #logo {
  background-image: url(/logo.gif);
}
```

> 当 @content 在指令中出现过多次或者出现在循环中时，额外的代码将被导入到每一个地方。

## 函数指令

### 自定义函数

Sass 支持自定义函数，并能在任何属性值或 SassScript 中使用：

```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

编译为

```css
#sidebar {
  width: 240px; }
```

与 mixin 相同，也可以传递若干个全局变量给函数作为参数。一个函数可以含有多条语句，需要调用 `@return` 输出结果。

自定义的函数也可以使用关键词参数，上面的例子还可以这样写：

```scss
#sidebar { width: grid-width($n: 5); }
```

建议在自定义函数前添加前缀避免命名冲突，其他人阅读代码时也会知道这不是 Sass 或者 CSS 的自带功能。

### sass 中内置的函数

- 字符串函数
  - unquote
  - quote
  - To-upper-case
  - To-lower-case
  - percentage
  - round
  - ceil
  - floor
  - abs
  - min
  - max
  - random
- 列表函数
  - length  列表数据的长度
  - nth  (10px 20px 30px, 1)
  - join  join(10px 20px, 30px 40px)
  - append  append(10px 20px ,30px)
  - zip  zip(1px 2px 3px,solid dashed dotted,green blue red)
  - index  index(1px solid red, solid)
  - type-of  type-of(100)
  - unit  取单位
  - unitless  判断一个值是否带有单位
  - comparable  判断两个数是否可以进行加减合并
  - if(true,1px,2px)
- Maps函数
  - map-get
  - map-has-key
  - map-keys
  - map-values
  - map-merge
  - map-remove
  - keywords
- 颜色函数
  - rgb
  - rgba
  - red
  - green
  - blue
  - mix  混合两种颜色 第三个参数为第一种颜色的比例  mix(blue,red,20%)
  - lighten  lighten(red, 20%)
  - darken  darken(red,30%)
  - saturate  改变颜色的饱和度 参数单位为百分比 saturate(blue,20%)
  - desaturate
  - adjust-hue  通过调整色相 adjust-hue(blue,30deg)
  - grayscale  直接让饱和度为0  grayscale(blue)
  - alpha  获取透明度
  - opacity  获取透明度
  - rgba
  - fade-in  增加透明度
  - transparentize  减少透明度
  - fade-out  减少透明度

```scss
$map: (
  $key1: value1,
  $key2: value2,
  $key3: value3
);

$map: (
  key1: value1,
  key2: (
    key-1: value-1,
    key-2: value-2,
  ),
key3: value3
);

$theme-color: (
  default: (
      bgcolor: #fff,
      text-color: #444,
      link-color: #39f
  ),
  primary:(
      bgcolor: #000,
      text-color:#fff,
      link-color: #93f
  ),
  negative: (
      bgcolor: #f36,
      text-color: #fefefe,
      link-color: #d4e
  )
);

/* map-get */
$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee
);
.btn-dribble{
  color: map-get($social-colors,facebook);
}
/* 没有值不会报错 */
.btn-weibo{
  font-size: 12px;
  color: map-get($social-colors,weibo);
}

/* map中的容错函数 */
   @function colors($color){
     @if not map-has-key($social-colors,$color){
         @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
     }
     @return map-get($social-colors,$color);
   }
   .btn-dribble {
     color: colors(dribble);
   }

/* each 遍历 map */
@each $name in map-keys($social-colors){
  .btn-#{$name}{
      color: colors($name);
  }
}
@for $i from 1 through length(map-keys($social-colors)){
  .btn-#{nth(map-keys($social-colors),$i)} {
    color: colors(nth(map-keys($social-colors),$i));
  }
}

/*得到所有的值*/
$values: map-values($social-colors);

$color: (
  text: #f36,
  link: #f63,
  border: #ddd,
  backround: #fff
);
$typo:(
  font-size: 12px,
  line-height: 1.6
);
$newcolor: map-merge($color, $typo);

/* 得到新值 */
$map:map-remove($social-colors,dribble);
```

```html
<ul class="swatches red">
  <li></li>
  ...
  <li></li>
</ul>
<ul class="swatches orange">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches yellow">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches green">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches blue">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches purple">
  <li></li>
  …
  <li></li>
</ul>
```

```scss
$redBase: #DC143C;
$orangeBase: saturate(lighten(adjust_hue($redBase, 39), 5), 7);//#f37a16
$yellowBase: saturate(lighten(adjust_hue($redBase, 64), 6), 13);//#fbdc14
$greenBase: desaturate(darken(adjust_hue($redBase, 102), 2), 11);//#73c620
$blueBase: saturate(darken(adjust_hue($redBase, 201), 2), 1);//#12b7d4
$purpleBase: saturate(darken(adjust_hue($redBase, 296), 2), 1);//#a012d4
$blackBase: #777;
$bgc: #fff;

//定义颜色变暗的 mixin
@mixin swatchesDarken($color) {
  @for $i from 1 through 10 {
    $x:$i+11;
    li:nth-child(#{$x}) {
      $n:$i*5;
      $bgc:darken($color,$n); //颜色变暗
      background-color: $bgc;
      &:hover:before { //hover状态显示颜色编号
        content: "#{$bgc}";
        color: lighten($bgc,40);
        font-family: verdana;
        font-size: 8px;
        padding: 2px;
      }
    }
  }
}
//定义颜色变亮的 mixin
@mixin swatchesLighten($color) {
  @for $i from 1 through 10 {
    $x:11-$i;
    li:nth-child(#{$x}) {
      $n:$i*5;
      $bgc:lighten($color,$n);
      background-color: $bgc;
      &:hover:before {
        content: "#{$bgc}";
        color: darken($bgc,40);
        font-family: verdana;
        font-size: 8px;
        padding: 2px;
      }
    }
  }
}

.swatches li {
  width: 4.7619047619%;
  float: left;
  height: 60px;
  list-style: none outside none;
}

ul.red {
  @include swatchesLighten($redBase);
  @include swatchesDarken($redBase);
  li:nth-child(11) {
    background-color: $redBase;
  }
}

ul.orange {
  @include swatchesLighten($orangeBase);
  @include swatchesDarken($orangeBase);
  li:nth-child(11) {
    background-color: $orangeBase;
  }
}

ul.yellow {
  @include swatchesLighten($yellowBase);
  @include swatchesDarken($yellowBase);
  li:nth-child(11) {
    background-color: $yellowBase;
  }
}

ul.green {
  @include swatchesLighten($greenBase);
  @include swatchesDarken($greenBase);
  li:nth-child(11) {
    background-color: $greenBase;
  }
}

ul.blue {
  @include swatchesLighten($blueBase);
  @include swatchesDarken($blueBase);
  li:nth-child(11) {
    background-color: $blueBase;
  }
}

ul.purple {
  @include swatchesLighten($purpleBase);
  @include swatchesDarken($purpleBase);
  li:nth-child(11) {
    background-color: $purpleBase;
  }
}

ul.black {
  @include swatchesLighten($blackBase);
  @include swatchesDarken($blackBase);
  li:nth-child(11) {
    background-color: $blackBase;
  }
}
```

## 最后附上一个rem的例子

```scss
//以750px( iphone6 )为基准定义其他分辨率下的rem
@mixin useRem($size){
  $device-list : 320px, 375px , 414px;
  html{
    @each $device in $device-list{
      @media screen and (min-width: $device){
        font-size: 100px * ($device/$size);
      }
    }
  }
}
@include useRem(750px);
```
