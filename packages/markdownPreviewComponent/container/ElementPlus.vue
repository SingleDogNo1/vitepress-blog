<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useNameSpace } from '../hooks/useNamespaces'
import { useCodeFold } from '../hooks/useCodeFold'
import { useCodeCopy } from '../hooks/useCodeCopy'
import CodeOpen from './icons/code-open.vue'
import CodeClose from './icons/code-close.vue'
import CodeCopy from './icons/code-copy.vue'
import CodeCopySuccess from './icons/copy-success.vue'

interface DemoBlockProps {
  code: string
  showCode: string
  title: string
  description: string
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: '默认标题',
  description: '描述内容'
})

const ns = useNameSpace()
const { isCodeFold, setCodeFold } = useCodeFold()
const { clickCopy } = useCodeCopy()
const copied = ref(false)

const sourceCode = ref(decodeURIComponent(props.code))
const showSourceCode = ref(decodeURIComponent(props.showCode))
const sourceCodeArea = ref<any>(null)

const clickCodeCopy = () => {
  clickCopy(sourceCode.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1000)
}

const sourceCodeContainerHeight = computed(() => {
  if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight
  return 0
})
const setContainerHeight = (value: number) => {
  if (isCodeFold.value) sourceCodeArea.value.style.height = '0px'
  else sourceCodeArea.value.style.height = `${value}px`
}
onMounted(() => {
  const currentContainerHeight = sourceCodeContainerHeight.value
  setContainerHeight(currentContainerHeight)
})
watch(isCodeFold, () => {
  const container = sourceCodeContainerHeight.value
  setContainerHeight(container)
})
</script>

<template>
  <div :class="[ns.e('element-plus__container')]">
    <section :class="[ns.bem('preview')]">
      <slot> </slot>
    </section>
    <section :class="[ns.bem('description')]">
      <div :class="[ns.bem('description', 'split-line')]"></div>
      <div :class="[ns.bem('description', 'handle-btn')]">
        <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
        <CodeOpen v-else @click="setCodeFold(false)" />
        <CodeCopy v-if="!copied" @click="clickCodeCopy" />
        <CodeCopySuccess v-else />
      </div>
    </section>
    <section :class="[ns.bem('source')]" ref="sourceCodeArea">
      <div v-html="showSourceCode" class="language-vue"></div>
    </section>
  </div>
</template>

<style src="./element-plus.scss"></style>
