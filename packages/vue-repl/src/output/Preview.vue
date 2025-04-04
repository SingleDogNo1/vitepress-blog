<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref, onMounted, onUnmounted, watchEffect, watch, WatchStopHandle, inject, Ref } from 'vue'
import Message from '../Message.vue'
import srcdoc from './srcdoc.html?raw'
import { PreviewProxy } from './PreviewProxy'
import { compileModulesForPreview } from './moduleCompiler'
import { Store, importMapFile } from '../store'
import type { Props as ReplProps } from '../Repl.vue'

defineOptions({ name: 'VuePreviewComponent' })

export interface Props {
  show?: boolean
  ssr?: boolean
  bodyStyle?: Partial<CSSStyleDeclaration>
  appStyle?: Partial<CSSStyleDeclaration>
}

type AppearanceType = '' | 'dark' | 'auto'

const props = withDefaults(defineProps<Props>(), {
  show: true,
  ssr: false
})

export type UpdateFlag = 'UPDATING' | 'SUCCESS' | 'FAILURE'
const emits = defineEmits<{
  (e: 'update-preview', flag: UpdateFlag): UpdateFlag
}>()

const store = inject('store') as Store
const clearConsole = inject('clear-console') as Ref<boolean>
const previewOptions = inject('preview-options') as ReplProps['previewOptions']
const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()

const state = useStorage<AppearanceType>('vitepress-theme-appearance', 'auto', localStorage, {
  mergeDefaults: true
})


let sandbox: HTMLIFrameElement
let proxy: PreviewProxy
let stopUpdateWatcher: WatchStopHandle | undefined

// create sandbox on mount
onMounted(() => {
  createSandbox()
})

watch(
  () => state.value,
  (v) => {
    v === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }
)

// reset sandbox when import map changes
watch(
  () => store.state.files[importMapFile].code,
  (raw) => {
    try {
      const map = JSON.parse(raw)
      if (!map.imports) {
        store.state.errors = ['import-map.json is missing "imports" field.']
        return
      }
      createSandbox()
    } catch (e: any) {
      store.state.errors = [e as Error]
      throw new Error(e)
    }
  }
)

// reset sandbox when version changes
watch(() => store.state.resetFlip, createSandbox)

onUnmounted(() => {
  proxy.destroy()
  stopUpdateWatcher && stopUpdateWatcher()
})

function createSandbox() {
  if (sandbox) {
    // clear prev sandbox
    proxy.destroy()
    stopUpdateWatcher && stopUpdateWatcher()
    container.value.removeChild(sandbox)
  }

  sandbox = document.createElement('iframe')
  sandbox.setAttribute(
    'sandbox',
    [
      'allow-forms',
      'allow-modals',
      'allow-pointer-lock',
      'allow-popups',
      'allow-same-origin',
      'allow-scripts',
      'allow-top-navigation-by-user-activation'
    ].join(' ')
  )

  const importMap = store.getImportMap()
  if (!importMap.imports) {
    importMap.imports = {}
  }
  if (!importMap.imports.vue) {
    importMap.imports.vue = store.state.vueRuntimeURL
  }
  const sandboxSrc = srcdoc
    .replace(/<!--IMPORT_MAP-->/, JSON.stringify(importMap))
    .replace(/<!-- PREVIEW-OPTIONS-HEAD-HTML -->/, previewOptions?.headHTML || '')
  sandbox.srcdoc = sandboxSrc

  container.value.appendChild(sandbox)

  proxy = new PreviewProxy(sandbox, {
    on_error: (event: any) => {
      const msg = event.value instanceof Error ? event.value.message : event.value
      if (
        msg.includes('Failed to resolve module specifier') ||
        msg.includes('Error resolving module specifier')
      ) {
        runtimeError.value = `${msg.replace(
          /\. Relative references must.*$/,
          ''
        )}.\nTip: edit the "Import Map" tab to specify import paths for dependencies.`
      } else {
        runtimeError.value = event.value
      }
    },
    on_unhandled_rejection: (event: any) => {
      let error = event.value
      if (typeof error === 'string') {
        error = { message: error }
      }
      runtimeError.value = `Uncaught (in promise): ${error.message}`
    },
    on_console: (log: any) => {
      if (log.duplicate) {
        return
      }
      if (log.level === 'error') {
        if (log.args[0] instanceof Error) {
          runtimeError.value = log.args[0].message
        } else {
          // eslint-disable-next-line prefer-destructuring
          runtimeError.value = log.args[0]
        }
      } else if (log.level === 'warn') {
        if (log.args[0].toString().includes('[Vue warn]')) {
          runtimeWarning.value = log.args
            .join('')
            .replace(/\[Vue warn\]:/, '')
            .trim()
        }
      }
    }
  })

  sandbox.addEventListener('load', () => {
    proxy.handle_links()

    stopUpdateWatcher = watchEffect(updatePreview)
  })
}

