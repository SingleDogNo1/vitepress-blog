import type { ElButton } from 'element-plus'
import type { DefaultTheme } from 'vitepress'
import type { GiscusProps } from '@giscus/vue'

export namespace BlogPopover {
  export interface Title {
    type: 'title'
    content: string
    style?: string
  }

  export interface Text {
    type: 'text'
    content: string
    style?: string
  }

  export interface Image {
    type: 'image'
    src: string
    style?: string
  }

  export interface Button {
    type: 'button'
    link: string
    content: string
    style?: string
    props?: InstanceType<typeof ElButton>['$props']
  }

  export type Value = Title | Text | Image | Button
}

export type ThemeableImage =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string }

export namespace Theme {
  export interface PageMeta {
    title: string
    date: string
    tag?: string[]
    description?: string
    descriptionHTML?: string
    cover?: string
    hiddenCover?: boolean
    readingTime?: boolean
    sticky?: number
    author?: string
    hidden?: boolean
    layout?: string
    categories: string[]
    tags: string[]
    top?: number
    recommend?: number | false
    /**
     * TODO: 待开发
     * 时间线
     */
    timeline: string
    /**
     * TODO: 待开发
     * 专栏&合集
     */
    album: string
    // 是否发布
    publish?: boolean
  }
  export interface PageData {
    route: string
    meta: PageMeta
  }
  export interface activeTag {
    label: string
    type: string
  }

  export interface HotArticle {
    title?: string
    pageSize?: number
    nextText?: string
    empty?: string | boolean
  }
  export interface RecommendArticle {
    title?: string
    pageSize?: number
    nextText?: string
    /**
     * 是否展示当前正在浏览的文章在左侧
     * @default true
     */
    showSelf?: boolean
    filter?: (page: Theme.PageData) => boolean
    empty?: string | boolean
    /**
     * 设置推荐文章的展示风格
     * @default 'sidebar'
     */
    style?: 'card' | 'sidebar'
  }

  export interface HomeBlog {
    name?: string
    motto?: string
    inspiring?: string | string[]
    inspiringTimeout?: number
    pageSize?: number
  }

  export interface ArticleConfig {
    readingTime?: boolean
    hiddenCover?: boolean
  }

  export interface FriendLink {
    nickname: string
    des: string
    url: string
    avatar: ThemeableImage
  }

  export interface UserWork {
    title: string
    description: string
    time:
    | string
    | {
      start: string
      end?: string
      lastupdate?: string
    }
    status?: {
      text: string
      type?: 'tip' | 'warning' | 'danger'
    }
    url?: string
    github?:
    | string
    | {
      owner: string
      repo: string
      branch?: string
      path?: string
    }
    cover?:
    | string
    | string[]
    | {
      urls: string[]
      layout?: 'swiper' | 'list'
    }
    links?: {
      title: string
      url: string
    }[]
    tags?: string[]
    top?: number
  }

  export interface UserWorks {
    title: string
    description?: string
    topTitle?: string
    list: UserWork[]
  }
  export interface BlogConfig {
    blog?: false
    pagesData: PageData[]
    srcDir?: string
    author?: string
    hotArticle?: HotArticle
    home?: HomeBlog

    /**
     * 配置评论
     * power by https://giscus.app/zh-CN
     */
    comment?: GiscusProps | false
    /**
     * 阅读文章左侧的推荐文章（替代默认的sidebar）
     */
    recommend?: RecommendArticle | false
    article?: ArticleConfig
    friend?: FriendLink[]
    authorList?: Omit<FriendLink, 'avatar'>[]
    works?: UserWorks
    /**
     * https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
     * @default true
     */
    mermaid?: any
    /**
     * 设置解析 frontmatter 里 date 的时区
     * @default 8 => 'UTC+8'
     * */
    timeZone?: number
  }

  export interface Config extends DefaultTheme.Config {
    blog?: BlogConfig
  }
}
