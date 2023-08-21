import { getThemeConfig, defineConfig } from '@singledog/theme/node'

const blogTheme = getThemeConfig({
  author: 'singleDogNo_1',
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
    showSelf: true,
    nextText: '下一页',
    style: 'sidebar'
  },
  authorList: [
    {
      nickname: 'singleDogNo_1',
      // TODO: 最后生成的地址
      url: 'https:///aboutme.html',
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
  },
  rewrites: {
    '_posts/:pkg/(.*).md': ':pkg/(.*).md'
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    lastUpdatedText: '上次更新于',

    logo: '/logo.svg',
    editLink: {
      pattern:
        'https://github.com/lost-dream/vitepress-blog/tree/master/packages/blogpress/:path',
      text: '去 GitHub 上编辑内容'
    },
    nav: [
      {
        text: '关于我',
        link: '/aboutme'
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lost-dream/vitepress-blog' }
    ]
  }
})
