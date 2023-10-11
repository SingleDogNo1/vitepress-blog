<script setup lang="ts">
import { inject, onMounted, ref, watchEffect } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { Compartment, EditorState } from '@codemirror/state'
import { vue } from '@codemirror/lang-vue'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import type { ViewUpdate } from '@codemirror/view'
import { keymap } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { indentLess, insertTab } from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { debounce } from '../utils'

export interface Props {
  mode?: string
  value?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vue',
  value: '',
  readonly: false
})

const emit = defineEmits<(e: 'change', value: string) => void>()

const el = ref()
const needAutoResize = inject('autoresize')

onMounted(() => {
  const language = new Compartment()
  const readOnly = new Compartment()

  const state = EditorState.create({
    extensions: [
      basicSetup,
      language.of(
        vue({
          base: html({
            matchClosingTags: true,
            autoCloseTags: true
          })
        })
      ),
      EditorState.tabSize.of(2),
      EditorView.updateListener.of((update: ViewUpdate) => {
        if (update.docChanged) emit('change', update.state.doc.toString())
      }),
      oneDark,
      readOnly.of(EditorState.readOnly.of(!!props.readonly)),
      keymap.of([{ key: 'Tab', run: insertTab, shift: indentLess }])
    ]
  })

  const editor = new EditorView({
    state,
    parent: el.value
  })

  watchEffect(() => {
    const cur = editor.state.doc.toString()
    if (props.value !== cur)
      editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: props.value } })
  })

  watchEffect(() => {
    if (props.mode === 'javascript') {
      editor.dispatch({ effects: language.reconfigure(javascript()) })
    } else if (props.mode === 'css') {
      editor.dispatch({ effects: language.reconfigure(css()) })
    } else {
      editor.dispatch({
        effects: language.reconfigure(
          vue({
            base: html({
              matchClosingTags: true,
              autoCloseTags: true
            })
          })
        )
      })
    }
  })

  watchEffect(() => {
    editor.dispatch({ effects: readOnly.reconfigure(EditorState.readOnly.of(!!props.readonly)) })
  })

  setTimeout(() => {
    editor.requestMeasure()
  }, 50)

  if (needAutoResize) {
    window.addEventListener(
      'resize',
      debounce(() => {
        editor.requestMeasure()
      })
    )
  }
})
</script>

<template>
  <div ref="el" class="editor" />
</template>

<style>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #282c34;
}
</style>
