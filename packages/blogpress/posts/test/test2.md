---
sticky: 999
recommend: -999
---

# test2

:::tabs
== tab a
a content
== tab b
b content
:::

:::tabs
== tab a
a content 2
== tab b
b content 2
:::


::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::