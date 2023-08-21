# 仓库介绍

这是一个 monorepo 仓库，目前有如下两个部分

* [blogpress](./packages/blogpress/)：博客内容本身
* [theme](./packages/theme/)：博客分离出的通用VitePress主题

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
pnpm build:theme-only
```

③ 运行

```sh
# 运行博客
pnpm dev
```

## TODO

- [ ] [路由重定向](https://vitepress.dev/guide/routing#route-rewrites)有问题？打包后`post`路径仍然存在
