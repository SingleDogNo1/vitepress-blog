# 仓库介绍

这是一个 monorepo 仓库，目前有如下三个部分

* [blogpress](./packages/blogpress/)：博客内容本身
* [theme](./packages/theme/)：博客分离出的通用VitePress主题
* 预览vue代码块功能，分两小部分
  * [markdown-preview-component](./packages/markdownPreviewComponent/)：vue组件定义
  * [markdown-preview-plugin](./packages/markdownPreviewPlugin/)：rollup 解析 vue 组件的插件

## 运行本项目

博客基于[vitepress](https://vitepress.vuejs.org/)构建

① 先安装 `pnpm`

```sh
npm i -g pnpm
# 安装依赖
pnpm install
```

② 构建主题包

```sh
pnpm build:theme
```

③ 构建vue代码预览功能

```sh
pnpm build: build:markdown-preview
```

④ 运行

```sh
# 运行博客
pnpm run dev
```

## 注意

修改 `theme` 或 `markdown-preview`原文件后，需要重新打包才能生效

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

- [ ] [路由重定向](https://vitepress.dev/guide/routing#route-rewrites)有问题？打包后`post`路径仍然存在
- [ ] markdown-preview 插件解析会干扰frontMatter
