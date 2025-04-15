<template>
  <div class="playground">
    <Repl v-if="store" autoResize :store="store" :editor="editor === 'CodeMirror' ? CodeMirror : Monaco"
      :showCompileOutput="true" :clearConsole="false" v-bind="editorConfig" :theme="theme" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Repl, useStore } from '@singledog/vue-repl';
import { utoa } from './utils';
import { defineClientComponent } from 'vitepress'
import "@singledog/vue-repl/style.css";

const store = ref();
const slots = defineSlots();
const props = defineProps({
  editor: {
    type: String,
    default: 'CodeMirror'
  },
  config: {
    type: String,
    default: ''
  }
});
const Monaco = defineClientComponent(() => {
  return import('@singledog/vue-repl/monaco-editor')
});
const CodeMirror = defineClientComponent(() => {
  return import('@singledog/vue-repl/codemirror-editor')
});
const config = ref({});

const parentWindow = window.parent

const theme = ref(parentWindow.localStorage.getItem('vitepress-theme-appearance') === 'dark'? 'dark' : 'light')

parentWindow.addEventListener('storage', (ev) => {
  const parentTheme = ev.target.localStorage.getItem('vitepress-theme-appearance')
  theme.value = (parentTheme === 'dark' ? 'dark' : 'light')
})


const editorConfig = computed(() => {
  return config.value.editorConfig ?? {
    showImportMap: false,
    previewTheme: true,
    showTsConfig: false,
    showCompileOutput: false,
  }
})

onMounted(() => {
  const children = slots.default();
  const code = children?.[0]?.children;
  const file = {
    'src/App.vue': decodeURIComponent(code)
  };
  store.value = useStore({}, utoa(JSON.stringify(file)));

  if (props.config && props.config !== 'undefined') {
    try {
      config.value = {...JSON.parse(decodeURIComponent(props.config))}
    } catch (e) {
      console.error('playgound 配置解析错误', e);
    }
  }

  config.value?.imports && store.value.setImportMap({
    imports: config.value.imports
  })
});
</script>
<style scoped>
.playground {
  height: 400px;
}

.playground :deep(.left) {
  float: inherit;
  margin-left: initial;
  left: initial;
  right: initial;
  background-color: initial;
  min-height: initial;
}

.playground :deep(.right) {
  float: inherit;
  margin-left: initial;
  left: initial;
  right: initial;
  background-color: initial;
  min-height: initial;
}

.playground :deep(.wrapper) {
  display: none;
}
</style>