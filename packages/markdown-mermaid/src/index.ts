import type { UserConfig } from "vitepress";
import { MermaidMarkdown } from "./mermaid-markdown";
import { MermaidPlugin } from "./mermaid-plugin";

export { MermaidMarkdown } from "./mermaid-markdown";
export { MermaidPlugin } from "./mermaid-plugin";

export { UserConfig };


export const withMermaid = (config: UserConfig) => {
  if (!config.markdown) config.markdown = {};
  const markdownConfigOriginal = config.markdown.config || (() => { });
  config.markdown.config = (...args) => {
    MermaidMarkdown(...args, config.mermaidPlugin);
    markdownConfigOriginal(...args);
  };

  if (!config.vite) config.vite = {};
  if (!config.vite.plugins) config.vite.plugins = [];
  // @ts-expect-error
  config.vite.plugins.push(MermaidPlugin(config.mermaid));
  if (!config.vite.optimizeDeps) config.vite.optimizeDeps = {};
  if (!config.vite.optimizeDeps.include) config.vite.optimizeDeps.include = [];

  config.vite.optimizeDeps.include = [
    ...config.vite.optimizeDeps.include,
  ];
  if (!config.vite.resolve) config.vite.resolve = {};

  const mermaidPluginAlias = {
    "dayjs/plugin/advancedFormat.js": "dayjs/esm/plugin/advancedFormat",
    "dayjs/plugin/customParseFormat.js": "dayjs/esm/plugin/customParseFormat",
    "dayjs/plugin/isoWeek.js": "dayjs/esm/plugin/isoWeek",
    "cytoscape/dist/cytoscape.umd.js": "cytoscape/dist/cytoscape.esm.js",
  };

  if (!config.vite.resolve.alias)
    config.vite.resolve.alias = mermaidPluginAlias;
  else if (Array.isArray(config.vite.resolve.alias)) {
    config.vite.resolve.alias = [
      ...config.vite.resolve.alias,
      ...Object.entries(mermaidPluginAlias).map(([find, replacement]) => ({
        find,
        replacement,
      })),
    ];
  } else {
    config.vite.resolve.alias = {
      ...config.vite.resolve.alias,
      ...mermaidPluginAlias,
    };
  }

  return config;
};