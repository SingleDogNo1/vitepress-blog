import BlogTheme from '@singledog/theme'
import './theme.scss'
// 全局组件
import PreviewContainer from '@singledog/markdown-preview-component'
import HighlightText from './src/components/highlightText.vue'

import '@singledog/markdown-preview-component/dist/style.css'

export default {
  ...BlogTheme,
  enhanceApp: ({ app }) => {
    // 高亮重要信息组件
    app.component('HighlightText', HighlightText)
    // vue代码块预览组件
    app.component('demo-preview', PreviewContainer)
  }
}