async function updatePreview() {
  emits('update-preview', 'UPDATING')
  if (import.meta.env.PROD && clearConsole.value) {
    console.clear()
  }
  runtimeError.value = null
  runtimeWarning.value = null

  let isSSR = props.ssr
  if (store.vueVersion) {
    const [major, minor, patch] = store.vueVersion.split('.').map((v) => parseInt(v, 10))
    if (major === 3 && (minor < 2 || (minor === 2 && patch < 27))) {
      // eslint-disable-next-line no-alert
      alert(
        `The selected version of Vue (${store.vueVersion}) does not support in-browser SSR. Rendering in client mode instead.`
      )
      isSSR = false
    }
  }

  try {
    // eslint-disable-next-line prefer-destructuring
    const mainFile = store.state.mainFile

    // if SSR, generate the SSR bundle and eval it to render the HTML
    if (isSSR && mainFile.endsWith('.vue')) {
      const ssrModules = compileModulesForPreview(store, true)
      console.log(`[@vue/repl] successfully compiled ${ssrModules.length} modules for SSR.`)
      await proxy.eval([
        'const __modules__ = {};',
        ...ssrModules,
        `import { renderToString as _renderToString } from 'vue/server-renderer'
         import { createSSRApp as _createApp } from 'vue'
         const AppComponent = __modules__["${mainFile}"].default
         AppComponent.name = 'Repl'
         const app = _createApp(AppComponent)
         if (!app.config.hasOwnProperty('unwrapInjectedRef')) {
           app.config.unwrapInjectedRef = true
         }
         app.config.warnHandler = () => {}
         window.__ssr_promise__ = _renderToString(app).then(html => {
           document.body.innerHTML = '<div id="app">' + html + '</div>' + \`${
             previewOptions?.bodyHTML || ''
           }\`
         }).catch(err => {
           console.error("SSR Error", err)
         })
        `
      ])
    }

    // compile code to simulated module system
    const modules = compileModulesForPreview(store)
    console.log(
      `[@vue/repl] successfully compiled ${modules.length} module${modules.length > 1 ? 's' : ''}.`
    )
    const codeToEval = [
      // eslint-disable-next-line prefer-template, quotes
      `window.__modules__ = {}\nwindow.__css__ = ''\n` +
        // eslint-disable-next-line prefer-template, quotes
        `if (window.__app__) window.__app__.unmount()\n` +
        (isSSR
          ? ''
          : `document.body.innerHTML = '<div id="app"></div>'+ \`${
              previewOptions?.bodyHTML || ''
            }\``),
      ...modules,
      'document.getElementById("__sfc-styles").innerHTML = window.__css__'
    ]

    // if main file is a vue file, mount it.
    if (mainFile.endsWith('.vue')) {
      codeToEval.push(
        `import { ${isSSR ? 'createSSRApp' : 'createApp'} as _createApp } from "vue"
        ${previewOptions?.customCode?.importCode || ''}
        const _mount = () => {
          const AppComponent = __modules__["${mainFile}"].default
          AppComponent.name = 'Repl'
          const app = window.__app__ = _createApp(AppComponent)
          if (!app.config.hasOwnProperty('unwrapInjectedRef')) {
            app.config.unwrapInjectedRef = true
          }
          app.config.errorHandler = e => console.error(e)
          ${previewOptions?.customCode?.useCode || ''}
          app.mount('#app')
        }
        if (window.__ssr_promise__) {
          window.__ssr_promise__.then(_mount)
        } else {
          _mount()
        }`
      )
    }

    // eval code in sandbox
    await proxy.eval(codeToEval)

    const frameHeight = sandbox.contentWindow?.document.body.scrollHeight
    sandbox.style.height = `${frameHeight}px`
    emits('update-preview', 'SUCCESS')
  } catch (e: any) {
    runtimeError.value = (e as Error).message
    emits('update-preview', 'FAILURE')
  }

  if (sandbox.contentWindow?.document.body && props.bodyStyle) {
    for (const key in props.bodyStyle) {
      if (Object.hasOwn(props.bodyStyle, key)) {
        sandbox.contentWindow.document.body.style[key] = props.bodyStyle[key]!
      }
    }
  }

  if (props.appStyle) {
    const appEl = sandbox.contentWindow?.document.body.querySelector('#app') as HTMLElement
    if (appEl) {
      for (const key in props.appStyle) {
        if (Object.hasOwn(props.appStyle, key)) {
          appEl.style[key] = props.appStyle[key]!
        }
      }
    }
  }
}
</script>

<template>
  <div class="iframe-container" v-show="show" ref="container"></div>
  <Message :err="runtimeError" />
  <Message v-if="!runtimeError" :warn="runtimeWarning" />
</template>

<style scoped>
.iframe-container,
.iframe-container :deep(iframe) {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}
</style>
