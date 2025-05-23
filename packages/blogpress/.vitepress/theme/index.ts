import BlogTheme, { TimelinePage } from '@singledog/theme'
import './theme.scss'
// 全局组件
import Playground from '@singledog/vue-preview-plugin/components/index.vue'
import HighlightText from './src/components/highlightText.vue'

export default {
  ...BlogTheme,
  enhanceApp: ({ app }) => {
    // 高亮重要信息组件
    app.component('HighlightText', HighlightText)
    // 时间轴组件
    app.component('TimelinePage', TimelinePage)
    // vue代码块预览组件
    app.component('VuePlayground', Playground)
  }
}
