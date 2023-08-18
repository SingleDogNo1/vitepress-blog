import { EnhanceAppContext } from 'vitepress'
import BlogTheme from '@singledog/theme'
import './theme.css'
// 全局组件
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import redirectBtn from './src/components/redirectBtn.vue'
import Solve from './src/components/solve.vue'

const inBrowser = typeof window !== 'undefined'

export default {
  ...BlogTheme,
  enhanceApp: (ctx: EnhanceAppContext) => {
    const { app } = ctx
    enhanceAppWithTabs(app)
    app.component('redirectBtn', redirectBtn)
    app.component('solve', Solve)

    if (inBrowser) {
      //  添加重定向逻辑，兼容旧版博客的分类和标签逻辑
      ctx.router.onBeforeRouteChange = (to) => {
        const url = new URL(to)
        const pattern = /(categories|tag)\/(.*)\/$/
        if (pattern.test(url.pathname)) {
          const tagName = url.pathname.match(pattern)?.[2]
          if (tagName) {
            window.location.replace(
              `${window.location.origin}${ctx.router.route.path}?tag=${tagName}`
            )
          }
        }
      }
    }
  }
}
