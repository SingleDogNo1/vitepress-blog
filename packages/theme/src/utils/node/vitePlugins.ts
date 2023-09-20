import type { SiteConfig } from 'vitepress'

export function getVitePlugins() {
  const plugins: any[] = []

  // Build完后运行的一系列列方法
  const buildEndFn: any[] = []
  // 执行自定义的 buildEnd 钩子
  plugins.push(inlineBuildEndPlugin(buildEndFn))
  return plugins
}

export function registerVitePlugins(vpCfg: any, plugins: any[]) {
  vpCfg.vite = {
    plugins
  }
}

export function inlineBuildEndPlugin(buildEndFn: any[]) {
  let rewrite = false
  return {
    name: '@singledog/theme-plugin-build-end',
    enforce: 'pre',
    configResolved(config: any) {
      // 避免重复定义
      if (rewrite) {
        return
      }
      const vitepressConfig: SiteConfig = config.vitepress
      if (!vitepressConfig) {
        return
      }
      rewrite = true
      // 添加 自定义 vitepress build 的钩子
      const selfBuildEnd = vitepressConfig.buildEnd
      vitepressConfig.buildEnd = (siteCfg) => {
        selfBuildEnd?.(siteCfg)
        buildEndFn.filter((fn) => typeof fn === 'function').forEach((fn) => fn(siteCfg))
      }
    }
  }
}
