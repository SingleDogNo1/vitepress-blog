# vitepress-demo-preview

用于在静态文档中编译预览`vue SFC`代码示例，`element-ui`风格

## Packages

|                           package                           |       description       |
| :---------------------------------------------------------: | :---------------------: |
| [@singledog/markdown-preview-component](packages/component) |       vue模班语法       |
|    [@singledog/markdown-preview-plugin](packages/plugin)    | rollup插件，解析Vue SFC |

## Props

|      prop      | description |
| :------------: | :---------: |
| path(required) |    path     |
|     title      |    title    |
|  description   | description |

## Usage

首先`.vitepress/theme/index.ts`插入配置，参考[自定义主题](https://vitepress.dev/guide/custom-theme)

```ts
import PreviewContainer from '@singledog/markdown-preview-component'
import '@singledog/markdown-preview-component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', PreviewContainer)
  }
}
```

然后`.vitepress/config.ts`插入配置

```ts
import { defineConfig } from 'vitepress'
import { componentPreview } from '@singledog/markdown-preview-plugin'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(componentPreview)
    }
  }
})
```

## 语法

```md
<preview path="./xxx/xx.vue" title="title" description="description" />
```
