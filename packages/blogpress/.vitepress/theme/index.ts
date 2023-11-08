import BlogTheme from '@singledog/theme'
import './theme.scss'
// 全局组件
import { VuePreview } from '@singledog/vue-preview-plugin'
import HighlightText from './src/components/highlightText.vue'
import '@singledog/vue-preview-plugin/style.css'

export default {
  ...BlogTheme,
  enhanceApp: ({ app }) => {
    // 高亮重要信息组件
    app.component('HighlightText', HighlightText)
    // vue代码块预览组件
    app.component('VuePreview', VuePreview)
  }
}
