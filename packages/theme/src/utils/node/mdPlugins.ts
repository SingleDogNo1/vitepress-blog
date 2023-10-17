/* eslint-disable global-require */
import type { UserConfig } from 'vitepress'
import { aliasObjectToArray } from './index'
import type { Theme } from '../../composables/config/index'
import { MermaidMarkdown } from 'vitepress-plugin-mermaid'

export function getMarkdownPlugins(cfg?: Partial<Theme.BlogConfig>) {
  const markdownPlugin: any[] = []

  // 添加mermaid markdown 插件
  if (cfg) {
    cfg.mermaid = cfg?.mermaid ?? true
    if (cfg?.mermaid !== false) {
      markdownPlugin.push(MermaidMarkdown)
    }
  }
  return markdownPlugin
}

export function registerMdPlugins(vpCfg: any, plugins: any[]) {
  if (plugins.length) {
    vpCfg.markdown = {
      config(...rest: any[]) {
        plugins.forEach((plugin) => {
          plugin?.(...rest)
        })
      }
    }
  }
}

/**
 * 流程图支持，配置mermaid
 */
export function assignMermaid(config: any) {
  if (!config?.mermaid) return

  if (!config.vite) config.vite = {}
  if (!config.vite.plugins) config.vite.plugins = []
  const { MermaidPlugin } = require('vitepress-plugin-mermaid')
  config.vite.plugins.push(MermaidPlugin(config.mermaid))
  if (!config.vite.resolve) config.vite.resolve = {}
  if (!config.vite.resolve.alias) config.vite.resolve.alias = {}

  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
      'cytoscape/dist/cytoscape.umd.js': 'cytoscape/dist/cytoscape.esm.js',
      mermaid: 'mermaid/dist/mermaid.esm.mjs'
    }),
    { find: /^dayjs\/(.*).js/, replacement: 'dayjs/esm/$1' }
  ]
}

export function wrapperCfgWithMermaid(config: UserConfig<Theme.Config>): any {
  // @ts-ignore
  const extendThemeConfig = (config.extends?.themeConfig?.blog || {}) as Theme.BlogConfig

  // 开关支持Mermaid
  const resultConfig =
    extendThemeConfig.mermaid === false
      ? config
      : {
          ...config,
          mermaid: extendThemeConfig.mermaid === true ? {} : extendThemeConfig.mermaid
        }
  assignMermaid(resultConfig)
  return resultConfig
}

export function supportRunExtendsPlugin(config: UserConfig<Theme.Config>) {
  // 处理markdown插件
  if (!config.markdown) config.markdown = {}
  // 支持运行继承的markdown插件
  // @ts-ignore
  if (config.extends?.markdown?.config) {
    const markdownExtendsConfigOriginal =
      // @ts-ignore
      config.extends?.markdown?.config
    const selfMarkdownConfig = config.markdown?.config

    config.markdown.config = (...rest: any[]) => {
      // @ts-ignore
      selfMarkdownConfig?.(...rest)
      markdownExtendsConfigOriginal?.(...rest)
    }
  }
}
