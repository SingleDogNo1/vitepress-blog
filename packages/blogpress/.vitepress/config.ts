import { getThemeConfig, defineConfig } from '@singledog/theme/node'
import { componentPreview } from '@singledog/markdown-preview-plugin'

const blogTheme = getThemeConfig({
  author: 'singleDogNo_1',
  mermaid: true,
  comment: {
    repo: 'SingleDogNo1/vitepress-blog',
    repoId: 'R_kgDOKIcADg',
    category: 'Announcements',
    categoryId: 'DIC_kwDOKIcADs4CYrfF',
    inputPosition: 'bottom',
    mapping: 'pathname',
    lang: 'zh-CN'
  },
  recommend: {
    showSelf: false,
    nextText: '下一页',
    style: 'sidebar'
  },
  authorList: [
    {
      nickname: 'singleDogNo_1',
      url: 'https://zcm-blog.vercel.app/aboutme.html',
      // eslint-disable-next-line
      des: "singleDogNo_1, can't find object"
    }
  ]
})

export default defineConfig({
  extends: blogTheme,
  ignoreDeadLinks: true,
  lang: 'zh-cn',
  title: '赵晨敏',
  description: '开发随笔',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  vite: {
    server: {
      port: 4000,
      host: '0.0.0.0'
    }
    // plugins: [MarkdownPreview()]
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep'
    },
    lastUpdatedText: '上次更新于',
    logo: '/logo.svg',
    editLink: {
      pattern: 'https://github.com/SingleDogNo1/vitepress-blog/tree/main/packages/blogpress/:path',
      text: '去 GitHub 上编辑内容'
    },
    nav: [
      {
        text: '关于我',
        link: '/aboutme'
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/SingleDogNo1/vitepress-blog' }]
  },
  markdown: {
    config(md) {
      md.use(componentPreview)
    }
  }
  // rewrites: {
  //   'posts/:pkg/(.*).md': ':pkg/(.*).md'
  // }
})
