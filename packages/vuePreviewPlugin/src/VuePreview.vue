<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import '@singledog/vue-repl/vue-repl.css'
import type { PreviewUpdateFlag, Store } from '@singledog/vue-repl'
import { CodeMirror, Preview, ReplStore, defaultMainFile, importMapFile } from '@singledog/vue-repl'
import { computed, onMounted, provide, ref } from 'vue'
import { useClipboard, useDebounceFn, useElementHover } from '@vueuse/core'
import Copy from './icons/Copy.vue'
import Copied from './icons/Copied.vue'
import UnfoldLess from './icons/UnfoldLess.vue'
import UnfoldMore from './icons/UnfoldMore.vue'
import Loading from './icons/Loading.vue'
import extraStyle from './style'

export interface Props {
  store?: Store
  autoResize?: boolean
  clearConsole?: boolean
  ssr?: boolean
  code?: string
  encode?: boolean
  collapse?: boolean
  previewBodyStyle?: Partial<CSSStyleDeclaration> | string
  previewAppStyle?: Partial<CSSStyleDeclaration> | string
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
  importMap?: Record<string, string> | string
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  clearConsole: false,
  ssr: false,
  encode: false,
  collapse: false,
  previewOptions: () => ({
    headHTML: extraStyle,
    bodyHTML: '',
    customCode: {
      importCode: '',
      useCode: ''
    }
  })
})

const { store } = props

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('vite-plugin-vue-preview')
<\/script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

const files: Record<string, string> = {}

if (!props.code) files[defaultMainFile] = welcomeCode
else if (props.encode) files[defaultMainFile] = decodeURIComponent(props.code)
else files[defaultMainFile] = props.code

if (props.importMap) {
  const importMap =
    typeof props.importMap === 'string'
      ? JSON.parse(decodeURIComponent(props.importMap))
      : props.importMap
  files[importMapFile] = JSON.stringify({ imports: importMap }, null, 2)
}

store.setFiles(files)

onMounted(() => {
  if (props.clearConsole)
    // eslint-disable-next-line no-console
    console.clear()
})

const previewUpdateFlag = ref<PreviewUpdateFlag>('UPDATING')
function onPreviewUpdatePreview(flag: PreviewUpdateFlag) {
  previewUpdateFlag.value = flag
}

store.init()

const onChange = useDebounceFn((code: string) => {
  store.state.activeFile.code = code
}, 250)

provide('store', store)
provide('autoresize', props.autoResize)
provide('clear-console', props.clearConsole)
provide('preview-options', props.previewOptions)

const { copy, copied } = useClipboard({ source: store.state.activeFile.code, legacy: true })

const isCollapse = ref(props.collapse)
const maxHeightForCode = computed(() => (isCollapse.value ? '0' : '1000px'))

const previewBodyStyle = computed<Partial<CSSStyleDeclaration>>(() =>
  typeof props.previewBodyStyle === 'string'
    ? JSON.parse(decodeURIComponent(props.previewBodyStyle))
    : props.previewBodyStyle
)
const previewAppStyle = computed<Partial<CSSStyleDeclaration>>(() =>
  typeof props.previewAppStyle === 'string'
    ? JSON.parse(decodeURIComponent(props.previewAppStyle))
    : props.previewAppStyle
)

const vuePreviewContainerRef = ref()
const isHover = useElementHover(vuePreviewContainerRef)
</script>

<template>
  <div class="vue-preview">
    <div ref="vuePreviewContainerRef" class="vue-preview__container">
      <ClientOnly>
        <Preview
          show
          :ssr="props.ssr"
          :body-style="previewBodyStyle"
          :app-style="previewAppStyle"
          @update-preview="onPreviewUpdatePreview"
        />
      </ClientOnly>
      <Transition name="vue-preview-slide-down">
        <div class="vue-preview__btns" v-show="previewUpdateFlag !== 'UPDATING' && isHover">
          <button v-show="!copied" title="copy code" @click="copy(store.state.activeFile.code)">
            <Copy />
          </button>
          <button v-show="copied">
            <Copied />
          </button>
          <button v-show="!isCollapse" @click="isCollapse = true">
            <UnfoldLess />
          </button>
          <button v-show="isCollapse" @click="isCollapse = false">
            <UnfoldMore />
          </button>
        </div>
      </Transition>
      <Transition>
        <div v-if="previewUpdateFlag === 'UPDATING'" name="fade" class="vue-preview__loading-model">
          <Loading class="vue-preview__loading-icon" />
        </div>
      </Transition>
    </div>
    <CodeMirror :value="store.state.activeFile.code" @change="onChange" />
  </div>
</template>

<style>
:root {
  --vue-preview-radius: 8px;
  --vue-preview-color-border: hsla(220, 13%, 18%, 0.1);
  --vue-preview-box-shadow: 2px 4px 8px 4px hsla(0, 0%, 0%, 0.1);
  --vue-preview-color-icon: hsl(220, 13%, 18%);
  --vue-preview-color-icon-bg-hover: hsl(220, 95%, 95%);
  --vue-preview-color-model-bg: hsla(0, 0%, 80%, 0.1);
}
</style>

<style lang="scss" scoped>
.vue-preview {
  width: 100%;
  border-radius: var(--vue-preview-radius);
  overflow: hidden;
  box-shadow: var(--vue-preview-box-shadow);

  &__container {
    position: relative;
    min-height: 128px;
  }

  :deep(.iframe-container) {
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    border: 1px solid var(--vue-preview-color-border);
    border-radius: var(--vue-preview-radius) var(--vue-preview-radius) 0 0;

    iframe {
      background-color: var(--vp-c-bg);
      overflow: auto;
    }
  }

  &__btns {
    position: absolute;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
    padding: 4px;
    color: var(--vue-preview-color-icon);

    button {
      cursor: pointer;
      border: none;
      padding: 2px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      background-color: transparent;

      &:hover {
        background-color: var(--vue-preview-color-icon-bg-hover);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  &__loading-model {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--vue-preview-color-model-bg);
  }

  &__loading-icon {
    color: var(--vue-preview-color-loading, black);
  }

  :deep(.editor) {
    box-sizing: border-box;
    overflow: hidden;
    height: auto;
    border-radius: 0 0 var(--vue-preview-radius) var(--vue-preview-radius);
    max-height: v-bind('maxHeightForCode');
    transition: max-height 0.3s;
  }
}

.vue-preview-slide-down-enter-active,
.vue-preview-slide-down-leave-active {
  transition: all 0.3s ease;
}

.vue-preview-slide-down-enter-from,
.vue-preview-slide-down-leave-to {
  transform: translateY(48px);
  opacity: 0;
}
</style>
