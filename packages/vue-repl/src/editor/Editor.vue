<script setup lang="ts">
import { computed, inject } from 'vue'
import CodeMirror from '../codemirror/CodeMirror.vue'
import Message from '../Message.vue'
import { debounce } from '../utils'
import type { Store } from '../store'
import FileSelector from './FileSelector.vue'

const store = inject('store') as Store

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

const activeMode = computed(() => {
  const { filename } = store.state.activeFile

  if (filename.endsWith('.vue') || filename.endsWith('.html')) {
    return 'vue'
  }
  if (filename.endsWith('.css')) {
    return 'css'
  }
  return 'javascript'
})
</script>

<template>
  <FileSelector />
  <div class="editor-container">
    <CodeMirror :value="store.state.activeFile.code" :mode="activeMode" @change="onChange" />
    <Message :err="store.state.errors[0]" />
  </div>
</template>

<style scoped>
.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
