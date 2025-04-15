# @singledog/vue-preview-plugin

## config

```js
// .vitepress/config.ts
import { VueReplMdPlugin } from '@singledog/vue-preview-plugin';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(VueReplMdPlugin)
    }
  },
})
```

```js
// .vitepress/theme/index.ts
import Playground from 'vitepress-plugin-vue-repl/components/index.vue'

export default {
    // ...
    enhanceApp({ app }) {
      app.component('VuePlayground', Playground);
    },
}
```

## 普通使用

使用`playground`标签包裹代码，且代码块中定义为`vue`语言

:::playground

```vue
<template>
  test
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
```

:::

## 编辑器配置

在`playground`标签后添加配置的代码编辑器，支持

+ Monaco
+ CodeMirror

:::playground Monaco

```vue
<template>
  test
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
```

:::

## Vue Repl 配置

在`vue`代码块之后增加`json`，语法为

```json
{
  "imports": {
    "xxx": "xxx cdn url"
  },
  "editorConfig": {
    // vue repl 编辑器配置 https://github.com/vuejs/repl/blob/main/src/Repl.vue#L14
  }
}
```

示例:

:::playground Monaco

```vue
<template>
  test
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
```

```json
{
  "imports": {
    "lodash": "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js"
  },
  "editorConfig": {
    "theme": "dark",
  }
}

:::
