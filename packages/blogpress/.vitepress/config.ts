import { VueReplMdPlugin } from '@singledog/vue-preview-plugin'
import { getThemeConfig, defineConfig } from '@singledog/theme/node'

// 博客部署地址
const baseUrl = 'https://zcm-blog.vercel.app/'

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
      url: `${baseUrl}aboutme.html`,
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
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['script', { src: '/live2d-widget/autoload.js' }]
  ],
  vite: {
    server: {
      port: 4000,
      host: '0.0.0.0'
    }
  },
  markdown: {
    config: (md) => {
      md.use(VueReplMdPlugin)
    }
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    lastUpdatedText: '上次更新于',
    logo: '/logo.svg',
    editLink: {
      pattern: 'https://github.com/SingleDogNo1/vitepress-blog/tree/main/packages/blogpress/:path',
      text: '去 GitHub 上编辑内容'
    },
    nav: [
      {
        text: '归档',
        link: '/timeline'
      },
      {
        text: '关于我',
        link: '/aboutme'
      }
    ],
    socialLinks: [
      {icon: 'github', link: 'https://github.com/SingleDogNo1/vitepress-blog'}
    ]
  },
  rewrites: {
    // #BUG: rewrites本地使用正常，但打包后无法使用。待官方解决。issue: https://github.com/vuejs/vitepress/issues/3062
    // 'posts/:pkg.md': ':pkg/index.md',
    // 'posts/:pkg/(.*)': ':pkg/(.*)'
  }
})
