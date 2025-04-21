import MarkdownItContainer from 'markdown-it-container';
export function VueReplMdPlugin(md: markdownit) {
  const defaultRender = md.renderer.rules.fence;
  const pattern = /^playground\s*(CodeMirror|Monaco)?\s*$/i;
  md.use(MarkdownItContainer, 'playground', {
    validate: function (params: string) {
      return params.trim().match(pattern);
    },
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        const editor = tokens[idx].info.toLowerCase().indexOf('monaco') > -1 ? 'Monaco' : 'CodeMirror';
        const playgroundBlocks = tokens.slice(idx)
        const [playgroundStartIndex, playgroundEndIndex] = [
          playgroundBlocks.findIndex((item) => item.type === 'container_playground_open'),
          playgroundBlocks.findIndex((item) => item.type === 'container_playground_close')
        ]
        const playgroundCode = playgroundBlocks.slice(playgroundStartIndex + 1, playgroundEndIndex)
        const reg = /^\w+./i // 匹配以字母开头的字符串, 如: vue、json、vue 1.vue ...
        const vueCodeArr = playgroundCode.filter(e => reg.test(e.info))
        const vueCode = vueCodeArr.reduce((res, cur, index) => {
          let key = cur.info.replace(/^\w+\s/, '')
          // 如果是第一个块, 且没有指定文件名, 则默认是 App.vue
          if (index === 0 && !key.includes('.')) {
            key = 'App.vue'
          }
          // 添加所有名称不是json的块到代码块, json有特殊意义
          if (key !== 'json') {
            res[key] = cur.content
          }
          return res
        }, {})

        const jsonCode = playgroundBlocks.find(e => e.info === 'json') || '';
        return `<VuePlayground editor="${editor}" config="${encodeURIComponent(jsonCode.content)
          }">${encodeURIComponent(JSON.stringify(vueCode))}\n`;
      } else {
        return '</VuePlayground>\n';
      }
    }
  })

  md.renderer.rules.fence = (tokens: any[], idx: number, options: markdownit.Options, env: any, self: any) => {
    const token = tokens[idx];
    const prevToken = tokens[idx - 1];
    const inPlayground = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^playground\s*(.*)$/);
    // 当前token是 ```vue 并且 在 playground 块中, 不去渲染内容
    if (token.info === 'vue' && inPlayground) {
      return '';
    }
    if (token.info === 'json' && inPlayground) {
      return '';
    }
    return defaultRender!(tokens, idx, options, env, self);
  };
}
