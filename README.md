# 仓库介绍

这是一个 monorepo 仓库，使用`pnpm + turbo`构建。目前有如下四个部分

* [blog](./packages/blog/)：博客内容本身
* [theme](./packages/theme/)：博客分离出的通用VitePress主题
* `markdown-preview`：预览vue代码块功能，分两小部分
  * [vue-preview-plugin](./packages/vuePreviewPlugin/)：rollup 解析 vue 组件的插件，并提供实时编辑功能
  * [vue-repl](./packages/vue-repl/)：[vue-repl](https://github.com/vuejs/repl) 官方解析器源码，部分地方进行了定制化修改以保证`vue-preview-plugin`插件实时编辑后重新渲染
* [live2d-widget](./packages/live2dWidght/)：看板娘插件

## 运行本项目

博客基于[vitepress](https://vitepress.vuejs.org/)构建

① 先安装 `pnpm`

```sh
npm i -g pnpm
```

② 安装依赖

```sh
pnpm bootstrap
```

④ 打包

```sh
pnpm build
```

⑤ 本地运行

```sh
pnpm dev
```

⑥ 本地运行打包后文件

```sh
pnpm serve
```

## 注意

`blog`模块以其他模块为依赖，因此本地运行前需要先打包其他模块。并且在修改`除blog模块外任意模块原文件`后，都需要重新构建才能生效。

## PageMeta

|      props      |     type     |                       描述                       |
| :-------------: | :----------: | :----------------------------------------------: |
|      tags       |   string[]   |                     文章标签                     |
|   description   |    string    |                     文章简述                     |
| descriptionHTML |    string    |               文章简述（HTML格式）               |
|      cover      |    string    |                   首页文章配图                   |
|   hiddenCover   |   boolean    |                   是否隐藏配图                   |
|     hidden      |   boolean    |                是否在文章列表显示                |
|   categories    |   string[]   |                     文章分类                     |
|       top       |    number    |          是否置顶显示（数字越大越靠前）          |
|    recommend    | number/false | 是否作为文章页左侧推荐文章推荐（数字越大越靠前） |
|     sticky      |    number    |      首页右侧精选文章排序（数字越大越靠前）      |
|   readingTime   |   boolean    |               是否显示预计阅读时间               |

## TODO

* [ ] [路由重定向问题](https://github.com/vuejs/vitepress/issues/3062)有问题，待官方修复
* [x] markdown-preview 插件解析会干扰frontMatter
