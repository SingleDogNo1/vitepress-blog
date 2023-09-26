import { ref } from 'vue'

export const useCodeCopy = () => {
  const copyContent = ref('')
  const clickCopy = async (value: string) => {
    await navigator.clipboard.writeText(value)
  }
  return {
    copyContent,
    clickCopy
  }
}
