import { MermaidPluginConfig, MermaidPluginOptions } from "./src/mermaid-plugin";

declare module "vitepress" {
  interface UserConfig {
    mermaid?: Partial<MermaidPluginOptions>;
    mermaidPlugin?: MermaidPluginConfig;
  }
}
