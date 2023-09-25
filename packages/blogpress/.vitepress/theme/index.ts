import { EnhanceAppContext } from 'vitepress'
import BlogTheme from '@singledog/theme'
import './theme.scss'
// 全局组件
import HighlightText from './src/components/highlightText.vue'

export default {
  ...BlogTheme,
  enhanceApp: (ctx: EnhanceAppContext) => {
    const { app } = ctx
    app.component('HighlightText', HighlightText)
  }
}
