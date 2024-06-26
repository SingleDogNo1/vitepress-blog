<script setup lang="ts">
import { provide, toRef } from 'vue'
import SplitPane from './SplitPane.vue'
import Editor from './editor/Editor.vue'
import Output from './output/Output.vue'
import type { SFCOptions, Store } from './store'
import { ReplStore } from './store'

export interface Props {
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: string
  ssr?: boolean
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  clearConsole: true,
  ssr: false,
  previewOptions: () => ({
    headHTML: '',
    bodyHTML: '',
    customCode: {
      importCode: '',
      useCode: ''
    }
  })
})

// eslint-disable-next-line vue/no-setup-props-destructure
const { store } = props
// eslint-disable-next-line no-multi-assign
const sfcOptions = (store.options = props.sfcOptions || {})
if (!sfcOptions.script) sfcOptions.script = {}

sfcOptions.script.fs = {
  fileExists(file: string) {
    if (file.startsWith('/')) file = file.slice(1)
    return !!store.state.files[file]
  },
  readFile(file: string) {
    if (file.startsWith('/')) file = file.slice(1)
    return store.state.files[file].code
  }
}

store.init()

provide('store', store)
provide('autoresize', props.autoResize)
provide('import-map', toRef(props, 'showImportMap'))
provide('clear-console', toRef(props, 'clearConsole'))
provide('preview-options', props.previewOptions)
</script>

<template>
  <div class="vue-repl">
    <SplitPane :layout="layout">
      <template #left>
        <Editor />
      </template>
      <template #right>
        <Output :show-compile-output="props.showCompileOutput" :ssr="!!props.ssr" />
      </template>
    </SplitPane>
  </div>
</template>

<style scoped>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

:deep(button) {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
